/**
 * 廖力编写
 * 模块名称：可自由拖拽
 * 模块说明：
 * 编写时间：
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import useJquery from "@bobliao/use-jquery-hook";
import styles from "./index.module.scss";
import CloseIcon from "@mui/icons-material/Close";

/**
 * 传入参数
 */
export interface IFreeWindowProps {
	/**
	 * 标题
	 * */
	title?: string | ReactElement | ReactElement[] | null;
	/**
	 * 初始化位置
	 */
	position?: {
		left: number;
		top: number;
	};

	/**
	 * 初始化大小
	 */
	size?: {
		width: number;
		height: number;
	};
	/**
	 * 是否显示
	 */
	isShow?: boolean;
	/**
	 *关闭回调
	 */
	onclose?: (value: boolean) => void;
	/* 样式 */
	className?: string;
	/* 行样式 */
	style?: React.CSSProperties;
	/**
	 * 子节点
	 */
	children?: string | ReactElement | ReactElement[] | null;
	/**
	 * 是否使用背景遮罩将背景全部罩起来
	 */
	background?: boolean;
}

const FreeWindow: FC<IFreeWindowProps> = (
	{
		children,
		title = "测试窗口",
		position = { top: 20, left: 20 },
		size = { width: 500, height: 500 },
		isShow = true,
		onclose = function (value) {},
		className = "",
		style = {},
		background = true,
	},
	_ref
): ReactElement => {
	//===============useHooks=================
	const $ = useJquery();

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [resizeTstamp, setresizeTstamp] = useState<number>(-1);
	const [cursorPosition, setcursorPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	/* 鼠标移动事件响应时间戳 */
	const [mouseMoveStamp, setmouseMoveStamp] = useState<number>(-1);
	/* 当前鼠标状态 */
	const [currentMouseState, setcurrentMouseState] = useState<"l" | "r-b" | "r" | "t" | "b" | "m" | "">("");

	const [currentListeningRect, setcurrentListeningRect] = useState<{
		left: number;
		top: number;
		width: number;
		height: number;
	}>({
		left: position.left,
		top: position.top,
		width: size.width,
		height: size.height,
	});

	//===============static===================

	//===============ref======================
	/* 主窗体的引用 */
	const freeWindowRef = useRef<HTMLDivElement | null>(null);
	const resizeObserverRef = useRef<ResizeObserver | null>(null);
	//鼠标位置
	const mousePositionRef = useRef<typeof cursorPosition>({
		x: 0,
		y: 0,
	});
	//点击时鼠标的差数
	const mouseRRRRef = useRef<typeof cursorPosition>({
		x: 0,
		y: 0,
	});

	//位置快照
	const mouseSnapShotef = useRef<typeof currentListeningRect>({
		left: position.left,
		top: position.top,
		width: size.width,
		height: size.height,
	});

	//===============function=================

	const regestMouseMoveEvent = function (_e) {
		let xy: typeof cursorPosition = {
			x: _e.clientX,
			y: _e.clientY,
		};

		mousePositionRef.current = xy;
		setmouseMoveStamp(+new Date());
	};

	const getCurrentMousePosition = function () {
		setcursorPosition(mousePositionRef.current);
	};

	/* 监听并测量窗体的大小和位置 */
	const getCurrentWindowSizePosition = function () {
		if (!isShow) {
			return;
		}
		let offsetPosition = $(freeWindowRef.current).offset();
		if (currentMouseState === "") {
			setcurrentListeningRect({
				left: offsetPosition.left,
				top: offsetPosition.top,
				width: $(freeWindowRef.current).width(),
				height: $(freeWindowRef.current).height(),
			});
		}
	};

	/**
	 *创建reasize
	 */
	const createResizeObserver = function () {
		if (typeof $(freeWindowRef.current!).parent()[0] !== "undefined") {
			let element = $(freeWindowRef.current!).parent()[0];
			resizeObserverRef.current = new ResizeObserver((entries) => {
				if (entries.length > 0) {
					setresizeTstamp(+new Date());
				}
			});
			resizeObserverRef.current.observe(element);
		}
		$(window).bind("mousemove", regestMouseMoveEvent);
		if (!background) {
			$(window).bind("mouseup", mouseBu);
		}
	};

	/**
	 *清除resize
	 */
	const clearObserver = function () {
		if (resizeObserverRef.current !== null) {
			resizeObserverRef.current.disconnect();
			resizeObserverRef.current = null;
			$(window).unbind("mousemove", regestMouseMoveEvent);
			if (!background) {
				$(window).unbind("mouseup", mouseBu);
			}
		}
	};

	/* 
		鼠标弹起
	*/
	const mouseBu = function () {
		setcurrentMouseState("");
	};

	/* 计算 */
	const cPosition = function (_input?: typeof currentListeningRect) {
		let containerRect = { ...currentListeningRect };
		if (typeof _input !== "undefined") {
			containerRect = _input;
		}
		let mousePosition = mousePositionRef.current;

		switch (currentMouseState) {
			case "m":
				containerRect.top = mousePosition.y - mouseRRRRef.current.y;
				containerRect.left = mousePosition.x - mouseRRRRef.current.x;
				break;
			case "t":
				containerRect.top = mousePosition.y;
				containerRect.height = mouseSnapShotef.current.height + mouseSnapShotef.current.top - mousePosition.y;
				break;
			case "r":
				containerRect.width = mousePosition.x - containerRect.left;
				break;
			case "b":
				containerRect.height = mousePosition.y - containerRect.top;
				break;
			case "l":
				containerRect.left = mousePosition.x;
				containerRect.width = mouseSnapShotef.current.width + mouseSnapShotef.current.left - mousePosition.x;
				break;
			case "r-b":
				containerRect.width = mousePosition.x - containerRect.left;
				containerRect.height = mousePosition.y - containerRect.top;
				break;
		}

		if (containerRect.width + containerRect.left > $(window).width()) {
			containerRect.left = $(window).width() - containerRect.width;
		}
		if (containerRect.height + containerRect.top > $(window).height()) {
			containerRect.top = $(window).height() - containerRect.height;
		}

		if (containerRect.left < 0) {
			containerRect.left = 0;
		}
		if (containerRect.top < 0) {
			containerRect.top = 0;
		}
		setcurrentListeningRect(containerRect);
	};

	//===============effects==================
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted === false) {
				setIsMounted(true);
				//创建resize
				createResizeObserver();
				setresizeTstamp(+new Date());
			}
		},
		[isMounted]
	);
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted) {
				getCurrentWindowSizePosition();
				cPosition();
			}
		},
		[resizeTstamp]
	);

	useEffect(
		function (): ReturnType<React.EffectCallback> {
			getCurrentMousePosition();
		},
		[mouseMoveStamp]
	);

	useEffect(function (): ReturnType<React.EffectCallback> {
		return function (): void {
			//清除resize
			clearObserver();
			setIsMounted(false);
		};
	}, []);

	//
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (currentMouseState !== "") {
				cPosition();
			}
		},
		[currentMouseState, mouseMoveStamp]
	);

	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (currentMouseState === "") {
				setresizeTstamp(+new Date());
			}
		},
		[currentMouseState]
	);

	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted && isShow) {
				let rect = { ...currentListeningRect };
				rect.top = position.top;
				rect.left = position.left;
				cPosition(rect);
				setresizeTstamp(+new Date());
			}
		},
		[isMounted, isShow]
	);

	return (
		<>
			{(function () {
				if (isShow) {
					return (
						<>
							{(function () {
								if (background) {
									return (
										<div
											className={styles.background + " " + className}
											onMouseUp={function () {
												mouseBu();
											}}
										></div>
									);
								}
								return null;
							})()}

							<div
								onMouseUp={function () {
									mouseBu();
								}}
								ref={freeWindowRef}
								className={styles.freeWindow}
								style={{ ...currentListeningRect, ...style }}
							>
								<div
									className={styles.title}
									onMouseUp={function () {
										mouseBu();
									}}
									onMouseDown={function () {
										setcurrentMouseState("m");
										mouseRRRRef.current = {
											x: mousePositionRef.current.x - currentListeningRect.left,
											y: mousePositionRef.current.y - currentListeningRect.top,
										};
									}}
								>
									<div className={styles.tin}>{title}</div>
									<div
										className={styles.closecontainer}
										onClick={function () {
											onclose(false);
										}}
									>
										<CloseIcon></CloseIcon>
									</div>
								</div>
								<div
									onMouseUp={function () {
										mouseBu();
									}}
									className={styles.content}
								>
									{children}
								</div>
							</div>
							{/* 上 */}
							<div
								className={styles.resizeBar}
								style={(function () {
									let rect = {
										left: currentListeningRect.left,
										top: currentListeningRect.top - 20,
										width: currentListeningRect.width,
										height: "20px",
										cursor: "n-resize",
									};
									return rect;
								})()}
								onMouseUp={function () {
									mouseBu();
								}}
								onMouseDown={function () {
									setcurrentMouseState("t");
									mouseSnapShotef.current = structuredClone(currentListeningRect);
								}}
							></div>
							{/* 右边 */}
							<div
								className={styles.resizeBar}
								style={(function () {
									let rect = {
										left: currentListeningRect.left + currentListeningRect.width,
										top: currentListeningRect.top,
										width: "20px",
										height: currentListeningRect.height,
										cursor: "e-resize",
									};
									return rect;
								})()}
								onMouseUp={function () {
									mouseBu();
								}}
								onMouseDown={function () {
									setcurrentMouseState("r");
									mouseSnapShotef.current = structuredClone(currentListeningRect);
								}}
							></div>
							{/* 下边 */}
							<div
								className={styles.resizeBar}
								style={(function () {
									let rect = {
										left: currentListeningRect.left,
										top: currentListeningRect.top + currentListeningRect.height,
										width: currentListeningRect.width,
										height: "20px",
										cursor: "s-resize",
									};
									return rect;
								})()}
								onMouseUp={function () {
									mouseBu();
								}}
								onMouseDown={function () {
									setcurrentMouseState("b");
									mouseSnapShotef.current = structuredClone(currentListeningRect);
								}}
							></div>
							{/* 左边 */}
							<div
								className={styles.resizeBar}
								style={(function () {
									let rect = {
										left: currentListeningRect.left - 20,
										top: currentListeningRect.top,
										width: "20px",
										height: currentListeningRect.height,
										cursor: "w-resize",
									};
									return rect;
								})()}
								onMouseUp={function () {
									mouseBu();
								}}
								onMouseDown={function () {
									setcurrentMouseState("l");
									mouseSnapShotef.current = structuredClone(currentListeningRect);
								}}
							></div>

							{/* 右下 */}
							<div
								className={styles.resizeBar}
								style={(function () {
									let rect = {
										left: currentListeningRect.left + currentListeningRect.width,
										top: currentListeningRect.top + currentListeningRect.height,
										width: "20px",
										height: "20px",
										cursor: " se-resize",
									};
									return rect;
								})()}
								onMouseUp={function () {
									mouseBu();
								}}
								onMouseDown={function () {
									setcurrentMouseState("r-b");
									mouseSnapShotef.current = structuredClone(currentListeningRect);
								}}
							></div>
						</>
					);
				}
				return null;
			})()}
		</>
	);
};
export default FreeWindow;
