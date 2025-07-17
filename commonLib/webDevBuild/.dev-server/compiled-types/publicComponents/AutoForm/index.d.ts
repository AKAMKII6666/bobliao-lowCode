/**
 * 廖力编写
 * 模块名称：基于formComponentsContainer的自动布局和数据绑定组件
 * 模块说明：
 * 		为更方便快速进行布局和数据绑定，基于formComponentsContainer组件进行封装，
 * 配合publicDetailDataHook.ts可以进行更快速的布局和数据绑定，也为低代码建设提供更
 * 好的基础。
 * 		该组件的设计思路是：通过传入一个json对象，自动生成表单布局和数据绑定。
 * 编写时间：2025-05-19 09:54:55 星期一
 */
import { GridProps } from "@mui/material";
import { useFormik } from "formik";
import { IFormComponentsContainerProps, Irectinfo } from "MithalCommonLibrary/formComponentsContainer";
import { ITextFieldProps } from "MithalCommonLibrary/TextField";
import { NumberInputProps } from "MithalCommonLibrary/CustomNumberInput";
import React, { FC, ReactElement } from "react";
import { IMithrilSelectProps } from "MithalCommonLibrary/select";
import { IMithrilAutocompleteProps } from "MithalCommonLibrary/autocomplete";
import { IAntdDateRangePackerProps } from "MithalCommonLibrary/antdDateRangePicker";
import { NumberRangeInputProps } from "MithalCommonLibrary/numberRangeInput";
import { EnhancedTextFieldProps } from "MithalCommonLibrary/textArea";
import { IMithrilYesNoSwitchProps } from "MithalCommonLibrary/yes-no-switch";
import { ISingleDatePickerProps } from "MithalCommonLibrary/SingleDatePicker";
export declare const AutoFormComsMap: {
    TextField: {
        (props: import("@mui/material").TextFieldProps): import("react/jsx-runtime").JSX.Element;
        displayName: string;
    };
    CustomNumberInput: React.ForwardRefExoticComponent<Omit<NumberInputProps, "ref"> & React.RefAttributes<HTMLInputElement>>;
    MithrilSelect: {
        (props: IMithrilSelectProps): import("react/jsx-runtime").JSX.Element;
        displayName: string;
    };
    MithrilAutocomplete: {
        (props: IMithrilAutocompleteProps): import("react/jsx-runtime").JSX.Element;
        displayName: string;
    };
    AntdDateRangePacker: React.ForwardRefExoticComponent<IAntdDateRangePackerProps & React.RefAttributes<import("MithalCommonLibrary/antdDateRangePicker").TAntdDateRangePackerRef>>;
    NumberRangeInput: {
        (props: NumberRangeInputProps, _ref: React.ForwardedRef<HTMLInputElement>[]): ReactElement;
        displayName: string;
    };
    MithrilTextArea: React.FC<EnhancedTextFieldProps>;
    MithrilYesNoSwitch: React.FC<IMithrilYesNoSwitchProps>;
    SingleDatePicker: React.FC<ISingleDatePickerProps>;
};
export interface IAutoFormItemProps extends Omit<IFormComponentsContainerProps, "children" | "mode" | "formik"> {
    /**
     * 可选的 formik 对象，若未传入将使用 AutoForm 统一传入的 formik
     */
    formik?: ReturnType<typeof useFormik<any>>;
    /**
     * 表单模式（可选），若未设置则继承自 AutoForm
     * - "add": 新增
     * - "edit": 编辑
     * - "watch": 只读查看
     */
    mode?: "edit" | "add" | "watch";
    /**
     * 组件的 children（可选），可以传入自定义组件函数用于替代 comType 指定的默认组件
     */
    children?: any;
    /**
     * 传递给组件的属性，支持多个组件属性联合类型
     * 注意：字段会根据 comType 对应组件类型来决定具体使用哪些字段
     */
    comProps?: ITextFieldProps & NumberInputProps & IMithrilSelectProps & IAntdDateRangePackerProps & IMithrilAutocompleteProps & EnhancedTextFieldProps & NumberRangeInputProps & ISingleDatePickerProps & IMithrilYesNoSwitchProps;
    /**
     * 表单项使用的组件类型，必须是 AutoFormComsMap 中定义的组件名
     * 例如：TextField、CustomNumberInput、MithrilSelect 等
     */
    comType?: keyof typeof AutoFormComsMap;
}
/**
 * AutoForm 组件的参数定义
 */
export interface IAutoFormProps {
    /** 表单标题，可选，显示在表单最上方 */
    title?: string;
    /** Formik 实例，用于统一处理表单状态和数据绑定 */
    formik: ReturnType<typeof useFormik<any>>;
    /** 表单操作模式，可选，默认值为 "add"
     * - "edit"：编辑模式
     * - "add"：新增模式
     * - "watch"：只读查看模式
     */
    mode?: "edit" | "add" | "watch";
    /** 是否启用表单组件，默认为 true，传 false 可统一禁用所有组件 */
    enabled?: boolean;
    /** 表单中 label 部分的布局属性（MUI 的 GridProps） */
    labelGridProps?: GridProps;
    /** 表单中组件本体的布局属性（MUI 的 GridProps） */
    comGridProps?: GridProps;
    /** 整个表单容器的布局属性（MUI 的 GridProps） */
    formContainerGridProps?: GridProps;
    /** 表单布局风格设置，默认为 "newStyle"
     * - "newStyle"：新系统的布局风格，label 和组件都可分别设置布局属性
     * - "oldStyle"：老系统的布局风格，仅支持设置组件的布局属性，label 部分布局固定
     */
    layoutStyle?: "newStyle" | "oldStyle";
    /** 表单项配置列表，每一项对应一个输入组件和其属性定义 */
    items: IAutoFormItemProps[];
    /**
      是否在低代码编辑器内
      */
    isInLowCodeMode?: boolean;
    /**
     * 强制更新rectinfo (isInLowCodeMode = true)才有效
     */
    forceUpdateRectInfoStamp?: number;
    /**
     * 设置每个组件的rect信息（x,y,width,height） (isInLowCodeMode = true)才有效
     */
    reportRectInfo?: (index: number, value: Irectinfo) => void;
}
export type Tinputprops = IAutoFormProps;
declare const AutoForm: FC<IAutoFormProps>;
export default AutoForm;
//# sourceMappingURL=index.d.ts.map