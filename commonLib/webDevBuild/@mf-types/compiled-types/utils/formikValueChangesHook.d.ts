/**
 * 廖力编写
 * 模块名称：formik值变动处理钩子
 * 模块说明：
 * 		`useFormikValueChanges` 是一个基于 `Formik` 的自定义 Hook，用于在表单中实现值变更联动处理。
 * 当指定字段发生变更时，可根据配置规则自动更新其他字段的值，并支持结合动态选项列表进行数据处理和填充。
 * 此组件可能依赖useDynamicSelectionsParams钩子
 * 编写时间：2025-05-16 10:30:48 星期五
 */
import { useFormik } from "formik";
import React from "react";
import useDynamicSelectionsParams from "./dynamicSelectionsParamsHook";
export interface IuseFormikValueChangeHandlerItemProps<T> {
    depKey: keyof T;
    /**
     * 以下三个字段配合使用时，若未设置 handleFunc，
     * 会根据选项列表中的数据进行自动赋值：
     * - depSelectionsListName
     * - depSelectionsListRowKey
     * - selectedSelectionRowItemKey
     */
    depSelectionsListName?: string;
    depSelectionsListRowKey?: string;
    selectedSelectionRowItemKey?: string;
    /**
     * 自定义处理函数
     * 若设置该函数，则优先使用其返回值进行赋值。
     */
    handleFunc?: (params: {
        value: any;
        formik: ReturnType<typeof useFormik<T>>;
        selectedItemRowValue?: any;
        selectedSelectionRow?: {
            [property: string]: any;
        };
        selectionList?: any[];
        selectionsObj?: ReturnType<typeof useDynamicSelectionsParams>;
    }) => T[keyof T] | Promise<T[keyof T]>;
    targetKey?: Array<keyof T>;
}
type LoosePartial<T> = Partial<T> & {
    [key: string]: any;
};
/**
 * useFormikValueChanges 的参数定义
 */
export interface IuseFormikValueChangeHandlerProps<T> {
    options: IuseFormikValueChangeHandlerItemProps<T>[];
    formik: ReturnType<typeof useFormik<T>>;
    dynamicSelectionsObj?: ReturnType<typeof useDynamicSelectionsParams>;
    disabled: boolean;
}
declare const useFormikValueChanges: <T extends LoosePartial<T>>({ options, formik, dynamicSelectionsObj, disabled, }: IuseFormikValueChangeHandlerProps<T>) => {
    currentFormikValues: Partial<T>;
    selectionsUpdateStamp: number;
    setselectionsUpdateStamp: React.Dispatch<React.SetStateAction<number>>;
};
export default useFormikValueChanges;
//# sourceMappingURL=formikValueChangesHook.d.ts.map