/**
 * 廖力编写
 * 模块名称：
 * 模块说明：
 * 编写时间：
 */
import React, { FC } from "react";
import { ButtonProps } from "@mui/material/Button";
import { iIconprops } from "MithalCommonLibrary/Icon";
/**
 * 传入参数
 */
export interface iIconButtonprops {
    /**
     * 图标的配置
     */
    iconProp: iIconprops;
    /**
     *
     *按钮的配置
     */
    buttonProps: ButtonProps & {
        children?: React.ReactNode | React.ReactNode[] | undefined | null;
        text?: string | null;
    };
}
export type Tinputprops = iIconButtonprops;
declare const IconButton: FC<iIconButtonprops>;
export default IconButton;
//# sourceMappingURL=index.d.ts.map