/**
 * 廖力编写
 * 模块名称：组件动态数据出错状态状态专用 fallback
 * 模块说明：
 * 编写时间：2025-05-21 08:59:34 星期三
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import styles from "./index.module.scss";
/**
 * 传入参数
 */
export interface iprops {}

const ErrorCom: FC<iprops> = ({}): ReactElement => {
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

	return <div className={styles.fallback}>数据访问错误!</div>;
};
export default ErrorCom;
