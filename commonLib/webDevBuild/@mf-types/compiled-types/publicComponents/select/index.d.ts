import * as React from "react";
import { SxProps, Theme } from "@mui/material/styles";
/**
 * MithrilSelect 组件属性接口
 */
export interface IMithrilSelectProps {
    /**
     * 组件唯一标识，可用于表单或测试
     */
    id?: string;
    /**
     * Select 的 name 属性，用于表单提交或与表单库绑定
     */
    name?: string;
    /**
     * 左侧标签文本或自定义节点
     */
    label?: React.ReactNode | string;
    /**
     * 标签宽度(px)，不传则根据内容自适应宽度
     */
    labelWidth?: number;
    /**
     * 是否为必填项，会在标签前显示红色星号
     */
    required?: boolean;
    /**
     * 当前选中值，可为字符串或字符串数组（多选）
     */
    value?: string[] | string;
    /**
     * 默认初始值，可为字符串或字符串数组
     */
    defaultValue?: string[] | string;
    /**
     * 是否支持多选，默认为 false（单选）
     */
    multiple?: boolean;
    /**
     * MUI 系统样式扩展，应用于 Select 根节点
     */
    sx?: SxProps<Theme>;
    /**
     * 包裹 Select 的 Stack 组件的样式扩展
     */
    stackSx?: SxProps<Theme>;
    /**
     * 是否占满父容器宽度，默认为 false
     */
    fullWidth?: boolean;
    /**
     * 尺寸规格，可传 'small' | 'medium' 等 MUI 支持的 size
     */
    size?: any;
    /**
     * 是否展示错误状态（红色边框等），默认为 false
     */
    error?: boolean;
    /**
     * 排列方向，可选 'row' 或 'column'
     */
    direction?: any;
    /**
     * 下拉选项数据源，数组元素应包含 value 和 label
     */
    data?: {
        value: string | number;
        label: string;
    }[];
    /**
     * 无选项时的占位文本，展示在隐藏的 MenuItem 中
     */
    placeholder?: string;
    /**
     * 是否启用直接调用 onChange（change=true 时）
     */
    change?: boolean;
    /**
     * 是否禁用选择框，默认为 false
     */
    disabled?: boolean;
    /**
     * 是否在标签后显示冒号，默认为 true
     */
    colon?: boolean;
    /**
     * Stack 组件子项之间的间距，默认 2
     */
    spacing?: any;
    /**
     * 选中值变化回调
     * @param value 新的选中值，字符串或数组
     */
    onChange?: (value: string[] | any) => void;
}
export type Tinputprops = IMithrilSelectProps;
declare const MithrilSelect: {
    (props: IMithrilSelectProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export default MithrilSelect;
//# sourceMappingURL=index.d.ts.map