/**
 * Auto-generates public/sitemap.xml from the site's routes + data.
 * Runs before every build (see the "build" script in package.json), so the
 * sitemap always reflects the current project and blog content — no manual XML.
 *
 * To add a new static route, add it to STATIC_ROUTES below. Project detail
 * pages and blog articles are picked up automatically from the data files.
 */
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import projects from '../src/data/projectsData.js';
import { blogPosts } from '../src/data/blogData.js';

const SITE = 'https://lloydrosales.com';
const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

// Static top-level routes: [path, changefreq, priority]
const STATIC_ROUTES = [
    ['/', 'weekly', '1.0'],
    ['/about', 'monthly', '0.9'],
    ['/projects', 'monthly', '0.8'],
    ['/blog', 'weekly', '0.8'],
    ['/achievements', 'monthly', '0.8'],
    ['/skills', 'monthly', '0.8'],
    ['/contact', 'yearly', '0.7'],
];

const urls = [
    ...STATIC_ROUTES.map(([path, changefreq, priority]) => ({
        loc: `${SITE}${path}`,
        lastmod: today,
        changefreq,
        priority,
    })),
    // Project detail pages
    ...projects
        .filter((p) => p.slug)
        .map((p) => ({
            loc: `${SITE}/projects/${p.slug}`,
            lastmod: today,
            changefreq: 'monthly',
            priority: '0.7',
        })),
    // Blog articles (only in-site posts with a slug; external-url posts are skipped)
    ...blogPosts
        .filter((p) => p.slug)
        .map((p) => ({
            loc: `${SITE}/blog/${p.slug}`,
            lastmod: p.date || today,
            changefreq: 'monthly',
            priority: '0.7',
        })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
    .map(
        (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join('\n')}
</urlset>
`;

const outPath = resolve(dirname(fileURLToPath(import.meta.url)), '../public/sitemap.xml');
writeFileSync(outPath, xml, 'utf8');
console.log(`✓ sitemap.xml generated with ${urls.length} URLs`);
