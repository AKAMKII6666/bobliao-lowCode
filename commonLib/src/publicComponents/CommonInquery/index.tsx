/**
 * 廖力编写
 * 模块名称：查询栏快速数据绑定和布局组件
 * 模块说明：
 * 		虽然已经有了PublicInqueryContainer这个组件，但是制作查询栏时还不够快，
 * 这个组件集成了formik/下拉框或多选框数据拉取/查询验证等特性。
 * 主要解决的痛点是，可以使得编写查询条件栏目可以在列表页完成，而不用单独写一个组件，
 * 将冗余代码集中到一个组件里，方便日后维护。
 *
 * 编写时间：2025-05-14 16:26:12 星期三
 */
import { GridProps } from "@mui/material";
import AntdDateRangePacker, { IAntdDateRangePackerProps } from "MithalCommonLibrary/antdDateRangePicker";
import MithrilAutocomplete, { IMithrilAutocompleteProps } from "MithalCommonLibrary/autocomplete";
import CustomNumberInput, { NumberInputProps } from "MithalCommonLibrary/CustomNumberInput";
import MithrilInput, { IMithrilInputProps } from "MithalCommonLibrary/input";
import NumberRangeInput, { NumberRangeInputProps } from "MithalCommonLibrary/numberRangeInput";
import PublicInqueryContainer, { IPublicInqueryContainerprops } from "MithalCommonLibrary/PublicInqueryContainer";
import MithrilSelect, { IMithrilSelectProps } from "MithalCommonLibrary/select";
import MithrilTextArea, { EnhancedTextFieldProps } from "MithalCommonLibrary/textArea";
import * as yup from "yup";
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import { Formik, useFormik } from "formik";
import { IdynStateSetting, IPublicInqueryItemprops } from "MithalCommonLibrary/PublicInqueryItem";
import useDynamicSelectionsParams, { IDynamicSelectionsParamsProp } from "renderer/utils/dynamicSelectionsParamsHook";
import toast from "react-hot-toast";
import { isEmpty } from "renderer/utils/utils";
import { Irectinfo } from "MithalCommonLibrary/formComponentsContainer";

//CommonInqueryComsMap的组件映射表
export const CommonInqueryComsMap = {
	AntdDateRangePacker: AntdDateRangePacker,
	MithrilAutocomplete: MithrilAutocomplete,
	CustomNumberInput: CustomNumberInput,
	MithrilInput: MithrilInput,
	NumberRangeInput: NumberRangeInput,
	MithrilSelect: MithrilSelect,
	MithrilTextArea: MithrilTextArea,
};

//组件配置项
export interface ICommonInqueryitemprops {
	//显示名称 带冒号了不用打冒号
	label: string;
	//数据名称 多个[]代表对应多个数据字段
	name: string | string[];
	//默认值 多个[]代表对应多个数据字段
	defaultValue: string | string[];
	//时间范围组件的格式
	dateFormat?: string;
	//组件的grid属性
	comGridProps?: GridProps;
	//是否多选
	isMutipleSelections?: boolean;
	//标题宽度
	labelWidth?: number | string;
	//表单验证对象
	yupObj?: yup.StringSchema<string, yup.AnyObject, undefined, ""> | Array<yup.StringSchema<string, yup.AnyObject, undefined, "">>;
	//选项
	selectItems?: { label: string; value: string }[] | IDynamicSelectionsParamsProp;
	//动态参数组件的配置
	dynStatesSetting?: Partial<IdynStateSetting>;
	//组件属性
	comProps?: IMithrilInputProps &
		NumberInputProps &
		IMithrilSelectProps &
		IAntdDateRangePackerProps &
		IMithrilAutocompleteProps &
		EnhancedTextFieldProps &
		NumberRangeInputProps;
	comType: keyof typeof CommonInqueryComsMap;
}

/**
 * 传入参数
 */
