import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { DEFAULT_LOCALE_SETTING, LOCALES_SETTING } from './src/locales';

// Use an explicitly configured canonical URL when provided. Platform-provided
// deployment URLs frequently point at preview builds and must not leak into
// canonical, hreflang, sitemap, or Open Graph metadata.
const getSiteUrl = () => {
  return process.env.SITE_URL || 'https://frency.me';
};

export default defineConfig({
  output: 'static', // Static site generation - no adapter needed
  site: getSiteUrl(),
  i18n: {
    defaultLocale: DEFAULT_LOCALE_SETTING,
    locales: Object.keys(LOCALES_SETTING),
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: DEFAULT_LOCALE_SETTING,
        locales: Object.fromEntries(
          Object.entries(LOCALES_SETTING).map(
            ([key, value]) => [key, value.lang ?? key]
          )
        ),
      },
    })
  ],
});
