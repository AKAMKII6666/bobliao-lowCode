import { make4Params, makeBlockNode, makeColorNode, makeNumberNode, makeRepeatNode, makeStringNode } from "./util";

/* 样式表属性 */
export const cssStyleDefine = {
	node_explan: "HTML css样式表属性",
	node_label: "样式",
	accentColor: makeColorNode("表单控件强调色", "表单控件强调色"),
	alignContent: makeStringNode(
		[
			"center",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"space-around",
			"space-between",
			"space-evenly",
			"stretch",
			"end",
			"flex-end",
			"flex-start",
			"start",
			"baseline",
			"normal",
		],
		"flex内容对齐方式",
		"flex内容对齐方式"
	),
	alignItems: makeStringNode(
		[
			"center",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"stretch",
			"end",
			"flex-end",
			"flex-start",
			"start",
			"baseline",
			"normal",
			"self-end",
			"self-start",
		],
		"flex子项目对齐方式",
		"flex子项目对齐方式"
	),
	alignSelf: makeStringNode(
		[
			"center",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"auto",
			"stretch",
			"end",
			"flex-end",
			"flex-start",
			"start",
			"baseline",
			"normal",
			"self-end",
			"self-start",
		],
		"flex子项目自对齐",
		"flex子项目自对齐"
	),
	alignTracks: makeStringNode(
		[
			"center",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"space-around",
			"space-between",
			"space-evenly",
			"stretch",
			"end",
			"flex-end",
			"flex-start",
			"start",
			"baseline",
			"normal",
		],
		"Grid内容对齐",
		"Grid内容对齐"
	),
	animationComposition: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "accumulate", "add", "replace"],
		"animation-composition 是一个实验性的 CSS 属性，用于指定当多个关键帧动画应用于同一个属性时，它们如何组合效果，比如叠加（add）、累积（accumulate）或替换（replace）。",
		"动画组合模式"
	),
	animationDelay: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"animation-delay 定义动画开始前的延迟时间。可以使用时间值（如 '2s' 或 '500ms'），也可以使用多个时间值控制多个动画的延迟。",
		"动画延迟时间"
	),
	animationDirection: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "normal", "alternate", "alternate-reverse", "reverse"],
		"animation-direction 定义动画在每次周期中是否反向播放。例如 'normal' 表示每次都正向播放，'alternate' 表示交替正向与反向播放。",
		"动画播放方向"
	),
	animationDuration: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"animation-duration 定义动画从开始到结束所持续的时间，可以是 '2s'、'500ms' 等时间值，也可以是多个值控制多段动画。",
		"动画持续时间"
	),
	animationFillMode: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "backwards", "both", "forwards"],
		"animation-fill-mode 定义动画在执行前或执行后，其目标元素的样式是否被应用（例如保持最后一帧）。",
		"动画填充模式"
	),
	animationIterationCount: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "infinite"],
		"animation-iteration-count 指定动画循环的次数，可以是数字（如 1、2）或 'infinite' 表示无限循环。",
		"动画循环次数"
	),
	animationName: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"animation-name 指定要应用的关键帧动画的名称，也可以为 'none' 表示无动画。",
		"动画名称"
	),
	animationPlayState: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "paused", "running"],
		"animation-play-state 用于控制动画是否正在运行，'paused' 表示暂停，'running' 表示运行中。",
		"动画播放状态"
	),
	animationRangeEnd: makeNumberNode("animation-range-end 是一个实验性属性，用于定义 CSS Scroll-driven animations 的结束点。", "动画范围结束值"),
	animationRangeStart: makeNumberNode("animation-range-start 是一个实验性属性，用于定义 CSS Scroll-driven animations 的起始点。", "动画范围起始值"),
	animationTimeline: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto"],
		"animation-timeline 是一个实验性属性，用于指定动画的时间轴，例如 'scroll()' 表示基于滚动的动画。",
		"动画时间轴"
	),
	animationTimingFunction: makeStringNode(
		[
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"ease",
			"ease-in",
			"ease-in-out",
			"ease-out",
			"step-end",
			"step-start",
			"linear",
		],
		"animation-timing-function 控制动画进度随时间的变化方式，例如线性、缓入、缓出等效果。",
		"动画节奏函数"
	),
	appearance: makeStringNode(
		[
			"button",
			"meter",
			"textarea",
			"checkbox",
			"radio",
			"none",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"auto",
			"listbox",
			"menulist",
			"progress-bar",
			"push-button",
			"searchfield",
			"slider-horizontal",
			"square-button",
			"menulist-button",
			"textfield",
		],
		"appearance 用于控制浏览器的原生控件样式渲染方式。设置为 'none' 可移除原生样式。",
		"原生样式控制"
	),
	aspectRatio: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto"],
		"aspect-ratio 定义元素的宽高比例，可以是一个数字或 'auto'。",
		"宽高比"
	),
	backdropFilter: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"backdrop-filter 应用于元素后面的区域，常用于模糊背景、亮度调整等视觉效果。",
		"背景滤镜"
	),
	backfaceVisibility: makeStringNode(
		["hidden", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "visible"],
		"backface-visibility 控制元素背面在旋转时是否可见，常配合 3D 变换使用。",
		"背面可见性"
	),
	backgroundAttachment: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "fixed", "local", "scroll"],
		"background-attachment 设置背景图像是随元素滚动，还是固定在视口。",
		"背景固定方式"
	),
	backgroundBlendMode: makeStringNode(
		[
			"color",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"normal",
			"color-burn",
			"color-dodge",
			"darken",
			"difference",
			"exclusion",
			"hard-light",
			"hue",
			"lighten",
			"luminosity",
			"multiply",
			"overlay",
			"saturation",
			"screen",
			"soft-light",
		],
		"background-blend-mode 定义多个背景图层之间如何混合，类似图像编辑软件中的图层混合模式。",
		"背景混合模式"
	),
	backgroundClip: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "border-box", "content-box", "padding-box"],
		"background-clip 控制背景图像的绘制区域，例如是否延伸到边框或只绘制内容区。",
		"背景裁剪区域"
	),
	backgroundColor: makeColorNode("background-color 设置元素的背景颜色，支持标准颜色值、rgba、十六进制等格式。", "背景颜色"),
	backgroundImage: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"background-image 用于设置背景图片，可以是 URL、渐变等。",
		"背景图像"
	),
	backgroundOrigin: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "border-box", "content-box", "padding-box"],
		"background-origin 决定背景图像的定位基准区域。",
		"背景定位原点"
	),
	backgroundPositionX: makeNumberNode("background-position-x 控制背景图像在水平方向的位置，可以使用百分比、px 或关键字。", "背景水平位置"),
	backgroundPositionY: makeNumberNode("background-position-y 控制背景图像在垂直方向的位置。", "背景垂直位置"),
	backgroundRepeat: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "no-repeat", "repeat", "repeat-x", "repeat-y", "round", "space"],
		"background-repeat 控制背景图像是否重复，以及如何重复（横向、纵向、铺满等）。",
		"背景重复方式"
	),
	backgroundSize: makeStringNode(["cover", "contain", "0px 0px", "100% 100%"], "background-size 定义背景图片的尺寸，比如是否拉伸或铺满容器。", "背景样式"),
	blockOverflow: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "clip", "ellipsis"],
		"block-overflow 是一个实验性属性，用于控制块级容器的内容溢出处理方式。",
		"布局/实验性"
	),
	blockSize: makeNumberNode("block-size 表示元素在块轴（如垂直方向）的尺寸，等价于 height，受 writing-mode 影响。", "布局"),
	borderBlockColor: makeColorNode("border-block-color 同时设置块轴（上下方向）起始和结束边的颜色，受 writing-mode 影响。", "边框"),
	borderBlockEndColor: makeColorNode("border-block-end-color 设置块轴结束方向（通常是下边）的边框颜色。", "边框"),
	borderBlockEndStyle: makeBlockNode("border-block-end-style 设置块轴结束方向边框的样式，例如 solid、dashed 等。", "边框"),
	borderBlockEndWidth: makeNumberNode("border-block-end-width 设置块轴结束方向边框的宽度。", "边框"),
	borderBlockStartColor: makeColorNode("border-block-start-color 设置块轴起始方向（通常是上边）的边框颜色。", "边框"),
	borderBlockStartStyle: makeBlockNode("border-block-start-style 设置块轴起始方向边框的样式，例如 solid、dotted 等。", "边框"),
	borderBlockStartWidth: makeNumberNode("border-block-start-width 设置块轴起始方向边框的宽度。", "边框"),
	borderBlockStyle: makeBlockNode("border-block-style 同时设置块轴（上下）两侧边框的样式。", "边框"),
	borderBlockWidth: makeNumberNode("border-block-width 同时设置块轴起始与结束方向边框的宽度，受 writing-mode 影响。", "边框"),
	borderBottomColor: makeColorNode("border-bottom-color 设置元素底部边框的颜色。", "边框"),
	borderBottomLeftRadius: makeNumberNode("border-bottom-left-radius 设置左下角的圆角半径。", "边框/圆角"),
	borderBottomRightRadius: makeNumberNode("border-bottom-right-radius 设置右下角的圆角半径。", "边框/圆角"),
	borderBottomStyle: makeBlockNode("border-bottom-style 设置元素底部边框的样式，例如 solid、dashed 等。", "边框"),
	borderBottomWidth: makeNumberNode("border-bottom-width 设置元素底部边框的宽度。", "边框"),
	borderCollapse: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "collapse", "separate"],
		"border-collapse 指定是否将表格的边框合并为单一边框，常用于 <table> 元素。",
		"表格"
	),
	borderEndEndRadius: makeNumberNode("border-end-end-radius 设置与书写方向无关的逻辑右下角圆角半径，适配多语言布局。", "边框/圆角"),
	borderEndStartRadius: makeNumberNode("border-end-start-radius 设置与书写方向无关的逻辑左下角圆角半径，适用于国际化布局。", "边框/圆角"),
	borderImageOutset: makeStringNode([], "border-image-outset 设置边框图像区域向外延伸的距离，控制图像超出边框的部分。", "边框/图像"),
	borderImageRepeat: makeRepeatNode("border-image-repeat 定义边框图像在铺满区域时的平铺方式，如 stretch、repeat 或 round。", "边框/图像"),
	borderImageSlice: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"border-image-slice 定义如何从源图像中切出边框图像的区域，支持数字和百分比。",
		"边框/图像"
	),
	borderImageSource: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"border-image-source 定义边框图像的来源，可以是图片 URL 或 none。",
		"边框/图像"
	),
	borderImageWidth: makeStringNode([], "border-image-width 设置边框图像区域的宽度，可以是数值、百分比或 auto。", "边框/图像"),
	borderInlineColor: makeColorNode("border-inline-color 设置 inline 轴（如水平方向）起始和结束边框的颜色，受 writing-mode 影响。", "边框"),
	borderInlineEndColor: makeColorNode("border-inline-end-color 设置 inline 轴终止方向边框的颜色（通常是右边）。", "边框"),
	borderInlineEndStyle: makeBlockNode("border-inline-end-style 设置 inline 轴终止方向边框的样式。", "边框"),
	borderInlineEndWidth: makeNumberNode("border-inline-end-width 设置 inline 轴终止方向边框的宽度，通常是右边。", "边框"),
	borderInlineStartColor: makeColorNode("border-inline-start-color 设置 inline 轴起始方向边框的颜色，通常是左边。", "边框"),
	borderInlineStartStyle: makeBlockNode("border-inline-start-style 设置 inline 轴起始方向边框的样式。", "边框"),
	borderInlineStartWidth: makeNumberNode("border-inline-start-width 设置 inline 轴起始方向边框的宽度。", "边框"),
	borderInlineStyle: makeBlockNode("border-inline-style 同时设置 inline 轴两侧边框的样式，受 writing-mode 影响。", "边框"),
	borderInlineWidth: makeNumberNode("border-inline-width 同时设置 inline 轴（左右方向）两侧边框的宽度。", "边框"),
	borderLeftColor: makeColorNode("border-left-color 设置元素左边框的颜色。", "边框"),
	borderLeftStyle: makeBlockNode("border-left-style 设置元素左边框的样式，例如 solid、dotted 等。", "边框"),
	borderLeftWidth: makeNumberNode("border-left-width 设置元素左边框的宽度。", "边框"),
	borderRightColor: makeColorNode("border-right-color 设置元素右边框的颜色。", "边框"),
	borderRightStyle: makeBlockNode("border-right-style 设置元素右边框的样式，例如 solid、dashed 等。", "边框"),
	borderRightWidth: makeNumberNode("border-right-width 设置元素右边框的宽度。", "边框"),
	borderSpacing: makeNumberNode("border-spacing 设置表格单元格之间的间距，仅在 border-collapse 为 separate 时有效。", "表格"),
	borderStartEndRadius: makeNumberNode("border-start-end-radius 设置逻辑左上角或右上角的圆角半径，具体方向取决于 writing-mode。", "边框/圆角"),
	borderStartStartRadius: makeNumberNode("border-start-start-radius 设置逻辑左下角或右下角的圆角半径，适配多语言布局。", "边框/圆角"),
	borderTopColor: makeColorNode("border-top-color 设置元素顶部边框的颜色。", "边框"),
	borderTopLeftRadius: makeNumberNode("border-top-left-radius 设置左上角的圆角半径。", "边框/圆角"),
	borderTopRightRadius: makeNumberNode("border-top-right-radius 设置右上角的圆角半径。", "边框/圆角"),
	borderTopStyle: makeBlockNode("border-top-style 设置顶部边框的样式，例如 solid、dotted 等。", "边框"),
	borderTopWidth: makeNumberNode("border-top-width 设置顶部边框的宽度。", "边框"),
	bottom: makeNumberNode("bottom 设置定位元素（position 为 relative、absolute、fixed 或 sticky）时，元素下边与包含块底部的偏移距离。", "元素底边距离"),
	boxDecorationBreak: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "clone", "slice"],
		"box-decoration-break 用于控制当元素内容跨越多行、多列或多个盒子时，背景与边框如何呈现（整体渲染或分开渲染）。",
		"元素换行装饰"
	),
	boxShadow: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"box-shadow 用于为元素添加一个或多个投影效果，支持设置颜色、偏移、模糊和扩展等参数。",
		"元素的阴影"
	),
	boxSizing: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "border-box", "content-box"],
		"box-sizing 控制元素的尺寸计算方式，是以内容区域为基础（content-box），还是包含 padding 与 border（border-box）。",
		"盒子模型计算方式"
	),
	breakAfter: makeStringNode(
		[
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"auto",
			"left",
			"right",
			"all",
			"always",
			"avoid",
			"avoid-column",
			"avoid-page",
			"avoid-region",
			"column",
			"page",
			"recto",
			"region",
			"verso",
		],
		"break-after 控制元素之后的分页或换列行为，用于页面打印、多列布局、区域分页等场景。",
		"元素断页行为"
	),
	breakBefore: makeStringNode(
		[
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"auto",
			"left",
			"right",
			"all",
			"always",
			"avoid",
			"avoid-column",
			"avoid-page",
			"avoid-region",
			"column",
			"page",
			"recto",
			"region",
			"verso",
		],
		"break-before 控制元素之前的分页、换列或换区域行为，常用于打印排版和多栏布局场景。",
		"元素断页前行为"
	),
	breakInside: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "avoid", "avoid-column", "avoid-page", "avoid-region"],
		"break-inside 控制元素内部是否允许分页、换列或换区域，常用于防止内容被拆分。",
		"元素内断页控制"
	),
	captionSide: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "bottom", "top", "block-end", "block-start", "inline-end", "inline-start"],
		"caption-side 设置表格标题（<caption>）的位置，支持顶部、底部或逻辑方向（如 block-start）。",
		"表格标题位置"
	),
	caretColor: makeColorNode("caret-color 设置文本输入光标（插入点）的颜色，适用于输入框和可编辑内容。", "文本光标颜色"),
	caretShape: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "bar", "block", "underscore"],
		"caret-shape 控制文本输入光标的外观形状，如竖条、块状或下划线（支持性较低，仅部分浏览器实现）。",
		"文本光标样式"
	),
	clear: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "both", "left", "right", "inline-end", "inline-start"],
		"clear 设置元素在浮动元素旁的清除行为，常与 float 一起使用以控制换行。",
		"浮动清除方式"
	),
	clipPath: makeStringNode(
		[
			"none",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"border-box",
			"content-box",
			"padding-box",
			"fill-box",
			"margin-box",
			"stroke-box",
			"view-box",
		],
		"clip-path 定义元素的可显示区域，可以是路径、盒模型区域或 SVG 定义区域，实现图形裁剪效果。",
		"元素裁剪区域"
	),
	color: makeColorNode("color 设置元素的前景色（如文本颜色），可接受标准颜色值、变量等。", "文字颜色"),
	colorAdjust: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "economy", "exact"],
		"color-adjust 提示用户代理是否应保留作者定义的颜色方案（如打印时），属于实验性属性。",
		"颜色调整策略"
	),
	colorScheme: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "normal", "dark", "light"],
		"color-scheme 指示元素及其后代支持的颜色模式，如 light 或 dark，影响滚动条、表单控件等。",
		"颜色模式偏好"
	),
	columnCount: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto"],
		"column-count 设置元素内容应分为的列数，可设置具体数值或自动。",
		"多列列数"
	),
	columnFill: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "balance", "balance-all"],
		"column-fill 控制多列布局中内容如何在列之间分配，常用于平衡或顺序填充。",
		"多列内容填充方式"
	),
	columnGap: makeNumberNode("column-gap 设置多列布局中列与列之间的间距，类似于 grid 或 flex 的 gap 属性。", "列间距"),
	columnRuleColor: makeColorNode("column-rule-color 设置多列布局中列之间分隔线的颜色。", "列分隔线颜色"),
	columnRuleStyle: makeStringNode(
		[
			"hidden",
			"none",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"dashed",
			"dotted",
			"double",
			"groove",
			"inset",
			"outset",
			"ridge",
			"solid",
		],
		"column-rule-style 设置多列布局中列之间分隔线的样式，如实线、虚线、双线等。",
		"列分隔线样式"
	),
	columnRuleWidth: makeNumberNode("column-rule-width 设置多列布局中列分隔线的宽度。", "列分隔线宽度"),
	columnSpan: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "all"],
		"column-span 控制元素是否跨越多列，常用于标题或图片等需要占满全部列的元素。",
		"跨列设置"
	),
	columnWidth: makeNumberNode("column-width 设置每一列的理想宽度，浏览器会根据可用空间和列数进行适配。", "单列宽度"),
	contain: makeStringNode(
		[
			"style",
			"size",
			"content",
			"none",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"inline-size",
			"layout",
			"paint",
			"strict",
		],
		"contain 定义元素对子内容的封闭行为，可提升渲染性能或作为容器查询的前提条件，例如隔离布局、尺寸或样式影响。",
		"封闭区域控制"
	),
	containIntrinsicBlockSize: makeNumberNode(
		"contain-intrinsic-block-size 设置逻辑块方向（通常是垂直）上的默认内在尺寸，用于缺失内容时的 fallback 尺寸。",
		"内在块高"
	),
	containIntrinsicHeight: makeNumberNode("contain-intrinsic-height 设置元素缺省内容高度时的默认内在高度值。", "内在高度"),
	containIntrinsicInlineSize: makeNumberNode("contain-intrinsic-inline-size 设置逻辑行方向（通常是水平）上的默认内在尺寸。", "内在行宽"),
	containIntrinsicWidth: makeNumberNode("contain-intrinsic-width 设置元素缺省内容宽度时的默认内在宽度值。", "内在宽度"),
	containerName: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"container-name 为元素命名容器名称，用于配合 @container 容器查询规则进行匹配。",
		"容器名称"
	),
	containerType: makeStringNode(
		["size", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "normal", "inline-size"],
		"container-type 设置元素作为容器查询的类型，常见值有 size（尺寸容器）和 inline-size（仅宽度容器）。",
		"容器类型"
	),
	content: makeStringNode(
		[
			"none",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"normal",
			"close-quote",
			"no-close-quote",
			"no-open-quote",
			"open-quote",
			"contents",
		],
		"content 用于插入生成内容（如引号、图片等）或控制其显示行为，常与 ::before 和 ::after 配合使用。",
		"生成内容控制"
	),
	contentVisibility: makeStringNode(
		["hidden", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "visible"],
		"content-visibility 控制是否渲染元素内容，可显著提升首屏性能，auto 表示可滚动进视口时再渲染。",
		"内容可见性"
	),
	counterIncrement: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"counter-increment 设置文档中的 CSS 计数器变量递增规则，常与 ::before 配合生成自动编号。",
		"计数器递增"
	),
	counterReset: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"counter-reset 设置一个或多个计数器的初始值，用于从头开始编号。",
		"计数器重置"
	),
	counterSet: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"counter-set 设置 CSS 计数器为指定值（不会递增），与 counter-reset 不同，它不清零。",
		"计数器赋值"
	),
	cursor: makeStringNode(
		[
			"progress",
			"text",
			"none",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"auto",
			"-moz-grab",
			"-webkit-grab",
			"alias",
			"all-scroll",
			"cell",
			"col-resize",
			"context-menu",
			"copy",
			"crosshair",
			"default",
			"e-resize",
			"ew-resize",
			"grab",
			"grabbing",
			"help",
			"move",
			"n-resize",
			"ne-resize",
			"nesw-resize",
			"no-drop",
			"not-allowed",
			"ns-resize",
			"nw-resize",
			"nwse-resize",
			"pointer",
			"row-resize",
			"s-resize",
			"se-resize",
			"sw-resize",
			"vertical-text",
			"w-resize",
			"wait",
			"zoom-in",
			"zoom-out",
		],
		"cursor 定义鼠标指针悬停在元素上时的外观，例如默认箭头、手型、加载圈、缩放等。",
		"鼠标指针样式"
	),
	direction: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "ltr", "rtl"],
		"direction 设置文本和内容的书写方向，ltr 表示从左到右，rtl 表示从右到左。",
		"文字书写方向"
	),
	display: makeStringNode(
		[
			"ruby",
			"table",
			"none",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"block",
			"contents",
			"inline",
			"run-in",
			"-ms-flexbox",
			"-ms-grid",
			"-webkit-flex",
			"flex",
			"flow",
			"flow-root",
			"grid",
			"ruby-base",
			"ruby-base-container",
			"ruby-text",
			"ruby-text-container",
			"table-caption",
			"table-cell",
			"table-column",
			"table-column-group",
			"table-footer-group",
			"table-header-group",
			"table-row",
			"table-row-group",
			"-ms-inline-flexbox",
			"-ms-inline-grid",
			"-webkit-inline-flex",
			"inline-block",
			"inline-flex",
			"inline-grid",
			"inline-list-item",
			"inline-table",
			"list-item",
		],
		"display 定义元素的盒模型类型和布局行为，是最核心的布局属性之一。",
		"显示类型"
	),
	emptyCells: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "hide", "show"],
		"empty-cells 控制表格中空单元格是否显示边框，默认隐藏空格也可能会被渲染。",
		"空单元格可见性"
	),
	filter: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"filter 应用于图像或元素上，实现模糊、灰度、对比度、阴影等视觉滤镜效果。",
		"图像滤镜效果"
	),
	flexBasis: makeNumberNode("flex-basis 设置 flex 子项在主轴上的初始大小，可为具体长度或 auto，影响弹性布局。", "弹性基础尺寸"),
	flexDirection: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "column", "column-reverse", "row", "row-reverse"],
		"flex-direction 设置弹性容器中主轴的方向，决定子元素的排列顺序（水平/垂直，正向/反向）。",
		"主轴方向"
	),
	flexGrow: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"flex-grow 定义弹性子项如何按比例分配剩余空间，数值越大，占比越多。",
		"弹性增长因子"
	),
	flexShrink: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"flex-shrink 定义弹性子项在空间不足时的收缩比例，0 表示不收缩。",
		"弹性收缩因子"
	),
	flexWrap: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "nowrap", "wrap", "wrap-reverse"],
		"flex-wrap 设置弹性容器在主轴空间不足时是否换行排列子元素。",
		"换行方式"
	),
	float: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "left", "right", "inline-end", "inline-start"],
		"float 控制元素是否脱离文档流并向左或向右浮动，常用于图文混排布局。",
		"浮动方向"
	),
	fontFamily: makeStringNode(
		[
			"pangmenzhengdaoregular",
			"pangmenzhengdao2",
			"YouSheBiaoTiHei",
			"微软雅黑",
			"宋体",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"cursive",
			"fantasy",
			"monospace",
			"sans-serif",
			"serif",
		],
		"font-family 设置文本的字体系列，支持系统字体族或自定义字体。",
		"字体"
	),
	fontFeatureSettings: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "normal"],
		"font-feature-settings 用于启用或禁用 OpenType 字体的特性，如连字、花体、替代字形等。",
		"字体特性设置"
	),
	fontKerning: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "normal"],
		"font-kerning 控制字体中字符间距微调（字偶间距），优化排版美观度。",
		"字体字距微调"
	),
	fontLanguageOverride: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "normal"],
		"font-language-override 指定字体应使用哪种语言的字形规则，适用于多语言字体渲染。",
		"字体语言覆盖"
	),
	fontOpticalSizing: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto"],
		"font-optical-sizing 控制字体是否根据字号自动调整其外观（如笔画粗细），通常用于可变字体。",
		"字体光学调整"
	),
	fontPalette: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "normal", "dark", "light"],
		"font-palette 设置可变色字体的颜色方案，支持 normal、dark、light 等内建调色板。",
		"字体调色板"
	),
	fontSize: makeNumberNode("font-size 设置文本的字体大小，支持像素、em、rem、百分比等单位。", "字体大小"),
	fontSizeAdjust: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "from-font"],
		"font-size-adjust 用于在字体不可用或字体替换时保持视觉大小一致，按小写字母 x 的高度进行调整。",
		"字体大小视觉调整"
	),
	fontSmooth: makeNumberNode("font-smooth 控制字体的抗锯齿渲染方式，支持 smoother、none 或数值（部分浏览器支持）。", "字体平滑度"),
	fontStretch: makeStringNode(
		[
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"normal",
			"condensed",
			"expanded",
			"extra-condensed",
			"extra-expanded",
			"semi-condensed",
			"semi-expanded",
			"ultra-condensed",
			"ultra-expanded",
		],
		"font-stretch 控制字体字形的拉伸程度（水平变形），用于匹配 condensed 或 expanded 字体变体。",
		"字体拉伸宽度"
	),
	fontStyle: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "normal", "italic", "oblique"],
		"font-style 设置文本的字体样式，常用于切换正体、斜体、倾斜体。",
		"字体样式"
	),
	fontSynthesis: makeStringNode(
		["style", "none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "position", "small-caps", "weight"],
		"font-synthesis 控制浏览器是否自动合成字体的斜体、小型大写或粗体，用于确保一致性或限制伪造。",
		"字体自动合成功能"
	),
	fontSynthesisPosition: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto"],
		"font-synthesis-position 控制自动合成字体的位置调整（如上标/下标），目前属于实验性属性。",
		"字体合成定位"
	),
	fontSynthesisSmallCaps: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto"],
		"font-synthesis-small-caps 控制浏览器是否自动生成 small-caps（小型大写）字体变体。",
		"自动生成小型大写"
	),
	fontSynthesisStyle: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto"],
		"font-synthesis-style 控制浏览器是否自动合成斜体或倾斜体样式。",
		"自动生成斜体"
	),
	fontSynthesisWeight: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto"],
		"font-synthesis-weight 控制浏览器是否自动合成粗体（bold）样式。",
		"自动生成粗体"
	),
	fontVariant: makeStringNode(
		[
			"ruby",
			"none",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"normal",
			"small-caps",
			"jis04",
			"jis78",
			"jis83",
			"jis90",
			"simplified",
			"traditional",
			"all-petite-caps",
			"all-small-caps",
			"common-ligatures",
			"contextual",
			"diagonal-fractions",
			"discretionary-ligatures",
			"full-width",
			"historical-forms",
			"historical-ligatures",
			"lining-nums",
			"no-common-ligatures",
			"no-contextual",
			"no-discretionary-ligatures",
			"no-historical-ligatures",
			"oldstyle-nums",
			"ordinal",
			"petite-caps",
			"proportional-nums",
			"proportional-width",
			"slashed-zero",
			"stacked-fractions",
			"tabular-nums",
			"titling-caps",
			"unicase",
		],
		"font-variant 是一组用于控制字体变体的简写属性，包括小型大写、旧式数字、连字、分数形式等。",
		"字体变体设置"
	),
	fontVariantAlternates: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "normal", "historical-forms"],
		"font-variant-alternates 启用 OpenType 字体中的备选字符样式，属于进阶字体排版特性。",
		"字体替代样式"
	),
	fontVariantCaps: makeStringNode(
		[
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"normal",
			"small-caps",
			"all-petite-caps",
			"all-small-caps",
			"petite-caps",
			"titling-caps",
			"unicase",
		],
		"font-variant-caps 控制字体的大小写展示样式，如小型大写、标题大写、统一字母高度等。",
		"大写字母样式"
	),
	fontVariantEastAsian: makeStringNode(
		[
			"ruby",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"normal",
			"jis04",
			"jis78",
			"jis83",
			"jis90",
			"simplified",
			"traditional",
			"full-width",
			"proportional-width",
		],
		"font-variant-east-asian 控制中文、日文、韩文（CJK）字体排印风格，例如使用繁体、简体、全角或日文标准。",
		"东亚字体样式"
	),
	fontVariantEmoji: makeStringNode(
		["text", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "normal", "emoji", "unicode"],
		"font-variant-emoji 控制 emoji 的呈现方式（图形化或文本样式），支持 text、emoji 或 unicode 表现。",
		"Emoji 显示风格"
	),
	fontVariantLigatures: makeStringNode(
		[
			"none",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"normal",
			"common-ligatures",
			"contextual",
			"discretionary-ligatures",
			"historical-ligatures",
			"no-common-ligatures",
			"no-contextual",
			"no-discretionary-ligatures",
			"no-historical-ligatures",
		],
		"font-variant-ligatures 控制是否启用字体中的连字特性，如 fi、fl 等字符合并，适用于美术排印。",
		"连字样式"
	),
	fontVariantNumeric: makeStringNode(
		[
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"normal",
			"diagonal-fractions",
			"lining-nums",
			"oldstyle-nums",
			"ordinal",
			"proportional-nums",
			"slashed-zero",
			"stacked-fractions",
			"tabular-nums",
		],
		"font-variant-numeric 控制数字的排版风格，例如等宽数字、旧式数字、分数形式等。",
		"数字排版样式"
	),
	fontVariantPosition: makeStringNode(
		["sub", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "normal", "super"],
		"font-variant-position 控制上标（super）或下标（sub）字符的显示形式，主要用于公式和脚注。",
		"上标与下标样式"
	),
	fontVariationSettings: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "normal"],
		"font-variation-settings 允许直接设置可变字体的自定义轴（如粗细、宽度、倾斜度），需要字体支持。",
		"可变字体参数"
	),
	fontWeight: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "normal", "bold", "bolder", "lighter"],
		"font-weight 设置文本的粗细程度，可使用关键字（如 bold）或数值（100–900）来定义。",
		"字体粗细"
	),
	forcedColorAdjust: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto"],
		"forced-color-adjust 控制在强制高对比度模式下（如 Windows 辅助功能）是否让浏览器覆盖页面颜色。",
		"高对比度适配"
	),
	gridAutoColumns: makeNumberNode("grid-auto-columns 设置隐式生成的列的宽度，用于定义自动添加列的默认尺寸。", "自动列宽"),
	gridAutoFlow: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "column", "row", "dense"],
		"grid-auto-flow 定义自动放置网格项的方向和密集程度，如 row（行）或 column（列）及 dense 填充模式。",
		"自动布局方向"
	),
	gridAutoRows: makeNumberNode("grid-auto-rows 设置隐式生成的行的高度，用于定义自动添加行的默认尺寸。", "自动行高"),
	gridColumnEnd: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto"],
		"grid-column-end 定义网格项在哪一列结束，可使用列编号或 span 表示跨越多少列。",
		"网格列结束位置"
	),
	gridColumnStart: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto"],
		"grid-column-start 设置网格项在哪一列开始，可使用列编号或 span 开始位置。",
		"网格列起始位置"
	),
	gridRowEnd: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto"],
		"grid-row-end 设置网格项在哪一行结束，可使用行编号或 span 跨行数。",
		"网格行结束位置"
	),
	gridRowStart: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto"],
		"grid-row-start 设置网格项在哪一行开始，可使用行编号或 span 起始行数。",
		"网格行起始位置"
	),
	gridTemplateAreas: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"grid-template-areas 定义网格区域名称的字符串模板，用于通过命名方式排列网格子项。",
		"命名网格区域"
	),
	gridTemplateColumns: makeNumberNode("grid-template-columns 定义显式列轨道的宽度和数量，例如 1fr、100px 等单位。", "列轨道定义"),
	gridTemplateRows: makeNumberNode("grid-template-rows 定义显式行轨道的高度和数量，例如 auto、200px、minmax() 等。", "行轨道定义"),
	hangingPunctuation: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "allow-end", "first", "force-end", "last"],
		"hanging-punctuation 控制标点符号是否悬挂在文本边缘外，常用于美观排版中的引号或句号处理。",
		"悬挂标点设置"
	),
	height: makeNumberNode("height 设置元素的高度，支持数值、百分比、auto 等单位。", "元素高度"),
	hyphenateCharacter: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto"],
		"hyphenate-character 定义自动断字时插入的字符，通常为连字符（-），可自定义替换符号。",
		"断字符号"
	),
	hyphenateLimitChars: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto"],
		"hyphenate-limit-chars 设置自动断字所需的最小字符数，例如单词开头、中间和结尾的最少字母数量。",
		"断字最小字符数"
	),
	hyphens: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "manual"],
		"hyphens 控制是否启用自动断字功能，auto 表示根据语言自动处理，manual 表示仅使用软连字符。",
		"自动断字控制"
	),
	imageOrientation: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "flip", "from-image"],
		"image-orientation 控制图像的旋转方向，可根据图像的 EXIF 信息自动调整或强制翻转。",
		"图像方向"
	),
	imageRendering: makeStringNode(
		[
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"auto",
			"-moz-crisp-edges",
			"-webkit-optimize-contrast",
			"crisp-edges",
			"pixelated",
		],
		"image-rendering 设置图像在缩放时的渲染方式，例如保持像素清晰或自动优化。",
		"图像缩放渲染"
	),
	imageResolution: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "from-image"],
		"image-resolution 设置图像的分辨率，支持从图片本身的元数据中读取或手动指定。",
		"图像分辨率"
	),
	initialLetter: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "normal"],
		"initial-letter 设置首字母下沉效果，可以指定下沉的行数与尺寸比例。",
		"首字下沉"
	),
	inlineSize: makeNumberNode("inline-size 设置元素在 inline（横向）方向的尺寸，等价于 width，受 writing-mode 影响。", "横向尺寸"),
	inputSecurity: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto"],
		"input-security 控制输入框中字符的显示方式，主要用于密码保护场景（目前支持有限）。",
		"输入内容安全性"
	),
	insetBlockEnd: makeNumberNode("inset-block-end 设置元素在块轴终点方向（通常是 bottom）的内边距或偏移距离，受 writing-mode 影响。", "块轴终止偏移"),
	insetBlockStart: makeNumberNode("inset-block-start 设置元素在块轴起始方向（通常是 top）的内边距或偏移，受 writing-mode 影响。", "块轴起始偏移"),
	insetInlineEnd: makeNumberNode("inset-inline-end 设置元素在 inline 轴终止方向（通常是右边）的内边距或偏移，受 writing-mode 影响。", "行轴终止偏移"),
	insetInlineStart: makeNumberNode("inset-inline-start 设置元素在 inline 轴起始方向（通常是左边）的内边距或偏移，受 writing-mode 影响。", "行轴起始偏移"),
	isolation: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "isolate"],
		"isolation 控制元素是否创建新的堆叠上下文，常用于防止 z-index 层级冲突。",
		"堆叠上下文隔离"
	),
	justifyContent: makeStringNode(
		[
			"center",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"space-around",
			"space-between",
			"space-evenly",
			"stretch",
			"end",
			"flex-end",
			"flex-start",
			"start",
			"normal",
			"left",
			"right",
		],
		"justify-content 设置弹性容器或 Grid 的主轴对齐方式，控制子项在主轴上的分布。",
		"主轴对齐方式"
	),
	justifyItems: makeStringNode(
		[
			"center",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"stretch",
			"end",
			"flex-end",
			"flex-start",
			"start",
			"baseline",
			"normal",
			"self-end",
			"self-start",
			"left",
			"right",
			"legacy",
		],
		"justify-items 设置 Grid 或表格中各个子项在主轴方向上的默认对齐方式。",
		"子项主轴对齐"
	),
	justifySelf: makeStringNode(
		[
			"center",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"auto",
			"stretch",
			"end",
			"flex-end",
			"flex-start",
			"start",
			"baseline",
			"normal",
			"self-end",
			"self-start",
			"left",
			"right",
		],
		"justify-self 设置单个子项在主轴方向上的对齐方式，适用于 Grid 布局。",
		"子项主轴自对齐"
	),
	justifyTracks: makeStringNode(
		[
			"center",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"space-around",
			"space-between",
			"space-evenly",
			"stretch",
			"end",
			"flex-end",
			"flex-start",
			"start",
			"normal",
			"left",
			"right",
		],
		"justify-tracks 控制 Grid 布局中轨道在主轴上的对齐方式，影响整列整体的分布行为。",
		"轨道主轴对齐"
	),
	left: makeNumberNode("left 设置定位元素的左侧偏移量，配合 position 使用。", "左侧定位"),
	letterSpacing: makeNumberNode("letter-spacing 设置字符之间的间距，影响排版紧凑度，可为负值或正值。", "字间距"),
	lineBreak: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "normal", "strict", "anywhere", "loose"],
		"line-break 控制换行行为，尤其在中文等 CJK 语言中，strict 表示更严格的断行控制。",
		"换行规则"
	),
	lineHeight: makeStringNode([], "line-height 设置文本行间距，可为数值、单位或 normal，用于控制文本垂直节奏。", "行高"),
	lineHeightStep: makeNumberNode("line-height-step 控制每行高度的步进值，实现基于基线网格的对齐排版（实验性属性）。", "行高步进"),
	listStyleImage: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"list-style-image 设置列表项的自定义图标图片，可以替代默认的圆点或数字。",
		"列表图标图片"
	),
	listStylePosition: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "inside", "outside"],
		"list-style-position 控制列表项标记是出现在内容框内（inside）还是外（outside）。",
		"列表标记位置"
	),
	listStyleType: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"list-style-type 设置列表项的标记样式，如圆点、数字、字母等，none 表示无标记。",
		"列表标记样式"
	),
	marginBlockEnd: makeNumberNode("margin-block-end 设置元素在块轴结束方向的外边距，通常对应 bottom。", "块轴结束外边距"),
	marginBlockStart: makeNumberNode("margin-block-start 设置元素在块轴起始方向的外边距，通常对应 top。", "块轴起始外边距"),
	marginBottom: makeNumberNode("margin-bottom 设置元素底部的外边距，控制与下方元素的垂直间距。", "下外边距"),
	marginInlineEnd: makeNumberNode("margin-inline-end 设置元素在 inline（行内）轴终止方向的外边距，通常对应右侧。", "行轴结束外边距"),
	marginInlineStart: makeNumberNode("margin-inline-start 设置元素在 inline（行内）轴起始方向的外边距，通常对应左侧。", "行轴起始外边距"),
	marginLeft: makeNumberNode("margin-left 设置元素左侧的外边距，控制与左侧元素或容器的水平间距。", "左外边距"),
	marginRight: makeNumberNode("margin-right 设置元素右侧的外边距，控制与右侧元素或容器的水平间距。", "右外边距"),
	marginTop: makeNumberNode("margin-top 设置元素顶部的外边距，控制与上方元素的垂直间距。", "上外边距"),
	marginTrim: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "all", "in-flow"],
		"margin-trim 控制块级元素是否修剪其外边距，避免多余的视觉间距（实验性属性）。",
		"外边距裁剪"
	),
	maskBorderMode: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "alpha", "luminance"],
		"mask-border-mode 指定遮罩边框如何从图像中计算透明度，使用 alpha 或 luminance 通道。",
		"遮罩边框模式"
	),
	maskBorderOutset: makeStringNode([], "mask-border-outset 设置遮罩边框区域向外扩展的距离，影响遮罩图像渲染区域。", "遮罩边框外扩"),
	maskBorderRepeat: makeRepeatNode("mask-border-repeat 控制遮罩边框图像在水平和垂直方向上的重复方式，例如 stretch、repeat。", "遮罩边框重复"),
	maskBorderSlice: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"mask-border-slice 设置如何从图像中裁剪出遮罩边框区域，通常使用数值或百分比。",
		"遮罩边框裁切"
	),
	maskBorderSource: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"mask-border-source 设置遮罩边框的图像来源，none 表示无图像，或提供图像 URL。",
		"遮罩边框来源"
	),
	maskBorderWidth: makeStringNode([], "mask-border-width 设置遮罩边框的宽度，控制遮罩区域的扩展范围，可接受数值或百分比。", "遮罩边框宽度"),
	maskClip: makeStringNode(
		[
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"border-box",
			"content-box",
			"padding-box",
			"fill-box",
			"margin-box",
			"stroke-box",
			"view-box",
			"no-clip",
		],
		"mask-clip 定义遮罩的裁剪区域，控制遮罩图形在哪个区域内生效。",
		"遮罩裁剪区域"
	),
	maskComposite: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "add", "exclude", "intersect", "subtract"],
		"mask-composite 控制多个遮罩图层之间的组合方式，如相交、相加或排除。",
		"遮罩图层混合"
	),
	maskImage: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"mask-image 设置遮罩所使用的图像资源，可以是 URL、渐变或 none。",
		"遮罩图像"
	),
	maskMode: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "alpha", "luminance", "match-source"],
		"mask-mode 控制遮罩图像如何参与遮罩计算，alpha 表示使用透明度，luminance 表示使用亮度。",
		"遮罩模式"
	),
	maskOrigin: makeStringNode(
		[
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"border-box",
			"content-box",
			"padding-box",
			"fill-box",
			"margin-box",
			"stroke-box",
			"view-box",
		],
		"mask-origin 指定遮罩图像的定位区域，类似 background-origin，影响遮罩图的对齐和定位基准。",
		"遮罩定位区域"
	),
	maskPosition: makeNumberNode("mask-position 设置遮罩图像的起始位置，类似 background-position，支持百分比、关键词或长度单位。", "遮罩位置"),
	maskRepeat: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "no-repeat", "repeat", "repeat-x", "repeat-y", "round", "space"],
		"mask-repeat 控制遮罩图像在水平和垂直方向上的重复方式，类似 background-repeat。",
		"遮罩重复方式"
	),
	maskSize: makeNumberNode("mask-size 设置遮罩图像的尺寸，类似 background-size，可为具体数值、百分比或 auto。", "遮罩尺寸"),
	maskType: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "alpha", "luminance"],
		"mask-type 设置 SVG 遮罩元素的遮罩类型，alpha 表示基于透明度，luminance 表示基于亮度。",
		"遮罩类型"
	),
	masonryAutoFlow: makeStringNode(
		["inherit", "next", "-moz-initial", "initial", "revert", "revert-layer", "unset", "definite-first", "ordered", "pack"],
		"masonry-auto-flow 控制 CSS Masonry 布局（实验性）中自动填充的顺序与策略，影响瀑布流排列方式。",
		"Masonry 自动流方向"
	),
	mathDepth: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto-add"],
		"math-depth 控制 MathML 数学表达式的嵌套层级，影响渲染缩进、对齐（实验性属性）。",
		"数学表达式层级"
	),
	mathShift: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "normal", "compact"],
		"math-shift 控制数学内容是否使用紧凑排版模式，compact 可缩小尺寸、简化布局（实验性）。",
		"数学排版模式"
	),
	mathStyle: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "normal", "compact"],
		"math-style 控制数学公式的全局样式布局，normal 表示标准，compact 表示紧凑模式（实验性）。",
		"数学样式模式"
	),
	maxBlockSize: makeNumberNode("max-block-size 设置元素在块轴方向（通常是垂直方向）的最大尺寸，受 writing-mode 影响。", "最大块高"),
	maxHeight: makeNumberNode("max-height 设置元素在垂直方向上的最大高度，超出部分将被限制显示或触发滚动。", "最大高度"),
	maxInlineSize: makeNumberNode("max-inline-size 设置元素在 inline 轴（通常是水平方向）上的最大尺寸，等价于 max-width。", "最大横向宽度"),
	maxLines: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"max-lines 限制文本可显示的最大行数，通常配合 overflow 和 line-clamp 使用（实验性）。",
		"最大显示行数"
	),
	maxWidth: makeNumberNode("max-width 设置元素在水平方向上的最大宽度，防止其扩展超过指定值。", "最大宽度"),
	minBlockSize: makeNumberNode("min-block-size 设置元素在块轴方向（通常是垂直）的最小尺寸，受 writing-mode 影响。", "最小块高"),
	minHeight: makeNumberNode("min-height 设置元素在垂直方向上的最小高度，确保内容不会被压缩过小。", "最小高度"),
	minInlineSize: makeNumberNode("min-inline-size 设置元素在 inline 轴（通常是水平）的最小尺寸，类似于 min-width。", "最小横向宽度"),
	minWidth: makeNumberNode("min-width 设置元素的最小宽度，防止其过度收缩，确保内容可见性。", "最小宽度"),
	mixBlendMode: makeStringNode(
		[
			"color",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"normal",
			"color-burn",
			"color-dodge",
			"darken",
			"difference",
			"exclusion",
			"hard-light",
			"hue",
			"lighten",
			"luminosity",
			"multiply",
			"overlay",
			"saturation",
			"screen",
			"soft-light",
			"plus-lighter",
		],
		"mix-blend-mode 设置元素的混合模式，控制其与背景的图层叠加方式，常用于图像特效或设计视觉融合。",
		"图层混合模式"
	),
	motionDistance: makeNumberNode("motion-distance 设置沿路径运动的距离，常与 motion-path 一起使用，单位可以是 px、% 等。", "运动路径距离"),
	motionPath: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"motion-path 定义元素的运动路径，可使用路径（如 SVG path）或 none。",
		"运动路径"
	),
	motionRotation: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "reverse"],
		"motion-rotation 控制元素沿运动路径移动时的旋转方向，例如自动旋转或反向旋转。",
		"路径旋转方式"
	),
	objectFit: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "contain", "cover", "fill", "scale-down"],
		"object-fit 定义媒体元素（如 img、video）在容器中的缩放与填充行为，类似 background-size。",
		"媒体填充方式"
	),
	objectPosition: makeNumberNode("object-position 设置媒体元素在容器中的对齐位置，支持百分比、像素或关键词（如 top、center）。", "媒体对齐位置"),
	offsetAnchor: makeNumberNode("offset-anchor 设置定位偏移的参考点，相对于元素自身的某个位置（如中心或角落）。", "偏移锚点位置"),
	offsetDistance: makeStringNode([], "offset-distance 定义元素沿 offset-path 移动的百分比或长度（如 50%、20px），用于路径动画。", "路径偏移距离"),
	offsetPath: makeStringNode([], "offset-path 指定元素的运动路径，可以是 SVG path、ray、inset 等路径值。", "路径偏移轨迹"),
	offsetPosition: makeNumberNode("offset-position 设置元素路径动画的起始位置，支持 top/left 百分比或关键字。", "路径起始位置"),
	offsetRotate: makeStringNode([], "offset-rotate 指定元素在路径上的旋转方式，可设置角度（如 45deg）、auto 或 reverse。", "路径自动旋转"),
	offsetRotation: makeStringNode([], "offset-rotation 是 offset-rotate 的别名，用于旧浏览器兼容，指定元素沿路径的旋转行为。", "路径旋转兼容"),
	opacity: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"opacity 设置元素的不透明度，取值范围 0（完全透明）到 1（完全不透明），也可使用 CSS 关键字。",
		"透明度"
	),
	order: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"order 定义 flex 子元素在主轴上的排列顺序，默认是 0，数字越小越靠前。",
		"Flex 排序顺序"
	),
	orphans: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"orphans 设置段落开头最少保留在页面底部的行数，常用于分页控制。",
		"分页孤行控制"
	),
	outlineColor: makeColorNode("outline-color 设置 outline（轮廓线）的颜色，通常用于可访问性高亮或焦点边框。", "轮廓线颜色"),
	outlineOffset: makeNumberNode("outline-offset 设置轮廓线与边框之间的间距，单位支持 px/em/%，可正可负。", "轮廓线偏移"),
	outlineStyle: makeStringNode(
		[
			"hidden",
			"none",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"auto",
			"dashed",
			"dotted",
			"double",
			"groove",
			"inset",
			"outset",
			"ridge",
			"solid",
		],
		"outline-style 定义轮廓线的样式，与 border-style 类似，支持实线、虚线等多种表现。",
		"轮廓线样式"
	),
	outlineWidth: makeNumberNode("outline-width 设置轮廓线宽度，支持数值单位（如 px/em/rem）。", "轮廓线宽度"),
	overflowAnchor: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto"],
		"overflow-anchor 控制滚动位置是否应被锚定（防止内容插入时滚动跳动）。",
		"滚动锚定"
	),
	overflowBlock: makeStringNode(
		["hidden", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "visible", "scroll", "clip"],
		"overflow-block 控制块级方向上的溢出处理方式。",
		"块级溢出"
	),
	overflowClipBox: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "content-box", "padding-box"],
		"overflow-clip-box 指定在哪个 box（内容或内边距）区域裁剪溢出内容。",
		"裁剪区域选择"
	),
	overflowClipMargin: makeNumberNode("overflow-clip-margin 设置裁剪框向外扩展的距离，用于 fine-tune 溢出裁剪区域。", "裁剪边距"),
	overflowInline: makeStringNode(
		["hidden", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "visible", "scroll", "clip"],
		"overflow-inline 控制行内方向上的内容溢出处理方式。",
		"行内溢出"
	),
	overflowWrap: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "normal", "anywhere", "break-word"],
		"overflow-wrap 决定单词是否可以在不适合容器时强制换行。",
		"强制换行策略"
	),
	overflowX: makeStringNode(
		["hidden", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "visible", "scroll", "clip", "-moz-hidden-unscrollable"],
		"控制水平方向上的内容溢出显示方式。",
		"水平溢出"
	),
	overflowY: makeStringNode(
		["hidden", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "visible", "scroll", "clip", "-moz-hidden-unscrollable"],
		"控制垂直方向上的内容溢出显示方式。",
		"垂直溢出"
	),
	overlay: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto"],
		"控制是否启用 overlay（覆盖层）样式效果，通常用于浏览器特性或组件库。",
		"覆盖层样式"
	),
	overscrollBehaviorBlock: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "contain"],
		"设置在块级滚动方向上的超滚动行为（如是否阻止父级滚动）。",
		"块级超滚动行为"
	),
	overscrollBehaviorInline: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "contain"],
		"设置在行内方向上的超滚动行为。",
		"行内超滚动行为"
	),
	overscrollBehaviorX: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "contain"],
		"控制水平方向的 overscroll 行为（如触底/触顶时是否联动父滚动）。",
		"水平超滚动行为"
	),
	overscrollBehaviorY: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "contain"],
		"控制垂直方向的 overscroll 行为。",
		"垂直超滚动行为"
	),
	paddingBlockEnd: makeNumberNode("设置块方向结束边的内边距（在 LTR 中为 bottom，RTL 中可能不同）。", "块尾内边距"),
	paddingBlockStart: makeNumberNode("设置块方向起始边的内边距（如从上至下的布局中为 paddingTop）。", "块首内边距"),
	paddingBottom: makeNumberNode("设置元素底部的内边距。", "底部内边距"),
	paddingInlineEnd: makeNumberNode("设置行内方向结束边的内边距（如从左到右为 paddingRight）。", "行尾内边距"),
	paddingInlineStart: makeNumberNode("设置行内方向起始边的内边距（如从左到右为 paddingLeft）。", "行首内边距"),
	paddingLeft: makeNumberNode("设置元素左侧的内边距。", "左侧内边距"),
	paddingRight: makeNumberNode("设置元素右侧的内边距。", "右侧内边距"),
	paddingTop: makeNumberNode("设置元素顶部的内边距。", "顶部内边距"),
	page: makeStringNode(["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto"], "指定用于打印时的页面框名称。"),
	pageBreakAfter: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "left", "right", "always", "avoid", "recto", "verso"],
		"控制元素之后的分页行为。"
	),
	pageBreakBefore: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "left", "right", "always", "avoid", "recto", "verso"],
		"控制元素之前的分页行为。"
	),
	pageBreakInside: makeStringNode(["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "avoid"], "控制元素内部是否允许分页。"),
	paintOrder: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "normal", "fill", "markers", "stroke"],
		"定义 SVG 图形中填充、描边和标记的绘制顺序。"
	),
	perspective: makeNumberNode("定义元素的透视距离，用于 3D 转换。", "透视距离"),
	perspectiveOrigin: makeNumberNode("定义透视视角的原点位置，影响 3D 转换的视觉效果。", "透视原点"),
	pointerEvents: makeStringNode(
		[
			"none",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"auto",
			"visible",
			"all",
			"fill",
			"stroke",
			"painted",
			"visibleFill",
			"visiblePainted",
			"visibleStroke",
		],
		"pointer-events 控制元素是否能成为鼠标事件的目标，在 SVG 和 HTML 元素中都适用，可用于实现点击穿透等效果。",
		"鼠标事件控制"
	),
	position: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "fixed", "-webkit-sticky", "absolute", "relative", "static", "sticky"],
		"position 定义元素在文档中的定位方式，例如普通流、相对定位、绝对定位、固定定位和粘性定位等。",
		"定位方式"
	),
	printColorAdjust: makeStringNode([], "print-color-adjust 是用于打印样式优化的实验性 CSS 属性，控制打印时颜色调整行为，目前支持有限。", "打印颜色控制"),
	quotes: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto"],
		"quotes 用于定义 `q` 标签或伪元素中引用内容的引号样式，适用于国际化文本展示。",
		"引号样式"
	),
	resize: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "both", "block", "inline", "horizontal", "vertical"],
		"resize 控制元素是否可由用户调整尺寸，常用于 `textarea` 和具有 overflow 的容器。",
		"可调整尺寸控制"
	),
	right: makeNumberNode("right 表示元素右侧与包含块右边界之间的偏移量，通常配合 `position: absolute|fixed` 使用。", "右边距"),
	rotate: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"rotate 用于设置元素的旋转变换，可接受角度或函数值，如 `rotate(45deg)`，支持动画。",
		"旋转变换"
	),
	rowGap: makeNumberNode("row-gap 设置网格或 flex 布局中行之间的间距，可使用长度单位或百分比。", "行间距"),
	rubyAlign: makeStringNode(
		["center", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "space-around", "space-between", "start"],
		"ruby-align 控制 ruby 注音文本（如汉语拼音）与基线的对齐方式，适用于 ruby 注释布局。",
		"注音对齐方式"
	),
	rubyMerge: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "collapse", "separate"],
		"ruby-merge 决定多个 ruby 注释是否合并显示，适用于多音节注音的处理。",
		"注音合并控制"
	),
	rubyPosition: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "alternate", "inter-character", "over", "under"],
		"ruby-position 控制注音文本的位置，例如在主文上方（over）或下方（under）。",
		"注音位置"
	),
	scale: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"scale 用于设置元素的缩放变换，通常配合 transform 使用，例如 scale(1.2)。",
		"缩放变换"
	),
	scrollBehavior: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "smooth"],
		"scroll-behavior 控制滚动行为是立即跳转（auto）还是平滑过渡（smooth）。",
		"滚动行为"
	),
	scrollMarginBlockEnd: makeNumberNode("scroll-margin-block-end 设置元素在滚动定位时与容器块轴尾部的外边距，常用于滚动定位优化。", "滚动块尾外边距"),
	scrollMarginBlockStart: makeNumberNode("scroll-margin-block-start 设置元素在滚动定位时与块轴起始方向（如上方）的外边距。", "滚动块首外边距"),
	scrollMarginBottom: makeNumberNode("scroll-margin-bottom 设置元素底部的滚动外边距，用于控制元素在滚动到视图中时的可视位置。", "滚动底部外边距"),
	scrollMarginInlineEnd: makeNumberNode("scroll-margin-inline-end 设置元素在滚动定位时与行内轴尾部（如右侧）的外边距，支持国际化布局。", "滚动行尾外边距"),
	scrollMarginInlineStart: makeNumberNode(
		"scroll-margin-inline-start 设置元素在滚动定位时与行内轴起始（如左侧）的外边距，支持国际化布局。",
		"滚动行首外边距"
	),
	scrollMarginLeft: makeNumberNode("scroll-margin-left 设置元素左侧的滚动外边距，控制其在滚动视图中的左边界距离。", "滚动左侧外边距"),
	scrollMarginRight: makeNumberNode("scroll-margin-right 设置元素右侧的滚动外边距，影响元素滚动到视图中的右边界距离。", "滚动右侧外边距"),
	scrollMarginTop: makeNumberNode("scroll-margin-top 设置元素顶部的滚动外边距，用于调整滚动定位时的顶部间距。", "滚动顶部外边距"),
	scrollPaddingBlockEnd: makeNumberNode("scroll-padding-block-end 设置块轴尾部（如下方）的滚动内边距，影响滚动定位时的可视区域边界。", "滚动块尾内边距"),
	scrollPaddingBlockStart: makeNumberNode("scroll-padding-block-start 设置块轴起始（如上方）的滚动内边距，调整滚动时元素在视口中的对齐。", "滚动块首内边距"),
	scrollPaddingBottom: makeNumberNode("scroll-padding-bottom 设置元素底部的滚动内边距，控制滚动定位时的底部可视间距。", "滚动底部内边距"),
	scrollPaddingInlineEnd: makeNumberNode("scroll-padding-inline-end 设置行内轴尾部（如右侧）的滚动内边距，支持国际化布局。", "滚动行尾内边距"),
	scrollPaddingInlineStart: makeNumberNode("scroll-padding-inline-start 设置行内轴起始（如左侧）的滚动内边距，支持国际化文本方向。", "滚动行首内边距"),
	scrollPaddingLeft: makeNumberNode("scroll-padding-left 设置元素左侧的滚动内边距，影响滚动到视口时的对齐位置。", "滚动左侧内边距"),
	scrollPaddingRight: makeNumberNode("scroll-padding-right 设置元素右侧的滚动内边距，调整滚动定位时右边界的可视距离。", "滚动右侧内边距"),
	scrollPaddingTop: makeNumberNode("scroll-padding-top 设置元素顶部的滚动内边距，用于调整滚动定位时顶部的可视距离。", "滚动顶部内边距"),
	scrollSnapAlign: makeStringNode(
		["center", "none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "end", "start"],
		"scroll-snap-align 指定元素在其滚动容器中对齐的位置，用于滚动吸附（Scroll Snap）效果。",
		"滚动吸附对齐"
	),
	scrollSnapMarginBottom: makeStringNode(
		[],
		"scroll-snap-margin-bottom 设置用于滚动吸附计算的底部外边距，类似于 scroll-margin-bottom，但仅用于 snap 对齐。",
		"吸附底部边距"
	),
	scrollSnapMarginLeft: makeStringNode([], "scroll-snap-margin-left 设置用于滚动吸附计算的左侧外边距，用于影响吸附点的位置。", "吸附左侧边距"),
	scrollSnapMarginRight: makeStringNode([], "scroll-snap-margin-right 设置用于滚动吸附计算的右侧外边距，调整右吸附边界。", "吸附右侧边距"),
	scrollSnapMarginTop: makeStringNode([], "scroll-snap-margin-top 设置滚动吸附点的顶部边距，提升滚动吸附的精度控制。", "吸附顶部边距"),
	scrollSnapStop: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "normal", "always"],
		"scroll-snap-stop 控制滚动是否强制停留在吸附点，例如 'always' 强制每次滚动都停在一个吸附点。",
		"吸附停止策略"
	),
	scrollSnapType: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "both", "block", "inline", "x", "y"],
		"scroll-snap-type 定义容器的滚动吸附行为，包括方向（x/y/block/inline/both）及是否启用吸附。",
		"滚动吸附类型"
	),
	scrollTimelineAxis: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "block", "inline", "x", "y"],
		"scroll-timeline-axis 是用于 CSS Scroll-driven Animations 的实验性属性，定义滚动轴方向。",
		"滚动时间轴方向"
	),
	scrollTimelineName: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"scroll-timeline-name 指定绑定到元素的滚动时间轴名称，配合 @scroll-timeline 使用。",
		"滚动时间轴名称"
	),
	scrollbarColor: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto"],
		"scrollbar-color 控制滚动条的颜色，自定义滚动条外观，支持 `auto` 或 `color1 color2`。",
		"滚动条颜色"
	),
	scrollbarGutter: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "stable"],
		"scrollbar-gutter 控制是否为滚动条预留空间，避免内容跳动，常用于横向布局。",
		"滚动条预留空间"
	),
	scrollbarWidth: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "thin"],
		"scrollbar-width 设置滚动条的宽度样式，支持 thin（细）、auto（默认）和 none（隐藏）。",
		"滚动条宽度"
	),
	shapeImageThreshold: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"shape-image-threshold 定义图像透明度阈值，用于创建形状外轮廓（shape-outside）。",
		"图像形状阈值"
	),
	shapeMargin: makeNumberNode("shape-margin 设置环绕文本与定义形状（shape-outside）之间的距离。", "形状外边距"),
	shapeOutside: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "border-box", "content-box", "padding-box", "margin-box"],
		"shape-outside 定义元素周围文本环绕的自定义形状，可基于 box 或路径或图片。",
		"文本环绕形状"
	),
	tabSize: makeStringNode([], "tab-size 设置制表符（Tab）字符的宽度，通常用于控制文本对齐或代码缩进显示效果。", "制表符宽度"),
	tableLayout: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "fixed"],
		"table-layout 控制表格列宽的计算方式，fixed 可提升性能且避免内容撑宽表格。",
		"表格布局算法"
	),
	textAlign: makeStringNode(
		[
			"center",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"end",
			"start",
			"left",
			"right",
			"-webkit-match-parent",
			"justify",
			"match-parent",
		],
		"text-align 设置块级元素中文本的水平对齐方式，例如居中、两端对齐、左对齐等。",
		"文本对齐方式"
	),
	textAlignLast: makeStringNode(
		["center", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "end", "start", "left", "right", "justify"],
		"text-align-last 控制多行文本中最后一行的对齐方式，常用于段落结尾对齐优化。",
		"末行对齐方式"
	),
	textCombineUpright: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "all"],
		"text-combine-upright 在垂直排版中允许将多个字符合并为一个直排单位，常用于日文排版。",
		"垂直排版合字"
	),
	textDecorationColor: makeColorNode("text-decoration-color 设置文本装饰线的颜色（如下划线/删除线），可与其他 text-decoration 配合使用。", "文本装饰颜色"),
	textDecorationLine: makeStringNode(
		[
			"none",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"blink",
			"grammar-error",
			"line-through",
			"overline",
			"spelling-error",
			"underline",
		],
		"text-decoration-line 指定要添加的装饰线类型（下划线、删除线、上划线等）。",
		"文本装饰类型"
	),
	textDecorationSkip: makeStringNode(
		[
			"none",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"box-decoration",
			"edges",
			"leading-spaces",
			"objects",
			"spaces",
			"trailing-spaces",
		],
		"text-decoration-skip 控制文本装饰线是否跳过空格、对象等，优化装饰线展示细节。",
		"装饰线跳过策略"
	),
	textDecorationSkipInk: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "all"],
		"text-decoration-skip-ink 控制下划线是否避开字符笔画，以避免视觉遮挡，常用于提升可读性。",
		"跳过墨迹描边"
	),
	textDecorationStyle: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "dashed", "dotted", "double", "solid", "wavy"],
		"text-decoration-style 设置文本装饰线的线型，例如实线、虚线、波浪线等。",
		"装饰线样式"
	),
	textDecorationThickness: makeNumberNode("text-decoration-thickness 设置文本装饰线的粗细，可用具体长度或百分比指定。", "装饰线粗细"),
	textEmphasisColor: makeColorNode("text-emphasis-color 设置文本强调标记（如点、圈、线）的颜色，常用于东亚文字排版。", "文本强调颜色"),
	textEmphasisPosition: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"text-emphasis-position 控制文本强调标记的位置（例如上方、左侧），适用于竖排或横排文本。",
		"文本强调位置"
	),
	textEmphasisStyle: makeStringNode(
		[
			"filled",
			"circle",
			"none",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"dot",
			"double-circle",
			"open",
			"sesame",
			"triangle",
		],
		"text-emphasis-style 定义文本强调的样式（如点、圈、芝麻等），用于日文或中文排版强调。",
		"文本强调样式"
	),
	textIndent: makeNumberNode("text-indent 设置文本首行缩进的距离，通常用于段落格式化。", "首行缩进"),
	textJustify: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "inter-character", "inter-word"],
		"text-justify 用于控制文本两端对齐时的间距分配方式，特别是在多语言或中文中提高排版质量。",
		"文本对齐优化"
	),
	textOrientation: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "mixed", "sideways", "upright"],
		"text-orientation 控制垂直排版中字符的方向，适用于直排文本（如日文、中文排版）。",
		"文字方向控制"
	),
	textOverflow: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "clip", "ellipsis"],
		"text-overflow 控制当文本溢出容器时的显示方式，如截断或添加省略号。",
		"文本溢出处理"
	),
	textRendering: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "geometricPrecision", "optimizeLegibility", "optimizeSpeed"],
		"text-rendering 提示浏览器如何渲染文本，影响性能、字形细节或可读性。",
		"文本渲染优化"
	),
	textShadow: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"text-shadow 设置文本阴影，可用于增强文本可读性或设计装饰。",
		"文本阴影"
	),
	textSizeAdjust: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto"],
		"text-size-adjust 控制移动端字体是否自动缩放以适应屏幕，通常用于响应式布局控制。",
		"字体自动缩放"
	),
	textTransform: makeStringNode(
		[
			"none",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"full-width",
			"capitalize",
			"full-size-kana",
			"lowercase",
			"uppercase",
		],
		"text-transform 控制文本的大小写变换，例如首字母大写、全大写、全小写等。",
		"文本大小写转换"
	),
	textUnderlineOffset: makeNumberNode("text-underline-offset 控制下划线距离文本的垂直偏移量，可用于细调装饰线位置。", "下划线偏移"),
	textUnderlinePosition: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "left", "right", "from-font", "under"],
		"text-underline-position 控制下划线的绘制位置，如在文字下方、字体定义或左右偏移等。",
		"下划线位置"
	),
	textWrap: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "balance", "nowrap", "wrap", "stable", "pretty"],
		"text-wrap 控制文本换行行为，例如禁止换行（nowrap）、自动换行（wrap）或增强排版（balance, pretty）。",
		"文本换行策略"
	),
	timelineScope: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"timeline-scope 是一个实验性属性，用于定义 CSS 动画时间轴作用范围（配合 Scroll-driven 动画使用）。",
		"时间轴作用域"
	),
	top: makeNumberNode("top 设置元素顶部边界与定位父元素的距离，仅在 position 为 absolute、relative、fixed 等时有效。", "顶部定位"),
	touchAction: makeStringNode(
		[
			"none",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"auto",
			"-ms-manipulation",
			"-ms-none",
			"-ms-pinch-zoom",
			"manipulation",
			"pan-down",
			"pan-left",
			"pan-right",
			"pan-up",
			"pan-x",
			"pan-y",
			"pinch-zoom",
		],
		"touch-action 控制触摸设备上的默认手势操作（如滚动、缩放），常用于移动端手势控制优化。",
		"触摸交互行为"
	),
	transform: makeStringNode(
		[
			"matrix(1, 0, 0, 1, 0, 0)",
			"matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)",
			"perspective(10px)",
			"rotate(45deg)",
			"rotate3d(1, 1, 1, 45deg)",
			"rotateX(45deg))",
			"rotateY(45deg))",
			"rotateZ(45deg))",
			"scale(1.5)",
			"scale3d(1.5, 1.5, 1.5)",
			"scaleX(1.5)",
			"scaleY(1.5)",
			"skew(10deg, 10deg)",
			"skewX(10deg)",
			"skewY(10deg)",
			"translate(10px, 10px)",
			"translate3d(10px, 10px, 10px)",
			"translateX(10px)",
			"translateY(10px)",
			"translateZ(10px)",
			"none",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
		],
		"transform 定义元素的 2D 或 3D 变换，如旋转、缩放、位移、倾斜等，常用于动态动画或交互效果。",
		"变换操作"
	),
	transformBox: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "border-box", "content-box", "fill-box", "stroke-box", "view-box"],
		"transform-box 定义变换操作的应用区域，用于 SVG 和高级图形渲染控制。",
		"变换区域定义"
	),
	transformOrigin: makeStringNode(["center center"], "transform-origin 定义元素变换的中心点位置，例如左上角、中心或自定义偏移。", "变换基点"),
	transformStyle: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "flat", "preserve-3d"],
		"transform-style 决定子元素是否在 3D 空间中保留其位置，常与 perspective 配合使用。",
		"变换样式控制"
	),
	transitionBehavior: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "normal", "allow-discrete"],
		"transition-behavior 是实验性属性，用于控制 transition 是否允许离散动画（如 visibility、display）。",
		"过渡行为策略"
	),
	transitionDelay: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"transition-delay 设置 CSS 过渡开始前的延迟时间，可用 s/ms 单位，支持多个值。",
		"过渡延迟时间"
	),
	transitionDuration: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"transition-duration 设置 CSS 属性过渡所持续的时间，可设定为多个值。",
		"过渡持续时间"
	),
	transitionProperty: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "all"],
		"transition-property 指定哪些属性应参与过渡动画，'all' 表示所有可动画属性。",
		"过渡属性列表"
	),
	transitionTimingFunction: makeStringNode(
		[
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"ease",
			"ease-in",
			"ease-in-out",
			"ease-out",
			"step-end",
			"step-start",
			"linear",
		],
		"transition-timing-function 定义动画过渡的速度曲线（缓动函数），影响动画节奏感。",
		"过渡缓动函数"
	),
	translate: makeNumberNode("translate 用于设置 2D/3D 位移变换，等效于 transform 中的 translate()。", "元素位移"),
	unicodeBidi: makeStringNode(
		[
			"embed",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"normal",
			"isolate",
			"-moz-isolate",
			"-moz-isolate-override",
			"-moz-plaintext",
			"-webkit-isolate",
			"-webkit-isolate-override",
			"-webkit-plaintext",
			"bidi-override",
			"isolate-override",
			"plaintext",
		],
		"unicode-bidi 配合 direction 属性控制双向文本渲染方向，适用于阿拉伯文、希伯来文等场景。",
		"双向文本控制"
	),
	userSelect: makeStringNode(
		["text", "none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "contain", "all", "-moz-none", "element"],
		"user-select 控制用户是否可以选中文本，常用于防止复制或增强交互体验。",
		"用户选择权限"
	),
	verticalAlign: makeNumberNode("vertical-align 设置元素在行内或表格单元格中的垂直对齐方式，也可设定具体偏移值。", "垂直对齐"),
	viewTimelineAxis: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "block", "inline", "x", "y"],
		"view-timeline-axis 是实验性属性，用于定义基于视口滚动的动画时间轴方向（如 x/y 轴）。",
		"视图时间轴方向"
	),
	viewTimelineInset: makeNumberNode("view-timeline-inset 设置视口滚动时间轴的偏移范围，用于定义触发动画的滚动区间。", "视图时间轴内边距"),
	viewTimelineName: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"view-timeline-name 定义滚动驱动动画所绑定的视口时间轴名称，配合 scroll-driven 动画使用。",
		"视图时间轴名称"
	),
	viewTransitionName: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"view-transition-name 是 View Transitions API 中用于页面状态过渡的命名标识。",
		"视图过渡标识"
	),
	visibility: makeStringNode(
		["hidden", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "visible", "collapse"],
		"visibility 控制元素是否可见，区别于 display:none，它仍保留空间。",
		"元素可见性"
	),
	whiteSpace: makeStringNode(
		[
			"pre",
			"none",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"normal",
			"collapse",
			"balance",
			"nowrap",
			"wrap",
			"stable",
			"pretty",
			"-moz-pre-wrap",
			"break-spaces",
			"discard",
			"discard-after",
			"discard-before",
			"discard-inner",
			"pre-line",
			"pre-wrap",
			"preserve",
			"preserve-breaks",
			"preserve-spaces",
		],
		"white-space 控制空格、换行和文本折行的方式，如 pre、nowrap、pre-wrap 等。",
		"空白与换行策略"
	),
	whiteSpaceCollapse: makeStringNode(
		[
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"collapse",
			"break-spaces",
			"discard",
			"preserve",
			"preserve-breaks",
			"preserve-spaces",
		],
		"white-space-collapse 是 CSS Text Level 4 中定义的实验性属性，用于指定空白折叠行为。",
		"空白折叠规则"
	),
	whiteSpaceTrim: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "discard-after", "discard-before", "discard-inner"],
		"white-space-trim 控制是否丢弃空白字符（如前后空格或中间多余空格），也是实验性属性。",
		"空白裁剪策略"
	),
	widows: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"widows 定义段落分页时页面底部至少保留的最少行数，常用于打印和排版控制。",
		"分页遗留行数"
	),
	width: makeNumberNode("width 设置元素的宽度，可使用长度单位（如 px, %, vw 等），也支持 auto 或 fit-content 等关键字。", "元素宽度"),
	willChange: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "contents", "scroll-position"],
		"will-change 用于提示浏览器哪些属性将会变化，以提前优化性能（如启用 GPU 加速）。",
		"性能优化提示"
	),
	wordBreak: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "normal", "break-word", "break-all", "keep-all"],
		"word-break 控制单词在遇到边界或容器限制时的断字行为，适用于多语言排版。",
		"单词换行控制"
	),
	wordSpacing: makeNumberNode("word-spacing 设置单词之间的间距，常用于排版微调或实现特定的对齐效果。", "单词间距"),
	wordWrap: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "normal", "break-word"],
		"word-wrap（现为 overflow-wrap 的别名）控制长单词或 URL 是否应在容器边界自动断行。",
		"长词换行策略"
	),
	writingMode: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "horizontal-tb", "sideways-lr", "sideways-rl", "vertical-lr", "vertical-rl"],
		"writing-mode 控制文本书写方向，如横排、竖排或横中竖排混排，常用于中日韩排版。",
		"文字书写方向"
	),
	zIndex: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto"],
		"z-index 设置元素在 z 轴上的层叠顺序，仅对定位元素有效，可用于控制前后遮盖关系。",
		"层叠顺序"
	),
	zoom: makeStringNode(
		["reset", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "normal"],
		"zoom 是非标准属性，用于设置页面或元素的缩放级别，通常用于兼容老式 IE 或 WebKit 内核浏览器。",
		"页面缩放"
	),
	all: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"all 是一个通配简写属性，用于一次性重置所有可动画的 CSS 属性。",
		"统一重置属性"
	),
	animation: makeStringNode(
		[
			"none",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"auto",
			"normal",
			"alternate",
			"alternate-reverse",
			"reverse",
			"backwards",
			"both",
			"forwards",
			"infinite",
			"number & {}",
			"paused",
			"running",
			"ease",
			"ease-in",
			"ease-in-out",
			"ease-out",
			"step-end",
			"step-start",
			"linear",
		],
		"animation 是 CSS 动画的复合简写属性，包含名称、时长、缓动、延迟、方向、次数等配置。",
		"动画简写"
	),
	animationRange: makeNumberNode("animation-range 是 Scroll-driven 动画中的新属性，用于控制动画时间轴与滚动的映射范围。", "动画滚动范围"),
	background: makeStringNode([], "background 是背景样式的复合简写属性，包含 color、image、position、repeat、size、attachment 等。", "背景简写"),
	backgroundPosition: makeStringNode(["center center", "0px 0px"], "background-position 设置背景图像的起始位置，可使用方向关键字或长度单位。", "背景图位置"),
	border: makeStringNode(["1px solid #454545"], "border 是边框的简写属性，包含宽度（width）、样式（style）、颜色（color）。", "边框简写"),
	borderBlock: makeNumberNode("border-block 是用于逻辑方向（上下方向）设置边框的简写属性，支持布局国际化。", "逻辑块边框"),
	borderBlockEnd: makeNumberNode("border-block-end 设置元素在逻辑块轴结束方向（通常是下方）的边框宽度，可用于国际化布局。", "逻辑块尾边框"),
	borderBlockStart: makeNumberNode("border-block-start 设置元素在逻辑块轴起始方向（通常是上方）的边框宽度，适用于双语和垂直排版。", "逻辑块首边框"),
	borderBottom: makeNumberNode("border-bottom 设置元素底部边框的宽度（简写形式），等效于单独设置 width/style/color。", "底部边框"),
	borderColor: makeColorNode("border-color 设置元素四个边框的颜色，也可以分别指定 top/right/bottom/left 的颜色。", "边框颜色"),
	borderImage: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "stretch", "number & {}", "repeat", "round", "space"],
		"border-image 定义使用图像填充边框的样式，可控制切片、重复方式、宽度等。",
		"边框图像"
	),
	borderInline: makeNumberNode("border-inline 是一个逻辑属性，用于同时设置行内轴（左右）的边框宽度，适配多语言布局。", "逻辑行边框"),
	borderInlineEnd: makeNumberNode("border-inline-end 设置逻辑行尾方向（如从左到右布局的右边）边框宽度，适合国际化场景。", "逻辑行尾边框"),
	borderInlineStart: makeNumberNode("border-inline-start 设置逻辑行首方向（如从左到右布局的左边）边框宽度，适用于多语言界面。", "逻辑行首边框"),
	borderLeft: makeNumberNode("border-left 设置元素左边边框的宽度，等效于同时设置左边框的宽度、样式和颜色。", "左侧边框"),
	borderRadius: makeNumberNode("border-radius 设置元素的圆角大小，可设定统一或分别设置四个角的半径。", "圆角半径"),
	borderRight: makeNumberNode("border-right 设置元素右边边框的宽度（简写形式），用于控制右侧边框的显示。", "右侧边框"),
	borderStyle: makeStringNode(
		[
			"hidden",
			"none",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"dashed",
			"dotted",
			"double",
			"groove",
			"inset",
			"outset",
			"ridge",
			"solid",
		],
		"border-style 设置边框的样式类型，如实线（solid）、虚线（dashed）、双线（double）等。",
		"边框样式"
	),
	borderTop: makeNumberNode("border-top 设置元素顶部边框的宽度（简写形式），等效于同时设置 top 的 width/style/color。", "顶部边框"),
	borderWidth: makeNumberNode("border-width 设置四个方向边框的宽度，也可单独设置 top/right/bottom/left。", "边框宽度"),
	caret: makeColorNode("caret-color 设置文本插入光标（输入框中的闪烁光标）的颜色。", "光标颜色"),
	columnRule: makeNumberNode("column-rule 设置多列布局中列之间的分隔线宽度（及其样式、颜色）。", "列间分隔线"),
	columns: makeStringNode([], "columns 是多列布局的简写属性，用于同时设置 column-width 和 column-count。", "多列布局简写"),
	containIntrinsicSize: makeNumberNode("contain-intrinsic-size 设置内容未加载前的占位尺寸，适用于 `content-visibility: auto` 的性能优化。", "固有尺寸占位"),
	container: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"container 用于定义元素为一个容器查询单元（CSS Container Queries），以启用容器级响应式。",
		"容器查询标记"
	),
	flex: makeStringNode([], "flex 是 Flex 布局中设置弹性项目宽度和收缩比例的简写属性，等同于设置 grow/shrink/basis。", "弹性项简写"),
	flexFlow: makeStringNode(
		[
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"column",
			"column-reverse",
			"row",
			"row-reverse",
			"nowrap",
			"wrap",
			"wrap-reverse",
		],
		"flex-flow 是 Flex 布局中 `flex-direction` 和 `flex-wrap` 的组合简写属性。",
		"弹性流向简写"
	),
	font: makeStringNode(
		["caption", "menu", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "icon", "message-box", "small-caption", "status-bar"],
		"font 是字体样式的简写属性，可设置字体大小、行高、字体族等，支持系统字体关键字。",
		"字体样式简写"
	),
	gap: makeNumberNode("gap 设置 Flex、Grid 等布局中子元素之间的间距，可用于同时设置 row-gap 和 column-gap。", "元素间距"),
	grid: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"grid 是 Grid 布局的复合简写属性，用于快速定义网格模板行、列和区域配置。",
		"网格布局简写"
	),
	gridArea: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto"],
		"grid-area 设置元素所在的网格区域，可通过命名区域或指定行列位置实现。",
		"网格区域位置"
	),
	gridColumn: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto"],
		"grid-column 设置元素在网格布局中所跨列的范围（起始/终止），也可设置为 auto。",
		"网格列范围"
	),
	gridRow: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto"],
		"grid-row 设置元素在网格布局中所跨的行范围（起始/终止），可使用行编号或 auto。",
		"网格行范围"
	),
	gridTemplate: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"grid-template 是 Grid 布局中定义行、列和区域整体结构的复合简写属性。",
		"网格模板简写"
	),
	inset: makeNumberNode("inset 是 top/right/bottom/left 的简写属性，用于设置元素的内边界偏移，通常用于定位布局。", "定位偏移简写"),
	insetBlock: makeNumberNode("inset-block 设置元素在逻辑块方向（上下）的内边界偏移，适用于支持国际化方向的布局。", "块方向偏移"),
	insetInline: makeNumberNode("inset-inline 设置元素在逻辑行内方向（左右）的偏移，适用于多语言与垂直排版支持。", "行方向偏移"),
	lineClamp: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"line-clamp 限制文本显示的最大行数，超出部分可配合 ellipsis 实现截断效果。",
		"文本行数限制"
	),
	listStyle: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "inside", "outside"],
		"list-style 是用于设置列表项标记的样式、位置和图标的复合简写属性。",
		"列表样式简写"
	),
	margin: make4Params("margin 设置元素的外边距，可一次性定义上下左右四个方向的值（支持 1~4 个参数）。", "外边距"),
	marginBlock: makeNumberNode("margin-block 设置元素在逻辑块方向（上下）的外边距，用于支持多语言和垂直排版。", "逻辑块方向外边距"),
	marginInline: makeNumberNode("margin-inline 设置元素在逻辑行方向（左右）的外边距，适用于国际化布局。", "逻辑行方向外边距"),
	mask: makeNumberNode("mask 是图像遮罩相关属性的简写形式，可设置遮罩图层的大小、位置、不透明度等。", "遮罩简写"),
	maskBorder: makeStringNode(
		[
			"none",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"stretch",
			"number & {}",
			"repeat",
			"round",
			"space",
			"alpha",
			"luminance",
		],
		"mask-border 设置元素边框区域的遮罩图像及其切片方式、缩放策略等。",
		"边框遮罩"
	),
	motion: makeNumberNode("motion 是早期用于定义元素动画路径的属性，现代规范中已被 offset-* 系列替代。", "运动路径（已弃用）"),
	offset: makeNumberNode("offset 是动画运动的复合简写属性，包含路径、距离、方向等，常用于 motion path。", "路径偏移简写"),
	outline: makeNumberNode("outline 设置元素外轮廓的宽度、颜色和样式，不占据空间，常用于无障碍可访问性和焦点提示。", "外轮廓样式"),
	overflow: makeStringNode(
		["hidden", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "visible", "scroll", "clip", "-moz-hidden-unscrollable"],
		"overflow 控制内容在溢出容器时的展示行为，如隐藏、滚动、截断等。",
		"内容溢出控制"
	),
	overscrollBehavior: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "contain"],
		"overscroll-behavior 控制滚动容器在滚动边界时的行为，如是否触发浏览器默认回弹或导航等。",
		"滚动越界行为"
	),
	padding: make4Params("padding 设置元素的内边距，可使用 1~4 个参数分别设置上下左右方向。", "内边距"),
	paddingBlock: makeNumberNode("padding-block 设置逻辑块方向（上下）的内边距，适用于多语言和垂直排版环境。", "逻辑块内边距"),
	paddingInline: makeNumberNode("padding-inline 设置逻辑行内方向（左右）的内边距，适配多语言书写方向。", "逻辑行内内边距"),
	placeContent: makeStringNode(
		[
			"center",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"space-around",
			"space-between",
			"space-evenly",
			"stretch",
			"end",
			"flex-end",
			"flex-start",
			"start",
			"baseline",
			"normal",
		],
		"place-content 是 align-content 与 justify-content 的简写属性，用于控制容器内项目的整体布局。",
		"内容对齐简写"
	),
	placeItems: makeStringNode(
		[
			"center",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"stretch",
			"end",
			"flex-end",
			"flex-start",
			"start",
			"baseline",
			"normal",
			"self-end",
			"self-start",
		],
		"place-items 是 align-items 与 justify-items 的简写属性，控制单元格内项目的对齐方式。",
		"项目对齐简写"
	),
	placeSelf: makeStringNode(
		[
			"center",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"auto",
			"stretch",
			"end",
			"flex-end",
			"flex-start",
			"start",
			"baseline",
			"normal",
			"self-end",
			"self-start",
		],
		"place-self 是 align-self 与 justify-self 的简写属性，用于单个项目的自定义对齐方式。",
		"单项对齐简写"
	),
	scrollMargin: makeNumberNode("scroll-margin 是 scroll-margin-* 属性的简写形式，用于设置滚动定位时元素与视口边缘的偏移距离。", "滚动外边距简写"),
	scrollMarginBlock: makeNumberNode("scroll-margin-block 设置逻辑块方向（上下）上的滚动定位偏移量，适配国际化布局。", "滚动块方向外边距"),
	scrollMarginInline: makeNumberNode("scroll-margin-inline 设置逻辑行方向（左右）上的滚动定位偏移量，适配国际化布局。", "滚动行方向外边距"),
	scrollPadding: makeNumberNode("scroll-padding 是 scroll-padding-* 属性的简写形式，用于设置滚动容器的内部可视边距。", "滚动内边距简写"),
	scrollPaddingBlock: makeNumberNode("scroll-padding-block 设置逻辑块方向（上下）的滚动内边距，用于精细控制滚动对齐偏移。", "滚动块方向内边距"),
	scrollPaddingInline: makeNumberNode("scroll-padding-inline 设置逻辑行方向（左右）的滚动内边距，用于控制滚动容器内部空间。", "滚动行方向内边距"),
	scrollTimeline: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"scroll-timeline 是 Scroll-driven Animations 中定义滚动驱动时间轴的属性，关联滚动进度与动画。",
		"滚动时间轴"
	),
	textDecoration: makeNumberNode("text-decoration 是下划线、删除线等文本修饰线的复合简写属性，包含线型、颜色、位置等。", "文本装饰简写"),
	textEmphasis: makeColorNode("text-emphasis 设置文本的强调标记（如点、圈、芝麻样），可与 position 和 style 配合使用。", "文本强调颜色"),
	transition: makeStringNode(
		[
			"all .3s",
			"none",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"normal",
			"ease",
			"ease-in",
			"ease-in-out",
			"ease-out",
			"step-end",
			"step-start",
			"linear",
			"all",
			"allow-discrete",
		],
		"transition 是动画过渡的复合简写属性，用于统一设置属性、时长、缓动、延迟等。",
		"过渡动画简写"
	),
	viewTimeline: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"view-timeline 定义一个可视驱动的滚动时间轴，用于 Scroll-driven Animation。",
		"视图驱动时间轴"
	),
	WebkitAppearance: makeStringNode(
		[
			"button",
			"meter",
			"textarea",
			"checkbox",
			"radio",
			"none",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"listbox",
			"menulist",
			"progress-bar",
			"push-button",
			"searchfield",
			"slider-horizontal",
			"square-button",
			"menulist-button",
			"textfield",
			"button-bevel",
			"caret",
			"listitem",
			"menulist-text",
			"menulist-textfield",
			"-apple-pay-button",
			"default-button",
			"inner-spin-button",
			"media-controls-background",
			"media-controls-fullscreen-background",
			"media-current-time-display",
			"media-enter-fullscreen-button",
			"media-exit-fullscreen-button",
			"media-fullscreen-button",
			"media-mute-button",
			"media-overlay-play-button",
			"media-play-button",
			"media-seek-back-button",
			"media-seek-forward-button",
			"media-slider",
			"media-sliderthumb",
			"media-time-remaining-display",
			"media-toggle-closed-captions-button",
			"media-volume-slider",
			"media-volume-slider-container",
			"media-volume-sliderthumb",
			"progress-bar-value",
			"searchfield-cancel-button",
			"searchfield-decoration",
			"searchfield-results-button",
			"searchfield-results-decoration",
			"slider-vertical",
			"sliderthumb-horizontal",
			"sliderthumb-vertical",
		],
		"WebkitAppearance 是用于定义元素原生外观的私有前缀属性，可移除或还原原生控件样式。",
		"Webkit外观控制"
	),
	WebkitBorderBeforeColor: makeColorNode("WebkitBorderBeforeColor 设置元素在 WebKit 引擎中的逻辑前方向边框颜色（私有属性）。", "Webkit前边框颜色"),
	WebkitBorderBeforeStyle: makeStringNode(
		[
			"hidden",
			"none",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"dashed",
			"dotted",
			"double",
			"groove",
			"inset",
			"outset",
			"ridge",
			"solid",
		],
		"WebkitBorderBeforeStyle 设置逻辑前方向的边框样式，用于多语言书写方向支持（私有属性）。",
		"Webkit前边框样式"
	),
	WebkitBorderBeforeWidth: makeNumberNode("WebkitBorderBeforeWidth 设置逻辑前方向边框的宽度（WebKit 私有属性），多用于垂直书写场景。", "Webkit前边框宽度"),
	WebkitBoxReflect: makeNumberNode("WebkitBoxReflect 是 WebKit 专用属性，用于在元素下方添加镜像反射效果。", "Webkit反射效果"),
	WebkitLineClamp: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"WebkitLineClamp 是用于限制文本行数的私有属性，常与 `display: -webkit-box` 和 `-webkit-box-orient: vertical` 配合使用。",
		"文本截断行数"
	),
	WebkitMaskAttachment: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "fixed", "local", "scroll"],
		"WebkitMaskAttachment 控制遮罩图像的滚动行为，类似于 background-attachment，用于 WebKit 引擎。",
		"遮罩滚动模式"
	),
	WebkitMaskClip: makeStringNode(
		[
			"text",
			"content",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"border-box",
			"content-box",
			"padding-box",
			"border",
			"padding",
		],
		"WebkitMaskClip 定义遮罩图像的裁剪区域，控制其显示的边界区域，WebKit 私有属性。",
		"遮罩裁剪区域"
	),
	WebkitMaskComposite: makeStringNode(
		[
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"copy",
			"clear",
			"destination-atop",
			"destination-in",
			"destination-out",
			"destination-over",
			"source-atop",
			"source-in",
			"source-out",
			"source-over",
			"xor",
		],
		"WebkitMaskComposite 控制多个遮罩图层如何混合叠加，类似于 compositing 模式，属于高级图形属性。",
		"遮罩混合模式"
	),
	WebkitMaskImage: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"WebkitMaskImage 设置遮罩图像资源的路径或渐变值，决定遮罩内容区域。",
		"遮罩图像"
	),
	WebkitMaskOrigin: makeStringNode(
		["content", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "border-box", "content-box", "padding-box", "border", "padding"],
		"WebkitMaskOrigin 控制遮罩图像的定位区域，类似于 background-origin，用于 WebKit 引擎。",
		"遮罩定位区域"
	),
	WebkitMaskPosition: makeNumberNode("WebkitMaskPosition 控制遮罩图像在元素中的起始位置，通常配合大小与原点共同使用。", "遮罩图像位置"),
	WebkitMaskPositionX: makeNumberNode("WebkitMaskPositionX 设置遮罩图像在水平方向上的起始位置（仅 WebKit 内核支持）。", "遮罩水平位置"),
	WebkitMaskPositionY: makeNumberNode("WebkitMaskPositionY 设置遮罩图像在垂直方向上的起始位置（仅 WebKit 内核支持）。", "遮罩垂直位置"),
	WebkitMaskRepeat: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "no-repeat", "repeat", "repeat-x", "repeat-y", "round", "space"],
		"WebkitMaskRepeat 控制遮罩图像在元素中是否重复显示，类似于 background-repeat。",
		"遮罩重复模式"
	),
	WebkitMaskRepeatX: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "no-repeat", "repeat", "round", "space"],
		"WebkitMaskRepeatX 设置遮罩图像在水平方向上的重复方式。",
		"遮罩水平重复"
	),
	WebkitMaskRepeatY: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "no-repeat", "repeat", "round", "space"],
		"WebkitMaskRepeatY 设置遮罩图像在垂直方向上的重复方式。",
		"遮罩垂直重复"
	),
	WebkitMaskSize: makeNumberNode("WebkitMaskSize 设置遮罩图像的尺寸，类似于 background-size，可使用 px、% 等单位。", "遮罩图像大小"),
	WebkitOverflowScrolling: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "touch"],
		"WebkitOverflowScrolling 控制 iOS Safari 中滚动区域的行为，`touch` 启用弹性滚动（惯性滚动）。",
		"iOS 弹性滚动"
	),
	WebkitTapHighlightColor: makeColorNode("WebkitTapHighlightColor 设置移动端点击高亮时的颜色，常用于优化移动 Web 点击体验。", "点击高亮颜色"),
	WebkitTextFillColor: makeColorNode(
		"WebkitTextFillColor 设置文本的填充颜色，是 WebKit 专有属性，常用于替代 `color` 以实现文字镂空或过渡效果。",
		"WebKit 文本填充色"
	),
	WebkitTextStrokeColor: makeColorNode("WebkitTextStrokeColor 设置文本描边的颜色，可与 `WebkitTextStrokeWidth` 搭配实现描边字体。", "WebKit 文本描边色"),
	WebkitTextStrokeWidth: makeNumberNode("WebkitTextStrokeWidth 设置文本描边的宽度，通常与 `fillColor` 搭配实现富文本效果。", "WebKit 文本描边宽度"),
	WebkitTouchCallout: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "default"],
		"WebkitTouchCallout 控制 iOS Safari 中长按是否弹出操作菜单（如复制/搜索），设置为 `none` 可禁用。",
		"iOS 长按菜单控制"
	),
	WebkitUserModify: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "read-only", "read-write", "read-write-plaintext-only"],
		"WebkitUserModify 控制用户是否能修改元素内容，是早期可编辑内容方案（类似 contentEditable）。",
		"用户编辑权限"
	),
	MozOutlineRadius: makeNumberNode("MozOutlineRadius 是 Firefox 特有属性，用于设置 outline 边框的圆角半径（非标准）。", "Firefox 外轮廓圆角"),
	msContentZoomLimit: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"msContentZoomLimit 是 IE/Edge 私有属性，用于限制内容缩放的范围（非标准，已废弃）。",
		"IE 缩放限制"
	),
	msContentZoomSnap: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "mandatory", "proximity"],
		"msContentZoomSnap 是 IE/Edge 私有属性，用于定义缩放时的吸附行为（类似 scroll-snap），已废弃。",
		"IE 缩放吸附策略"
	),
	msScrollLimit: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"msScrollLimit 是 IE/Edge 私有属性，用于设置滚动限制区域，已废弃。",
		"IE 滚动限制"
	),
	msScrollSnapX: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"msScrollSnapX 设置 X 轴上的滚动吸附行为，是早期 scroll-snap 规范的实现方式之一。",
		"IE 横向吸附"
	),
	msScrollSnapY: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"msScrollSnapY 设置 Y 轴上的滚动吸附行为，用于 IE 中的吸附滚动特性。",
		"IE 纵向吸附"
	),
	WebkitBorderBefore: makeNumberNode("WebkitBorderBefore 设置逻辑“前”方向的边框宽度，是 WebKit 对逻辑布局支持的一部分。", "WebKit 前边框"),
	WebkitMask: makeNumberNode("WebkitMask 是遮罩属性的简写形式，可控制遮罩图像、位置、重复、尺寸等（WebKit 私有）。", "遮罩简写"),
	WebkitTextStroke: makeNumberNode("WebkitTextStroke 是文字描边的复合简写，包含颜色和宽度等，常与透明文字搭配使用。", "文本描边简写"),
	azimuth: makeStringNode(
		[
			"center",
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"left",
			"right",
			"behind",
			"center-left",
			"center-right",
			"far-left",
			"far-right",
			"left-side",
			"leftwards",
			"right-side",
			"rightwards",
		],
		"azimuth 是用于语音输出中声音方位的 CSS 属性，属于 CSS2 Speech Module（非标准）。",
		"语音方位"
	),
	boxAlign: makeStringNode(
		["center", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "stretch", "end", "start", "baseline"],
		"boxAlign 是早期 flexbox 语法（display: box）的对齐方式，已被 align-items 替代。",
		"旧版 Flex 对齐"
	),
	boxDirection: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "normal", "reverse"],
		"boxDirection 控制旧版 Flex 项目排列方向（normal/reverse），已废弃。",
		"旧版 Flex 排序方向"
	),
	boxFlex: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"boxFlex 是旧版 flex-grow 属性，对单项设置伸缩权重，已废弃。",
		"旧版 Flex grow"
	),
	boxFlexGroup: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"boxFlexGroup 是旧 flex 语法中分组伸缩行为的控制字段，已废弃。",
		"旧版 Flex 分组"
	),
	boxLines: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "multiple", "single"],
		"boxLines 用于控制是否允许多行换行，类似 flex-wrap，属于旧语法。",
		"旧版 Flex 换行"
	),
	boxOrdinalGroup: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"boxOrdinalGroup 是旧 flex 中用于排序的字段，等价于 order，已废弃。",
		"旧版 Flex 排序"
	),
	boxOrient: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "horizontal", "vertical", "block-axis", "inline-axis"],
		"boxOrient 定义旧 flexbox 的主轴方向（水平、垂直），现代写法请使用 flex-direction。",
		"旧版 Flex 主轴"
	),
	boxPack: makeStringNode(
		["center", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "end", "start", "justify"],
		"boxPack 用于旧 flex 容器主轴的对齐（类似 justify-content），已废弃。",
		"旧版 Flex 主轴对齐"
	),
	clip: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto"],
		"clip 是用于裁剪元素的老旧 CSS 属性（如 clip: rect(...)），已被 clip-path 替代。",
		"裁剪区域（老旧）"
	),
	gridColumnGap: makeNumberNode("gridColumnGap 是 grid 布局的列间距，现代语法推荐使用 column-gap。", "网格列间距"),
	gridGap: makeNumberNode("gridGap 是 row-gap 与 column-gap 的简写形式，现代写法为 gap。", "网格间距"),
	gridRowGap: makeNumberNode("gridRowGap 是 grid 布局的行间距，现代语法推荐使用 row-gap。", "网格行间距"),
	imeMode: makeStringNode(
		["disabled", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "normal", "active", "inactive"],
		"imeMode 控制输入法激活状态，已废弃，现代浏览器不再支持。",
		"输入法控制（已废弃）"
	),
	scrollSnapCoordinate: makeNumberNode("scrollSnapCoordinate 是早期滚动对齐的实验字段，已被 scroll-snap-align 等替代。", "滚动对齐坐标（旧）"),
	scrollSnapDestination: makeNumberNode("scrollSnapDestination 为旧版对齐目标坐标，现代已不推荐使用。", "滚动对齐目标（旧）"),
	scrollSnapPointsX: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"scrollSnapPointsX 是早期定义水平滚动捕捉点的方式，已废弃。",
		"水平滚动点（旧）"
	),
	scrollSnapPointsY: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"scrollSnapPointsY 是早期定义垂直滚动捕捉点的方式，已废弃。",
		"垂直滚动点（旧）"
	),
	scrollSnapTypeX: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "mandatory", "proximity"],
		"scrollSnapTypeX 控制水平方向滚动捕捉方式，已被 scroll-snap-type 简写替代。",
		"滚动捕捉（水平，旧）"
	),
	scrollSnapTypeY: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "mandatory", "proximity"],
		"scrollSnapTypeY 控制垂直方向滚动捕捉方式，已被 scroll-snap-type 简写替代。",
		"滚动捕捉（垂直，旧）"
	),
	alignmentBaseline: makeStringNode(
		[
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"auto",
			"baseline",
			"middle",
			"after-edge",
			"alphabetic",
			"before-edge",
			"central",
			"hanging",
			"ideographic",
			"mathematical",
			"text-after-edge",
			"text-before-edge",
		],
		"alignmentBaseline 是 SVG 图形元素垂直对齐方式的属性，不适用于 HTML 元素。",
		"SVG 对齐基线"
	),
	baselineShift: makeNumberNode("baseline-shift 用于调整文本基线的垂直偏移，主要用于 SVG 和富文本排版中。", "基线偏移"),
	clipRule: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "evenodd", "nonzero"],
		"clip-rule 定义路径裁剪的规则，用于 SVG 图形裁剪路径的填充规则。",
		"裁剪路径规则"
	),
	colorInterpolation: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "linearRGB", "sRGB"],
		"color-interpolation 定义在图形元素中颜色的插值空间，影响渐变和滤镜效果。",
		"颜色插值空间"
	),
	colorRendering: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "optimizeSpeed", "optimizeQuality"],
		"color-rendering 提示浏览器如何优化颜色的渲染，是 SVG 图形优化相关属性。",
		"颜色渲染优化"
	),
	dominantBaseline: makeStringNode(
		[
			"inherit",
			"-moz-initial",
			"initial",
			"revert",
			"revert-layer",
			"unset",
			"auto",
			"middle",
			"alphabetic",
			"central",
			"hanging",
			"ideographic",
			"mathematical",
			"text-after-edge",
			"text-before-edge",
			"no-change",
			"reset-size",
			"use-script",
		],
		"dominant-baseline 定义 SVG 中文本基线对齐的基准线。",
		"主基线对齐"
	),
	fill: makeColorNode("fill 定义 SVG 图形元素的填充颜色，是 SVG 基础属性之一。", "填充颜色"),
	fillOpacity: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"fill-opacity 定义 SVG 元素填充颜色的透明度，取值范围通常为 0 到 1。",
		"填充透明度"
	),
	fillRule: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "evenodd", "nonzero"],
		"fill-rule 定义 SVG 填充路径的规则，用于决定哪些区域被填充，常用值为 'evenodd' 和 'nonzero'。",
		"填充规则"
	),
	floodColor: makeColorNode("flood-color 定义 SVG 滤镜中的泛滥颜色，用于滤镜效果如阴影、光照等。", "泛滥颜色"),
	floodOpacity: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"flood-opacity 定义泛滥颜色的不透明度，影响滤镜效果透明度。",
		"泛滥透明度"
	),
	glyphOrientationVertical: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto"],
		"glyph-orientation-vertical 控制 SVG 文字竖排时的方向和旋转角度。",
		"字形竖排方向"
	),
	lightingColor: makeColorNode("lighting-color 定义光照滤镜效果的光源颜色，影响阴影和高光渲染。", "光照颜色"),
	marker: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"marker 定义 SVG 路径端点的标记类型，如箭头、圆点等。",
		"标记样式"
	),
	markerEnd: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"marker-end 指定路径终点的标记，通常用于箭头等装饰。",
		"终点标记"
	),
	markerMid: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"marker-mid 指定 SVG 路径中间点的标记样式，用于路径装饰。",
		"路径中点标记"
	),
	markerStart: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"marker-start 指定 SVG 路径起点的标记样式，通常用于箭头等装饰。",
		"路径起点标记"
	),
	shapeRendering: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "auto", "geometricPrecision", "optimizeSpeed", "crispEdges"],
		"shape-rendering 控制 SVG 图形的渲染质量与性能，影响抗锯齿和边缘清晰度。",
		"图形渲染优化"
	),
	stopColor: makeColorNode("stop-color 定义 SVG 渐变中断点的颜色，是渐变配置的关键属性。", "渐变断点颜色"),
	stopOpacity: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"stop-opacity 定义 SVG 渐变中断点的透明度。",
		"渐变断点透明度"
	),
	stroke: makeColorNode("stroke 设置 SVG 图形元素的描边颜色，是基本的边框样式属性。", "描边颜色"),
	strokeDasharray: makeStringNode([], "stroke-dasharray 定义描边的虚线样式，通过设置虚线和空白的间隔长度数组。", "描边虚线样式"),
	strokeDashoffset: makeNumberNode("stroke-dashoffset 设置虚线描边的起始偏移，用于动画效果中控制虚线移动。", "虚线偏移量"),
	strokeLinecap: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "round", "butt", "square"],
		"stroke-linecap 定义路径描边端点的形状，如圆头、平头、方头。",
		"描边线帽样式"
	),
	strokeLinejoin: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "round", "bevel", "miter"],
		"stroke-linejoin 定义路径拐角处的连接方式，如圆角、斜角、尖角。",
		"描边连接样式"
	),
	strokeMiterlimit: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"stroke-miterlimit 限制尖角连接的最大斜接长度，防止尖角过长。",
		"斜接限制"
	),
	strokeOpacity: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset"],
		"stroke-opacity 设置描边的不透明度，范围从 0 到 1。",
		"描边透明度"
	),
	strokeWidth: makeNumberNode("stroke-width 设置描边的宽度，通常用长度单位表示。", "描边宽度"),
	textAnchor: makeStringNode(
		["inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "end", "start", "middle"],
		"text-anchor 定义 SVG 文字元素的文本锚点，用于控制文本对齐方式。",
		"文本锚点"
	),
	vectorEffect: makeStringNode(
		["none", "inherit", "-moz-initial", "initial", "revert", "revert-layer", "unset", "non-scaling-stroke"],
		"vector-effect 控制矢量图形属性的行为，如是否缩放描边宽度。",
		"矢量图形效果"
	),
};
