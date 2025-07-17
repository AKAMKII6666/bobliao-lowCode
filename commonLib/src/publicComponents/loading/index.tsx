/**
 * 廖力编写
 * 模块名称：加载中组件
 * 模块说明：
 * 编写时间：
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import styles from "./index.module.scss";

/**
 * 传入参数
 */
export interface iprops {
	/* 样式 */
	style?: React.CSSProperties;
}

//往外面暴露统一名称的属性对象，用于生成低代码平台属性JSON schema
export type Tinputprops = iprops;

const Loading: FC<iprops> = ({ style }): ReactElement => {
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
			<div className={styles.container} style={typeof style === "undefined" ? {} : style}></div>
		</>
	);
};
//为防止在编译和混淆后，无法识别组件名称，所以在这里显示定义名称
Loading.displayName = "Loading";
export default Loading;
