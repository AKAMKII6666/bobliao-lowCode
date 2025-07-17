/**
 * 廖力编写
 * 模块名称：可折叠的查询框容器
 * 模块说明：
 * 编写时间：
 */
import { FC, ReactElement } from "react";
/**
 * 传入参数
 */
export interface iprops {
    foldContent: ReactElement | ReactElement[] | undefined | null;
    unfoldContent: ReactElement | ReactElement[] | undefined | null;
    opreateButtons: ReactElement | ReactElement[] | undefined | null;
    defaultState?: "fold" | "unfold";
    enabled?: boolean;
}
export type Tinputprops = iprops;
declare const FoldableInqueryContainer: FC<iprops>;
export default FoldableInqueryContainer;
//# sourceMappingURL=index.d.ts.map