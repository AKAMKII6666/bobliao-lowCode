/**
 * 廖力编写
 * 模块名称：
 * 模块说明：
 * 编写时间：
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement, memo } from "react";
import styles from "./index.module.scss";
import useJquery from "@bobliao/use-jquery-hook";
import { date } from "yup";
import { Tooltip } from "@mui/material";
import useDebounce from "MithalCommonLibrary/utils/debounceAdv2Hook";

export interface IcTItem {
	/**
	 * 标题
	 */
	label: string;
	/**
	 * 实际文本
	 */
	value: string;
	/**
	 * 详细解释
	 */
	desc: string;
}

/**
 * 传入参数
 */
export interface IFastTextInputProps {
	/**
	 * 当前文本框的值
	 */
	value?: string;
	/**
	 * 改变值的时候
	 * @param val 值
	 * @returns
	 */
	onChange?: (val: any) => void;
	/**
	 * 当在文本框里点击回车键的时候
	 * @returns
	 */
	onEnter?: () => void;
	/**
	 * 当点击esc时
	 * @returns
	 */
	onEsc?: () => void;
	/**
	 * 当用通过方向键户操作到最末尾时，再继续点击方向左键时的事件
	 * @returns
	 */
	onLeftJump?: () => void;
	/**
	 * 当用通过方向键户操作到最开头时，再继续点击方向右键时的事件
	 * @returns
	 */
	onRightJump?: () => void;
	/**
	 * 提示词文本组
	 */
	completeTexts?: IcTItem[];
	/**
	 * 样式
	 */
	className?: string;
	/**
	 * 附加样式
	 */
	classAdd?: string;
	/**
	 * 附加样式
	 */
	completeClassAdd?: string;
	/**
	 * 行样式
	 */
	style?: React.CSSProperties;
	/**
	 * 是否启用类型检测模式
	 */
	isEnableTypeRec?: boolean;
}

export type IFastTextInputRef = {
	/**
	 * 设置当前文本框被选中
	 * @returns
	 */
	focus: () => void;
	/**
	 * 设置当前选框不被选中
	 * @returns
	 */
	exitFocus: () => void;
};

