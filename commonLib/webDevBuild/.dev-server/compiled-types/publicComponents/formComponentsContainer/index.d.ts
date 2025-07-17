/**
 * 廖力编写
 * 模块名称：表单组件公用容器
 * 模块说明：用于承载表单的单个组件用 - 支持新布局风格和老的布局风格
 * 编写时间：2025-04-14 10:57:04 星期一
 */
import { GridProps } from "@mui/material";
import React, { FC, ReactElement } from "react";
import { useFormik } from "formik";
import { TloadingState } from "renderer/utils/dynStateHook";
export interface IdynState {
    state: TloadingState;
    hasError: boolean;
    msg: string;
}
export interface IdynStateSetting {
    currentState: IdynState | null;
    loadingUnstarted?: "showUnstartedStyle" | "hide" | "none";
    loading?: "showLoadingFallback" | "hide" | "none";
    null?: "showNullFallback" | "hide" | "none";
    error?: "showErrorFallback" | "hide" | "none";
    unstartedStyle?: React.CSSProperties;
    loadingFallback?: ReactElement | ReactElement[];
    nullFallback?: ReactElement | ReactElement[];
    errorFallback?: ReactElement | ReactElement[];
    nullAndErrorClick?: (v: IdynState) => void;
}
/**
 * 表单组件容器的属性定义
 */
export interface IFormComponentsContainerProps {
    /** 当前编辑模式："add"（新增）| "watch"（查看）| "edit"（编辑） */
    mode: "add" | "watch" | "edit";
    /** 表单内部子组件 */
    children: React.ReactElement | React.ReactElement[] | null | undefined;
    /** 是否显示“必填”样式标识 */
    isRequiredStyle: boolean;
    /** 标签文本，若已包含冒号则无需额外添加 */
    label: string;
    /** 表单字段名，可为字符串或字符串数组（用于嵌套字段） */
    name: string | string[];
    /** 表单实例（Formik） */
    formik: ReturnType<typeof useFormik>;
    /** 单位文本（如：元、㎡ 等，可选） */
    unit?: string;
    /** 可选项（用于下拉选择类组件，可选） */
    selectItems?: {
        label: string;
        value: string;
    }[];
    /** 是否为多选（可选，默认 false） */
    isMutipleSelections?: boolean;
    /** 是否启用编辑状态（可选，默认 true） */
    enabled?: boolean;
    /** 标签部分的 Grid 布局属性（仅在 layoutStyle 为 "newStyle" 时有效） */
    labelGridProps?: GridProps;
    /** 组件部分的 Grid 布局属性 */
    comGridProps?: GridProps;
    /** 时间范围组件的格式（可选，如 'YYYY-MM-DD'） */
    dateFormat?: string;
    /** 自定义渲染函数（用于只读模式下的展示） */
    render?: (data: any) => any;
    /**
     * 布局风格类型：
     * - "newStyle": 新系统样式，labelGridProps 和 comGridProps 均有效
     * - "oldStyle": 老系统样式，仅 comGridProps 有效
     * 默认为 "newStyle"
     */
    layoutStyle?: "newStyle" | "oldStyle";
    /** 是否显示该表单项（可选，默认 true） */
    isShow?: boolean;
    /**
     * 动态参数组件的配置
     */
    dynStatesSetting?: IdynStateSetting;
    /**
      是否在低代码编辑器内
      */
    isInLowCodeMode?: boolean;
    /**
     * 强制更新rectinfo (isInLowCodeMode = true)才有效
     */
    forceUpdateRectInfoStamp?: number;
    nodeIndex?: number;
    /**
     * 上报rect信息（x,y,width,height） (isInLowCodeMode = true)才有效
     */
    reportRectInfo?: (index: number, values: Irectinfo) => void;
}
export type Tinputprops = IFormComponentsContainerProps;
export interface Irectinfo {
    left: number;
    top: number;
    width: number;
    height: number;
}
/**
 * FormComponentsContainer
 *
 * 公用表单项容器，支持：
 * - 三种模式（新增 / 查看 / 编辑）
 * - 新旧两种布局风格
 * - 单选、多选、日期范围等多种常见控件
 */
declare const FormComponentsContainer: FC<IFormComponentsContainerProps>;
export default FormComponentsContainer;
//# sourceMappingURL=index.d.ts.map