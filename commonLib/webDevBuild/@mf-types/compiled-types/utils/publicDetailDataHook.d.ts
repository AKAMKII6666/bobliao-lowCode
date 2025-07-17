/**
 * 廖力编写
 * 模块名称：公用详情页面用的datahook
 * 模块说明：公用详情页面用的datahook 带context
 * 编写时间：2025-04-14 10:57:04 星期一
 */
import React from "react";
import { IDynamicSelectionsParamsProp } from "./dynamicSelectionsParamsHook";
import { IuseFormikValueChangeHandlerItemProps } from "./formikValueChangesHook";
export type Tmode = "edit" | "add" | "watch";
export interface IuseMainDataHookProps<T, D> {
    /**
     * 表单默认值对象
     * 一般用于添加模式或编辑模式下的表单初始化
     */
    defaultValue: T;
    /**
     * 表单的其它状态
     * 例如是否显示某个窗口之类的不属于表单数据内容的状态
     */
    otherState?: D;
    /**
     * 主表单的验证规则（可选）
     * 使用 Yup 编写的校验对象
     */
    mainValidationSchema?: any;
    /**
     * 表单提交时的处理函数（可选）
     * 将在校验通过后调用，参数为当前表单值
     */
    onSubmit?: (values: T) => void;
    /**
     * 数据加载函数（可选）
     * 在 edit 和 watch 模式下使用，用于加载详情页数据
     * 返回一个对象作为表单初始化值
     */
    loadData?: () => T | Promise<T>;
    /**
     * 初始化钩子（可选）
     * 页面加载完成后调用，可以用于其他自定义初始化逻辑
     */
    init?: () => void;
    /**
     * 当前详情页的基础路由地址
     * 会被用于跳转 edit/watch 等操作，如 /user/detail
     */
    currentUrl: string;
    /**
     * 动态选择项配置（可选）
     * 用于配置页面中通过接口加载的 select 或级联参数等
     * 如：状态列表、城市列表等
     */
    dynamicSelectionsParams?: IDynamicSelectionsParamsProp[];
    /**
     * 表单值变动监听器配置（可选）
     * 用于在 formik 某些字段变动时联动更新其他字段
     */
    formikValueChangesParams?: {
        /**
         * 是否禁用该监听器功能
         */
        disabled: boolean;
        /**
         * 值变动联动处理配置项
         * 每项配置一个监听源字段和目标字段及处理逻辑
         */
        options: IuseFormikValueChangeHandlerItemProps<T>[];
    };
    /**
     * 表单提交节流时间（毫秒）
     * 防止频繁点击提交，默认 3000 毫秒
     */
    throttlingTime?: number;
    /**
     * 是否处理表单未保存的提示
     * 默认 true
     */
    isHandleUnsave?: boolean;
}
export declare const useMainDataHook: <T, D = {}>({ defaultValue, otherState, mainValidationSchema, onSubmit, loadData, init, currentUrl, dynamicSelectionsParams, formikValueChangesParams, throttlingTime, isHandleUnsave, }: IuseMainDataHookProps<T, D>) => {
    isMounted: boolean;
    avatarUploadState: "done" | "error" | "uploading" | "removed" | "init";
    setavatarUploadState: React.Dispatch<React.SetStateAction<"done" | "error" | "uploading" | "removed" | "init">>;
    mode: Tmode;
    checkFormikError: () => boolean;
    loadDetailData: () => Promise<void>;
    enabled: boolean;
    mainFormik: {
        initialValues: T & D;
        initialErrors: import("formik").FormikErrors<unknown>;
        initialTouched: import("formik").FormikTouched<unknown>;
        initialStatus: any;
        handleBlur: {
            (e: React.FocusEvent<any, Element>): void;
            <T_1 = any>(fieldOrEvent: T_1): T_1 extends string ? (e: any) => void : void;
        };
        handleChange: {
            (e: React.ChangeEvent<any>): void;
            <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
        };
        handleReset: (e: any) => void;
        handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
        resetForm: (nextState?: Partial<import("formik").FormikState<T & D>>) => void;
        setErrors: (errors: import("formik").FormikErrors<T & D>) => void;
        setFormikState: (stateOrCb: import("formik").FormikState<T & D> | ((state: import("formik").FormikState<T & D>) => import("formik").FormikState<T & D>)) => void;
        setFieldTouched: (field: string, touched?: boolean, shouldValidate?: boolean) => Promise<void> | Promise<import("formik").FormikErrors<T & D>>;
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void> | Promise<import("formik").FormikErrors<T & D>>;
        setFieldError: (field: string, value: string | undefined) => void;
        setStatus: (status: any) => void;
        setSubmitting: (isSubmitting: boolean) => void;
        setTouched: (touched: import("formik").FormikTouched<T & D>, shouldValidate?: boolean) => Promise<void> | Promise<import("formik").FormikErrors<T & D>>;
        setValues: (values: React.SetStateAction<T & D>, shouldValidate?: boolean) => Promise<void> | Promise<import("formik").FormikErrors<T & D>>;
        submitForm: () => Promise<any>;
        validateForm: (values?: T & D) => Promise<import("formik").FormikErrors<T & D>>;
        validateField: (name: string) => Promise<void> | Promise<string | undefined>;
        isValid: boolean;
        dirty: boolean;
        unregisterField: (name: string) => void;
        registerField: (name: string, { validate }: any) => void;
        getFieldProps: (nameOrOptions: string | import("formik").FieldConfig<any>) => import("formik").FieldInputProps<any>;
        getFieldMeta: (name: string) => import("formik").FieldMetaProps<any>;
        getFieldHelpers: (name: string) => import("formik").FieldHelperProps<any>;
        validateOnBlur: boolean;
        validateOnChange: boolean;
        validateOnMount: boolean;
        values: T & D;
        errors: import("formik").FormikErrors<T & D>;
        touched: import("formik").FormikTouched<T & D>;
        isSubmitting: boolean;
        isValidating: boolean;
        status?: any;
        submitCount: number;
    };
    id: string;
    filesIsUpLoading: boolean;
    setfilesIsUpLoading: React.Dispatch<React.SetStateAction<boolean>>;
    editForm: () => void;
    back: () => void;
    dynSelections: {
        updateFormikValues: (_values: {
            [property: string]: any;
        }) => void;
        forceUpdateFormikValues: (_values: {
            [property: string]: any;
        }) => void;
        selections: {
            [property: string]: import("./dynamicSelectionsParamsHook").IselectionItem[];
        };
        selectionsUpdateStamp: number;
        currentFormikValues: {
            [property: string]: any;
        };
        selectionsState: {
            [property: string]: import("../publicComponents/PublicInqueryItem").IdynState;
        };
        forceReload: () => Promise<void>;
    };
    formikValueChange: {
        currentFormikValues: Partial<T>;
        selectionsUpdateStamp: number;
        setselectionsUpdateStamp: React.Dispatch<React.SetStateAction<number>>;
    };
    loadingFormState: "padding" | "finished";
    resetForm: () => void;
    setmode: React.Dispatch<React.SetStateAction<Tmode>>;
    getItemDynState: (selectionArrName: string) => {
        currentState: import("../publicComponents/PublicInqueryItem").IdynState;
    };
};
export type TMainHookReturnType<T, D = {}> = ReturnType<typeof useMainDataHook<T, D>>;
/**
 * 创建一个需要全局使用的context
 **/
