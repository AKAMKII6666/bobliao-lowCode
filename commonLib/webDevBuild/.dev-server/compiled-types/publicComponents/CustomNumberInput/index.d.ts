import React from "react";
import { TextFieldProps, SxProps, Theme } from "@mui/material";
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
export type Tinputprops = NumberInputProps;
declare const NumberInput: React.ForwardRefExoticComponent<Omit<NumberInputProps, "ref"> & React.RefAttributes<HTMLInputElement>>;
export default NumberInput;
//# sourceMappingURL=index.d.ts.map