/**
 * 廖力编写
 * 模块名称：
 * 模块说明：
 * 编写时间：
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement, memo, useMemo } from "react";
import styles from "../index.module.scss";
import FastTextnput, { IFastTextInputProps, IFastTextInputRef } from "../../fastTextnput";
import ObjectEditor from "..";
import { makeCompleteText } from "renderer/lcSupport/lcsUtils";
import { Tooltip } from "@mui/material";
import JSONEditor from "../../jsonEditor";
import toast from "react-hot-toast";
import { useRendererDataContext } from "renderer/lcSupport/renderer";
import { findPropNode, findPropNodeValue } from "../utils";

/**
 * 传入参数
 */
export interface IEditorItemProps {
	/* 模式，数组还是对象 */
	mode: "Array" | "Object";
	/* 字段定义配置，用于进行自动提示 */
	nodeDefine?: { [propName: string]: any };
	/* 主属性名称 */
	mainPropName: string;
	/* 键 */
	objkey: string | number;
	/* 值 */
	value: any;
	/* 上级的路径 */
	parentPath: Array<string | number>;
	/* 更改key */
	modifyKey: (orgKey: string, currentData: { key: string; value: any }) => void;
	/* 更改value */
	modifyValue: (key: string | number, value: any) => void;
	/**删除key */
	deleteKey: (key: string | number) => void;
}

