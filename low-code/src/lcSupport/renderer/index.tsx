/**
 * 廖力编写
 * 模块名称：
 * 模块说明：
 * 编写时间：
 */

import React, { createContext, useState, useContext, useEffect, ReactElement, FC, useRef } from "react";
import useRenderTreeHook from "../renderTreeController/renderTreeHook";
import { ICommonInqueryitempropsWithoutYup, ITreeNode, TNodeType } from "../interface/ItreeNode";
import { ComponentNameMap } from "../lcsUtils";
import { coordXY, IchatItem, IcollectingItem, TEditorMode, TMouseAction, warpperDivObj } from "../interface/renderer";
import { Immer, produce } from "immer";
import { newGuid } from "MithalCommonLibrary/utils/utils";
import useJquery from "@bobliao/use-jquery-hook";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { IAutoFormItemProps, IAutoFormProps } from "MithalCommonLibrary/AutoForm";
import { ICommonInqueryprops } from "MithalCommonLibrary/CommonInquery";
import { MithrilAntdTableComponentProps } from "MithalCommonLibrary/MithrilAntdTable";
import ErrorBoundary from "../components/ErrorBoundary";
import useLocalStorage from "use-local-storage";
import useDebounce from "MithalCommonLibrary/utils/debounceHook";
import { compileStringAsync } from "sass";
import prettier from "prettier/standalone";
import parserScss from "prettier/plugins/postcss";
import { Api_generateLayout, Api_generateLayoutWithChatGPT } from "../ajax/bot";
import { jsonrepair } from "jsonrepair";

//定义勾子的返回类型
export type TRendererHookReturnType = ReturnType<typeof useRendererDataHook>;

