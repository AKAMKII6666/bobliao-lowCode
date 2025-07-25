/**
 * 廖力编写
 * 模块名称：
 * 模块说明：
 * 编写时间：
 */
import React, { FC } from "react";
import type { EChartsOption } from "react-echarts-core";
/**
 * 传入参数
 */
export type ISpecialEchartsprops = {
    /**
     * echarts图表的属性
     */
    echartProps?: EChartsOption & {};
    /**
     * div容器的属性
     */
    containerProps?: React.HTMLAttributes<HTMLDivElement>;
};
export type Tinputprops = ISpecialEchartsprops;
declare const SpecialEcharts: FC<ISpecialEchartsprops>;
export default SpecialEcharts;
//# sourceMappingURL=index.d.ts.map