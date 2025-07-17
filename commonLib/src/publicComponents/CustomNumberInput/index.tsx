import React, { useState, useEffect, forwardRef, useRef } from "react";
import type { ForwardedRef } from "react";
import { TextField, IconButton, InputAdornment, TextFieldProps, SxProps, Theme, Stack, Typography } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import _bigNumber from "bignumber.js";
// —— 1. 全局配置：不让 BigNumber 用科学计数法（改成你需要的阈值） ——
//    这里我们设置，在绝对值 ≤ 1e+1000 时都用普通字符串
_bigNumber.config({
	EXPONENTIAL_AT: 1e3, // 10^1000 以内一律不进入 e+xx 表示法
});

/**
 * 组件属性接口
 */
export interface NumberInputProps extends Omit<TextFieldProps, "onChange" | "value" | "onBlur"> {
	/**
	 * 当前输入框的值，以字符串形式保存，允许临时保存不完整的数字（例如 "-" 或 "3."）
	 */
	value?: string;
	/**
	 * 值变化时的回调，仅在输入有效数字时触发（例如失焦或点击增减按钮后）
	 */
	onChange?: (newValue: string) => void;
	/**
	 * 失焦时的回调
	 */
	onBlur?: React.FocusEventHandler<HTMLInputElement>;
	/**
	 * 数字格式化的小数位数，默认 2 位
	 */
	fixed?: number;
	/* 格式化数字的时候是否补齐0 */
	isFillZero?: boolean;
	/**
	 * 数值下限（如果设置，则输入数字不能低于此值）
	 */
	min?: number;
	/**
	 * 当格式化或增减操作完成后调用的额外回调
	 */
	handleAccredit?: () => void;
	/**
	 * 布局方向，可选 "row" 或 "column"，决定标签与输入框的排列方式，默认为 "row"
	 */
	direction?: any;
	/**
	 * 包裹内容的 Stack 组件的额外样式，使用 MUI 的 sx 语法
	 */
	stackSx?: SxProps<Theme>;
	/**
	 * 标签和输入框之间的间距，默认为 2
	 */
	spacing?: any;
	/**
	 * 左侧标签宽度（单位默认为 px），不传则自适应内容宽度
	 */
	labelWidth?: number;
	/**
	 * 是否在标签后显示冒号，默认为 true
	 */
	colon?: boolean;
	/**
	 * 左侧标签文本或自定义节点
	 */
	label?: React.ReactNode | string;
}

//往外面暴露统一名称的属性对象，用于生成低代码平台属性JSON schema
export type Tinputprops = NumberInputProps;

/**
 * 数字输入组件，支持输入整数与浮点数，内部延迟格式化，且带有增减按钮。
 */
