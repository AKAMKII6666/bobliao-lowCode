import React from "react";
import { CardProps, CardHeaderProps, CardContentProps } from "@mui/material";
import { KeyedObject } from "types";
export interface MainCardProps extends KeyedObject {
    /** 是否显示边框（默认 false） */
    border?: boolean;
    /** 是否启用悬浮阴影（默认 undefined） */
    boxShadow?: boolean;
    /** 子组件内容，通常为 JSX 结构 */
    children: React.ReactNode | string;
    /** 卡片整体样式对象 */
    style?: React.CSSProperties;
    /** 是否启用 CardContent 包裹内容（默认 true） */
    content?: boolean;
    /** 外层 Card 的 className */
    className?: string;
    /** 内容区域（CardContent）的 className */
    contentClass?: string;
    /** 内容区域（CardContent）的 sx 样式对象 */
    contentSX?: CardContentProps["sx"];
    /** 是否使用深色标题（加粗显示 h3），默认 false */
    darkTitle?: boolean;
    /** 最外层 Card 的 sx 样式对象 */
    sx?: CardProps["sx"];
    /** 卡片右上角操作区域，一般用于按钮、图标等 */
    secondary?: CardHeaderProps["action"];
    /** 自定义阴影样式，用于替代默认值 */
    shadow?: string | number;
    /** MUI Card 的 elevation（阴影层级），如设置此项可不使用 boxShadow */
    elevation?: number;
    /** 卡片标题，可以是字符串或 JSX 结构 */
    title?: React.ReactNode | string;
}
export type Tinputprops = MainCardProps;
declare const MainCard: React.ForwardRefExoticComponent<Omit<MainCardProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
export default MainCard;
//# sourceMappingURL=index.d.ts.map