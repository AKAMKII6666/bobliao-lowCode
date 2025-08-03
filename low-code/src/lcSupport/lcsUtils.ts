import { lazy } from "react";
import { ITreeNode } from "./interface/ItreeNode";
const imp_MainCard = lazy(() => import("MithalCommonLibrary/MainCard"));
const imp_div = lazy(() => import("./components/Div/index"));
const imp_ul = lazy(() => import("./components/Ul/index"));
const imp_li = lazy(() => import("./components/Li/index"));
const imp_span = lazy(() => import("./components/Span/index"));
const imp_label = lazy(() => import("./components/Label/index"));
const imp_input = lazy(() => import("./components/Input/index"));
const imp_Stack = lazy(() => import("MithalCommonLibrary/Stack"));
const imp_Grid = lazy(() => import("MithalCommonLibrary/Grid"));
const imp_Icon = lazy(() => import("MithalCommonLibrary/Icon"));
const imp_IconButton = lazy(() => import("MithalCommonLibrary/IconButton"));
const imp_SpecialEcharts = lazy(() => import("MithalCommonLibrary/SpecialEcharts"));
const imp_PageRoot = lazy(() => import("./components/PageRoot"));
const imp_Button = lazy(() => import("MithalCommonLibrary/Button"));
const imp_AntdDateRangePacker = lazy(() => import("MithalCommonLibrary/AntdDateRangePacker"));
const imp_SingleDatePicker = lazy(() => import("MithalCommonLibrary/SingleDatePicker"));
const imp_MithrilAutocomplete = lazy(() => import("MithalCommonLibrary/MithrilAutocomplete"));
const imp_AutoForm = lazy(() => import("MithalCommonLibrary/AutoForm"));
const imp_CustomNumberInput = lazy(() => import("MithalCommonLibrary/CustomNumberInput"));
const imp_NumberRangeInput = lazy(() => import("MithalCommonLibrary/numberRangeInput"));
const imp_MithrilAntdTable = lazy(() => import("MithalCommonLibrary/MithrilAntdTable"));
const imp_MithrilTextArea = lazy(() => import("MithalCommonLibrary/MithrilTextArea"));
const imp_MithrilYesNoSwitch = lazy(() => import("MithalCommonLibrary/MithrilYesNoSwitch"));
const imp_MithrilInput = lazy(() => import("MithalCommonLibrary/MithrilInput"));
const imp_TextField = lazy(() => import("MithalCommonLibrary/TextField"));
const imp_MithrilSelect = lazy(() => import("MithalCommonLibrary/MithrilSelect"));
const imp_CommonInquery = lazy(() => import("MithalCommonLibrary/CommonInquery"));

/**
 * 组件映射表
 */
export const ComponentNameMap = {
	MainCard: imp_MainCard,
	div: imp_div,
	ul: imp_ul,
	li: imp_li,
	span: imp_span,
	label: imp_label,
	input: imp_input,
	Stack: imp_Stack,
	Grid: imp_Grid,
	PageRoot: imp_PageRoot,
	Button: imp_Button,
	AntdDateRangePacker: imp_AntdDateRangePacker,
	SingleDatePicker: imp_SingleDatePicker,
	MithrilAutocomplete: imp_MithrilAutocomplete,
	AutoForm: imp_AutoForm,
	CustomNumberInput: imp_CustomNumberInput,
	NumberRangeInput: imp_NumberRangeInput,
	MithrilAntdTable: imp_MithrilAntdTable,
	MithrilTextArea: imp_MithrilTextArea,
	MithrilYesNoSwitch: imp_MithrilYesNoSwitch,
	MithrilInput: imp_MithrilInput,
	TextField: imp_TextField,
	MithrilSelect: imp_MithrilSelect,
	CommonInquery: imp_CommonInquery,
	Icon: imp_Icon,
	IconButton: imp_IconButton,
	SpecialEcharts: imp_SpecialEcharts,
};

/**
 * 生成时用的引用字符串映射表
 */
