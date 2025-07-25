/**
 * 廖力编写
 * 模块名称：
 * 模块说明：
 * 编写时间：
 */
import { SvgIconOwnProps, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement, lazy, Suspense } from "react";
import { IconsImportMap } from "./IconsImportMap";
import { IconKey } from "./IconKey";

/**
 * 传入参数
 */
export interface iIconprops {
	/**
		图标名称
	*/
	iconName?: IconKey;
	/**
		图标的属性
	*/
	iconOwnProps?: SvgIconOwnProps;
}

//往外面暴露统一名称的属性对象，用于生成低代码平台属性JSON schema
export type Tinputprops = iIconprops;

const Icon: FC<iIconprops> = ({
	iconName = "Edit",
	iconOwnProps = {
		style: { color: "#454545" },
	},
}): ReactElement => {
	//===============useHooks=================
	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);

	//===============static===================

	//===============ref======================

	//===============function=================
	const Icon = IconsImportMap[iconName];

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
			<Icon {...iconOwnProps}></Icon>
		</>
	);
};
//为防止在编译和混淆后，无法识别组件名称，所以在这里显示定义名称
Icon.displayName = "Icon";
export default Icon;
