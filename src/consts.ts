// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import type { Multilingual } from "@/i18n";

export const SITE_TITLE: string | Multilingual = {
	en: "frency.me",
	"zh-cn": "xiaofeng.show",
};

export const SITE_DESCRIPTION: string | Multilingual = {
	en: "frency.me is Frency's digital garden about AI, indie development, SEO, software engineering, and building for global markets.",
	"zh-cn": "xiaofeng.show 是小峰的个人数字花园，记录 AI、独立开发、SEO、软件工程与出海实践。",
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
			en: "The day before yesterday I saw a rabbit, yesterday a deer, and today, you.",
			"zh-cn": "おとといはウサギお見たの、昨日は鹿、今日はあなた"
		}
	},
	{
		name: { en: "Jason Xu", "zh-cn": "Jason Xu" },
		url: "https://www.xhjvyq.cn/",
		avatar: "https://www.xhjvyq.cn/favicon.ico",
		description: {
			en: "I wish I could buy osmanthus wine and sail with you, but youth can never be relived.",
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
