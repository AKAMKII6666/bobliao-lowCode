/**
 * 廖力编写
 * 模块名称：表单组件公用容器
 * 模块说明：用于承载表单的单个组件用 - 支持新布局风格和老的布局风格
 * 编写时间：2025-04-14 10:57:04 星期一
 */
import { Box, FormHelperText, Grid, GridProps, InputAdornment, InputLabel, Tooltip } from "@mui/material";
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement, useMemo } from "react";
import { contentGridP_layout, oldContentGridP_layout, titleGridP_layout } from "renderer/utils/utils";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { TloadingState } from "renderer/utils/dynStateHook";
import Loading from "MithalCommonLibrary/comDynStateFallback/loading";
import NullData from "MithalCommonLibrary/comDynStateFallback/nullData";
import ErrorCom from "MithalCommonLibrary/comDynStateFallback/ErrorCom";
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
 * 表单组件容器的属性定义
 */
export interface IFormComponentsContainerProps {
	/** 当前编辑模式："add"（新增）| "watch"（查看）| "edit"（编辑） */
	mode: "add" | "watch" | "edit";

	/** 表单内部子组件 */
	children: React.ReactElement | React.ReactElement[] | null | undefined;

	/** 是否显示“必填”样式标识 */
	isRequiredStyle: boolean;

	/** 标签文本，若已包含冒号则无需额外添加 */
	label: string;

	/** 表单字段名，可为字符串或字符串数组（用于嵌套字段） */
	name: string | string[];

	/** 表单实例（Formik） */
	formik: ReturnType<typeof useFormik>;

	/** 单位文本（如：元、㎡ 等，可选） */
	unit?: string;

	/** 可选项（用于下拉选择类组件，可选） */
	selectItems?: { label: string; value: string }[];

	/** 是否为多选（可选，默认 false） */
	isMutipleSelections?: boolean;

	/** 是否启用编辑状态（可选，默认 true） */
	enabled?: boolean;

	/** 标签部分的 Grid 布局属性（仅在 layoutStyle 为 "newStyle" 时有效） */
	labelGridProps?: GridProps;

	/** 组件部分的 Grid 布局属性 */
	comGridProps?: GridProps;

	/** 时间范围组件的格式（可选，如 'YYYY-MM-DD'） */
	dateFormat?: string;

	/** 自定义渲染函数（用于只读模式下的展示） */
	render?: (data: any) => any;

	/**
	 * 布局风格类型：
	 * - "newStyle": 新系统样式，labelGridProps 和 comGridProps 均有效
	 * - "oldStyle": 老系统样式，仅 comGridProps 有效
	 * 默认为 "newStyle"
	 */
	layoutStyle?: "newStyle" | "oldStyle";

	/** 是否显示该表单项（可选，默认 true） */
	isShow?: boolean;

