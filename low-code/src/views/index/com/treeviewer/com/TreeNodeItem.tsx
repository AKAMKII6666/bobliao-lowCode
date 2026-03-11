/**
 * 廖力编写
 * 模块名称：树节点项组件
 * 模块说明：渲染单个树节点，显示节点信息和层级关系，支持拖拽功能
 * 编写时间：2025年1月
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import { ITreeNode } from "../../../../../lcSupport/interface/ItreeNode";
import styles from "../index.module.scss";
import { useRendererDataContext } from "../../../../../lcSupport/renderer";
import { Modal } from "antd";
import toast from "react-hot-toast";
import { Tooltip } from "@mui/material";
import { newGuid } from "MithalCommonLibrary/utils/utils";

/**
 * 传入参数
 */
export interface ITreeNodeItemProps {
	/**
	 * 当前节点数据
	 */
	node: ITreeNode;
	/**
	 * 当前层级（用于缩进）
	 */
	level: number;
	/**
	 * 节点路径
	 */
	path: number[];
	/**
	 * 是否展开状态
	 */
	isExpanded: boolean;
	/**
	 * 切换展开状态的回调函数
	 */
	onToggleExpand: (path: number[]) => void;
}

const TreeNodeItem: FC<ITreeNodeItemProps> = ({ node, level, path, isExpanded, onToggleExpand }): ReactElement => {
	//===============useHooks=================
	/**
	 * 获取渲染器数据上下文
	 */
	const renderData = useRendererDataContext();

	//===============state====================
	/**
	 * 组件挂载状态
	 */
	const [isMounted, setIsMounted] = useState<boolean>(false);

	/**
	 * 当前是否被hover状态
	 */
	const [isHovered, setIsHovered] = useState<boolean>(false);

	/**
	 * 当前节点是否正在被拖拽
	 */
	const [isDragging, setIsDragging] = useState<boolean>(false);

	/**
	 * 拖拽开始时的鼠标位置
	 */
	const [dragStartPosition, setDragStartPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

	/**
	 * 当前正在拖拽的节点数据
	 */
	const [draggingNode, setDraggingNode] = useState<ITreeNode | null>(null);

	//===============static===================

	//===============ref======================

	//===============function=================
	/**
	 * 获取节点类型显示文本
	 * @param nodetype 节点类型
	 * @returns 显示文本
	 */
	const getNodeTypeText = (nodetype: string): string => {
		switch (nodetype) {
			case "layout":
				return "布局";
			case "component":
				return "控件";
			default:
				return nodetype;
		}
	};

	/**
	 * 获取节点类型对应的样式类名
	 * @param nodetype 节点类型
	 * @returns 样式类名
	 */
	const getNodeTypeClassName = (nodetype: string): string => {
		switch (nodetype) {
			case "layout":
				return "nodeTypeLayout";
			case "component":
				return "nodeTypeComponent";
			default:
				return "nodeTypeDefault";
		}
	};

	/**
	 * 生成缩进样式
	 * @param level 层级
	 * @returns 缩进样式对象
	 */
	const getIndentStyle = (level: number) => {
		return {
			paddingLeft: `${level * 20}px`,
		};
	};

	/**
	 * 处理点击展开/收起事件
	 */
	const handleToggleClick = () => {
		if (node.children && node.children.length > 0) {
			onToggleExpand(path);
		}
	};

	/**
	 * 处理小三角的mousedown事件，阻止冒泡
	 */
	const handleToggleMouseDown = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	/**
	 * 处理按钮的mousedown事件，阻止冒泡
	 */
	const handleButtonMouseDown = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	/**
	 * 处理鼠标进入事件
	 */
	const handleMouseEnter = () => {
		renderData.genWarpperHoverChain(path);
	};

	/**
	 * 处理鼠标离开事件
	 */
	const handleMouseLeave = () => {
		renderData.clearWarpperHoverChain();
	};

	/**
	 * 处理拖拽开始事件
	 * @param e 鼠标事件
	 */
	const handleMouseDown = (e: React.MouseEvent) => {
		// 检查是否为根节点，根节点不允许拖拽
		if (node.name === "PageRoot") {
			toast.error("页面根节点无法拖拽!");
			return;
		}

		// 检查是否为右键点击，右键点击不触发拖拽
		if (e.button !== 0) {
			return;
		}

		// 阻止事件冒泡，避免触发其他事件
		e.stopPropagation();

		// 设置拖拽状态
		setIsDragging(true);
		setDragStartPosition({ x: e.clientX, y: e.clientY });
		setDraggingNode(node);

		// 通知父组件开始拖拽
		renderData.setIsTreeDragging(true);
		renderData.setDraggingNodeData(node);
		renderData.setDraggingNodePath(path);

		// 立即创建拖拽预览
		createDragPreview(e.clientX, e.clientY);
	};

	/**
	 * 创建拖拽预览
	 * @param mouseX 鼠标X坐标
	 * @param mouseY 鼠标Y坐标
	 */
	const createDragPreview = (mouseX: number, mouseY: number) => {
		// 创建预览元素
		const previewElement = document.createElement("div");
		previewElement.id = "drag-preview";
		previewElement.style.position = "fixed";
		previewElement.style.left = `${mouseX + 10}px`;
		previewElement.style.top = `${mouseY - 10}px`;
		previewElement.style.zIndex = "1003"; // 提高到事件接受层之上
		previewElement.style.pointerEvents = "none";
		previewElement.style.opacity = "0.8";
		previewElement.style.transform = "scale(0.9)";
		previewElement.style.background = "#ffffff";
		previewElement.style.border = "2px solid #1976d2";
		previewElement.style.borderRadius = "4px";
		previewElement.style.padding = "8px 12px";
		previewElement.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
		previewElement.style.fontSize = "13px";
		previewElement.style.fontWeight = "600";
		previewElement.style.color = "#333";
		previewElement.style.whiteSpace = "nowrap";
		previewElement.style.maxWidth = "200px";
		previewElement.style.overflow = "hidden";
		previewElement.style.textOverflow = "ellipsis";

		// 设置预览内容
		previewElement.textContent = `${node.name} - ${node.label}`;

		// 创建全屏透明层
		const overlayElement = document.createElement("div");
		overlayElement.id = "drag-overlay";
		overlayElement.style.position = "fixed";
		overlayElement.style.left = "0";
		overlayElement.style.top = "0";
		overlayElement.style.width = "100vw";
		overlayElement.style.height = "100vh";
		overlayElement.style.zIndex = "1000";
		overlayElement.style.backgroundColor = "transparent";
		overlayElement.style.cursor = "grabbing";

		// 添加鼠标移动监听器到透明层
		const handleMouseMove = (e: MouseEvent) => {
			const element = document.getElementById("drag-preview");
			if (element) {
				element.style.left = `${e.clientX + 10}px`;
				element.style.top = `${e.clientY - 10}px`;
			}
		};

		// 添加鼠标抬起监听器到透明层
		const handleMouseUp = () => {
			cleanupDragPreview();

			// 清理拖拽状态
			setIsDragging(false);
			setDraggingNode(null);
			setDragStartPosition({ x: 0, y: 0 });

			// 通知父组件结束拖拽
			renderData.setIsTreeDragging(false);
			renderData.setDraggingNodeData(null);
			renderData.setDraggingNodePath(null);
		};

		// 将事件监听器绑定到透明层
		overlayElement.addEventListener("mousemove", handleMouseMove);
		overlayElement.addEventListener("mouseup", handleMouseUp);

		// 添加到页面
		document.body.appendChild(previewElement);
		document.body.appendChild(overlayElement);

		// 存储预览元素引用
		renderData.setDragPreviewElement(previewElement);

		// 存储清理函数
		const cleanup = () => {
			overlayElement.removeEventListener("mousemove", handleMouseMove);
			overlayElement.removeEventListener("mouseup", handleMouseUp);

			const previewEl = document.getElementById("drag-preview");
			const overlayEl = document.getElementById("drag-overlay");

			if (previewEl && previewEl.parentNode) {
				previewEl.parentNode.removeChild(previewEl);
			}
			if (overlayEl && overlayEl.parentNode) {
				overlayEl.parentNode.removeChild(overlayEl);
			}

			// 清理dropZone元素
			if (renderData.dropZonesRef.current) {
				renderData.dropZonesRef.current.forEach((dropZone) => {
					if (dropZone && dropZone.parentNode) {
						dropZone.parentNode.removeChild(dropZone);
					}
				});
				renderData.dropZonesRef.current = [];
			}
		};

		renderData.dragPreviewCleanupRef.current = cleanup;
	};

	/**
	 * 清理拖拽预览
	 */
	const cleanupDragPreview = () => {
		if (renderData.dragPreviewCleanupRef.current) {
			renderData.dragPreviewCleanupRef.current();
			renderData.dragPreviewCleanupRef.current = null;
			renderData.setDragPreviewElement(null);
		}

		// 清理dropZone元素
		if (renderData.dropZonesRef.current) {
			renderData.dropZonesRef.current.forEach((dropZone) => {
				if (dropZone && dropZone.parentNode) {
					dropZone.parentNode.removeChild(dropZone);
				}
			});
			renderData.dropZonesRef.current = [];
		}
	};

	/**
	 * 处理拖拽结束事件（在事件接受层上释放）
	 * @param e 鼠标事件
	 * @param position 插入位置类型
	 */
	const handleDropZoneMouseUp = (e: React.MouseEvent, position: string) => {
		// 检查是否正在拖拽
		if (renderData.isTreeDragging === false) {
			return;
		}

		// 检查拖拽的节点是否存在
		if (renderData.draggingNodeData === null) {
			return;
		}

		// 阻止事件冒泡
		e.stopPropagation();

		// 根据插入位置执行相应的移动操作
		switch (position) {
			case "before":
				moveNodeBefore();
				break;
			case "inside":
				moveNodeInside();
				break;
			case "after":
				moveNodeAfter();
				break;
			default:
				console.warn("未知的插入位置类型:", position);
				break;
		}

		// 清理拖拽状态
		cleanupDragState();
	};

	/**
	 * 将节点移动到当前节点之前
	 */
	const moveNodeBefore = () => {
		// 获取拖拽节点的路径
		const draggingPath = renderData.draggingNodePath;
		if (draggingPath === null) {
			return;
		}

		// 创建新节点（深拷贝）
		const newNode = structuredClone(renderData.draggingNodeData);
		newNode.nodeid = newGuid();
		newNode.isTached = true;

		// 删除原节点
		renderData.renderTreeObj.deleteNode(draggingPath);

		// 在当前节点位置插入新节点
		renderData.renderTreeObj.insertNodeAt(newNode, path);

		// 保存树结构
		renderData.renderTreeObj.emitAndSaveTree();
		toast.success("节点移动成功！");
	};

	/**
	 * 将节点移动到当前节点内部
	 */
	const moveNodeInside = () => {
		// 检查当前节点是否为布局节点
		if (node.nodetype !== "layout") {
			toast.error("只能将节点移动到布局容器内！");
			return;
		}

		// 获取拖拽节点的路径
		const draggingPath = renderData.draggingNodePath;
		if (draggingPath === null) {
			return;
		}

		// 创建新节点（深拷贝）
		const newNode = structuredClone(renderData.draggingNodeData);
		newNode.nodeid = newGuid();
		newNode.isTached = true;

		// 删除原节点
		renderData.renderTreeObj.deleteNode(draggingPath);

		// 在当前节点内部添加新节点
		renderData.renderTreeObj.addNode(path, newNode);

		// 保存树结构
		renderData.renderTreeObj.emitAndSaveTree();
		toast.success("节点移动成功！");
	};

	/**
	 * 将节点移动到当前节点之后
	 */
	const moveNodeAfter = () => {
		// 获取拖拽节点的路径
		const draggingPath = renderData.draggingNodePath;
		if (draggingPath === null) {
			return;
		}

		// 创建新节点（深拷贝）
		const newNode = structuredClone(renderData.draggingNodeData);
		newNode.nodeid = newGuid();
		newNode.isTached = true;

		// 删除原节点
		renderData.renderTreeObj.deleteNode(draggingPath);

		// 计算插入位置（当前节点之后）
		const insertPath = [...path];
		insertPath[insertPath.length - 1] = insertPath[insertPath.length - 1] + 1;

		// 在当前节点之后插入新节点
		renderData.renderTreeObj.insertNodeAt(newNode, insertPath);

		// 保存树结构
		renderData.renderTreeObj.emitAndSaveTree();
		toast.success("节点移动成功！");
	};

	/**
	 * 清理拖拽状态
	 */
	const cleanupDragState = () => {
		// 清理拖拽预览
		cleanupDragPreview();

		// 清理本地拖拽状态
		setIsDragging(false);
		setDraggingNode(null);
		setDragStartPosition({ x: 0, y: 0 });

		// 通知父组件结束拖拽
		renderData.setIsTreeDragging(false);
		renderData.setDraggingNodeData(null);
		renderData.setDraggingNodePath(null);
	};

	/**
	 * 处理删除按钮点击事件
	 */
	const handleDeleteClick = (e: React.MouseEvent) => {
		e.stopPropagation(); // 阻止事件冒泡，避免触发展开/收起

		// 检查是否为根节点
		if (node.name === "PageRoot") {
			toast.error("页面根节点无法删除!");
			return;
		}

		Modal.confirm({
			title: "删除节点",
			width: "600px",
			content: (
				<>
					<p>确认删除以下节点吗？</p>
					<p>{`${node.name} - ${node.label} - ${node.nodeid}`}</p>
					<p>此节点以及其以下所有子节点都将被删除！</p>
				</>
			),
			okText: "确认删除",
			cancelText: "取消",
			onOk() {
				renderData.renderTreeObj.deleteNode(path);
				renderData.renderTreeObj.emitAndSaveTree();
				toast.success("节点删除成功！");
			},
			onCancel() {},
		});
	};

	/**
	 * 处理属性编辑按钮点击事件
	 */
	const handleEditClick = (e: React.MouseEvent) => {
		e.stopPropagation(); // 阻止事件冒泡，避免触发展开/收起

		// 检查是否为根节点
		if (node.name === "PageRoot") {
			toast.error("页面根节点无法编辑!");
			return;
		}

		// 打开属性编辑面板
		renderData.editNodeProps(node, path);
	};

	/**
	 * 处理复制按钮点击事件
	 */
	const handleCopyClick = (e: React.MouseEvent) => {
		e.stopPropagation(); // 阻止事件冒泡，避免触发展开/收起

		// 检查是否为根节点
		if (node.name === "PageRoot") {
			toast.error("页面根节点无法复制!");
			return;
		}

		// 创建新节点（深拷贝）
		const newNode = structuredClone(node);
		newNode.nodeid = newGuid();
		newNode.isTached = true;

		// 获取父节点路径
		const parentPath = [...path];
		parentPath.pop();

		// 在父节点下添加新节点
		renderData.renderTreeObj.addNode(parentPath, newNode);
		renderData.renderTreeObj.emitAndSaveTree();

		toast.success("节点复制成功！");
	};

	/**
	 * 渲染展开/收起图标
	 */
	const renderToggleIcon = () => {
		if (node.children && node.children.length > 0) {
			if (isExpanded) {
				return <span className={styles.toggleIconExpanded}>▼</span>;
			} else {
				return <span className={styles.toggleIcon}>▶</span>;
			}
		} else {
			return <span className={styles.toggleIconPlaceholder}>•</span>;
		}
	};

	/**
	 * 渲染拖拽事件接受层
	 */
	const renderDropZones = () => {
		// 检查是否正在拖拽
		if (renderData.isTreeDragging === false) {
			return null;
		}

		// 检查拖拽的节点是否为当前节点本身
		const draggingPath = renderData.draggingNodePath;
		if (draggingPath !== null && draggingPath.join("") === path.join("")) {
			return null; // 不能拖拽到自己身上
		}

		// 创建事件接受层到body
		createDropZones();

		return null; // 不返回JSX，因为dropZone现在在body下
	};

	/**
	 * 创建事件接受层
	 */
	const createDropZones = () => {
		// 获取当前节点元素的位置
		const nodeElement = document.querySelector(`[data-node-path="${path.join("-")}"]`);
		if (!nodeElement) {
			return;
		}

		const rect = nodeElement.getBoundingClientRect();

		// 创建事件接受层
		const dropZones = [
			{ position: "before", top: rect.top - 10, left: rect.left, width: rect.width, height: 20 },
			{ position: "after", top: rect.bottom - 10, left: rect.left, width: rect.width, height: 20 },
		];

		// 如果是布局节点，添加内部接受层
		if (node.nodetype === "layout") {
			dropZones.push({
				position: "inside",
				top: rect.top + rect.height / 2 - 15,
				left: rect.left,
				width: rect.width,
				height: 30,
			});
		}

		// 创建并添加dropZone元素
		dropZones.forEach((zone) => {
			const dropZone = document.createElement("div");
			dropZone.className = styles.dropZone;
			dropZone.setAttribute("data-position", zone.position);
			dropZone.style.position = "fixed";
			dropZone.style.top = `${zone.top}px`;
			dropZone.style.left = `${zone.left}px`;
			dropZone.style.width = `${zone.width}px`;
			dropZone.style.height = `${zone.height}px`;
			dropZone.style.zIndex = "1002";
			dropZone.style.backgroundColor = "rgba(25, 118, 210, 0.1)";
			dropZone.style.border = "2px dashed #1976d2";
			dropZone.style.borderRadius = "4px";
			dropZone.style.cursor = "pointer";
			dropZone.style.transition = "all 0.2s ease";
			dropZone.style.opacity = "0";

			// 根据位置设置不同的样式
			if (zone.position === "inside") {
				dropZone.style.backgroundColor = "rgba(76, 175, 80, 0.1)";
				dropZone.style.borderColor = "#4caf50";
			}

			// 添加hover效果
			dropZone.addEventListener("mouseenter", () => {
				dropZone.style.opacity = "0.5";
				if (zone.position === "inside") {
					dropZone.style.backgroundColor = "rgba(76, 175, 80, 0.2)";
					dropZone.style.borderColor = "#388e3c";
				} else {
					dropZone.style.backgroundColor = "rgba(25, 118, 210, 0.2)";
					dropZone.style.borderColor = "#1565c0";
				}
			});

			dropZone.addEventListener("mouseleave", () => {
				dropZone.style.opacity = "0";
				if (zone.position === "inside") {
					dropZone.style.backgroundColor = "rgba(76, 175, 80, 0.1)";
					dropZone.style.borderColor = "#4caf50";
				} else {
					dropZone.style.backgroundColor = "rgba(25, 118, 210, 0.1)";
					dropZone.style.borderColor = "#1976d2";
				}
			});

			// 添加mouseup事件
			dropZone.addEventListener("mouseup", (e) => {
				e.stopPropagation();
				handleDropZoneMouseUp(e as any, zone.position);
			});

			// 添加到body
			document.body.appendChild(dropZone);

			// 存储dropZone引用，用于清理
			if (!renderData.dropZonesRef.current) {
				renderData.dropZonesRef.current = [];
			}
			renderData.dropZonesRef.current.push(dropZone);
		});
	};

	/**
	 * 渲染复制按钮
	 */
	const renderCopyButton = () => {
		if (node.name === "PageRoot") {
			return null; // 根节点不显示复制按钮
		}

		return (
			<Tooltip title="复制一个" placement="top">
				<div className={styles.copyButton} onClick={handleCopyClick} onMouseDown={handleButtonMouseDown}>
					<span className={styles.copyIcon}>+1</span>
				</div>
			</Tooltip>
		);
	};

	/**
	 * 渲染属性编辑按钮
	 */
	const renderEditButton = () => {
		if (node.name === "PageRoot") {
			return null; // 根节点不显示编辑按钮
		}

		return (
			<Tooltip title="编辑属性" placement="top">
				<div className={styles.editButton} onClick={handleEditClick} onMouseDown={handleButtonMouseDown}>
					<span className={styles.editIcon}>⚙</span>
				</div>
			</Tooltip>
		);
	};

	/**
	 * 渲染删除按钮
	 */
	const renderDeleteButton = () => {
		if (node.name === "PageRoot") {
			return null; // 根节点不显示删除按钮
		}

		return (
			<Tooltip title="删除节点" placement="top">
				<div className={styles.deleteButton} onClick={handleDeleteClick} onMouseDown={handleButtonMouseDown}>
					<span className={styles.deleteIcon}>×</span>
				</div>
			</Tooltip>
		);
	};

	/**
	 * 渲染节点标签
	 */
	const renderNodeLabel = () => {
		if (node.label) {
			return <span className={styles.nodeLabel}>({node.label})</span>;
		}
		return null;
	};

	/**
	 * 渲染节点ID
	 */
	const renderNodeId = () => {
		if (node.nodeid) {
			return <span className={styles.nodeId}>#{node.nodeid}</span>;
		}
		return null;
	};

	/**
	 * 渲染子节点数量
	 */
	const renderChildrenCount = () => {
		if (node.children && node.children.length > 0) {
			return <span className={styles.childrenCount}>{node.children.length}个子项</span>;
		}
		return null;
	};

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

	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (renderData.currentwarpperhoverChainRef.current[path.join("")]) {
				setIsHovered(true);
			} else {
				setIsHovered(false);
			}
		},
		[renderData.currentwarpperhoverChainRef.current, renderData.warpperhoverStateUpdateStamp]
	);

	return (
		<div
			className={`${styles.treeNodeItem} ${styles[getNodeTypeClassName(node.nodetype)]} ${isHovered ? styles.treeNodeItemHovered : ""} ${renderData.isTreeDragging && renderData.draggingNodePath !== null && renderData.draggingNodePath.join("") === path.join("") ? styles.treeNodeItemDragging : ""}`}
			style={getIndentStyle(level)}
			onClick={handleToggleClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onMouseDown={handleMouseDown}
			data-node-path={path.join("-")}
		>
			{/* 节点展开/折叠图标 */}
			<div className={styles.treeNodeToggle} onMouseDown={handleToggleMouseDown}>
				{renderToggleIcon()}
			</div>

			{/* 节点类型标识 */}
			<div className={`${styles.nodeTypeBadge} ${styles[getNodeTypeClassName(node.nodetype)]}`} onMouseDown={handleButtonMouseDown}>
				{getNodeTypeText(node.nodetype)}
			</div>

			{/* 节点主要信息 - 一行显示 */}
			<div className={styles.nodeMainInfo}>
				{/* 组件名称 */}
				<span className={styles.nodeName}>{node.name}</span>

				{/* 节点标签 */}
				{renderNodeLabel()}

				{/* 节点ID */}
				{renderNodeId()}

				{/* 子节点数量 - 移到同一行 */}
				{renderChildrenCount()}
			</div>

			{/* 拖拽事件接受层 */}
			{renderDropZones()}

			{/* 复制按钮 */}
			{renderCopyButton()}
			{/* 属性编辑按钮 */}
			{renderEditButton()}
			{/* 删除按钮 */}
			{renderDeleteButton()}
		</div>
	);
};

export default TreeNodeItem;
