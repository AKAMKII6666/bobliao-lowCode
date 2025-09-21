/**
 * 廖力编写
 * 模块名称：树形列表查看器
 * 模块说明：用于展示当前编辑器里的渲染树的状态，在窗口中显示树形结构
 * 编写时间：2025年1月
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement, useMemo, memo } from "react";
import styles from "./index.module.scss";
import { useRendererDataContext } from "../../../../lcSupport/renderer";
import FreeWindow from "../../../../lcSupport/components/freeWindowLay";
import TreeList from "./com/TreeList";

/**
 * 传入参数
 */
export interface iprops {}

const TreeViewer: FC<iprops> = ({}, _ref): ReactElement => {
	//===============useHooks=================
	/**
	 * 获取渲染器数据上下文
	 * 用于访问当前渲染树的状态
	 */
	const renderData = useRendererDataContext();

	//===============state====================
	/**
	 * 组件挂载状态
	 */
	const [isMounted, setIsMounted] = useState<boolean>(false);

	/**
	 * 窗口位置状态
	 */
	const [windowPosition, setWindowPosition] = useState<{ top: number; left: number }>({
		top: 0,
		left: 0,
	});

	//===============static===================
	const windowWidth = 600; // 窗口宽度
	const windowHeight = 500; // 窗口高度
	const bottomMargin = 130; // 距离底部距离

	//===============ref======================

	//===============function=================
	/**
	 * 计算窗口位置
	 * 让窗口出现在屏幕底部，距离底部50px，水平居中
	 */
	const calculateWindowPosition = () => {
		const screenWidth = window.innerWidth;
		const screenHeight = window.innerHeight;

		const top = screenHeight - windowHeight - bottomMargin;
		const left = screenWidth / 2 - windowWidth / 2;

		return { top, left };
	};

	/**
	 * 生成树形列表内容
	 * @returns 树形列表的JSX内容
	 */
	const makeTreeContent = function () {
		return (
			<div className={styles.treeViewerContainer}>
				<div className={styles.treeViewerContent}>
					{/* 渲染树形列表组件 */}
					<TreeList treeData={renderData.renderTreeObj.renderTree} updateStamp={renderData.renderTreeObj.updaterenderTreeStamp} />
				</div>
			</div>
		);
	};

	//===============effects==================
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted === false) {
				setIsMounted(true);
				// 计算并设置窗口位置
				const position = calculateWindowPosition();
				setWindowPosition(position);
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
	 * 监听窗口大小变化，重新计算位置
	 */
	useEffect(() => {
		const handleResize = () => {
			const position = calculateWindowPosition();
			setWindowPosition(position);
		};

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<>
			<FreeWindow
				title="渲染树(元素列表)"
				size={{ width: windowWidth, height: windowHeight }}
				isShow={renderData.isopenTreeViewer}
				onclose={function () {
					// 关闭窗口的处理逻辑
					renderData.setisopenTreeViewer(false);
				}}
				background={false}
				position={windowPosition}
				style={{
					zIndex: 201,
				}}
			>
				<div id="treeViewerContainer">
					{useMemo(makeTreeContent, [renderData.renderTreeObj.updaterenderTreeStamp, renderData.warpperhoverStateUpdateStamp])}
				</div>
			</FreeWindow>
		</>
	);
};
export default memo(TreeViewer);
