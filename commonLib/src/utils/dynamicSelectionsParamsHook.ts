/**
 * 廖力编写
 * 模块名称：动态下拉框选项等参数快速获取器
 * 模块说明：用于表单填写/查询栏的动态下拉框的参数的获取
 * 编写时间：2025-05-14 09:21:32 星期三
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import { TloadingState } from "./dynStateHook";
import { IdynState } from "MithalCommonLibrary/PublicInqueryItem";

//选项列表的项目
export interface IselectionItem {
	/**用于展示的名称 */
	label: string;
	/**用于提交的值 */
	value: string;
	/**数据行，包含所有的数据 */
	dataRow?: any;
}

/**
 * 传入参数
 */
export interface IDynamicSelectionsParamsProp {
	/**
	 * 给选项列表命名
	 * 这个名字是用来在外部获取选项列表的
	 * 例如：selections.name1
	 */
	name: string;
	/**
	 * _depParams :{params1:"value",params2:"value"}
	 * 获取选项列表的函数，用于进行异步接口访问来获取选项
	 * @param value { [property: string]: any }
	 * @returns IselectionItem[]
	 */
	fetchFunction: (value: { [property: string]: any }) => IselectionItem[] | Promise<IselectionItem[]> | undefined | null;
	/**
	 * 依赖项目，依赖于外部的formik的值
	 * 如果某个formik中的值发生了变化，那么就会触发这个选项的重新获取，并将变化的值传入fetchFunction,方便参数列表的再获取
	 * 可以不填写，不填写的话就表示不依赖于外部的formik的值，fetchFunction只会在初始化的时候被调用一次
	 * ["params1","params2"]
	 */
	depParams?: string[];
	/**
	 * 是否每次都根据依赖强制更新
	 */
	forceUpdate?: boolean;
}

