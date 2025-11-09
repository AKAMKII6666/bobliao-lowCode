import { GridProps } from "@mui/material";

export const emptyImageUrl = "https://mithril-trinity.oss-cn-beijing.aliyuncs.com/main/home/emptyImage.png";

//同域设置cookie
export const setCookieSameDomain = function (name: string, value: string, time: string | number): void {
	let domain = window.location.hostname;
	if (domain.indexOf("localhost") === -1) {
		let domainNames = domain.split(".");
		domain = "." + domainNames[domainNames.length - 2] + "." + domainNames[domainNames.length - 1];
	} else {
		setCookie(name, value, time);
		return;
	}
	var Days = 365;
	var exp = new Date();
	if (typeof time === "undefined") {
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	} else {
		exp.setTime(exp.getTime() + Number(time));
	}
	document.cookie = `${name}=${escape(value)};expires=${exp.toUTCString()};domain=${domain};path=/; Secure; SameSite=None`;
	//name + "=" + escape(value) + ";expires=" + exp.toUTCString();
};

//设置cookie
export const setCookie = function (name: string, value: string, time: string | number): void {
	var Days = 365;
	var exp = new Date();
	if (typeof time === "undefined") {
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	} else {
		exp.setTime(exp.getTime() + Number(time));
	}
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toUTCString();
};

//获得一个gui ID
export const newGuid = function (): string {
	var guid: string = "";
	for (var i = 1; i <= 32; i++) {
		var n = Math.floor(Math.random() * 32.0).toString(32);
		guid += n;
	}
	return guid;
};

/**
 * 删除cookie
 */
export const delCookie = function (name: string): void {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
};

//获取cookie
export const getCookie = function (name: string): void | null | string {
	var arr: Array<string> | RegExpMatchArray | null,
		reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
};

/**
 * 提取url参数
 */
export const getUrlParams = function (): any {
	var url = location.href;
	var pstart = url.indexOf("?");
	var params: any = {};
	if (pstart > -1) {
		url = url.substring(pstart + 1);
		pstart = url.indexOf("#");
		if (pstart > -1) {
			url = url.substring(0, pstart);
		}
		var ps = url.split("&");
		if (ps.length > 0) {
			for (var i = 0; i < ps.length; i++) {
				var p = ps[i];
				var kv = p.split("=");
				if (kv.length == 2) {
					params[kv[0]] = kv[1];
				}
				if (kv.length == 3) {
					var kkk = kv[1].split("?");
					if (kkk.length == 2) {
						params[kv[0]] = kkk[0];
						params[kkk[1]] = kv[2];
					}
				}
			}
		}
	}
	return params;
};

/* 
	空key过滤器
*/
export const filterEmptyKey = (obj: any): any => {
	let resultKeys = {};
	for (var key in obj) {
		if (obj.hasOwnProperty(key) && obj[key].toString().trim() !== "") {
			resultKeys[key] = obj[key].toString();
		}
	}
	return resultKeys;
};

/* 
	空key过滤器 v2
*/
export const filterEmptyKeyV2 = (obj: any): any => {
	let resultKeys = {};
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			if (Array.isArray(obj[key])) {
				if (obj[key].length !== 0) {
					resultKeys[key] = obj[key];
				} else {
					resultKeys[key] = [];
				}
				continue;
			}
			if (typeof obj[key] === "string") {
				if (obj[key] !== "") {
					resultKeys[key] = obj[key];
				}
				continue;
			}
			resultKeys[key] = obj[key];
		}
	}
	return resultKeys;
};

export const useTimedout = function (promiseObj, time) {
	return Promise.race([
		promiseObj,
		new Promise(function (_res) {
			setTimeout(function () {
				_res({
					code: 500,
					msg: "操作超时",
				});
			}, time);
		}),
	]);
};

