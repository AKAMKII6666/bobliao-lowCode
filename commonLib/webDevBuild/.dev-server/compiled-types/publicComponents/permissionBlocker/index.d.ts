/**
 * 廖力编写
 * 模块名称：权限围栏
 * 模块说明：如果没有相应权限将不会渲染目标组件
 * 编写时间：2025年9月28日 20:13:19
 */
import { FC, ReactElement } from "react";
/**
 * 传入参数
 */
export interface IPBlockerProps {
    fallback?: ReactElement;
    apiUrl?: string | string[];
    children?: ReactElement;
}
declare const PBlocker: FC<IPBlockerProps>;
export default PBlocker;
//# sourceMappingURL=index.d.ts.map