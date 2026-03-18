import { cssStyleDefine } from "./cssstyleDefine";
import { iconsStrArr } from "./icons";
import { makeBooleanNode, makeStringNode } from "./util";

/* mui样式表属性 */
export const sxProps = cssStyleDefine;

export const publicSelectionItem = {
	node_explan: "通用的选项节点",
	node_label: "选项",
	label: makeStringNode([""], "选项的显示名", "选项名"),
	value: makeStringNode([""], "选项的值", "选项值"),
};

export const GridProps = {
	node_explan: "Mui Grid节点属性",
	node_label: "表格属性(Grid)",
	container: makeBooleanNode("是否为容器（用于定义行）", "是否为容器"),
	item: makeBooleanNode("是否为子项（用于定义单元格）", "是否为子项"),
	direction: makeStringNode(["row", "row-reverse", "column", "column-reverse"], "定义主轴方向", "主轴方向"),
	spacing: makeStringNode([""], "定义子项之间的间距", "子项间距"),
	alignItems: makeStringNode(["flex-start", "center", "flex-end", "stretch"], "定义子项沿交叉轴的对齐方式", "子项竖对齐"),
	justifyContent: makeStringNode(
		["flex-start", "center", "flex-end", "space-between", "space-around", "space-evenly"],
		"定义子项沿主轴的对齐方式",
		"子项横对齐"
	),
	wrap: makeStringNode(["wrap", "nowrap"], "是否允许子项换行", "子项换行"),
	sx: sxProps,
	style: cssStyleDefine,
	divider: makeBooleanNode("是否在子组件之间插入分隔线", "分割线"),
	xs: makeStringNode([""], "适用于超小屏幕设备（例如手机）。它代表了最小的屏幕尺寸，通常是 0px 至 600px 宽度的设备。", "超小"),
	sm: makeStringNode(
		[""],
		"适用于小屏幕设备（例如小型平板）。它代表了小屏幕设备，通常是 600px 至 900px 宽度的设备。sm 用来设置在这些设备上占据的列数。",
		"小屏"
	),
	md: makeStringNode([""], "适用于中等屏幕设备（例如中型平板）。它代表了中等屏幕设备，通常是 900px 至 1200px 宽度的设备。", "中屏"),
	lg: makeStringNode([""], "适用于大屏幕设备（例如大平板或小型桌面）。它代表了大屏幕设备，通常是 1200px 至 1536px 宽度的设备。", "大屏"),
	xl: makeStringNode([""], "适用于超大屏幕设备（例如大型桌面）。它代表了超大屏幕设备，通常是 1536px 及以上的设备。", "超大屏"),
	className: makeStringNode([""], "样式绑定", "样式绑定"),
};

/* 按钮的定义 */
const buttonProps = {
	node_explan: "MUI按钮组件的配置",
	node_label: "按钮配置",
	className: makeStringNode([""], "样式绑定", "样式绑定"),
	text: makeStringNode([""], "内容", "内容"),
	style: cssStyleDefine,
	sx: sxProps,
};

/* 图标的定义 */
const iconProps = {
	node_explan: "MUI图标组件的配置",
	node_label: "图标配置",
	iconName: makeStringNode(iconsStrArr, "要呈现什么样的图标", "图标形态"),
	iconOwnProps: {
		node_explan: "MUI Icon的属性",
		node_label: "图标的属性",
		style: cssStyleDefine,
		sx: cssStyleDefine,
	},
};

/**
 * div的属性定义
 */
const HtmlDivprops = {
	node_explan: "HTML dIV的属性",
	node_label: "div属性",
	style: cssStyleDefine,
	className: makeStringNode([""], "样式绑定", "样式绑定"),
	title: makeStringNode([""], "浏览器原生的tooltip悬浮框", "tooltip悬浮框"),
	id: makeStringNode([""], "设置元素id", "元素ID"),
	name: makeStringNode([""], "设置元素name", "元素name"),
	ariaLabel: makeStringNode([""], "辅助标签", "辅助标签"),
};

