/**
 * 廖力编写
 * 模块名称：公用详情页面用的datahook
 * 模块说明：公用详情页面用的datahook 带context
 * 编写时间：2025-04-14 10:57:04 星期一
 */

import { Formik, FormikConfig, FormikValues, useFormik } from "formik";
import React, { createContext, useState, useContext, useEffect, ReactElement, FC, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useDebounce from "renderer/utils/debounceAdv2Hook";
import useDynamicSelectionsParams, { IDynamicSelectionsParamsProp } from "./dynamicSelectionsParamsHook";
import useFormikValueChanges, { IuseFormikValueChangeHandlerItemProps } from "./formikValueChangesHook";
import { useUnsavedConfirm } from "./unSaveBlocker";

export type Tmode = "edit" | "add" | "watch";
export interface IuseMainDataHookProps<T, D> {
	/**
	 * 表单默认值对象
	 * 一般用于添加模式或编辑模式下的表单初始化
	 */
	defaultValue: T;
	/**
	 * 表单的其它状态
	 * 例如是否显示某个窗口之类的不属于表单数据内容的状态
	 */
	otherState?: D;
	/**
	 * 主表单的验证规则（可选）
	 * 使用 Yup 编写的校验对象
	 */
	mainValidationSchema?: any;

	/**
	 * 表单提交时的处理函数（可选）
	 * 将在校验通过后调用，参数为当前表单值
	 */
	onSubmit?: (values: T) => void;

	/**
	 * 数据加载函数（可选）
	 * 在 edit 和 watch 模式下使用，用于加载详情页数据
	 * 返回一个对象作为表单初始化值
	 */
	loadData?: () => T | Promise<T>;

	/**
	 * 初始化钩子（可选）
	 * 页面加载完成后调用，可以用于其他自定义初始化逻辑
	 */
	init?: () => void;

	/**
	 * 当前详情页的基础路由地址
	 * 会被用于跳转 edit/watch 等操作，如 /user/detail
	 */
	currentUrl: string;

	/**
	 * 动态选择项配置（可选）
	 * 用于配置页面中通过接口加载的 select 或级联参数等
	 * 如：状态列表、城市列表等
	 */
	dynamicSelectionsParams?: IDynamicSelectionsParamsProp[];

	/**
	 * 表单值变动监听器配置（可选）
	 * 用于在 formik 某些字段变动时联动更新其他字段
	 */
	formikValueChangesParams?: {
		/**
		 * 是否禁用该监听器功能
		 */
		disabled: boolean;

		/**
		 * 值变动联动处理配置项
		 * 每项配置一个监听源字段和目标字段及处理逻辑
		 */
		options: IuseFormikValueChangeHandlerItemProps<T>[];
	};

	/**
	 * 表单提交节流时间（毫秒）
	 * 防止频繁点击提交，默认 3000 毫秒
	 */
	throttlingTime?: number;
	/**
	 * 是否处理表单未保存的提示
	 * 默认 true
	 */
	isHandleUnsave?: boolean;
}

/* 先定义勾子 */
export const useMainDataHook = function <T, D = {}>({
	//默认值
	defaultValue,
	//其它状态
	otherState = {} as D,
	//表单验证规则
	mainValidationSchema,
	//提交
	onSubmit,
	//watch 和 edit模式下 加载数据
	loadData,
	//初始化
	init,
	//当前页面路由
	currentUrl,
	//动态参数获取器
	dynamicSelectionsParams,
	//formik值变动处理器配置对象
	formikValueChangesParams = {
		disabled: true,
		options: [],
	},
	/* 
		上面两个项目的配置示例:
		//动态参数
		dynamicSelectionsParams: [
			{
				name: "statusTypeArr",
				fetchFunction: async function (_depParams) {
					const { data } = await axiosServices.get(`/statusType/query`);
					return data.data.reduce(function (acc, item, index) {
						acc.push({
							label: item.name.toString(),
							value: item.id.toString(),
							dataRow: item,
						});
						return acc;
					}, []);
				},
			},
		],
		formikValueChangesParams: {
			disabled: false,
			options: [
				{
					depKey: "value",
					handleFunc: function ({ value }) {
						return value * 0.1;
					},
					targetKey: ["address"],
				},
				{
					depKey: "statusTypeId",
					depSelectionsListName: "statusTypeArr",
					depSelectionsListRowKey: "id",
					selectedSelectionRowItemKey: "coordinatesArea",
					targetKey: ["remark"],
				},
			],
		},
	*/
	//提交节流器的时间
	throttlingTime = 3000,
	//是否处理表单未保存的提示
	isHandleUnsave = true,
}: IuseMainDataHookProps<T, D>) {
	//===============useHooks=================
	//当前详情页的载入类型
	// edit | add | watch
	const ps = useParams();
	let mode_param: Tmode = ps.mode as Tmode;
	let id: string = ps.id as string;
	const debounceFunc = useDebounce();
	const debounceFuncToast = useDebounce();
	const navigator = useNavigate();
	const dynSelections = useDynamicSelectionsParams(typeof dynamicSelectionsParams === "undefined" ? [] : dynamicSelectionsParams);

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [mode, setmode] = useState<Tmode>(mode_param);
	//表单是否更改了（用于路由跳转拦截）
	const [isFormChanged, setIsFormChanged] = useState<boolean>(false);
	const [initData, setinitData] = useState<T>(defaultValue as T);
	const [avatarUploadState, setavatarUploadState] = useState<"error" | "done" | "uploading" | "removed" | "init">("init");
	const [filesIsUpLoading, setfilesIsUpLoading] = useState<boolean>(false);
	/* 编辑或者查看表单时，表单的加载状态 */
	const [loadingFormState, setloadingFormState] = useState<"finished" | "padding">(
		(function () {
			if (mode === "add") {
				return "finished";
			}
			return "padding";
		})()
	);

	//===============static===================

	//是否可编辑
	let enabled = (function () {
		if (mode === "watch") {
			return false;
		}
		if (filesIsUpLoading === true) {
			return false;
		}
		if (avatarUploadState === "uploading") {
			return false;
		}
		if (loadingFormState === "padding") {
			return false;
		}
		return true;
	})();

	//===============Formik====================
	const mainFormik = useFormik<T & D>({
		initialValues: { ...defaultValue, ...otherState },
		//表单验证
		//来自表单验证文件
		validationSchema: mainValidationSchema,
		validateOnChange: true,
		validateOnBlur: true,
		validateOnMount: true,
		onSubmit: async (values) => {
			//
			debounceFunc(
				async function () {
					try {
						//提交的时候只提交表单的状态，将otherState里的那些状态都过滤掉
						let submitValues = {};
						for (var i in values as any) {
							if (values.hasOwnProperty(i) && typeof otherState[i] === "undefined") {
								submitValues[i] = values[i];
							}
						}
						setIsFormChanged(false);
						onSubmit(submitValues as T);
					} catch (error) {
						console.error(error);
					}
				},
				throttlingTime,
				function () {
					debounceFuncToast(function () {
						toast.error("提交频率太高了，请稍候再试...");
					}, 1000);
				}
			);
		},
	});
	//当用户编辑后路由状态发生了改变
	useUnsavedConfirm(isFormChanged, "表单已编辑,您有未保存的数据，确定离开吗？");

	//formik的值变动处理器
	const formikValueChange = useFormikValueChanges<T>({
		options: typeof formikValueChangesParams === "undefined" ? [] : formikValueChangesParams.options,
		formik: mainFormik,
		dynamicSelectionsObj: dynSelections,
		disabled: typeof formikValueChangesParams === "undefined" ? true : formikValueChangesParams.disabled,
	});

	//===============ref======================

	//===============function=================
	const loadDetailData = async function () {
		setloadingFormState("padding");
		let data: T = await loadData();
		let res = { ...mainFormik.values, ...data };
		mainFormik.setValues(res);
		setinitData(res);
		setloadingFormState("finished");
		setIsFormChanged(false);
	};

	//检查主formik的错误
	const checkFormikError = function () {
		// 把所有字段都设为 touched
		const allTouched: any = {};
		for (let key in mainFormik.values as any) {
			if (mainFormik.values.hasOwnProperty(key)) {
				allTouched[key] = true;
			}
		}
		mainFormik.setTouched(allTouched);

		if (mainFormik.errors) {
			for (let i in mainFormik.errors) {
				if (mainFormik.errors.hasOwnProperty(i)) {
					toast.error(mainFormik.errors[i] as string);
					return false;
				}
			}
		}
		return true;
	};

	const resetForm = function () {
		mainFormik.setValues({ ...initData, ...otherState });
		setIsFormChanged(true);
	};

	const editForm = function () {
		navigator(currentUrl + "/edit/" + id);
		dynSelections.forceReload();
		setIsFormChanged(false);
	};

	const back = function () {
		navigator(currentUrl + "/watch/" + id);
	};

	//获得组件状态指示
	const getItemDynState = function (selectionArrName: string) {
		return {
			currentState: dynSelections.selectionsState[selectionArrName],
		};
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

	/* 监听当前页面打开模式 */
	//mode
	useEffect(() => {
		if (isMounted) {
			init();
		}
		//如果是编辑模式打开就加载这个表单的数据
		if (isMounted === true && (mode === "edit" || mode === "watch")) {
			loadDetailData();
		}
	}, [isMounted, mode]);
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			//更新动态参数对象
			dynSelections.updateFormikValues(mainFormik.values);
			//判断当前是不是编辑状态
			if (
				(mode === "edit" || mode === "add") &&
				isHandleUnsave &&
				loadingFormState === "finished" &&
				JSON.stringify(initData) !== JSON.stringify(mainFormik.values)
			) {
				setIsFormChanged(true);
			}
		},
		[mainFormik.values]
	);

	useEffect(
		function (): ReturnType<React.EffectCallback> {
			setmode(ps.mode as Tmode);
		},
		[ps.mode]
	);

	return {
		//是否挂载
		isMounted,
		//封面上传状态
		avatarUploadState,
		//设置封面的上传状态
		setavatarUploadState,
		//当前页面编辑状态
		mode,
		//检查formik错误
		checkFormikError,
		//加载数据
		loadDetailData,
		//是否可编辑
		enabled,
		//主formik
		mainFormik,
		//当前详情id
		id,
		//文件是否在上传
		filesIsUpLoading,
		//设置文件上传状态
		setfilesIsUpLoading,
		//打开编辑状态
		editForm,
		//返回按钮
		back,
		//动态参数获取器
		dynSelections,
		//formik值变动处理器的返回值
		formikValueChange,
		//数据加载状态
		loadingFormState,
		//重置
		resetForm,
		//设置工作模式
		setmode,
		//获得组件动态状态指示
		getItemDynState,
	};
};

//定义勾子的返回类型
export type TMainHookReturnType<T, D = {}> = ReturnType<typeof useMainDataHook<T, D>>;

/**
 * 创建一个需要全局使用的context
 **/
export const MainDataContext = createContext<TMainHookReturnType<any> | null>(null);

/**
 * 给子节点使用的context
 * @returns
 */
export const useMainDataContext = function <T, D = {}>(): TMainHookReturnType<T, D> {
	return useContext(MainDataContext) as TMainHookReturnType<T, D>;
};
