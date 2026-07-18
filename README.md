# Astro i18n Starter

```sh
npm create astro@latest -- --template psephopaiktes/astro-i18n-starter
```

[![Logo Image](docs/hero.svg)](https://astro-i18n-starter.pages.dev/ "See document")

i18n Starter is a simple [Astro](https://astro.build) theme for creating multilingual websites.

It supports [i18n routing in Astro v4.0](https://docs.astro.build/en/guides/internationalization/).

It only supports the subdirectory URL format. Each language is managed with a URL like the following. The root URL will redirect to the specified default language.

- example.com/en/
- example.com/ja/

## AI knowledge base synchronization

Blog articles under `src/content/blog/**/index.mdx` are synchronized to the
RAG knowledge base by `.github/workflows/deploy.yml` after the site deploys.

- Pushes use Git history to upsert changed articles and remove superseded or
  deleted chunks.
- Manual workflow runs perform a full reconciliation and remove remote blog
  chunks that no longer exist in this repository.
- The synchronization job intentionally fails without credentials so a stale
  knowledge base is visible instead of being silently ignored.

Before enabling the workflow:

1. Deploy a `blog-worker` version that includes `GET /api/admin/chunks`.
2. Add the Worker's `ADMIN_TOKEN` value as the repository Actions secret
   `BLOG_KB_ADMIN_TOKEN`.
3. Optionally set the Actions variable `BLOG_KB_WORKER_URL`; it defaults to
   `https://api.frency.me`.
4. Run the deployment workflow manually once to reconcile the existing index.

For a local preview that does not write remotely:

```bash
DRY_RUN=1 npm run sync:blog-index:all
```


## Features

- [x] Support for Astro's official i18n functionality
- [x] Various methods for managing multilingual pages
- [x] Vanilla CSS
- [x] SEO-friendly


## Lighthouse Score

[![All scores are 100.](docs/lighthouse.png)](https://pagespeed.web.dev/analysis/https-astro-i18n-starter-pages-dev-en/8sg3q21r6c?form_factor=desktop "Check score")


## Documentation

This theme is self-documented, and the pages within this theme can be considered as documentation.

Install and preview locally or check out the sample site below.

https://astro-i18n-starter.pages.dev/
