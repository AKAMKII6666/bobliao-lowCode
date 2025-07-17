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
}

const JSONEditor: FC<iprops> = ({ value, close, submit }, _ref): ReactElement => {
	//===============useHooks=================

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [currentJson, setcurrentJson] = useState<string>("");

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
			<div className={styles.container}>
				<Editor
					width={"auto"}
					height={"200px"}
					defaultLanguage="json"
					defaultValue={""}
					value={value}
					theme="vs-light"
					onChange={(val) => {
						setcurrentJson(val);
					}}
					options={{
						fontSize: 14,
						minimap: { enabled: true },
						automaticLayout: true,
						scrollBeyondLastLine: false,
						wordWrap: "off",
					}}
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
