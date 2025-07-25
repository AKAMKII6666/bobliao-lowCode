/**
 * 廖力编写
 * 模块名称：
 * 模块说明：
 * 编写时间：
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import styles from "./index.module.scss";
import Editor, { OnMount } from "@monaco-editor/react";

/**
 * 传入参数
 */
export interface iprops {
	value: string;
	close: () => void;
	submit: (str: string) => void;
	mode: "" | "echartProps";
}

const JSONEditor: FC<iprops> = ({ value, close, submit, mode = "" }, _ref): ReactElement => {
	//===============useHooks=================

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [currentJson, setcurrentJson] = useState<string>("");
	const containerRef = useRef<HTMLDivElement>(null);
	const [height, setHeight] = useState(100); // 初始高度

	//===============static===================

	//===============ref======================
	const editorRef = useRef(null);

	//===============function=================
	function handleEditorDidMount(editor: any) {
		editorRef.current = editor;

		// 内容大小变化时更新高度
		editor.onDidContentSizeChange(() => {
			const contentHeight = editor.getContentHeight();
			setHeight(contentHeight);
		});

		// 首次设置
		setTimeout(() => {
			const contentHeight = editor.getContentHeight();
			setHeight(contentHeight);
		}, 0);

		// 👇关键：查找真实滚动元素
		setTimeout(() => {
			const domNode = editor.getDomNode();
			if (!domNode || !containerRef.current) return;

			const scrollEl = domNode.querySelector(".monaco-scrollable-element");
			if (!scrollEl) return;

			// 强制监听内部滚轮
			scrollEl.addEventListener(
				"wheel",
				(e: WheelEvent) => {
					e.stopPropagation();
					const cloned = new WheelEvent("wheel", e);
					containerRef.current?.dispatchEvent(cloned);
				},
				{ passive: false }
			);
		}, 0);
	}

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
			<div ref={containerRef} className={styles.container}>
				<Editor
					width={"auto"}
					height={height}
					defaultLanguage="json"
					defaultValue={""}
					value={value}
					theme="vs-dark"
					onChange={(val) => {
						setcurrentJson(val);
					}}
					options={{
						fontSize: 14,
						minimap: { enabled: false },
						automaticLayout: true,
						scrollBeyondLastLine: false,
						wordWrap: "off",
					}}
					onMount={handleEditorDidMount}
				/>
				<div className={styles.buttonContainer}>
					<div
						className={styles.button}
						onClick={function () {
							close();
						}}
					>
						取消
					</div>
					<div
						className={styles.button}
						onClick={function () {
							submit(currentJson);
						}}
					>
						提交
					</div>
				</div>
			</div>
		</>
	);
};
export default JSONEditor;
