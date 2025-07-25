/**
 * 廖力编写
 * 模块名称：
 * 模块说明：
 * 编写时间：
 */
import { SvgIconOwnProps } from "@mui/material";
import { FC } from "react";
import { IconKey } from "./IconKey";
/**
 * 传入参数
 */
export interface iIconprops {
    /**
        图标名称
    */
    iconName?: IconKey;
    /**
        图标的属性
    */
    iconOwnProps?: SvgIconOwnProps;
}
export type Tinputprops = iIconprops;
declare const Icon: FC<iIconprops>;
export default Icon;
//# sourceMappingURL=index.d.ts.map