export interface ICommonInqueryprops
	extends Omit<IPublicInqueryContainerprops, "items" | "onSubmit" | "onReset" | "formik" | "dynSelectionsSetting" | "defaultValues"> {
	formik?: ReturnType<typeof useFormik> | null | undefined;
	//默认值
	defaultValues?: { [property: string]: any };
	//组件配置
	items: ICommonInqueryitemprops[];
	//动态参数组件的配置
	dynSelectionsSetting?: Partial<IdynStateSetting>;
	//处理提交事件
	onSubmit: (values: any) => void;
	//处理重置
	onReset: (values: any) => void;
	/**
	 是否在低代码编辑器内 
	*/
	isInLowCodeMode?: boolean;
	/**
	 * 强制更新rectinfo (isInLowCodeMode = true)才有效
	 */
	forceUpdateRectInfoStamp?: number;
	/**
	 * 设置每个组件的rect信息（x,y,width,height） (isInLowCodeMode = true)才有效
	 */
	reportRectInfo?: (index: number, value: Irectinfo) => void;
}

/**
 * 导出时需要用到的接口
 */
export type TCommonInqueryRef = {
	getValues: () => any;
	getFormik: () => ReturnType<typeof useFormik>;
};

//往外面暴露统一名称的属性对象，用于生成低代码平台属性JSON schema
export type Tinputprops = ICommonInqueryprops;

