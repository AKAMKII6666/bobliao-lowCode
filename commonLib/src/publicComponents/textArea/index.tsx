/**
 * 廖力编写
 * 模块名称：文本域
 * 模块说明：
 * 编写时间：2025年3月14日
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import useJquery, { jQueryObject, isRunningInServer } from "@bobliao/use-jquery-hook";

/**
 * 传入参数
 */
export type EnhancedTextFieldProps = TextFieldProps & {
	/* 最大数值 */
	maxLength?: number;
};

//往外面暴露统一名称的属性对象，用于生成低代码平台属性JSON schema
export type Tinputprops = EnhancedTextFieldProps;

const MithrilTextArea: FC<EnhancedTextFieldProps> = (props): ReactElement => {
	let { maxLength, helperText, value = "", InputProps = { rows: 5, multiline: true, inputComponent: "textarea" }, ...restProps } = props;
	//===============useHooks=================

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const $ = useJquery();

	//===============static===================

	//===============ref======================
	const textArea = useRef<HTMLInputElement>(null);

	//===============function=================

	//===============effects==================
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted === false) {
				setIsMounted(true);
				if (typeof maxLength !== "undefined") {
					$(textArea.current).find("textarea").attr("maxLength", maxLength);
				}
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
			<TextField
				sx={{ marginTop: 0 }}
				helperText={(function () {
					if (typeof helperText === "undefined") {
						return (value as string).length + "/" + maxLength;
					}
					return helperText;
				})()}
				style={{ marginTop: 0 }}
				value={value}
				ref={textArea}
				InputProps={InputProps}
				{...restProps}
			></TextField>
		</>
	);
};
//为防止在编译和混淆后，无法识别组件名称，所以在这里显示定义名称
MithrilTextArea.displayName = "MithrilTextArea";
export default MithrilTextArea;
