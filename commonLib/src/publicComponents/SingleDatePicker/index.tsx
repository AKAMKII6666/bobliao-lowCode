/**
 * 廖力编写
 * 模块名称：单个日期框
 * 模块说明：
 * 		写这个的目的是为了统一系统内单一时间选择框的样式，
 * 之前的时间选择框会显示"YYYY-MM-DD"而且不显示用户自定义的placeHolder,
 * 并且修复了在focus中了组件后强行显示"YYYY-MM-DD"的问题，
 * 并且修复了时间选择框在关闭时反复跳来跳去的问题
 *
 *
 * 编写时间：2025-05-13 17:40:27 星期二
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import { DatePicker, LocalizationProvider, DatePickerProps } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/zh-cn";
import dayjs, { Dayjs } from "dayjs";
import { Stack, SxProps, TextField, Theme, Typography } from "@mui/material";

// 设置全局的 locale
dayjs.locale("zh-cn");
/**
 * 传入参数
 */
export interface ISingleDatePickerProps extends Omit<DatePickerProps<Dayjs>, "placeHolder" | "placeholder"> {
	/**
	 * 左侧标签文本或自定义节点
	 */
	label?: React.ReactNode | string;

	/**
	 * 左侧标签宽度（单位默认为 px），不传则自适应内容宽度
	 */
	labelWidth?: number;

	/**
	 * 包裹内容的 Stack 组件的额外样式，使用 MUI 的 sx 语法
	 */
	stackSx?: SxProps<Theme>;
	/**
	 * 布局方向，可选 "row" 或 "column"，决定标签与输入框的排列方式，默认为 "row"
	 */
	direction?: any;
	/**
	 * 标签和输入框之间的间距，默认为 2
	 */
	spacing?: any;
	/**
	 * 是否在标签后显示冒号，默认为 true
	 */
	colon?: boolean;
	/* textFaild的样式 */
	InputProps?: any;
	/* sx */
	sx: any;
	placeHolder?: string;
	placeholder?: string;
}

//往外面暴露统一名称的属性对象，用于生成低代码平台属性JSON schema
export type Tinputprops = ISingleDatePickerProps;

const SingleDatePicker: FC<ISingleDatePickerProps> = (props): ReactElement => {
	const {
		label,
		stackSx,
		colon = true,
		direction = "row",
		spacing,
		labelWidth,
		placeHolder,
		placeholder,
		format = "YYYY-MM-DD",
		InputProps = {},
		sx = {},
		...restProps
	} = props;
	//===============useHooks=================

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [open, setOpen] = React.useState(false);

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
			<Stack alignItems={direction === "row" ? "center" : "start"} direction={direction} sx={stackSx} justifyContent="start" spacing={spacing}>
				{label && (
					<Typography sx={{ width: labelWidth ? labelWidth : "auto" }}>
						{label} {colon ? ":" : ""}
					</Typography>
				)}
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						{...restProps}
						slots={{
							field: (props: any) => {
								// 从 params 解构出框架注入的属性
								let { inputRef, inputProps, InputProps, value, ...textFieldProps } = props;
								if (value !== null && value !== "") {
									value = dayjs(value).format(format);
								}
								return (
									<TextField
										style={{ marginTop: 0 }}
										{...props}
										{...InputProps}
										value={value}
										placeholder={(placeHolder || placeholder) ?? format}
										inputRef={inputRef}
										// 取框架给你的 inputProps（里含 value: '2025/05/14'）
										InputProps={props.InputProps}
										inputProps={{
											...inputProps,
											readOnly: true, // 禁止键盘输入
										}}
										onClick={(e) => {
											setOpen(true); // 整个点击区也能打开
										}}
									/>
								);
							},
						}}
						slotProps={{
							popper: {
								sx: {
									//这里修复层在关闭一瞬间反复跳动造成体验不良
									zIndex: open ? 999 : -1,
								},
							},
						}}
						sx={sx}
						open={open}
						onClose={() => setOpen(false)}
						onOpen={() => setOpen(true)}
					/>
				</LocalizationProvider>
			</Stack>
		</>
	);
};
SingleDatePicker.displayName = "SingleDatePicker";
export default SingleDatePicker;
