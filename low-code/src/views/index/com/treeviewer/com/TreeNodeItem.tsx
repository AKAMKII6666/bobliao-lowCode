/**
 * 廖力编写
 * 模块名称：树节点项组件
 * 模块说明：渲染单个树节点，显示节点信息和层级关系
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
	 * 渲染复制按钮
	 */
	const renderCopyButton = () => {
		if (node.name === "PageRoot") {
			return null; // 根节点不显示复制按钮
		}

		return (
			<Tooltip title="复制一个" placement="top">
				<div className={styles.copyButton} onClick={handleCopyClick}>
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
				<div className={styles.editButton} onClick={handleEditClick}>
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
				<div className={styles.deleteButton} onClick={handleDeleteClick}>
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
			className={`${styles.treeNodeItem} ${styles[getNodeTypeClassName(node.nodetype)]} ${isHovered ? styles.treeNodeItemHovered : ""}`}
			style={getIndentStyle(level)}
			onClick={handleToggleClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{/* 节点展开/折叠图标 */}
			<div className={styles.treeNodeToggle}>{renderToggleIcon()}</div>

			{/* 节点类型标识 */}
			<div className={`${styles.nodeTypeBadge} ${styles[getNodeTypeClassName(node.nodetype)]}`}>{getNodeTypeText(node.nodetype)}</div>

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

			{/* 属性编辑按钮 */}
			{renderEditButton()}
			{/* 复制按钮 */}
			{renderCopyButton()}
			{/* 删除按钮 */}
			{renderDeleteButton()}
		</div>
	);
};

export default TreeNodeItem;
