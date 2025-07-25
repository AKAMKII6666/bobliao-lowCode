/**
 * 廖力编写
 * 模块名称：公用查询组件容器
 * 模块说明：用于快速开发查询条件栏目,将大量重复的查询条件组件中的编码集中到这个组件里进行
 * 编写时间：2025-05-06 18:48:00 星期二
 */
import { Grid, GridProps } from "@mui/material";
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import dayjs from "dayjs";
import { inqueryItemGridSize_public } from "renderer/utils/utils";
import { TloadingState } from "renderer/utils/dynStateHook";
import Loading from "MithalCommonLibrary/comDynStateFallback/loading";
import NullData from "MithalCommonLibrary/comDynStateFallback/nullData";
import ErrorCom from "MithalCommonLibrary/comDynStateFallback/ErrorCom";
import { Irectinfo } from "MithalCommonLibrary/formComponentsContainer";
import useJquery from "@bobliao/use-jquery-hook";

//选项的状态
export interface IdynState {
	//状态
	state: TloadingState;
	//是否有错误
	hasError: boolean;
	//错误信息
	msg: string;
}

export interface IdynStateSetting {
	//当前状态
	currentState: IdynState | null;
	//当选项还未开始加载时应该怎么显示(只在填写了动态参数时有效)
	loadingUnstarted?: "showUnstartedStyle" | "hide" | "none";
	//当选项正在加载时应该怎么显示(只在填写了动态参数时有效)
	loading?: "showLoadingFallback" | "hide" | "none";
	//当选项加载数据为空时应该怎么显示(只在填写了动态参数时有效)
	null?: "showNullFallback" | "hide" | "none";
	//当选项加载错误时应该怎么显示(只在填写了动态参数时有效)
	error?: "showErrorFallback" | "hide" | "none";
	//未开始加载时的样式
	unstartedStyle?: React.CSSProperties;
	//加载中的fallback
	loadingFallback?: ReactElement | ReactElement[];
	//空数据的fallback
	nullFallback?: ReactElement | ReactElement[];
	//出错时的fallback
	errorFallback?: ReactElement | ReactElement[];
	//错误和空数据时的点击事件
	nullAndErrorClick?: (v: IdynState) => void;
}

/**
 * 传入参数
 */
export interface IPublicInqueryItemprops {
	//组件
	children: React.ReactElement | React.ReactElement[] | null | undefined;
	//显示名称 带冒号了不用打冒号
	label?: string;
	//数据名称
	name?: string | string[];
	//表单组件
	formik?: any;
	//选项
	selectItems?: { label: string; value: string }[];
	//组件的grid属性
	comGridProps?: GridProps;
	//时间范围组件的格式
	dateFormat?: string;
	//是否多选
	isMutipleSelections?: boolean;
	//标题宽度
	labelWidth?: number | string;
	//是否显示
	isShow?: boolean;
	//动态参数组件的配置
	dynStatesSetting?: IdynStateSetting;
	/**
	 是否在低代码编辑器内 
	*/
	isInLowCodeMode?: boolean;
	/**
	 * 强制更新rectinfo (isInLowCodeMode = true)才有效
	 */
	forceUpdateRectInfoStamp?: number;
	/* 节点位置  (isInLowCodeMode = true)才有效*/
	nodeIndex?: number;
	/**
	 * 上报rect信息（x,y,width,height） (isInLowCodeMode = true)才有效
	 */
	reportRectInfo?: (index: number, values: Irectinfo) => void;
}

//往外面暴露统一名称的属性对象，用于生成低代码平台属性JSON schema
export type Tinputprops = IPublicInqueryItemprops;