const EditorItem: FC<IEditorItemProps> = (
	{ mode, nodeDefine = {}, mainPropName, objkey, value, parentPath, modifyKey, modifyValue, deleteKey },
	_ref
): ReactElement => {
	//===============useHooks=================
	const renderData = useRendererDataContext();

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [obj, setobj] = useState<{ key: string | number; value: any }>({ key: objkey, value: value });
	const [completeTextArr, setcompleteTextArr] = useState<any>([]);
	const [valuecompleteTextArr, setvaluecompleteTextArr] = useState<any>([]);
	const [isOpenJsonEditor, setIsOpenJsonEditor] = useState<boolean>(false);
	//图片上传
	const [uploading, setUploading] = useState(false);

	//===============static===================
	//imagebb.com
	//使用的是国外的一个免费图床，后续如果介入后端可以考虑改成oss的方式
	const imagebbKey = "d7ed922120a108e3ba468a4b8699887c";

	//===============ref======================
	const valueFastTextnputRef = useRef<IFastTextInputRef | null>(null);
	const keyFastTextnputRef = useRef<IFastTextInputRef | null>(null);
	const uploadInputRef = useRef<HTMLInputElement | null>(null);

	//===============function=================

	/* 图片上传 */
	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setUploading(true);

		try {
			const formData = new FormData();
			formData.append("image", file);

			const res = await fetch(`https://api.imgbb.com/1/upload?key=${imagebbKey}`, {
				method: "POST",
				body: formData,
			});

			const result = await res.json();
			if (result.success) {
				const url = result.data.url;
				setIsOpenJsonEditor(false);
				let _obj = { ...obj };
				_obj.value = `url(${url})`;
				setobj(_obj);
				valueEnterUpdate(`url(${url})`);
				toast.success("✅ 上传成功:", url);
			} else {
				toast.error("上传失败，请检查图片大小或API Key是否正确");
			}
		} catch (error) {
			toast.error("上传错误:", error.message);
		} finally {
			setUploading(false);
		}
	};

	/* 
		key更新
	*/
	let keyEnterUpdate = function () {
		if (mode === "Object") {
			if (objkey === obj.key) {
				return;
			}
			if ((obj.key as string).trim() === "") {
				deleteKey(objkey as string);
			} else {
				modifyKey(objkey as string, { ...obj } as { key: string; value: any });
			}
		}
	};

	/* 
		value更新
	*/
	let valueEnterUpdate = function (value?: any) {
		let v = obj.value;
		if (typeof value !== "undefined") {
			v = value;
		}
		if (v === "") {
			//如果是数组，这部分被删干净了就直接删除了别更新了
			if (mode === "Array") {
				deleteKey(objkey);
				return;
			}
			keyFastTextnputRef.current.focus();
		}
		modifyValue(obj.key, v);
	};

	/* 
		制造子节点
	*/
	const makeChild = function () {
		if (isOpenJsonEditor) {
			return (
				<JSONEditor
					value={JSON.stringify(obj.value, null, 4)}
					close={function () {
						setIsOpenJsonEditor(false);
					}}
					submit={function (value) {
						try {
							setIsOpenJsonEditor(false);
							let _obj = { ...obj };
							_obj.value = JSON.parse(value);
							setobj(_obj);
							valueEnterUpdate(JSON.parse(value));
						} catch (_e) {
							toast.error("Json格式错误!请检查后再提交更改!");
						}
					}}
				></JSONEditor>
			);
		}
		if (Array.isArray(obj.value) && !isOpenJsonEditor) {
			let newPath = [...parentPath];
			newPath.push(objkey);
			let _nodeDefine = undefined;
			if (typeof nodeDefine[obj.key] !== "undefined" && typeof nodeDefine[obj.key][0] !== "undefined") {
				_nodeDefine = nodeDefine[obj.key][0];
			}
			return (
				<>
					<div className={styles.arrayIcon}>
						{"[    ]"}
						<Tooltip title={"Json编辑器"}>
							<span
								className={styles.spanJsonEditor}
								onClick={function () {
									setIsOpenJsonEditor(true);
								}}
							>
								k
							</span>
						</Tooltip>
						<Tooltip title={"删除数组"}>
							<span
								className={styles.spanClose}
								onClick={function () {
									deleteKey(objkey);
								}}
							>
								r
							</span>
						</Tooltip>
					</div>
					<ObjectEditor nodeDefine={_nodeDefine} mainPropName={mainPropName} nodeProps={[...obj.value]} path={newPath}></ObjectEditor>
				</>
			);
		}

		if (typeof obj.value === "object" && !isOpenJsonEditor) {
			let newPath = [...parentPath];
			newPath.push(objkey);
			return (
				<>
					<div className={styles.objIcon}>
						{"{    }"}
						<Tooltip title={"Json编辑器"}>
							<span
								className={styles.spanJsonEditor}
								onClick={function () {
									setIsOpenJsonEditor(true);
								}}
							>
								k
							</span>
						</Tooltip>
						<Tooltip title={"删除对象"}>
							<span
								className={styles.spanClose}
								onClick={function () {
									deleteKey(objkey);
								}}
							>
								r
							</span>
						</Tooltip>
					</div>
					<ObjectEditor nodeDefine={nodeDefine[obj.key]} mainPropName={mainPropName} nodeProps={{ ...obj.value }} path={newPath}></ObjectEditor>
				</>
			);
		}
		if (uploading) {
			return <div className={styles.con}>正在上传图片，请稍等..</div>;
		}
		return (
			<div className={styles.con}>
				<FastTextnput
					ref={valueFastTextnputRef}
					value={obj.value}
					classAdd={styles.valueStyle}
					completeClassAdd={styles.itemvalueComplete}
					onChange={function (v: any) {
						if (v === "{") {
							let _obj = { ...obj };
							_obj.value = {};
							setobj(_obj);
							modifyValue(obj.key, {});
							return;
						}
						if (v === "[") {
							let _obj = { ...obj };
							_obj.value = [];
							setobj(_obj);
							modifyValue(obj.key, []);
							return;
						}
						let _obj = { ...obj };
						_obj.value = v;
						setobj(_obj);
					}}
					onEnter={valueEnterUpdate}
					onLeftJump={function () {
						keyFastTextnputRef.current.focus();
					}}
					completeTexts={valuecompleteTextArr}
					isEnableTypeRec={true}
				></FastTextnput>
				{(function () {
					if (obj.key === "className") {
						return (
							<a
								onClick={function () {
									renderData.setisopenScssEditorWindow(true);
								}}
							>
								打开Scss编辑器
							</a>
						);
					}
					if (obj.key === "backgroundImage") {
						return (
							<>
								<a onClick={() => uploadInputRef.current?.click()}>上传图片</a>
								<input type="file" accept="image/*" style={{ display: "none" }} ref={uploadInputRef} onChange={handleFileChange} />
							</>
						);
					}
					return null;
				})()}
			</div>
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

	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted) {
				if (value === "") {
					valueFastTextnputRef.current.focus();
				}
			}
		},
		[isMounted]
	);

	useEffect(function (): ReturnType<React.EffectCallback> {
		return function (): void {
			setIsMounted(false);
		};
	}, []);

	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted) {
				setcompleteTextArr(makeCompleteText(nodeDefine));
			}
		},
		[isMounted, nodeDefine]
	);

	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted) {
				setvaluecompleteTextArr(makeCompleteText(nodeDefine[obj.key]));
			}
		},
		[isMounted, obj.key, nodeDefine]
	);

	useEffect(
		function (): ReturnType<React.EffectCallback> {
			debugger;
			let node = renderData.renderTreeObj.findNodeByPath(renderData.renderTreeObj.renderTree, renderData.settingPropsNodePath);
			if (!node) return;
			// 克隆 props 并处理深层结构（避免结构共享）
			let allProps = structuredClone(node[mainPropName]); // 这里推荐 JSON 方案，如果 structuredClone 结果被冻结可替换
			let currentPath = [...parentPath];
			currentPath.push(objkey);
			// 确保 findPropNode 路径存在
			let cp = findPropNodeValue(currentPath, allProps);
			if (cp) {
				if (JSON.stringify(cp) !== JSON.stringify(obj.value)) {
					let _obj = { ...obj };
					_obj.value = structuredClone(cp);
					setobj(_obj);
				}
			}
		},
		[renderData.renderTreeObj.updaterenderTreeStamp]
	);

	return (
		<>
			<div className={styles.editorItem}>
				{(function () {
					if (mode === "Array") {
						return <label>{obj.key}</label>;
					}
					return (
						<FastTextnput
							ref={keyFastTextnputRef}
							classAdd={(function () {
								if (Array.isArray(obj.value)) {
									return styles.blue;
								}
								if (typeof obj.value === "object") {
									return styles.red;
								}
								return styles.keyStyle;
							})()}
							completeClassAdd={styles.itemkeyComplete}
							value={obj.key as string}
							onChange={function (v) {
								let _obj = { ...obj };
								_obj.key = v;
								setobj(_obj);
							}}
							onEnter={keyEnterUpdate}
							onRightJump={function () {
								valueFastTextnputRef.current.focus();
							}}
							completeTexts={completeTextArr}
						></FastTextnput>
					);
				})()}
				<span
					className={(function () {
						if (Array.isArray(obj.value)) {
							return styles.blue;
						}
						if (typeof obj.value === "object") {
							return styles.red;
						}

						return "";
					})()}
				>
					:
				</span>
				<div className={styles.childContainer}>
					{useMemo(
						function () {
							return makeChild();
						},
						[JSON.stringify(obj), isOpenJsonEditor, renderData.renderTreeObj.updaterenderTreeStamp, uploading]
					)}
				</div>
			</div>
		</>
	);
};
export default memo(EditorItem);
