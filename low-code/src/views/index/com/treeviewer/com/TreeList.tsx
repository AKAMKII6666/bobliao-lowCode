/**
 * 廖力编写
 * 模块名称：树形列表组件
 * 模块说明：递归渲染树形结构，展示渲染树的层级关系，支持拖拽功能
 * 编写时间：2025年1月
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import { ITreeNode } from "../../../../../lcSupport/interface/ItreeNode";
import TreeNodeItem from "./TreeNodeItem";
import styles from "../index.module.scss";
import { useRendererDataContext } from "../../../../../lcSupport/renderer";

/**
 * 传入参数
 */
export interface ITreeListProps {
	/**
	 * 树形数据
	 */
	treeData: ITreeNode;
	/**
	 * 更新戳，用于触发重新渲染
	 */
	updateStamp: number;
}

const TreeList: FC<ITreeListProps> = ({ treeData, updateStamp }): ReactElement => {
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
	 * 展开状态管理
	 * 使用路径字符串作为key来存储每个节点的展开状态
	 * 默认展开所有节点
	 */
	const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

	//===============static===================

	//===============ref======================

	//===============function=================
	/**
	 * 初始化所有节点的展开状态
	 * @param node 当前节点
	 * @param path 当前路径
	 */
	const initializeExpandedNodes = (node: ITreeNode, path: number[] = []) => {
		const pathKey = path.join("-");
		setExpandedNodes((prev) => {
			const newSet = new Set(prev);
			newSet.add(pathKey);
			return newSet;
		});

		// 递归处理子节点
		if (node.children && node.children.length > 0) {
			node.children.forEach((child, index) => {
				initializeExpandedNodes(child, [...path, index]);
			});
		}
	};

	/**
	 * 切换节点展开状态
	 * @param path 节点路径
	 */
	const handleToggleExpand = (path: number[]) => {
		const pathKey = path.join("-");
		setExpandedNodes((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(pathKey)) {
				newSet.delete(pathKey);
			} else {
				newSet.add(pathKey);
			}
			return newSet;
		});
	};

	/**
	 * 检查节点是否展开
	 * @param path 节点路径
	 * @returns 是否展开
	 */
	const isNodeExpanded = (path: number[]): boolean => {
		const pathKey = path.join("-");
		return expandedNodes.has(pathKey);
	};

	/**
	 * 处理全局鼠标抬起事件，用于结束拖拽
	 */
	const handleGlobalMouseUp = () => {
		// 检查是否正在拖拽
		if (renderData.isTreeDragging === true) {
			// 延迟清理，避免与拖拽预览的mouseup冲突
			setTimeout(() => {
				// 清理拖拽预览
				if (renderData.dragPreviewCleanupRef.current) {
					renderData.dragPreviewCleanupRef.current();
					renderData.dragPreviewCleanupRef.current = null;
					renderData.setDragPreviewElement(null);
				}

				// 清理拖拽状态
				renderData.setIsTreeDragging(false);
				renderData.setDraggingNodeData(null);
				renderData.setDraggingNodePath(null);
			}, 100);
		}
	};

	/**
	 * 递归渲染树节点
	 * @param node 当前节点
	 * @param level 当前层级（用于缩进）
	 * @param path 节点路径
	 * @returns 渲染的JSX元素
	 */
	const renderTreeNode = (node: ITreeNode, level: number = 0, path: number[] = []): ReactElement => {
		const currentPath = path;
		const isExpanded = isNodeExpanded(currentPath);

		return (
			<div key={node.nodeid || `node-${path.join("-")}`}>
				{/* 渲染当前节点 */}
				<TreeNodeItem node={node} level={level} path={path} isExpanded={isExpanded} onToggleExpand={handleToggleExpand} />
				{/* 递归渲染子节点 */}
				{(() => {
					if (node.children && node.children.length > 0 && isExpanded) {
						return (
							<div className={styles.treeChildren}>
								{node.children.map(function (child, index) {
									return renderTreeNode(child, level + 1, [...path, index]);
								})}
							</div>
						);
					}
					return null;
				})()}
			</div>
		);
	};

	//===============effects==================
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted === false) {
				setIsMounted(true);
				// 初始化时展开所有节点
				initializeExpandedNodes(treeData);
			}
		},
		[isMounted, treeData]
	);

	useEffect(function (): ReturnType<React.EffectCallback> {
		return function (): void {
			setIsMounted(false);
		};
	}, []);

	return (
		<div className={styles.treeListContainer}>
			{/* 渲染根节点及其所有子节点 */}
			{renderTreeNode(treeData)}
		</div>
	);
};

export default TreeList;
