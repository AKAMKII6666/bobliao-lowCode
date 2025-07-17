/**
 * 廖力编写
 * 模块名称：formik值变动处理钩子
 * 模块说明：
 * 		`useFormikValueChanges` 是一个基于 `Formik` 的自定义 Hook，用于在表单中实现值变更联动处理。
 * 当指定字段发生变更时，可根据配置规则自动更新其他字段的值，并支持结合动态选项列表进行数据处理和填充。
 * 此组件可能依赖useDynamicSelectionsParams钩子
 * 编写时间：2025-05-16 10:30:48 星期五
 */
import { useFormik } from "formik";
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import useDynamicSelectionsParams from "./dynamicSelectionsParamsHook";

/* 配置项接口 */
export interface IuseFormikValueChangeHandlerItemProps<T> {
	// 依赖字段（当该字段值变化时触发联动逻辑）
	depKey: keyof T;

	/**
	 * 以下三个字段配合使用时，若未设置 handleFunc，
	 * 会根据选项列表中的数据进行自动赋值：
	 * - depSelectionsListName
	 * - depSelectionsListRowKey
	 * - selectedSelectionRowItemKey
	 */

	// 指定选项列表名称（用于在动态选项对象中查找）
	depSelectionsListName?: string;

	// 指定用于匹配选项行的字段名
	depSelectionsListRowKey?: string;

	// 指定选项行中用于赋值的字段名
	selectedSelectionRowItemKey?: string;

	/**
	 * 自定义处理函数
	 * 若设置该函数，则优先使用其返回值进行赋值。
	 */
	handleFunc?: (params: {
		// 当前依赖字段的值
		value: any;
		// 当前 formik 实例
		formik: ReturnType<typeof useFormik<T>>;
		// 根据配置查找出的选项行字段值（selectedSelectionRowItemKey 对应值）
		selectedItemRowValue?: any;
		// 根据配置匹配到的选项行对象
		selectedSelectionRow?: { [property: string]: any };
		// 整个选项列表
		selectionList?: any[];
		// 动态选项对象（传入的 dynamicSelectionsObj）
		selectionsObj?: ReturnType<typeof useDynamicSelectionsParams>;
	}) => T[keyof T] | Promise<T[keyof T]>;

	// 目标字段数组：指定需要被赋值的字段
	//如果没有设置这个字段，任何更改都不会发生
	targetKey?: Array<keyof T>;
}

type LoosePartial<T> = Partial<T> & { [key: string]: any };

/**
 * useFormikValueChanges 的参数定义
 */
export interface IuseFormikValueChangeHandlerProps<T> {
	// 所有联动项配置
	options: IuseFormikValueChangeHandlerItemProps<T>[];

	// 当前 formik 实例
	formik: ReturnType<typeof useFormik<T>>;

	// 动态选项对象（可选）
	dynamicSelectionsObj?: ReturnType<typeof useDynamicSelectionsParams>;

	// 是否禁用所有联动逻辑（设为 true 时将不进行计算）
	disabled: boolean;
}

