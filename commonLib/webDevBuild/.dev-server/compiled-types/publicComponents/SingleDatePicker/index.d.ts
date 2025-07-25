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
import React, { FC } from "react";
import { DatePickerProps } from "@mui/x-date-pickers";
import "dayjs/locale/zh-cn";
import { Dayjs } from "dayjs";
import { SxProps, Theme } from "@mui/material";
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
    InputProps?: any;
    sx: any;
    placeHolder?: string;
    placeholder?: string;
}
export type Tinputprops = ISingleDatePickerProps;
declare const SingleDatePicker: FC<ISingleDatePickerProps>;
export default SingleDatePicker;
//# sourceMappingURL=index.d.ts.map