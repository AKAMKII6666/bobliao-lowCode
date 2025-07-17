/**
 * 廖力编写
 * 模块名称：
 * 模块说明：
 * 编写时间：2025年6月25日 06:08:21
 */
import React, { FC } from "react";
import { ButtonProps } from "@mui/material/Button";
/**
 * 传入参数
 */
export type IButtonProps = ButtonProps & {
    children?: React.ReactNode | React.ReactNode[] | undefined | null;
    text: string | null;
};
export type Tinputprops = IButtonProps;
declare const Button: FC<IButtonProps>;
export default Button;
//# sourceMappingURL=index.d.ts.map