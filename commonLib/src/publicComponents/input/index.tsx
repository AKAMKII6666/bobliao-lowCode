import React from "react";

import { Typography, TextField, Stack, SxProps, Theme } from "@mui/material";

/**
 * MithrilInput 组件的属性接口
 */
export interface IMithrilInputProps {
	/**
	 * 输入框类型，如 "text", "number", "password" 等，默认 "text"
	 */
	type?: string;

	/**
	 * 输入框的唯一标识，可用于关联标签或测试
	 */
	id?: string;

	/**
	 * 左侧标签文本或自定义节点
	 */
	label?: React.ReactNode | string;

	/**
	 * 左侧标签宽度（单位默认为 px），不传则自适应内容宽度
	 */
	labelWidth?: number;

	/**
	 * 输入框的 name 属性，用于表单提交或表单库绑定
	 */
	name?: string;

	/**
	 * 输入框当前值
	 */
	value?: string;

	/**
	 * 输入框 placeholder 提示文本
	 */
	placeholder?: string;

	/**
	 * 是否禁用输入框，默认为 false
	 */
	disabled?: boolean;

	/**
	 * 是否占满父容器宽度，默认为 false
	 */
	fullWidth?: boolean;

	/**
	 * 布局方向，可选 "row" 或 "column"，决定标签与输入框的排列方式，默认为 "row"
	 */
	direction?: any;

	/**
	 * 是否在标签后显示冒号，默认为 true
	 */
	colon?: boolean;

	/**
	 * 包裹内容的 Stack 组件的额外样式，使用 MUI 的 sx 语法
	 */
	stackSx?: SxProps<Theme>;

	/**
	 * 输入框的额外样式，使用 MUI 的 sx 语法
	 */
	sx?: SxProps<Theme>;

	/**
	 * 输入框错误状态，当为 truthy 时展示错误样式
	 */
	error?: any;

	/**
	 * 标签和输入框之间的间距，默认为 2
	 */
	spacing?: any;

	/**
	 * 输入值变化时的回调
	 * @param event 原生 ChangeEvent，用于获取新的输入值
	 */
	onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

	/**
	 * 传递给 MUI TextField 的 InputProps，用于扩展输入框内部元素，如添加前后缀图标等
	 */
	InputProps?: any;
}

//往外面暴露统一名称的属性对象，用于生成低代码平台属性JSON schema
export type Tinputprops = IMithrilInputProps;

const MithrilInput = (props: IMithrilInputProps) => {
	const {
		type,
		id,
		name,
		value,
		label,
		placeholder = "",
		onChange,
		labelWidth,
		fullWidth = false,
		sx = { width: 140 },
		spacing = 2,
		stackSx,
		error,
		direction = "row",
		disabled = false,
		colon = true,
		InputProps = {},
	} = props;

	return (
		<Stack alignItems={direction === "row" ? "center" : "start"} direction={direction} sx={stackSx} justifyContent="start" spacing={spacing}>
			{label && (
				<Typography sx={{ width: labelWidth ? labelWidth : "auto" }}>
					{label} {colon ? ":" : ""}
				</Typography>
			)}
			<TextField
				name={name}
				onChange={onChange}
				size="small"
				sx={sx}
				type={type}
				fullWidth={fullWidth}
				placeholder={placeholder}
				value={value}
				error={error}
				id={id}
				disabled={disabled}
				InputProps={InputProps}
			/>
		</Stack>
	);
};
//为防止在编译和混淆后，无法识别组件名称，所以在这里显示定义名称
MithrilInput.displayName = "MithrilInput";
export default MithrilInput;