export const importStringMap = {
	MainCard: "MithalCommonLibrary/MainCard",
	Stack: "MithalCommonLibrary/Stack",
	Grid: "MithalCommonLibrary/Grid",
	Button: "MithalCommonLibrary/Button",
	AntdDateRangePacker: "MithalCommonLibrary/AntdDateRangePacker",
	SingleDatePicker: "MithalCommonLibrary/SingleDatePicker",
	MithrilAutocomplete: "MithalCommonLibrary/MithrilAutocomplete",
	AutoForm: "MithalCommonLibrary/AutoForm",
	CustomNumberInput: "MithalCommonLibrary/CustomNumberInput",
	NumberRangeInput: "MithalCommonLibrary/numberRangeInput",
	MithrilAntdTable: "MithalCommonLibrary/MithrilAntdTable",
	MithrilTextArea: "MithalCommonLibrary/MithrilTextArea",
	MithrilYesNoSwitch: "MithalCommonLibrary/MithrilYesNoSwitch",
	MithrilInput: "MithalCommonLibrary/MithrilInput",
	TextField: "MithalCommonLibrary/TextField",
	MithrilSelect: "MithalCommonLibrary/MithrilSelect",
	CommonInquery: "MithalCommonLibrary/CommonInquery",
	Icon: "MithalCommonLibrary/Icon",
	IconButton: "MithalCommonLibrary/IconButton",
	SpecialEcharts: "MithalCommonLibrary/SpecialEcharts",
};

/**
 * 节点类型定义
 */
export const NodeTypeMap = {
	layout: "布局组件",
	component: "控件",
};

/* echarts图表的默认配置 */
const echartDefaulyProps = {
	grid: {
		left: 26, // 左边距
		right: 16, // 右边距
		top: "87.5px", // 顶部边距
		bottom: 24, // 底部边距
		containLabel: true, // 确保 label 也在可视区域内
	},
	tooltip: {
		trigger: "axis",
		axisPointer: {
			type: "cross",
			label: {
				backgroundColor: "#686A6A",
			},
		},
	},
	xAxis: {
		type: "category",
		data: ["2025-01-01", "2025-01-02", "2025-01-03", "2025-01-04", "2025-01-05", "2025-01-06", "2025-01-07"],
		splitLine: {
			show: false, // 隐藏 X 轴网格线
		},
		axisLine: {
			show: false, // 隐藏X轴的线条
		},
		axisTick: {
			show: false, // 显示刻度线
		},
		axisLabel: {
			color: "#686A6A", // 设置字体颜色
			fontSize: "12px", // 设置字体大小
		},
	},
	yAxis: {
		type: "value",
		splitLine: {
			show: true, // 隐藏 X 轴网格线
			lineStyle: {
				type: "dashed", // 设置为虚线
				color: "rgba(1, 147, 118, 0.20)", // 设置颜色
			},
		},
		axisLine: {
			show: false, // 隐藏X轴的线条
		},
		axisLabel: {
			color: "#686A6A", // 设置字体颜色
			fontSize: "12px", // 设置字体大小
			align: "left", // 左对齐
			inside: true, // 保持在 Y 轴外部
			margin: -10, // 文字靠近 Y 轴
		},
	},
	series: [
		{
			data: [20, 30, 40, 50, 60, 70, 80],
			barWidth: "20px",
			itemStyle: {
				color: "#019376",
				borderRadius: [4, 4, 4, 4],
			},
			type: "bar",
		},
	],
};

/**
 * htmlDiv的属性
 */
const HTMLDIVprops = {
	style: {
		width: "600px",
		height: "500px",
		padding: "1px",
	},
};

/**
 * 可拖拽节点定义
 */