/* 先定义勾子 */
export const useRendererDataHook = function () {
	//===============useHooks=================
	//scss编译防抖
	const debounce = useDebounce();
	//初始化渲染树
	const renderTreeObj = useRenderTreeHook({});
	const $ = useJquery();

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);
	/* 是否打开scss编辑器 */
	const [isopenScssEditorWindow, setisopenScssEditorWindow] = useState<boolean>(false);
	/**
	 * 当前收藏的节点列表
	 */
	const [collectedNodes, setcollectedNodes] = useLocalStorage<string>("_collectedNodes_", "[]");
	/* 当前scss编辑内容 */
	const [currentScssCode, setcurrentScssCode] = useLocalStorage<string>("_currentPageScssFile_", "");
	/* 当前需要注入到页面内的css内容(用于预览 ) */
	const [currentInjectCssContent, setcurrentInjectCssContent] = useState<string>("");

	/* 是否打开属性面板 */
	const [isOpenPropswindow, setisOpenPropswindow] = useState<boolean>(false);
	/* 被属性面板打开的节点路径 */
	const [settingPropsNodePath, setsettingPropsNodePath] = useState<number[]>([]);
	/* 被属性面板打开的节点的本体 */
	const [currentSettingNode, setcurrentSettingNode] = useState<ITreeNode | null>(null);

	/* 当前鼠标模式 */
	const [mouseMode, setMouseMode] = useState<TEditorMode>("layoutEdit");

	/* 当前鼠标动作 */
	const [mouseAction, setMouseAction] = useState<TMouseAction>("free");

	/* 鼠标移动事件响应时间戳 */
	const [mouseMoveStamp, setmouseMoveStamp] = useState<number>(-1);

	/* 拖拽开始前的位置 */
	const [dragBPosition, setdragBPosition] = useState<coordXY>({
		x: 0,
		y: 0,
	});

	/* 拖拽开始时的位置 */
	const [dragStartPosition, setdragStartPosition] = useState<coordXY>({
		x: 0,
		y: 0,
	});
	/* 拖拽结束时的位置 */
	const [dragEndPosition, setdragEndPosition] = useState<coordXY>({
		x: 0,
		y: 0,
	});

	/* 当前鼠标位置 */
	const [currentMousePosition, setcurrentMousePosition] = useState<coordXY>({
		x: 0,
		y: 0,
	});

	/* 节点渲染树查看 */
	const [tempNodeRendererTree, settempNodeRendererTree] = useState<string>("");
	/* 当前正在查看的节点路径 */
	const [currentWarchingNodePath, setcurrentWarchingNodePath] = useState<number[]>([]);
	/* 节点当前的css样式 */
	const [tempNodecssstyle, settempNodecssstyle] = useState<string>("");
	/* 是否打开节点渲染树查看 */
	const [isopenNoderenderertree, setisopenNoderenderertree] = useState<boolean>(false);

	/* 当前正在拖拽的节点 */
	const [currentDraggingNode, setcurrentDraggingNode] = useState<ITreeNode | null>(null);
	const [currentDraggingNodePath, setcurrentDraggingNodePath] = useState<number[] | null>(null);
	/* 当前正在拖拽节点的样式 */
	const [currentdraggingNodeClasses, setcurrentdraggingNodeClasses] = useState<string>("");

	/* 当前鼠标指向的放置节点 */
	const [currentDraggingTargetNodePath, setcurrentDraggingTargetNodePath] = useState<number[] | null>(null);

	/* 滚去的高度 */
	const [rContainerScrollTop, setrContainerScrollTop] = useState<number>(0);

	/* 鼠标是否进入了某个拖拽事件接受层 */
	const [isEnterWarpper, setisEnterWarpper] = useState<boolean>(false);

	/* 当前激发了菜单的warpper事件接受层 */
	const [currentMenuNodeObj, setcurrentMenuNodeObj] = useState<warpperDivObj | null>(null);

	/* 当前是否打开了Warpper的右键菜单 */
	const [isOpenWarpperRightMenu, setisOpenWarpperRightMenu] = useState<boolean>(false);

	/**
	 * warpperhoverStateUpdateStamp
	 * warpperhover状态更新指示
	 */
	const [warpperhoverStateUpdateStamp, setwarpperhoverStateUpdateStamp] = useState<Number>(-1);

	/* 是否打开了组件篮子 */
	const [isopenCollectedBucket, setisopenCollectedBucket] = useState<boolean>(false);
	/* 是否打开了收藏的组件篮子 */
	const [isopenBucket, setisopenBucket] = useState<boolean>(false);

	/* 是否打开了代码窗体 */
	const [isopenCodeWindow, setisopenCodeWindow] = useState<boolean>(false);

	/* antdtable的假数据 */
	const [listFakeData, setlistFakeData] = useState<any>([
		{
			code: 1,
			name: "示例名称",
			value: "200.00",
			area: "200",
			landType: "示例土地类型",
			statusTypeId: "示例利用现状类型",
			createByTime: "2020-01-01",
			lastContractor: "test",
		},
		{
			code: 2,
			name: "示例名称",
			value: "200.00",
			area: "200",
			landType: "示例土地类型",
			statusTypeId: "示例利用现状类型",
			createByTime: "2020-01-01",
			lastContractor: "test",
		},
		{
			code: 3,
			name: "示例名称",
			value: "200.00",
			area: "200",
			landType: "示例土地类型",
			statusTypeId: "示例利用现状类型",
			createByTime: "2020-01-01",
			lastContractor: "test",
		},
		{
			code: 4,
			name: "示例名称",
			value: "200.00",
			area: "200",
			landType: "示例土地类型",
			statusTypeId: "示例利用现状类型",
			createByTime: "2020-01-01",
			lastContractor: "test",
		},
	]);

	/* 是否正在生成内容（是否正在进行布局生成） */
	const [isGeneratingContent, setisGeneratingContent] = useState<boolean>(false);
	/* 正在生成的内容  */
	const [generatingContent, setgeneratingContent] = useState<string>("");
	const [userInput, setuserInput] = useState<string>("");
	/* 用户和机器人聊天的对话历史 */
	const [chatHistory, setchatHistory] = useLocalStorage<IchatItem[]>("_b_b_chatHistory_", []);

	//===============static===================
	/* scss编译时的隔离样式名 */
	const scssComplierStylesiclutionName = ".bobliao_lc_editor_main_content_root";

	//===============formik===================
	const fakeFormik = useFormik({
		initialValues: {
			yesNo_blank: "1",
			text_blank: "",
			number_blank: 0,
			selections_blank: [
				{
					label: "测试0",
					value: "0",
				},
				{
					label: "测试2",
					value: "1",
				},
			],
			selectionsValue_blank: "",
			timeStart_blank: "",
			timeEnd_blank: "",
			time_blank: "",
			numberStart_blank: "",
			numberEnd_blank: "",
		},
		onSubmit: () => {
			toast.success("formik:提交了表单!");
		},
	});

	/* 是否打开树列表（用于展示渲染树） */
	const [isopenTreeViewer, setisopenTreeViewer] = useState<boolean>(false);

	//===============ref======================
	//当鼠标放在warpper的事件div上时,或者右键选中该div时，或者抓起组件即将放下时，获得的节点路径链上的信息
	const warpperDivChainRef = useRef<warpperDivObj[]>([]);

	//鼠标位置
	const mousePositionRef = useRef<coordXY>({
		x: 0,
		y: 0,
	});

	/* 当前的生成布局的controller(用于中断操作 ) */
	const currentGenerateLayoutControllerRef = useRef<AbortController | null>(null);
	/* 当前的生成布局的请求id */
	const currentAIResponce = useRef<string>("");

	/* warpper的实时map key为nodepath的string格式 */
	const currentwarppersRef = useRef<{ [key: string]: warpperDivObj }>({});
	/* 当前的warpper的hover链 */
	const currentwarpperhoverChainRef = useRef<{ [key: string]: warpperDivObj }>({});

	//===============function=================

	/* 向渲染器注册warpper */
	const registerWarpper = function (path: number[], warpper: warpperDivObj) {
		currentwarppersRef.current[path.join("")] = warpper;
	};

	/* 向渲染器注销warpper */
	const unregisterWarpper = function (path: number[]) {
		delete currentwarppersRef.current[path.join("")];
	};

	/* 使用pathArray获取warpper */
	const getWarpperByPath = function (path: number[]): warpperDivObj | null {
		return currentwarppersRef.current[path.join("")];
	};

	/**传入一个pathArray，获取传入的pathArray的所有父节点 */
	const getParentWarpperNodes = function (path: number[]): warpperDivObj[] {
		let parentNodes: warpperDivObj[] = [];
		for (let i = 0; i < path.length; i++) {
			parentNodes.push(currentwarppersRef.current[path.slice(0, i).join("")]);
		}
		return parentNodes;
	};

	/**传入一个pathArray，获取传入的pathArray的所有父节点 */
	const genWarpperHoverChain = function (path: number[], nocurrent: boolean = false) {
		let warpperNodes: { [key: string]: warpperDivObj } = {};
		for (let i = 0; i < path.length; i++) {
			warpperNodes[path.slice(0, i).join("")] = currentwarppersRef.current[path.slice(0, i).join("")];
			delete warpperNodes[path.slice(0, i).join("")].isCurrent;
		}

		warpperNodes[path.join("")] = currentwarppersRef.current[path.join("")];

		/**
		 * nocurrent 为true时，不设置当前节点为当前节点
		 * 用于在鼠标进入节点时，不设置当前节点为当前节点
		 */
		if (!nocurrent) {
			warpperNodes[path.join("")].isCurrent = true;
		} else {
			warpperNodes[path.join("")].isCurrent = false;
		}
		currentwarpperhoverChainRef.current = warpperNodes;
		setwarpperhoverStateUpdateStamp(+new Date());
	};

	/**清除hover链 */
	const clearWarpperHoverChain = function () {
		currentwarpperhoverChainRef.current = {};
		setwarpperhoverStateUpdateStamp(+new Date());
	};

	/* 生成布局 */
	async function generateLayout(content: string, path: number[]) {
		currentAIResponce.current = "";
		setgeneratingContent("");
		setisGeneratingContent(true);
		setuserInput(content);
		setcurrentWarchingNodePath(path);
		/* 直接发送请求请求生成布局 */
		//let controller = await Api_generateLayout(
		let controller = await Api_generateLayoutWithChatGPT(
			content,
			(content) => {
				setgeneratingContent(content);
				currentAIResponce.current = content;
			},
			() => {
				setisGeneratingContent(false);
				completeGenerateLayout();
			}
		);
		currentGenerateLayoutControllerRef.current = controller;
	}

	/* 停止生成布局 */
	function stopGenerateLayout() {
		if (currentGenerateLayoutControllerRef.current) {
			currentGenerateLayoutControllerRef.current.abort();
			setisGeneratingContent(false);
		}
	}

	/* 完成布局生成 */
	function completeGenerateLayout() {
		let result = currentAIResponce.current.match(/\{[\s\S]*\}/);
		let jsonstr = jsonrepair(result ? result[0] : "");
		inputRenderertree(jsonstr);
	}

	function camelToKebab(str: string) {
		return str.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
	}

	function styleObjectToString(style: Record<string, string | number>) {
		return Object.entries(style)
			.map(([key, value]) => `${camelToKebab(key)}: ${value}`)
			.join("; ");
	}

	/**
	 *
	 * 编辑节点
	 */
	const editNodeProps = function (node: ITreeNode, path: number[]) {
		setisOpenPropswindow(true);
		setsettingPropsNodePath(path);
		setcurrentSettingNode(node);
	};

	/**
	 * 关闭编辑
	 */
	const closePropsEditor = function () {
		setisOpenPropswindow(false);
		setsettingPropsNodePath([]);
		setcurrentSettingNode(null);
	};

	/**
	 * 更换节点里的所有的id
	 */
	const changeNodeId = function (node: ITreeNode) {
		node.nodeid = newGuid();
		if (typeof node.children !== "undefined" && node.children !== null && node.children.length !== 0) {
			for (let item of node.children) {
				item = changeNodeId(item);
			}
		}
		return node;
	};

	/**
	 * 导入渲染树
	 * @param tree 导入的渲染树文本
	 */
	const inputRenderertree = async function (tree: string) {
		try {
			//将导入的树文本转换为对象
			let _tempTree = JSON.parse(tree);
			let node = changeNodeId(_tempTree.node);
			renderTreeObj.addNode(currentWarchingNodePath, node);
			if (_tempTree.classes) {
				setcurrentScssCode(await formatScssCode(currentScssCode + "  \n" + _tempTree.classes));
			}
			setisopenNoderenderertree(false);
			toast.success("渲染树导入成功！");
			genWarpperHoverChain(currentWarchingNodePath);
		} catch (e) {
			toast.error("渲染树导入失败，请检查输入的渲染树文本是否正确！");
			toast.error(e.message);
		}
	};

	//拖拽开始事件
	const onDragStart = function (node: ITreeNode, path: number[] | null, action?: "copy" | "collectedItemDrag", classes?: string): void {
		//如果是从收藏夹里拉出来的节点
		if (typeof action !== "undefined" && action === "collectedItemDrag") {
			let newNode = structuredClone(node);
			//将node里的所有的id都换掉
			node = changeNodeId(newNode);
			node.nodeid = "";
			node.isTached = false;
			setcurrentDraggingNode(newNode);
			setcurrentDraggingNodePath(null);
			setcurrentdraggingNodeClasses(classes);
		} else if (typeof action !== "undefined" && action === "copy") {
			let newNode = structuredClone(node);
			newNode.nodeid = "";
			newNode.isTached = false;
			setcurrentDraggingNode(newNode);
			setcurrentDraggingNodePath(null);
		} else {
			setcurrentDraggingNode(node);
			setcurrentDraggingNodePath(path);
			if (node.nodeid !== "" && node.nodetype === "layout") {
				//如果当前节点有nodeid，说明目前挂载在编辑器里，先把它移除掉
				renderTreeObj.deleteNode(path);
			}
		}
		setMouseAction("drag");
	};

	//拖拽进入事件
	const onDragEnter = function (path: number[]): void {
		// 设置当前拖拽目标节点路径
		setcurrentDraggingTargetNodePath(path);
		setisEnterWarpper(true);
	};

	//拖拽移出事件
	const onDragOut = function (): void {
		// 设置当前拖拽目标节点路径
		setcurrentDraggingTargetNodePath(null);
		setisEnterWarpper(false);
	};

	//拖拽结束
	const onDragEnd = function (fleg?: string, position?: coordXY): void {
		//如果是编辑，直接打开编辑窗口
		if (fleg === "edit") {
			setsettingPropsNodePath(currentDraggingNodePath);
			setcurrentSettingNode(currentDraggingNode);
			setisOpenPropswindow(true);
			setdragEndPosition({ ...position });
			setMouseAction("free");
			if (currentDraggingNode.nodetype !== "component") {
				//将节点放回原来的位置;
				renderTreeObj.insertNodeAt(currentDraggingNode, currentDraggingNodePath);
			}
			return;
		}

		//如果是删除，直接删除
		if (fleg === "delete") {
			if (currentDraggingNode.nodetype === "component") {
				renderTreeObj.deleteNode(currentDraggingNodePath);
			}
			setdragEndPosition({ ...position });
			setMouseAction("free");
			renderTreeObj.setsaveTreeCommandStamp(Date.now());
			return;
		}
		//操作模式
		/**
		 * addNode : 组件的添加
		 * insert : 布局组件的添加
		 * swap : 组件的交换
		 * moveLayout : 布局组件的位置移动
		 * moveCom : 组件的位置移动
		 * noset : 没有找到具体的操作方法
		 */
		var operationMode: "addNode" | "insert" | "swap" | "moveLayout" | "moveCom" | "noset" = "noset";

		if (currentDraggingTargetNodePath !== null) {
			let _currentDraggingTargetNodePath = Array.from(currentDraggingTargetNodePath);
			//处理组件的页面内的拖拽
			if (currentDraggingNodePath !== null && currentDraggingNode.nodetype === "component" && currentDraggingNode.nodeid !== "") {
				let _currentDraggingParentNodePath = Array.from(currentDraggingNodePath);
				let _currentDraggingTargetParentNodePath = Array.from(currentDraggingTargetNodePath);
				_currentDraggingParentNodePath.pop();
				_currentDraggingTargetParentNodePath.pop();
				let _currentDraggingParentNode = renderTreeObj.findNodeByPath(renderTreeObj.renderTree, _currentDraggingParentNodePath);

				let _currentDraggingTargetParentNode = renderTreeObj.findNodeByPath(renderTreeObj.renderTree, _currentDraggingTargetParentNodePath);
				let _currentDraggingTargettNode = renderTreeObj.findNodeByPath(renderTreeObj.renderTree, currentDraggingTargetNodePath);
				//如果目标本身就不存在，那么说明目标不是AutoForm / CommonInquery

				//如果当前是将autoform / CommonInquery中的组件拖到一样的autoform / CommonInquery的末尾
				if (
					_currentDraggingParentNodePath.join("") === _currentDraggingTargetParentNodePath.join("") &&
					(_currentDraggingTargetParentNode.name === "AutoForm" || _currentDraggingTargetParentNode.name === "CommonInquery") &&
					_currentDraggingTargettNode === null
				) {
					renderTreeObj.deleteNode(currentDraggingNodePath);
					operationMode = "addNode"; // 设置为添加模式
				}
				if (
					//
					_currentDraggingParentNodePath.join("") !== _currentDraggingTargetParentNodePath.join("") &&
					_currentDraggingTargetParentNode &&
					_currentDraggingTargetNodePath.join("") !== _currentDraggingParentNodePath.join("") &&
					(_currentDraggingTargetParentNode.name === "AutoForm" || _currentDraggingTargetParentNode.name === "CommonInquery") &&
					_currentDraggingTargettNode === null
				) {
					//如果当前拖拽的节点的父节点的id和当前目标节点不一致，
					// 而且当前拖拽节点的nodeid不为空，
					// 而且当前目标节点的类型为Autofrom，
					// 而且当前正在拖拽的组件类型为用户控件
					renderTreeObj.deleteNode(currentDraggingNodePath);
					operationMode = "addNode"; // 设置为添加模式
				}
			}
			if (currentDraggingNode.nodeid === "") {
				// 如果当前拖拽节点没有 nodeid，说明是新添加的节点
				operationMode = "addNode"; // 设置为添加模式
			}

			if (currentDraggingNode.nodeid !== "" && currentDraggingNode.nodetype === "layout") {
				// 如果当前拖拽节点是布局类型,且nodeid不为空，说明是移动操作
				operationMode = "moveLayout"; // 设置为移动模式
			}

			//如果当前目标节点是一个虚拟的插入节点，节点路径最后一位为浮点数,说明是需要插入,但要确保当前是新加节点不是移动
			if (
				(_currentDraggingTargetNodePath[_currentDraggingTargetNodePath.length - 1].toString().indexOf(".") !== -1 ||
					_currentDraggingTargetNodePath[_currentDraggingTargetNodePath.length - 1] === -1) &&
				currentDraggingNode.nodeid === ""
			) {
				operationMode = "insert"; // 如果是插入模式

				//如果以上三个判断都没进去过，而且当前拖拽组件的路径不是空（非新组件）那大概率也不是布局组件了，那就是控件的移动才做(可能是交换，或者是移动 )
			} else if (operationMode === "noset" && currentDraggingNodePath !== null) {
				let ___currentDraggingTargetNodePath = Array.from(_currentDraggingTargetNodePath);
				___currentDraggingTargetNodePath.pop();
				let targetContainer = renderTreeObj.findNodeByPath(renderTreeObj.renderTree, ___currentDraggingTargetNodePath);
				if (typeof targetContainer.children === "undefined" || targetContainer.children.length === 0) {
					operationMode = "moveCom";
				} else {
					operationMode = "swap";
				}
			}

			let _currentDraggingNode = produce(currentDraggingNode, (draft) => {
				if (draft.nodeid === "") {
					draft.nodeid = newGuid();
					draft.isTached = true;
				}
				return draft;
			});

			switch (operationMode) {
				case "addNode":
					_currentDraggingTargetNodePath.pop();
					// 如果是添加模式，直接添加到根节点
					renderTreeObj.addNode(_currentDraggingTargetNodePath, _currentDraggingNode);
					break;
				case "insert":
					if (_currentDraggingTargetNodePath[_currentDraggingTargetNodePath.length - 1] === -1) {
						_currentDraggingTargetNodePath[_currentDraggingTargetNodePath.length - 1] = 0;
					}
					// 如果是插入模式，插入到指定路径
					renderTreeObj.insertNodeAt(_currentDraggingNode, _currentDraggingTargetNodePath);
					break;
				case "moveLayout":
					if (_currentDraggingTargetNodePath[_currentDraggingTargetNodePath.length - 1] === -1) {
						_currentDraggingTargetNodePath[_currentDraggingTargetNodePath.length - 1] = 0;
					}

					//再将节点插入到指定位置
					renderTreeObj.insertNodeAt(_currentDraggingNode, _currentDraggingTargetNodePath);
					break;
				case "moveCom":
					let ___currentDraggingTargetNodePath = Array.from(_currentDraggingTargetNodePath);
					___currentDraggingTargetNodePath.pop();
					renderTreeObj.deleteNode(currentDraggingNodePath);
					//再将节点插入到指定位置
					renderTreeObj.addNode(___currentDraggingTargetNodePath, _currentDraggingNode);
					break;
				case "swap":
					// 如果是交换模式，交换当前拖拽节点和目标节点
					renderTreeObj.swapNodes(currentDraggingNodePath, _currentDraggingTargetNodePath);
					break;
			}
			setdragEndPosition({ x: currentMousePosition.x - 80, y: currentMousePosition.y - 80 });
			renderTreeObj.setsaveTreeCommandStamp(Date.now());
			//如果当前拖拽节点的样式不为空
			//就将样式置入到当前样式表里去
			if (currentdraggingNodeClasses !== "") {
				(async function () {
					let classes = currentdraggingNodeClasses;
					let _currentScssCode = currentScssCode;
					setcurrentScssCode(await formatScssCode(_currentScssCode + "  \n" + classes));
					setcurrentdraggingNodeClasses("");
					toast.success("收藏的节点已放置到页面上，连同收藏的css代码也被放置在了当前页面的scss中，请确认样式名是否需要更新！");
				})();
			}
		} else {
			//没有插入，将节点放回原来的位置
			setdragEndPosition({ ...dragBPosition });
			if (currentDraggingNode.nodeid !== "" && currentDraggingNode.nodetype === "layout") {
				renderTreeObj.insertNodeAt(currentDraggingNode, currentDraggingNodePath);
			}
		}
		setMouseAction("free");
	};

	/* 
		临时属性处理器
		用于在生成组件时，临时给组件绑定一些临时属性用的处理器
		但是这些属性并不保存至组件树里去,只是在渲染时临时添加进去
		当再次重新渲染时还会再次过一遍这里的逻辑
	 */
	const getNodeTempProps = function (node: ITreeNode, isForEditor?: boolean, handleFunction?: (node: ITreeNode, name: string) => any) {
		let newProps: any = null;
		//如果不是给编辑器的渲染方式
		//那就填充默认可用的参数即可
		if (typeof isForEditor === "undefined" || isForEditor === false) {
			if (node.nodetype === "layout" && node.name === "AutoForm") {
				let cProps: IAutoFormProps = structuredClone(node.props) as IAutoFormProps;
				cProps.formik = fakeFormik;
				/* 给autoForm转换组件列表 */
				cProps.items = (function () {
					let autoformItems: IAutoFormItemProps[] = [];
					if (node.children.length !== 0) {
						/* 处理每个子组件 */
						for (let item of node.children) {
							//给每个子组件填充autoform的项目的属性
							let resitem: any = {
								...{
									//组件类型
									comType: item.name as any,
									//显示标题
									label: item.label,
									//组件自身自己的属性
									comProps: item.props,
								},
								//填充其它autoform的子项目的属性
								...item.autoFormItemProps,
							};

							autoformItems.push(resitem);
						}
					}
					return autoformItems;
				})();
				newProps = cProps;
			}
			if (node.nodetype === "layout" && node.name === "CommonInquery") {
				let cProps: ICommonInqueryprops = structuredClone(node.props) as ICommonInqueryprops;
				cProps.onSubmit = function () {
					toast.success("点击了提交!");
				};
				cProps.onReset = function () {
					toast.success("点击了重设!");
				};
				/* 给CommonInquery转换组件列表 */
				cProps.items = (function () {
					let commonInqueryItems: ICommonInqueryitempropsWithoutYup[] = [];
					if (node.children.length !== 0) {
						/* 处理每个子组件 */
						for (let item of node.children) {
							//给每个子组件填充commonInquery的项目的属性
							let resitem: any = {
								...{
									//组件类型
									comType: item.name as any,
									//显示标题
									label: item.label,
									//组件自身自己的属性
									comProps: item.props,
								},
								//填充其它commonInquery的子项目的属性
								...item.commonInqueryItemProps,
							};

							commonInqueryItems.push(resitem);
						}
					}
					return commonInqueryItems;
				})();
				newProps = cProps;
			}
		} else {
			//否则给编辑器做一些特殊处理处理
			newProps = handleFunction(node, node.name);
		}

		if (node.nodetype === "component" && node.name === "MithrilAntdTable") {
			let cProps: MithrilAntdTableComponentProps = structuredClone(node.props) as MithrilAntdTableComponentProps;
			cProps.dataSource = listFakeData;
			cProps.rowKey = (record: any) => record.code;
			newProps = cProps;
		}

		if (newProps === null) {
			return node.props;
		}
		return newProps;
	};

	//渲染编辑器的可视元素
	const renderEditorElements = function (root: ITreeNode): ReactElement {
		// 每一项：当前节点 + 用于挂载其 element 的父级 children 数组
		const stack: {
			node: ITreeNode;
			parentChildren: ReactElement[];
		}[] = [];

		// 用于承接最终返回的 React 树
		const resultElementContainer: ReactElement[] = [];

		// 初始化压栈，根节点挂到 resultElementContainer 上
		stack.push({
			node: root,
			parentChildren: resultElementContainer,
		});

		while (stack.length > 0) {
			const { node, parentChildren } = stack.pop()!;

			// 准备挂载子元素的容器
			let childrenElements: ReactElement[] | null = [];

			if (typeof node.children === "undefined") {
				childrenElements = null;
			}

			// 创建当前节点对应的 ReactElement
			const Component = ComponentNameMap[node.name] || "div";
			const element = (
				<ErrorBoundary renderStamp={renderTreeObj.updaterenderTreeStamp}>
					{React.createElement(Component, { key: node.nodeid, ...getNodeTempProps(node) }, childrenElements)}
				</ErrorBoundary>
			);

			// 挂到父级的 children 中
			parentChildren.push(element);

			// 如果当前节点有子节点，把它们压栈，挂到 childrenElements 上
			if (node.children && node.children.length > 0) {
				for (let i = node.children.length - 1; i >= 0; i--) {
					stack.push({
						node: node.children[i],
						parentChildren: childrenElements,
					});
				}
			}
		}

		// 返回根节点（resultElementContainer 只包含一个元素）
		return resultElementContainer[0];
	};

	/**
	 * 获得样式
	 * @param classNames
	 * @returns
	 */
	const getClassValue = function (classNames: string[]): string {
		const result: string[] = [];

		// 遍历所有样式表
		for (const sheet of (document as any).styleSheets) {
			let rules: CSSRuleList;

			try {
				rules = sheet.cssRules;
			} catch (e) {
				// 避免跨域或 blob 类型样式表报错
				continue;
			}

			for (const rule of rules as any) {
				if (rule.type === CSSRule.STYLE_RULE) {
					const selector = (rule as CSSStyleRule).selectorText;

					// 检查是否匹配我们关心的类名
					for (const cls of classNames) {
						if (selector.includes(`.${cls}`)) {
							result.push(rule.cssText);
						}
					}
				}
			}
		}

		return result.join("\n");
	};

	/* 查看已经收藏的节点的渲染树 */
	const watchCollectedNode = async function (item: IcollectingItem) {
		settempNodeRendererTree(JSON.stringify(item.node, null, 4));
		settempNodecssstyle(await formatScssCode(item.classes));
		setisopenNoderenderertree(true);
	};

	/* 查看任意节点的渲染树 */
	const watchNode = async function (path: number[]) {
		//找到当前节点
		let node = structuredClone(renderTreeObj.findNodeByPath(renderTreeObj.renderTree, path));
		let classNameArr = [];
		let findClasses = function (node: ITreeNode) {
			if (typeof node.props.className !== "undefined") {
				classNameArr.push(node.props.className);
			}
			if (typeof node.children !== "undefined" && node.children !== null && node.children.length !== 0) {
				for (let item of node.children) {
					findClasses(item);
				}
			}
		};
		findClasses(node);
		//找到属于这些结构所有的css代码
		let css = getClassValue(classNameArr);
		//将隔离样式名去掉
		css = css.replace(new RegExp(`\\${scssComplierStylesiclutionName}`, "g"), "");

		settempNodeRendererTree(JSON.stringify(node, null, 4));
		settempNodecssstyle(await formatScssCode(css));
		setisopenNoderenderertree(true);
		setcurrentWarchingNodePath([...path]);
	};

	/**
	 * 收藏节点
	 */
	const collectNode = async function (path: number[], name: string) {
		//找到当前节点
		let node = structuredClone(renderTreeObj.findNodeByPath(renderTreeObj.renderTree, path));
		let classNameArr = [];
		let findClasses = function (node: ITreeNode) {
			if (typeof node.props.className !== "undefined") {
				classNameArr.push(node.props.className);
			}
			if (typeof node.children !== "undefined" && node.children !== null && node.children.length !== 0) {
				for (let item of node.children) {
					findClasses(item);
				}
			}
		};
		findClasses(node);
		//找到属于这些结构所有的css代码
		let css = getClassValue(classNameArr);
		//将隔离样式名去掉
		css = css.replace(new RegExp(`\\${scssComplierStylesiclutionName}`, "g"), "");
		let _collectedNodes: IcollectingItem[] = (await new Promise(function (_res) {
			setcollectedNodes(function (_v) {
				_res(JSON.parse(_v));
				return _v;
			});
		})) as IcollectingItem[];
		/* 查下重 */
		for (let citem of _collectedNodes) {
			if (citem.node.label === name) {
				toast.error(`名称${name}已经存在，请重新命名！`);
				return false;
			}
		}
		node.label = name;
		_collectedNodes.unshift({
			node: node,
			classes: css,
		});

		setcollectedNodes(JSON.stringify(_collectedNodes));
		toast.success(`节点收藏成功!`);
		return true;
	};

	/* 删除收藏的节点 */
	const deleteCollectedNode = async function (node: ITreeNode) {
		let _collectedNodes: IcollectingItem[] = (await new Promise(function (_res) {
			setcollectedNodes(function (_v) {
				_res(JSON.parse(_v));
				return _v;
			});
		})) as IcollectingItem[];
		let new_collectedNodes = [];
		for (let citem of _collectedNodes) {
			if (citem.node.label !== node.label) {
				new_collectedNodes.push(citem);
			}
		}
		setcollectedNodes(JSON.stringify(new_collectedNodes));
	};

	/* 全局快捷键处理器 */
	const globalSnapshotHandler = (e: KeyboardEvent) => {
		if ((e.metaKey || e.ctrlKey) && e.key === "s") {
			toast.success("保存完成！");
			renderTreeObj.emitAndSaveTree();
			e.preventDefault();
		}

		if ((e.metaKey || e.ctrlKey) && e.key === "z") {
			toast.success("已经还原!");
			renderTreeObj.undo();
			e.preventDefault();
		}
		if ((e.metaKey || e.ctrlKey) && e.key === "y") {
			toast.success("已经重做!");
			renderTreeObj.redo();
			e.preventDefault();
		}
		if ((e.metaKey || e.ctrlKey) && e.key === "1") {
			setMouseMode("none");
			toast.success(`已切换为预览模式!`);
			e.preventDefault();
		}
		if ((e.metaKey || e.ctrlKey) && e.key === "2") {
			setMouseMode("layoutEdit");
			toast.success(`已切换为布局编辑模式!`);
			e.preventDefault();
		}
		if ((e.metaKey || e.ctrlKey) && e.key === "3") {
			setMouseMode("componentEdit");
			toast.success(`已切换为用户控件编辑模式!`);
			e.preventDefault();
		}
		if ((e.metaKey || (e.ctrlKey && e.altKey)) && e.key === "s") {
			setisopenScssEditorWindow(true);
			toast.success(`已经打开Scss编辑器`);
			e.preventDefault();
		}
		if ((e.metaKey || (e.ctrlKey && e.altKey)) && e.key === "c") {
			setisopenCodeWindow(true);
			toast.success(`已经打开代码生成面板`);
			e.preventDefault();
		}
		if ((e.metaKey || (e.ctrlKey && e.altKey)) && e.key === "i") {
			setisopenBucket(true);
			toast.success(`已经打开组件/控件列表`);
			e.preventDefault();
		}
	};
	const regestMouseMoveEvent = function (_e) {
		let xy: coordXY = {
			x: _e.clientX,
			y: _e.clientY,
		};

		mousePositionRef.current = xy;
		setmouseMoveStamp(+new Date());
	};

	const getCurrentMousePosition = function () {
		//在预览模式下停止鼠标的状态更新
		if (mouseMode !== "none") {
			setcurrentMousePosition(mousePositionRef.current);
		}
	};

	const scsscompile = function () {
		compileStringAsync(`${scssComplierStylesiclutionName}{
				${currentScssCode}
			}`)
			.then((result) => {
				setcurrentInjectCssContent(result.css);
			})
			.catch(function (_e) {
				toast.error("SCSS编译错误:", _e.message);
			});
	};

	/**
	 * 格式化 scss 代码
	 */
	const formatScssCode = async (code: string): Promise<string> => {
		return prettier.format(code, {
			parser: "scss", // ✅ 关键点！
			plugins: [parserScss],
		});
	};

	//===============effects==================
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted === false) {
				setIsMounted(true);
				$(window).bind("mousemove", regestMouseMoveEvent);
				window.addEventListener("keydown", globalSnapshotHandler);
			}
		},
		[isMounted]
	);

	useEffect(function (): ReturnType<React.EffectCallback> {
		return function (): void {
			setIsMounted(false);
			$(window).unbind("mousemove", regestMouseMoveEvent);
			window.removeEventListener("keydown", globalSnapshotHandler);
		};
	}, []);

	//每次树更新就重设一下warpperDivChainRef
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			warpperDivChainRef.current = [];
		},
		[renderTreeObj.updaterenderTreeStamp]
	);

	//
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			getCurrentMousePosition();
		},
		[mouseMoveStamp]
	);

	//
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted) {
				debounce(scsscompile, 2000);
			}
		},
		[currentScssCode, isMounted]
	);
	return {
		//是否挂载
		isMounted,
		//渲染树对象
		renderTreeObj,
		//渲染编辑器的可视元素
		renderEditorElements,
		//当前鼠标模式
		mouseMode,
		//设置当前鼠标模式
		setMouseMode,
		//当前鼠标动作
		mouseAction,
		//设置当前鼠标动作
		setMouseAction,
		//当前正在拖拽的节点
		currentDraggingNode,
		//设置当前正在拖拽的节点
		setcurrentDraggingNode,
		//拖拽开始事件
		onDragStart,
		//拖拽进入事件
		onDragEnter,
		//拖拽移出事件
		onDragOut,
		//拖拽结束
		onDragEnd,
		//当前鼠标位置
		currentMousePosition,
		//拖放开始前的位置
		dragBPosition,
		setdragBPosition,
		//拖拽开始的位置
		dragStartPosition,
		setdragStartPosition,
		//拖拽结束的位置
		dragEndPosition,
		setdragEndPosition,
		//滚去的高度
		rContainerScrollTop,
		setrContainerScrollTop,
		//当前鼠标指向的目标节点
		currentDraggingTargetNodePath,
		//warpperhover更新状态指示
		warpperhoverStateUpdateStamp,
		setwarpperhoverStateUpdateStamp,
		//鼠标是否进入了某个事件接受层
		isEnterWarpper,
		setisEnterWarpper,
		//当前路径链
		warpperDivChainRef,
		/* 当前激发了菜单的warpper事件接受层 */
		currentMenuNodeObj,
		setcurrentMenuNodeObj,
		/* 当前是否打开了Warpper的右键菜单 */
		isOpenWarpperRightMenu,
		setisOpenWarpperRightMenu,
		/* 用于布局时临时绑定数据用的formik */
		fakeFormik,
		/* 临时属性处理器 */
		getNodeTempProps,
		//是否打开组件栏
		isopenBucket,
		setisopenBucket,
		/* antdTable的假数据 */
		listFakeData,
		setlistFakeData,
		/* 是否打开了代码生成窗体 */
		isopenCodeWindow,
		setisopenCodeWindow,
		/* 是否打开属性面板 */
		isOpenPropswindow,
		setisOpenPropswindow,
		/* 被属性面板打开的节点路径 */
		settingPropsNodePath,
		setsettingPropsNodePath,
		/* 被属性面板打开的节点的本体 */
		currentSettingNode,
		setcurrentSettingNode,
		/* 编辑节点 */
		editNodeProps,
		/* 关闭属性编辑 */
		closePropsEditor,
		/* 是否打开scss编辑器 */
		isopenScssEditorWindow,
		setisopenScssEditorWindow,
		/* 当前scss编辑内容 */
		currentScssCode,
		setcurrentScssCode,
		/* 当前需要注入到页面内的css内容(用于预览 ) */
		currentInjectCssContent,
		setcurrentInjectCssContent,
		styleObjectToString,
		formatScssCode,
		/* 收藏节点 */
		collectNode,
		/* 收藏节点列表 */
		collectedNodes,
		/* 收藏的组件篮子 */
		isopenCollectedBucket,
		setisopenCollectedBucket,
		/* 删除收藏的组件 */
		deleteCollectedNode,
		/* 节点渲染树查看 */
		tempNodeRendererTree,
		settempNodeRendererTree,
		/* 节点当前的css样式 */
		tempNodecssstyle,
		settempNodecssstyle,
		/* 查看已经收藏的节点的渲染树 */
		watchCollectedNode,
		/* 查看任意节点的渲染树 */
		watchNode,
		/* 渲染树窗口 */
		isopenNoderenderertree,
		setisopenNoderenderertree,
		/* 当前正在查看的节点路径 */
		currentWarchingNodePath,
		setcurrentWarchingNodePath,
		/* 导入渲染树 */
		inputRenderertree,
		/* 生成布局 */
		generateLayout,
		/* 停止生成布局 */
		stopGenerateLayout,
		/* 用户输入 */
		userInput,
		/* 是否正在生成布局 */
		isGeneratingContent,
		/* 设置是否正在生成布局 */
		setisGeneratingContent,
		/* 正在生成的内容 */
		generatingContent,
		/* 设置正在生成的内容 */
		setgeneratingContent,
		/* 是否打开树列表 */
		isopenTreeViewer,
		setisopenTreeViewer,
		/* 注册warpper */
		registerWarpper,
		/* 注销warpper */
		unregisterWarpper,
		/* 获取warpper */
		getWarpperByPath,
		/* 生成warpper的hover链 */
		genWarpperHoverChain,
		/* 清除warpper的hover链 */
		clearWarpperHoverChain,
		/* 当前的warpper的hover链 */
		currentwarpperhoverChainRef,
		/* 获取warpper的父节点 */
		getParentWarpperNodes,
	};
};

/**
 * 创建一个需要全局使用的context
 **/
export const RendererDataContext = createContext<TRendererHookReturnType>({} as unknown as TRendererHookReturnType);

/**
 * 给子节点使用的context
 * @returns
 */
export const useRendererDataContext = function (): TRendererHookReturnType {
	return useContext(RendererDataContext);
};

/**
 * 传入参数
 */
export interface IRendererDataProviderProps {
	children: ReactElement | ReactElement[] | undefined | null;
}

/**
 * 数据提供器
 */
const DARendererDataProviderLayout: FC<IRendererDataProviderProps> = ({ children }, _ref): ReactElement => {
	//===============useHooks=================
	let RendererData = useRendererDataHook();

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);

	//===============static===================

	//===============ref======================

	//===============function=================

	//===============effects==================
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted === false) {
				setIsMounted(true);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[isMounted]
	);

	useEffect(function (): ReturnType<React.EffectCallback> {
		return function (): void {
			setIsMounted(false);
		};
	}, []);

	return (
		<>
			<RendererDataContext.Provider value={RendererData}>{children}</RendererDataContext.Provider>
		</>
	);
};
export default DARendererDataProviderLayout;
