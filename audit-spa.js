import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:4173'; 
const ROUTES = ['/', '/services', '/managed-it', '/cloud', '/security', '/contact'];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('\n--- STARTING PLAYWRIGHT SPA SEO AUDIT ---\n');

  for (const route of ROUTES) {
    const targetUrl = `${BASE_URL}${route}`;
    
    // Switch to domcontentloaded to prevent networkidle timeouts
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
    
    // Give React 1 second to execute client-side rendering
    await page.waitForTimeout(1000);

    const title = await page.title();
    const metaDesc = await page.$eval('meta[name="description"]', el => el.content).catch(() => 'MISSING');
    const h1Count = await page.$$eval('h1', els => els.length);
    const h1Text = h1Count > 0 ? await page.$eval('h1', el => el.innerText.trim()) : 'NONE';
    const bodyText = await page.$eval('body', el => el.innerText.replace(/\s+/g, ' ').trim());
    const wordCount = bodyText ? bodyText.split(' ').length : 0;

    console.log(`📍 Route: ${route}`);
    console.log(`   - Title: "${title}"`);
    console.log(`   - Meta Description: "${metaDesc}"`);
    console.log(`   - H1 Count: ${h1Count} (First H1: "${h1Text}")`);
    console.log(`   - Word Count: ${wordCount}`);
    console.log('--------------------------------------------------');
  }

  await browser.close();
})();