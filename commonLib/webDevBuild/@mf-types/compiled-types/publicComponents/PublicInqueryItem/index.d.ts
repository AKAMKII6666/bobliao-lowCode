/**
 * 廖力编写
 * 模块名称：公用查询组件容器
 * 模块说明：用于快速开发查询条件栏目,将大量重复的查询条件组件中的编码集中到这个组件里进行
 * 编写时间：2025-05-06 18:48:00 星期二
 */
import { GridProps } from "@mui/material";
import React, { FC, ReactElement } from "react";
import { TloadingState } from "renderer/utils/dynStateHook";
import { Irectinfo } from "MithalCommonLibrary/formComponentsContainer";
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
 * 传入参数
 */
export interface IPublicInqueryItemprops {
    children: React.ReactElement | React.ReactElement[] | null | undefined;
    label?: string;
    name?: string | string[];
    formik?: any;
    selectItems?: {
        label: string;
        value: string;
    }[];
    comGridProps?: GridProps;
    dateFormat?: string;
    isMutipleSelections?: boolean;
    labelWidth?: number | string;
    isShow?: boolean;
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
export type Tinputprops = IPublicInqueryItemprops;
declare const PublicInqueryItem: FC<IPublicInqueryItemprops>;
export default PublicInqueryItem;
//# sourceMappingURL=index.d.ts.map