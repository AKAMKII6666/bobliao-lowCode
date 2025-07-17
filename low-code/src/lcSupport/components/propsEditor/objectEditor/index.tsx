/**
 * 廖力编写
 * 模块名称：
 * 模块说明：
 * 编写时间：
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement, memo, useMemo } from "react";
import styles from "./index.module.scss";
import FastTextnput, { IFastTextInputRef } from "../fastTextnput";
import { useRendererDataContext } from "renderer/lcSupport/renderer";
import EditorItem from "./com/editorItem";
import toast from "react-hot-toast";
import { makeCompleteText, sanitizeStyle } from "renderer/lcSupport/lcsUtils";
import { findPropNode, findPropNodeValue, setPropNode } from "./utils";

/**
 * 传入参数
 */
export interface iprops {
	/* 字段定义配置，用于进行自动提示 */
	nodeDefine?: { [propName: string]: any };
	/* 主属性名称 */
	mainPropName: string;
	/**
	 * 元素的属性
	 */
	nodeProps: { [propname: string]: any } | Array<any>;
	/**
	 * 属性路径
	 */
	path: Array<string | number>;
}

const ObjectEditor: FC<iprops> = ({ nodeDefine = {}, mainPropName, nodeProps, path }, _ref): ReactElement => {
	//===============useHooks=================
	const renderData = useRendererDataContext();

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [currentText, setcurrentText] = useState<string>("");
	const [currentProps, setcurrentProps] = useState<any>(nodeProps);
	const [completeTextArr, setcompleteTextArr] = useState<any>([]);

	//===============static===================

	//===============ref======================
	const mainInputRef = useRef<IFastTextInputRef | null>();

	//===============function=================

	/**
	 * 向指定路径添加新属性，保持不可变更新
	 * @param propName 要添加的属性名
	 */
	const addProp = function (propName: string) {
		if (path.length !== 0) {
			//避免给style节点设置上数字
			if (path[path.length - 1] === "style" && !isNaN(Number(propName))) {
				return;
			}
		}
		if (propName.trim() === "") return;
		if (typeof currentProps[propName] !== "undefined") {
			toast.error("已存在相同的属性!");
			return;
		}
		let node = renderData.renderTreeObj.findNodeByPath(renderData.renderTreeObj.renderTree, renderData.settingPropsNodePath);
		if (!node) return;

		// 克隆 props 并处理深层结构（避免结构共享）
		let allProps = structuredClone(node[mainPropName]); // 这里推荐 JSON 方案，如果 structuredClone 结果被冻结可替换

		// 确保 findPropNode 路径存在
		let cp = findPropNode(path, allProps);

		if (Array.isArray(cp)) {
			cp.push(propName);
		} else {
			// 添加属性
			cp[propName] = "";
		}

		try {
			JSON.stringify(allProps); // 检查是否可序列化
			renderData.renderTreeObj.modifyNodeProps(mainPropName, renderData.settingPropsNodePath, allProps);
			setcurrentProps(cp);
		} catch (e) {
			console.warn("props 结构非法：", e);
		}
	};

	/**
	 *更改key
	 */
	const modifyKey = function (orgKey: string, currentData: { key: string; value: any }) {
		if (currentData.key.trim() === "") return;
		if (path.length !== 0) {
			//避免给style节点设置上数字
			if (path[path.length - 1] === "style" && !isNaN(Number(currentData.key))) {
				return;
			}
		}

		const node = renderData.renderTreeObj.findNodeByPath(renderData.renderTreeObj.renderTree, renderData.settingPropsNodePath);
		if (!node) return;

		const allProps = structuredClone(node[mainPropName]); // 或 JSON.parse(JSON.stringify(node[mainPropName]))
		let cp = findPropNode(path, allProps);
		const oldValue = cp[orgKey];

		if (typeof oldValue === "undefined") return;

		// 构造新对象，保留原顺序
		const newObject: Record<string, any> = {};
		for (const [key, value] of Object.entries(cp)) {
			if (key === orgKey) {
				newObject[currentData.key] = value; // 插入新 key
			} else {
				newObject[key] = value;
			}
		}

		// 设置回 props 树中
		if (path.length === 0) {
			// 根节点直接替换 allProps
			renderData.renderTreeObj.modifyNodeProps(mainPropName, renderData.settingPropsNodePath, newObject);
			setcurrentProps(newObject);
		} else {
			const parent = findPropNode(path.slice(0, -1), allProps);
			const lastKey = path[path.length - 1];
			parent[lastKey] = newObject;

			try {
				JSON.stringify(allProps); // check
				renderData.renderTreeObj.modifyNodeProps(mainPropName, renderData.settingPropsNodePath, allProps);
				setcurrentProps(cp); // 注意：这里原来 cp 是旧对象，建议改为 newObject
			} catch (e) {
				console.warn("props 结构非法：", e);
			}
		}
	};

	/**
	 *更改value
	 */
	const modifyvalue = function (key: string | number, value: any) {
		if (key.toString().trim() === "") return;

		let node = renderData.renderTreeObj.findNodeByPath(renderData.renderTreeObj.renderTree, renderData.settingPropsNodePath);
		if (!node) return;

		// 克隆 props 并处理深层结构（避免结构共享）
		let allProps = structuredClone(node[mainPropName]); // 这里推荐 JSON 方案，如果 structuredClone 结果被冻结可替换

		// 确保 findPropNode 路径存在
		const cp = findPropNode(path, allProps);

		// 添加属性
		cp[key] = value;

		try {
			JSON.stringify(allProps); // 检查是否可序列化
			renderData.renderTreeObj.modifyNodeProps(mainPropName, renderData.settingPropsNodePath, allProps);
			setcurrentProps(cp);
		} catch (e) {
			console.warn("props 结构非法：", e);
		}
	};

	/**
	 *删除key
	 */
	const deleteKey = function (key: string | number) {
		debugger;
		if (key.toString().trim() === "") return;

		let node = renderData.renderTreeObj.findNodeByPath(renderData.renderTreeObj.renderTree, renderData.settingPropsNodePath);
		if (!node) return;

		// 克隆 props 并处理深层结构（避免结构共享）
		let allProps = structuredClone(node[mainPropName]); // 这里推荐 JSON 方案，如果 structuredClone 结果被冻结可替换

		// 确保 findPropNode 路径存在
		let cp = findPropNode(path, allProps);
		if (Array.isArray(cp)) {
			cp = cp.slice(0, key as number).concat(cp.slice((key as number) + 1));
			setPropNode(path, allProps, cp);
		} else {
			delete cp[key];
		}

		try {
			JSON.stringify(allProps); // 检查是否可序列化
			renderData.renderTreeObj.modifyNodeProps(mainPropName, renderData.settingPropsNodePath, allProps);
			setcurrentProps(cp);
		} catch (e) {
			console.warn("props 结构非法：", e);
		}
	};

	//===============effects==================
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted === false) {
				setIsMounted(true);
				if (mainInputRef.current) {
					mainInputRef.current.focus();
				}
			}
		},
		[isMounted]
	);

	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted) {
				let r = makeCompleteText(nodeDefine);
				if (r.length !== 0) {
					setcompleteTextArr(r);
				}
			}
		},
		[isMounted, nodeDefine]
	);

	useEffect(function (): ReturnType<React.EffectCallback> {
		return function (): void {
			setIsMounted(false);
		};
	}, []);

	useEffect(
		function (): ReturnType<React.EffectCallback> {
			let node = renderData.renderTreeObj.findNodeByPath(renderData.renderTreeObj.renderTree, renderData.settingPropsNodePath);
			if (!node) return;
			// 克隆 props 并处理深层结构（避免结构共享）
			let allProps = structuredClone(node[mainPropName]); // 这里推荐 JSON 方案，如果 structuredClone 结果被冻结可替换
			// 确保 findPropNode 路径存在
			let cp = findPropNodeValue(path, allProps);
			if (cp) {
				if (JSON.stringify(cp) !== JSON.stringify(currentProps)) {
					setcurrentProps(structuredClone(cp));
				}
			}
		},
		[renderData.renderTreeObj.updaterenderTreeStamp]
	);
	return (
		<>
			<div
				className={
					styles.container +
					" " +
					(function () {
						if (path.length > 0) {
							if (Array.isArray(currentProps)) {
								return styles.oc_array;
							}
							return styles.oc;
						}
						return "";
					})()
				}
			>
				{useMemo(
					function () {
						return (
							<div className={styles.eitemsContainer}>
								{(function () {
									let result = [];
									/* 数组的情况 */
									if (Array.isArray(currentProps)) {
										for (let objkey = 0; objkey < currentProps.length; objkey++) {
											result.push(
												<>
													<React.Fragment key={objkey + "_" + currentProps[objkey]}>
														<EditorItem
															mode="Array"
															nodeDefine={nodeDefine}
															mainPropName={mainPropName}
															objkey={objkey}
															value={currentProps[objkey]}
															parentPath={path}
															modifyKey={function () {}}
															modifyValue={modifyvalue}
															deleteKey={deleteKey}
														></EditorItem>
													</React.Fragment>
												</>
											);
										}
									} else {
										/* 对象的情况 */
										for (let objkey in currentProps) {
											if (currentProps.hasOwnProperty(objkey)) {
												result.push(
													<>
														<React.Fragment key={objkey}>
															<EditorItem
																mode="Object"
																nodeDefine={nodeDefine}
																mainPropName={mainPropName}
																objkey={objkey}
																value={currentProps[objkey]}
																parentPath={path}
																modifyKey={modifyKey}
																modifyValue={modifyvalue}
																deleteKey={deleteKey}
															></EditorItem>
														</React.Fragment>
													</>
												);
											}
										}
									}
									return result;
								})()}
							</div>
						);
					},
					[JSON.stringify(currentProps), renderData.renderTreeObj.updaterenderTreeStamp]
				)}

				<FastTextnput
					ref={mainInputRef}
					className={
						styles.bigInput +
						" " +
						(function () {
							if (currentText.length === 0) {
								return styles.placeholder;
							}
							return "";
						})()
					}
					value={currentText}
					onEnter={function () {
						addProp(currentText);
						setcurrentText("");
						mainInputRef.current.exitFocus();
					}}
					onEsc={function () {
						setcurrentText("");
						mainInputRef.current.exitFocus();
					}}
					onChange={function (v) {
						if (v.indexOf(":") !== -1 && v.indexOf(":") !== 0 && v.indexOf(":") === v.length - 1 && !Array.isArray(nodeProps)) {
							let _v = v.replace(":", "");
							addProp(_v);
							setcurrentText("");
							mainInputRef.current.exitFocus();
						} else {
							setcurrentText(v);
						}
					}}
					completeTexts={completeTextArr}
				/>
			</div>
		</>
	);
};
export default memo(ObjectEditor);
