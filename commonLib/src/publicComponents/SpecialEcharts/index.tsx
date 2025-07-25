/**
 * 廖力编写
 * 模块名称：
 * 模块说明：
 * 编写时间：
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import ChartCore from "react-echarts-core";
import type { EChartsOption } from "react-echarts-core";
import styles from "./index.module.scss";

/**
 * 传入参数
 */
export type ISpecialEchartsprops = {
	/**
	 * echarts图表的属性
	 */
	echartProps?: EChartsOption & {};
	/**
	 * div容器的属性
	 */
	containerProps?: React.HTMLAttributes<HTMLDivElement>;
};

//往外面暴露统一名称的属性对象，用于生成低代码平台属性JSON schema
export type Tinputprops = ISpecialEchartsprops;

const SpecialEcharts: FC<ISpecialEchartsprops> = ({ echartProps = {}, containerProps = { style: { width: "600px", height: "500px" } } }): ReactElement => {
	//===============useHooks=================

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);

	//===============static===================

	//===============ref======================

	//===============function=================
	const loadData = async function (): Promise<void> {};

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
			<div {...containerProps}>
				<ChartCore option={echartProps}></ChartCore>
			</div>
		</>
	);
};
//为防止在编译和混淆后，无法识别组件名称，所以在这里显示定义名称
SpecialEcharts.displayName = "SpecialEcharts";
export default SpecialEcharts;
