/**
 * 廖力编写
 * 模块名称：组件垃圾桶
 * 模块说明：
 * 编写时间：
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import styles from "./index.module.scss";
import { useRendererDataContext } from "renderer/lcSupport/renderer";
import toast from "react-hot-toast";

/**
 * 传入参数
 */
export interface iprops {}

const NodeTrashBin: FC<iprops> = ({}, _ref): ReactElement => {
	//===============useHooks=================
	const renderData = useRendererDataContext();

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);

	//===============static===================

	//===============ref======================

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
				className={
					styles.container +
					" " +
					(function () {
						if (renderData.mouseAction === "drag" && renderData.currentDraggingNode.nodeid !== "") {
							return "";
						}
						return styles.hide;
					})()
				}
				onMouseUp={function (_e) {
					if (_e.button === 0) {
						renderData.onDragEnd("delete", {
							x: renderData.currentMousePosition.x,
							y: renderData.currentMousePosition.y,
						});
						toast.success("节点删除成功!");
					}
				}}
			>
				<div className={styles.t1}>拖放至此以</div>
				<div className={styles.t2}>删除节点</div>
				<div className={styles.t11}>松开鼠标以</div>
				<div className={styles.t22}>删除节点</div>
			</div>
		</>
	);
};
export default NodeTrashBin;
