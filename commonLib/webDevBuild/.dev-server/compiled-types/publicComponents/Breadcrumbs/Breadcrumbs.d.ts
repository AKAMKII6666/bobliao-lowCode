import { CSSProperties, ReactElement } from "react";
import { OverrideIcon } from "types";
interface BreadcrumbLinkProps {
    title: string;
    to?: string;
    icon?: string | OverrideIcon;
}
export interface BreadCrumbSxProps extends CSSProperties {
    mb?: string;
    bgcolor?: string;
}
/**
 * 面包屑导航组件的参数定义
 */
interface Props {
    /** 是否使用 Card 包裹面包屑（默认开启） */
    card?: boolean;
    /** 是否启用自定义模式（启用后读取 links 参数渲染路径） */
    custom?: boolean;
    /** 是否显示底部分隔线（默认 false） */
    divider?: boolean;
    /** 自定义模式下的标题（custom=true 时使用） */
    heading?: string;
    /** 是否显示首页图标（默认 true） */
    icon?: boolean;
    /** 是否为每个路径项显示图标（如菜单图标等） */
    icons?: boolean;
    /** 自定义面包屑路径数组，仅 custom=true 时生效 */
    links?: BreadcrumbLinkProps[];
    /** 最多展示的面包屑项数，超出后会折叠为省略号 */
    maxItems?: number;
    /** 是否右对齐面包屑和标题（默认 true） */
    rightAlign?: boolean;
    /** 自定义分隔符图标（默认使用 IconChevronRight） */
    separator?: OverrideIcon;
    /** 是否显示标题（页面主标题） */
    title?: boolean;
    /** 是否将标题显示在面包屑下方（默认上方） */
    titleBottom?: boolean;
    /** 自定义整体 sx 样式对象，支持 MUI 的 sx 写法 */
    sx?: BreadCrumbSxProps;
    /** 是否固定在顶部（开启后使用 fixed 定位吸顶） */
    fixedTop?: boolean;
    /** 用于从 localStorage 中读取菜单树数据的 key 名 */
    menuStroageName: string;
}
export type Tinputprops = Props;
declare const Breadcrumbs: ({ card, custom, divider, heading, icon, icons, links, maxItems, rightAlign, separator, title, titleBottom, sx, fixedTop, menuStroageName, ...others }: Props) => ReactElement<unknown, string | import("react").JSXElementConstructor<any>>;
export default Breadcrumbs;
//# sourceMappingURL=Breadcrumbs.d.ts.map