/**
 * 廖力编写
 * 模块名称：用于管理渲染树状态的hook
 * 模块说明：管理渲染树节点的增加/删除/修改/替换
 * 编写时间：2025年6月23日 11:55:49
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import { ICommonInqueryitempropsWithoutYup, ITreeNode, TComponentType, TNodeType } from "../interface/ItreeNode";
import { produce } from "immer";
import { IAutoFormItemProps, IAutoFormProps } from "MithalCommonLibrary/AutoForm";
import { ICommonInqueryprops } from "MithalCommonLibrary/CommonInquery";
import prettier from "prettier/standalone";
import parserTypescript from "prettier/plugins/typescript";
import parserEstree from "prettier/plugins/estree";
import useDebounce from "MithalCommonLibrary/utils/debounceAdv2Hook";
import useLocalStorage from "use-local-storage";
import dayjs from "dayjs";
import { importStringMap } from "../lcsUtils";

const defaultRtreeNode: ITreeNode = {
	nodeid: "PageRoot",
	name: "PageRoot",
	label: "页面根节点",
	props: {
		style: {
			minHeight: "600px",
			padding: "1px",
		},
	},
	nodetype: "layout",
	componentType: "pageRoot",
	containerType: [],
	isTached: false,
	children: [],
};
/**
 * 传入参数
 */
export interface IuseRenderTreeHookProps {
	defaultTree?: ITreeNode | null;
}

