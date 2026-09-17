// check-seo.js  (fixed version)
import https from 'https';
import http from 'http';
import { parseStringPromise } from 'xml2js';

const SITEMAP_URL = 'https://www.syncline.com.au/sitemap.xml';
const USER_AGENT = 'Mozilla/5.0 (compatible; SEO-Checker/1.0)';

function request(url, maxRedirects = 8) {
  return new Promise((resolve) => {
    const chain = [];
    let current = url;
    let redirects = 0;

    const doRequest = () => {
      const lib = current.startsWith('https') ? https : http;

      const req = lib.get(
        current,
        {
          headers: {
            'User-Agent': USER_AGENT,
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          },
          timeout: 12000,
        },
        (res) => {
          let body = '';
          res.on('data', (chunk) => (body += chunk));
          res.on('end', () => {
            chain.push({
              url: current,
              status: res.statusCode,
              location: res.headers.location || null,
            });

            // Follow redirects
            if (
              res.statusCode >= 300 &&
              res.statusCode < 400 &&
              res.headers.location &&
              redirects < maxRedirects
            ) {
              current = new URL(res.headers.location, current).href;
              redirects++;
              doRequest();
              return;
            }

            resolve({
              chain,
              finalStatus: res.statusCode,
              finalUrl: current,
              headers: res.headers,
              body,
              error: null,
            });
          });
        }
      );

      req.on('error', (err) => {
        resolve({
          chain,
          finalStatus: 0,
          finalUrl: current,
          body: '',
          error: err.message,
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({
          chain,
          finalStatus: 0,
          finalUrl: current,
          body: '',
          error: 'Timeout',
        });
      });
    };

    doRequest();
  });
}

async function main() {
  console.log('Fetching sitemap...\n');

  const sitemapResult = await request(SITEMAP_URL);

  if (sitemapResult.error || sitemapResult.finalStatus !== 200) {
    console.error('Failed to fetch sitemap:');
    console.error('Status:', sitemapResult.finalStatus);
    console.error('Error:', sitemapResult.error);
    console.error('Redirect chain:', sitemapResult.chain);
    return;
  }

  let parsed;
  try {
    parsed = await parseStringPromise(sitemapResult.body);
  } catch (err) {
    console.error('Sitemap is not valid XML. First 300 characters of response:');
    console.error(sitemapResult.body.slice(0, 300));
    return;
  }

  const urls = parsed.urlset.url.map((u) => u.loc[0]);
  console.log(`Found ${urls.length} URLs in sitemap\n`);
  console.log('='.repeat(90));

  const problems = [];

  for (const url of urls) {
    process.stdout.write(`Checking ${url.padEnd(55)} `);

    const result = await request(url);

    const isRedirect = result.chain.length > 1;
    const badStatus = result.finalStatus !== 200;
    const robotsHeader = result.headers?.['x-robots-tag'] || '';
    const metaRobotsMatch = (result.body || '').match(
      /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i
    );
    const metaRobots = metaRobotsMatch ? metaRobotsMatch[1] : null;
    const canonicalMatch = (result.body || '').match(
      /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i
    );
    const canonical = canonicalMatch ? canonicalMatch[1] : null;

    const noindex =
      /noindex/i.test(robotsHeader) || (metaRobots && /noindex/i.test(metaRobots));

    if (badStatus || isRedirect || noindex || result.error) {
      problems.push({
        url,
        ...result,
        robotsHeader,
        metaRobots,
        canonical,
        noindex,
      });
      console.log('⚠️  ISSUE');
    } else {
      console.log('✅ OK');
    }

    // Be polite to the server
    await new Promise((r) => setTimeout(r, 250));
  }

  console.log('\n' + '='.repeat(90));
  console.log(`\nSUMMARY → ${problems.length} page(s) with potential issues\n`);

  if (problems.length === 0) {
    console.log('🎉 No indexing or redirect problems found!');
    return;
  }

  problems.forEach((p, i) => {
    console.log(`\n${i + 1}. ${p.url}`);
    console.log(`   Final Status : ${p.finalStatus}`);
    console.log(`   Final URL    : ${p.finalUrl}`);

    if (p.chain.length > 1) {
      console.log('   Redirect chain:');
      p.chain.forEach((c, idx) => {
        console.log(
          `     ${idx + 1}. [${c.status}] ${c.url}${c.location ? '  →  ' + c.location : ''}`
        );
      });
    }

    if (p.robotsHeader) console.log(`   X-Robots-Tag : ${p.robotsHeader}`);
    if (p.metaRobots) console.log(`   meta robots  : ${p.metaRobots}`);
    if (p.canonical) console.log(`   Canonical    : ${p.canonical}`);
    if (p.noindex) console.log(`   ⚠️  NOINDEX detected`);
    if (p.error) console.log(`   Error        : ${p.error}`);
  });
}

main().catch(console.error);