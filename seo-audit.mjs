#!/usr/bin/env node

/**
 * SYNCLINE SEO INTELLIGENCE AUDITOR
 *
 * Audits:
 *   1. Live production website
 *   2. Local development source
 *   3. Rendered JavaScript pages
 *   4. robots.txt
 *   5. sitemap.xml
 *   6. canonical/indexability
 *   7. metadata
 *   8. headings
 *   9. links
 *  10. images
 *  11. structured data
 *  12. security headers
 *  13. performance signals
 *  14. Git branch/status
 *  15. Local-vs-production differences
 *
 * Usage:
 *
 *   node seo-audit.mjs
 *
 *   node seo-audit.mjs --live https://www.syncline.com.au
 *
 *   node seo-audit.mjs --live https://www.syncline.com.au --max-pages 100
 *
 *   node seo-audit.mjs --local-only
 *
 *   node seo-audit.mjs --live https://www.syncline.com.au --gsc
 */

import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import process from "node:process";
import { execSync } from "node:child_process";

import { chromium } from "playwright";
import * as cheerio from "cheerio";
import { XMLParser } from "fast-xml-parser";
import robotsParser from "robots-parser";
import pc from "picocolors";


// ============================================================
// CONFIGURATION
// ============================================================

const args = process.argv.slice(2);

function arg(name, fallback = null) {
    const index = args.indexOf(name);

    if (index === -1) {
        return fallback;
    }

    return args[index + 1] ?? fallback;
}

const LIVE_URL =
    arg("--live", process.env.SEO_LIVE_URL || "https://www.syncline.com.au");

const MAX_PAGES =
    Number(arg("--max-pages", process.env.SEO_MAX_PAGES || 100));

const LOCAL_ONLY =
    args.includes("--local-only");

const USE_GSC =
    args.includes("--gsc");

const PROJECT_ROOT =
    process.cwd();

const REPORT_DIR =
    path.join(PROJECT_ROOT, "seo-audit", "reports");


// ============================================================
// HELPERS
// ============================================================

function now() {
    return new Date().toISOString();
}

function normalizeUrl(url) {
    try {
        const u = new URL(url);

        u.hash = "";

        // Remove common tracking parameters
        const removeParams = [
            "utm_source",
            "utm_medium",
            "utm_campaign",
            "utm_term",
            "utm_content",
            "gclid",
            "fbclid"
        ];

        for (const p of removeParams) {
            u.searchParams.delete(p);
        }

        return u.toString();
    } catch {
        return url;
    }
}

function sameOrigin(a, b) {
    try {
        return new URL(a).origin === new URL(b).origin;
    } catch {
        return false;
    }
}

function isHttpUrl(url) {
    return /^https?:\/\//i.test(url);
}

function cleanText(value = "") {
    return value
        .replace(/\s+/g, " ")
        .trim();
}

function truncate(value, length = 300) {
    const text = cleanText(value);

    return text.length > length
        ? `${text.slice(0, length)}...`
        : text;
}

function scoreIssue(severity) {
    return {
        critical: 20,
        high: 10,
        medium: 5,
        low: 2
    }[severity] || 0;
}


// ============================================================
// ISSUE ENGINE
// ============================================================

function issue(
    severity,
    category,
    code,
    message,
    url = null,
    recommendation = ""
) {
    return {
        severity,
        category,
        code,
        message,
        url,
        recommendation,
        score: scoreIssue(severity)
    };
}


// ============================================================
// GIT
// ============================================================

function getGitInfo() {
    const result = {
        branch: "unknown",
        status: [],
        commit: "unknown"
    };

    try {
        result.branch = execSync(
            "git branch --show-current",
            {
                cwd: PROJECT_ROOT,
                encoding: "utf8"
            }
        ).trim();
    } catch {}

    try {
        result.commit = execSync(
            "git rev-parse --short HEAD",
            {
                cwd: PROJECT_ROOT,
                encoding: "utf8"
            }
        ).trim();
    } catch {}

    try {
        const status = execSync(
            "git status --short",
            {
                cwd: PROJECT_ROOT,
                encoding: "utf8"
            }
        ).trim();

        result.status = status
            ? status.split(/\r?\n/)
            : [];
    } catch {}

    return result;
}


// ============================================================
// LOCAL PROJECT SCAN
// ============================================================

async function getFiles(dir, results = []) {

    const ignored = new Set([
        "node_modules",
        ".git",
        "dist",
        "build",
        ".next",
        ".vercel",
        "coverage",
        "seo-audit"
    ]);

    let entries;

    try {
        entries = await fs.readdir(dir, {
            withFileTypes: true
        });
    } catch {
        return results;
    }

    for (const entry of entries) {

        if (ignored.has(entry.name)) {
            continue;
        }

        const fullPath =
            path.join(dir, entry.name);

        if (entry.isDirectory()) {

            await getFiles(
                fullPath,
                results
            );

        } else {

            results.push(fullPath);
        }
    }

    return results;
}


