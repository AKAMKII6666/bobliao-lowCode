/**
 * 廖力编写
 * 模块名称：泛用型查询条件栏容器
 * 模块说明：可通过配置将查询条件组件放置于此容器内，用于快速组织查询条件组件的数据绑定和布局
 * 编写时间：2025-05-07 11:03:31 星期三
 */
import { FC } from "react";
import { IPublicInqueryItemprops as PublicInqueryItemProp } from "MithalCommonLibrary/PublicInqueryItem";
import { useFormik } from "formik";
/**
 * 传入参数
 */
export interface IPublicInqueryContainerprops {
    items: PublicInqueryItemProp[];
    formik: ReturnType<typeof useFormik>;
    enabledFoldable?: boolean;
    foldShowCount?: number;
    defaultState?: "fold" | "unfold";
    onSubmitButtonClick?: () => void;
    onResetButtonClick?: () => void;
    labelWidth?: string | number;
    isHandleSubmit?: boolean;
    isHandleReset?: boolean;
    isCheckError?: boolean;
    throttlingTime?: number;
}
export type Tinputprops = IPublicInqueryContainerprops;
declare const PublicInqueryContainer: FC<IPublicInqueryContainerprops>;
export default PublicInqueryContainer;
//# sourceMappingURL=index.d.ts.map