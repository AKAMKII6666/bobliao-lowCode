/**
 * 廖力编写
 * 模块名称：组件加载状态专用loading fallback
 * 模块说明：
 * 编写时间：2025-05-21 08:59:34 星期三
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import styles from "./index.module.scss";
/**
 * 传入参数
 */
export interface iprops {}
//往外面暴露统一名称的属性对象，用于生成低代码平台属性JSON schema
export type Tinputprops = iprops;

const Loading: FC<iprops> = ({}): ReactElement => {
	//===============useHooks=================

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
			<div className={styles.fallback}>组件加载中..</div>
		</>
	);
};
export default Loading;
