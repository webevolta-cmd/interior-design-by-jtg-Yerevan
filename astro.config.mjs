// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Netlify exposes the site's primary URL as `URL` during builds.
// `SITE_URL` can override it (e.g. once a custom domain is connected).
const site = process.env.SITE_URL || process.env.URL || 'https://interior-design-by-jtg.netlify.app';

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/thank-you/') && !page.includes('/404'),
    }),
  ],
  image: {
    responsiveStyles: false,
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
});