const CustomNumberInput = (props: NumberInputProps, ref: ForwardedRef<HTMLInputElement>) => {
	const {
		value = "",
		onChange = function () {},
		onBlur,
		fixed = 2,
		isFillZero = true,
		min,
		handleAccredit,
		// 其他传给 TextField 的属性
		sx,
		label,
		labelWidth,
		stackSx,
		direction = "row",
		colon = true,
		spacing = 2,
		...restProps
	} = props;

	// 内部状态保存用户当前输入的文本（允许暂存不完整的数字）
	const [inputValue, setInputValue] = useState<string>(value);
	const isComposing = useRef(false); // 是否正在使用输入法（拼写中）

	// 当外部传入的 value 发生变化时，同步到内部状态
	useEffect(() => {
		setInputValue(value);
	}, [value]);

	/* 
		windows bug修复
		中文输入时，浏览器会先触发一系列 compositionstart → input → compositionend 事件。
		如果在 compositionend 之前，你就用 onChange 校验输入格式并主动 setInputValue('') 或 onChange('')，会导致中文还没输入完，原有输入被清空。
	*/
	const handleCompositionStart = () => {
		/* console.log("开始拼写"); */
		isComposing.current = true;
	};

	const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
		/* console.log("结束拼写"); */
		isComposing.current = false;
		handleInputChange(e as any); // 输入结束后，重新触发一次 change 校验
	};

	/**
	 * 输入框内容变化时的处理函数
	 * 只允许输入合法的数字格式（包括负号和小数点），例如："", "-", "3", "3.", "3.14"
	 */
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;

		if (isComposing.current) {
			if (/^-?(?:\d+|\d*\.\d+)$/.test(newValue)) {
				/* console.log("是数字"); */
				isComposing.current = false;
				return;
			} else {
				/* console.log("不是数字"); */
			}
			return;
		}
		if (min >= 0 && newValue.indexOf("-") !== -1) {
			return;
		}
		// 正则表达式允许负号、数字和最多一个小数点
		const reg = /^-?\d*(\.\d*)?$/;
		if (reg.test(newValue)) {
			// 如果设置了 min，并且输入数字已经构成有效数字，则限制输入不能低于 min
			if (min !== undefined && newValue !== "" && newValue !== "-" && !isNaN(Number(newValue))) {
				if (Number(newValue) < min) {
					return;
				}
			}

			let resv = _bigNumber(newValue).toString();
			if (isNaN(Number(resv))) {
				onChange("");
				setInputValue("");
				return;
			}
			setInputValue(newValue);
			onChange(newValue);
		}
	};

	/**
	 * 将输入内容格式化为固定小数位数的数字字符串
	 * 1. 如果输入以 "." 或单独 "-" 结尾，则去掉最后一个字符；
	 * 2. 转换为数字后再格式化（这样会去掉前导 0）。
	 */
	const formatValue = (val: string): string => {
		if (val === null) {
			return "";
		}
		let tempVal = val.toString();
		if (tempVal.endsWith(".") || tempVal === "-") {
			tempVal = tempVal.slice(0, -1);
		}
		// 若经过处理后为空字符串，则直接返回空字符串
		if (tempVal === "") return "";
		const num = tempVal;
		if (isFillZero) {
			return _bigNumber(num).toFixed(fixed).toString();
		}
		//不需要补齐0但是tofix
		return _bigNumber(num).decimalPlaces(fixed).toString();
	};

	/**
	 * 失焦时，对输入内容进行格式化，并调用外部 onChange
	 */
	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if (inputValue === "") {
			onChange("");
		}
		// 如果没有输入，则直接触发 onBlur 回调
		if (inputValue === "" || inputValue === "-") {
			if (onBlur) onBlur(e);
			onChange("");
			return;
		}
		const formatted = formatValue(inputValue);
		setInputValue(formatted);
		onChange(formatted);
		if (handleAccredit) handleAccredit();
		if (onBlur) onBlur(e);
	};

	/**
	 * 增加数值，默认步长为 1
	 */
	const handleIncrement = () => {
		// 如果当前输入为空或仅为无效格式，则视为 0
		let currentNum = 0;
		if (inputValue !== "" && inputValue !== "-" && !isNaN(Number(inputValue))) {
			currentNum = Number(inputValue);
		}
		let newNum = currentNum + 1;
		// 如果设置了最小值，则不允许小于 min
		if (min !== undefined && newNum < min) {
			newNum = min;
		}
		const formatted = newNum.toFixed(fixed);
		setInputValue(formatted);
		onChange(formatted);
		if (handleAccredit) handleAccredit();
	};

	/**
	 * 减少数值，默认步长为 1
	 */
	const handleDecrement = () => {
		let currentNum = 0;
		if (inputValue !== "" && inputValue !== "-" && !isNaN(Number(inputValue))) {
			currentNum = Number(inputValue);
		}
		let newNum = currentNum - 1;
		if (min !== undefined && newNum < min) {
			newNum = min;
		}
		const formatted = newNum.toFixed(fixed);
		setInputValue(formatted);
		onChange(formatted);
		if (handleAccredit) handleAccredit();
	};

	const makeContent = function () {
		return (
			<TextField
				{...restProps}
				value={inputValue}
				onChange={handleInputChange}
				onBlur={handleBlur}
				onCompositionStart={handleCompositionStart}
				onCompositionEnd={handleCompositionEnd}
				inputRef={ref}
				sx={sx}
				// 添加增减按钮作为输入框的后缀
				/* InputProps={{
				endAdornment: (
					<InputAdornment position="end" sx={{ display: "flex", flexDirection: "column", margin: 0, padding: 0 }}>
						<IconButton size="small" onClick={handleIncrement} sx={{ padding: 0, margin: 0, lineHeight: 1 }} aria-label="增加数字">
							<ArrowDropUpIcon fontSize="small" />
						</IconButton>
						<IconButton size="small" onClick={handleDecrement} sx={{ padding: 0, margin: 0, lineHeight: 1 }} aria-label="减少数字">
							<ArrowDropDownIcon fontSize="small" />
						</IconButton>
					</InputAdornment>
				),
			}} */
			/>
		);
	};

	return (
		<>
			{(function () {
				if (typeof label !== "undefined") {
					return (
						<Stack
							alignItems={direction === "row" ? "center" : "start"}
							direction={direction}
							sx={stackSx}
							justifyContent="start"
							spacing={spacing}
						>
							{label && (
								<Typography sx={{ width: labelWidth ? labelWidth : "auto" }}>
									{label} {colon ? ":" : ""}
								</Typography>
							)}
							{makeContent()}
						</Stack>
					);
				}
				return makeContent();
			})()}
		</>
	);
};

const NumberInput = forwardRef(CustomNumberInput);
//为防止在编译和混淆后，无法识别组件名称，所以在这里显示定义名称
NumberInput.displayName = "CustomNumberInput";
export default NumberInput;
