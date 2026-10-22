/**
 * 农历干支纪年与四时节令辅助工具
 */

const HEAVENLY_STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const EARTHLY_BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const ZODIAC_ANIMALS = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];

export function getSexagenaryYear(year: number): {
	stem: string;
	branch: string;
	zodiac: string;
	name: string;
} {
	const offset = (year - 4) % 60;
	const stemIndex = (offset % 10 + 10) % 10;
	const branchIndex = (offset % 12 + 12) % 12;

	return {
		stem: HEAVENLY_STEMS[stemIndex],
		branch: EARTHLY_BRANCHES[branchIndex],
		zodiac: ZODIAC_ANIMALS[branchIndex],
		name: `${HEAVENLY_STEMS[stemIndex]}${EARTHLY_BRANCHES[branchIndex]}`,
	};
}

export function getTraditionalDateLabel(date: Date, isEn: boolean): string {
	if (isEn) {
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	}

	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const sexagenary = getSexagenaryYear(year);

	let season = "冬";
	if (month >= 3 && month <= 5) season = "春";
	else if (month >= 6 && month <= 8) season = "夏";
	else if (month >= 9 && month <= 11) season = "秋";

	return `${year}年${month}月${day}日 · ${sexagenary.name}年${season}`;
}