export declare const MainDataContext: React.Context<{
    isMounted: boolean;
    avatarUploadState: "done" | "error" | "uploading" | "removed" | "init";
    setavatarUploadState: React.Dispatch<React.SetStateAction<"done" | "error" | "uploading" | "removed" | "init">>;
    mode: Tmode;
    checkFormikError: () => boolean;
    loadDetailData: () => Promise<void>;
    enabled: boolean;
    mainFormik: {
        initialValues: any;
        initialErrors: import("formik").FormikErrors<unknown>;
        initialTouched: import("formik").FormikTouched<unknown>;
        initialStatus: any;
        handleBlur: {
            (e: React.FocusEvent<any, Element>): void;
            <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
        };
        handleChange: {
            (e: React.ChangeEvent<any>): void;
            <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
        };
        handleReset: (e: any) => void;
        handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
        resetForm: (nextState?: Partial<import("formik").FormikState<any>>) => void;
        setErrors: (errors: import("formik").FormikErrors<any>) => void;
        setFormikState: (stateOrCb: import("formik").FormikState<any> | ((state: import("formik").FormikState<any>) => import("formik").FormikState<any>)) => void;
        setFieldTouched: (field: string, touched?: boolean, shouldValidate?: boolean) => Promise<void> | Promise<import("formik").FormikErrors<any>>;
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void> | Promise<import("formik").FormikErrors<any>>;
        setFieldError: (field: string, value: string | undefined) => void;
        setStatus: (status: any) => void;
        setSubmitting: (isSubmitting: boolean) => void;
        setTouched: (touched: import("formik").FormikTouched<any>, shouldValidate?: boolean) => Promise<void> | Promise<import("formik").FormikErrors<any>>;
        setValues: (values: any, shouldValidate?: boolean) => Promise<void> | Promise<import("formik").FormikErrors<any>>;
        submitForm: () => Promise<any>;
        validateForm: (values?: any) => Promise<import("formik").FormikErrors<any>>;
        validateField: (name: string) => Promise<void> | Promise<string | undefined>;
        isValid: boolean;
        dirty: boolean;
        unregisterField: (name: string) => void;
        registerField: (name: string, { validate }: any) => void;
        getFieldProps: (nameOrOptions: string | import("formik").FieldConfig<any>) => import("formik").FieldInputProps<any>;
        getFieldMeta: (name: string) => import("formik").FieldMetaProps<any>;
        getFieldHelpers: (name: string) => import("formik").FieldHelperProps<any>;
        validateOnBlur: boolean;
        validateOnChange: boolean;
        validateOnMount: boolean;
        values: any;
        errors: import("formik").FormikErrors<any>;
        touched: import("formik").FormikTouched<any>;
        isSubmitting: boolean;
        isValidating: boolean;
        status?: any;
        submitCount: number;
    };
    id: string;
    filesIsUpLoading: boolean;
    setfilesIsUpLoading: React.Dispatch<React.SetStateAction<boolean>>;
    editForm: () => void;
    back: () => void;
    dynSelections: {
        updateFormikValues: (_values: {
            [property: string]: any;
        }) => void;
        forceUpdateFormikValues: (_values: {
            [property: string]: any;
        }) => void;
        selections: {
            [property: string]: import("./dynamicSelectionsParamsHook").IselectionItem[];
        };
        selectionsUpdateStamp: number;
        currentFormikValues: {
            [property: string]: any;
        };
        selectionsState: {
            [property: string]: import("../publicComponents/PublicInqueryItem").IdynState;
        };
        forceReload: () => Promise<void>;
    };
    formikValueChange: {
        currentFormikValues: Partial<any>;
        selectionsUpdateStamp: number;
        setselectionsUpdateStamp: React.Dispatch<React.SetStateAction<number>>;
    };
    loadingFormState: "padding" | "finished";
    resetForm: () => void;
    setmode: React.Dispatch<React.SetStateAction<Tmode>>;
    getItemDynState: (selectionArrName: string) => {
        currentState: import("../publicComponents/PublicInqueryItem").IdynState;
    };
}>;
/**
 * 给子节点使用的context
 * @returns
 */
export declare const useMainDataContext: <T, D = {}>() => TMainHookReturnType<T, D>;
//# sourceMappingURL=publicDetailDataHook.d.ts.map