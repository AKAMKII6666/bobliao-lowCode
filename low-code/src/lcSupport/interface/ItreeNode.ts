/**
 * 渲染树节点设计
 */

import { IAutoFormItemProps } from "MithalCommonLibrary/AutoForm";
import { ICommonInqueryitemprops } from "MithalCommonLibrary/CommonInquery";

/**
 * 节点类型
 * layout : 布局组件
 * component : 控件
 * temp : 临时节点，主要用于拖拽时的临时占位符
 */
export type TNodeType = "layout" | "component" | "temp";

/**
 * 组件类型 用于在拖拽时筛选可接受的容器用的标识符
 * 	nomoComponent 为普通控件
 * CommonInquery 也是普通组件，但是可以往里面放置 nomoComponent
 * AutoForm 为自动表单组件，也是普通组件，但是可以往里面放置 nomoComponent
	gridContainer 为布局外容器
	gridItem 为布局内容器
	pageRoot 为页面根节点
	CommonInquery 为通用查询组件
	AutoForm 为自动表单组件
*/
export type TComponentType =
	| "nomoComponent"
	| "CommonInquery"
	| "AutoForm"
	| "gridContainer"
	| "gridItem"
	| "pageRoot"
	| "MainCard"
	| "div"
	| "ul"
	| "li"
	| "span"
	| "label"
	| "input"
	| "Stack";
export type ICommonInqueryitempropsWithoutYup = Omit<ICommonInqueryitemprops, "yupObj">;
/**
 * 树节点
 */
export interface ITreeNode {
	//节点id
	nodeid: string;
	//组件名称
	name: string;
	//组件中文名称
	label: string;
	//组件自身配置
	props: any;
	//用于配置autoForm Item时的配置
	autoFormItemProps?: Partial<IAutoFormItemProps>;
	commonInqueryItemProps?: Partial<ICommonInqueryitempropsWithoutYup>;
	//节点类型
	//“layout”为布局组件
	//"component"为控件
	nodetype: TNodeType;
	//组件类型
	//用于在拖拽时筛选可接受的容器
	componentType: TComponentType;
	//可接受容器类型，用于在拖拽时筛选可接受的容器
	containerType: TComponentType[];
	//是否已经被安装到了渲染树里
	isTached: boolean;
	//子容器
	children?: ITreeNode[];
}