export const components: ITreeNode[] = [
	/*****************************************************************布局组件 */
	/* {
		nodeid: "",
		name: "PageRoot",
		label: "页面根节点",
		props: {},
		nodetype: "layout",
		componentType: "pageRoot",
		containerType: [],
		isTached: false,
		children: [],
	}, */
	{
		nodeid: "",
		name: "MainCard",
		label: "页面块状布局卡片",
		props: {
			title: "主卡片",
		},
		nodetype: "layout",
		componentType: "MainCard",
		containerType: ["div", "gridItem", "pageRoot", "Stack"],
		isTached: false,
		children: [],
	},
	{
		nodeid: "",
		name: "MainCard",
		label: "布局卡片 - 没标题",
		props: {},
		nodetype: "layout",
		componentType: "MainCard",
		containerType: ["div", "gridItem", "pageRoot", "Stack"],
		isTached: false,
		children: [],
	},
	{
		nodeid: "",
		name: "div",
		label: "HTML Div",
		props: {
			style: {
				minHeight: "100px",
				padding: "1px",
			},
		},
		nodetype: "layout",
		componentType: "div",
		containerType: ["gridItem", "pageRoot", "Stack", "div", "MainCard"],
		isTached: false,
		children: [],
	},
	{
		nodeid: "",
		name: "Stack",
		label: "MUI-Flex布局容器",
		props: {
			sx: {
				padding: "1px",
				minHeight: "200px",
			},
		},
		nodetype: "layout",
		componentType: "Stack",
		containerType: ["gridItem", "pageRoot", "div", "MainCard", "Stack"],
		isTached: false,
		children: [],
	},
	{
		nodeid: "",
		name: "Grid",
		label: "MUI-Grid Container",
		props: {
			container: true,
			sx: {
				p: 2,
			},
		},
		nodetype: "layout",
		componentType: "gridContainer",
		containerType: ["gridItem", "pageRoot", "div", "MainCard", "Stack"],
		isTached: false,
		children: [],
	},
	{
		nodeid: "",
		name: "Grid",
		label: "MUI-Grid Item",
		props: {
			item: true,
			sx: {
				p: 2,
			},
			xs: 4,
		},
		nodetype: "layout",
		componentType: "gridItem",
		containerType: ["gridContainer"],
		isTached: false,
		children: [],
	},
	{
		nodeid: "",
		name: "ul",
		label: "HTML Ul",
		props: {
			style: {
				minHeight: "200px",
				padding: "1px",
			},
		},
		nodetype: "layout",
		componentType: "ul",
		containerType: ["gridItem", "div", "MainCard", "pageRoot"],
		isTached: false,
		children: [],
	},
	{
		nodeid: "",
		name: "li",
		label: "HTML Li",
		props: {
			style: {
				minHeight: "30px",
				padding: "1px",
			},
		},
		nodetype: "layout",
		componentType: "li",
		containerType: ["ul"],
		isTached: false,
		children: [],
	},
	{
		nodeid: "",
		name: "AutoForm",
		label: "表单自动布局器",
		props: {
			layoutStyle: "oldStyle",
		},
		nodetype: "layout",
		componentType: "AutoForm",
		containerType: ["gridItem", "div", "MainCard", "pageRoot"],
		isTached: false,
		children: [],
	},
	{
		nodeid: "",
		name: "CommonInquery",
		label: "通用查询栏组件",
		props: {},
		nodetype: "layout",
		componentType: "CommonInquery",
		containerType: ["gridItem", "div", "MainCard", "pageRoot"],
		isTached: false,
		children: [],
	},
	/*****************************************************************控件 */
	{
		nodeid: "",
		name: "IconButton",
		label: "mui button + muiicon",
		props: {
			iconProp: {
				iconName: "Edit",
				iconOwnProps: {
					style: {
						color: "#fff",
						width: "15px",
						height: "15px",
						marginRight: "10px",
					},
				},
			},
			buttonProps: {
				text: "这是图标按钮",
				variant: "contained",
				sx: {
					padding: "0 8px",
					minHeight: "38px",
					lineHeight: "38px",
				},
			},
		},
		nodetype: "component",
		componentType: "nomoComponent",
		containerType: ["gridItem", "div", "MainCard", "li"],
		isTached: false,
	},
	{
		nodeid: "",
		name: "SpecialEcharts",
		label: "React Echarts Core",
		props: {
			containerProps: HTMLDIVprops,
			echartProps: echartDefaulyProps,
		},
		nodetype: "component",
		componentType: "nomoComponent",
		containerType: ["gridItem", "div", "MainCard", "li"],
		isTached: false,
	},
	{
		nodeid: "",
		name: "Icon",
		label: "MUIIcon",
		props: {
			iconName: "Edit",
			iconOwnProps: {
				style: {
					color: "#454545",
				},
			},
		},
		nodetype: "component",
		componentType: "nomoComponent",
		containerType: ["gridItem", "div", "MainCard", "li"],
		isTached: false,
	},
	{
		nodeid: "",
		name: "input",
		label: "HTML Input",
		props: {},
		nodetype: "component",
		componentType: "nomoComponent",
		containerType: ["gridItem", "div", "MainCard", "li"],
		isTached: false,
	},
	{
		nodeid: "",
		name: "span",
		label: "HTML Span",
		props: {
			text: "这是Span元素",
		},
		nodetype: "component",
		componentType: "nomoComponent",
		containerType: ["gridItem", "div", "MainCard", "li"],
		isTached: false,
	},
	{
		nodeid: "",
		name: "label",
		label: "HTML Label",
		props: {
			text: "这是label元素",
		},
		nodetype: "component",
		componentType: "nomoComponent",
		containerType: ["gridItem", "div", "MainCard", "li"],
		isTached: false,
	},
	{
		nodeid: "",
		name: "Button",
		label: "MUI按钮",
		props: {
			text: "这是按钮",
			variant: "contained",
			sx: {
				padding: "0 8px",
				minHeight: "38px",
				lineHeight: "38px",
			},
		},
		nodetype: "component",
		componentType: "nomoComponent",
		containerType: ["gridItem", "div", "MainCard", "li"],
		isTached: false,
	},
	{
		nodeid: "",
		name: "AntdDateRangePacker",
		label: "时间范围选择器",
		props: {},
		autoFormItemProps: {
			isRequiredStyle: false,
			name: ["timeStart_blank", "timeEnd_blank"],
			dateFormat: "YYYY-MM-DD",
		},
		commonInqueryItemProps: {
			name: ["timeStart_blank", "timeEnd_blank"],
			defaultValue: ["", ""],
			dateFormat: "YYYY-MM-DD",
		},
		nodetype: "component",
		componentType: "nomoComponent",
		containerType: ["gridItem", "div", "CommonInquery", "AutoForm", "li"],
		isTached: false,
	},
	{
		nodeid: "",
		name: "SingleDatePicker",
		label: "时间单选器",
		props: {},
		autoFormItemProps: {
			isRequiredStyle: false,
			name: "time_blank",
			dateFormat: "YYYY-MM-DD",
		},
		commonInqueryItemProps: {
			name: ["timeStart_blank"],
			defaultValue: "",
			dateFormat: "YYYY-MM-DD",
		},
		nodetype: "component",
		componentType: "nomoComponent",
		containerType: ["gridItem", "div", "AutoForm", "CommonInquery", "li"],
		isTached: false,
	},
	{
		nodeid: "",
		name: "MithrilAutocomplete",
		label: "多选或单选下拉框（可查询）",
		props: {},
		autoFormItemProps: {
			isRequiredStyle: false,
			name: "selectionsValue_blank",
			selectItems: [
				{
					label: "测试0",
					value: "0",
				},
				{
					label: "测试2",
					value: "1",
				},
			],
		},
		commonInqueryItemProps: {
			defaultValue: "",
			name: "selectionsValue_blank",
			selectItems: [
				{
					label: "测试0",
					value: "0",
				},
				{
					label: "测试2",
					value: "1",
				},
			],
		},
		nodetype: "component",
		componentType: "nomoComponent",
		containerType: ["gridItem", "div", "CommonInquery", "AutoForm", "li"],
		isTached: false,
	},

	{
		nodeid: "",
		name: "CustomNumberInput",
		label: "数字输入框",
		props: {},
		autoFormItemProps: {
			isRequiredStyle: false,
			name: "number_blank",
		},
		commonInqueryItemProps: {
			defaultValue: "",
			name: "number_blank",
		},
		nodetype: "component",
		componentType: "nomoComponent",
		containerType: ["gridItem", "div", "CommonInquery", "AutoForm", "li"],
		isTached: false,
	},
	{
		nodeid: "",
		name: "NumberRangeInput",
		label: "数字范围输入框",
		props: {
			splitStr: "~",
		},
		autoFormItemProps: {
			isRequiredStyle: false,
			name: ["numberStart_blank", "numberEnd_blank"],
		},
		commonInqueryItemProps: {
			defaultValue: ["", ""],
			name: ["numberStart_blank", "numberEnd_blank"],
		},
		nodetype: "component",
		componentType: "nomoComponent",
		containerType: ["gridItem", "div", "CommonInquery", "AutoForm", "li"],
		isTached: false,
	},
	{
		nodeid: "",
		name: "MithrilAntdTable",
		label: "数据表格",
		props: {
			dataSource: [],
			current: "1",
			pageSize: "10",
			total: "1",
			sticky: {
				offsetHeader: 0,
			},
			scroll: { x: 1500 },
			columns: [
				{
					dataIndex: "code",
					title: "登记编号",
					align: "left" as "left",
				},
				{
					dataIndex: "name",
					title: "土地资产名称",
					align: "left" as "left",
				},
				{
					dataIndex: "value",
					title: "土地价值",
					align: "right" as "right",
				},
				{
					dataIndex: "area",
					title: "面积",
					align: "left" as "left",
				},
				{
					dataIndex: "landType",
					title: "土地类型",
					align: "left" as "left",
				},
				{
					dataIndex: "statusTypeId",
					title: "利用现状类型",
					align: "left" as "left",
				},
				{
					dataIndex: "createByTime",
					title: "登记时间",
					align: "left" as "left",
				},
				{
					dataIndex: "lastContractor",
					title: "承包人",
					align: "left" as "left",
				},
			],
		},
		nodetype: "component",
		componentType: "nomoComponent",
		containerType: ["gridItem", "div"],
		isTached: false,
	},
	{
		nodeid: "",
		name: "MithrilTextArea",
		label: "文本域",
		props: {
			maxLength: 1000,
		},
		autoFormItemProps: {
			isRequiredStyle: false,
			name: "text_blank",
		},
		commonInqueryItemProps: {
			defaultValue: "",
			name: "text_blank",
		},
		nodetype: "component",
		componentType: "nomoComponent",
		containerType: ["gridItem", "div", "CommonInquery", "AutoForm", "li"],
		isTached: false,
	},
	{
		nodeid: "",
		name: "MithrilYesNoSwitch",
		label: "是否开关",
		props: {},
		autoFormItemProps: {
			isRequiredStyle: false,
			name: "yesNo_blank",
			selectItems: [
				{
					label: "测试0",
					value: "0",
				},
				{
					label: "测试2",
					value: "1",
				},
			],
		},
		nodetype: "component",
		componentType: "nomoComponent",
		containerType: ["gridItem", "div", "AutoForm", "li"],
		isTached: false,
	},
	{
		nodeid: "",
		name: "MithrilInput",
		label: "普通的文本输入框(用于查询条件 )",
		props: {},
		autoFormItemProps: {
			isRequiredStyle: false,
			name: "text_blank",
		},
		commonInqueryItemProps: {
			defaultValue: "",
			name: "text_blank",
		},
		nodetype: "component",
		componentType: "nomoComponent",
		containerType: ["gridItem", "div", "CommonInquery", "li"],
		isTached: false,
	},
	{
		nodeid: "",
		name: "TextField",
		label: "普通的文本输入框(用于AutoForm)",
		props: {},
		autoFormItemProps: {
			isRequiredStyle: false,
			name: "text_blank",
		},
		nodetype: "component",
		componentType: "nomoComponent",
		containerType: ["gridItem", "div", "AutoForm", "li"],
		isTached: false,
	},
	{
		nodeid: "",
		name: "MithrilSelect",
		label: "单选或多选下拉框（普通）",
		props: {},
		autoFormItemProps: {
			isRequiredStyle: false,
			name: "selectionsValue_blank",
			selectItems: [
				{
					label: "测试0",
					value: "0",
				},
				{
					label: "测试2",
					value: "1",
				},
			],
		},
		commonInqueryItemProps: {
			defaultValue: "",
			name: "selectionsValue_blank",
			selectItems: [
				{
					label: "测试0",
					value: "0",
				},
				{
					label: "测试2",
					value: "1",
				},
			],
		},
		nodetype: "component",
		componentType: "nomoComponent",
		containerType: ["gridItem", "div", "CommonInquery", "AutoForm", "li"],
		isTached: false,
	},
];

