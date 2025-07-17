/**
 * 廖力编写
 * 模块名称：
 * 模块说明：
 * 编写时间：
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import styles from "./index.module.scss";
import QrCodeIcon from "@mui/icons-material/QrCode";
import GridViewIcon from "@mui/icons-material/GridView";
import { useRendererDataContext } from "renderer/lcSupport/renderer";
import { components } from "renderer/lcSupport/lcsUtils";
import LayoutListWarpper from "./com/layoutListWarpper";
import ComponentsListWarpper from "./com/componentsListWarpper";
import WindowLay from "renderer/lcSupport/components/windowLay/windowLay";
import { Tooltip } from "@mui/material";

/**
 * 传入参数
 */
export interface iprops {}

const EditorComList: FC<iprops> = ({}, _ref): ReactElement => {
	//===============useHooks=================
	const rendererData = useRendererDataContext();

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
			<WindowLay
				title={
					<div className={styles.header}>
						{(function () {
							if (rendererData.mouseMode === "componentEdit") {
								return <GridViewIcon></GridViewIcon>;
							}
							return <QrCodeIcon></QrCodeIcon>;
						})()}
						<span>{rendererData.mouseMode === "componentEdit" ? "用户控件列表" : "布局组件列表"}</span>
					</div>
				}
				isShow={rendererData.isopenBucket && rendererData.mouseAction === "free" && rendererData.mouseMode !== "none"}
				onClose={function () {
					rendererData.setisopenBucket(false);
				}}
				background={{ enabled: false, bgClose: false }}
				size={{
					width: "806px",
					height: "438px",
				}}
				style={{
					bottom: "100px",
				}}
			>
				<div
					className={styles.container}
					style={(function () {
						if (rendererData.mouseMode === "none") {
							return { width: "0", opacity: "0" };
						}
						return {};
					})()}
				>
					{(function () {
						if (rendererData.mouseMode === "layoutEdit") {
							return (
								<>
									<div className={styles.cardContainer}>
										{components.map(function (item, index) {
											if (item.nodetype === "layout") {
												return (
													<React.Fragment key={item.name + "_" + index}>
														<LayoutListWarpper item={item}></LayoutListWarpper>
													</React.Fragment>
												);
											}
											return null;
										})}
									</div>
								</>
							);
						}

						if (rendererData.mouseMode === "componentEdit") {
							return (
								<>
									<div className={styles.cardContainer}>
										{components.map(function (item, index) {
											if (item.nodetype === "component") {
												return (
													<React.Fragment key={item.name + "_" + index}>
														<ComponentsListWarpper item={item}></ComponentsListWarpper>
													</React.Fragment>
												);
											}
											return null;
										})}
									</div>
								</>
							);
						}

						if (rendererData.mouseMode === "none") {
							return null;
						}
						return null;
					})()}
					{/*  */}
				</div>
			</WindowLay>
		</>
	);
};
export default EditorComList;