const useFormikValueChanges = function <T extends LoosePartial<T>>({
	options, // 联动项配置
	formik, // formik 实例
	dynamicSelectionsObj, // 动态选项对象
	disabled = false, // 是否禁用联动逻辑
}: IuseFormikValueChangeHandlerProps<T>) {
	//===============useHooks=================

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);
	//外部formik的值
	const [currentFormikValues, setcurrentFormikValues] = useState<Partial<T>>({});
	//更改stamp
	const [selectionsUpdateStamp, setselectionsUpdateStamp] = useState<number>(-1);

	//===============static===================

	//===============ref======================
	const currentformikValuesRef = useRef<Partial<T>>({});

	//===============function=================
	//外部formik更新值的时候
	const updateFormikValues = function (_values: T) {
		if (disabled) {
			return;
		}

		let newValue = _values;
		let oldValue = currentformikValuesRef.current;
		if (newValue !== oldValue) {
			//不能这样简单对比一下就去更新，因为formik里的变更操作特别多，需要判断有目前依赖的参数变更再执行改变
			//1.先拿出配置依赖项目中的所有的依赖字段
			let depsNameArr = options.reduce(function (acc, item) {
				if (typeof item.depKey !== "undefined" && item.depKey !== null) {
					acc.push(item.depKey);
				}
				return acc;
			}, [] as Array<keyof T>);
			//2.根据每个依赖字段，来对比新值和旧值的区别，如果有不同的值，就更新，否则放弃更新，避免不必要的更新
			let hasChange = false;
			for (let item of depsNameArr) {
				if (newValue[item] !== oldValue[item]) {
					hasChange = true;
					computSingleOptionItem(item, newValue[item]);
				}
			}
			if (hasChange) {
				let resnewValue = JSON.parse(JSON.stringify(_values));
				setcurrentFormikValues(resnewValue);
				currentformikValuesRef.current = resnewValue;
				setselectionsUpdateStamp(+new Date());
			}
		}
	};

	//单独计算并赋值一个配置项的变更
	const computSingleOptionItem = async function (key: keyof T, value: any) {
		//查找配置项
		let optionItem = options.find(function (item) {
			return item.depKey === key;
		});
		//默认使用当前formik依赖字段的值
		var res = value;

		//查找依赖的选项列表
		let selectrionsList = [];
		let selectedRow: any = {};
		let selectedItemRowValue: any = undefined;
		//如果配置的选项对象不为空
		if (typeof dynamicSelectionsObj !== "undefined" && dynamicSelectionsObj !== null) {
			let _selectrionsList = dynamicSelectionsObj.selections[optionItem.depSelectionsListName];
			//如果选项列表被找到
			if (typeof _selectrionsList !== "undefined" && _selectrionsList !== null) {
				selectrionsList = _selectrionsList;
				//如果选项列表不为空
				if (_selectrionsList.length > 0) {
					//如果有选项列表的行key
					if (typeof optionItem.depSelectionsListRowKey !== "undefined" && optionItem.depSelectionsListRowKey !== null) {
						//查找选项列表的行
						let _selectedRow = _selectrionsList.find(function (item) {
							if (typeof item.dataRow === "undefined" || item.dataRow === null) {
								return undefined;
							}
							return item.dataRow[optionItem.depSelectionsListRowKey].toString() === value.toString();
						});
						let ssitem = _selectrionsList.find(function (item) {
							if (typeof item["value"] === "undefined" || item["value"] === null) {
								return undefined;
							}
							return item["value"].toString() === value.toString();
						});
						selectedRow = _selectedRow;
						if (
							typeof _selectedRow !== "undefined" &&
							_selectedRow !== null &&
							typeof _selectedRow.dataRow !== "undefined" &&
							_selectedRow.dataRow !== null
						) {
							let selectedItem = _selectedRow;
							_selectedRow = _selectedRow.dataRow;
							selectedRow = selectedRow.dataRow;
							let _selectedItemRowValue = _selectedRow[optionItem.selectedSelectionRowItemKey];
							let _selectedItemValue = selectedItem[optionItem.selectedSelectionRowItemKey];
							if (typeof _selectedItemRowValue !== "undefined" && _selectedItemRowValue !== null) {
								selectedItemRowValue = _selectedItemRowValue;
							} else if (typeof _selectedItemValue !== "undefined" && _selectedItemValue !== null) {
								selectedItemRowValue = _selectedItemRowValue;
							}
						} else if (typeof ssitem[optionItem.selectedSelectionRowItemKey] !== "undefined") {
							selectedRow = ssitem;
							selectedItemRowValue = ssitem[optionItem.selectedSelectionRowItemKey];
						}
					} else if (typeof optionItem.depSelectionsListRowKey === "undefined" && optionItem.selectedSelectionRowItemKey !== "undefined") {
						let ssitem = _selectrionsList.find(function (item) {
							if (typeof item["value"] === "undefined" || item["value"] === null) {
								return undefined;
							}
							return item["value"].toString() === value.toString();
						});
						if (typeof ssitem[optionItem.selectedSelectionRowItemKey] !== "undefined") {
							selectedRow = ssitem;
							selectedItemRowValue = ssitem[optionItem.selectedSelectionRowItemKey];
						}
					}
				}
			}
		}
		//如果处理函数存在
		if (typeof optionItem.handleFunc !== "undefined" && typeof optionItem.handleFunc === "function") {
			//执行处理函数
			res = await optionItem.handleFunc({
				value,
				formik,
				selectedItemRowValue,
				selectedSelectionRow: selectedRow,
				selectionList: selectrionsList,
				selectionsObj: dynamicSelectionsObj,
			});
			//如果处理函数不存在，但是配置了要去目标选项里去找值（optionItem.depSelectionsListRowKey），就将赋值字段设置为找到的值
		} else if (
			typeof optionItem.handleFunc === "undefined" &&
			typeof dynamicSelectionsObj !== "undefined" &&
			typeof optionItem.depSelectionsListName !== "undefined" &&
			typeof optionItem.selectedSelectionRowItemKey !== "undefined"
		) {
			//哪怕selectedItemRowValue是undefined，也要赋值
			//因为用户一旦设置了dynamicSelectionsObj，dynamicSelectionsObj，depSelectionsListRowKey，selectedSelectionRowItemKey
			//就说明他想要去选项列表里去找值
			//如果没有找到值，就赋值为undefined
			res = selectedItemRowValue;
		}

		//如果
		//避免在组件卸载之后还在更新值
		var _isMounted = await new Promise(function (resolve) {
			setIsMounted(function (v) {
				resolve(v);
				return v;
			});
		});
		//如果有返回值，就赋值给目标字段
		if (
			res !== null &&
			typeof res !== "undefined" &&
			_isMounted === true &&
			typeof optionItem.targetKey !== "undefined" &&
			typeof optionItem.targetKey !== null
		) {
			for (let item of optionItem.targetKey) {
				formik.setFieldValue(item as string, res);
			}
		}
	};

	//===============effects==================
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted === true) {
				updateFormikValues(formik.values);
			}
		},
		[isMounted, formik, disabled]
	);

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

	return { currentFormikValues, selectionsUpdateStamp, setselectionsUpdateStamp };
};
export default useFormikValueChanges;