const CommonInquery = forwardRef<TCommonInqueryRef, ICommonInqueryprops>((props, _ref): ReactElement => {
	const {
		//
		items: propItems,
		defaultState,
		foldShowCount = 2,
		defaultValues = {},
		onSubmit = function () {},
		onReset = function () {},
		dynSelectionsSetting = {
			nullAndErrorClick: function (value) {
				toast.error(value.msg);
			},
		},
		isInLowCodeMode = false,
		forceUpdateRectInfoStamp = -1,
		reportRectInfo = (index: number, value: Irectinfo) => {},
		...restProps
	} = props;

	/*===============初始化给formik的参数===============*/
	/* 1.收集initValues */
	let formicInitValue = {};
	let formicParamsValues = {};
	let hasSavedUrlParams = false;
	let foldState = defaultState;
	/* 2.收集表单验证规则 */
	let formikValidationSchema = null;
	/* 3.收集给dynamicselectionshooks的参数 */
	let dpItems: IDynamicSelectionsParamsProp[] = [];
	let cItemIndex = 0;
	let lastUrlSavedItemIndex = 0;
	for (let item of propItems) {
		//如果绑定组件适配的字段为多个，例如AntdDateRangePacker 或NumberRangeInput
		if (Array.isArray(item.name)) {
			for (let i = 0; i < item.name.length; i++) {
				let fItem = item.name[i];
				//适配初始值
				formicInitValue[fItem] = item.defaultValue[i];
				if (typeof defaultValues[fItem] !== "undefined") {
					formicParamsValues[fItem] = defaultValues[fItem];
					if (!isEmpty(defaultValues[fItem])) {
						hasSavedUrlParams = true;
						lastUrlSavedItemIndex = cItemIndex;
					}
				}
				//适配表单验证
				if (typeof item.yupObj !== "undefined" && typeof item.yupObj[i] !== "undefined") {
					if (formikValidationSchema === null) {
						formikValidationSchema = {};
					}
					formikValidationSchema[fItem] = item.yupObj[i];
				}
			}
			//否则就是单字段组件的绑定
		} else {
			formicInitValue[item.name] = item.defaultValue;
			if (typeof defaultValues[item.name] !== "undefined") {
				formicParamsValues[item.name] = defaultValues[item.name];
				if (!isEmpty(defaultValues[item.name])) {
					hasSavedUrlParams = true;
					lastUrlSavedItemIndex = cItemIndex;
				}
			}
			if (typeof item.yupObj !== "undefined") {
				if (formikValidationSchema === null) {
					formikValidationSchema = {};
				}
				formikValidationSchema[item.name] = item.yupObj;
			}
		}
		//如果selectItems传入的是异步参数获取的参数，而不是选项，就加入配置
		if (
			typeof item.selectItems !== "undefined" &&
			!Array.isArray(item.selectItems) &&
			typeof item.selectItems.name !== "undefined" &&
			typeof item.selectItems.fetchFunction !== "undefined"
		) {
			dpItems.push(item.selectItems);
		}
		cItemIndex++;
	}

	if (hasSavedUrlParams) {
		if (lastUrlSavedItemIndex > foldShowCount) {
			foldState = "unfold";
		}
	}
	//===============useHooks=================
	//参数动态获取器
	let dynSelections = useDynamicSelectionsParams(dpItems);

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [currentpItems, setcurrentpItems] = useState<IPublicInqueryItemprops[]>([]);

	//========================================

	const formik = useFormik({
		initialValues: { ...formicInitValue, ...formicParamsValues },
		validationSchema: formikValidationSchema !== null ? yup.object().shape(formikValidationSchema) : null,
		validateOnChange: true,
		validateOnBlur: true,
		validateOnMount: true,
		onSubmit: async (_values) => {
			onSubmit(_values);
		},
	});

	//===============static===================

	//===============ref======================
	// 将子组件的方法 暴露给父组件
	useImperativeHandle(_ref, () => ({
		getValues,
		getFormik,
	}));

	//===============function=================
	const getValues = function () {
		return formik.values;
	};
	const getFormik = function () {
		return formik;
	};

	/* 获取传给PublicInqueryContainer的渲染组件列表 */
	const getItems = function () {
		let pItems: IPublicInqueryItemprops[] = [];
		let index = 0;
		for (let item of propItems) {
			let ChildrenItem = CommonInqueryComsMap[item.comType] as any;
			let ic = <ChildrenItem {...item.comProps} />;

			let itemOption: IPublicInqueryItemprops = {
				label: item.label,
				name: item.name,
				//获得类似下拉框等数据的选项列表
				selectItems: (function () {
					//如果是动态配置，就去哪去动态获取器里的列表
					if (
						typeof item.selectItems !== "undefined" &&
						!Array.isArray(item.selectItems) &&
						typeof item.selectItems.name !== "undefined" &&
						typeof item.selectItems.fetchFunction !== "undefined"
					) {
						return dynSelections.selections[item.selectItems.name] as any;
					}
					//否则直接返回页面配置
					return item.selectItems;
				})(),
				dynStatesSetting: (function () {
					//如果该项目为动态加载数据的项目
					if (
						typeof item.selectItems !== "undefined" &&
						!Array.isArray(item.selectItems) &&
						typeof item.selectItems.name !== "undefined" &&
						typeof item.selectItems.fetchFunction !== "undefined"
					) {
						//如果组件上配置了私有的属性(优先私有属性)
						if (typeof item.dynStatesSetting !== "undefined") {
							return {
								...item.dynStatesSetting,
								currentState: dynSelections.selectionsState[item.selectItems.name],
							};
						}
						//否则填写公共属性
						return {
							...dynSelectionsSetting,
							currentState: dynSelections.selectionsState[item.selectItems.name],
						};
					}
					//否则配置为undefined
					return undefined;
				})(),
				comGridProps: item.comGridProps,
				dateFormat: item.dateFormat,
				isMutipleSelections: item.isMutipleSelections,
				labelWidth: item.labelWidth,
				children: ic,
			};

			/* 在低代码编辑器下要上报组件位置信息 */
			if (isInLowCodeMode) {
				(function (_index) {
					itemOption.isInLowCodeMode = true;
					itemOption.nodeIndex = _index;
					itemOption.forceUpdateRectInfoStamp = forceUpdateRectInfoStamp;
					itemOption.reportRectInfo = reportRectInfo;
				})(index);
			}

			index++;
			pItems.push(itemOption);
		}
		setcurrentpItems(pItems);
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

	//如果页面刚载入，或者formik更新了，就运行一遍参数列表获取器的formik值的更新
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted === true) {
				dynSelections.updateFormikValues(formik.values);
			}
		},
		[isMounted, formik.values]
	);

	//当组件刚刚挂载的时候，就初始化组件列表
	//或者动态参数获取器更新了数据，就重新更新一下组件列表
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted === true || dynSelections.selectionsUpdateStamp !== -1) {
				getItems();
			}
		},
		[isMounted, propItems, dynSelections.selectionsUpdateStamp]
	);

	useEffect(function (): ReturnType<React.EffectCallback> {
		return function (): void {
			setIsMounted(false);
		};
	}, []);

	const mainContent = (
		<>
			{/* 快速组件容器 */}
			<PublicInqueryContainer
				{...restProps}
				foldShowCount={foldShowCount}
				defaultState={foldState}
				items={currentpItems}
				/* formik */
				formik={formik}
				//自动托管提交
				isHandleSubmit={true}
				//不用自动托管重置
				isHandleReset={false}
				//重置
				onResetButtonClick={function () {
					formik.setValues(formicInitValue);
					onReset(formicInitValue);
				}}
			/>
		</>
	);

	return (
		<>
			{(function () {
				//在低代码编辑器里套一个壳子，这样方便获取整体尺寸和位置以便绘制事件接收层
				if (isInLowCodeMode) {
					return <div>{mainContent}</div>;
				}
				return mainContent;
			})()}
		</>
	);
});
//为防止在编译和混淆后，无法识别组件名称，所以在这里显示定义名称
CommonInquery.displayName = "CommonInquery";
export default CommonInquery;

