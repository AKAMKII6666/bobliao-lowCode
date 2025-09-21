/**
 * 廖力编写
 * 模块名称：组件托管期
 * 模块说明：
 * 编写时间：2025年6月25日 17:18:13
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement, Suspense, useMemo, memo, useCallback } from "react";
import styles from "./index.module.scss";
import { ICommonInqueryitempropsWithoutYup, ITreeNode } from "renderer/lcSupport/interface/ItreeNode";
import { ComponentNameMap } from "renderer/lcSupport/lcsUtils";
import useJquery from "@bobliao/use-jquery-hook";
import ResizeObserver from "resize-observer-polyfill";
import { useRendererDataContext } from "renderer/lcSupport/renderer";
import { produce } from "immer";
import { Tooltip } from "@mui/material";
import Loading from "MithalCommonLibrary/Loading";
import { coordXY, warpperDivObj } from "renderer/lcSupport/interface/renderer";
import { Button, Modal } from "antd";
import toast from "react-hot-toast";
import { AutoFormComsMap, IAutoFormItemProps, IAutoFormProps } from "MithalCommonLibrary/AutoForm";
import { Irectinfo } from "MithalCommonLibrary/formComponentsContainer";
import { ICommonInqueryitemprops, ICommonInqueryprops } from "MithalCommonLibrary/CommonInquery";
import ErrorBoundary from "../ErrorBoundary";
import { newGuid } from "MithalCommonLibrary/utils/utils";
import ChatWindow from "./com/ChatWindow";
import { SYS_APIMODE } from "renderer/config";
import PropChildWarpper from "./com/PropChildWarpper";

/**
 * 传入参数
 */
export interface IWrapperProps {
	node: ITreeNode;
	pathArray: number[];
}

//往外面暴露统一名称的属性对象，用于生成低代码平台属性JSON schema
export type Tinputprops = IWrapperProps;

