#!/usr/bin/env node
/**
 * scripts/seo-audit.mjs
 *
 * Crawls every URL in public/sitemap.xml against a running instance of
 * the site (local preview, a Vercel preview deploy, or production),
 * renders it in a real headless browser (so client-side rendered
 * content is captured, same as what Google's renderer sees), and
 * checks specifically for the class of bugs found while auditing this
 * project:
 *
 *   1. Missing or homepage-inherited <title> / <meta description> / canonical
 *   2. Two different routes sharing the same canonical URL (duplicate content)
 *   3. Two different routes sharing an identical <title> or <meta description>
 *   4. Canonical <link> not pointing at the page's own URL
 *   5. Broken or case-mismatched internal links (e.g. /about-Syncline vs
 *      /about-syncline) discovered while crawling
 *   6. Pages that render almost no visible text — a canary for a broken
 *      lazy-loaded chunk or a JS error swallowing the whole page
 *   7. Multiple <h1> tags, or none at all
 *   8. Images missing alt text
 *
 * This is NOT a replacement for Lighthouse/SEMrush-style scoring — see
 * the `unlighthouse` recommendation in the README this ships with for
 * that. This script exists to catch regressions of bugs that are
 * specific to how this app is built (SPA, react-helmet-async, React
 * Router) and that generic tools won't know to look for.
 *
 * Usage:
 *   node scripts/seo-audit.mjs                # audits http://localhost:4173
 *   SITE_URL=https://staging.syncline.com.au node scripts/seo-audit.mjs
 *
 * Requires: npm install -D playwright  (then: npx playwright install chromium)
 * Exits with code 1 if any check fails, so it can gate CI.
 */

import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';
import { XMLParser } from 'fast-xml-parser'; // npm install -D fast-xml-parser

const SITE_URL = process.env.SITE_URL || 'http://localhost:4173';
const SITEMAP_PATH = process.env.SITEMAP_PATH || './public/sitemap.xml';
const MIN_BODY_WORDS = 40; // pages with fewer visible words than this get flagged

async function loadRoutesFromSitemap() {
  const xml = await readFile(SITEMAP_PATH, 'utf-8');
  const parsed = new XMLParser().parse(xml);
  const urls = parsed.urlset.url.map((u) => new URL(u.loc).pathname);
  return [...new Set(urls)];
}

function normalizePath(pathname) {
  return pathname.replace(/\/+$/, '') || '/';
}

async function auditRoute(page, route) {
  const url = `${SITE_URL}${route}`;
  const issues = [];

  const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  const status = response ? response.status() : 0;
  if (status >= 400) {
    issues.push(`HTTP ${status}`);
    return { route, issues, fatal: true };
  }

  const title = await page.title();
  const description = await page
    .locator('meta[name="description"]')
    .first()
    .getAttribute('content')
    .catch(() => null);
  const canonical = await page
    .locator('link[rel="canonical"]')
    .first()
    .getAttribute('href')
    .catch(() => null);
  const robots = await page
    .locator('meta[name="robots"]')
    .first()
    .getAttribute('content')
    .catch(() => null);
  const h1Count = await page.locator('h1').count();
  const bodyText = await page.locator('body').innerText();
  const wordCount = bodyText.trim().split(/\s+/).filter(Boolean).length;

  const imagesMissingAlt = await page.evaluate(() =>
    Array.from(document.querySelectorAll('img')).filter(
      (img) => !img.getAttribute('alt') || img.getAttribute('alt').trim() === ''
    ).length
  );

  const internalLinks = await page.evaluate(() =>
    Array.from(document.querySelectorAll('a[href^="/"]')).map((a) => a.getAttribute('href'))
  );

  if (!title || title.trim().length === 0) issues.push('Missing <title>');
  if (!description || description.trim().length === 0) issues.push('Missing meta description');
  if (description && (description.length < 50 || description.length > 165))
    issues.push(`meta description length ${description.length} (recommended 50-165 chars)`);
  if (!canonical) issues.push('Missing canonical tag');
  if (canonical) {
    const canonicalPath = normalizePath(new URL(canonical).pathname);
    if (canonicalPath !== normalizePath(route)) {
      issues.push(`Canonical points to "${canonicalPath}" instead of own route "${route}"`);
    }
  }
  if (h1Count === 0) issues.push('No <h1> found');
  if (h1Count > 1) issues.push(`${h1Count} <h1> tags found (expected 1)`);
  if (wordCount < MIN_BODY_WORDS)
    issues.push(`Only ${wordCount} visible words — possible render failure or thin content`);
  if (imagesMissingAlt > 0) issues.push(`${imagesMissingAlt} <img> missing alt text`);

  return {
    route,
    title,
    description,
    canonical,
    robots,
    h1Count,
    wordCount,
    internalLinks,
    issues,
    fatal: false,
  };
}

