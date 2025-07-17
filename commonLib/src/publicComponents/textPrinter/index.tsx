/**
 * 群组的首页
 */
import React, { useState, useEffect, Fragment, useRef } from "react";
import useJquery, { jQueryObject, isRunningInServer } from "@bobliao/use-jquery-hook";
import styles from "./index.module.scss";

//获得一个随机数
const getRand = function (Max: number, Min: number): number {
	var Range = Max - Min;
	var Rand = Math.random();
	if (Math.round(Rand * Range) == 0) {
		return Min + 1;
	}
	var num = Min + Math.round(Rand * Range);
	return num;
};

//往外面暴露统一名称的属性对象，用于生成低代码平台属性JSON schema
export type Tinputprops = {
	_value?: string;
	_isAnimate?: boolean;
	_hideCursor?: boolean;
	_time?: number;
	_delayTime?: number;
};

/**
 * 逐字打印文本组件
 *
 * @param _value - 要打印的文本内容，非必填，默认为空字符串
 * @param _isAnimate - 是否启用动画效果（逐字符显示），默认为 true
 * @param _hideCursor - 打印完成后是否隐藏闪烁光标，默认为 false
 * @param _time - 打印动画总时长，单位毫秒，默认为 800
 * @param _delayTime - 动画开始前的延迟时长，单位毫秒，默认为 0
 */
const TextPrinter = ({ _value = "", _isAnimate = true, _hideCursor = false, _time = 800, _delayTime = 0 }: Tinputprops) => {
	/**
	 * 是否已加载界面
	 */
	let [isMonted, setIsmonted] = useState(false);
	let [text, setText] = useState("");
	let [displayText, setDisplayText] = useState("");
	let [animation_duration, setAnimation_duration] = useState("0.5");
	let flashingCursor = useRef(null);

	const $ = useJquery();

	useEffect(function () {
		if (isMonted === false) {
			setIsmonted(true);
		}

		return function () {
			setIsmonted(false);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(
		function () {
			if (isMonted === true) {
				if (_value !== null) {
					$(flashingCursor.current).show();
					setAnimation_duration(getRand!(2, 0).toString() + "s");
					setText(_value);
					if (_isAnimate) {
						$({ value: 0 })
							.delay(_delayTime)
							.animate(
								{ value: _value.length },
								{
									duration: _time,
									easing: "linear",
									step: function () {
										setDisplayText(_value.substring(0, this.value.toFixed(0)));
									},
									complete: function () {
										setDisplayText(_value.substring(0, _value.length));
										if (_hideCursor) {
											$(flashingCursor.current).delay(1000).fadeOut(400);
										}
									},
								}
							);
					} else {
						setDisplayText(_value);
					}
				}
			} else {
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[isMonted, _value]
	);

	return (
		<>
			{displayText} <sup className={styles.textPrinter_cursor} style={{ animationDuration: animation_duration }} ref={flashingCursor}></sup>
		</>
	);
};
//为防止在编译和混淆后，无法识别组件名称，所以在这里显示定义名称
TextPrinter.displayName = "TextPrinter";
export default TextPrinter;
