/**
 * 廖力编写
 * 模块名称：
 * 模块说明：
 * 编写时间：
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement, useMemo } from "react";
import styles from "./index.module.scss";
import { useRendererDataContext } from "renderer/lcSupport/renderer";
import LayoutListWarpper from "../editorComList/com/layoutListWarpper";
import ComponentsListWarpper from "../editorComList/com/componentsListWarpper";

/**
 * 传入参数
 */
export interface iprops {}

const EditorDragCover: FC<iprops> = ({}, _ref): ReactElement => {
	//===============useHooks=================
	const rendererData = useRendererDataContext();

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [showTracyLayState, setshowTracyLayState] = useState<"hide" | "show" | "showing" | "hidding">("hide");

	//===============static===================

	//===============ref======================
	const timeOutRef = useRef<NodeJS.Timeout>(null);

	//===============function=================
	const loadData = async function (): Promise<void> {};

	const cleartimeOut = function () {
		if (timeOutRef.current !== null) {
			window.clearTimeout(timeOutRef.current);
		}
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

	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (rendererData.mouseAction === "drag") {
				cleartimeOut();
				setshowTracyLayState("showing");
				timeOutRef.current = setTimeout(() => {
					setshowTracyLayState("show");
				}, 400);
			} else {
				cleartimeOut();
				setshowTracyLayState("hidding");
				timeOutRef.current = setTimeout(() => {
					setshowTracyLayState("hide");
				}, 400);
			}
		},
		[rendererData.mouseAction]
	);

	useEffect(function (): ReturnType<React.EffectCallback> {
		return function (): void {
			setIsMounted(false);
		};
	}, []);

	return (
		<>
			<div
				onMouseEnter={function () {
					rendererData.onDragOut();
				}}
				onMouseUp={function () {
					rendererData.onDragEnd();
				}}
				className={
					styles.coverlayer +
					" " +
					(function () {
						if (rendererData.mouseAction === "drag") {
							return styles.show;
						}
						return "";
					})()
				}
			></div>
			<div
				className={
					styles.dragingItem +
					" " +
					(function () {
						if (rendererData.mouseAction === "drag") {
							return styles.show;
						}
						return "";
					})()
				}
				style={(function () {
					if (showTracyLayState === "show" || showTracyLayState === "showing") {
						return {
							top: rendererData.currentMousePosition.y - 50,
							left: rendererData.currentMousePosition.x + 50,
						};
					}
					if (showTracyLayState === "hidding") {
						return {
							top: rendererData.dragEndPosition.y,
							left: rendererData.dragEndPosition.x,
						};
					}
					return {
						top: rendererData.dragBPosition.y,
						left: rendererData.dragBPosition.x,
					};
				})()}
			>
				{useMemo(
					function () {
						if (rendererData.currentDraggingNode !== null) {
							if (rendererData.mouseMode === "layoutEdit") {
								return (
									<React.Fragment key={rendererData.currentDraggingNode.name}>
										<LayoutListWarpper item={rendererData.currentDraggingNode}></LayoutListWarpper>
									</React.Fragment>
								);
							}

							if (rendererData.mouseMode === "componentEdit") {
								return (
									<React.Fragment key={rendererData.currentDraggingNode.name}>
										<ComponentsListWarpper item={rendererData.currentDraggingNode}></ComponentsListWarpper>
									</React.Fragment>
								);
							}
						}
						return null;
					},
					[rendererData.currentDraggingNode]
				)}
			</div>
		</>
	);
};
export default EditorDragCover;
