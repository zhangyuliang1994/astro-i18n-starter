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
		name: { en: "Yuikij's Blog", "zh-cn": "Yuikij's Blog" },
		url: "https://blog.yuisama.top:8000/kibou/",
		avatar: "https://blog.yuisama.top:8000/kibou/img/avatar.jpg",
		description: {
			en: "おとといはウサギお見たの、昨日は鹿、今日はあなた",
			"zh-cn": "おとといはウサギお見たの、昨日は鹿、今日はあなた"
		}
	},
	{
		name: { en: "Jason Xu", "zh-cn": "Jason Xu" },
		url: "https://www.xhjvyq.cn/",
		avatar: "https://www.xhjvyq.cn/favicon.ico",
		description: {
			en: "欲买桂花同载酒，终不似，少年游。",
			"zh-cn": "欲买桂花同载酒，终不似，少年游。"
		}
	},
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
		name: { en: "Baoyu's Sharing", "zh-cn": "宝玉的分享" },
		url: "https://baoyu.io/",
		avatar: "https://baoyu.io/images/avatar.jpg",
		description: {
			en: "Sharing on LLM, Prompt Engineering, Software Engineering and more.",
			"zh-cn": "大语言模型、Prompt Engineering、软件工程、工程管理、前端等领域的分享"
		}
	},
	{
		name: { en: "Ruan Yifeng", "zh-cn": "阮一峰的个人网站" },
		url: "https://www.ruanyifeng.com/",
		avatar: "https://www.ruanyifeng.com/favicon.ico",
		description: {
			en: "Ruan Yifeng's Personal Website - Blog, Essays, and more.",
			"zh-cn": "网络日志、文集、技术分享"
		}
	}
];

