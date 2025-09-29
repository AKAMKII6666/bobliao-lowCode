/**
 * 廖力编写
 * 模块名称：权限围栏
 * 模块说明：如果没有相应权限将不会渲染目标组件
 * 编写时间：2025年9月28日 20:13:19
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import { useGlobalMenuDataContext } from "renderer/utils/globalMenuHook";

/**
 * 传入参数
 */
export interface IPBlockerProps {
	fallback?: ReactElement; //没有权限时的替代组件
	apiUrl?: string | string[]; //权限标识符
	children?: ReactElement; //子组件
}

const PBlocker: FC<IPBlockerProps> = ({ fallback = <></>, apiUrl = "", children }): ReactElement => {
	//===============useHooks=================
	const gMenu = useGlobalMenuDataContext();

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);

	//===============static===================

	//===============ref======================

	//===============function=================

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

	return (
		<>
			{(function () {
				// 如果 apiUrl 是字符串，转换为数组以统一处理
				const apiUrls = Array.isArray(apiUrl) ? apiUrl : [apiUrl];

				// 检查是否所有权限标识符都存在于 menuHashTable 中
				const hasAllPermissions = apiUrls.every((url) => typeof gMenu.menuHashTable[url] !== "undefined");

				if (hasAllPermissions) {
					return children;
				}
				return fallback;
			})()}
		</>
	);
};
export default PBlocker;
