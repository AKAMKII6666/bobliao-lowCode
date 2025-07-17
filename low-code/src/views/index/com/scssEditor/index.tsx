/**
 * 廖力编写
 * 模块名称：
 * 模块说明：
 * 编写时间：
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import styles from "./index.module.scss";
import FreeWindow from "renderer/lcSupport/components/freeWindowLay";
import Editor, { OnMount } from "@monaco-editor/react";
import { useRendererDataContext } from "renderer/lcSupport/renderer";
import useJquery from "@bobliao/use-jquery-hook";

/**
 * 传入参数
 */
export interface iprops {}

const ScssEditor: FC<iprops> = ({}, _ref): ReactElement => {
	//===============useHooks=================
	const renderData = useRendererDataContext();
	const $ = useJquery();

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);

	//===============static===================

	//===============ref======================

	//===============function=================
	const handleEditorMount: OnMount = (editor, monaco) => {};

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
			<FreeWindow
				title={"编辑页面Scss"}
				isShow={renderData.isopenScssEditorWindow}
				position={{
					top: $(window).height() * 0.1,
					left: $(window).width() * 0.9,
				}}
				onclose={function () {
					renderData.setisopenScssEditorWindow(false);
				}}
				size={{
					width: $(window).width() * 0.2,
					height: $(window).height() - $(window).height() * 0.2,
				}}
				background={false}
			>
				<div className={styles.editor}>
					<Editor
						width={"100%"}
						height={"100%"}
						defaultLanguage="scss"
						defaultValue={renderData.currentScssCode}
						value={renderData.currentScssCode}
						theme="vs-dark"
						onChange={(val) => {
							renderData.setcurrentScssCode(val);
						}}
						options={{
							fontSize: 14,
							minimap: { enabled: true },
							automaticLayout: true,
							scrollBeyondLastLine: false,
							wordWrap: "on",
						}}
						onMount={handleEditorMount}
					/>
				</div>
			</FreeWindow>
		</>
	);
};
export default ScssEditor;
