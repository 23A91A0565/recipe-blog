const fs = require('fs');
const path = require('path');


// Mock recipes data for sitemap generation
const MOCK_RECIPES = {
  en: [
    { slug: 'classic-spanish-paella' },
    { slug: 'chocolate-chip-cookies' },
    { slug: 'thai-green-curry' },
    { slug: 'margherita-pizza' },
    { slug: 'beef-tacos' },
  ],
  es: [
    { slug: 'classic-spanish-paella' },
    { slug: 'margherita-pizza' },
    { slug: 'beef-tacos' },
  ],
  fr: [
    { slug: 'classic-spanish-paella' },
    { slug: 'chocolate-chip-cookies' },
  ],
};

async function generateSitemap() {
  const locales = ['en', 'es', 'fr'];
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  sitemap += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  // Add homepage for all locales
  for (const locale of locales) {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${baseUrl}/${locale}</loc>\n`;
    sitemap += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    sitemap += `  </url>\n`;
  }

  // Add recipes list page for all locales
  for (const locale of locales) {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${baseUrl}/${locale}/recipes</loc>\n`;
    sitemap += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    sitemap += `  </url>\n`;
  }

  // Add individual recipe pages for all locales
  for (const locale of locales) {
    const recipes = MOCK_RECIPES[locale] || [];
    for (const recipe of recipes) {
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${baseUrl}/${locale}/recipes/${recipe.slug}</loc>\n`;
      sitemap += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      sitemap += `  </url>\n`;
    }
  }

  sitemap += '</urlset>';

  const publicDir = path.join(process.cwd(), 'public');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');

  fs.writeFileSync(sitemapPath, sitemap);
  console.log(`✓ Sitemap generated at ${sitemapPath}`);
}

generateSitemap().catch((error) => {
  console.error('Error generating sitemap:', error);
  process.exit(1);
});