	/**
	 * 动态参数组件的配置
	 */
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
export type Tinputprops = IFormComponentsContainerProps;
export interface Irectinfo {
	left: number;
	top: number;
	width: number;
	height: number;
}

/**
 * FormComponentsContainer
 *
 * 公用表单项容器，支持：
 * - 三种模式（新增 / 查看 / 编辑）
 * - 新旧两种布局风格
 * - 单选、多选、日期范围等多种常见控件
 */
const FormComponentsContainer: FC<IFormComponentsContainerProps> = ({
	//
	mode,
	children,
	isRequiredStyle,
	label,
	name,
	formik,
	unit = "",
	selectItems,
	isMutipleSelections = false,
	enabled = true,
	//label的grid属性
	labelGridProps,
	//组件的grid属性
	comGridProps,
	dateFormat,
	render,
	layoutStyle = "newStyle",
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
	let $ = useJquery();

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [resizeTstamp, setresizeTstamp] = useState<number>(-1);

	//===============static===================

	//===============ref======================
	const titleContainerRef = useRef(null);
	const mutationObserverRef = useRef(null);
	const containerRef = useRef(null);
	const resizeObserverRef = useRef<ResizeObserver | null>(null);

	//===============function=================
	/**
	 *创建reasize
	 */
	const createResizeObserver = function () {
		if (typeof $(titleContainerRef.current!)[0] !== "undefined") {
			let element = $(titleContainerRef.current!)[0];
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
		if (typeof $(titleContainerRef.current!)[0] !== "undefined") {
			let observer = new MutationObserver((mutationsList, observer) => {
				for (const mutation of mutationsList) {
					if (mutation.type === "childList") {
						setresizeTstamp(+new Date());
					}
				}
			});

			observer.observe($(titleContainerRef.current!).parent()[0], {
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

		let p = $(titleContainerRef.current).position();

		if (layoutStyle === "newStyle") {
			rInfo.width = $(titleContainerRef.current).outerWidth() + $(containerRef.current).outerWidth();
			rInfo.height = $(titleContainerRef.current).outerHeight();
			rInfo.left = p.left;
			rInfo.top = p.top;
		}
		if (layoutStyle === "oldStyle") {
			let paddingLeft = Number(avoidUndefined($(titleContainerRef.current).css("padding-left")).replace("px", ""));
			let paddingTop = Number(avoidUndefined($(titleContainerRef.current).css("padding-top")).replace("px", ""));

			rInfo.width = $(titleContainerRef.current).outerWidth() - paddingLeft;
			rInfo.height = $(titleContainerRef.current).outerHeight() - paddingTop;
			rInfo.left = p.left + paddingLeft;
			rInfo.top = p.top + paddingTop;
		}
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
		return obj[path];
	};

	const getValueSingle = function (name) {
		let value = getPropoty(formik.values, name);
		if (typeof value === "undefined") {
			return "-";
		}
		if (value === null) {
			return "-";
		}
		if (value === "") {
			return "-";
		}
		return value;
	};
	const getValue = function () {
		//选项
		if (typeof selectItems !== "undefined") {
			if (isMutipleSelections) {
				if (getValueSingle(name) === "-") {
					return "-";
				}
				let valueArr = getValueSingle(name).split(",");
				let rvalue = valueArr.reduce(function (acc, item, index) {
					for (let iitem of selectItems) {
						if (iitem.value.toString() === item.toString()) {
							if (acc !== "") {
								acc += ",";
							}
							acc += iitem.label;
						}
					}
					return acc;
				}, "");
				if (rvalue === "") {
					return "-";
				}
				return rvalue;
			}
			let iitem = selectItems.find(function (item) {
				if (item.value.toString() === getValueSingle(name).toString()) {
					return true;
				}
				return false;
			});
			if (iitem) {
				return iitem.label;
			}
			return "-";
		} else {
			if (Array.isArray(name)) {
				if (typeof dateFormat !== "undefined") {
					return dayjs(getValueSingle(name[0])).format(dateFormat) + "    ~     " + dayjs(getValueSingle(name[1])).format(dateFormat);
				}
				return getValueSingle(name[0]) + "    ~     " + getValueSingle(name[1]);
			}
			return getValueSingle(name);
		}
	};

	const getValueForRender = function () {
		//选项
		if (typeof selectItems !== "undefined") {
			if (isMutipleSelections) {
				if (getValueSingle(name) === "-") {
					return null;
				}
				let valueArr = getValueSingle(name).split(",");
				return valueArr.reduce(function (acc, item, index) {
					for (let iitem of selectItems) {
						if (iitem.value.toString() === item.toString()) {
							acc.push(iitem);
						}
					}
					return acc;
				}, []);
			}
			let iitem = selectItems.find(function (item) {
				if (item.value.toString() === getValueSingle(name).toString()) {
					return true;
				}
				return false;
			});
			if (iitem) {
				return iitem;
			}
			return null;
		} else {
			if (Array.isArray(name)) {
				if (typeof dateFormat !== "undefined") {
					return [dayjs(getValueSingle(name[0])).format(dateFormat), dayjs(getValueSingle(name[1])).format(dateFormat)];
				}
				return [getValueSingle(name[0]), getValueSingle(name[1])];
			}
			return getValueSingle(name);
		}
	};

	const getErrorElements = function () {
		if (Array.isArray(name)) {
			let resultElems = [];
			for (let item of name) {
				resultElems.push(
					<React.Fragment key={item}>
						{getPropoty(formik.touched, item) && getPropoty(formik.errors, item) && (
							<Box sx={{ height: 14 }}>
								<FormHelperText error={true}>{getPropoty(formik.errors, item) as string}</FormHelperText>
							</Box>
						)}
					</React.Fragment>
				);
			}
			return resultElems;
		}
		return (
			<>
				{getPropoty(formik.touched, name) && getPropoty(formik.errors, name) && (
					<Box sx={{ height: 14 }}>
						<FormHelperText error={true}>{getPropoty(formik.errors, name) as string}</FormHelperText>
					</Box>
				)}
			</>
		);
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
		if (comName === "TextField") {
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
		if (comName === "SingleDatePicker") {
			return "请输入";
		}
		if (comName === "NumberRangeInput") {
			return "";
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
		//附加单位
		if (unit !== "") {
			props.InputProps = { endAdornment: <InputAdornment position="start">{unit}</InputAdornment> };
		}

		let comName = getComName();
		if (comName === "TextField") {
			props = propsMerger(
				{
					...{
						name: name,
						size: "small",
						fullWidth: true,
						sx: { mt: 0 },
						value: getPropoty(formik.values, name),
						onChange: formik.handleChange,
						disabled: !enabled,
					},
					...props,
				},
				{}
			);
		}
		if (comName === "CustomNumberInput") {
			props = propsMerger(
				{
					...{
						name: name,
						size: "small",
						fullWidth: true,
						sx: { mt: 0 },
						value: getPropoty(formik.values, name),
						onChange: function (_value) {
							formik.setFieldValue(name as string, _value);
						},
						disabled: !enabled,
					},
					...props,
				},
				{}
			);
		}
		if (comName === "MithrilSelect" && isMutipleSelections === false) {
			props = propsMerger(
				{
					...{
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
								formik.setFieldValue(name as string, "");
								return;
							}
							formik.setFieldValue(name as string, _value);
						},
						disabled: !enabled,
						multiple: isMutipleSelections,
					},
					...props,
				},
				{}
			);
		}

		if (comName === "MithrilSelect" && isMutipleSelections === true) {
			props = propsMerger(
				{
					...{
						name: name,
						size: "small",
						data: selectItems ? selectItems : [{ label: "暂无选项", value: "-99" }],
						sx: { width: "100%" },
						value: (function () {
							let value = getPropoty(formik.values, name);
							return typeof value !== "undefined" && value !== null && value !== "" ? value.toString().split(",") : [];
						})(),
						onChange: function (_value) {
							if (!_value || _value.length === 0) {
								formik.setFieldValue(name as string, "");
								return;
							}
							formik.setFieldValue(
								name as string,
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
						disabled: !enabled,
						multiple: isMutipleSelections,
					},
					...props,
				},
				{}
			);
		}

		if (comName === "MithrilAutocomplete" && isMutipleSelections === false) {
			props = propsMerger(
				{
					...{
						data: selectItems ? selectItems : [{ label: "暂无选项", value: "-99" }],
						sx: { width: "100%" },
						value: (function () {
							let value = getPropoty(formik.values, name);
							if (value === null || value === "" || value === "-") {
								return null;
							}
							return selectItems.find(function (item) {
								try {
									if (item.value.toString() === value.toString()) {
										return true;
									}
								} catch (_e) {
									console.log("::formComponentsContainer::MithrilAutocomplete::选项渲染出错:");
									console.log(item.value);
								}
								return false;
							});
						})(),
						onChange: function (_value) {
							if (!_value) {
								formik.setFieldValue(name as string, "");
								return;
							}
							formik.setFieldValue(name as string, _value.value);
						},
						disabled: !enabled,
						multiple: isMutipleSelections,
					},
					...props,
				},
				{}
			);
		}

		if (comName === "MithrilAutocomplete" && isMutipleSelections === true) {
			props = propsMerger(
				{
					...{
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
								formik.setFieldValue(name as string, "");
								return;
							}
							formik.setFieldValue(
								name as string,
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
						disabled: !enabled,
						multiple: isMutipleSelections,
					},
					...props,
				},
				{}
			);
		}
		if (comName === "AntdDateRangePacker" && typeof dateFormat !== "undefined" && Array.isArray(name)) {
			props = propsMerger(
				{
					...{
						sx: { width: "100%", marginLeft: "0", height: "40.125px" },
						style: { width: "100%", marginLeft: "0", height: "40.125px" },
						format: dateFormat,
						needConfirm: false,
						defaultValue: (function () {
							let start = getPropoty(formik.values, name[0]);
							let end = getPropoty(formik.values, name[1]);
							if (typeof start === "undefined" || start === null || start === "" || typeof end === "undefined" || end === null || end === "") {
								return undefined;
							}
							return [dayjs(getPropoty(formik.values, name[0])), dayjs(getPropoty(formik.values, name[1]))];
						})(),
						value: (function () {
							let start = getPropoty(formik.values, name[0]);
							let end = getPropoty(formik.values, name[1]);
							if (typeof start === "undefined" || start === null || start === "" || typeof end === "undefined" || end === null || end === "") {
								return undefined;
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
						disabled: !enabled,
						showHelperText: false,
					},
					...props,
				},
				{}
			);
		}
		if (comName === "NumberRangeInput" && Array.isArray(name)) {
			delete props.placeholder;
			props = propsMerger(
				{
					...{
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
						sx: { width: "100%" },
						placeholder: [label, label],
						name: name,
						size: "small",
					},
					...props,
				},
				{}
			);
		}
		if (comName === "MithrilTextArea") {
			props = propsMerger(
				{
					...{
						name: name,
						size: "small",
						fullWidth: true,
						sx: { width: "100%" },
						value: getPropoty(formik.values, name),
						onChange: formik.handleChange,
						disabled: !enabled,
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
					...props,
				},
				{}
			);
		}

		if (comName === "MithrilYesNoSwitch") {
			props = propsMerger(
				{
					...{
						yesStr: selectItems[0].label,
						noStr: selectItems[1].label,
						value: getPropoty(formik.values, name),
						onChange: function (_value) {
							if (_value) {
								formik.setFieldValue(name as string, "0");
							} else {
								formik.setFieldValue(name as string, "1");
							}
						},
						enabled: enabled,
					},
					...props,
				},
				{}
			);
		}
		if (comName === "SingleDatePicker") {
			let _value = getPropoty(formik.values, name);
			props = propsMerger(
				{
					...{
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
							".MuiOutlinedInput-input": {
								height: "10px",
							},
							mt: "5px",
							width: "100%",
						},
						value: _value ? dayjs(_value) : undefined,
						disabled: !enabled,
					},
					...props,
				},
				{}
			);
		}
		return props;
	};

	//生成新式风格
	let makeNewStyleLayout = function () {
		let labelElem = (
			<InputLabel>
				{(function () {
					if (isRequiredStyle && mode !== "watch") {
						return <label style={{ color: "red" }}>*</label>;
					}
					return null;
				})()}
				{label}:
			</InputLabel>
		);
		let _titleGridP_layout = structuredClone(titleGridP_layout);
		if (getComName() === "MithrilTextArea") {
			_titleGridP_layout.style.alignItems = "flex-start";
			_titleGridP_layout.style.alignContent = "flex-start";
		}
		return (
			<>
				{/* 标题 */}
				<Grid ref={titleContainerRef} {...(typeof labelGridProps === "undefined" ? _titleGridP_layout : labelGridProps)}>
					{/* 标题 */}
					{(function () {
						if (label.length > 8) {
							return (
								<Tooltip title={label} placement="top" arrow>
									{labelElem}
								</Tooltip>
							);
						}
						return labelElem;
					})()}
				</Grid>
				{/* 组件 */}
				<Grid
					ref={containerRef}
					{...(typeof comGridProps === "undefined" ? contentGridP_layout : comGridProps)}
					onBlur={function () {
						if (mode !== "watch") {
							if (getComName() !== "AntdDateRangePacker") {
								setTimeout(() => {
									formik.setFieldTouched(name as string, true);
								}, 50);
							}
						}
					}}
					onClick={dynOnclick}
					style={getDynStateParentStyle()}
				>
					{getFallBackElements()}
					{(function () {
						//如果是查看，就仅展示字段
						if (mode === "watch") {
							if (typeof render !== "undefined") {
								return render(getValueForRender());
							}
							return (
								<>
									{getValue()}
									{(function () {
										if (unit !== "") {
											return <> &nbsp;&nbsp;{unit}</>;
										}
										return null;
									})()}
								</>
							);
						}
						return (
							<>
								{/* {children} */}
								{React.cloneElement(children as ReactElement, getComProps())}
								{/* 错误信息 */}
								{getErrorElements()}
							</>
						);
					})()}
				</Grid>
			</>
		);
	};

	//生成旧式风格
	const makeOldStyleLayout = function () {
		return (
			<>
				<Grid
					ref={titleContainerRef}
					{...(typeof comGridProps === "undefined" ? oldContentGridP_layout : comGridProps)}
					onBlur={function () {
						if (mode !== "watch") {
							if (getComName() !== "AntdDateRangePacker") {
								setTimeout(() => {
									formik.setFieldTouched(name as string, true);
								}, 50);
							}
						}
					}}
					onClick={dynOnclick}
					style={getDynStateParentStyle()}
				>
					{getFallBackElements()}
					<InputLabel>
						{label}
						{(function () {
							if (isRequiredStyle && mode !== "watch") {
								return <label style={{ color: "red" }}>*</label>;
							}
							return null;
						})()}
					</InputLabel>
					{/* 组件 */}
					{(function () {
						//如果是查看，就仅展示字段
						if (mode === "watch") {
							if (typeof render !== "undefined") {
								return render(getValueForRender());
							}
							return (
								<>
									{getValue()}
									{(function () {
										if (unit !== "") {
											return <> &nbsp;&nbsp;{unit}</>;
										}
										return null;
									})()}
								</>
							);
						}
						return (
							<>
								{/* {children} */}
								{React.cloneElement(children as ReactElement, getComProps())}
								{/* 错误信息 */}
								{getErrorElements()}
							</>
						);
					})()}
				</Grid>
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
			if (isInLowCodeMode) {
				clearObserver();
			}
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
				if (isShow) {
					if (layoutStyle === "newStyle") {
						return makeNewStyleLayout();
					}
					return makeOldStyleLayout();
				} else {
					return null;
				}
			})()}
		</>
	);
};
//为防止在编译和混淆后，无法识别组件名称，所以在这里显示定义名称
FormComponentsContainer.displayName = "FormComponentsContainer";
export default FormComponentsContainer;