const FastTextInput = forwardRef<IFastTextInputRef, IFastTextInputProps>(
	(
		{
			//
			value = "",
			onChange = function (val) {},
			onEnter = function () {},
			onEsc = function () {},
			onLeftJump = function () {},
			onRightJump = function () {},
			completeTexts = [],
			className = "",
			classAdd = "",
			completeClassAdd = "",
			style = {},
			isEnableTypeRec = false,
		},
		_ref
	): ReactElement => {
		//===============useHooks=================
		const $ = useJquery();
		const debounce = useDebounce();

		//===============state====================
		const [isMounted, setIsMounted] = useState<boolean>(false);
		const [isFocus, setisFocus] = useState<boolean>(false);
		const [currentValue, setcurrentValue] = useState<any>(value);
		const [orgcurrentValue, setorgcurrentValue] = useState<any>("");
		const [currentSelectIndex, setcurrentSelectIndex] = useState<number>(-1);
		const [isSelecting, setisSelecting] = useState<boolean>(false);
		const [submitStamp, setsubmitStamp] = useState<number>(-1);
		const [currentCompleteText, setcurrentCompleteText] = useState<IcTItem[]>([]);
		const [visibleStart, setVisibleStart] = useState(0);

		//===============static===================
		const MAX_VISIBLE = 5; // 最多同时渲染多少个

		//===============ref======================
		const contentRef = useRef<HTMLDivElement | null>(null);
		const focuseValueRef = useRef<string>("");
		const currentCompleteItemRef = useRef<HTMLDivElement | null>(null);
		const completeRef = useRef<HTMLDivElement | null>(null);
		const edgeRef = useRef<number>(0);

		useImperativeHandle(_ref, () => ({
			focus() {
				$(contentRef.current).focus();
			},
			exitFocus() {
				$(contentRef.current).blur();
			},
		}));

		//===============function=================

		const submitValue = function () {
			setsubmitStamp(+new Date());
		};

		const getDisplayValue = function (value: any) {
			if (isEnableTypeRec) {
				if (typeof value === "boolean") {
					return value.toString();
				}

				if (typeof value === "string") {
					return `"${value}"`;
				}

				if (typeof value === "number") {
					return value;
				}
			}
			return value;
		};

		//将光标定位到末尾
		function moveCaretToEnd(el: HTMLElement) {
			if (!el) return;

			const range = document.createRange();
			range.selectNodeContents(el);
			range.collapse(false); // false 表示光标移动到内容末尾

			const sel = window.getSelection();
			sel?.removeAllRanges();
			sel?.addRange(range);
		}

		/**
		 * 计算scrollHeight
		 */
		const cScrollHeightPosition = function () {
			if (completeRef.current && currentCompleteItemRef.current) {
				$(completeRef.current).scrollTop(0);
				let positionTop = $(currentCompleteItemRef.current).offset().top - $(completeRef.current).offset().top;
				if (positionTop + $(currentCompleteItemRef.current).height() > $(completeRef.current).height()) {
					let t = positionTop - ($(completeRef.current).height() - $(currentCompleteItemRef.current).height());
					$(completeRef.current).scrollTop(t);
				}
			}
		};

		/* 判断前后双引号 */
		function hasWrapDoubleQuotes(str: any) {
			if (typeof str === "string") {
				return str.startsWith('"') && str.endsWith('"');
			}
			return false;
		}

		/* 去除前后双引号 */
		function removeWrapDoubleQuotes(str: any) {
			if (typeof str === "string") {
				if (str.startsWith('"') && str.endsWith('"')) {
					return str.slice(1, -1);
				}
			}
			return str;
		}

		function stringToBoolean(str: string) {
			return str.toLowerCase() === "true";
		}

		/* onchange代理 */
		const changeProxy = function (value: any) {
			if (isEnableTypeRec) {
				if (value.toString().trim() === "") {
					onChange("");
				} else if (hasWrapDoubleQuotes(value)) {
					onChange(removeWrapDoubleQuotes(value));
				} else if (value === "true" || value === "false") {
					onChange(stringToBoolean(value));
				} else if (value === true || value === false) {
					onChange(value);
				} else if (!isNaN(Number(value))) {
					onChange(Number(value));
				} else {
					onChange(value.toString());
				}
			} else {
				onChange(value);
			}
		};

		//===============effects==================
		useEffect(
			function (): ReturnType<React.EffectCallback> {
				if (isMounted === false) {
					setIsMounted(true);
					/* $(contentRef.current).text(value); */
				}
			},
			[isMounted]
		);

		useEffect(function (): ReturnType<React.EffectCallback> {
			return function (): void {
				setIsMounted(false);
			};
		}, []);

		useEffect(
			function (): ReturnType<React.EffectCallback> {
				if (isMounted === true) {
					setcurrentValue(value);
				}
			},
			[isMounted, value]
		);

		useEffect(
			function (): ReturnType<React.EffectCallback> {
				if (isMounted === true) {
					cScrollHeightPosition();
				}
			},
			[isMounted, currentSelectIndex]
		);

		useEffect(
			function (): ReturnType<React.EffectCallback> {
				if (isMounted === true) {
					changeProxy(currentValue);
				}
			},
			[isMounted, currentValue]
		);

		useEffect(
			function (): ReturnType<React.EffectCallback> {
				if (isMounted === true && isFocus) {
					$(contentRef.current).text(currentValue);
					moveCaretToEnd(contentRef.current);
					focuseValueRef.current = currentValue;
				}
			},
			[isMounted, isFocus]
		);

		useEffect(
			function (): ReturnType<React.EffectCallback> {
				if (isMounted === true && submitStamp !== -1) {
					debounce(function () {
						onEnter();
					}, 300);
				}
			},
			[isMounted, submitStamp]
		);

		useEffect(
			function (): ReturnType<React.EffectCallback> {
				if (isMounted === true && completeTexts.length !== 0 && isSelecting === false) {
					if (currentValue === "") {
						setcurrentCompleteText(completeTexts);
					} else {
						setcurrentCompleteText(
							completeTexts.reduce(function (acc, item, index) {
								try {
									if (
										item.value.toString().toLowerCase().indexOf(currentValue.toLowerCase()) !== -1 ||
										item.label.toString().toLowerCase().indexOf(currentValue.toLowerCase()) !== -1
									) {
										acc.push(item);
									}
								} catch (_e) {
									console.log(item);
									console.error("Error processing completeTexts:", _e);
								}
								return acc;
							}, [])
						);
					}
				}
			},
			[completeTexts, isMounted, currentValue, isSelecting]
		);

		// 监听 currentSelectIndex，确保它在 visibleStart + MAX_VISIBLE 范围内
		useEffect(() => {
			if (!isSelecting || currentSelectIndex === -1) return;

			// 向上滚动
			if (currentSelectIndex < visibleStart) {
				setVisibleStart(currentSelectIndex);
			}
			// 向下滚动
			else if (currentSelectIndex >= visibleStart + MAX_VISIBLE) {
				setVisibleStart(currentSelectIndex - MAX_VISIBLE + 1);
			}
		}, [currentSelectIndex, isSelecting]);

		return (
			<>
				{(function () {
					if (isFocus || isSelecting) {
						return (
							<div
								ref={contentRef}
								tabIndex={0}
								contentEditable={isFocus}
								className={(function () {
									let classStr = "";
									if (className !== "") {
										classStr += " " + className;
									} else {
										classStr += " " + styles.textInput;
									}
									classStr += " " + classAdd;
									if (isFocus) {
										classStr += " " + styles.onInput;
									}
									return classStr;
								})()}
								style={style}
								onFocus={function () {
									setisFocus(true);
								}}
								onClick={function () {
									setisFocus(true);
								}}
								onBlur={function () {
									if (!isSelecting) {
										setisFocus(false);
										submitValue();
									}
								}}
								onInput={function () {
									setcurrentValue($(contentRef.current).text());
								}}
								onKeyDown={function (_e) {
									let position = window.getSelection().getRangeAt(0).startOffset;
									switch (_e.code) {
										case "Backspace":
											if (isSelecting) {
												setisSelecting(false);
												$(contentRef.current).text(orgcurrentValue);
												moveCaretToEnd(contentRef.current);
												setcurrentValue(orgcurrentValue);
												setcurrentSelectIndex(-1);
												_e.stopPropagation();
												_e.preventDefault();
											}
											break;
										case "ArrowUp":
											if (isSelecting) {
												setcurrentSelectIndex(function (v) {
													v -= 1;
													if (v === -1) {
														setisSelecting(false);
														$(contentRef.current).text(currentValue);
														moveCaretToEnd(contentRef.current);
													} else {
														$(contentRef.current).text(currentCompleteText[v].value);
														moveCaretToEnd(contentRef.current);
													}

													return v;
												});
											}
											_e.stopPropagation();
											_e.preventDefault();
											break;
										case "ArrowDown":
											if (currentCompleteText.length > 0) {
												setcurrentSelectIndex(function (v) {
													v += 1;
													if (v === currentCompleteText.length) {
														v = currentCompleteText.length - 1;
													}
													$(contentRef.current).text(currentCompleteText[v].value);
													moveCaretToEnd(contentRef.current);
													return v;
												});

												if (isSelecting === false) {
													setisSelecting(true);
													setorgcurrentValue(currentValue);
												}
											}
											_e.stopPropagation();
											_e.preventDefault();
											break;
										case "ArrowLeft":
											if (position === 0) {
												if (edgeRef.current === 1) {
													edgeRef.current = 0;
													onLeftJump();
													setisFocus(false);
													$("body").focus();
													_e.stopPropagation();
													_e.preventDefault();
												} else {
													edgeRef.current = edgeRef.current + 1;
												}
											} else {
												edgeRef.current = 0;
											}

											break;
										case "ArrowRight":
											if (position === $(contentRef.current).text().length) {
												if (edgeRef.current === 1) {
													edgeRef.current = 0;
													onRightJump();
													setisFocus(false);
													$("body").focus();
													_e.stopPropagation();
													_e.preventDefault();
												} else {
													edgeRef.current = edgeRef.current + 1;
												}
											} else {
												edgeRef.current = 0;
											}
											break;
										case "Escape":
											if (isSelecting === true) {
												setisSelecting(false);
												$(contentRef.current).text(orgcurrentValue);
												moveCaretToEnd(contentRef.current);
												setcurrentValue(orgcurrentValue);
												setcurrentSelectIndex(-1);
												_e.stopPropagation();
												_e.preventDefault();
												break;
											} else {
												setisFocus(false);
												onEsc();
												changeProxy(focuseValueRef.current);
												$(contentRef.current).text(focuseValueRef.current);
												setcurrentValue(focuseValueRef.current);
												$("body").focus();
												_e.stopPropagation();
												_e.preventDefault();
											}
											break;
										case "NumpadEnter":
										case "Enter":
											if (isSelecting === true) {
												setisSelecting(false);
												setcurrentValue(currentCompleteText[currentSelectIndex].value);
												$(contentRef.current).text(currentCompleteText[currentSelectIndex].value);
												moveCaretToEnd(contentRef.current);
												setcurrentSelectIndex(-1);
												_e.stopPropagation();
												_e.preventDefault();
												break;
											} else {
												submitValue();
												$("body").focus();
												setisFocus(false);
												_e.stopPropagation();
												_e.preventDefault();
											}
											break;
										default:
											if (isSelecting) {
												setisSelecting(false);
												setcurrentValue(currentCompleteText[currentSelectIndex].value);
												$(contentRef.current).text(currentCompleteText[currentSelectIndex].value);
												moveCaretToEnd(contentRef.current);
												setcurrentSelectIndex(-1);
											}
											break;
									}
								}}
							></div>
						);
					}
					return (
						<div
							ref={contentRef}
							tabIndex={0}
							contentEditable={isFocus}
							className={(function () {
								let classStr = "";
								if (className !== "") {
									classStr += " " + className;
								} else {
									classStr += " " + styles.textInput;
								}
								classStr += " " + classAdd;
								if (isFocus) {
									classStr += " " + styles.onInput;
								}
								return classStr;
							})()}
							style={style}
							onFocus={function () {
								setisFocus(true);
							}}
							onClick={function () {
								setisFocus(true);
							}}
							onBlur={function () {
								if (!isSelecting) {
									setisFocus(false);
								}
							}}
						>
							{(function () {
								if (isEnableTypeRec) {
									return getDisplayValue(currentValue);
								} else {
									let target = completeTexts.find(function (v) {
										return currentValue === v.value;
									});
									if (target && target.label !== "") {
										return target.label + "(" + target.value + ")";
									}
									return currentValue;
								}
							})()}
						</div>
					);
				})()}
				{(function () {
					if ((isFocus || isSelecting) && currentCompleteText.length !== 0) {
						// 渲染视口内内容
						const visibleItems = currentCompleteText.slice(visibleStart, visibleStart + MAX_VISIBLE);

						return (
							<div className={styles.completeDiv + " " + completeClassAdd} ref={completeRef}>
								{visibleItems.map((item, indexInView) => {
									const realIndex = visibleStart + indexInView;

									return (
										<React.Fragment key={realIndex}>
											<Tooltip title={item.desc} placement="right" followCursor={true}>
												<div
													ref={(e) => {
														if (realIndex === currentSelectIndex) {
															currentCompleteItemRef.current = e;
														}
													}}
													className={styles.item + " " + (realIndex === currentSelectIndex ? " " + styles.selected : "")}
													onClick={(e) => {
														setisSelecting(false);
														setcurrentValue(item.value);
														$(contentRef.current).text(item.value);
														moveCaretToEnd(contentRef.current);
														setcurrentSelectIndex(-1);
														e.stopPropagation();
														e.preventDefault();
													}}
												>
													{item.label + "(" + item.value + ")"}
												</div>
											</Tooltip>
										</React.Fragment>
									);
								})}
							</div>
						);
					}
					return null;
				})()}
			</>
		);
	}
);
export default memo(FastTextInput);