export const copyToClipboard = async function (text: string): Promise<boolean> {
	try {
		// 现代浏览器推荐方式（需要 HTTPS 环境）
		if (navigator.clipboard) {
			await navigator.clipboard.writeText(text);
			return true;
		}

		// 兼容旧浏览器的备用方案
		const textArea = document.createElement("textarea");
		textArea.value = text;

		// 避免屏幕闪烁的样式设置
		textArea.style.position = "fixed";
		textArea.style.top = "-9999px";
		textArea.style.left = "-9999px";

		document.body.appendChild(textArea);
		textArea.select();

		// 执行复制命令
		const success = document.execCommand("copy");
		document.body.removeChild(textArea);

		return success;
	} catch (err) {
		console.error("复制操作失败:", err);
		return false;
	}
};
//千分位分割
export const thousandsSplit = function (num: number | string): string {
	if (isNaN(Number(num))) {
		return num as unknown as string;
	}
	if (typeof num === "undefined") {
		return "";
	}

	var numStr = num.toString().trim().split(".")[0].split("");
	var output = "";

	var j = 0;
	for (var i = numStr.length - 1; i > -1; i--) {
		if (j % 3 == 0 && j != 0) {
			output = numStr[i] + "," + output;
		} else {
			output = numStr[i] + output;
		}
		j++;
	}
	if (num.toString().split(".")[1]) {
		output += "." + num.toString().split(".")[1];
	}
	return output;
};

export const OSS_UrlHead = "https://static-file-source.oss-cn-beijing.aliyuncs.com/";

/* 查询参数布局时Grid使用的公共尺寸 */
export const inqueryItemGridSize_public = {
	item: true,
	//超大屏
	xl: 4,
	//大屏
	lg: 6,
	//中屏
	md: 6,
	//小屏
	sm: 12,
	//超小屏
	xs: 12,
};
export const titleGridP_layout: GridProps = {
	item: true,
	xl: 4,
	lg: 3,
	md: 3,
	sm: 4,
	xs: 4,
	style: {
		textAlign: "right",
		display: "flex",
		alignItems: "center",
		alignContent: "center",
		justifyContent: "flex-end",
	},
};
export const contentGridP_layout: GridProps = {
	item: true,
	xl: 8,
	lg: 3,
	md: 3,
	sm: 8,
	xs: 8,
};

export const oldContentGridP_layout: GridProps = {
	item: true,
	xs: 12,
	md: 4,
};

/* 用于表单布局的新风格的容器的属性 */
export const formContainerGridProps_newStyle_layout: GridProps = {
	container: true,
	spacing: 2.6,
};

/* 用于表单布局的老风格的容器的属性 */
export const formContainerGridProps_oldStyle_layout: GridProps = {
	container: true,
	spacing: 2,
	alignItems: "center",
};

//用于地图编辑和展示的图例颜色组
export const MAP_ColorGroup = ["#ed888a", "#fe0000", "#d8b693", "#006382", "#84a355", "#ffffc1", "#feeebd", "#e0bfa0", "#deded4", "#ff9d80"];

export const convertToNumber = function (Obj: any, name: string) {
	if (typeof Obj[name] !== "undefined" && Obj[name] !== null && !isNaN(Number(Obj[name])) && Obj[name] !== "") {
		Obj[name] = Number(Obj[name]);
	}
	if (Obj[name] === "") {
		delete Obj[name];
	}
	return Obj;
};

//是否为undefined / null / 字符串空
export const isEmpty = function (obj: any) {
	if (typeof obj === "undefined" || obj === null || obj === "") {
		return true;
	}
	return false;
};

//超出省略
export const ellipsisText = function (text: string, maxLength: number): string {
	if (typeof text !== "string") {
		return "";
	}
	if (text.length <= maxLength) {
		return text;
	}
	return text.slice(0, maxLength) + "...";
};

//获得当前是横屏还是竖屏
export const getIsHorizontal = function () {
	const width = window.innerWidth;
	const height = window.innerHeight;
	return width > height;
};
