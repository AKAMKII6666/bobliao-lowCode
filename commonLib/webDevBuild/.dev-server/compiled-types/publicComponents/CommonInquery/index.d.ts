/**
 * 廖力编写
 * 模块名称：查询栏快速数据绑定和布局组件
 * 模块说明：
 * 		虽然已经有了PublicInqueryContainer这个组件，但是制作查询栏时还不够快，
 * 这个组件集成了formik/下拉框或多选框数据拉取/查询验证等特性。
 * 主要解决的痛点是，可以使得编写查询条件栏目可以在列表页完成，而不用单独写一个组件，
 * 将冗余代码集中到一个组件里，方便日后维护。
 *
 * 编写时间：2025-05-14 16:26:12 星期三
 */
import { GridProps } from "@mui/material";
import { IAntdDateRangePackerProps } from "MithalCommonLibrary/antdDateRangePicker";
import { IMithrilAutocompleteProps } from "MithalCommonLibrary/autocomplete";
import { NumberInputProps } from "MithalCommonLibrary/CustomNumberInput";
import { IMithrilInputProps } from "MithalCommonLibrary/input";
import { NumberRangeInputProps } from "MithalCommonLibrary/numberRangeInput";
import { IPublicInqueryContainerprops } from "MithalCommonLibrary/PublicInqueryContainer";
import { IMithrilSelectProps } from "MithalCommonLibrary/select";
import { EnhancedTextFieldProps } from "MithalCommonLibrary/textArea";
import * as yup from "yup";
import React, { ReactElement } from "react";
import { useFormik } from "formik";
import { IdynStateSetting } from "MithalCommonLibrary/PublicInqueryItem";
import { IDynamicSelectionsParamsProp } from "renderer/utils/dynamicSelectionsParamsHook";
import { Irectinfo } from "MithalCommonLibrary/formComponentsContainer";
import { ISingleDatePickerProps } from "MithalCommonLibrary/SingleDatePicker";
export declare const CommonInqueryComsMap: {
    AntdDateRangePacker: React.ForwardRefExoticComponent<IAntdDateRangePackerProps & React.RefAttributes<import("MithalCommonLibrary/antdDateRangePicker").TAntdDateRangePackerRef>>;
    MithrilAutocomplete: {
        (props: IMithrilAutocompleteProps): import("react/jsx-runtime").JSX.Element;
        displayName: string;
    };
    CustomNumberInput: React.ForwardRefExoticComponent<Omit<NumberInputProps, "ref"> & React.RefAttributes<HTMLInputElement>>;
    MithrilInput: {
        (props: IMithrilInputProps): import("react/jsx-runtime").JSX.Element;
        displayName: string;
    };
    NumberRangeInput: {
        (props: NumberRangeInputProps, _ref: React.ForwardedRef<HTMLInputElement>[]): ReactElement;
        displayName: string;
    };
    MithrilSelect: {
        (props: IMithrilSelectProps): import("react/jsx-runtime").JSX.Element;
        displayName: string;
    };
    MithrilTextArea: React.FC<EnhancedTextFieldProps>;
    SingleDatePicker: React.FC<ISingleDatePickerProps>;
};
export interface ICommonInqueryitemprops {
    label: string;
    name: string | string[];
    defaultValue: string | string[];
    dateFormat?: string;
    comGridProps?: GridProps;
    isMutipleSelections?: boolean;
    labelWidth?: number | string;
    yupObj?: yup.StringSchema<string, yup.AnyObject, undefined, ""> | Array<yup.StringSchema<string, yup.AnyObject, undefined, "">>;
    selectItems?: {
        label: string;
        value: string;
    }[] | IDynamicSelectionsParamsProp;
    dynStatesSetting?: Partial<IdynStateSetting>;
    comProps?: IMithrilInputProps & NumberInputProps & IMithrilSelectProps & IAntdDateRangePackerProps & IMithrilAutocompleteProps & EnhancedTextFieldProps & NumberRangeInputProps & ISingleDatePickerProps;
    comType: keyof typeof CommonInqueryComsMap;
}
/**
 * 传入参数
 */
export interface ICommonInqueryprops extends Omit<IPublicInqueryContainerprops, "items" | "onSubmit" | "onReset" | "formik" | "dynSelectionsSetting" | "defaultValues"> {
    formik?: ReturnType<typeof useFormik> | null | undefined;
    defaultValues?: {
        [property: string]: any;
    };
    items: ICommonInqueryitemprops[];
    dynSelectionsSetting?: Partial<IdynStateSetting>;
    onSubmit: (values: any) => void;
    onReset: (values: any) => void;
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
/**
 * 导出时需要用到的接口
 */
export type TCommonInqueryRef = {
    getValues: () => any;
    getFormik: () => ReturnType<typeof useFormik>;
};
export type Tinputprops = ICommonInqueryprops;
declare const CommonInquery: React.ForwardRefExoticComponent<ICommonInqueryprops & React.RefAttributes<TCommonInqueryRef>>;
export default CommonInquery;
//# sourceMappingURL=index.d.ts.map