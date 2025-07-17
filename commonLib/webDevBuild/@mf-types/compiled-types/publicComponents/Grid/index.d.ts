/**
 * 廖力编写
 * 模块名称：
 * 模块说明：
 * 编写时间：2025年6月25日 06:08:21
 */
import React, { FC } from "react";
import { GridProps } from "@mui/material/Grid";
/**
 * 传入参数
 */
export type IGridProps = GridProps & {
    children?: React.ReactNode | React.ReactNode[] | undefined | null;
};
export type Tinputprops = IGridProps;
declare const Grid: FC<IGridProps>;
export default Grid;
//# sourceMappingURL=index.d.ts.map