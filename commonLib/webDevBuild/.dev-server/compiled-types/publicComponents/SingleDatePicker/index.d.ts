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
import { FC } from "react";
import { DatePickerProps } from "@mui/x-date-pickers";
import "dayjs/locale/zh-cn";
import { Dayjs } from "dayjs";
/**
 * 传入参数
 */
export interface ISingleDatePickerProps extends Omit<DatePickerProps<Dayjs>, "placeHolder" | "placeholder"> {
    placeHolder?: string;
    placeholder?: string;
}
export type Tinputprops = ISingleDatePickerProps;
declare const SingleDatePicker: FC<ISingleDatePickerProps>;
export default SingleDatePicker;
//# sourceMappingURL=index.d.ts.map