/**
 * 廖力编写
 * 模块名称：相对容器的resohook
 * 模块说明：用这个钩子的时候要注意，父容器的任何fontSize的设置都会影响子容器的em相对大小，
 * 在这个组件下的所有结构如果有文字的话就单独给文字套一个设置字体大小的父节点，而不是给n个子节点设置字体大小，会产生奇怪的副作用
 * 编写时间：2024年9月5日 22:12:19
 */

import React, { createContext, useState, useContext, useEffect, ReactElement, FC, useRef, memo } from "react";
import ResizeObserver from "resize-observer-polyfill";
import useDebounce from "../debounceHook";

//定义勾子的返回类型
export type TRelativeEmResoHookHookReturnType = ReturnType<typeof useRelativeEmResoHookDataHook>;
//定义勾子的返回类型
export type IRelativeEmResoHookHookReturnType = ReturnType<typeof useRelativeEmResoHookDataHook>;

/* 变换类型 */
export type TadjestType = "auto" | "width" | "height";

/* 钩子用的接口 */
export interface IRelativeEmResoHookProps {
	//标准字体
	fontSize: number;
	//设计稿宽度
	designWidth: number;
	//设计稿高度
	designHeight: number;
	//计算模式
	mode: TadjestType;
}

/* 先定义勾子 */
export const useRelativeEmResoHookDataHook = function ({ fontSize, designWidth, designHeight, mode }: IRelativeEmResoHookProps) {
	//===============useHooks=================

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);
	//当前容器大小
	const [containerWidth, setcontainerWidth] = useState<number>(0);
	const [containerHeight, setcontainerHeight] = useState<number>(0);
	const [updateStamp, setupdateStamp] = useState<number>(-1);
	const [currentFontSize, setcurrentFontSize] = useState<number>(0);

	//===============static===================

	//===============ref======================

	//===============function=================
	//更新容器尺寸
	const updateContainerSize = function (width: number, height: number) {
		setcontainerWidth(width);
		setcontainerHeight(height);
		setupdateStamp(+new Date());
	};

	//计算比例
	const getRes = function (current: number, design: number) {
		//当前的数值除以设计数值得到比例 然后让标准字体乘以它得到当前应该显示的大小
		return fontSize * (current / design);
	};

	//计算字体
	const computFontSize = function () {
		let width = containerWidth;
		let height = containerHeight;
		let result = currentFontSize;
		var orgPre = designWidth / designHeight;
		var currPre = width / height;
		//如果是自动调整
		switch (mode) {
			case "auto":
				//宽度大于高度，用高度算
				if (orgPre < currPre) {
					result = getRes(height, designHeight);
				} else {
					//其它情况用宽度算
					result = getRes(width, designWidth);
				}
				break;
			case "height":
				result = getRes(height, designHeight);
				break;
			case "width":
				result = getRes(width, designWidth);
				break;
		}
		setcurrentFontSize(result);
	};

	//===============effects==================
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted === false) {
				setIsMounted(true);
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
			if (updateStamp !== -1) {
				computFontSize();
			}
		},
		[updateStamp]
	);

	return {
		//是否挂载
		isMounted,
		//更新容器尺寸(计算一遍 )
		updateContainerSize,
		//输出字体
		currentFontSize,
		containerWidth,
		containerHeight,
		updateStamp,
	};
};

/**
 * 创建一个需要全局使用的context
 **/
export const RelativeEmResoHookDataContext = createContext<TRelativeEmResoHookHookReturnType>({} as unknown as TRelativeEmResoHookHookReturnType);

/**
 * 给子节点使用的context
 * @returns
 */
export const useRelativeEmResoHookDataContext = function (): TRelativeEmResoHookHookReturnType {
	return useContext(RelativeEmResoHookDataContext);
};

/**
 * 传入参数
 */
export interface IRelativeEmResoHookDataProviderProps {
	//容器样式
	className: string;
	//标准字体大小
	fontSize: number;
	//设计稿宽度
	designWidth: number;
	//设计稿高度
	designHeight: number;
	//模式
	mode: TadjestType;
	//防抖时间
	debounceTime: number;
	//子元素
	children: ReactElement | ReactElement[] | undefined | null;
}

/**
 * 相对容器的resohook
 * 这个节点将生成一个div
 * 用于放置字体大小的计算结果
 * 这个节点之下的所有元素使用em布局将得到缩放效果
 * 用于一些比较苛刻的布局情况
 */
export const RelativeEmResoDiv: FC<IRelativeEmResoHookDataProviderProps> = memo(
	({
		//
		className,
		fontSize,
		designWidth,
		designHeight,
		mode,
		debounceTime,
		children,
	}): ReactElement => {
		//===============useHooks=================
		const RelativeEmResoHookData = useRelativeEmResoHookDataHook({
			fontSize,
			designWidth,
			designHeight,
			mode,
		});

		const debounceFunc = useDebounce();

		//===============state====================
		const [isMounted, setIsMounted] = useState<boolean>(false);

		//===============static===================

		//===============ref======================
		const container = useRef<HTMLDivElement>(null);
		const resizeObserverRef = useRef<ResizeObserver | null>(null);

		//===============function=================

		/**
		 *创建reasize
		 */
		const createResizeObserver = function () {
			if (container.current !== null) {
				resizeObserverRef.current = new ResizeObserver((entries) => {
					if (entries.length > 0) {
						const width = entries[0].contentRect.width;
						const height = entries[0].contentRect.height;
						debounceFunc(function () {
							RelativeEmResoHookData.updateContainerSize(width, height);
						}, debounceTime);
					}
				});
				resizeObserverRef.current.observe(container.current);
			}
		};

		/**
		 *清除resize
		 */
		const clearObserver = function () {
			if (resizeObserverRef.current !== null) {
				resizeObserverRef.current.disconnect();
				resizeObserverRef.current = null;
			}
		};

		//===============effects==================
		useEffect(
			function (): ReturnType<React.EffectCallback> {
				if (isMounted === false) {
					setIsMounted(true);
					createResizeObserver();
				}
			},
			// eslint-disable-next-line react-hooks/exhaustive-deps
			[isMounted]
		);

		useEffect(function (): ReturnType<React.EffectCallback> {
			return function (): void {
				setIsMounted(false);
				clearObserver();
			};
		}, []);

		return (
			<>
				<RelativeEmResoHookDataContext.Provider value={RelativeEmResoHookData}>
					<div className={className} ref={container} style={{ fontSize: RelativeEmResoHookData.currentFontSize + "px" }}>
						{children}
					</div>
				</RelativeEmResoHookDataContext.Provider>
			</>
		);
	}
);