const Wrapper: FC<IWrapperProps> = ({ node, pathArray }): ReactElement => {
	//===============useHooks=================
	const $ = useJquery();
	/* window.$ = $; */
	//使用渲染器对象
	const rendererDataHook = useRendererDataContext();

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);

	/* autoForm的react信息更新时间戳 */
	const [autoFormRectChangeStamp, setautoFormRectChangeStamp] = useState<number>(-1);
	//当前组件的container节点
	const [containerNode, setContainerNode] = useState<HTMLDivElement | null>(null);
	const [resizeTstamp, setresizeTstamp] = useState<number>(-1);

	/* 这个用于在一切特殊场景强行设置当前节点为第一位hover样式 */
	const [iscustomHover, setiscustomHover] = useState<boolean>(false);

	/* 当前warpper的title的left */
	const [warpperTitleLeft, setwarpperTitleLeft] = useState<number>(0);

	//当前warpper节点的位置和大小
	const [wrapperRect, setWrapperRect] = useState({
		width: 0,
		height: 0,
		left: 0,
		top: 0,
	});

	/* 是否打开了布局生成对话窗口 */
	const [isOpenChatWindow, setisOpenChatWindow] = useState<boolean>(false);
	/* 当前用户输入的布局生成内容 */
	const [chatInputContent, setchatInputContent] = useState<string>("");
	/* 当前窗口点击的位置 */
	const [chatWindowPosition, setchatWindowPosition] = useState<coordXY>({
		x: 0,
		y: 0,
	});

	//===============static===================
	//父节点的路径
	const parentNodePath = [...pathArray];
	parentNodePath.pop();

	//===============ref======================
	const wrapperDivRef = useRef<HTMLDivElement>(null);
	const resizeObserverRef = useRef<ResizeObserver | null>(null);
	/* 当前节点是否是hover状态,这个状态用来标识当前节点的子节点是否被hover  */
	/* 如果当前节点的子节点被hover ,isCurrentHoverRef 为true, 且iscustomHover必须为false */
	const isCurrentHoverRef = useRef<boolean>(false);
	const wrapperTitleRef = useRef<HTMLDivElement>(null);
	const customHoverpath = useRef<number[]>([]);
	const autoFormRectsRef = useRef<Irectinfo[]>([]);

	//父节点
	const parentNode = rendererDataHook.renderTreeObj.findNodeByPath(rendererDataHook.renderTreeObj.renderTree, parentNodePath);

	//===============function=================

	const avoidUndefined = function (obj: any) {
		if (typeof obj === "undefined") {
			return "0";
		}
		return obj;
	};

	/* 提交布局生成 */
	const submitLayout = function () {
		setisOpenChatWindow(false);
		rendererDataHook.generateLayout(chatInputContent, pathArray);
	};

	//获得当前warpperdiv标题的left
	const getWarpperDivTitleLeft = function () {
		//累计left
		let left = 0;
		let parentNodes = rendererDataHook.getParentWarpperNodes(pathArray);
		for (let i = 0; i < parentNodes.length; i++) {
			let item = parentNodes[i];

			//如果是比自己层级大的自己就取消累计
			if (item.currentNodePath.length > pathArray.length) {
				continue;
			}

			let margin = Number(avoidUndefined($(item.wrapperDivRef).next().css("margin")).replace("px", ""));
			let border = Number(avoidUndefined($(item.wrapperDivRef).next().css("border")).replace("px", ""));
			let parentPadding = Number(avoidUndefined($(item.wrapperDivRef).parent().css("padding")).replace("px", ""));

			//如果是自己就取消累计
			if (item.currentNodePath.join("") !== pathArray.join("")) {
				left += $(item.wrapperTitleRef).outerWidth() + 0.5;
			}
			if (!isNaN(margin)) {
				left -= margin / 2;
			}
			if (!isNaN(parentPadding)) {
				left -= parentPadding;
			}
			if (!isNaN(border)) {
				left -= border;
			}
		}
		try {
			let warpperleft = $(wrapperDivRef.current).position().left;
			let warpperWidth = $(wrapperDivRef.current).width();
			if (left + warpperleft > warpperleft + warpperWidth) {
				return 0;
			}
		} catch (_e) {}
		return left;
	};

	//获得当前warpperdiv标题的top
	const getWarpperDivTitleTop = function (): React.CSSProperties {
		if (wrapperTitleRef.current !== null) {
			let top = $(wrapperDivRef.current).offset().top - 15;
			if (top < rendererDataHook.rContainerScrollTop) {
				return {
					top: 0,
					position: "fixed",
					left: $(wrapperDivRef.current).offset().left,
					transform: "unset",
					zIndex: 98,
				};
			}
		}
		return {};
	};

	/* 创建布局拖拽接收层 */
	const createLayoutReviceLayter = function (_tempNodePath: number[]) {
		if (node.nodetype === "layout") {
			return (
				<div
					className={
						styles.layoutReciver +
						" " +
						(function () {
							if (
								rendererDataHook.mouseAction === "drag" &&
								rendererDataHook.renderTreeObj.isDropAllowed(rendererDataHook.currentDraggingNode, node)
							) {
								return styles.show;
							}
							return "";
						})()
					}
					onMouseEnter={function () {
						if (!rendererDataHook.isOpenWarpperRightMenu) {
							rendererDataHook.genWarpperHoverChain(pathArray);
							setiscustomHover(true);
							customHoverpath.current = _tempNodePath;
							rendererDataHook.onDragEnter(_tempNodePath);
						}
					}}
					onMouseLeave={function () {
						if (!rendererDataHook.isOpenWarpperRightMenu) {
							rendererDataHook.clearWarpperHoverChain();
							setiscustomHover(false);
							customHoverpath.current = [];
							rendererDataHook.onDragOut();
						}
					}}
					onMouseUp={function (_e) {
						rendererDataHook.clearWarpperHoverChain();
						setiscustomHover(false);
						customHoverpath.current = [];
						rendererDataHook.onDragEnd();
					}}
					style={{
						opacity: (function () {
							/* if (isCurrentHoverRef.current === true && iscustomHover === false) {
								return 0.1;
							} */

							if (iscustomHover === false && customHoverpath.current.join("") !== _tempNodePath.join("")) {
								return 0.1;
							}

							/* if (rendererDataHook.isEnterWarpper === true && iscustomHover === false) {
								return 0.1;
							} */
							return "";
						})(),
					}}
				>
					<span>
						{(function () {
							if (iscustomHover && customHoverpath.current.join("") === _tempNodePath.join("")) {
								return "松开鼠标插入节点";
							}
							return ">";
						})()}
					</span>
				</div>
			);
		}
		return null;
	};

	/* 获得当前节点的子节点 */
	const getChildrenNode = function (_children: ITreeNode[]): ReactElement | ReactElement[] | null {
		let results = [];
		for (var index = 0; index < _children.length; index++) {
			(function () {
				let item = _children[index];
				let newPathArray: number[] = Array.from(pathArray);
				newPathArray.push(index);
				results.push(
					<React.Fragment key={item.nodeid + "_" + index}>
						<Wrapper node={item} pathArray={newPathArray} />
					</React.Fragment>
				);

				/* layout的事件接受层 */
				if (rendererDataHook.currentDraggingNode && rendererDataHook.currentDraggingNode.nodetype === "layout") {
					if (
						_children.length - 1 !== index &&
						node.nodetype === "layout" &&
						rendererDataHook.mouseAction === "drag" &&
						rendererDataHook.renderTreeObj.isDropAllowed(rendererDataHook.currentDraggingNode, node)
					) {
						newPathArray = Array.from(pathArray);
						newPathArray.push(index + 0.5);
						results.push(<React.Fragment key={item.nodeid + "_" + index + "_" + "temp"}>{createLayoutReviceLayter(newPathArray)}</React.Fragment>);
					}
				}
			})();
		}

		return results;
	};

	const completeLoadChild = function () {
		setTimeout(() => {
			setresizeTstamp(+new Date());
		}, 300);
		return null;
	};

	/* 生成节点 */
	const getNode = function () {
		let children: ReactElement | ReactElement[] | null = [];
		/* layout的事件接受层 */
		if (rendererDataHook.currentDraggingNode && rendererDataHook.currentDraggingNode.nodetype === "layout") {
			let isIncludeComponent = false;
			if (node.children && node.children.length > 0) {
				if (node.children[0].nodetype === "component") {
					children = getChildrenNode(node.children) as ReactElement[];
					isIncludeComponent = true;
				} else {
					let newPathArray: number[] = Array.from(pathArray);
					newPathArray.push(-1);
					children.push(<React.Fragment key={"first"}>{createLayoutReviceLayter(newPathArray)}</React.Fragment>);
					children = children.concat(getChildrenNode(node.children));
				}
			}

			if (!isIncludeComponent) {
				let isLayout = false;

				let newPathArray: number[] = Array.from(pathArray);
				if (node.children && node.children.length > 0) {
					newPathArray.push(node.children.length);
				} else {
					newPathArray.push(0);
				}
				children.push(<React.Fragment key={"last"}>{createLayoutReviceLayter(newPathArray)}</React.Fragment>);

				if (
					node.nodetype === "layout" &&
					rendererDataHook.mouseAction === "drag" &&
					rendererDataHook.renderTreeObj.isDropAllowed(rendererDataHook.currentDraggingNode, node)
				) {
					isLayout = true;
				}
			}
			/* component的事件接受层 */
		} else if (rendererDataHook.currentDraggingNode && rendererDataHook.currentDraggingNode.nodetype === "component") {
			if (node.children && node.children.length > 0) {
				children = getChildrenNode(node.children);
			}
		} else {
			if (node.children && node.children.length > 0) {
				children = getChildrenNode(node.children);
			}
		}

		if (typeof node.children === "undefined") {
			children = null;
		}
		let resNode = (
			<Suspense fallback={<Loading style={{ height: "40px", backgroundSize: "20px 20px", backgroundColor: "#eee", position: "static" }}></Loading>}>
				<ErrorBoundary renderStamp={rendererDataHook.renderTreeObj.updaterenderTreeStamp}>
					{(function () {
						try {
							if (node.nodetype === "component" && node.name !== "MithrilAntdTable") {
								return (
									<div className={styles.componentnodeShell}>
										{React.createElement(
											ComponentNameMap[node.name] || "div",
											{ key: node.nodeid, ...rendererDataHook.getNodeTempProps(node, true, propsHandler) },
											children
										)}
									</div>
								);
							}
							return React.createElement(
								ComponentNameMap[node.name] || "div",
								{ key: node.nodeid, ...rendererDataHook.getNodeTempProps(node, true, propsHandler) },
								children
							);
						} catch (_e) {
							return (
								<div style={{ color: "red", whiteSpace: "pre-wrap", padding: "10px", background: "#fff0f0" }}>
									<strong>组件发生错误：</strong>
									<br />
									{String(_e.message || _e)}
								</div>
							);
						}
					})()}
				</ErrorBoundary>
				{completeLoadChild()}
			</Suspense>
		);

		return resNode;
	};

	/* 创建autoForm/commoninquery子节点用的hover事件层 */
	const makePropChildWarpper = function () {
		let results = [];
		let index = 0;
		for (let afitem of autoFormRectsRef.current) {
			(function (_index) {
				let childItem = node.children[_index];
				if (typeof childItem === "undefined") {
					return null;
				}
				let currentChildPathArray = Array.from(pathArray);
				currentChildPathArray.push(_index);
				results.push(
					<PropChildWarpper
						rect={afitem}
						childItem={childItem}
						pathArray={currentChildPathArray}
						onDelete={function () {
							deleteAutoFormNode(_index);
						}}
						onMouseEnter={function () {
							if (!rendererDataHook.isOpenWarpperRightMenu) {
								setiscustomHover(true);
								customHoverpath.current = currentChildPathArray;
								rendererDataHook.onDragEnter(currentChildPathArray);
							}
						}}
						onMouseLeave={function () {
							if (!rendererDataHook.isOpenWarpperRightMenu) {
								setiscustomHover(false);
								customHoverpath.current = currentChildPathArray;
								rendererDataHook.onDragOut();
							}
						}}
						onMouseDown={function (_e) {
							switchWrongMode(childItem);
							if (_e.button === 0) {
								setautoFormRectChangeStamp(+new Date());
								rendererDataHook.onDragStart(childItem, currentChildPathArray);
								rendererDataHook.setdragBPosition({
									x: rendererDataHook.currentMousePosition.x,
									y: rendererDataHook.currentMousePosition.y,
								});
							}
						}}
						onMouseUp={function (_e) {
							if (_e.button === 0) {
								setiscustomHover(false);
								customHoverpath.current = [];
								rendererDataHook.onDragEnd();
								setautoFormRectChangeStamp(+new Date());
							}
						}}
						onContextMenu={(e) => {
							//如果互相在错误的模式里就自动切换
							switchWrongMode();
							rendererDataHook.editNodeProps(childItem, currentChildPathArray);
							rendererDataHook.setisOpenWarpperRightMenu(false);
							e.preventDefault(); // 阻止系统默认右键菜单
						}}
					/>
				);
			})(index);
			index++;
		}
		return results;
	};

	/* autoForm的临时属性处理器 */
	const AutoFormTempPropHandler = function (props: IAutoFormProps) {
		props.formik = rendererDataHook.fakeFormik;
		props.isInLowCodeMode = true;
		//当界面的树更新后，强行更新RectInfo
		props.forceUpdateRectInfoStamp = rendererDataHook.renderTreeObj.updaterenderTreeStamp;
		props.reportRectInfo = function (index, value) {
			autoFormRectsRef.current[index] = value;
		};

		/* 给autoForm转换组件列表 */
		props.items = (function () {
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
		return props;
	};

	/* CommonInquery的临时属性处理器 */
	const CommonInqueryTempPropHandler = function (props: ICommonInqueryprops) {
		props.enabledFoldable = false;
		props.onSubmit = function () {
			toast.success("点击了提交!");
		};
		props.onReset = function () {
			toast.success("点击了重设!");
		};
		props.isInLowCodeMode = true;
		//当界面的树更新后，强行更新RectInfo
		props.forceUpdateRectInfoStamp = rendererDataHook.renderTreeObj.updaterenderTreeStamp;
		props.reportRectInfo = function (index, value) {
			autoFormRectsRef.current[index] = value;
		};

		/* 给CommonInquery转换组件列表 */
		props.items = (function () {
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
							label: item.label.substring(0, 3) + "..",
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

		return props;
	};

	/* 临时属性处理器 */
	const propsHandler = function (node: ITreeNode, name: string) {
		let newProps = structuredClone(node.props);
		if (node.nodetype === "layout" && name === "AutoForm") {
			return AutoFormTempPropHandler(newProps);
		}
		if (node.nodetype === "layout" && name === "CommonInquery") {
			return CommonInqueryTempPropHandler(newProps);
		}
		return newProps;
	};

	/* 初始化事件warpper */
	const initEventWrapper = function (): void {
		setContainerNode($(wrapperDivRef.current!).next()[0] as HTMLDivElement);
		setresizeTstamp(+new Date());
	};

	/* 获得事件warpper的位置大小 */
	const getWrapperRect = function () {
		if (wrapperDivRef.current) {
			let position = $(wrapperDivRef.current!).next().position();
			setWrapperRect({
				width: $(wrapperDivRef.current!).next().outerWidth(true),
				height: $(wrapperDivRef.current!).next().outerHeight(true),
				left: position?.left || 0,
				top: position?.top,
			});
		}
	};

	/**
	 *创建reasize
	 */
	const createResizeObserver = function () {
		if (typeof $(wrapperDivRef.current!).parent()[0] !== "undefined") {
			let element = $(wrapperDivRef.current!).parent()[0];
			resizeObserverRef.current = new ResizeObserver((entries) => {
				if (entries.length > 0) {
					setresizeTstamp(+new Date());
				}
			});
			resizeObserverRef.current.observe(element);
		}
	};

	/**
	 *清除resize
	 */
	const clearObserver = function () {
		if (resizeObserverRef.current !== null) {
			resizeObserverRef.current.disconnect();
			resizeObserverRef.current = null;
		}
	};

	/* 选中上一个节点 */
	const selectParent = function () {
		let parentNode = rendererDataHook.getWarpperByPath(parentNodePath);
		if (parentNode?.levelIndex > 0) {
			rendererDataHook.genWarpperHoverChain(parentNodePath);
			rendererDataHook.setisOpenWarpperRightMenu(true);
			rendererDataHook.setcurrentMenuNodeObj(parentNode);
		}
	};

	/* 移动节点 */
	const moveNode = function () {
		rendererDataHook.clearWarpperHoverChain();
		rendererDataHook.setisOpenWarpperRightMenu(false);
		rendererDataHook.setcurrentMenuNodeObj(null);
		rendererDataHook.onDragStart(node, pathArray);
		if (wrapperDivRef.current !== null) {
			let position = $(wrapperDivRef.current).offset();
			rendererDataHook.setdragBPosition({
				x: position.left,
				y: position.top,
			});
		}
	};

	/* 拖放复制节点 */
	const copyNode = function () {
		rendererDataHook.clearWarpperHoverChain();
		rendererDataHook.setisOpenWarpperRightMenu(false);
		rendererDataHook.setcurrentMenuNodeObj(null);
		rendererDataHook.onDragStart(node, pathArray, "copy");
		if (wrapperDivRef.current !== null) {
			let position = $(wrapperDivRef.current).offset();
			rendererDataHook.setdragBPosition({
				x: position.left,
				y: position.top,
			});
		}
	};

	/* 复制并插入到下一行 */
	const copyAndInsertNode = function () {
		let newNode = structuredClone(node);
		newNode.nodeid = newGuid();
		newNode.isTached = true;
		let nextPathArray = [...pathArray];
		nextPathArray[nextPathArray.length - 1] = nextPathArray[nextPathArray.length - 1] + 0.5;
		rendererDataHook.renderTreeObj.insertNodeAt(newNode, nextPathArray);
		rendererDataHook.renderTreeObj.emitAndSaveTree();
	};

	/* 删除节点 */
	const deleteNode = function () {
		Modal.confirm({
			title: "删除节点",
			width: "600px",
			content: (
				<>
					<p>确认删除以下节点吗</p>
					<p>{`${node.name} - ${node.label} - ${node.nodeid}`}</p>
					<p>此节点以及其以下节点都将被删除！</p>
				</>
			),
			okText: "确认",
			cancelText: "取消",
			onOk() {
				rendererDataHook.renderTreeObj.deleteNode(pathArray);
				rendererDataHook.clearWarpperHoverChain();
			},
			onCancel() {},
		});
	};

	/* 删除节点 */
	const deleteAutoFormNode = function (index: number) {
		let childItem = node.children[index];
		Modal.confirm({
			title: "删除节点",
			width: "600px",
			content: (
				<>
					<p>确认删除以下节点吗</p>
					<p>{`${childItem.name} - ${childItem.label} - ${childItem.nodeid}`}</p>
					<p>此节点位于{node.name}内！</p>
				</>
			),
			okText: "确认",
			cancelText: "取消",
			onOk() {
				autoFormRectsRef.current = autoFormRectsRef.current.reduce(function (acc, item, _index) {
					if (_index !== index) {
						acc.push(item);
					}
					return acc;
				}, []);
				let _path = Array.from(pathArray);
				_path.push(index);
				setautoFormRectChangeStamp(+new Date());
				rendererDataHook.renderTreeObj.deleteNode(_path);
			},
			onCancel() {},
		});
	};

	/* 互相将错误的模式切换过来 */
	const switchWrongMode = function (currentNode?) {
		if (typeof currentNode !== "undefined") {
			if (currentNode.nodetype === "layout" && rendererDataHook.mouseMode === "componentEdit") {
				rendererDataHook.setMouseMode("layoutEdit");
				toast.success(`已切换为布局模式!`);
				return;
			}
			if (currentNode.nodetype === "component" && rendererDataHook.mouseMode === "layoutEdit") {
				rendererDataHook.setMouseMode("componentEdit");
				toast.success(`已切换为组件模式!`);
				return;
			}
			return;
		}
		if (node.nodetype === "layout" && rendererDataHook.mouseMode === "componentEdit") {
			rendererDataHook.setMouseMode("layoutEdit");
			toast.success(`已切换为布局模式!`);
			return;
		}
		if (node.nodetype === "component" && rendererDataHook.mouseMode === "layoutEdit") {
			rendererDataHook.setMouseMode("componentEdit");
			toast.success(`已切换为组件模式!`);
			return;
		}
	};

	/**当warpperhover或者被动hover */
	const checkWarpperHoverOrPassiveHover = function () {
		let warpperItem = rendererDataHook.currentwarpperhoverChainRef.current[pathArray.join("")];
		if (typeof warpperItem !== "undefined") {
			if (typeof warpperItem.isCurrent !== "undefined" && warpperItem.isCurrent) {
				/* setiscustomHover(true); */
			} else {
				isCurrentHoverRef.current = true;
			}

			/* 这里要计算两次的原因 */
			/**第一次计算先显示出来，位置可能不对 */
			setwarpperTitleLeft(getWarpperDivTitleLeft());
			/**第二次计算根据其它节点的正确的大小计算位置 */
			setTimeout(() => {
				setwarpperTitleLeft(getWarpperDivTitleLeft());
			}, 1);
		} else {
			setiscustomHover(false);
			isCurrentHoverRef.current = false;
		}
	};

	//===============effects==================
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted === false) {
				setIsMounted(true);
				//初始化事件warpper
				initEventWrapper();
				//创建resize
				createResizeObserver();
				//注册warpper
				rendererDataHook.registerWarpper(pathArray, {
					wrapperDivRef: wrapperDivRef.current!,
					wrapperTitleRef: wrapperTitleRef.current!,
					currentNodePath: pathArray,
					levelIndex: pathArray.length,
				});
			}
		},
		[isMounted]
	);

	useEffect(
		function (): ReturnType<React.EffectCallback> {
			getWrapperRect();
		},
		[
			//
			node.children,
			rendererDataHook.rContainerScrollTop,
			resizeTstamp,
			rendererDataHook.renderTreeObj.updaterenderTreeStamp,
			rendererDataHook.warpperhoverStateUpdateStamp,
		]
	);

	useEffect(function (): ReturnType<React.EffectCallback> {
		return function (): void {
			//清除resize
			clearObserver();
			setIsMounted(false);
			//注销warpper
			rendererDataHook.unregisterWarpper(pathArray);
		};
	}, []);

	useEffect(
		function (): ReturnType<React.EffectCallback> {
			checkWarpperHoverOrPassiveHover();
		},
		[rendererDataHook.warpperhoverStateUpdateStamp]
	);

	return (
		<>
			{/* 创建AutoHover / CommonInquery子项目的事件接受层 */}
			{useMemo(
				function () {
					if (/* rendererDataHook.mouseMode === "componentEdit" && */ node.name === "AutoForm" || node.name === "CommonInquery") {
						if (
							rendererDataHook.mouseAction === "drag" && //当前的布局容器必须能和当前拖拽的容器类型能够匹配
							!rendererDataHook.renderTreeObj.isDropAllowed(rendererDataHook.currentDraggingNode, node)
						) {
							return null;
						}
						return makePropChildWarpper();
					}
					return null;
				},
				[
					node.name,
					autoFormRectChangeStamp,
					resizeTstamp,
					rendererDataHook.mouseMode,
					wrapperRect,
					node.nodetype,
					rendererDataHook.mouseAction,
					rendererDataHook.currentDraggingNode,
					rendererDataHook.renderTreeObj.updaterenderTreeStamp,
				]
			)}
			{/* 创建组件模式下的组件接受层 */}
			{useMemo(
				function () {
					if (
						//当前节点必须为布局节点
						node.nodetype === "layout" &&
						//当前鼠标动作必须为重在拖拽
						rendererDataHook.mouseAction === "drag" &&
						//必须存在正在拖拽的节点
						rendererDataHook.currentDraggingNode &&
						//正在拖拽的节点的类型必须为控件组件
						rendererDataHook.currentDraggingNode.nodetype === "component" &&
						//当前的模式必须在组件编辑模式下
						rendererDataHook.mouseMode === "componentEdit" &&
						//当前的布局容器必须能和当前拖拽的容器类型能够匹配
						rendererDataHook.renderTreeObj.isDropAllowed(rendererDataHook.currentDraggingNode, node)
					) {
						let results = [];
						if (node.name !== "AutoForm" && node.name !== "CommonInquery" && node.children.length > 0) {
							return null;
						}
						let _tempNodePath = Array.from(pathArray);
						if (node.name === "AutoForm" || node.name === "CommonInquery") {
							_tempNodePath.push(node.children.length);
						} else {
							_tempNodePath.push(0);
						}
						results.push(
							<div
								key={node.nodeid + "_componentEventReciver"}
								className={styles.componentReciverLay}
								style={{
									width: wrapperRect.width + "px",
									height: wrapperRect.height + "px",
									left: wrapperRect.left + "px",
									top: wrapperRect.top + "px",
								}}
								onMouseEnter={function () {
									setiscustomHover(true);
									customHoverpath.current = _tempNodePath;
									rendererDataHook.onDragEnter(_tempNodePath);
								}}
								onMouseLeave={function () {
									setiscustomHover(false);
									customHoverpath.current = _tempNodePath;
									rendererDataHook.onDragOut();
								}}
								onMouseUp={function (_e) {
									setiscustomHover(false);
									customHoverpath.current = [];
									rendererDataHook.onDragEnd();
								}}
							></div>
						);
						return results;
					}
					return null;
				},
				[
					//
					wrapperRect,
					node.nodetype,
					rendererDataHook.mouseAction,
					rendererDataHook.currentDraggingNode,
					resizeTstamp,
					rendererDataHook.mouseMode,
				]
			)}

			{/* 制造hover事件接收器 */}
			{useMemo(
				function () {
					/* if (node.nodetype === "component" && rendererDataHook.mouseMode === "layoutEdit") {
						return null;
					} */
					return (
						<>
							{(function () {
								if (
									rendererDataHook.isOpenWarpperRightMenu &&
									rendererDataHook.currentMenuNodeObj.currentNodePath.join("") === pathArray.join("")
								) {
									return (
										<>
											{/*布局的 warpper菜单 */}
											<div
												className={styles.warpperMenu}
												style={{
													left: wrapperRect.left + "px",
													top: wrapperRect.top + "px",
												}}
											>
												{(function () {
													if (/* node.nodetype === "layout" &&  */ parentNode.name !== "PageRoot") {
														return (
															<>
																<Tooltip
																	title="选择上一级节点"
																	placement="right"
																	classes={{
																		tooltip: styles.tpaaaaaaaaaaaaaa,
																	}}
																	followCursor={true}
																>
																	<div
																		className={styles.icon + " " + styles.icon1}
																		onClick={function (_e) {
																			selectParent();
																			_e.stopPropagation();
																		}}
																	></div>
																</Tooltip>
																<span></span>
															</>
														);
													}
													return null;
												})()}
												<Tooltip
													title="移动节点"
													placement="right"
													classes={{
														tooltip: styles.tpaaaaaaaaaaaaaa,
													}}
													followCursor={true}
												>
													<div
														className={styles.icon + " " + styles.icon2}
														onMouseDown={function () {
															moveNode();
														}}
													></div>
												</Tooltip>
												<span></span>
												<Tooltip
													title="拖放复制节点"
													placement="right"
													classes={{
														tooltip: styles.tpaaaaaaaaaaaaaa,
													}}
													followCursor={true}
												>
													<div
														className={styles.icon + " " + styles.icon5}
														onMouseDown={function () {
															copyNode();
														}}
													></div>
												</Tooltip>
												<span></span>
												{(function () {
													if (node.nodetype === "layout") {
														return (
															<>
																<Tooltip
																	title="复制节点并插入到下面"
																	placement="right"
																	classes={{
																		tooltip: styles.tpaaaaaaaaaaaaaa,
																	}}
																	followCursor={true}
																>
																	<div
																		className={styles.icon + " " + styles.icon6}
																		onMouseDown={function () {
																			copyAndInsertNode();
																		}}
																	></div>
																</Tooltip>
																<span></span>
															</>
														);
													}
													return null;
												})()}

												<Tooltip
													title="编辑属性"
													placement="right"
													classes={{
														tooltip: styles.tpaaaaaaaaaaaaaa,
													}}
													followCursor={true}
												>
													<div
														className={styles.icon + " " + styles.icon4}
														onClick={function (_e) {
															rendererDataHook.editNodeProps(node, pathArray);
															rendererDataHook.setisOpenWarpperRightMenu(false);
														}}
													></div>
												</Tooltip>
												<span></span>
												<Tooltip
													title="收藏节点"
													placement="right"
													classes={{
														tooltip: styles.tpaaaaaaaaaaaaaa,
													}}
													followCursor={true}
												>
													<div
														className={styles.icon + " " + styles.icon7}
														onClick={function (_e) {
															Modal.confirm({
																title: "收藏节点",
																width: "600px",
																content: (
																	<>
																		<p>确认收藏以下节点吗</p>
																		<p>{`${node.name} - ${node.label} - ${node.nodeid}`}</p>
																		<p>
																			请重命名:<input type="text" id="collectname"></input>
																		</p>
																	</>
																),
																okText: "收藏节点",
																cancelText: "取消收藏",
																onOk() {
																	let name = $("#collectname").val();
																	if (name.trim() !== "") {
																		rendererDataHook.collectNode(pathArray, name);
																	} else {
																		toast.error("收藏失败，请填写收藏名称！");
																	}
																},
																onCancel() {},
															});
														}}
													></div>
												</Tooltip>
												{(function () {
													if (SYS_APIMODE === "development") {
														return (
															<>
																<span></span>
																<Tooltip
																	title="查看渲染树"
																	placement="right"
																	classes={{
																		tooltip: styles.tpaaaaaaaaaaaaaa,
																	}}
																	followCursor={true}
																>
																	<div
																		className={styles.icon + " " + styles.icon8}
																		onClick={function (_e) {
																			rendererDataHook.watchNode(pathArray);
																		}}
																	></div>
																</Tooltip>
															</>
														);
													}
													return null;
												})()}

												<span></span>
												{(function () {
													if (node.nodetype === "layout") {
														return (
															<>
																<Tooltip
																	title="使用BobBot生成布局"
																	placement="right"
																	classes={{
																		tooltip: styles.tpaaaaaaaaaaaaaa,
																	}}
																	followCursor={true}
																>
																	<div
																		className={styles.icon + " " + styles.icon9}
																		onClick={function (_e) {
																			rendererDataHook.setcurrentWarchingNodePath([...pathArray]);
																			setisOpenChatWindow(true);
																			setchatWindowPosition({
																				x: _e.clientX,
																				y: _e.clientY,
																			});
																		}}
																	></div>
																</Tooltip>
																<span></span>
															</>
														);
													}
													return null;
												})()}
												<Tooltip
													title="删除节点"
													placement="right"
													classes={{
														tooltip: styles.tpaaaaaaaaaaaaaa,
													}}
													followCursor={true}
												>
													<div
														className={styles.icon + " " + styles.icon3}
														onClick={function (_e) {
															deleteNode();
															_e.stopPropagation();
														}}
													></div>
												</Tooltip>
											</div>
										</>
									);
								}
								return null;
							})()}

							<div
								ref={wrapperDivRef}
								className={
									styles.eventWarpper +
									" " +
									(function () {
										/* 右键菜单被激发 */
										if (
											rendererDataHook.isOpenWarpperRightMenu &&
											rendererDataHook.currentMenuNodeObj.currentNodePath.join("") === pathArray.join("")
										) {
											return styles.showMenu;
										}
										//布局拖拽到接受层hover进去了的情况（layout）
										if (
											iscustomHover ||
											(iscustomHover &&
												rendererDataHook.currentDraggingNode &&
												rendererDataHook.currentDraggingNode.nodetype === "layout")
										) {
											return styles.dragHover;
										}
										//用于子节点的fakeHover(通用 layout和component)
										if (isCurrentHoverRef.current) {
											return styles.fakeHover;
										}
										if (node.nodetype === "layout" && rendererDataHook.mouseAction === "drag") {
											return styles.layoutDrag;
										}

										return "";
									})()
								}
								style={{
									width: wrapperRect.width + "px",
									height: wrapperRect.height + "px",
									left: wrapperRect.left + "px",
									top: wrapperRect.top + "px",
								}}
								onDrag={function (_e) {
									_e.preventDefault();
								}}
								onMouseDown={function (_e) {
									//如果互相在错误的模式里就自动切换
									switchWrongMode();
									/* 	if (
										(node.nodetype === "layout" && rendererDataHook.mouseMode === "layoutEdit") ||
										(node.nodetype === "component" && rendererDataHook.mouseMode === "componentEdit")
									) { */
									if (_e.button === 0) {
										//左键才触发拖拽
										if (node.name === "PageRoot") {
											toast.error("页面根节点无法被拖拽!");
											return;
										}
										rendererDataHook.onDragStart(node, pathArray);
										if (wrapperDivRef.current !== null) {
											let position = $(wrapperDivRef.current).offset();
											rendererDataHook.setdragBPosition({
												x: position.left,
												y: position.top,
											});
										}
									}
									/* } else {
									} */
								}}
								onContextMenu={(e) => {
									if (node.name === "PageRoot") {
										toast.error("页面根节点无法展开菜单!");
										e.preventDefault(); // 阻止系统默认右键菜单
										return;
									}
									//如果互相在错误的模式里就自动切换
									switchWrongMode();
									/* if (
										(node.nodetype === "layout" && rendererDataHook.mouseMode === "layoutEdit") ||
										(node.nodetype === "component" && rendererDataHook.mouseMode === "componentEdit")
									) { */
									rendererDataHook.setisOpenWarpperRightMenu(true);
									rendererDataHook.setcurrentMenuNodeObj({
										wrapperDivRef: wrapperDivRef.current,
										wrapperTitleRef: wrapperTitleRef.current,
										currentNodePath: pathArray,
										levelIndex: -1,
									});
									/* } else {
									} */
									e.preventDefault(); // 阻止系统默认右键菜单
								}}
								onMouseEnter={function () {
									if (!rendererDataHook.isOpenWarpperRightMenu) {
										rendererDataHook.genWarpperHoverChain(pathArray);
									}
								}}
								onMouseLeave={function () {
									if (!rendererDataHook.isOpenWarpperRightMenu) {
										rendererDataHook.clearWarpperHoverChain();
									}
								}}
							>
								{/* warpper标题 */}
								<div
									ref={wrapperTitleRef}
									className={styles.layerTitle}
									style={{
										//
										...getWarpperDivTitleTop(),
										marginLeft: warpperTitleLeft + "px",
									}}
								>
									{(function () {
										if (!isCurrentHoverRef.current || iscustomHover) {
											return `${node.name} - ${node.label} - ${node.nodeid} `;
										}
										return `${node.name}`;
									})()}
								</div>
							</div>
						</>
					);
				},
				[
					wrapperRect,
					node.nodetype,
					rendererDataHook.mouseMode,
					rendererDataHook.mouseAction,
					rendererDataHook.warpperhoverStateUpdateStamp,
					rendererDataHook.isOpenWarpperRightMenu,
					resizeTstamp,
					rendererDataHook.renderTreeObj.updaterenderTreeStamp,
					pathArray,
					warpperTitleLeft,
				]
			)}

			{/* 制造组件节点和拖拽事件接收器 */}
			{useMemo(
				function () {
					return getNode();
				},
				[
					//
					node,
					rendererDataHook.mouseAction,
					rendererDataHook.currentDraggingNode,
					rendererDataHook.renderTreeObj.updaterenderTreeStamp,
					iscustomHover,
					rendererDataHook.isEnterWarpper,
					rendererDataHook.warpperhoverStateUpdateStamp,
				]
			)}
			{/* 布局生成的聊天窗口 */}
			{isOpenChatWindow && (
				<ChatWindow
					isOpen={isOpenChatWindow}
					setisOpen={setisOpenChatWindow}
					chatInputContent={chatInputContent}
					setchatInputContent={setchatInputContent}
					chatWindowPosition={chatWindowPosition}
					submitLayout={submitLayout}
				/>
			)}
		</>
	);
};
//为防止在编译和混淆后，无法识别组件名称，所以在这里显示定义名称
Wrapper.displayName = "Wrapper";
export default memo(Wrapper);
