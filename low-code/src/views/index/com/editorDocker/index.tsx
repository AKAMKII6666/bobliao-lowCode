/**
 * 廖力编写
 * 模块名称：
 * 模块说明：
 * 编写时间：
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import styles from "./index.module.scss";
import { useRendererDataContext } from "renderer/lcSupport/renderer";
import useJquery from "@bobliao/use-jquery-hook";
import { TEditorMode } from "renderer/lcSupport/interface/renderer";
import { Tooltip } from "@mui/material";
import QrCodeIcon from "@mui/icons-material/QrCode";
import CodeIcon from "@mui/icons-material/Code";
import GridViewIcon from "@mui/icons-material/GridView";
import toast from "react-hot-toast";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";

/**
 * 传入参数
 */
export interface iprops {}

const EditorDocker: FC<iprops> = ({}, _ref): ReactElement => {
	//===============useHooks=================
	const $ = useJquery();
	const rendererData = useRendererDataContext();

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [currentIndex, setcurrentIndex] = useState<number>(0);
	const [currentleft, setcurrentleft] = useState<number>(0);
	const [resizeTstamp, setresizeTstamp] = useState<number>(-1);
	const [containerLeft, setcontainerLeft] = useState<number>(0);

	//===============static===================
	const buttonGroup = [
		{
			name: "预览操作模式 (Ctrl+1)",
			icon: styles.icon1,
			mode: "none",
		},
		{
			name: "布局编辑模式 (Ctrl+2)",
			icon: styles.icon2,
			mode: "layoutEdit",
		},
		{
			name: "组件编辑模式 (Ctrl+3)",
			icon: styles.icon3,
			mode: "componentEdit",
		},
	];

	//===============ref=====================
	let buttonsRef = useRef<HTMLDivElement[]>([]);
	let containerRef = useRef<HTMLDivElement>();
	const resizeObserverRef = useRef<ResizeObserver | null>(null);

	//===============function=================

	/* 获得并计算位置 */
	const getPosition = function () {
		setcontainerLeft($(window).width() / 2 - $(containerRef.current).outerWidth() / 2);
	};

	/**
	 *创建reasize
	 */
	const createResizeObserver = function () {
		if (typeof $(containerRef.current!).parent()[0] !== "undefined") {
			let element = $(containerRef.current!).parent()[0];
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

	//===============effects==================
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted === false) {
				setIsMounted(true);
				//创建resize
				createResizeObserver();
				setresizeTstamp(+new Date());
			}
		},
		[isMounted]
	);

	useEffect(function (): ReturnType<React.EffectCallback> {
		return function (): void {
			//清除resize
			clearObserver();
			setIsMounted(false);
		};
	}, []);

	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted === true && buttonsRef.current.length !== 0) {
				let _tarLeft = $(buttonsRef.current[currentIndex]).position().left + $(buttonsRef.current[currentIndex]).outerWidth();
				setcurrentleft(_tarLeft);
			}
		},
		[currentIndex, isMounted]
	);

	useEffect(
		function (): ReturnType<React.EffectCallback> {
			buttonGroup.map(function (item, index) {
				if (item.mode === rendererData.mouseMode) {
					setcurrentIndex(index);
				}
			});
		},
		[rendererData.mouseMode, isMounted]
	);
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			getPosition();
		},
		[resizeTstamp, rendererData.mouseMode]
	);

	return (
		<>
			{/* 外围 */}
			<div
				ref={containerRef}
				className={styles.outsiderContainer}
				style={{
					bottom: (function () {
						if (rendererData.mouseAction === "drag") {
							return "-70px";
						}
						return "";
					})(),
					left: containerLeft,
				}}
			>
				{/* 模式选择 */}
				<div className={styles.container}>
					<div className={styles.containerInsider}>
						{(function () {
							buttonsRef.current = [];
							return buttonGroup.map(function (item, index) {
								let elem = (
									<React.Fragment key={item.name}>
										<Tooltip
											title={item.name}
											classes={{
												tooltip: styles.tip,
											}}
											followCursor={true}
										>
											<div
												ref={(el) => {
													if (el) {
														buttonsRef.current.push(el);
													}
												}}
												className={
													styles.icon +
													" " +
													item.icon +
													" " +
													(function () {
														if (item.mode === rendererData.mouseMode) {
															return styles.selected;
														}
														return "";
													})()
												}
												onClick={function () {
													rendererData.setMouseMode(item.mode as TEditorMode);
													toast.success(`已切换为${item.name}!`);
												}}
											></div>
										</Tooltip>
									</React.Fragment>
								);
								return elem;
							});
						})()}
						<div className={styles.selectedFlg} style={{ left: currentleft + "px" }}></div>
					</div>
				</div>
				{/* 组件投放和代码生成 */}
				<div className={styles.container}>
					<div className={styles.containerInsider}>
						{/* 组件工具打开按钮 */}
						{(function () {
							if (rendererData.mouseMode === "none") {
								return null;
							}
							return (
								<>
									<Tooltip
										title={rendererData.mouseMode === "componentEdit" ? "用户控件列表 (Ctrl+Alt+i)" : "布局组件列表 (Ctrl+Alt+i)"}
										classes={{
											tooltip: styles.tip,
										}}
										followCursor={true}
									>
										<div
											className={
												styles.blockIcon +
												" " +
												(function () {
													if (rendererData.isopenBucket) {
														return styles.selected;
													}
													return "";
												})()
											}
											onClick={function () {
												rendererData.setisopenBucket(!rendererData.isopenBucket);
											}}
										>
											{(function () {
												if (rendererData.mouseMode === "componentEdit") {
													return <GridViewIcon></GridViewIcon>;
												}
												return <QrCodeIcon></QrCodeIcon>;
											})()}
										</div>
									</Tooltip>
								</>
							);
						})()}

						{/* Scss编辑按钮 */}
						<Tooltip
							title={"Scss编辑 (Ctrl+Alt+s)"}
							classes={{
								tooltip: styles.tip,
							}}
							followCursor={true}
						>
							<div
								className={
									styles.blockIcon +
									" " +
									(function () {
										if (rendererData.isopenScssEditorWindow) {
											return styles.selected;
										}
										return "";
									})()
								}
								onClick={function () {
									rendererData.setisopenScssEditorWindow(!rendererData.isopenScssEditorWindow);
								}}
							>
								<SettingsEthernetIcon></SettingsEthernetIcon>
							</div>
						</Tooltip>

						{/* 代码生成打开按钮 */}
						<Tooltip
							title={"代码生成 (Ctrl+Alt+c)"}
							classes={{
								tooltip: styles.tip,
							}}
							followCursor={true}
						>
							<div
								className={
									styles.blockIcon +
									" " +
									(function () {
										if (rendererData.isopenCodeWindow) {
											return styles.selected;
										}
										return "";
									})()
								}
								onClick={function () {
									rendererData.setisopenCodeWindow(!rendererData.isopenCodeWindow);
								}}
							>
								<CodeIcon></CodeIcon>
							</div>
						</Tooltip>
					</div>
				</div>
			</div>
		</>
	);
};
export default EditorDocker;
