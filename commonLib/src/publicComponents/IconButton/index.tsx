/**
 * 廖力编写
 * 模块名称：
 * 模块说明：
 * 编写时间：
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import { ButtonProps } from "@mui/material/Button";
import { Button as MuiButton } from "@mui/material";
import Icon, { iIconprops } from "MithalCommonLibrary/Icon";

/**
 * 传入参数
 */
export interface iIconButtonprops {
	/**
	 * 图标的配置
	 */
	iconProp: iIconprops;
	/**
	 *
	 *按钮的配置
	 */
	buttonProps: ButtonProps & { children?: React.ReactNode | React.ReactNode[] | undefined | null; text?: string | null };
}

//往外面暴露统一名称的属性对象，用于生成低代码平台属性JSON schema
export type Tinputprops = iIconButtonprops;

const IconButton: FC<iIconButtonprops> = (props): ReactElement => {
	const { children, text = "这是按钮,请设置'text'属性", ...restButtonProps } = props.buttonProps;
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
			<MuiButton {...restButtonProps}>
				<Icon {...props.iconProp}></Icon>
				{children}
				{text}
			</MuiButton>
		</>
	);
};
//为防止在编译和混淆后，无法识别组件名称，所以在这里显示定义名称
IconButton.displayName = "IconButton";
export default IconButton;
