import { ITreeNode } from "./ItreeNode";

//当前鼠标的编辑模式
export type TEditorMode = "componentEdit" | "layoutEdit" | "propsEdit" | "none";

//当前鼠标动作
export type TMouseAction = "drag" | "free";

//坐标点
export interface coordXY {
	x: number;
	y: number;
}

//菜单的warpper事件接受层
export interface warpperDivObj {
	//事件接受层
	wrapperDivRef: HTMLDivElement;
	//事件接受层的标题
	wrapperTitleRef: HTMLDivElement;
	//当前节点路径
	currentNodePath: number[];
	//当前节点的位置
	levelIndex: number;
	//是否为当前节点
	isCurrent?: boolean;
}

//定义收藏结构体
export interface IcollectingItem {
	node: ITreeNode;
	classes: string;
}

/* 用户和机器人聊天的对话项 */
export interface IchatItem {
	/* 用户发言 */
	user: string;
	/* 机器人回复 */
	robot: string;
	/* 发言时间 */
	date: number;
}