/* 
	组件使用示例:
	{useMemo(
					function () {
						if (isMounted === false) {
							return null;
						}
						return (
							<CommonInquery
								items={[
									{
										label: "资产名称",
										name: "name",
										defaultValue: "",
										comType: "MithrilInput",
										yupObj: yup.string().max(30, "土地资产名称最多30个字符"),
									},
									{
										label: "承包人",
										name: "lastContractor",
										defaultValue: "",
										comType: "MithrilInput",
										yupObj: yup.string().max(30, "承包人最多30个字符"),
									},
									{
										label: "登记时间",
										name: ["createByTimeSt", "createByTimeEt"],
										defaultValue: ["", ""],
										dateFormat: "YYYY-MM-DD HH:mm:ss",
										comProps: {
											showTime: true,
											allowClear: true,
										},
										comType: "AntdDateRangePacker",
										yupObj: [yup.string(), yup.string()],
									},
									{
										label: "土地价值",
										name: ["minValue", "maxValue"],
										defaultValue: ["", ""],
										comProps: {
											splitStr: "至",
										},
										comType: "NumberRangeInput",
										yupObj: [
											yup
												.string()
												.nullable()
												.matches(/^\d{1,10}(\.\d{1,2})?$/, "土地价值开始请输入合法数字，最多两位小数")
												.test("minValue-range", "土地价值开始最小值必须大于等于0", (val) => !val || parseFloat(val) >= 0)
												.test("maxValue-required-if-min", "土地价值开始当填写最小值时，最大值也必须填写", function (val) {
													const { maxValue } = this.parent;
													return !val || (val && maxValue);
												}),
											yup
												.string()
												.nullable()
												.matches(/^\d{1,10}(\.\d{1,2})?$/, "土地价值结束请输入合法数字，最多两位小数")
												.test(
													"maxValue-range",
													"土地价值结束最大值应小于 10,000,000,000(百亿)",
													(val) => !val || parseFloat(val) <= 9999999999.99
												)
												.test("minValue-required-if-max", "土地价值结束当填写最大值时，最小值也必须填写", function (val) {
													const { minValue } = this.parent;
													return !val || (val && minValue);
												})
												.test("maxValue-gte-minValue", "土地价值结束最大值不能小于最小值", function (val) {
													const { minValue } = this.parent;
													if (val && minValue) {
														return parseFloat(val) >= parseFloat(minValue);
													}
													return true;
												}),
										],
									},
									{
										label: "利用现状类型",
										name: "statusTypeId",
										defaultValue: "",
										selectItems: {
											name: "statusTypeArr",
											// _depParams :[{name:"para1",value:"parav1"}]
											fetchFunction: async function (_depParams) {
												const { data } = await axiosServices.get(`/statusType/query`);
												return data.data.reduce(function (acc, item, index) {
													acc.push({
														label: item.name.toString(),
														value: item.id.toString(),
													});
													return acc;
												}, []);
											},
										},
										comType: "MithrilSelect",
										yupObj: yup.string(),
									},
									{
										label: "承包期限",
										name: ["lastContractSt", "lastContractEt"],
										defaultValue: ["", ""],
										dateFormat: "YYYY-MM-DD",
										comProps: {
											allowClear: true,
										},
										comType: "AntdDateRangePacker",
										yupObj: [yup.string(), yup.string()],
									},
									{
										label: "土地类型",
										name: "landType",
										defaultValue: "",
										selectItems: [
											{
												label: "农用地",
												value: "1",
											},
											{
												label: "建设用地",
												value: "2",
											},
											{
												label: "生态用地",
												value: "3",
											},
											{
												label: "其它村庄用地",
												value: "4",
											},
										],
										comType: "MithrilSelect",
										yupObj: yup.string(),
									},
								]}
								onSubmit={function (_values) {
									setQeryInfo({ ...queryInfo, ..._values, current: 1, pageNum: 1 });
								}}
								onReset={function (_values) {
									setQeryInfo({ ...queryInfo, ..._values, current: 1, pageNum: 1 });
								}}
								// 是否开启折叠功能
								enabledFoldable={true}
								//默认状态
								defaultState={"fold"}
							/>
						);
					},
					[isMounted]
				)}
*/

