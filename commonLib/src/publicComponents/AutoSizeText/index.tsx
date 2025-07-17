/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/**
 * 自动宽度文本
 * 廖力编写
 */
import React, { useState, useEffect, Fragment, useRef, FC } from "react";
import useJquery, { jQueryObject, isRunningInServer } from "@bobliao/use-jquery-hook";
import useDebounce from "renderer/utils/debounceHook";

/**
 * 传入参数
 */
export interface Iprops {
	/**
	文本
	 */
	_value: number | string | void;
}

//往外面暴露统一名称的属性对象，用于生成低代码平台属性JSON schema
export type Tinputprops = Iprops;

const AutoSizeText: FC<Iprops> = ({ _value = null }) => {
	const $: jQueryObject = useJquery();
	const debounce = useDebounce();
	/**
	 * 是否已加载界面
	 */
	let [isMonted, setIsmonted] = useState<boolean>(false);
	let [windowChangeSizeStamp, setwindowChangeSizeStamp] = useState<number>(-1);

	const spanref = useRef<HTMLSpanElement>(null);

	const windowChangeSize = function () {
		setwindowChangeSizeStamp(+new Date());
	};

	useEffect(function () {
		if (isMonted === false) {
			setIsmonted(true);
			$(window).resize(windowChangeSize);
		}

		return function () {
			setIsmonted(false);
			$(window).unbind("resize", windowChangeSize);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(
		function () {
			debounce(function () {
				let elem = $(spanref.current);
				let parent = $(spanref.current).parent();
				elem.css("fontSize", "");
				elem.css("display", "inline-block");
				elem.css("overflow", "hidden");
				elem.css("white-space", "nowrap");
				if (elem.outerWidth() > parent.outerWidth()) {
					let rate = parent.outerWidth() / elem.outerWidth();
					let fontSize = Number(getComputedStyle(parent[0])["font-size"].replace("px", ""));
					elem.css("fontSize", fontSize * rate + "px");
				} else {
					elem.css("fontSize", "");
				}
				elem.css("display", "");
				elem.css("overflow", "");
				elem.css("white-space", "");
			}, 500);
		},
		[isMonted, windowChangeSizeStamp]
	);

	return <span ref={spanref}>{_value}</span>;
};
//为防止在编译和混淆后，无法识别组件名称，所以在这里显示定义名称
AutoSizeText.displayName = "AutoSizeText";
export default AutoSizeText;