/* 属性面板组件属性定义 */
export const componentsPropsDefine: Record<string, any> = {
	PageRoot: {
		style: cssStyleDefine,
		className: makeStringNode([""], "样式绑定", "样式绑定"),
	},
	MainCard: {
		border: makeBooleanNode("是否显示边框（默认 false）", "边框"),
		boxShadow: makeBooleanNode("是否启用悬浮阴影（默认 undefined）", "阴影"),
		style: cssStyleDefine,
		content: makeBooleanNode("是否启用 CardContent 包裹内容（默认 true）", "内容包裹"),
		className: makeStringNode([""], "外层 Card 的 className", "样式绑定"),
		contentClass: makeStringNode([""], "内容区域（CardContent）的 className", "content样式绑定"),
		contentSX: sxProps,
		darkTitle: makeBooleanNode("是否使用深色标题（加粗显示 h3），默认 false", "深色标题"),
		sx: sxProps,
		secondary: makeStringNode([""], `卡片右上角操作区域，一般用于按钮、图标等 - CardHeaderProps["action"]`, "卡片右上角操作区域"),
		shadow: makeStringNode([""], "自定义阴影样式，用于替代默认值", "自定义阴影"),
		elevation: makeStringNode([""], "MUI Card 的 elevation（阴影层级），如设置此项可不使用 boxShadow ", "阴影层级"),
		title: makeStringNode([""], "卡片标题，可以是字符串或 JSX 结构", "卡片标题"),
	},
	div: HtmlDivprops,
	Stack: {
		direction: makeStringNode(["row", "column"], "定义排列方向", "排列方向"),
		spacing: makeStringNode([""], "子组件之间的间距", "子项间距"),
		alignItems: makeStringNode(["flex-start", "center", "flex-end", "stretch"], "子组件沿交叉轴的对齐方式", "子项竖对齐"),
		justifyContent: makeStringNode(
			["flex-start", "center", "flex-end", "space-between", "space-around", "space-evenly"],
			"子组件沿主轴的对齐方式",
			"子项横对齐"
		),
		wrap: makeStringNode(["wrap", "nowrap"], "是否允许子组件换行", "子项换行"),
		sx: sxProps,
		style: cssStyleDefine,
		divider: makeBooleanNode("在子组件之间插入分隔线", "分隔线"),
		className: makeStringNode([""], "样式绑定", "样式绑定"),
	},
	Grid: GridProps,
	ul: {
		type: makeStringNode(["disc", "circle", "square"], "定义列表项标记的类型", "项标记"),
		className: makeStringNode([""], "样式绑定", "样式绑定"),
		style: cssStyleDefine,
		title: makeStringNode([""], "浏览器原生的tooltip悬浮框", "tooltip悬浮框"),
		id: makeStringNode([""], "设置元素id", "元素ID"),
		name: makeStringNode([""], "设置元素name", "元素name"),
		ariaLabel: makeStringNode([""], "辅助标签", "辅助标签"),
	},
	li: {
		className: makeStringNode([""], "样式绑定", "样式绑定"),
		style: cssStyleDefine,
		title: makeStringNode([""], "浏览器原生的tooltip悬浮框", "tooltip悬浮框"),
		id: makeStringNode([""], "设置元素id", "元素ID"),
		name: makeStringNode([""], "设置元素name", "元素name"),
		ariaLabel: makeStringNode([""], "辅助标签", "辅助标签"),
	},
	AutoForm: {
		title: makeStringNode([""], "标题,用于控制内置的标题文本，不填写则没有标题显示和相关元素。", "标题"),
		mode: makeStringNode(["add", "edit", "watch"], "给内部formComponentsContainer组件统一的状态对象", "模式"),
		enabled: makeBooleanNode("给内部formComponentsContainer组件统一的是否能编辑的状态", "启用"),
		labelGridProps: GridProps,
		comGridProps: GridProps,
		formContainerGridProps: GridProps,
		layoutStyle: makeStringNode(
			["newStyle", "oldStyle"],
			`布局风格类型：
					- "newStyle": 新系统样式，labelGridProps 和 comGridProps 均有效
					- "oldStyle": 老系统样式，仅 comGridProps 有效
					默认为 "newStyle"`,
			"布局样式"
		),
		items: [
			{
				node_explan: "AutoForm 的子项配置",
				node_label: "子项配置",
				label: makeStringNode([""], "显示的标题，影响组件的标题和Plaveholder以及报错信息的显示", "标题"),
				isRequiredStyle: makeBooleanNode(" 是否显示“必填”样式标识", "必填"),
				mode: makeStringNode(["add", "edit", "watch"], "给内部formComponentsContainer组件统一的状态对象", "模式"),
				unit: makeStringNode([""], "单位，在数字inpuit组件里有效", "单位"),
				selectItems: [publicSelectionItem],
				isMutipleSelections: makeBooleanNode(" 是否为多选（可选，默认 false）", "是否为多选"),
				enabled: makeBooleanNode(" 是否启用编辑状态（可选，默认 true）", "启用"),
				labelGridProps: GridProps,
				comGridProps: GridProps,
				dateFormat: makeStringNode(["YYYY-MM-DD", "YYYY-MM-DD HH:mm:ss", "YYYY-MM-DD HH:mm", "HH:mm:ss"], "时间格式化", "时间格式"),
				layoutStyle: makeStringNode(
					["newStyle", "oldStyle"],
					`
					布局风格类型：
					- "newStyle": 新系统样式，labelGridProps 和 comGridProps 均有效
					- "oldStyle": 老系统样式，仅 comGridProps 有效
					默认为 "newStyle"
				`,
					"布局样式"
				),
				isShow: makeBooleanNode("是否显示该表单项（可选，默认 true）", "是否显示"),
			},
		],
	},
	CommonInquery: {
		defaultValues: {},
		items: [
			{
				node_explan: "CommonInquery 的子项配置",
				node_label: "子项配置",
				label: makeStringNode([""], "显示名称 带冒号了不用打冒号", "标题"),
				name: makeStringNode([""], "默认值''多个[]代表对应多个数据字段", "字段名定义"),
				defaultValue: makeStringNode([""], "默认值''多个[]代表对应多个数据字段", "默认值"),
				dateFormat: makeStringNode(["YYYY-MM-DD", "YYYY-MM-DD HH:mm:ss", "YYYY-MM-DD HH:mm", "HH:mm:ss"], "时间格式化", "时间格式"),
				comGridProps: GridProps,
				isMutipleSelections: makeBooleanNode(" 是否为多选（可选，默认 false）", "是否为多选"),
				labelWidth: makeStringNode([""], "标题宽度", "标题宽度"),
				selectItems: [publicSelectionItem],
			},
		],
		enabledFoldable: makeBooleanNode(" 是否开启折叠（可选，默认 true）", "开启折叠"),
		foldShowCount: makeStringNode([""], "折叠后显示的组件数量", "折叠后子项数量"),
		defaultState: makeStringNode(["fold", "unfold"], "默认状态", "默认折叠状态"),
		labelWidth: makeStringNode([""], "统一label（标题）的宽度", "标题宽度"),
		isCheckError: makeBooleanNode("是否自动检查错误", "检查错误"),
		throttlingTime: makeStringNode([""], "提交/重置 节流器的时间，单位(毫秒)ms", "节流时间"),
	},
	input: {
		className: makeStringNode([""], "样式绑定", "样式绑定"),
		style: cssStyleDefine,
		type: makeStringNode(["text", "password", "radio"], "input类型", "input类型"),
		title: makeStringNode([""], "浏览器原生的tooltip悬浮框", "tooltip悬浮框"),
		id: makeStringNode([""], "设置元素id", "元素ID"),
		name: makeStringNode([""], "设置元素name", "元素name"),
		ariaLabel: makeStringNode([""], "辅助标签", "辅助标签"),
	},
	span: {
		className: makeStringNode([""], "样式绑定", "样式绑定"),
		text: makeStringNode([""], "内容", "内容"),
		style: cssStyleDefine,
		title: makeStringNode([""], "浏览器原生的tooltip悬浮框", "tooltip悬浮框"),
		id: makeStringNode([""], "设置元素id", "元素ID"),
		name: makeStringNode([""], "设置元素name", "元素name"),
		ariaLabel: makeStringNode([""], "辅助标签", "辅助标签"),
	},
	label: {
		className: makeStringNode([""], "样式绑定", "样式绑定"),
		text: makeStringNode([""], "内容", "内容"),
		style: cssStyleDefine,
		title: makeStringNode([""], "浏览器原生的tooltip悬浮框", "tooltip悬浮框"),
		id: makeStringNode([""], "设置元素id", "元素ID"),
		name: makeStringNode([""], "设置元素name", "元素name"),
		ariaLabel: makeStringNode([""], "辅助标签", "辅助标签"),
	},
	Button: buttonProps,
	AntdDateRangePacker: {
		label: makeStringNode([""], "左侧标签文本或自定义节点", "标题"),
		className: makeStringNode([""], "绑定样式", "绑定样式"),
		labelWidth: makeStringNode([""], "显示文字的宽度", "标题宽度"),
		format: makeStringNode(["YYYY-MM-DD", "YYYY-MM-DD HH:mm:ss", "YYYY-MM-DD HH:mm", "HH:mm:ss"], "时间格式化", "时间格式"),
		showHelperText: makeBooleanNode("是否显示placeHolder", "占位提示"),
		showTime: makeBooleanNode("是否显示具体的小时", "显示小时"),
		startVal: makeStringNode([""], "开始时间", "开始时间"),
		endVal: makeStringNode([""], "结束时间", "结束时间"),
		defaultValue: [makeStringNode([""], "开始时间", "开始时间"), makeStringNode([""], "结束时间", "结束时间")],
		sx: sxProps,
		datePickerSx: sxProps,
		style: sxProps,
		leftSx: sxProps,
		limitScope: {
			node_explan: "限制时间的选中范围",
			node_label: "范围限制",
			enabled: makeBooleanNode("是否启用", "是否启用"),
			monthScope: makeStringNode([""], "限制所选时间的范围（月）", "范围"),
		},
		allowClear: makeBooleanNode("是否出现清除值的按钮", "清除按钮"),
		enabled: makeBooleanNode("组件是否可用", "启用"),
		needConfirm: makeBooleanNode("是否显示确认按钮，并在选择时间后点击确认继续", "确认按钮"),
	},
	SingleDatePicker: {
		className: makeStringNode([""], "样式绑定", "样式绑定"),
		style: cssStyleDefine,
		sx: sxProps,
		placeHolder: makeStringNode([""], "空白占位字符", "占位字符"),
		format: makeStringNode(["YYYY-MM-DD", "YYYY-MM-DD HH:mm:ss", "YYYY-MM-DD HH:mm", "HH:mm:ss"], "时间格式化", "时间格式"),
	},
	MithrilAutocomplete: {
		labelWidth: makeStringNode([""], "左侧标签宽度，可传数字（px）或百分比等单位，默认根据内容自适应", "标题宽度"),
		fullWidth: makeBooleanNode("是否占满父容器宽度，默认为 false", "占满宽度"),
		multiple: makeBooleanNode("是否支持多选，默认为 false （单选）", "多选模式"),
		sx: sxProps,
		disabled: makeBooleanNode("是否禁用输入框，默认为 false", "是否禁用"),
		colon: makeBooleanNode("是否在标签后面显示冒号，默认为 true", "显示冒号"),
		direction: makeStringNode(["row", "column"], "布局方向，row 或 column，默认 row", "布局方向"),
		stackSx: sxProps,
		data: [publicSelectionItem],
		placeholder: makeStringNode([""], "输入框 placeholder 提示文案", "占位提示"),
		spacing: makeStringNode([""], "Stack 组件的子元素之间间距，默认 2", "元素间距"),
		label: makeStringNode([""], "左侧标签文本或自定义节点", "标题"),
	},
	CustomNumberInput: {
		fixed: makeStringNode([""], "数字格式化的小数位数，默认 2 位", "小数位数"),
		isFillZero: makeBooleanNode("格式化数字的时候是否补齐0", "补零对齐"),
		min: makeStringNode([""], "数值下限（如果设置，则输入数字不能低于此值）", "最小值"),
		direction: makeStringNode(["row", "column"], "布局方向，row 或 column，默认 row", "布局方向"),
		stackSx: sxProps,
		spacing: makeStringNode([""], "Stack 组件的子元素之间间距，默认 2", "元素间距"),
		labelWidth: makeStringNode([""], "左侧标签宽度，可传数字（px）或百分比等单位，默认根据内容自适应", "标签宽度"),
		colon: makeBooleanNode("是否在标签后面显示冒号，默认为 true", "显示冒号"),
		label: makeStringNode([""], "左侧标签文本或自定义节点", "标签文本"),
	},
	NumberRangeInput: {
		label: makeStringNode([""], "左侧标签文本或自定义节点", "标签文本"),
		labelWidth: makeStringNode([""], "左侧标签宽度，可传数字（px）或百分比等单位，默认根据内容自适应", "标签宽度"),
		splitStr: makeStringNode(["~", "至", "-", "到"], "分隔字符", "分隔符号"),
		containerSx: sxProps,
		fixed: makeStringNode([""], "数字格式化的小数位数，默认 2 位", "小数位数"),
		isFillZero: makeBooleanNode("格式化数字的时候是否补齐0", "补零对齐"),
		min: makeStringNode([""], "数值下限（如果设置，则输入数字不能低于此值）", "最小值"),
		units: [
			makeStringNode(["米", "千米", "毫米", "厘米", "亩", "只", "个"], "单位", "单位"),
			makeStringNode(["米", "千米", "毫米", "厘米", "亩", "只", "个"], "单位", "单位"),
		],
		placeholder: makeStringNode([""], "输入框 placeholder 提示文案", "占位提示"),
	},
	MithrilAntdTable: {
		className: makeStringNode([""], "样式绑定", "样式绑定"),
		style: cssStyleDefine,
		sx: sxProps,
	},
	MithrilTextArea: {
		className: makeStringNode([""], "样式绑定", "样式绑定"),
		style: cssStyleDefine,
		sx: sxProps,
		maxLength: 1000,
		InputProps: {
			node_explan: "MUI的TextField输入框的属性",
			node_label: "输入框属性",
			rows: makeStringNode([""], "行数", "行数"),
			multiline: makeBooleanNode("是否多行", "是否多行"),
			inputComponent: makeStringNode(["textarea", "input"], "内部组件的类型", "内部组件"),
		},
	},
	MithrilYesNoSwitch: {
		enabled: makeBooleanNode("是否启用", "启用状态"),
		yesStr: makeStringNode(["是", "yes", "男"], "按钮true的显示文本", "True显示文本"),
		noStr: makeStringNode(["否", "no", "女"], "按钮false的显示文本", "False显示文本"),
	},
	MithrilInput: {
		type: makeStringNode(["text", "number", "password"], '输入框类型，如 "text", "number", "password" 等，默认 "text"', "输入类型"),
		label: makeStringNode([""], "左侧标签文本或自定义节点", "标签文本"),
		labelWidth: makeStringNode([""], "左侧标签宽度，可传数字（px）或百分比等单位，默认根据内容自适应", "标签宽度"),
		placeholder: makeStringNode([], "输入框 placeholder 提示文案", "占位提示"),
		disabled: makeBooleanNode("是否禁用输入框，默认为 false", "是否禁用"),
		fullWidth: makeBooleanNode("是否占满父容器宽度，默认为 false", "占满宽度"),
		direction: makeStringNode(["row", "column"], "布局方向，row 或 column，默认 row", "布局方向"),
		colon: makeBooleanNode("是否在标签后面显示冒号，默认为 true", "显示冒号"),
		stackSx: sxProps,
		sx: sxProps,
		spacing: makeStringNode([""], "Stack 组件的子元素之间间距，默认 2", "元素间距"),
		InputProps: {
			node_explan: "MUI的TextField输入框的属性",
			node_label: "输入框属性",
			rows: makeStringNode([""], "行数", "行数"),
			multiline: makeBooleanNode("是否多行", "是否多行"),
			inputComponent: makeStringNode(["textarea", "input"], "内部组件的类型", "内部组件"),
		},
	},
	TextField: {
		className: makeStringNode([""], "样式绑定", "样式绑定"),
		style: cssStyleDefine,
		sx: sxProps,
		InputProps: {
			rows: makeStringNode([""], "行数", "行数"),
			multiline: makeBooleanNode("是否多行", "是否多行"),
			inputComponent: makeStringNode(["textarea", "input"], "内部组件的类型", "内部组件"),
		},
	},
	MithrilSelect: {
		label: makeStringNode([""], "左侧标签文本或自定义节点", "标签文本"),
		labelWidth: makeStringNode([""], "左侧标签宽度，可传数字（px）或百分比等单位，默认根据内容自适应", "标签宽度"),
		required: makeBooleanNode("是否为必填项，会在标签前显示红色星号", "必填项"),
		multiple: makeBooleanNode("是否支持多选，默认为 false（单选）", "多选模式"),
		sx: sxProps,
		stackSx: sxProps,
		fullWidth: makeBooleanNode("是否占满父容器宽度，默认为 false", "占满宽度"),
		size: makeStringNode(["small", "medium", "large"], "尺寸规格，可传 'small' | 'medium' 等 MUI 支持的 size", "组件尺寸"),
		direction: makeStringNode(["row", "column"], "布局方向，row 或 column，默认 row", "布局方向"),
		data: [publicSelectionItem],
		placeholder: makeStringNode([], "输入框 placeholder 提示文案", "占位提示"),
		change: makeBooleanNode("是否启用直接调用 onChange（change=true 时）", "启用变更事件"),
		disabled: makeBooleanNode("是否禁用选择框，默认为 false", "是否禁用"),
		colon: makeBooleanNode("是否在标签后面显示冒号，默认为 true", "显示冒号"),
		spacing: makeStringNode([""], "Stack 组件的子元素之间间距，默认 2", "元素间距"),
	},
	Icon: iconProps,
	IconButton: {
		iconProp: iconProps,
		buttonProps: buttonProps,
	},
	SpecialEcharts: {
		containerProps: HtmlDivprops,
		echartProps: {
			node_explan: "React Echarts Core",
			node_label: "React-Echarts-Core属性",
		},
	},
};
