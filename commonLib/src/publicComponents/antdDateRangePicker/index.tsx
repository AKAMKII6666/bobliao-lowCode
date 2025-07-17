/**
 * 廖力编写
 * 模块名称：Antd连体时间范围组件
 * 模块说明：连体的时间范围组件
 * 编写时间：
 */
import { Stack, SxProps, Typography } from "@mui/material";
import type { Theme } from "@emotion/react";
import { DatePicker } from "antd";
import styles from "./index.module.scss";
import locale from "antd/es/locale/zh_CN";

import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import toast from "react-hot-toast";

const { RangePicker } = DatePicker;

/* 
	它默认的中文语言包里没有这两个字段
	估计就是bug
	这边给它补上
*/
(locale as unknown as any).DatePicker.lang.shortMonths = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
(locale as unknown as any).DatePicker.lang.shortWeekDays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

/**
 * 传入参数
 */
export interface IAntdDateRangePackerProps {
	/* 当值发生变化的时候 */
	onChange?: (start: number, end: number) => void;
	/* 绑定样式 */
	className?: string;
	/* 显示文字 */
	label?: string;
	/* 显示文字的宽度 */
	labelWidth?: string | number;
	/*格式 */
	format?: string;
	/* 是否显示placeHolder */
	showHelperText?: boolean;
	/* 是否显示具体的小时 */
	showTime?: boolean;
	/* 开始时间 */
	startVal?: string;
	/* 结束时间 */
	endVal?: string;
	/* 默认初始化的时间(只在初始化时有效 ) */
	defaultValue?: Array<any>;
	/* 选框组件本体样式 */
	sx?: SxProps<Theme>;
	/* 选框组件本体样式 */
	datePickerSx?: SxProps<Theme>;
	/* 组件的容器样式 */
	style?: SxProps<Theme>;
	/* 组件label的容器样式 */
	leftSx?: SxProps<Theme>;
	/* 限制所选时间范围 */
	limitScope?: {
		enabled?: boolean;
		monthScope?: number;
	};
	/* 与外部可联动变化的值(初始化和外部状态改变都有效 ) */
	value?: Array<any>;
	/* 是否出现清除值的按钮 */
	allowClear?: boolean;
	/* 组件是否可用 */
	enabled?: boolean;
	/* 是否显示确认按钮，并在选择时间后点击确认继续 */
	needConfirm?: boolean;
}

export type TAntdDateRangePackerRef = {
	/* 重置 */
	reset: () => void;
	resetToDate: (start: any, end: any) => void;
};

//往外面暴露统一名称的属性对象，用于生成低代码平台属性JSON schema
export type Tinputprops = IAntdDateRangePackerProps;

/* 
	antd没有clear 或者reset方法
	需要在组件内内置一个状态控制它的value 
	通过forwardRef和useImperativeHandle将做好的rezet函数暴露出去
	在reset里将组件内的value设为空用来清空组件状态

	antd 5.17.0无法设置placement,也就是说设置了placement会无效
	所以将antd 5.17.0 升级到了5.21.1

	解决弹出框月份为英文的问题，需要安装moment
	然后设置它
*/
const AntdDateRangePacker = forwardRef<TAntdDateRangePackerRef, IAntdDateRangePackerProps>(
	(
		{
			//
			onChange = function (start: number, end: number) {},
			className = "",
			label = "",
			labelWidth = "auto",
			leftSx = {},
			format = "YYYY-MM-DD",
			showTime = false,
			showHelperText = false,
			startVal = "",
			endVal = "",
			defaultValue = [],
			value = [],
			sx = {},
			style = {},
			datePickerSx = { height: "40.125px" },
			limitScope = { enabled: false, monthScope: 2 },
			allowClear = false,
			enabled = true,
			needConfirm = false,
		},
		_ref
	): ReactElement => {
		let initValue = [];
		/* 控制初始化值 */
		if (startVal !== "" && endVal !== "") {
			initValue = [startVal, endVal];
		}

		/* 控制初始化值 */
		if (defaultValue.length === 2) {
			initValue = defaultValue;
		}

		/* 内置状态 */
		const [values, setvalues] = useState<any>(initValue);

		useImperativeHandle(_ref, () => ({
			reset() {
				setvalues([]);
			},
			resetToDate(start, end) {
				setvalues([start, end]);
			},
		}));

		let inputProps: any = {
			showTime,
			locale: locale.DatePicker,
			format: format,
			className: className + " " + styles.datePickerModify,
			placeholder: ["开始时间", "结束时间"],
			placement: "bottomLeft",
			allowClear: allowClear,
			onChange: function (_e) {
				/* 如果是null 就是点击了清除按钮 */
				if (_e === null || _e[0] === null || _e[1] === null) {
					setvalues([]);
					onChange(undefined, undefined);
					return;
				}

				if (limitScope.enabled === true) {
					if (limitScope.monthScope !== -1) {
						let [start, end] = _e;
						let diffInMonths = end.diff(start, "month", true);
						if (diffInMonths > limitScope.monthScope) {
							end = start.add(limitScope.monthScope, "month").subtract(1, "day");
							toast.error("时间范围不能超过" + limitScope.monthScope + "个月，已自动调整为两个月内！");
							_e[0] = start;
							_e[1] = end;
						}
					}
				}

				let start = _e[0].toDate().getTime();
				let end = _e[1].toDate().getTime();
				onChange(start, end);
				setvalues([_e[0], _e[1]]);
			},
			style: { ...sx, ...datePickerSx } as React.CSSProperties,
			value: values,
			needConfirm: showTime ? true : needConfirm,
			disabled: !enabled,
		};

		useEffect(
			function () {
				//数组里[null, null]表示清空该组件值
				if (value[0] === null && value[1] === null) {
					setvalues([]);
					return;
				}
				if (value.length === 2 && !isNaN(value[0].$D) && !isNaN(value[1].$D)) {
					setvalues(value);
				}
			},
			[value]
		);

		let elem = <RangePicker {...inputProps} />;

		/* 直接返回组件 */
		return (
			<>
				{(function () {
					if (label !== "") {
						return (
							<Stack alignItems="center" direction="row" justifyContent="left" sx={style}>
								{(function () {
									if (label === "") {
										return null;
									}
									return <Typography sx={{ ...leftSx, width: labelWidth }}>{label}:</Typography>;
								})()}
								<div style={{ paddingLeft: "14px", width: "100%" }}>{elem}</div>
							</Stack>
						);
					}
					return elem;
				})()}
			</>
		);
	}
);
//为防止在编译和混淆后，无法识别组件名称，所以在这里显示定义名称
AntdDateRangePacker.displayName = "AntdDateRangePacker";
export default AntdDateRangePacker;
