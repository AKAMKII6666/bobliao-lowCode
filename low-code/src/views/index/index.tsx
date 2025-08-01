/**
 * 廖力编写
 * 模块名称：
 * 模块说明：
 * 编写时间：
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import styles from "./index.module.scss";
import DARendererDataProviderLayout, { useRendererDataContext } from "renderer/lcSupport/renderer";
import EditorRender from "./com/editorRender";
import EditorComList from "./com/editorComList";
import EditorDocker from "./com/editorDocker";
import EditorDragCover from "./com/editorDragCover";
import NodeTrashBin from "./com/nodeTrashBin";
import { Toaster } from "react-hot-toast"; // 导入 Toaster
import WindowLay from "renderer/lcSupport/components/windowLay/windowLay";
import CodeGenWindow from "./com/codeGenWindow";
import PropsEditor from "./com/propsEditor";
import NodeEditArea from "./com/nodeEditArea";
import ScssEditor from "./com/scssEditor";
import CollectNodeList from "./com/collectedNodeList";
import WatchRenderertreeWindow from "./com/watchRenderertreeWindow";
import LayoutGenLay from "./com/layoutGenLay";
/**
 * 传入参数
 */
export interface iprops {}

const Insider: FC<iprops> = ({}): ReactElement => {
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
			<style dangerouslySetInnerHTML={{ __html: renderData.currentInjectCssContent }}></style>
			{/* 编辑器渲染器 */}
			<EditorRender></EditorRender>
			<EditorDocker></EditorDocker>
			<EditorDragCover></EditorDragCover>
			<NodeTrashBin></NodeTrashBin>
			<NodeEditArea></NodeEditArea>
			{/* 编辑器组件列表 */}
			<EditorComList></EditorComList>
			{/* 收藏的组件列表 */}
			<CollectNodeList></CollectNodeList>
			{/* 代码生成窗口 */}
			{(function () {
				if (renderData.isopenCodeWindow) {
					return <CodeGenWindow></CodeGenWindow>;
				}
				return null;
			})()}
			{/* 渲染树查看窗口 */}
			{(function () {
				if (renderData.isopenNoderenderertree) {
					return <WatchRenderertreeWindow></WatchRenderertreeWindow>;
				}
				return null;
			})()}
			{/* 属性编辑器 */}
			<PropsEditor></PropsEditor>
			{/* scss编辑器 */}
			<ScssEditor></ScssEditor>

			{/* 布局生成窗口 */}
			{(function () {
				if (renderData.isGeneratingContent) {
					return <LayoutGenLay></LayoutGenLay>;
				}
				return null;
			})()}
		</>
	);
};

const Index: FC<iprops> = ({}, _ref): ReactElement => {
	//===============useHooks=================

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
			<DARendererDataProviderLayout>
				<Insider></Insider>
			</DARendererDataProviderLayout>
		</>
	);
};
export default Index;
