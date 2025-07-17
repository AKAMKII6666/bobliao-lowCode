/**
 * 廖力编写
 * 模块名称：Antd连体时间范围组件
 * 模块说明：连体的时间范围组件
 * 编写时间：
 */
import { SxProps } from "@mui/material";
import type { Theme } from "@emotion/react";
import React from "react";
/**
 * 传入参数
 */
export interface IAntdDateRangePackerProps {
    onChange?: (start: number, end: number) => void;
    className?: string;
    label?: string;
    labelWidth?: string | number;
    format?: string;
    showHelperText?: boolean;
    showTime?: boolean;
    startVal?: string;
    endVal?: string;
    defaultValue?: Array<any>;
    sx?: SxProps<Theme>;
    datePickerSx?: SxProps<Theme>;
    style?: SxProps<Theme>;
    leftSx?: SxProps<Theme>;
    limitScope?: {
        enabled?: boolean;
        monthScope?: number;
    };
    value?: Array<any>;
    allowClear?: boolean;
    enabled?: boolean;
    needConfirm?: boolean;
}
export type TAntdDateRangePackerRef = {
    reset: () => void;
    resetToDate: (start: any, end: any) => void;
};
export type Tinputprops = IAntdDateRangePackerProps;
declare const AntdDateRangePacker: React.ForwardRefExoticComponent<IAntdDateRangePackerProps & React.RefAttributes<TAntdDateRangePackerRef>>;
export default AntdDateRangePacker;
//# sourceMappingURL=index.d.ts.map