/* 将style属性安全化 */
export const sanitizeStyle = function (style: any): React.CSSProperties {
	const safeStyle: Record<string, any> = {};
	for (const key in style) {
		if (isNaN(Number(key))) {
			// 排除数字 key
			safeStyle[key] = style[key];
		}
	}
	return safeStyle;
};

/* 制造自动补全文案 */
export const makeCompleteText = function (obj: any) {
	let result = [];
	if (typeof obj === "undefined") {
		return result;
	}
	if (typeof obj.propDefineNode !== "undefined") {
		for (let i of obj.propEnums) {
			result.push({
				label: i,
				value: i,
				desc: i,
			});
		}
		return result;
	}
	for (var itemKey in obj) {
		if (obj.hasOwnProperty(itemKey)) {
			if (itemKey === "node_explan") {
				continue;
			}
			if (itemKey === "node_label") {
				continue;
			}
			if (typeof obj[itemKey].propDefineNode !== "undefined") {
				/* 判断是不是最终节点 */
				result.push({
					label: obj[itemKey].title,
					value: itemKey,
					desc: obj[itemKey].label,
				});
			} else if (typeof obj[itemKey].node_explan !== "undefined") {
				/* 不是最终节点 */
				result.push({
					label: obj[itemKey].node_label,
					value: itemKey,
					desc: obj[itemKey].node_explan,
				});
			} else {
				/* 否则就是未知属性 */
				result.push({
					label: "",
					value: itemKey,
					desc: "",
				});
			}
		}
	}
	return result;
};
