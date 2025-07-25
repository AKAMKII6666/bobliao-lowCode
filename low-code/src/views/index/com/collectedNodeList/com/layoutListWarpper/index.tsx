/**
 * 廖力编写
 * 模块名称：
 * 模块说明：
 * 编写时间：
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement, memo } from "react";
import styles from "../../index.module.scss";
import { ITreeNode } from "renderer/lcSupport/interface/ItreeNode";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import { useRendererDataContext } from "renderer/lcSupport/renderer";
import { produce } from "immer";
import useJquery from "@bobliao/use-jquery-hook";
import { Tooltip } from "@mui/material";
import { IcollectingItem } from "renderer/lcSupport/interface/renderer";

/**
 * 传入参数
 */
export interface iprops {
	item: IcollectingItem;
}

const LayoutListWarpper: FC<iprops> = ({ item }): ReactElement => {
	//===============useHooks=================
	const rendererData = useRendererDataContext();
	const $ = useJquery();

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);

	//===============static===================

	//===============ref======================
	const currentItemContainerRef = useRef<HTMLDivElement | null>(null);

	//===============function=================
	const loadData = async function (): Promise<void> {};

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

	return (
		<>
			<div
				ref={currentItemContainerRef}
				className={styles.comItem}
				onDrag={function (_e) {
					_e.preventDefault();
				}}
			>
				<Tooltip title={"删除收藏项目"}>
					<div
						className={styles.close}
						onClick={function () {
							rendererData.deleteCollectedNode(item.node);
						}}
					>
						r
					</div>
				</Tooltip>
				<Tooltip title={"获取此项渲染树"}>
					<div
						className={styles.watch}
						onClick={function () {
							rendererData.watchCollectedNode(item);
						}}
					>
						b
					</div>
				</Tooltip>
				<div
					className={styles.eventCover}
					onDrag={function (_e) {
						_e.preventDefault();
					}}
					onMouseDown={function () {
						let _item = produce(item.node, function (item) {
							return item;
						});
						rendererData.onDragStart(_item, null, "collectedItemDrag", item.classes);
						if (currentItemContainerRef.current !== null) {
							let position = $(currentItemContainerRef.current).offset();
							rendererData.setdragBPosition({
								x: position.left,
								y: position.top,
							});
						}
					}}
				></div>
				<div
					className={styles.itemView}
					onDrag={function (_e) {
						_e.preventDefault();
					}}
				>
					<BackupTableIcon className={styles.icon}></BackupTableIcon>
				</div>
				<div
					onDrag={function (_e) {
						_e.preventDefault();
					}}
					className={styles.itemTitle}
				>
					{item.node.label}
				</div>
			</div>
		</>
	);
};
export default memo(LayoutListWarpper);
