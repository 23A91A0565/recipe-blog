import type { NextApiRequest, NextApiResponse } from 'next';
import cmsService from '../../lib/cmsService';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
    const locales = ['en', 'es', 'fr'];
    const baseUrl = 'https://recipe-blog.com';

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
      const recipes = await cmsService.getRecipes(locale);
      for (const recipe of recipes) {
        sitemap += `  <url>\n`;
        sitemap += `    <loc>${baseUrl}/${locale}/recipes/${recipe.slug}</loc>\n`;
        sitemap += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
        sitemap += `  </url>\n`;
      }
    }

    sitemap += '</urlset>';

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.write(sitemap);
    res.end();
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).end('Error generating sitemap');
  }
}
