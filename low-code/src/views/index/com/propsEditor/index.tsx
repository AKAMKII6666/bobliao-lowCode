/**
 * 廖力编写
 * 模块名称：代码生成窗口
 * 模块说明：
 * 编写时间：
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement, useMemo } from "react";
import styles from "./index.module.scss";
import { useRendererDataContext } from "renderer/lcSupport/renderer";
import FreeWindow from "renderer/lcSupport/components/freeWindowLay";
import ObjectEditor from "renderer/lcSupport/components/propsEditor/objectEditor";
import { componentsPropsDefine } from "renderer/lcSupport/propsDefineFiles";
import MithrilTextArea from "MithalCommonLibrary/MithrilTextArea";

/**
 * 传入参数
 */
export interface iprops {}

const PropsEditor: FC<iprops> = ({}, _ref): ReactElement => {
	//===============useHooks=================
	const renderData = useRendererDataContext();

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);

	//===============static===================

	//===============ref======================

	//===============function=================

	const makeEditorContent = function () {
		return (
			<>
				<div className={styles.propTitle}>节点名称(label)</div>
				{(function () {
					if (renderData.currentSettingNode && renderData.settingPropsNodePath) {
						let node = renderData.renderTreeObj.findNodeByPath(renderData.renderTreeObj.renderTree, renderData.settingPropsNodePath);

						if (node) {
							return (
								<MithrilTextArea
									style={{
										width: "100%",
										border: 0,
										borderRadius: "0px",
									}}
									maxLength={500}
									value={node.label}
									onChange={function (e) {
										renderData.renderTreeObj.modifyNodeProps("label", renderData.settingPropsNodePath, e.target.value);
									}}
								></MithrilTextArea>
							);
						}
					}
					return null;
				})()}

				<div className={styles.propTitle}>节点属性(props)</div>
				{(function () {
					if (renderData.currentSettingNode && renderData.settingPropsNodePath) {
						let node = renderData.renderTreeObj.findNodeByPath(renderData.renderTreeObj.renderTree, renderData.settingPropsNodePath);

						if (node) {
							let baseProp = node.props;
							let nodeDefine = componentsPropsDefine[node.name];
							if (typeof nodeDefine === "undefined") {
								nodeDefine = {};
							}
							return <ObjectEditor nodeDefine={nodeDefine} mainPropName={"props"} nodeProps={baseProp} path={[]}></ObjectEditor>;
						}
					}
					return null;
				})()}

				{(function () {
					if (renderData.currentSettingNode && renderData.settingPropsNodePath) {
						let node = renderData.renderTreeObj.findNodeByPath(renderData.renderTreeObj.renderTree, renderData.settingPropsNodePath);
						let parentPath = [...renderData.settingPropsNodePath];
						parentPath.pop();
						let nodeParent = renderData.renderTreeObj.findNodeByPath(renderData.renderTreeObj.renderTree, parentPath);

						if (node && nodeParent.name === "AutoForm" && node.autoFormItemProps) {
							let baseProp = node.autoFormItemProps;
							let nodeDefine = componentsPropsDefine["AutoForm"].items[0];
							if (typeof nodeDefine === "undefined") {
								nodeDefine = {};
							}
							return (
								<>
									<div className={styles.propTitle} style={{ margin: "10px 0px 0px 0px" }}>
										AutoForm子节点属性(autoFormItemProps)
									</div>
									<ObjectEditor nodeDefine={nodeDefine} mainPropName={"autoFormItemProps"} nodeProps={baseProp} path={[]}></ObjectEditor>
								</>
							);
						}
					}
					return null;
				})()}

				{(function () {
					if (renderData.currentSettingNode && renderData.settingPropsNodePath) {
						let node = renderData.renderTreeObj.findNodeByPath(renderData.renderTreeObj.renderTree, renderData.settingPropsNodePath);
						let parentPath = [...renderData.settingPropsNodePath];
						parentPath.pop();
						let nodeParent = renderData.renderTreeObj.findNodeByPath(renderData.renderTreeObj.renderTree, parentPath);

						if (node && nodeParent.name === "CommonInquery" && node.commonInqueryItemProps) {
							let baseProp = node.commonInqueryItemProps;
							let nodeDefine = componentsPropsDefine["CommonInquery"].items[0];
							if (typeof nodeDefine === "undefined") {
								nodeDefine = {};
							}
							return (
								<>
									<div className={styles.propTitle} style={{ margin: "10px 0px 0px 0px" }}>
										CommonInquery子节点属性(commonInqueryItemProps)
									</div>
									<ObjectEditor nodeDefine={nodeDefine} mainPropName={"commonInqueryItemProps"} nodeProps={baseProp} path={[]}></ObjectEditor>
								</>
							);
						}
					}
					return null;
				})()}

				<div
					style={{
						height: "200px",
						overflow: "hidden",
					}}
				></div>
			</>
		);
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
			<FreeWindow
				title={(function () {
					if (renderData.currentSettingNode !== null) {
						return (
							"编辑节点属性 -  " +
							renderData.currentSettingNode.name +
							"  -  " +
							renderData.currentSettingNode.label +
							"  -  " +
							renderData.currentSettingNode.nodeid
						);
					}
					return "";
				})()}
				isShow={renderData.isOpenPropswindow}
				onclose={function () {
					renderData.closePropsEditor();
				}}
				position={{
					top: renderData.currentMousePosition.y,
					left: renderData.currentMousePosition.x,
				}}
			>
				{useMemo(makeEditorContent, [renderData.renderTreeObj.updaterenderTreeStamp, renderData.currentSettingNode, renderData.settingPropsNodePath])}
			</FreeWindow>
		</>
	);
};
export default PropsEditor;
