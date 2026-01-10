# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server
npm run dev

# Start dev server and open in browser
npm run start

# Type check and build for production
npm run build

# Preview production build locally
npm run preview

# Type checking only
npx astro check
```

## Project Architecture

This is an **Astro-based multilingual blog/documentation site** using Astro's official i18n routing with the subdirectory format (e.g., `/en/`, `/zh-cn/`).

### i18n Architecture

The i18n system is built on three core files:

1. **`src/locales.ts`** - Configure supported languages here
   - `DEFAULT_LOCALE_SETTING`: Sets the default language
   - `LOCALES_SETTING`: Object defining all supported locales with labels and lang codes

2. **`src/i18n.ts`** - Core i18n utilities
   - `useTranslations(lang)`: Returns translation function `t()` that accepts `Multilingual` objects
   - `getLocalePaths(url)`: Generates locale-aware path alternatives (handles special cases for tag/category detail pages)
   - `localeParams`: Helper for `getStaticPaths()` in dynamic routes
   - `Multilingual` type: `{ [key in Lang]?: string }` for defining translations inline

3. **`src/consts.ts`** - Global site constants using `Multilingual` type for translated values (e.g., `SITE_TITLE`, `SITE_DESCRIPTION`)

### Routing Structure

- **Root redirects**: `/` → redirects to default locale
- **Static locale pages**: `src/pages/en/` and `src/pages/zh-cn/` (deprecated pattern, kept for compatibility)
- **Dynamic locale pages**: `src/pages/[lang]/` (primary pattern)
  - All new pages should go here
  - Uses `getStaticPaths()` with `localeParams` to generate routes for each locale

### Content Collections

Three content collections defined in `src/content.config.ts`:

1. **`blog`** - Blog posts organized by language: `src/content/blog/{lang}/{slug}/index.mdx`
2. **`projects`** - Project pages: `src/content/projects/{lang}/{slug}/index.mdx`
3. **`docs`** - Documentation: `src/content/docs/{lang}/{slug}/index.mdx`

Each collection uses glob loader pattern `**/[^_]*.mdx` (files starting with `_` are ignored).

Schema includes: `title`, `description`, `date`, `cover` (optional), and for blog: `tags[]` and `categories[]`.

### Component Organization

- **`src/components/i18n/`** - i18n-specific components:
  - `LocaleHtmlHead.astro` - SEO meta tags with hreflang
  - `LocaleSelect.astro` - Language switcher
  - `LocaleSuggest.astro` - Suggests available translations
  - `NotTranslateCaution.astro` - Warning when content not available in current language

- **`src/components/`** - General components (Header, Footer, PageHeadline, etc.)

### Adding New Content

**Blog post example:**
```bash
mkdir -p src/content/blog/en/my-post
# Create src/content/blog/en/my-post/index.mdx with frontmatter
mkdir -p src/content/blog/zh-cn/my-post
# Create src/content/blog/zh-cn/my-post/index.mdx with Chinese content
```

The folder name becomes the slug. Images can be placed alongside the MDX file.

### Key Patterns

- **Translation pattern**: Define multilingual values as objects in `consts.ts`:
  ```ts
  export const MY_CONST: Multilingual = {
    en: "English text",
    "zh-cn": "中文文本"
  };
  ```
  Then use `useTranslations(lang)` to get the translation function.

- **Dynamic pages**: All dynamic routes in `src/pages/[lang]/` should export `getStaticPaths()` that uses `localeParams`.

- **Path aliases**: Use `@/` prefix for imports (e.g., `@/i18n`, `@/components`).

- **Special routing logic**: Tag and category detail pages redirect to list pages when switching languages (see `getLocalePaths()` in `src/i18n.ts`).

### Configuration

- **Astro config** (`astro.config.mjs`): Site URL is dynamically determined from environment variables (`SITE_URL`, `VERCEL_URL`, `CF_PAGES_URL`)
- **TypeScript**: Uses strict mode with path aliases configured in `tsconfig.json`
- **Deployment**: Static site generation (`output: 'static'`), works on Vercel/Cloudflare Pages/GitHub Pages
