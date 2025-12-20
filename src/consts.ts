// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import type { Multilingual } from "@/i18n";

export const SITE_TITLE: string | Multilingual = "Astro i18n Starter";

export const SITE_DESCRIPTION: string | Multilingual = {
	en: "A starter template for Astro with i18n support.",
	"zh-cn": "具有 i18n 支持的 Astro 入门模板。",
};

export const X_ACCOUNT: string | Multilingual = "@psephopaiktes";

export const NOT_TRANSLATED_CAUTION: string | Multilingual = {
	en: "This page is not available in your language.",
	"zh-cn": "此页面不支持您的语言。",
};

export interface FriendLink {
	name: string | Multilingual;
	url: string;
	avatar: string;
	description: string | Multilingual;
}

export const FRIEND_LINKS: FriendLink[] = [
	{
		name: { en: "Reading Notes", "zh-cn": "读书笔记" },
		url: "https://zhangyuliang.notion.site/",
		avatar: "https://www.notion.so/images/logo-ios.png",
		description: {
			en: "My personal reading notes and knowledge base.",
			"zh-cn": "我的个人读书笔记和知识库"
		}
	},
	{
		name: { en: "MDN Web Docs", "zh-cn": "MDN Web 文档" },
		url: "https://developer.mozilla.org",
		avatar: "https://developer.mozilla.org/apple-touch-icon.png",
		description: {
			en: "Resources for developers, by developers.",
			"zh-cn": "为开发者提供的权威 Web 技术文档"
		}
	},
	{
		name: { en: "GitHub", "zh-cn": "GitHub" },
		url: "https://github.com",
		avatar: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
		description: {
			en: "Where the world builds software.",
			"zh-cn": "全球最大的代码托管平台"
		}
	},
	{
		name: { en: "DEV Community", "zh-cn": "DEV 社区" },
		url: "https://dev.to",
		avatar: "https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png",
		description: {
			en: "A community of software developers.",
			"zh-cn": "开发者交流社区"
		}
	},
	{
		name: { en: "Stack Overflow", "zh-cn": "Stack Overflow" },
		url: "https://stackoverflow.com",
		avatar: "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png",
		description: {
			en: "Where developers learn, share, & build careers.",
			"zh-cn": "开发者问答社区"
		}
	},
	{
		name: { en: "CSS-Tricks", "zh-cn": "CSS-Tricks" },
		url: "https://css-tricks.com",
		avatar: "https://css-tricks.com/apple-touch-icon.png",
		description: {
			en: "Tips, tricks, and techniques on using CSS.",
			"zh-cn": "CSS 技巧和前端开发资源"
		}
	}
];
