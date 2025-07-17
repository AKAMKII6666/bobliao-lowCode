/**
 * 廖力编写
 * 模块名称：
 * 模块说明：
 * 编写时间：
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement, useMemo } from "react";
import { useRendererDataContext } from "renderer/lcSupport/renderer";
import styles from "./index.module.scss";
import Wrapper from "renderer/lcSupport/components/Wrapper";

/**
 * 传入参数
 */
export interface iprops {}

const EditorRender: FC<iprops> = ({}, _ref): ReactElement => {
	//===============useHooks=================
	const rendererData = useRendererDataContext();

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);

	//===============static===================

	//===============ref======================

	//===============function=================
	const bindOnscroll = async function (): Promise<void> {
		window.addEventListener("scroll", function (_e) {
			rendererData.setrContainerScrollTop(window.document.documentElement.scrollTop);
		});
	};

	//===============effects==================
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted === false) {
				setIsMounted(true);
				bindOnscroll();
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
					"bobliao_lc_editor_main_content_root " +
					styles.container +
					" " +
					(function () {
						if (rendererData.mouseAction === "drag") {
							return styles.dragging;
						}
						return "";
					})()
				}
				onScroll={function (_e) {}}
			>
				{useMemo(
					function () {
						//如果是编辑模式
						if (rendererData.mouseMode !== "none") {
							return (
								/* 通过托管组件托管渲染 */
								<Wrapper
									node={rendererData.renderTreeObj.renderTree}
									pathArray={[]}
								></Wrapper> /* rendererData.renderEditorElements(rendererData.renderTreeObj.renderTree) */
							);
						}

						return rendererData.renderEditorElements(rendererData.renderTreeObj.renderTree);
					},
					[rendererData.renderTreeObj.updaterenderTreeStamp, rendererData.mouseMode, rendererData.fakeFormik.values]
				)}
				{(function () {
					if (rendererData.isOpenWarpperRightMenu) {
						return (
							<div
								className={styles.rightMenuBackCover}
								onClick={function () {
									rendererData.setisOpenWarpperRightMenu(false);
								}}
							></div>
						);
					}
					return null;
				})()}
			</div>
		</>
	);
};
export default EditorRender;
