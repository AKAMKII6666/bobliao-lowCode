/**
 * 廖力编写
 * 模块名称：
 * 模块说明：
 * 编写时间：2025年6月25日 06:08:21
 */
import React, { FC } from "react";
import { StackProps } from "@mui/material/Stack";
/**
 * 传入参数
 */
export type IStackProps = StackProps & {
    children?: React.ReactNode | React.ReactNode[] | undefined | null;
};
export type Tinputprops = IStackProps;
declare const Stack: FC<IStackProps>;
export default Stack;
//# sourceMappingURL=index.d.ts.map