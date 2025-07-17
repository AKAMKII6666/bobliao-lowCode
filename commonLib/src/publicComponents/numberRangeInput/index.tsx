/**
 * 廖力编写
 * 模块名称：数值范围输入框
 * 模块说明：用于输入数值范围
 * 编写时间：2025-05-07 16:03:14 星期三
 */
import { InputAdornment, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement, ForwardedRef } from "react";
import NumberInput, { NumberInputProps } from "MithalCommonLibrary/CustomNumberInput";
import { SxProps, Theme } from "@mui/system";

/**
 * 传入参数
 */
export interface NumberRangeInputProps
	extends Omit<NumberInputProps, "placeholder" | "units" | "name" | "labelWidth" | "label" | "onChange" | "value" | "splitStr"> {
	/* 标题，一般用于查询栏的样式 */
	label?: string;
	/* 标题大小 */
	labelWidth?: string | number;
	/* 值 */
	value?: string[];
	/* 字段名 */
	name?: string[];
	/* 改变方法 */
	onChange?: (value: string[] | number[]) => void;
	/* 分隔字符 */
	splitStr?: string;
	/* 组件容器的sx */
	containerSx?: SxProps<Theme>;
	/* 单位 */
	units?: string[];
	/* placeHolder */
	placeholder?: string[];
}

//往外面暴露统一名称的属性对象，用于生成低代码平台属性JSON schema
export type Tinputprops = NumberRangeInputProps;

const NumberRangeInput = (props: NumberRangeInputProps, _ref: ForwardedRef<HTMLInputElement>[]): ReactElement => {
	//===============useHooks=================
	const {
		//
		containerSx,
		label = "",
		labelWidth = 110,
		value = ["", ""],
		name = ["", ""],
		units = [],
		onChange = function (_value) {},
		placeholder = [],
		splitStr = "",
		ref = null,
		...restProps
	} = props;

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [value0, setvalue0] = useState<string>("");
	const [value1, setvalue1] = useState<string>("");

	//===============static===================
	const pSx = { width: "100%" };
	//===============ref======================

	//===============function=================

	//===============effects==================
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted === false) {
				setIsMounted(true);
				setvalue0(value[0]);
				setvalue1(value[1]);
			}
		},
		[isMounted]
	);
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted === true) {
				setvalue0(value[0]);
				setvalue1(value[1]);
			}
		},
		[isMounted, value]
	);

	useEffect(function (): ReturnType<React.EffectCallback> {
		return function (): void {
			setIsMounted(false);
		};
	}, []);

	let mainContent = (
		<Stack alignItems="center" direction="row" justifyContent="left" sx={containerSx ? containerSx : { ml: label === "" ? 0 : "14px" }}>
			<NumberInput
				{...restProps}
				name={name[0]}
				ref={_ref ? _ref[0] : null}
				onChange={function (_value) {
					setvalue0(_value);
					onChange([_value, value1]);
				}}
				placeholder={placeholder[0] ? placeholder[0] : undefined}
				value={value0}
				InputProps={(function () {
					if (typeof units[0] !== "undefined") {
						return {
							endAdornment: <InputAdornment position="start">{units[0]}</InputAdornment>,
						};
					}
					return {};
				})()}
			/>
			<Typography
				style={(function () {
					if (splitStr === "") {
						return { paddingLeft: "8px", paddingRight: "8px" };
					}
					return { paddingLeft: "16px", paddingRight: "16px" };
				})()}
			>
				{splitStr}
			</Typography>

			<NumberInput
				{...restProps}
				name={name[1]}
				ref={_ref ? _ref[1] : null}
				onChange={function (_value) {
					setvalue1(_value);
					onChange([value0, _value]);
				}}
				placeholder={placeholder[1] ? placeholder[1] : undefined}
				value={value1}
				InputProps={(function () {
					if (typeof units[1] !== "undefined") {
						return {
							endAdornment: <InputAdornment position="start">{units[1]}</InputAdornment>,
						};
					}
					return {};
				})()}
			/>
		</Stack>
	);

	return (
		<>
			{(function () {
				if (label !== "") {
					return (
						<Stack alignItems="center" direction="row" justifyContent="left">
							<Typography style={{ width: labelWidth }}>{label}:</Typography>
							<div style={pSx}>{mainContent}</div>
						</Stack>
					);
				}
				return mainContent;
			})()}
		</>
	);
};
//为防止在编译和混淆后，无法识别组件名称，所以在这里显示定义名称
NumberRangeInput.displayName = "NumberRangeInput";
export default NumberRangeInput;
