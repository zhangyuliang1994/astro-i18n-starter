import { DEFAULT_LOCALE_SETTING, LOCALES_SETTING } from "./locales";
import { getRelativeLocaleUrl } from "astro:i18n";


/**
 * User-defined locales list
 * @constant @readonly
 */
export const LOCALES = LOCALES_SETTING as Record<string, LocaleConfig>;
type LocaleConfig = {
  readonly label: string;
  readonly lang?: string;
  readonly dir?: "ltr" | "rtl";
};


/**
 * Type for the language code
 * @example
 * "en" | "ja" | ...
 */
export type Lang = keyof typeof LOCALES;


/**
 * Default locale code
 * @constant @readonly
*/
export const DEFAULT_LOCALE = DEFAULT_LOCALE_SETTING as Lang;


/**
 * Type for the multilingual object
 * @example
 * { en: "Hello", ja: "こんにちは", ... }
 */
export type Multilingual = { [key in Lang]?: string };


/**
 * Helper to get the translation function
 * @param - The current language
 * @returns - The translation function
 */
export function useTranslations(lang: Lang) {
  return function t(multilingual: Multilingual | string): string {
    if (typeof multilingual === "string") {
      return multilingual;
    } else {
      return multilingual[lang] || multilingual[DEFAULT_LOCALE] || "";
    }
  };
}


/**
 * Helper to get corresponding path list for all locales
 * @param url - The current URL object
 * @returns - The list of locale paths
 */
export function getLocalePaths(url: URL): LocalePath[] {
  const pathname = url.pathname;

  // 处理标签详情页：切换语言时跳转到标签列表页
  // Handle tag detail pages: redirect to tag list when switching language
  const tagDetailMatch = pathname.match(/^\/[a-zA-Z-]+\/tags\/[^/]+\/?$/);
  if (tagDetailMatch) {
    return Object.keys(LOCALES).map((lang) => {
      return {
        lang: lang as Lang,
        path: getRelativeLocaleUrl(lang, '/tags/')
      };
    });
  }

  // 处理分类详情页：切换语言时跳转到分类列表页
  // Handle category detail pages: redirect to category list when switching language
  const categoryDetailMatch = pathname.match(/^\/[a-zA-Z-]+\/categories\/[^/]+\/?$/);
  if (categoryDetailMatch) {
    return Object.keys(LOCALES).map((lang) => {
      return {
        lang: lang as Lang,
        path: getRelativeLocaleUrl(lang, '/categories/')
      };
    });
  }

  // 默认行为：直接替换语言代码
  return Object.keys(LOCALES).map((lang) => {
    return {
      lang: lang as Lang,
      path: getRelativeLocaleUrl(lang, pathname.replace(/^\/[a-zA-Z-]+/, ''))
    };
  });
}

type LocalePath = {
  lang: Lang;
  path: string;
};


/**
 * Helper to get locale parms for Astro's `getStaticPaths` function
 * @returns - The list of locale params
 * @see https://docs.astro.build/en/guides/routing/#dynamic-routes
 */
export const localeParams = Object.keys(LOCALES).map((lang) => ({
  params: { lang },
}));