const useRenderTreeHook = ({ defaultTree }: IuseRenderTreeHookProps) => {
	//===============useHooks=================

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);

	const saveDebounce = useDebounce();

	/**
	 * 历史记录数组
	 * 用于保存树操作的历史记录
	 * 每次操作savetree的更新都会将当前的savetree树状态保存到这个数组中
	 * 方便日后做类似于ctrl+z的撤销操作
	 */
	const [history, setHistory] = useState<ITreeNode[]>([]);
	const [redoStack, setRedoStack] = useState<ITreeNode[]>([]);

	/**
	 * 确认要进行保存时提交更新到这个树上
	 * 可以裂解为，每次完成一个成功的操作，都会把当前的渲染树保存到这个树上
	 * 这个树会在保存时提交到后端或者本地
	 */
	const [savetree, setsavetree] = useLocalStorage<ITreeNode>("_tempSavetree_", { ...defaultRtreeNode });

	/**
	 *  当前用来做操作、更新展示使用的树
	 * 比如当用户拖拽一个组件到页面时，将会显示一些临时组件，
	 * 例如事件接受层什么的，都会往这里面更新
	 */
	const [renderTree, setrenderTree] = useState<ITreeNode>({ ...defaultRtreeNode });

	/**
	 *	确认向savetree更新数据的时间戳，
	 *	每次向savetree提交一次新数据就更新这里的值
	 */
	const [updatesavetreeStamp, setupdatesavetreeStamp] = useState<number>(-1);

	/**
	 *	确认向renderTree更新数据的时间戳，
	 *	每次向renderTree提交一次新数据就更新这里的值
	 */
	const [updaterenderTreeStamp, setupdaterenderTreeStamp] = useState<number>(-1);

	/* saveemit的stamp */
	const [saveTreeCommandStamp, setsaveTreeCommandStamp] = useState<number>(-1);

	//===============static===================

	/**
	 * 历史记录最大长度
	 */
	const historyMaxCount = 50;

	//===============ref======================
	/* 生成代码时的组件引用字符串列表 */
	const genCodeDepsStringRef = useRef<any>({});

	//===============function=================
	//如果有外部传进来的默认树，则加载它
	const loadDefaultTree = function () {
		if (defaultTree !== null && defaultTree !== undefined) {
			setrenderTree(defaultTree);
			setsavetree(defaultTree);
		} else if (savetree !== null && savetree !== undefined) {
			setrenderTree({ ...savetree });
		}
		setupdaterenderTreeStamp(Date.now());
	};

	/**
	 * 使用pathArray 查找节点
	 * @param pathArray
	 * @returns ITreeNode | null
	 */
	const findNodeByPath = function (tree: ITreeNode, pathArray: number[]): ITreeNode | null {
		let currentNode: ITreeNode | null = tree;
		for (let pathItem of pathArray) {
			currentNode = currentNode.children[pathItem];
		}
		if (typeof currentNode !== "undefined") {
			return currentNode;
		}
		return null;
	};

	/* 获得最新的trenderTree */
	const getNewestrenderTree = async function (): Promise<ITreeNode> {
		return new Promise(function (_res) {
			setrenderTree(function (val) {
				_res(val);
				return val;
			});
		});
	};

	/**
	 * 使用 nodeid 查找某节点的路径数组
	 * @param nodeid
	 * @returns number[] | null
	 */
	const findPathByNodeid = function (nodeid: string): number[] | null {
		const findPath = function (node: ITreeNode, targetId: string, path: number[]): number[] | null {
			if (node.nodeid === targetId) {
				return path;
			}
			if (node.children && node.children.length > 0) {
				for (let i = 0; i < node.children.length; i++) {
					const childPath = findPath(node.children[i], targetId, [...path, i]);
					if (childPath) {
						return childPath;
					}
				}
			}
			return null;
		};
		return findPath(renderTree, nodeid, []);
	};

	/**
	 * 使用 componentType 查找符合条件的节点路径数组
	 * @param componentType 目标子项类型（即该节点是否可以接受该类型子项）
	 * @returns 所有匹配节点的路径数组
	 */
	const findPathsByComponentType = function (componentType: TComponentType): number[][] {
		const result: number[][] = [];

		const traverse = (node: ITreeNode, path: number[]): void => {
			if (Array.isArray(node.containerType) && node.containerType.includes(componentType)) {
				result.push(path);
			}
			if (Array.isArray(node.children)) {
				node.children.forEach((child, index) => {
					traverse(child, [...path, index]);
				});
			}
		};

		traverse(renderTree, []);
		return result;
	};

	/**
	 * 使用nodeid 查找节点
	 * @param nodeid
	 * @returns ITreeNode | null
	 */
	const findNodeByNodeid = function (nodeid: string): ITreeNode | null {
		let currentNode: ITreeNode | null = renderTree;
		//传统递归查找
		const findNode = function (node: ITreeNode): ITreeNode | null {
			if (node.nodeid === nodeid) {
				return node;
			}
			if (node.children && node.children.length > 0) {
				for (let child of node.children) {
					const foundNode = findNode(child);
					if (foundNode !== null) {
						return foundNode;
					}
				}
			}
			return null;
		};
		return findNode(currentNode);
	};

	/**
	 * 使用componentType 查找节点
	 * @param componentType
	 * @returns ITreeNode[]
	 */
	const findNodesByComponentType = function (componentType: TComponentType): ITreeNode[] {
		let currentNode: ITreeNode | null = renderTree;
		const foundNodes: ITreeNode[] = [];
		//传统递归查找
		const findNodes = function (node: ITreeNode): void {
			if (node.containerType.includes(componentType)) {
				foundNodes.push(node);
			}
			if (node.children && node.children.length > 0) {
				for (let child of node.children) {
					findNodes(child);
				}
			}
		};
		findNodes(currentNode);
		return foundNodes;
	};

	/**
	 * 使用 nodetype 查找所有匹配的节点
	 * @param nodetype 要查找的节点类型（"layout" 或 "component"）
	 * @returns ITreeNode[] 满足条件的所有节点数组
	 */
	const findNodesByNodetype = (nodetype: TNodeType): ITreeNode[] => {
		const result: ITreeNode[] = [];

		const traverse = (node: ITreeNode) => {
			if (node.nodetype === nodetype) {
				result.push(node);
			}
			if (Array.isArray(node.children)) {
				for (const child of node.children) {
					traverse(child);
				}
			}
		};

		traverse(renderTree);
		return result;
	};

	/**
	 * 判断当前节点是否可以放入目标容器
	 * @param dragNode 拖拽中的节点
	 * @param targetContainer 被拖拽进的容器节点
	 * @returns 是否允许放入
	 */
	const isDropAllowed = (dragNode: ITreeNode, targetContainer: ITreeNode): boolean => {
		return dragNode.containerType.includes(targetContainer.componentType);
	};

	/**
	 * 使用 pathArray 或 nodeid 往 renderTree 树中新增一个节点（immer 版）
	 * @param parent 父节点的路径数组或 nodeid
	 * @param newNode 新增的节点
	 * @returns boolean 是否添加成功
	 */
	const addNode = async (parent: number[] | string, newNode: ITreeNode): Promise<boolean> => {
		let targetPath: number[] | null = null;
		let _renderTree = await getNewestrenderTree();

		// 获取路径
		if (Array.isArray(parent)) {
			targetPath = parent;
		} else if (typeof parent === "string") {
			targetPath = findPathByNodeid(parent);
		}

		if (!targetPath) return false;

		let success = false;

		// 用 immer 创建新 renderTree
		const nextTree = produce(_renderTree, (draft) => {
			let current: ITreeNode | undefined = findNodeByPath(draft, targetPath);
			if (!current) return;

			if (!isDropAllowed(newNode, current)) {
				console.warn("目标节点不接受该类型组件");
				return;
			}

			if (!Array.isArray(current.children)) {
				current.children = [];
			}
			current.children.push(newNode);
			success = true;
		});

		// 更新状态
		if (success) {
			setrenderTree(nextTree);
			setupdaterenderTreeStamp(Date.now());
		}

		return success;
	};

	/**
	 * 在指定路径位置插入新节点，支持小数索引用于插入到两个节点之间。
	 * 例如 insertPosition = [0, 3.5] 表示在 [0] 节点的 children 的第3和第4项之间插入。
	 *
	 * @param newNode 要插入的节点
	 * @param insertPosition 插入路径（可带小数作为“插入索引”）
	 * @returns 是否插入成功
	 */
	const insertNodeAt = async (newNode: ITreeNode, insertPosition: number[]): Promise<boolean> => {
		let success = false;
		let _renderTree = await getNewestrenderTree();

		// 插入位置的最后一段必须是小数或整数
		if (insertPosition.length === 0) return false;

		// 分离出父路径和目标索引
		const parentPath = insertPosition.slice(0, -1);
		const rawIndex = insertPosition[insertPosition.length - 1];
		const insertIndex = Math.floor(rawIndex); // 向下取整插入
		const isFractional = rawIndex !== insertIndex;

		const nextTree = produce(_renderTree, (draft) => {
			// 查找父节点
			let current: ITreeNode | undefined = findNodeByPath(draft, parentPath);
			if (!current || !Array.isArray(current.children)) return;

			// 判断是否允许插入该类型
			if (!isDropAllowed(newNode, current)) {
				console.warn("该容器不允许插入该类型组件");
				return;
			}

			// 修正插入位置
			const insertAt = isFractional ? insertIndex + 1 : insertIndex;

			if (insertAt > current.children.length) {
				console.warn("插入索引超出范围");
				return;
			}

			current.children.splice(insertAt, 0, newNode);
			success = true;
		});

		if (success) {
			setrenderTree(nextTree);
			setupdaterenderTreeStamp(Date.now());
		}

		return success;
	};

	/**
	 * 使用两个 pathArray 或 nodeid 交换节点位置（immer 版）
	 * @param node1 路径数组或 nodeid
	 * @param node2 路径数组或 nodeid
	 * @returns boolean 是否交换成功
	 */
	const swapNodes = async (node1: number[], node2: number[]): Promise<boolean> => {
		let path1: number[] | null = Array.isArray(node1) ? node1 : findPathByNodeid(node1);
		let path2: number[] | null = Array.isArray(node2) ? node2 : findPathByNodeid(node2);

		if (!path1 || !path2) {
			console.warn("路径不存在，无法交换");
			return false;
		}
		let _renderTree = await getNewestrenderTree();

		// 检查是否路径等长，且不相等
		if (path1.length === 0 || path2.length === 0 || path1.toString() === path2.toString()) {
			console.warn("路径相同或非法");
			return false;
		}

		let success = false;

		const nextTree = produce(_renderTree, (draft) => {
			// 获取父节点
			const getParentAndIndex = (path: number[]) => {
				const parentPath = path.slice(0, -1);
				const index = path[path.length - 1];
				let parent: ITreeNode | undefined = draft;
				for (const i of parentPath) {
					if (!parent?.children || i < 0 || i >= parent.children.length) return null;
					parent = parent.children[i];
				}
				return { parent, index };
			};

			const info1 = getParentAndIndex(path1);
			const info2 = getParentAndIndex(path2);

			if (!info1 || !info2) return;

			const { parent: parent1, index: index1 } = info1;
			const { parent: parent2, index: index2 } = info2;

			if (!parent1?.children || !parent2?.children) return;

			// 交换
			const temp = parent1.children[index1];
			parent1.children[index1] = parent2.children[index2];
			parent2.children[index2] = temp;

			success = true;
		});

		if (success) {
			setrenderTree(nextTree);
			setupdaterenderTreeStamp(Date.now());
		}

		return success;
	};

	/**
	 * 交换两个节点的位置，其中 node1 节点已从树中删除，
	 * 因此通过外部传入的 node1Obj 来代替其原始内容。
	 *
	 * 该函数的核心目标是：
	 * - 将 node2 节点移动到 node1 原来的位置
	 * - 将 node1Obj 插入到 node2 的位置
	 *
	 * 注意：
	 * - node1 表示原始被删除节点的位置（其父节点仍在）
	 * - node2 表示目标节点当前所在的位置
	 *
	 * @param node1 被删除的节点路径（如 [1, 0]）
	 * @param node1Obj 被删除的节点内容（外部保存）
	 * @param node2 要与之交换的目标路径（如 [0, 0]）
	 * @returns 是否交换成功
	 */
	const swapNodesWithNode1Obj = async (node1: number[], node1Obj: ITreeNode, node2: number[]): Promise<boolean> => {
		let success = false;
		let _renderTree = await getNewestrenderTree();
		let nextTree: ITreeNode = produce(_renderTree, (draft) => {
			const getParentAndIndex = (path: number[]) => {
				const parentPath = path.slice(0, -1);
				const index = path[path.length - 1];
				let parent: ITreeNode | undefined = draft;
				for (const i of parentPath) {
					if (!parent?.children || i < 0 || i >= parent.children.length) return null;
					parent = parent.children[i];
				}
				return { parent, index };
			};

			const info1 = getParentAndIndex(node1);
			const info2 = getParentAndIndex(node2);

			if (!info1 || !info2) return;

			const { parent: parent1, index: index1 } = info1;
			const { parent: parent2, index: index2 } = info2;

			if (!parent1?.children || !parent2?.children) return;

			const node2Obj = parent2.children[index2];
			if (!node2Obj) return;

			// 替换
			parent1.children[index1] = node2Obj;
			parent2.children[index2] = node1Obj;

			success = true;
		});

		if (success) {
			setrenderTree(nextTree);
			setupdaterenderTreeStamp(Date.now());
		}

		return success;
	};

	/**
	 * 使用 pathArray 或 nodeid 删除一个节点（immer 版）
	 * @param target 路径数组或 nodeid
	 * @returns boolean 是否删除成功
	 */
	const deleteNode = (target: number[] | string): boolean => {
		let path: number[] | null = Array.isArray(target) ? target : findPathByNodeid(target);

		if (!path || path.length === 0) {
			console.warn("非法路径，不能删除根节点或未找到节点");
			return false;
		}

		let success = false;
		let nextTree: ITreeNode = produce(renderTree, (draft) => {
			const parentPath = path.slice(0, -1);
			const targetIndex = path[path.length - 1];

			let parentNode: ITreeNode | undefined = draft;
			for (const i of parentPath) {
				if (!parentNode?.children || i < 0 || i >= parentNode.children.length) return;
				parentNode = parentNode.children[i];
			}

			if (!parentNode?.children || targetIndex >= parentNode.children.length) return;

			parentNode.children.splice(targetIndex, 1);
			success = true;
		});

		if (success) {
			setrenderTree(nextTree);
			setupdaterenderTreeStamp(Date.now());
		}

		return success;
	};

	/**
	 * 修改指定路径节点的 props（不可变更新）
	 * @param nodePath 节点路径数组
	 * @param newProps 要合并的 props（partial 更新）
	 * @returns 是否修改成功
	 */
	const modifyNodeProps = (propName: string, nodePath: number[], newProps: any): boolean => {
		if (!Array.isArray(nodePath) || nodePath.length === 0) {
			console.warn("非法路径，无法修改根节点或空路径");
			return false;
		}

		let success = false;

		const nextTree = produce(renderTree, (draft) => {
			const node = findNodeByPath(draft, nodePath);
			if (!node) return;
			if (!Array.isArray(newProps) && typeof newProps !== "object") {
				node[propName] = newProps;
			} else {
				node[propName] = {
					...newProps,
				};
			}

			success = true;
		});

		if (success) {
			setrenderTree(nextTree);
			setupdaterenderTreeStamp(Date.now());
			setsaveTreeCommandStamp(Date.now());
		}

		return success;
	};

	/**
	 * 将当前的 renderTree 保存到 savetree 中
	 * 并将当前的 renderTree 历史记录保存到 history 中
	 */
	const emitAndSaveTree = async (): Promise<void> => {
		let renderTree: any = await new Promise(function (_res) {
			setrenderTree((renderTree) => {
				_res(renderTree);
				return renderTree;
			});
		});
		// 添加历史记录
		setHistory((prevHistory) => {
			const newHistory = [...prevHistory, structuredClone(renderTree)];
			if (newHistory.length > historyMaxCount) {
				newHistory.shift();
			}
			return newHistory;
		});

		// 清空 redo 栈（新动作后不能 redo）
		setRedoStack([]);

		// 保存当前状态
		setsavetree(structuredClone(renderTree));
		setupdatesavetreeStamp(Date.now());
	};

	/**
	 * 撤回操作
	 * @returns
	 */
	const undo = async () => {
		let rendererTree: any = await new Promise(function (_res) {
			setrenderTree((renderTree) => {
				_res(renderTree);
				return renderTree;
			});
		});

		let history: any = await new Promise(function (_res) {
			setHistory((history) => {
				_res(history);
				return history;
			});
		});

		if (history.length === 0) {
			console.warn("没有更多历史记录可以撤销");
			return false;
		}

		// 获取最后一次的历史状态（即要恢复的状态）
		const previous = history[history.length - 1];

		// 保存当前 renderTree 到 redoStack，用于 redo 恢复
		setRedoStack((prev) => [structuredClone(rendererTree), ...prev]);

		// 从 history 中移除最后一项
		setHistory((prev) => prev.slice(0, -1));

		// 设置 renderTree 为历史快照
		setrenderTree(structuredClone(previous));
		setupdaterenderTreeStamp(Date.now());

		return true;
	};

	/**
	 * 取消撤回
	 * @returns
	 */
	const redo = async () => {
		let rendererTree: any = await new Promise(function (_res) {
			setrenderTree((renderTree) => {
				_res(renderTree);
				return renderTree;
			});
		});

		let redoStack: any = await new Promise(function (_res) {
			setRedoStack((redoStack) => {
				_res(redoStack);
				return redoStack;
			});
		});

		if (redoStack.length === 0) {
			console.warn("没有可以恢复的操作");
			return false;
		}

		const next = redoStack[0];

		// 当前 renderTree 入历史栈（作为新的 undo 入口）
		setHistory((prev) => [...prev, structuredClone(rendererTree)]);

		// 移除 redo 栈中已恢复的状态
		setRedoStack((prev) => prev.slice(1));

		// 应用恢复的状态
		setrenderTree(structuredClone(next));
		setupdaterenderTreeStamp(Date.now());
		return true;
	};

	/* 
			临时属性处理器
			用于在生成组件时，临时给组件绑定一些临时属性用的处理器
			但是这些属性并不保存至组件树里去,只是在渲染时临时添加进去
			当再次重新渲染时还会再次过一遍这里的逻辑
		 */
	const getNodeTempProps = function (node: ITreeNode) {
		let newProps: any = null;

		if (node.nodetype === "layout" && node.name === "AutoForm") {
			let cProps: IAutoFormProps = structuredClone(node.props) as IAutoFormProps;
			cProps.formik = "formik" as any;
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
			cProps.onSubmit = `
					function () {
						toast.success("点击了提交!");
					}` as any;
			cProps.onReset = `function () {
						toast.success("点击了重设!");
					}` as any;
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

		if (newProps === null) {
			newProps = node.props;
		}

		return newProps;
	};

	/**
	 * 根据 ITreeNode 生成对应的 JSX 代码
	 * @param node - 树节点
	 * @returns 生成的 JSX 代码字符串
	 */
	const generateCodeFromNode = (node: ITreeNode): string => {
		let componentCode = "";

		// 开始注释，表示组件的开始
		componentCode += `{/*${node.label || "Unnamed Node"} - 开始*/}\n`;

		// 为每个节点生成开标签
		let propsString = "";
		const props = getNodeTempProps(node) || {};

		// 只序列化出非函数和非对象类型的属性
		for (let i in props) {
			if (props.hasOwnProperty(i)) {
				if (typeof props[i] !== "function") {
					if (i === "className") {
						propsString += ` ${i}={styles.${props[i]}} `;
					} else {
						propsString += ` ${i}={${JSON.stringify(props[i])}} `;
					}
				}
			}
		}
		/* propsString += ` data-bobliao_lc_nodeid={${JSON.stringify(node.nodeid)}} `;
		propsString += ` data-bobliao_lc_label={${JSON.stringify(node.label || "Unnamed Node")}} `; */

		let depString = importStringMap[node.name];
		if (typeof depString !== "undefined") {
			genCodeDepsStringRef.current[node.name] = depString;
		}
		if (node.nodetype === "layout") {
			// 处理 layout 类型的节点
			// 处理非 layout 类型的节点（如组件）
			switch (node.name) {
				case "AutoForm":
				case "CommonInquery":
					break;
				case "PageRoot":
					break;
				default:
					componentCode += `<${node.name} ${propsString}>\n`;
					break;
			}

			// 处理非 layout 类型的节点（如组件）
			switch (node.name) {
				case "AutoForm":
					componentCode += `<AutoForm ${propsString} />\n`;
					break;
				case "CommonInquery":
					componentCode += `<CommonInquery ${propsString} />\n`;
					break;
				default:
					// 递归处理子节点
					if (node.children && node.children.length > 0) {
						node.children.forEach((child) => {
							componentCode += generateCodeFromNode(child);
						});
					}
					if (node.name !== "PageRoot") {
						componentCode += `</${node.name}>\n`;
					}
					break;
			}
		} else {
			if (typeof props.text !== "undefined") {
				let { text, ...restProps } = props;
				componentCode += `<${node.name} ${propsString} >${text}</${node.name}>\n`;
			} else {
				componentCode += `<${node.name} ${propsString} />\n`;
			}
		}

		// 结束注释，表示组件的结束
		componentCode += `{/*${node.label || "Unnamed Node"} - 结束*/}\n`;

		return componentCode;
	};

	/**
	 * 格式化 JSX 代码
	 * @param code - 未格式化的 JSX 代码
	 * @returns 格式化后的 JSX 代码
	 */
	const formatCode = async (code: string): Promise<string> => {
		try {
			let depstrings = "";
			for (let nkey in genCodeDepsStringRef.current) {
				if (genCodeDepsStringRef.current.hasOwnProperty(nkey)) {
					depstrings += ` import ${nkey} from "${genCodeDepsStringRef.current[nkey]}" ;\n\t`;
				}
			}
			const formattedCode = prettier.format(
				`
					/**
					 * _ _ 编写
					 * 模块名称：
					 * 模块说明：
					 * 编写时间：${dayjs().format("[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]")}
					*/
					import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement, useMemo } from "react";
					${depstrings}
					import styles from "./index.module.scss";

					/**
					 * 传入参数
					 */
					export interface iprops {};
					

					const YouComponent: FC<iprops> =({})=>{
						//===============useHooks=================
					
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
							[isMounted]
						);
					
						useEffect(function (): ReturnType<React.EffectCallback> {
							return function (): void {
								setIsMounted(false);
							};
						}, []);

						return (<>${code}</>)
					};

					export default YouComponent;
				`,
				{
					parser: "typescript",
					singleQuote: true,
					semi: true,
					tabWidth: 4,
					plugins: [parserTypescript, parserEstree],
				}
			);
			return formattedCode;
		} catch (error) {
			console.error("Prettier format error:", error);
			return code;
		}
	};

	/**
	 * 格式化当前配置
	 */
	const formatconfig = (config: any): string => {
		return JSON.stringify(config, null, 4);
	};

	/**
	 * 生成整个渲染树的代码
	 * @param rootNode - 渲染树的根节点
	 * @returns 渲染树的 JSX 代码
	 */
	const generateTreeCode = async (rootNode: ITreeNode): Promise<string> => {
		genCodeDepsStringRef.current = {};
		return await formatCode(generateCodeFromNode(rootNode));
	};

	/**
	 * 生成整个渲染树的配置
	 */
	const generateTreeConfig = async (): Promise<string> => {
		let _savetree = await new Promise(function (_res) {
			setsavetree(function (_v) {
				_res(_v);
				return _v;
			});
		});
		return formatconfig(_savetree);
	};

	//===============effects==================
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted === false) {
				setIsMounted(true);
				loadDefaultTree();
			}
		},
		[isMounted]
	);

	useEffect(function (): ReturnType<React.EffectCallback> {
		return function (): void {
			setIsMounted(false);
		};
	}, []);

	/**
	 * 每次渲染树变更就保存一次并推入历史栈
	 */
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted && saveTreeCommandStamp !== -1) {
				saveDebounce(function () {
					emitAndSaveTree();
				}, 300);
			}
		},
		[saveTreeCommandStamp, isMounted]
	);

	return {
		/**
		 * 最终保存到数据库或本地存储的渲染树数据。
		 * 它代表了用户完成编辑并明确“保存”后的组件树状态。
		 */
		savetree,

		/**
		 * 当前正在编辑和展示的组件树。
		 * 所有未保存的变动（拖拽、添加、删除等）都会立即体现在这里。
		 */
		renderTree,

		/**
		 * renderTree 同步到 savetree 的时间戳。
		 * 可用于触发保存提示、自动同步等副作用。
		 */
		updatesavetreeStamp,

		/**
		 * renderTree 被修改的时间戳。
		 * 可用于触发实时预览、调试辅助等逻辑。
		 */
		updaterenderTreeStamp,

		/**
		 * 历史记录栈最大长度（即最多支持多少步 undo 操作）。
		 */
		historyMaxCount,

		/**
		 * 使用路径数组（如 [0,1,2]）查找节点。
		 * 通常用于根据组件树路径定位具体节点。
		 *
		 * @param tree 渲染树根节点
		 * @param pathArray 路径数组
		 * @returns 对应节点（如果存在），否则为 null
		 */
		findNodeByPath,

		/**
		 * 通过节点的 nodeid 查找该节点在树中的路径数组。
		 *
		 * @param nodeid 节点唯一 ID
		 * @returns 路径数组，如 [0,1,2]；未找到时为 null
		 */
		findPathByNodeid,

		/**
		 * 查找所有能接收指定 componentType 类型子组件的节点路径。
		 *
		 * @param componentType 被拖入组件的类型
		 * @returns 符合条件的路径数组集合
		 */
		findPathsByComponentType,

		/**
		 * 根据 nodeid 查找具体的节点对象。
		 *
		 * @param nodeid 节点唯一 ID
		 * @returns 节点对象；未找到时为 null
		 */
		findNodeByNodeid,

		/**
		 * 查找所有能够接收指定 componentType 的容器节点。
		 *
		 * @param componentType 被拖入组件的类型
		 * @returns 所有符合条件的容器节点数组
		 */
		findNodesByComponentType,

		/**
		 * 向指定路径或指定父节点下添加一个子节点（基于 immer 不可变更新）。
		 *
		 * @param parent 父节点的路径数组或 nodeid
		 * @param newNode 要添加的节点
		 * @returns 是否添加成功
		 */
		addNode,

		/**
		 * 交换两个节点的位置，可以通过路径数组或 nodeid 指定节点（基于 immer 实现）。
		 *
		 * @param node1 第一个节点（路径或 nodeid）
		 * @param node2 第二个节点（路径或 nodeid）
		 * @returns 是否交换成功
		 */
		swapNodes,

		/**
		 * 删除指定路径或 nodeid 的节点（基于 immer 实现）。
		 *
		 * @param target 要删除的节点（路径或 nodeid）
		 * @returns 是否删除成功
		 */
		deleteNode,

		/**
		 * 将当前 renderTree 状态作为最终状态保存到 savetree。
		 * 同时会将 renderTree 添加到历史记录（可用于 undo）并清空 redo 栈。
		 */
		emitAndSaveTree,

		/**
		 * 执行撤销操作，将 renderTree 回退到上一个历史快照。
		 * 同时将当前状态存入 redo 栈。
		 *
		 * @returns 是否撤销成功
		 */
		undo,

		/**
		 * 执行恢复操作，将 redo 栈中的前一个状态恢复为 renderTree。
		 * 同时当前状态入历史记录栈（供再次 undo）。
		 *
		 * @returns 是否恢复成功
		 */
		redo,
		/**
		 * 使用 nodetype 查找所有匹配的节点
		 * @param nodetype 要查找的节点类型（"layout" 或 "component"）
		 * @returns ITreeNode[] 满足条件的所有节点数组
		 */
		findNodesByNodetype,
		/**
		 * 在指定路径位置插入新节点，支持小数索引用于插入到两个节点之间。
		 * 例如 insertPosition = [0, 3.5] 表示在 [0] 节点的 children 的第3和第4项之间插入。
		 *
		 * @param newNode 要插入的节点
		 * @param insertPosition 插入路径（可带小数作为“插入索引”）
		 * @returns 是否插入成功
		 */
		insertNodeAt,
		isDropAllowed,
		swapNodesWithNode1Obj,
		/**
		 * 生成整个渲染树的代码
		 * @param rootNode - 渲染树的根节点
		 * @returns 渲染树的 JSX 代码
		 */
		generateTreeCode,
		modifyNodeProps,
		setsaveTreeCommandStamp,
		generateTreeConfig,
	};
};
export default useRenderTreeHook;