async function scanLocalProject() {

    const files =
        await getFiles(PROJECT_ROOT);

    const result = {
        files: files.map(file =>
            path.relative(
                PROJECT_ROOT,
                file
            )
        ),
        routes: [],
        seoFiles: [],
        sourceIssues: [],
        package: null
    };


    // --------------------------------------------------------
    // package.json
    // --------------------------------------------------------

    const packagePath =
        path.join(PROJECT_ROOT, "package.json");

    try {

        const packageData =
            JSON.parse(
                await fs.readFile(
                    packagePath,
                    "utf8"
                )
            );

        result.package = {
            name: packageData.name,
            version: packageData.version,
            dependencies:
                Object.keys(
                    packageData.dependencies || {}
                ),
            devDependencies:
                Object.keys(
                    packageData.devDependencies || {}
                )
        };

    } catch {}


    // --------------------------------------------------------
    // SEO FILES
    // --------------------------------------------------------

    const seoCandidates = [
        "public/robots.txt",
        "public/sitemap.xml",
        "public/manifest.json",
        "robots.txt",
        "sitemap.xml",
        "index.html"
    ];

    for (const relative of seoCandidates) {

        const absolute =
            path.join(
                PROJECT_ROOT,
                relative
            );

        if (fsSync.existsSync(absolute)) {

            result.seoFiles.push(relative);
        }
    }


    // --------------------------------------------------------
    // SOURCE ANALYSIS
    // --------------------------------------------------------

    const sourceFiles =
        files.filter(file =>
            /\.(jsx?|tsx?|html)$/i.test(file)
        );

    for (const file of sourceFiles) {

        let source;

        try {

            source =
                await fs.readFile(
                    file,
                    "utf8"
                );

        } catch {
            continue;
        }

        const relative =
            path.relative(
                PROJECT_ROOT,
                file
            );


        // Missing obvious title handling
        if (
            /\.(jsx?|tsx?)$/i.test(file) &&
            /Page|Section|Home|About|Service/i.test(
                path.basename(file)
            )
        ) {

            if (
                !source.includes("<title") &&
                !source.includes("document.title") &&
                !source.includes("Helmet") &&
                !source.includes("useSEO")
            ) {

                result.sourceIssues.push(
                    issue(
                        "medium",
                        "local-seo",
                        "LOCAL_MISSING_TITLE_SIGNAL",
                        `No obvious title implementation found in ${relative}`,
                        relative,
                        "Ensure the rendered route has a unique <title>."
                    )
                );
            }
        }


        // Hard-coded localhost URLs
        if (
            /localhost:\d+/i.test(source)
        ) {

            result.sourceIssues.push(
                issue(
                    "medium",
                    "configuration",
                    "LOCALHOST_REFERENCE",
                    `Localhost URL detected in ${relative}`,
                    relative,
                    "Check that development URLs are not accidentally shipped to production."
                )
            );
        }


        // noindex detection
        if (
            /noindex/i.test(source)
        ) {

            result.sourceIssues.push(
                issue(
                    "high",
                    "indexability",
                    "LOCAL_NOINDEX",
                    `Potential noindex directive detected in ${relative}`,
                    relative,
                    "Verify this is intentional for the corresponding production route."
                )
            );
        }


        // Canonical detection
        if (
            /rel=["']canonical["']/i.test(source)
        ) {

            // good signal
        }
    }


    return result;
}


// ============================================================
// ROBOTS
// ============================================================

async function auditRobots(baseUrl) {

    const url =
        new URL(
            "/robots.txt",
            baseUrl
        ).toString();

    try {

        const response =
            await fetch(
                url,
                {
                    redirect: "follow"
                }
            );

        const body =
            await response.text();

        const issues = [];

        if (!response.ok) {

            issues.push(
                issue(
                    "high",
                    "crawlability",
                    "ROBOTS_UNAVAILABLE",
                    `robots.txt returned HTTP ${response.status}`,
                    url,
                    "Ensure robots.txt is publicly accessible."
                )
            );

        }

        if (
            !body.toLowerCase().includes("sitemap:")
        ) {

            issues.push(
                issue(
                    "medium",
                    "crawlability",
                    "ROBOTS_NO_SITEMAP",
                    "robots.txt does not declare a sitemap",
                    url,
                    "Add a Sitemap directive pointing to the canonical XML sitemap."
                )
            );
        }

        return {
            url,
            status: response.status,
            body,
            issues
        };

    } catch (error) {

        return {
            url,
            status: null,
            body: "",
            issues: [
                issue(
                    "critical",
                    "crawlability",
                    "ROBOTS_FETCH_FAILED",
                    error.message,
                    url
                )
            ]
        };
    }
}


// ============================================================
// SITEMAP
// ============================================================

async function auditSitemap(baseUrl) {

    const sitemapUrl =
        new URL(
            "/sitemap.xml",
            baseUrl
        ).toString();

    try {

        const response =
            await fetch(
                sitemapUrl
            );

        const body =
            await response.text();

        const issues = [];

        if (!response.ok) {

            issues.push(
                issue(
                    "high",
                    "crawlability",
                    "SITEMAP_UNAVAILABLE",
                    `sitemap.xml returned HTTP ${response.status}`,
                    sitemapUrl,
                    "Publish a valid XML sitemap."
                )
            );

            return {
                url: sitemapUrl,
                status: response.status,
                urls: [],
                issues
            };
        }


        const parser =
            new XMLParser({
                ignoreAttributes: false
            });

        let parsed;

        try {

            parsed =
                parser.parse(body);

        } catch (error) {

            issues.push(
                issue(
                    "critical",
                    "crawlability",
                    "SITEMAP_INVALID_XML",
                    `Invalid sitemap XML: ${error.message}`,
                    sitemapUrl
                )
            );

            return {
                url: sitemapUrl,
                status: response.status,
                urls: [],
                issues
            };
        }


        let urls = [];

        if (parsed.urlset?.url) {

            const entries =
                Array.isArray(
                    parsed.urlset.url
                )
                    ? parsed.urlset.url
                    : [parsed.urlset.url];

            urls =
                entries
                    .map(item => item.loc)
                    .filter(Boolean);
        }


        return {
            url: sitemapUrl,
            status: response.status,
            urls,
            issues
        };

    } catch (error) {

        return {
            url: sitemapUrl,
            status: null,
            urls: [],
            issues: [
                issue(
                    "critical",
                    "crawlability",
                    "SITEMAP_FETCH_FAILED",
                    error.message,
                    sitemapUrl
                )
            ]
        };
    }
}


// ============================================================
// PAGE AUDIT
// ============================================================

async function auditPage(
    page,
    url,
    baseUrl
) {

    const result = {
        url,
        finalUrl: null,
        status: null,
        responseHeaders: {},
        title: null,
        description: null,
        canonical: null,
        robots: null,
        lang: null,
        h1: [],
        h2: [],
        links: [],
        internalLinks: [],
        externalLinks: [],
        images: [],
        schema: [],
        textLength: 0,
        htmlLength: 0,
        renderedTextLength: 0,
        performance: {},
        issues: []
    };


    let response;

    try {

        response =
            await page.goto(
                url,
                {
                    waitUntil: "networkidle",
                    timeout: 30000
                }
            );

    } catch (error) {

        result.issues.push(
            issue(
                "critical",
                "availability",
                "PAGE_LOAD_FAILED",
                error.message,
                url,
                "Verify the URL is accessible and does not fail during browser rendering."
            )
        );

        return result;
    }


    result.status =
        response?.status() ?? null;

    result.finalUrl =
        page.url();

    result.responseHeaders =
        await response?.allHeaders() || {};


    const html =
        await page.content();

    result.htmlLength =
        html.length;


    const $ =
        cheerio.load(html);


    // --------------------------------------------------------
    // LANGUAGE
    // --------------------------------------------------------

    result.lang =
        $("html").attr("lang") || null;

    if (!result.lang) {

        result.issues.push(
            issue(
                "medium",
                "content",
                "MISSING_LANG",
                "HTML lang attribute is missing",
                url,
                "Add a valid language attribute such as lang=\"en-AU\"."
            )
        );
    }


    // --------------------------------------------------------
    // TITLE
    // --------------------------------------------------------

    result.title =
        cleanText(
            $("title").first().text()
        ) || null;

    if (!result.title) {

        result.issues.push(
            issue(
                "critical",
                "metadata",
                "MISSING_TITLE",
                "Page has no title",
                url,
                "Add a unique, descriptive title."
            )
        );

    } else {

        if (result.title.length < 20) {

            result.issues.push(
                issue(
                    "low",
                    "metadata",
                    "SHORT_TITLE",
                    `Title is only ${result.title.length} characters`,
                    url,
                    "Use a descriptive title that accurately represents the page."
                )
            );
        }

        if (result.title.length > 65) {

            result.issues.push(
                issue(
                    "low",
                    "metadata",
                    "LONG_TITLE",
                    `Title is ${result.title.length} characters`,
                    url,
                    "Consider shortening the title while preserving important terms."
                )
            );
        }
    }


    // --------------------------------------------------------
    // META DESCRIPTION
    // --------------------------------------------------------

    result.description =
        cleanText(
            $("meta[name='description']").attr("content") || ""
        ) || null;

    if (!result.description) {

        result.issues.push(
            issue(
                "high",
                "metadata",
                "MISSING_DESCRIPTION",
                "Meta description is missing",
                url,
                "Add a unique, useful meta description."
            )
        );

    } else {

        if (result.description.length < 70) {

            result.issues.push(
                issue(
                    "low",
                    "metadata",
                    "SHORT_DESCRIPTION",
                    `Description is ${result.description.length} characters`,
                    url
                )
            );
        }

        if (result.description.length > 170) {

            result.issues.push(
                issue(
                    "low",
                    "metadata",
                    "LONG_DESCRIPTION",
                    `Description is ${result.description.length} characters`,
                    url
                )
            );
        }
    }


    // --------------------------------------------------------
    // CANONICAL
    // --------------------------------------------------------

    const canonicals =
        $("link[rel='canonical']")
            .map(
                (_, el) =>
                    $(el).attr("href")
            )
            .get()
            .filter(Boolean);

    if (canonicals.length === 0) {

        result.issues.push(
            issue(
                "high",
                "canonical",
                "MISSING_CANONICAL",
                "Canonical link is missing",
                url,
                "Add one canonical URL in the HTML head."
            )
        );

    } else {

        if (canonicals.length > 1) {

            result.issues.push(
                issue(
                    "critical",
                    "canonical",
                    "MULTIPLE_CANONICALS",
                    `Found ${canonicals.length} canonical tags`,
                    url,
                    "Keep exactly one canonical URL."
                )
            );
        }

        result.canonical =
            new URL(
                canonicals[0],
                url
            ).toString();

        if (
            !sameOrigin(
                result.canonical,
                baseUrl
            )
        ) {

            result.issues.push(
                issue(
                    "high",
                    "canonical",
                    "EXTERNAL_CANONICAL",
                    `Canonical points outside the site: ${result.canonical}`,
                    url
                )
            );
        }
    }


    // --------------------------------------------------------
    // ROBOTS META
    // --------------------------------------------------------

    result.robots =
        $("meta[name='robots']")
            .attr("content") ||
        null;

    if (
        result.robots &&
        /noindex/i.test(result.robots)
    ) {

        result.issues.push(
            issue(
                "high",
                "indexability",
                "NOINDEX",
                "Page contains noindex",
                url,
                "Remove noindex if this page should appear in Google."
            )
        );
    }


    // --------------------------------------------------------
    // HEADINGS
    // --------------------------------------------------------

    result.h1 =
        $("h1")
            .map(
                (_, el) =>
                    cleanText($(el).text())
            )
            .get();

    result.h2 =
        $("h2")
            .map(
                (_, el) =>
                    cleanText($(el).text())
            )
            .get();


    if (result.h1.length === 0) {

        result.issues.push(
            issue(
                "high",
                "content",
                "MISSING_H1",
                "No H1 heading found",
                url,
                "Add one clear primary H1 describing the page."
            )
        );
    }

    if (result.h1.length > 1) {

        result.issues.push(
            issue(
                "medium",
                "content",
                "MULTIPLE_H1",
                `Found ${result.h1.length} H1 elements`,
                url,
                "Prefer one clear primary H1."
            )
        );
    }


    // --------------------------------------------------------
    // LINKS
    // --------------------------------------------------------

    $("a[href]").each((_, el) => {

        const href =
            $(el).attr("href");

        if (!href) {
            return;
        }

        if (
            href.startsWith("#") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:")
        ) {
            return;
        }

        try {

            const absolute =
                new URL(
                    href,
                    url
                ).toString();

            const link = {
                href: absolute,
                text: cleanText($(el).text()),
                rel: $(el).attr("rel") || ""
            };

            result.links.push(link);

            if (
                sameOrigin(
                    absolute,
                    baseUrl
                )
            ) {

                result.internalLinks.push(link);

            } else {

                result.externalLinks.push(link);
            }

        } catch {}
    });


    // --------------------------------------------------------
    // IMAGES
    // --------------------------------------------------------

    $("img").each((_, el) => {

        const src =
            $(el).attr("src");

        const alt =
            $(el).attr("alt");

        result.images.push({
            src,
            alt,
            width: $(el).attr("width") || null,
            height: $(el).attr("height") || null
        });

        if (
            !alt &&
            !$(el).attr("role")?.includes("presentation")
        ) {

            result.issues.push(
                issue(
                    "medium",
                    "images",
                    "MISSING_ALT",
                    `Image is missing alt text: ${src}`,
                    url,
                    "Add meaningful alt text where the image conveys information."
                )
            );
        }
    });


    // --------------------------------------------------------
    // STRUCTURED DATA
    // --------------------------------------------------------

    $("script[type='application/ld+json']")
        .each((_, el) => {

            const raw =
                $(el).html();

            try {

                result.schema.push(
                    JSON.parse(raw)
                );

            } catch {

                result.issues.push(
                    issue(
                        "high",
                        "structured-data",
                        "INVALID_JSONLD",
                        "Invalid JSON-LD detected",
                        url,
                        "Validate the JSON-LD syntax and schema."
                    )
                );
            }
        });


    if (result.schema.length === 0) {

        result.issues.push(
            issue(
                "medium",
                "structured-data",
                "NO_STRUCTURED_DATA",
                "No JSON-LD structured data found",
                url,
                "Consider appropriate Schema.org structured data such as Organization, LocalBusiness, Service or Article."
            )
        );
    }


    // --------------------------------------------------------
    // CONTENT
    // --------------------------------------------------------

    result.textLength =
        cleanText(
            $("body").text()
        ).length;

    result.renderedTextLength =
        cleanText(
            await page.locator("body").innerText()
        ).length;


    if (result.renderedTextLength < 300) {

        result.issues.push(
            issue(
                "medium",
                "content",
                "THIN_RENDERED_CONTENT",
                `Rendered body text contains only ${result.renderedTextLength} characters`,
                url,
                "Verify that the page contains meaningful crawlable content."
            )
        );
    }


    // --------------------------------------------------------
    // PERFORMANCE
    // --------------------------------------------------------

    result.performance =
        await page.evaluate(() => {

            const navigation =
                performance.getEntriesByType(
                    "navigation"
                )[0];

            const paintEntries =
                performance.getEntriesByType(
                    "paint"
                );

            const fcp =
                paintEntries.find(
                    x =>
                        x.name ===
                        "first-contentful-paint"
                );

            return {
                ttfb:
                    navigation
                        ? navigation.responseStart -
                          navigation.requestStart
                        : null,

                domContentLoaded:
                    navigation
                        ? navigation.domContentLoadedEventEnd
                        : null,

                load:
                    navigation
                        ? navigation.loadEventEnd
                        : null,

                fcp:
                    fcp
                        ? fcp.startTime
                        : null
            };
        });


    if (
        result.performance.ttfb !== null &&
        result.performance.ttfb > 800
    ) {

        result.issues.push(
            issue(
                "medium",
                "performance",
                "SLOW_TTFB",
                `TTFB is ${Math.round(result.performance.ttfb)}ms`,
                url,
                "Investigate server response time, hosting, caching and backend latency."
            )
        );
    }


    // --------------------------------------------------------
    // SECURITY HEADERS
    // --------------------------------------------------------

    const headers =
        result.responseHeaders;

    const securityHeaders = [
        [
            "strict-transport-security",
            "HSTS"
        ],
        [
            "content-security-policy",
            "CSP"
        ],
        [
            "x-content-type-options",
            "X-Content-Type-Options"
        ],
        [
            "referrer-policy",
            "Referrer-Policy"
        ],
        [
            "permissions-policy",
            "Permissions-Policy"
        ]
    ];


    for (
        const [header, name]
        of securityHeaders
    ) {

        if (!headers[header]) {

            result.issues.push(
                issue(
                    "low",
                    "security",
                    `MISSING_${header.toUpperCase()}`,
                    `${name} header is missing`,
                    url,
                    `Consider configuring ${name} at the hosting/CDN layer.`
                )
            );
        }
    }


    return result;
}


// ============================================================
// CRAWLER
// ============================================================

async function crawlSite(
    baseUrl,
    sitemapUrls = []
) {

    const browser =
        await chromium.launch({
            headless: true
        });

    const context =
        await browser.newContext({
            viewport: {
                width: 1440,
                height: 900
            },
            userAgent:
                "SynclineSEOAuditor/1.0"
        });

    const page =
        await context.newPage();

    const queue =
        new Set([
            normalizeUrl(baseUrl),
            ...sitemapUrls
                .filter(url =>
                    sameOrigin(
                        url,
                        baseUrl
                    )
                )
                .map(normalizeUrl)
        ]);

    const visited =
        new Set();

    const pages = [];

    while (
        queue.size > 0 &&
        pages.length < MAX_PAGES
    ) {

        const url =
            queue.values().next().value;

        queue.delete(url);

        if (visited.has(url)) {
            continue;
        }

        visited.add(url);

        console.log(
            pc.gray(
                `  Crawling ${pages.length + 1}: ${url}`
            )
        );

        const result =
            await auditPage(
                page,
                url,
                baseUrl
            );

        pages.push(result);


        for (
            const link
            of result.internalLinks
        ) {

            const normalized =
                normalizeUrl(
                    link.href
                );

            if (
                sameOrigin(
                    normalized,
                    baseUrl
                ) &&
                !visited.has(normalized) &&
                queue.size < MAX_PAGES * 2
            ) {

                queue.add(normalized);
            }
        }
    }

    await browser.close();

    return pages;
}


// ============================================================
// DUPLICATE DETECTION
// ============================================================

function detectDuplicates(pages) {

    const issues = [];

    const titles =
        new Map();

    const descriptions =
        new Map();

    const canonicals =
        new Map();


    for (const page of pages) {

        if (page.title) {

            if (!titles.has(page.title)) {
                titles.set(
                    page.title,
                    []
                );
            }

            titles.get(page.title).push(
                page.url
            );
        }


        if (page.description) {

            if (!descriptions.has(page.description)) {
                descriptions.set(
                    page.description,
                    []
                );
            }

            descriptions
                .get(page.description)
                .push(page.url);
        }


        if (page.canonical) {

            if (!canonicals.has(page.canonical)) {
                canonicals.set(
                    page.canonical,
                    []
                );
            }

            canonicals
                .get(page.canonical)
                .push(page.url);
        }
    }


    for (
        const [title, urls]
        of titles
    ) {

        if (urls.length > 1) {

            issues.push(
                issue(
                    "high",
                    "duplicates",
                    "DUPLICATE_TITLE",
                    `Duplicate title: "${title}"`,
                    null,
                    `Appears on ${urls.length} pages.`
                )
            );
        }
    }


    for (
        const [description, urls]
        of descriptions
    ) {

        if (urls.length > 1) {

            issues.push(
                issue(
                    "medium",
                    "duplicates",
                    "DUPLICATE_DESCRIPTION",
                    `Duplicate meta description`,
                    null,
                    `Appears on ${urls.length} pages.`
                )
            );
        }
    }


    return issues;
}


// ============================================================
// INTERNAL LINK ANALYSIS
// ============================================================

function analyzeLinks(pages) {

    const known =
        new Set(
            pages.map(
                page =>
                    normalizeUrl(
                        page.finalUrl ||
                        page.url
                    )
            )
        );

    const inbound =
        new Map();

    for (const page of pages) {

        for (
            const link
            of page.internalLinks
        ) {

            const target =
                normalizeUrl(
                    link.href
                );

            if (!inbound.has(target)) {
                inbound.set(
                    target,
                    []
                );
            }

            inbound.get(target).push(
                page.url
            );
        }
    }


    const issues = [];

    for (const page of pages) {

        const target =
            normalizeUrl(
                page.finalUrl ||
                page.url
            );

        const count =
            inbound.get(target)?.length || 0;

        if (
            count === 0 &&
            target !== normalizeUrl(LIVE_URL)
        ) {

            issues.push(
                issue(
                    "medium",
                    "internal-links",
                    "ORPHAN_CANDIDATE",
                    "Page has no inbound internal links discovered by crawler",
                    page.url,
                    "Add contextual internal links if the page is important."
                )
            );
        }
    }

    return issues;
}


// ============================================================
// SCORE
// ============================================================

function calculateScore(
    pages,
    globalIssues,
    localIssues
) {

    const issues = [
        ...globalIssues,
        ...localIssues,
        ...pages.flatMap(
            page => page.issues
        )
    ];

    let penalty = 0;

    for (const item of issues) {
        penalty += item.score;
    }

    const normalized =
        Math.min(
            penalty / Math.max(
                pages.length * 2,
                1
            ),
            100
        );

    return Math.max(
        0,
        Math.round(
            100 - normalized
        )
    );
}


// ============================================================
// HTML REPORT
// ============================================================

function severityColor(severity) {

    return {
        critical: "#b91c1c",
        high: "#dc2626",
        medium: "#d97706",
        low: "#2563eb"
    }[severity] || "#64748b";
}


function generateHtmlReport(report) {

    const allIssues = [
        ...report.globalIssues,
        ...report.localIssues,
        ...report.pages.flatMap(
            page => page.issues
        )
    ];


    const counts = {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0
    };

    for (const i of allIssues) {
        if (counts[i.severity] !== undefined) {
            counts[i.severity]++;
        }
    }


    const issueRows =
        allIssues
            .sort(
                (a, b) =>
                    b.score - a.score
            )
            .map(
                i => `
<tr>
<td>
<span class="severity"
style="background:${severityColor(i.severity)}">
${i.severity.toUpperCase()}
</span>
</td>
<td>${escapeHtml(i.category)}</td>
<td>${escapeHtml(i.code)}</td>
<td>${escapeHtml(i.message)}</td>
<td>${escapeHtml(i.url || "")}</td>
<td>${escapeHtml(i.recommendation || "")}</td>
</tr>
`
            )
            .join("");


    const pageRows =
        report.pages
            .map(
                p => `
<tr>
<td>${escapeHtml(p.url)}</td>
<td>${p.status ?? ""}</td>
<td>${escapeHtml(p.title || "")}</td>
<td>${p.h1.length}</td>
<td>${p.internalLinks.length}</td>
<td>${p.renderedTextLength}</td>
<td>${Math.round(p.performance.ttfb || 0)} ms</td>
<td>${p.issues.length}</td>
</tr>
`
            )
            .join("");


    return `<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width, initial-scale=1">

<title>Syncline SEO Intelligence Report</title>

<style>

* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family:
        Inter,
        system-ui,
        sans-serif;
    background: #f1f5f9;
    color: #0f172a;
}

header {
    background: #0f172a;
    color: white;
    padding: 32px 40px;
}

main {
    max-width: 1600px;
    margin: auto;
    padding: 32px;
}

.grid {
    display: grid;
    grid-template-columns:
        repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
}

.card {
    background: white;
    border-radius: 16px;
    padding: 22px;
    box-shadow:
        0 2px 10px rgba(0,0,0,.06);
}

.metric {
    font-size: 34px;
    font-weight: 800;
}

.label {
    color: #64748b;
    margin-top: 4px;
}

.score {
    font-size: 64px;
    font-weight: 900;
}

table {
    width: 100%;
    border-collapse: collapse;
    background: white;
}

th,
td {
    text-align: left;
    padding: 12px;
    border-bottom: 1px solid #e2e8f0;
    vertical-align: top;
}

th {
    background: #f8fafc;
}

.severity {
    color: white;
    border-radius: 999px;
    padding: 4px 8px;
    font-size: 11px;
    font-weight: 800;
}

.section {
    margin-top: 32px;
}

code {
    background: #e2e8f0;
    padding: 2px 5px;
    border-radius: 4px;
}

</style>

</head>

<body>

<header>

<h1>Syncline SEO Intelligence Audit</h1>

<div>
Generated:
${escapeHtml(report.generated)}
</div>

<div>
Git branch:
<strong>
${escapeHtml(report.git.branch)}
</strong>
</div>

<div>
Commit:
<code>
${escapeHtml(report.git.commit)}
</code>
</div>

</header>


<main>


<div class="grid">

<div class="card">

<div class="label">
OVERALL SEO SCORE
</div>

<div class="score">
${report.score}/100
</div>

</div>


<div class="card">

<div class="metric">
${counts.critical}
</div>

<div class="label">
Critical
</div>

</div>


<div class="card">

<div class="metric">
${counts.high}
</div>

<div class="label">
High
</div>

</div>


<div class="card">

<div class="metric">
${counts.medium}
</div>

<div class="label">
Medium
</div>

</div>


<div class="card">

<div class="metric">
${report.pages.length}
</div>

<div class="label">
Pages crawled
</div>

</div>

</div>


<div class="section">

<h2>Production Summary</h2>

<div class="card">

<p>
<strong>Website:</strong>
${escapeHtml(LIVE_URL)}
</p>

<p>
<strong>Pages crawled:</strong>
${report.pages.length}
</p>

<p>
<strong>Sitemap URLs:</strong>
${report.sitemap.urls.length}
</p>

<p>
<strong>robots.txt:</strong>
HTTP ${report.robots.status ?? "ERROR"}
</p>

</div>

</div>


<div class="section">

<h2>Issues</h2>

<table>

<thead>

<tr>

<th>Severity</th>
<th>Category</th>
<th>Code</th>
<th>Issue</th>
<th>URL</th>
<th>Recommendation</th>

</tr>

</thead>

<tbody>

${issueRows}

</tbody>

</table>

</div>


<div class="section">

<h2>Pages</h2>

<table>

<thead>

<tr>
<th>URL</th>
<th>HTTP</th>
<th>Title</th>
<th>H1</th>
<th>Internal links</th>
<th>Rendered text</th>
<th>TTFB</th>
<th>Issues</th>
</tr>

</thead>

<tbody>

${pageRows}

</tbody>

</table>

</div>


<div class="section">

<h2>Git</h2>

<div class="card">

<p>
<strong>Branch:</strong>
${escapeHtml(report.git.branch)}
</p>

<p>
<strong>Commit:</strong>
${escapeHtml(report.git.commit)}
</p>

<p>
<strong>Working tree changes:</strong>
${report.git.status.length}
</p>

</div>

</div>


</main>

</body>

</html>`;
}


function escapeHtml(value = "") {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


// ============================================================
// MAIN
// ============================================================

async function main() {

    console.log("");
    console.log(
        pc.bold(
            pc.cyan(
                "================================================"
            )
        )
    );

    console.log(
        pc.bold(
            pc.cyan(
                " SYNCLINE SEO INTELLIGENCE AUDITOR"
            )
        )
    );

    console.log(
        pc.cyan(
            "================================================"
        )
    );

    console.log("");


    await fs.mkdir(
        REPORT_DIR,
        {
            recursive: true
        }
    );


    const git =
        getGitInfo();


    console.log(
        `${pc.gray("Git branch:")} ${pc.bold(git.branch)}`
    );

    console.log(
        `${pc.gray("Live site:")} ${LIVE_URL}`
    );

    console.log(
        `${pc.gray("Max pages:")} ${MAX_PAGES}`
    );

    console.log("");


    // --------------------------------------------------------
    // LOCAL
    // --------------------------------------------------------

    console.log(
        pc.bold(
            pc.yellow(
                "Scanning local development project..."
            )
        )
    );

    const local =
        await scanLocalProject();


    console.log(
        pc.green(
            `✓ ${local.files.length} files analysed`
        )
    );

    console.log(
        pc.green(
            `✓ ${local.seoFiles.length} SEO files discovered`
        )
    );

    console.log(
        pc.yellow(
            `⚠ ${local.sourceIssues.length} local source issues`
        )
    );

    console.log("");


    if (LOCAL_ONLY) {

        const report = {
            generated: now(),
            git,
            local,
            pages: [],
            sitemap: {
                urls: []
            },
            robots: {
                status: null
            },
            globalIssues: [],
            localIssues: local.sourceIssues,
            score: 0
        };

        await writeReports(report);

        console.log(
            pc.green(
                "Local audit complete."
            )
        );

        return;
    }


    // --------------------------------------------------------
    // ROBOTS
    // --------------------------------------------------------

    console.log(
        pc.bold(
            pc.yellow(
                "Auditing robots.txt..."
            )
        )
    );

    const robots =
        await auditRobots(
            LIVE_URL
        );


    // --------------------------------------------------------
    // SITEMAP
    // --------------------------------------------------------

    console.log(
        pc.bold(
            pc.yellow(
                "Auditing sitemap.xml..."
            )
        )
    );

    const sitemap =
        await auditSitemap(
            LIVE_URL
        );


    console.log(
        pc.green(
            `✓ Sitemap URLs: ${sitemap.urls.length}`
        )
    );


    // --------------------------------------------------------
    // CRAWL
    // --------------------------------------------------------

    console.log("");

    console.log(
        pc.bold(
            pc.yellow(
                "Crawling live website..."
            )
        )
    );


    const pages =
        await crawlSite(
            LIVE_URL,
            sitemap.urls
        );


    console.log("");

    console.log(
        pc.green(
            `✓ Crawled ${pages.length} pages`
        )
    );


    // --------------------------------------------------------
    // GLOBAL ANALYSIS
    // --------------------------------------------------------

    const globalIssues = [
        ...robots.issues,
        ...sitemap.issues,
        ...detectDuplicates(pages),
        ...analyzeLinks(pages)
    ];


    // --------------------------------------------------------
    // SCORE
    // --------------------------------------------------------

    const score =
        calculateScore(
            pages,
            globalIssues,
            local.sourceIssues
        );


    const report = {
        generated: now(),
        liveUrl: LIVE_URL,
        git,
        local,
        robots,
        sitemap,
        pages,
        globalIssues,
        localIssues:
            local.sourceIssues,
        score
    };


    await writeReports(
        report
    );


    // --------------------------------------------------------
    // SUMMARY
    // --------------------------------------------------------

    const allIssues = [
        ...globalIssues,
        ...local.sourceIssues,
        ...pages.flatMap(
            page => page.issues
        )
    ];


    const critical =
        allIssues.filter(
            x => x.severity === "critical"
        ).length;

    const high =
        allIssues.filter(
            x => x.severity === "high"
        ).length;

    const medium =
        allIssues.filter(
            x => x.severity === "medium"
        ).length;

    const low =
        allIssues.filter(
            x => x.severity === "low"
        ).length;


    console.log("");

    console.log(
        pc.bold(
            pc.cyan(
                "================ FINAL AUDIT ================"
            )
        )
    );

    console.log("");

    console.log(
        `${pc.bold("SEO SCORE:")} ${score}/100`
    );

    console.log(
        `${pc.red("CRITICAL:")} ${critical}`
    );

    console.log(
        `${pc.red("HIGH:")}     ${high}`
    );

    console.log(
        `${pc.yellow("MEDIUM:")}   ${medium}`
    );

    console.log(
        `${pc.blue("LOW:")}      ${low}`
    );

    console.log("");

    console.log(
        pc.green(
            `Reports written to: ${REPORT_DIR}`
        )
    );

    console.log("");

    console.log(
        pc.bold(
            "Top priorities:"
        )
    );


    allIssues
        .sort(
            (a, b) =>
                b.score - a.score
        )
        .slice(0, 10)
        .forEach(
            (item, index) => {

                console.log(
                    `${index + 1}. ` +
                    `[${item.severity.toUpperCase()}] ` +
                    `${item.message}`
                );

                if (item.url) {
                    console.log(
                        `   ${item.url}`
                    );
                }
            }
        );


    console.log("");

    console.log(
        pc.bold(
            pc.cyan(
                "================================================"
            )
        )
    );
}


// ============================================================
// WRITE REPORTS
// ============================================================

async function writeReports(report) {

    await fs.mkdir(
        REPORT_DIR,
        {
            recursive: true
        }
    );


    await fs.writeFile(
        path.join(
            REPORT_DIR,
            "seo-report.json"
        ),
        JSON.stringify(
            report,
            null,
            2
        ),
        "utf8"
    );


    await fs.writeFile(
        path.join(
            REPORT_DIR,
            "seo-report.html"
        ),
        generateHtmlReport(
            report
        ),
        "utf8"
    );


    await fs.writeFile(
        path.join(
            REPORT_DIR,
            "live-pages.json"
        ),
        JSON.stringify(
            report.pages,
            null,
            2
        ),
        "utf8"
    );


    await fs.writeFile(
        path.join(
            REPORT_DIR,
            "local-pages.json"
        ),
        JSON.stringify(
            report.local,
            null,
            2
        ),
        "utf8"
    );
}


// ============================================================
// START
// ============================================================

main()
    .catch(error => {

        console.error("");

        console.error(
            pc.red(
                "SEO AUDITOR FAILED"
            )
        );

        console.error(
            error
        );

        process.exit(1);
    });