const useDynamicSelectionsParams = (DSPProps: IDynamicSelectionsParamsProp[]) => {
	//===============useHooks=================

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);
	//外部formik的值
	const [currentFormikValues, setcurrentFormikValues] = useState<{ [property: string]: any }>({});
	const [currentChangedKeys, setcurrentChangedKeys] = useState<string[]>([]);
	const [isFirstTimeLoading, setisFirstTimeLoading] = useState<boolean>(true);
	//返回的参数状态
	const [selections, setselections] = useState<{ [property: string]: IselectionItem[] }>(
		(function () {
			return DSPProps.reduce(function (acc, item, index) {
				acc[item.name] = [];
				return acc;
			}, {} as { [property: string]: IselectionItem[] });
		})()
	);
	//所有动态参数的运行状态
	const [selectionsState, setselectionsState] = useState<{
		[property: string]: IdynState;
	}>(
		(function () {
			return DSPProps.reduce(function (acc, item, index) {
				acc[item.name] = {
					state: "unstarted",
					hasError: false,
					msg: "",
				};
				return acc;
			}, {} as { [property: string]: IdynState });
		})()
	);
	//更改stamp
	const [selectionsUpdateStamp, setselectionsUpdateStamp] = useState<number>(-1);

	//===============static===================

	//===============ref======================

	//===============function=================
	//外部formik更新值的时候
	const updateFormikValues = function (_values: { [property: string]: any }) {
		let newValue = _values;
		let oldValue = currentFormikValues;
		if (newValue !== oldValue) {
			//不能这样简单对比一下就去更新，因为formik里的变更操作特别多，需要判断有目前依赖的参数变更再执行改变
			//1.先拿出配置依赖项目中的所有的依赖字段
			let depsNameArr = DSPProps.reduce(function (acc, item) {
				if (typeof item.depParams !== "undefined" && item.depParams !== null && item.depParams.length !== 0) {
					acc = acc.concat(item.depParams);
				}
				return acc;
			}, [] as string[]);
			//2.根据每个依赖字段，来对比新值和旧值的区别，如果有不同的值，就更新，否则放弃更新，避免不必要的更新
			let hasChange = false;
			let currentChangedKeys = [];
			for (let item of depsNameArr) {
				if (newValue[item] !== oldValue[item]) {
					hasChange = true;
					currentChangedKeys.push(item);
				}
			}
			if (hasChange) {
				let resnewValue = JSON.parse(JSON.stringify(_values));
				setcurrentFormikValues(resnewValue);
			}
			setcurrentChangedKeys(currentChangedKeys);
		}
	};

	//强行更新函数
	const forceUpdateFormikValues = function (_values: { [property: string]: any }) {
		let newValue = JSON.parse(JSON.stringify(_values));
		let oldValue = JSON.parse(JSON.stringify(currentFormikValues));
		if (newValue !== oldValue) {
			setcurrentFormikValues(newValue);
		}
	};

	//formik值被更新后，或者初始化时
	//根据参数，逐一获取数据
	const runParamsGetter = async function () {
		let _selections = { ...selections };
		for (let i = 0; i < DSPProps.length; i++) {
			let DSPPropsItem = DSPProps[i];
			await (async function (DSPPropsItem) {
				let options = {};
				var hasDepOption: boolean = false;
				if (typeof DSPPropsItem.depParams !== "undefined" && DSPPropsItem.depParams !== null && DSPPropsItem.depParams.length !== 0) {
					options = DSPPropsItem.depParams.reduce(function (acc, item, index) {
						//从formik的值里获取构成当前选项的依赖参数
						let value = currentFormikValues[item];
						if (typeof value === "undefined") {
							acc[item] = "";
						} else {
							acc[item] = value;
							hasDepOption = true;
						}
						return acc;
					}, {} as { [property: string]: any });
				}
				//如果没设置强制更新
				if (typeof DSPPropsItem.forceUpdate === "undefined" || DSPPropsItem.forceUpdate === false) {
					//第一次载入就不要去拉取带有依赖项目的组件
					//第一次载入只默认拉取没有依赖项的组件
					if (isFirstTimeLoading && hasDepOption) {
						return;
					}
					//如果不是第一次载入，但是又没有依赖的项目也不处理载入事件
					if (!isFirstTimeLoading && hasDepOption === false) {
						return;
					}
					//如果不是第一次载入，但是有依赖项目，就检查当前改动值是否在依赖项目里，有的话再载入，否则不载入
					if (!isFirstTimeLoading && hasDepOption) {
						let hasChange: boolean = false;
						for (let item of currentChangedKeys) {
							if (typeof options[item] !== "undefined") {
								hasChange = true;
							}
						}
						if (!hasChange) {
							return;
						}
					}
				}
				//设置当前这个参数正在加载中
				setselectionsState(function (_value) {
					let v = { ..._value };
					v[DSPPropsItem.name].state = "padding";
					return v;
				});
				//通过外部配置的fetchFunction来获得选项数据
				try {
					let selection = await DSPPropsItem.fetchFunction(options);
					//如果获得的结果不为空或者undefined,那么就视为此次获取成功
					_selections[DSPPropsItem.name] = selection === null && typeof selection === "undefined" ? [] : selection;
					//获取过程中数据为空
					if (selection === null || typeof selection === "undefined") {
						setselectionsState(function (_value) {
							_value[DSPPropsItem.name].state = "finished nulldata";
							_value[DSPPropsItem.name].hasError = false;
							_value[DSPPropsItem.name].msg = `【${DSPPropsItem.name}】的动态参数返回值为空，请检查相应接口的网络请求！`;
							return _value;
						});
						_selections[DSPPropsItem.name] = [];
					} else {
						setselectionsState(function (_value) {
							_value[DSPPropsItem.name].state = "finished";
							_value[DSPPropsItem.name].hasError = false;
							_value[DSPPropsItem.name].msg = `【${DSPPropsItem.name}】动态参数请求成功！`;
							return _value;
						});
					}
				} catch (_e) {
					setselectionsState(function (_value) {
						_value[DSPPropsItem.name].state = "finished error";
						_value[DSPPropsItem.name].hasError = true;
						_value[DSPPropsItem.name].msg = `【${DSPPropsItem.name}】动态参数请求失败：` + _e.msg;
						return _value;
					});
					_selections[DSPPropsItem.name] = [];
				}
			})(DSPPropsItem);
		}
		setcurrentChangedKeys([]);
		setselections(_selections);
		setisFirstTimeLoading(false);
		setselectionsUpdateStamp(+new Date());
	};

	//强制刷新一下数据
	const forceReload = async function () {
		let _selections = { ...selections };
		for (let i = 0; i < DSPProps.length; i++) {
			let DSPPropsItem = DSPProps[i];
			await (async function (DSPPropsItem) {
				let options = {};
				var hasDepOption: boolean = false;
				if (typeof DSPPropsItem.depParams !== "undefined" && DSPPropsItem.depParams !== null && DSPPropsItem.depParams.length !== 0) {
					options = DSPPropsItem.depParams.reduce(function (acc, item, index) {
						//从formik的值里获取构成当前选项的依赖参数
						let value = currentFormikValues[item];
						if (typeof value === "undefined") {
							acc[item] = "";
						} else {
							acc[item] = value;
							hasDepOption = true;
						}
						return acc;
					}, {} as { [property: string]: any });
				}

				//设置当前这个参数正在加载中
				setselectionsState(function (_value) {
					let v = { ..._value };
					v[DSPPropsItem.name].state = "padding";
					return v;
				});
				//通过外部配置的fetchFunction来获得选项数据
				try {
					let selection = await DSPPropsItem.fetchFunction(options);
					//如果获得的结果不为空或者undefined,那么就视为此次获取成功
					_selections[DSPPropsItem.name] = selection === null && typeof selection === "undefined" ? [] : selection;
					//获取过程中数据为空
					if (selection === null || typeof selection === "undefined") {
						setselectionsState(function (_value) {
							_value[DSPPropsItem.name].state = "finished nulldata";
							_value[DSPPropsItem.name].hasError = false;
							_value[DSPPropsItem.name].msg = `【${DSPPropsItem.name}】的动态参数返回值为空，请检查相应接口的网络请求！`;
							return _value;
						});
						_selections[DSPPropsItem.name] = [];
					} else {
						setselectionsState(function (_value) {
							_value[DSPPropsItem.name].state = "finished";
							_value[DSPPropsItem.name].hasError = false;
							_value[DSPPropsItem.name].msg = `【${DSPPropsItem.name}】动态参数请求成功！`;
							return _value;
						});
					}
				} catch (_e) {
					setselectionsState(function (_value) {
						_value[DSPPropsItem.name].state = "finished error";
						_value[DSPPropsItem.name].hasError = true;
						_value[DSPPropsItem.name].msg = `【${DSPPropsItem.name}】动态参数请求失败：` + _e.msg;
						return _value;
					});
					_selections[DSPPropsItem.name] = [];
				}
			})(DSPPropsItem);
		}
		setcurrentChangedKeys([]);
		setselections(_selections);
		setisFirstTimeLoading(false);
		setselectionsUpdateStamp(+new Date());
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
			if (isMounted === true) {
				runParamsGetter();
			}
		},
		[isMounted, currentFormikValues]
	);

	useEffect(function (): ReturnType<React.EffectCallback> {
		return function (): void {
			setIsMounted(false);
		};
	}, []);

	return {
		//向本操作器提交外部formik值的更改
		updateFormikValues,
		//强行更新
		forceUpdateFormikValues,
		//本操作器获取了的选项
		selections,
		//每次选项发生改变它也会跟着改变
		selectionsUpdateStamp,
		//当前内部存储的Formikvalues
		currentFormikValues,
		//所有动态参数的运行状态
		selectionsState,
		//强制更新一遍数据
		forceReload,
	};
};
export default useDynamicSelectionsParams;

