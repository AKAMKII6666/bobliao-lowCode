/**
 * 廖力编写
 * 模块名称：代码生成窗口
 * 模块说明：
 * 编写时间：
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import styles from "./index.module.scss";
import WindowLay from "renderer/lcSupport/components/windowLay/windowLay";
import CodeIcon from "@mui/icons-material/Code";
import { useRendererDataContext } from "renderer/lcSupport/renderer";
import Editor from "@monaco-editor/react";
import { produce } from "immer";
import Loading from "MithalCommonLibrary/Loading";

/**
 * 传入参数
 */
export interface iprops {}

const WatchRenderertreeWindow: FC<iprops> = ({}, _ref): ReactElement => {
	//===============useHooks=================
	const renderData = useRendererDataContext();

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [renderertreeTextnput, setRenderertreeTextnput] = useState<string>("");

	//===============static===================

	//===============ref======================

	//===============function=================
	const importRenderertree = function () {
		renderData.inputRenderertree(renderertreeTextnput);
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
						<div className={styles.item}>
							<CodeIcon></CodeIcon>
							<span>查看渲染树</span>
						</div>
					</div>
				}
				isShow={renderData.isopenNoderenderertree}
				onClose={function () {
					renderData.setisopenNoderenderertree(false);
				}}
				background={{ enabled: false, bgClose: false }}
				style={{
					top: "5px",
					left: "5px",
					right: "5px",
					bottom: "5px",
					zIndex: "555",
					width: "auto",
				}}
			>
				<>
					<textarea
						className={styles.import}
						value={renderertreeTextnput}
						onChange={function (e) {
							setRenderertreeTextnput(e.target.value);
						}}
					></textarea>
					<div className={styles.importTitle} onClick={importRenderertree}>
						导入渲染树
					</div>
					<textarea
						className={styles.export}
						value={JSON.stringify(
							JSON.stringify({
								node: JSON.parse(renderData.tempNodeRendererTree),
								classes: renderData.tempNodecssstyle,
							})
								.replace(/\s+/g, "")
								.replace(/\\n/g, "")
						)}
						onChange={function () {}}
					></textarea>
					<div className={styles.codeContainer}>
						<div className={styles.left}>
							<Editor
								height="100%"
								theme="vs-dark"
								language="json"
								loading={<Loading />}
								value={renderData.tempNodeRendererTree}
								options={{
									tabSize: 4,
									insertSpaces: true,
									detectIndentation: false,
									readOnly: true,
								}}
								onMount={(editor, monaco) => {
									const oldModel = editor.getModel();
									if (oldModel) {
										const newModel = monaco.editor.createModel(
											oldModel.getValue(),
											"json", // ✅ 正确语言类型
											monaco.Uri.parse("file:///temp.json") // ✅ URI 必须 .json，才能激活 JSON mode
										);
										editor.setModel(newModel);
									}

									// ✅ 如果你不希望有任何报错提示（比如 JSON 格式不严谨）
									monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
										validate: false, // ❌ 关闭 JSON 校验
									});
								}}
							/>
						</div>
						<div className={styles.right}>
							<Editor
								height="100%" // By default, it fully fits with its parent
								theme="vs-dark"
								language={"scss"}
								loading={<Loading></Loading>}
								value={renderData.tempNodecssstyle}
								options={{
									tabSize: 4, // 缩进宽度（比如 2 空格）
									insertSpaces: true, // 是否使用空格代替 tab（推荐 true）
									detectIndentation: false, // 是否根据文件内容自动检测缩进（设为 false 才能强制使用上面两个值）
									readOnly: true, // 可选
								}}
							/>
						</div>
					</div>
				</>
			</WindowLay>
		</>
	);
};
export default WatchRenderertreeWindow;
