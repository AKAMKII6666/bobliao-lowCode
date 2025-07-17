/**
 * 廖力编写
 * 模块名称：
 * 模块说明：
 * 编写时间：2025年6月25日 06:08:21
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";

/**
 * 传入参数
 */
export type IUlProps = React.HTMLAttributes<HTMLUListElement> & { children?: React.ReactNode | React.ReactNode[] | undefined | null };

//往外面暴露统一名称的属性对象，用于生成低代码平台属性JSON schema
export type Tinputprops = IUlProps;

const Ul: FC<IUlProps> = (props): ReactElement => {
	const { children, ...restProps } = props;
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
			<ul {...restProps}>{children}</ul>
		</>
	);
};
//为防止在编译和混淆后，无法识别组件名称，所以在这里显示定义名称
Ul.displayName = "Ul";
export default Ul;