/* 
	及联条件使用示例:
	<CommonInquery
					items={[
						{
							label: "一级菜单",
							name: "firstLevel",
							defaultValue: "",
							selectItems: {
								name: "firstLevelArr",
								fetchFunction: async function () {
									return new Promise(function (_res) {
										setTimeout(() => {
											_res([
												{ label: "选项1", value: "1" },
												{ label: "选项2", value: "2" },
												{ label: "选项3", value: "3" },
												{ label: "选项4", value: "4" },
												{ label: "选项5", value: "5" },
												{ label: "选项6", value: "6" },
											]);
										}, 3000);
									});
								},
							},
							comType: "MithrilSelect",
						},
						{
							label: "二级菜单",
							name: "secondLevel",
							defaultValue: "",
							selectItems: {
								name: "secondLevelArr",
								fetchFunction: async function (params) {
									return new Promise(function (_res) {
										if (typeof params.firstLevel === "undefined" || params.firstLevel === "") {
											return _res(null);
										}
										setTimeout(() => {
											_res([
												{ label: "选项71_" + params.firstLevel, value: "71" },
												{ label: "选项72_" + params.firstLevel, value: "72" },
												{ label: "选项73_" + params.firstLevel, value: "73" },
												{ label: "选项74_" + params.firstLevel, value: "74" },
												{ label: "选项75_" + params.firstLevel, value: "75" },
												{ label: "选项76_" + params.firstLevel, value: "76" },
											]);
										}, 1000);
									});
								},
								depParams: ["firstLevel"],
							},
							comType: "MithrilSelect",
						},
						{
							label: "三级菜单",
							name: "therdLevel",
							defaultValue: "",
							selectItems: {
								name: "therdLevelArr",
								fetchFunction: async function (params) {
									return new Promise(function (_res) {
										if (
											typeof params.firstLevel === "undefined" ||
											params.firstLevel === "" ||
											typeof params.secondLevel === "undefined" ||
											params.secondLevel === ""
										) {
											return _res(null);
										}
										setTimeout(() => {
											_res([
												{ label: "选项1_" + params.firstLevel + "_" + params.secondLevel, value: "1" },
												{ label: "选项2_" + params.firstLevel + "_" + params.secondLevel, value: "2" },
												{ label: "选项3_" + params.firstLevel + "_" + params.secondLevel, value: "3" },
												{ label: "选项4_" + params.firstLevel + "_" + params.secondLevel, value: "4" },
												{ label: "选项5_" + params.firstLevel + "_" + params.secondLevel, value: "5" },
												{ label: "选项6_" + params.firstLevel + "_" + params.secondLevel, value: "6" },
											]);
										}, 1000);
									});
								},
								depParams: ["firstLevel", "secondLevel"],
							},
							comType: "MithrilSelect",
						},
					]}
					onSubmit={function (_values) {
						setQeryInfo({ ...queryInfo, ..._values, current: 1, pageNum: 1 });
					}}
					onReset={function (_values) {
						setQeryInfo({ ...queryInfo, ..._values, current: 1, pageNum: 1 });
					}}
					// 是否开启折叠功能
					enabledFoldable={false}
				/>
*/