async function main() {
  const routes = await loadRoutesFromSitemap();
  console.log(`Auditing ${routes.length} routes against ${SITE_URL}\n`);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  const results = [];
  for (const route of routes) {
    process.stdout.write(`  ${route} ... `);
    try {
      const result = await auditRoute(page, route);
      console.log(result.issues.length ? `${result.issues.length} issue(s)` : 'OK');
      results.push(result);
    } catch (err) {
      console.log(`ERROR (${err.message})`);
      results.push({ route, issues: [`Failed to load: ${err.message}`], fatal: true });
    }
  }

  await browser.close();

  // Cross-page checks: duplicate canonical / title / description
  const byCanonical = new Map();
  const byTitle = new Map();
  const byDescription = new Map();
  const knownRoutes = new Set(routes.map(normalizePath));

  for (const r of results) {
    if (r.canonical) {
      const key = normalizePath(new URL(r.canonical).pathname);
      byCanonical.set(key, [...(byCanonical.get(key) || []), r.route]);
    }
    if (r.title) byTitle.set(r.title, [...(byTitle.get(r.title) || []), r.route]);
    if (r.description)
      byDescription.set(r.description, [...(byDescription.get(r.description) || []), r.route]);
  }

  const crossPageIssues = [];
  for (const [canonicalPath, routesSharingIt] of byCanonical) {
    if (routesSharingIt.length > 1) {
      crossPageIssues.push(
        `Duplicate canonical "${canonicalPath}" shared by: ${routesSharingIt.join(', ')}`
      );
    }
  }
  for (const [title, routesSharingIt] of byTitle) {
    if (routesSharingIt.length > 1) {
      crossPageIssues.push(`Duplicate <title> "${title}" shared by: ${routesSharingIt.join(', ')}`);
    }
  }
  for (const [desc, routesSharingIt] of byDescription) {
    if (routesSharingIt.length > 1) {
      crossPageIssues.push(
        `Duplicate meta description shared by: ${routesSharingIt.join(', ')} ("${desc.slice(0, 60)}...")`
      );
    }
  }

  // Broken/unknown internal links found while crawling
  const linkIssues = [];
  for (const r of results) {
    if (!r.internalLinks) continue;
    for (const link of r.internalLinks) {
      const linkPath = normalizePath(link.split('?')[0].split('#')[0]);
      if (linkPath !== '/' && !knownRoutes.has(linkPath) && !linkPath.startsWith('/assets')) {
        linkIssues.push(`On ${r.route}: link to unknown route "${linkPath}" (check casing/typo, or add to sitemap.xml)`);
      }
    }
  }

  console.log('\n--- Per-page issues ---');
  let anyIssues = false;
  for (const r of results) {
    if (r.issues.length) {
      anyIssues = true;
      console.log(`\n${r.route}`);
      r.issues.forEach((issue) => console.log(`  - ${issue}`));
    }
  }

  if (crossPageIssues.length) {
    anyIssues = true;
    console.log('\n--- Cross-page duplicate content issues ---');
    crossPageIssues.forEach((issue) => console.log(`  - ${issue}`));
  }

  if (linkIssues.length) {
    anyIssues = true;
    console.log('\n--- Broken/unknown internal links ---');
    [...new Set(linkIssues)].forEach((issue) => console.log(`  - ${issue}`));
  }

  console.log(anyIssues ? '\nFAILED — issues found above.' : '\nAll checks passed.');
  process.exit(anyIssues ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
