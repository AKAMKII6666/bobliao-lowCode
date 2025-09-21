/**
 * 廖力编写
 * 模块名称：
 * 模块说明：
 * 编写时间：
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import styles from "../../index.module.scss";
import { useRendererDataContext } from "renderer/lcSupport/renderer";
import { Tooltip } from "@mui/material";
import { ITreeNode } from "renderer/lcSupport/interface/ItreeNode";

/**
 * 传入参数
 */
export interface IPropChildWarpperProps {
	/**
	 * 矩形区域参数
	 */
	rect: {
		width: number;
		height: number;
		top: number;
		left: number;
	};
	/**
	 * 子节点
	 */
	childItem: ITreeNode;
	/**
	 * 路径数组
	 */
	pathArray: number[];
	/**
	 * 删除事件
	 */
	onDelete: () => void;
	/**
	 * 鼠标进入事件
	 */
	onMouseEnter: (_e: React.MouseEvent<HTMLDivElement>) => void;
	/**
	 * 鼠标离开事件
	 */
	onMouseLeave: (_e: React.MouseEvent<HTMLDivElement>) => void;
	/**
	 * 鼠标按下事件
	 */
	onMouseDown: (_e: React.MouseEvent<HTMLDivElement>) => void;
	/**
	 * 鼠标抬起事件
	 */
	onMouseUp: (_e: React.MouseEvent<HTMLDivElement>) => void;
	/**
	 * 右键菜单事件
	 */
	onContextMenu: (_e: React.MouseEvent<HTMLDivElement>) => void;
}

const PropChildWarpper: FC<IPropChildWarpperProps> = (
	{
		//参数
		rect,
		childItem,
		pathArray,
		onDelete,
		onMouseEnter,
		onMouseLeave,
		onMouseDown,
		onMouseUp,
		onContextMenu,
	},
	_ref
): ReactElement => {
	//===============useHooks=================
	const rendererDataHook = useRendererDataContext();

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [isCurrentHover, setIsCurrentHover] = useState<boolean>(false);

	//===============static===================

	//===============ref======================
	const wrapperDivRef = useRef<HTMLDivElement>(null);
	const wrapperTitleRef = useRef<HTMLDivElement>(null);

	//===============function=================
	const loadData = async function (): Promise<void> {};

	//===============effects==================
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted === false) {
				setIsMounted(true);
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

	useEffect(function (): ReturnType<React.EffectCallback> {
		return function (): void {
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

	/**当warpperhover或者被动hover */
	const checkWarpperHoverOrPassiveHover = function () {
		let warpperItem = rendererDataHook.currentwarpperhoverChainRef.current[pathArray.join("")];
		if (typeof warpperItem !== "undefined") {
			if (typeof warpperItem.isCurrent !== "undefined" && warpperItem.isCurrent) {
				setIsCurrentHover(true);
			} else {
				setIsCurrentHover(false);
			}
		} else {
			setIsCurrentHover(false);
		}
	};

	return (
		<>
			<div
				ref={wrapperDivRef}
				key={childItem.nodeid}
				className={`${styles.autoformItemReciverLay} ${isCurrentHover ? styles.customHover : ""}`}
				style={(function () {
					if (rendererDataHook.mouseAction === "drag" && rendererDataHook.currentDraggingNode && rendererDataHook.currentDraggingNode.nodeid === "") {
						return {
							width: 0,
							height: 0,
							top: -100,
							left: -100,
							display: "none",
						};
					}
					return rect;
				})()}
				onMouseEnter={function (_e) {
					rendererDataHook.genWarpperHoverChain(pathArray);
					onMouseEnter(_e);
				}}
				onMouseLeave={function (_e) {
					rendererDataHook.clearWarpperHoverChain();
					onMouseLeave(_e);
				}}
				onMouseDown={function (_e) {
					rendererDataHook.clearWarpperHoverChain();
					onMouseDown(_e);
				}}
				onMouseUp={function (_e) {
					onMouseUp(_e);
				}}
				onContextMenu={(e) => {
					rendererDataHook.clearWarpperHoverChain();
					onContextMenu(e);
				}}
			>
				<Tooltip
					title={"删除" + childItem.name + "组件"}
					placement="right"
					classes={{
						tooltip: styles.tipautofrom,
					}}
					followCursor={true}
				>
					<div
						ref={wrapperTitleRef}
						className={styles.delete}
						onClick={function (_e) {
							onDelete();
							_e.stopPropagation();
						}}
						onMouseDown={function (_e) {
							_e.stopPropagation();
						}}
						onMouseUp={function (_e) {
							_e.stopPropagation();
						}}
					>
						{" "}
						-{" "}
					</div>
				</Tooltip>
				<label>{`${childItem.name} - ${childItem.label} - ${childItem.nodeid} `}</label>
				<span>{`${childItem.name} `}</span>
			</div>
		</>
	);
};
export default PropChildWarpper;