const PublicInqueryItem: FC<IPublicInqueryItemprops> = ({
	//
	children,
	label,
	name,
	formik,
	selectItems,
	comGridProps,
	dateFormat = "YYYY-MM-DD",
	isMutipleSelections = false,
	labelWidth = 120,
	isShow = true,
	dynStatesSetting,
	isInLowCodeMode = false,
	nodeIndex = 0,
	forceUpdateRectInfoStamp = -1,
	reportRectInfo = (index, val) => {},
}): ReactElement => {
	//===============useHooks=================
	//初始化合并默认值
	dynStatesSetting = {
		...{
			currentState: null,
			loadingUnstarted: "showUnstartedStyle",
			loading: "showLoadingFallback",
			null: "showNullFallback",
			error: "showErrorFallback",
			unstartedStyle: { opacity: "0.5" },
			loadingFallback: <Loading></Loading>,
			nullFallback: <NullData></NullData>,
			errorFallback: <ErrorCom></ErrorCom>,
			nullAndErrorClick: function (value) {},
		},
		...dynStatesSetting,
	};

	const $ = useJquery();

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [resizeTstamp, setresizeTstamp] = useState<number>(-1);

	//===============static===================

	//===============ref======================
	const containerRef = useRef(null);
	const mutationObserverRef = useRef(null);
	const resizeObserverRef = useRef<ResizeObserver | null>(null);

	//===============function=================

	/**
	 *创建reasize
	 */
	const createResizeObserver = function () {
		if (typeof $(containerRef.current!)[0] !== "undefined") {
			let element = $(containerRef.current!)[0];
			resizeObserverRef.current = new ResizeObserver((entries) => {
				if (entries.length > 0) {
					setresizeTstamp(+new Date());
				}
			});
			resizeObserverRef.current.observe(element);
		}
	};

	/* 创建节点变化MutationObserver */
	const createMutationObserver = function () {
		if (typeof $(containerRef.current!)[0] !== "undefined") {
			let observer = new MutationObserver((mutationsList, observer) => {
				for (const mutation of mutationsList) {
					if (mutation.type === "childList") {
						setresizeTstamp(+new Date());
					}
				}
			});

			observer.observe($(containerRef.current!).parent()[0], {
				childList: true, // 监听子节点的增删
				attributes: false, // 监听属性变化
				characterData: false, // 监听文本变化（如 innerText）
				subtree: false, // 监听所有子节点（递归）
			});
			mutationObserverRef.current = observer;
		}
	};

	/**
	 *清除resize
	 */
	const clearObserver = function () {
		if (resizeObserverRef.current !== null) {
			resizeObserverRef.current.disconnect();
			resizeObserverRef.current = null;
		}
		if (mutationObserverRef.current !== null) {
			mutationObserverRef.current.disconnect();
			mutationObserverRef.current = null;
		}
	};

	const avoidUndefined = function (obj: any) {
		if (typeof obj === "undefined") {
			return "0";
		}
		return obj;
	};

	/* 测量大小并上报 */
	const getRectAndreport = function () {
		let rInfo: Irectinfo = {
			width: 0,
			height: 0,
			top: 0,
			left: 0,
		};

		let p = $(containerRef.current).position();

		rInfo.width = $(containerRef.current).outerWidth();
		rInfo.height = $(containerRef.current).outerHeight();
		rInfo.left = p.left;
		rInfo.top = p.top;
		reportRectInfo(nodeIndex, rInfo);
	};

	//根据异步状态的配置返回该组件是否应该显示
	const getDynStateShow = function () {
		if (dynStatesSetting.currentState !== null) {
			//还没开始加载且设置为hide
			if (dynStatesSetting.currentState.state === "unstarted" && dynStatesSetting.loadingUnstarted === "hide") {
				return false;
			}
			//正在加载且设置为hide
			if (dynStatesSetting.currentState.state === "padding" && dynStatesSetting.loading === "hide") {
				return false;
			}
			//空数据且设置为hide
			if (dynStatesSetting.currentState.state === "finished nulldata" && dynStatesSetting.null === "hide") {
				return false;
			}
			//出错且设置为hide
			if (dynStatesSetting.currentState.state === "finished error" && dynStatesSetting.error === "hide") {
				return false;
			}
		}
		return true;
	};

	//获得动态参数的父级节点的样式
	const getDynStateParentStyle = function (): React.CSSProperties {
		if (dynStatesSetting.currentState !== null) {
			//还没开始加载并设置了样式
			if (dynStatesSetting.currentState.state === "unstarted" && dynStatesSetting.loadingUnstarted === "showUnstartedStyle") {
				return dynStatesSetting.unstartedStyle;
			}
			//正在加载且设置了fallback
			if (dynStatesSetting.currentState.state === "padding" && dynStatesSetting.loading === "showLoadingFallback") {
				return { position: "relative" };
			}
			//空数据且设置了fallback
			if (dynStatesSetting.currentState.state === "finished nulldata" && dynStatesSetting.null === "showNullFallback") {
				return { position: "relative" };
			}
			//出错且设置了fallback
			if (dynStatesSetting.currentState.state === "finished error" && dynStatesSetting.error === "showErrorFallback") {
				return { position: "relative" };
			}
		}
		return {};
	};

	//获得动态参数的fallback
	const getFallBackElements = function () {
		if (dynStatesSetting.currentState !== null) {
			//正在加载且设置了fallback
			if (dynStatesSetting.currentState.state === "padding" && dynStatesSetting.loading === "showLoadingFallback") {
				return dynStatesSetting.loadingFallback;
			}
			//空数据且设置了fallback
			if (dynStatesSetting.currentState.state === "finished nulldata" && dynStatesSetting.null === "showNullFallback") {
				return dynStatesSetting.nullFallback;
			}
			//出错且设置了fallback
			if (dynStatesSetting.currentState.state === "finished error" && dynStatesSetting.error === "showErrorFallback") {
				return dynStatesSetting.errorFallback;
			}
		}
		return null;
	};

	//动态组件状态下的点击事件
	const dynOnclick = function () {
		if (dynStatesSetting.currentState !== null) {
			//空数据且设置了fallback
			if (dynStatesSetting.currentState.state === "finished nulldata" && dynStatesSetting.null === "showNullFallback") {
				dynStatesSetting.nullAndErrorClick(dynStatesSetting.currentState);
			}
			//出错且设置了fallback
			if (dynStatesSetting.currentState.state === "finished error" && dynStatesSetting.error === "showErrorFallback") {
				dynStatesSetting.nullAndErrorClick(dynStatesSetting.currentState);
			}
		}
	};

	// 动态拆分访问
	const getNestedProperty = (obj, path) => {
		return path.split(".").reduce((acc, part) => acc?.[part], obj);
	};
	const getPropoty = function (obj, path) {
		if (path.indexOf(".") !== -1) {
			return getNestedProperty(obj, path);
		}
		if (typeof obj[path] === "undefined") {
			return "";
		}
		return obj[path];
	};

	//获得组件名称
	const getComName = function () {
		let name = "";
		const type = (children as any).type;
		name = type?.displayName || type?.name || type?.render?.name || "";
		return name;
	};

	//获得组件对应的placeholder提示前缀
	const getPlaceHolder = function () {
		let comName = getComName();
		if (comName === "MithrilInput") {
			return "请输入";
		}
		if (comName === "CustomNumberInput") {
			return "请输入";
		}
		if (comName === "MithrilSelect") {
			return "请选择";
		}
		if (comName === "AntdDateRangePacker") {
			return "请选择";
		}
		if (comName === "MithrilAutocomplete") {
			return "请选择";
		}
		if (comName === "MithrilTextArea") {
			return "请输入";
		}
		if (comName === "NumberRangeInput") {
			return "";
		}
		if (comName === "SingleDatePicker") {
			return "请输入";
		}
		return "请输入";
	};

	/* 属性合并器 */
	const propsMerger = function (props, p2) {
		for (var i in props) {
			if (props.hasOwnProperty(i)) {
				let value = props[i];
				if (typeof (children as any).props[i] === "undefined") {
					p2[i] = value;
				}
			}
		}
		return p2;
	};

	const getComProps = function () {
		let props: any = {
			placeholder: getPlaceHolder() + label,
		};

		let comName = getComName();
		if (comName === "MithrilInput") {
			props = propsMerger(
				{
					label: label,
					labelWidth: labelWidth,
					name: name,
					sx: { width: "100%" },
					onChange: formik.handleChange,
					value: getPropoty(formik.values, name),
				},
				props
			);
		}

		if (comName === "CustomNumberInput") {
			props = propsMerger(
				{
					label: label,
					labelWidth: labelWidth,
					name: name,
					sx: { width: "100%" },
					size: "small",
					onChange: function (value) {
						formik.setFieldValue(name, value);
					},
					value: getPropoty(formik.values, name),
				},
				props
			);
		}
		if (comName === "MithrilSelect" && isMutipleSelections === false) {
			props = propsMerger(
				{
					label: label,
					labelWidth: labelWidth,
					name: name,
					size: "small",
					data: selectItems ? selectItems : [{ label: "暂无选项", value: "-99" }],
					sx: { width: "100%" },
					value: (function () {
						let value = getPropoty(formik.values, name);
						return typeof value !== "undefined" && value !== null ? getPropoty(formik.values, name).toString() : "";
					})(),
					onChange: function (_value) {
						if (!_value) {
							formik.setFieldValue(name, "");
							return;
						}
						formik.setFieldValue(name, _value);
					},

					multiple: isMutipleSelections,
				},
				props
			);
		}

		if (comName === "MithrilSelect" && isMutipleSelections === true) {
			props = propsMerger(
				{
					label: label,
					name: name,
					labelWidth: labelWidth,
					size: "small",
					data: selectItems ? selectItems : [{ label: "暂无选项", value: "-99" }],
					sx: { width: "100%" },
					value: (function () {
						let value = getPropoty(formik.values, name);
						return typeof value !== "undefined" && value !== null && value !== "" ? value.toString().split(",") : [];
					})(),
					onChange: function (_value) {
						if (!_value || _value.length === 0) {
							formik.setFieldValue(name, "");
							return;
						}
						formik.setFieldValue(
							name,
							_value
								.reduce(function (acc, item, index) {
									if (item !== "") {
										acc.push(item.toString());
									}
									return acc;
								}, [])
								.join(",")
						);
					},

					multiple: isMutipleSelections,
				},
				props
			);
		}

		if (comName === "MithrilAutocomplete" && isMutipleSelections === false) {
			props = propsMerger(
				{
					label: label,
					labelWidth: labelWidth,
					data: selectItems ? selectItems : [{ label: "暂无选项", value: "-99" }],
					sx: { width: "100%" },
					value: (function () {
						let value = getPropoty(formik.values, name);
						if (value === null || value === "" || value === "-") {
							return null;
						}
						return selectItems.find(function (item) {
							if (item.value.toString() === value.toString()) {
								return true;
							}
							return false;
						});
					})(),
					onChange: function (_value) {
						if (!_value) {
							formik.setFieldValue(name, "");
							return;
						}
						formik.setFieldValue(name, _value.value);
					},

					multiple: isMutipleSelections,
				},
				props
			);
		}

		if (comName === "MithrilAutocomplete" && isMutipleSelections === true) {
			props = propsMerger(
				{
					label: label,
					labelWidth: labelWidth,
					data: selectItems ? selectItems : [{ label: "暂无选项", value: "-99" }],
					sx: { width: "100%" },
					value: (function () {
						let value = getPropoty(formik.values, name);
						let values = typeof value !== "undefined" && value !== null && value !== "" ? value.toString().split(",") : [];

						return values.reduce(function (acc, item, index) {
							for (let sItem of selectItems) {
								if (sItem.value.toString() === item.toString()) {
									acc.push(sItem);
								}
							}
							return acc;
						}, []);
					})(),
					onChange: function (_value) {
						if (!_value || _value.length === 0) {
							formik.setFieldValue(name, "");
							return;
						}
						formik.setFieldValue(
							name,
							_value
								.reduce(function (acc, item, index) {
									if (item !== "") {
										acc.push(item.value.toString());
									}
									return acc;
								}, [])
								.join(",")
						);
					},

					multiple: isMutipleSelections,
				},
				props
			);
		}
		if (comName === "AntdDateRangePacker" && typeof dateFormat !== "undefined" && Array.isArray(name)) {
			props = propsMerger(
				{
					label: label,
					sx: { width: "100%", marginLeft: "0", height: "40.125px" },
					labelWidth: labelWidth,
					format: dateFormat,
					needConfirm: false,
					defaultValue: (function () {
						let start = getPropoty(formik.values, name[0]);
						let end = getPropoty(formik.values, name[1]);
						if (typeof start === "undefined" || start === null || start === "" || typeof end === "undefined" || end === null || end === "") {
							return [null, null];
						}
						return [dayjs(getPropoty(formik.values, name[0])), dayjs(getPropoty(formik.values, name[1]))];
					})(),
					value: (function () {
						let start = getPropoty(formik.values, name[0]);
						let end = getPropoty(formik.values, name[1]);
						if (typeof start === "undefined" || start === null || start === "" || typeof end === "undefined" || end === null || end === "") {
							return [null, null];
						}
						return [dayjs(getPropoty(formik.values, name[0])), dayjs(getPropoty(formik.values, name[1]))];
					})(),
					onChange: (start, end) => {
						const formatStr = dateFormat;
						formik.setFieldValue(name[0], start ? dayjs(start).format(formatStr) : "");
						formik.setFieldValue(name[1], end ? dayjs(end).format(formatStr) : "");
						setTimeout(() => {
							formik.setFieldTouched(name[0], true);
							formik.setFieldTouched(name[1], true);
						}, 50);
					},

					showHelperText: false,
				},
				props
			);
		}

		if (comName === "SingleDatePicker") {
			let _value = getPropoty(formik.values, name);
			props = propsMerger(
				{
					label: label,
					labelWidth: labelWidth,
					format: dateFormat,
					onAccept: (value) => {
						if (!value) {
							return;
						}
						const formatStr = dateFormat;
						formik.setFieldValue("birthday", dayjs(value).format(formatStr));
					},
					onChange: (value) => {
						if (!value || !value.isValid()) {
							return;
						}
						const formatStr = dateFormat;
						formik.setFieldValue("birthday", dayjs(value).format(formatStr));
					},
					sx: {
						flexGrow: 1,
						height: "40.125px",
						"& .MuiInputBase-input": {
							padding: "9.9px 14px",
						},
					},
					value: _value ? dayjs(_value) : undefined,
				},
				props
			);
			if (dateFormat === "YYYY-MM") {
				props.maxDate = dayjs().subtract(1, "month");
				props.displayWeekNumber = false;
				props.views = ["year", "month"];
			}
			if (dateFormat === "YYYY") {
				props.maxDate = dayjs().subtract(1, "year");
				props.displayWeekNumber = false;
				props.views = ["year"];
			}
		}

		if (comName === "NumberRangeInput" && Array.isArray(name)) {
			delete props.placeholder;
			props = propsMerger(
				{
					label: label,
					labelWidth: labelWidth,
					sx: { width: "100%" },
					value: (function () {
						let start = getPropoty(formik.values, name[0]);
						let end = getPropoty(formik.values, name[1]);

						return [start, end];
					})(),
					onChange: function ([start, end]) {
						console.log(start, end);
						formik.setFieldValue(name[0], start);
						formik.setFieldValue(name[1], end);
					},
					placeholder: [label + "-开始", label + "-结束"],
					name: name,
					size: "small",
				},
				props
			);
		}
		if (comName === "MithrilTextArea") {
			props = propsMerger(
				{
					label: label,
					name: name,
					labelWidth: labelWidth,
					size: "small",
					fullWidth: true,
					sx: { width: "100%" },
					value: getPropoty(formik.values, name),
					onChange: formik.handleChange,

					InputProps: {
						rows: 3,
						multiline: true,
						inputComponent: "textarea",
					},
					helperText: (function () {
						let val = getPropoty(formik.values, name);
						if (typeof val !== "undefined" && val !== null) {
							return val.length + `/` + (children as any).props.maxLength;
						}
						return `0/` + (children as any).props.maxLength;
					})(),
					FormHelperTextProps: {
						sx: { textAlign: "right", paddingRight: 4, width: "100%" }, // 让 helperText 右对齐
					},
				},
				props
			);
		}

		if (comName === "MithrilYesNoSwitch") {
			props = propsMerger(
				{
					label: label,
					yesStr: selectItems[0].label,
					noStr: selectItems[1].label,
					value: getPropoty(formik.values, name),
					onChange: function (_value) {
						if (_value) {
							formik.setFieldValue(name, "0");
						} else {
							formik.setFieldValue(name, "1");
						}
					},
				},
				props
			);
		}

		return props;
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
			clearObserver();
			setIsMounted(false);
		};
	}, []);

	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted) {
				setresizeTstamp(+new Date());
			}
		},
		[isMounted]
	);

	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted && isInLowCodeMode) {
				createResizeObserver();
				createMutationObserver();
			}
		},
		[isMounted, isInLowCodeMode]
	);

	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted && isInLowCodeMode) {
				getRectAndreport();
			}
		},
		[resizeTstamp]
	);
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted && isInLowCodeMode) {
				getRectAndreport();
			}
		},
		[forceUpdateRectInfoStamp]
	);

	return (
		<>
			{(function () {
				if (isShow && getDynStateShow()) {
					return (
						<Grid
							ref={containerRef}
							{...(typeof comGridProps === "undefined" ? inqueryItemGridSize_public : comGridProps)}
							style={getDynStateParentStyle()}
							onClick={dynOnclick}
						>
							{getFallBackElements()}
							{(function () {
								if (typeof label === "undefined" || typeof name === "undefined" || typeof formik === "undefined") {
									return children;
								}
								let newProps = getComProps();
								let newChild = React.cloneElement(children as ReactElement, newProps);
								return newChild;
							})()}
						</Grid>
					);
				}
				return null;
			})()}
		</>
	);
};
//为防止在编译和混淆后，无法识别组件名称，所以在这里显示定义名称
PublicInqueryItem.displayName = "PublicInqueryItem";
export default PublicInqueryItem;
