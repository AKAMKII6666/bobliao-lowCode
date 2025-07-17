/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/**
 * 数字滚动器
 * 廖力编写
 * 2022/04/11
 */
import React, { useState, useEffect, Fragment, useRef, FC } from "react";
import _bigNumber from "bignumber.js";
import useJquery, { jQueryObject, isRunningInServer } from "@bobliao/use-jquery-hook";

import ReactElement from "react";
import { thousandsSplit } from "../../utils/utils";
import useDebounce from "renderer/utils/debounceHook";

/**
 * 传入参数
 */
export interface Iprops {
	/**
	 * 传入数字
	 * 或"loadding"
	 */
	_value: number | string | void;
	/**
	 * 是否千分位分割
	 */
	_isSplit?: boolean;
	/**
	 * 是否缓动
	 */
	_isAnimate?: boolean;
	/**
	 * 缓动时间
	 */
	_delay?: number;
	/**
	 * 保留小数点
	 */
	_fix?: number;
	/* 是否开启自适应 */
	_isAutoWidth?: boolean;
	/* 是否为纯字符串 */
	pureString?: boolean;
	/* 数字内容变化回调 */
	onChange?: (val: string) => void;
}

//往外面暴露统一名称的属性对象，用于生成低代码平台属性JSON schema
export type Tinputprops = Iprops;

const NumberRoller: FC<Iprops> = ({
	_value = null,
	_isSplit = true,
	_isAnimate = true,
	_delay = 800,
	_fix = 0,
	_isAutoWidth = false,
	pureString = false,
	onChange = function () {},
}) => {
	const $: jQueryObject = useJquery();
	const debounce = useDebounce();
	/**
	 * 是否已加载界面
	 */
	let [isMonted, setIsmonted] = useState<boolean>(false);
	let [number, setNumber] = useState<number | string>(0);
	let [displayNumber, setDisplayNumber] = useState<any>(0);
	let [finishRollingStamp, setfinishRollingStamp] = useState<number>(-1);
	let [windowChangeSizeStamp, setwindowChangeSizeStamp] = useState<number>(-1);
	/* 	let svg = require('./load.svg'); */

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
			if (isMonted && finishRollingStamp !== -1 && _isAutoWidth) {
				debounce(function () {
					let elem = $(spanref.current);
					let parent = $(spanref.current).parent();
					elem.css("fontSize", "");
					elem.css("display", "inline-block");
					elem.css("overflow", "hidden");
					if (elem.outerWidth() > parent.outerWidth()) {
						let rate = parent.outerWidth() / elem.outerWidth();
						let fontSize = Number(getComputedStyle(parent[0])["font-size"].replace("px", ""));
						elem.css("fontSize", fontSize * rate + "px");
					} else {
						elem.css("fontSize", "");
					}
					elem.css("display", "");
					elem.css("overflow", "");
				}, 500);
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		[isMonted, finishRollingStamp, windowChangeSizeStamp]
	);

	useEffect(
		function () {
			if (isMonted === true) {
				if (_value !== null && _value !== "loadding") {
					setNumber(_value);
					if (_isAnimate) {
						$({ value: number }).animate(
							{ value: _value },
							{
								duration: _delay,
								easing: "easeOutCubic",
								step: function () {
									setDisplayNumber(thousandsSplit!(parseFloat(_bigNumber(this.value).toFixed(_fix))));
									setfinishRollingStamp(+new Date());
								},
								complete: function () {
									setDisplayNumber(thousandsSplit(_value as number));
									setfinishRollingStamp(+new Date());
								},
							}
						);
					} else {
						if (_isSplit) {
							setDisplayNumber(thousandsSplit(_value as number));
							setfinishRollingStamp(+new Date());
						} else {
							setDisplayNumber(_value);
							setfinishRollingStamp(+new Date());
						}
					}
				}

				if (_value === "loadding") {
					setDisplayNumber(<img /* src={svg.default.src} */ style={{ padding: "0px 0.2rem", width: "3rem" }} />);
				}
			} else {
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[isMonted, _value]
	);

	//onChange
	useEffect(
		function () {
			if (isMonted === true) {
				onChange(displayNumber);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[isMonted, displayNumber]
	);

	return (
		<>
			{(function () {
				if (displayNumber === "NaN" || displayNumber.toString() === "NaN") {
					return 0;
				}
				if (pureString) {
					return displayNumber;
				}
				return <span ref={spanref}>{displayNumber}</span>;
			})()}
		</>
	);
};
//为防止在编译和混淆后，无法识别组件名称，所以在这里显示定义名称
NumberRoller.displayName = "NumberRoller";
export default NumberRoller;