/* 
		组件使用示例
		----------------------------------------------------
		let dynSelections = useDynamicSelectionsParams([
			{
				name:"name1",
				// _depParams :[{name:"para1",value:"parav1"}]
				fetchFunction:function(_depParams){
					const { data } = await axiosServices.get(`/statusType/query`);
					return data.data.reduce(function (acc, item, index) {
						acc.push({
							label: item.name.toString(),
							value: item.id.toString(),
						});
						return acc;
					}, [])
				}
			},
			{
				name:"name2",
				// _depParams :[{name:"para1",value:"parav1"}]
				fetchFunction:function(_depParams){
					const { data } = await axiosServices.get(`/statusType/query`);
					return data.data.reduce(function (acc, item, index) {
						acc.push({
							label: item.name.toString(),
							value: item.id.toString(),
						});
						return acc;
					}, [])
				}
				depParams:["FormiKname1"]
			},
			{
				name:"statusTypeArr",
				// _depParams :[{name:"para1",value:"parav1"}]
				fetchFunction:function(_depParams){
					const { data } = await axiosServices.get(`/statusType/query`);
					return data.data.reduce(function (acc, item, index) {
						acc.push({
							label: item.name.toString(),
							value: item.id.toString(),
						});
						return acc;
					}, [])
				}
				depParams:["FormiKname1","FormiKname2"]
			}
		]);


		useEffect(function (): ReturnType<React.EffectCallback> {
			dynSelections.update(formik.values)
		}, [formik.values]);

		dynSelections.selectionArrs.name1
		dynSelections.selectionArrs.name2
		dynSelections.selectionArrs.statusTypeArr
	*/
