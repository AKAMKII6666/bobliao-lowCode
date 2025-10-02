import { ThemeConfig } from "antd";

// 将Berry主题映射到Ant Design主题
export const createAntdTheme = (berryTheme: any): ThemeConfig => {
	const mode = berryTheme.palette.mode;

	return {
		token: {
			// 主色调
			colorPrimary: berryTheme.palette.primary.main,
			colorSuccess: berryTheme.palette.success.main,
			colorWarning: berryTheme.palette.warning.main,
			colorError: berryTheme.palette.error.main,

			// 背景色 - 修复暗色模式
			colorBgContainer: mode === "dark" ? berryTheme.palette.darkLevel2 : berryTheme.palette.background.paper,
			colorBgElevated: mode === "dark" ? berryTheme.palette.darkLevel1 : berryTheme.palette.background.paper,
			colorBgLayout: mode === "dark" ? berryTheme.palette.darkPaper : berryTheme.palette.background.default,

			// 文字色 - 修复暗色模式
			colorText: mode === "dark" ? berryTheme.palette.darkTextPrimary : berryTheme.palette.text.primary,
			colorTextSecondary: mode === "dark" ? berryTheme.palette.darkTextSecondary : berryTheme.palette.text.secondary,
			colorTextTertiary: mode === "dark" ? berryTheme.palette.darkTextSecondary : berryTheme.palette.text.hint,

			// 边框色 - 修复暗色模式
			colorBorder: mode === "dark" ? berryTheme.palette.darkTextPrimary : berryTheme.palette.divider,
			colorBorderSecondary: mode === "dark" ? berryTheme.palette.darkTextSecondary : berryTheme.palette.grey[200],

			// 圆角
			borderRadius: berryTheme.shape.borderRadius,

			// 字体
			fontFamily: berryTheme.typography.fontFamily,
			fontSize: 14,
		},
		components: {
			// DatePicker 组件配置 - 修复背景色
			DatePicker: {
				colorPrimary: berryTheme.palette.primary.main,
				colorBgContainer: mode === "dark" ? berryTheme.palette.darkLevel2 : berryTheme.palette.grey[50],
				colorBgElevated: mode === "dark" ? berryTheme.palette.darkLevel1 : berryTheme.palette.grey[50],
				colorBorder: mode === "dark" ? berryTheme.palette.darkTextPrimary : berryTheme.palette.divider,
				colorText: mode === "dark" ? berryTheme.palette.darkTextPrimary : berryTheme.palette.text.primary,
				colorTextPlaceholder: mode === "dark" ? berryTheme.palette.darkTextSecondary : berryTheme.palette.text.secondary,
				borderRadius: berryTheme.shape.borderRadius,
				controlHeight: 40,
				paddingInline: 12,
				paddingBlock: 8,
			},

			// Input 组件配置 - 修复背景色
			Input: {
				colorPrimary: berryTheme.palette.primary.main,
				colorBgContainer: mode === "dark" ? berryTheme.palette.darkLevel2 : berryTheme.palette.grey[50],
				colorBorder: mode === "dark" ? berryTheme.palette.darkTextPrimary : berryTheme.palette.divider,
				colorText: mode === "dark" ? berryTheme.palette.darkTextPrimary : berryTheme.palette.text.primary,
				colorTextPlaceholder: mode === "dark" ? berryTheme.palette.darkTextSecondary : berryTheme.palette.text.secondary,
				borderRadius: berryTheme.shape.borderRadius,
			},

			// Button 组件配置
			Button: {
				colorPrimary: berryTheme.palette.primary.main,
				colorPrimaryHover: berryTheme.palette.primary.light,
				colorPrimaryActive: berryTheme.palette.primary.dark,
				borderRadius: berryTheme.shape.borderRadius,
			},

			// Select 组件配置 - 修复背景色
			Select: {
				colorPrimary: berryTheme.palette.primary.main,
				colorBgContainer: mode === "dark" ? berryTheme.palette.darkLevel2 : berryTheme.palette.grey[50],
				colorBorder: mode === "dark" ? berryTheme.palette.darkTextPrimary : berryTheme.palette.divider,
				colorText: mode === "dark" ? berryTheme.palette.darkTextPrimary : berryTheme.palette.text.primary,
				borderRadius: berryTheme.shape.borderRadius,
			},

			// Table 组件配置 - 修复暗色模式
			Table: {
				// 基础颜色 - 修复暗色模式
				colorBgContainer: mode === "dark" ? berryTheme.palette.darkLevel2 : berryTheme.palette.background.paper,
				colorBgElevated: mode === "dark" ? berryTheme.palette.darkLevel1 : berryTheme.palette.background.paper,
				colorText: mode === "dark" ? berryTheme.palette.darkTextPrimary : berryTheme.palette.text.primary,
				colorTextSecondary: mode === "dark" ? berryTheme.palette.darkTextSecondary : berryTheme.palette.text.secondary,
				colorTextTertiary: mode === "dark" ? berryTheme.palette.darkTextSecondary : berryTheme.palette.text.hint,

				// 边框颜色 - 修复暗色模式
				colorBorder: mode === "dark" ? berryTheme.palette.darkTextPrimary : berryTheme.palette.divider,
				colorBorderSecondary: mode === "dark" ? berryTheme.palette.darkTextSecondary : berryTheme.palette.grey[200],

				// 表头样式 - 修复暗色模式
				headerBg: mode === "dark" ? berryTheme.palette.darkLevel1 : berryTheme.palette.grey[50],
				headerColor: mode === "dark" ? berryTheme.palette.darkTextPrimary : berryTheme.palette.text.primary,
				headerSortActiveBg: berryTheme.palette.primary.light,
				headerSortHoverBg: berryTheme.palette.primary.light,

				// 行样式 - 修复暗色模式
				rowHoverBg: mode === "dark" ? berryTheme.palette.darkLevel1 : berryTheme.palette.primary.light,
				rowSelectedBg: mode === "dark" ? berryTheme.palette.darkLevel1 : berryTheme.palette.primary.light,
				rowSelectedHoverBg: mode === "dark" ? berryTheme.palette.darkLevel1 : berryTheme.palette.primary.main,

				// 分页样式 - 修复暗色模式
				// @ts-ignore
				paginationItemBg: mode === "dark" ? berryTheme.palette.darkLevel2 : berryTheme.palette.background.paper,
				paginationItemInputBg: mode === "dark" ? berryTheme.palette.darkLevel2 : berryTheme.palette.background.paper,

				// 排序图标 - 修复暗色模式
				sortIconColor: mode === "dark" ? berryTheme.palette.darkTextSecondary : berryTheme.palette.text.secondary,
				sortIconColorActive: berryTheme.palette.primary.main,

				// 展开图标 - 修复暗色模式
				expandIconColor: mode === "dark" ? berryTheme.palette.darkTextSecondary : berryTheme.palette.text.secondary,
				expandIconColorHover: berryTheme.palette.primary.main,

				// 选择框 - 修复暗色模式
				selectionItemBg: mode === "dark" ? berryTheme.palette.darkLevel2 : berryTheme.palette.background.paper,
				selectionItemColor: mode === "dark" ? berryTheme.palette.darkTextPrimary : berryTheme.palette.text.primary,

				// 固定列 - 修复暗色模式
				fixedHeaderSortActiveBg: berryTheme.palette.primary.light,
				fixedHeaderSortHoverBg: berryTheme.palette.primary.light,

				// 空状态 - 修复暗色模式
				emptyTextColor: mode === "dark" ? berryTheme.palette.darkTextSecondary : berryTheme.palette.text.secondary,

				// 加载状态
				loadingColor: berryTheme.palette.primary.main,

				// 筛选器 - 修复暗色模式
				filterDropdownBg: mode === "dark" ? berryTheme.palette.darkLevel2 : berryTheme.palette.background.paper,
				filterDropdownBorderColor: mode === "dark" ? berryTheme.palette.darkTextPrimary : berryTheme.palette.divider,

				// 工具栏 - 修复暗色模式
				toolbarBg: mode === "dark" ? berryTheme.palette.darkLevel2 : berryTheme.palette.background.paper,
				toolbarColor: mode === "dark" ? berryTheme.palette.darkTextPrimary : berryTheme.palette.text.primary,

				// 滚动条 - 修复暗色模式
				scrollbarBg: mode === "dark" ? berryTheme.palette.darkTextSecondary : berryTheme.palette.grey[200],
				scrollbarHoverBg: mode === "dark" ? berryTheme.palette.darkTextPrimary : berryTheme.palette.grey[300],

				// 圆角
				borderRadius: berryTheme.shape.borderRadius,

				// 字体
				fontFamily: berryTheme.typography.fontFamily,
				fontSize: 14,
				fontSizeSM: 12,
				fontSizeLG: 16,

				// 间距
				padding: 16,
				paddingSM: 12,
				paddingLG: 20,
				paddingXS: 8,

				// 行高
				lineHeight: 1.5,
				lineHeightSM: 1.4,
				lineHeightLG: 1.6,

				// 阴影 - 修复暗色模式
				boxShadow: mode === "dark" ? "0 2px 8px rgba(0, 0, 0, 0.3)" : berryTheme.shadows[1],
				boxShadowSecondary: mode === "dark" ? "0 4px 12px rgba(0, 0, 0, 0.4)" : berryTheme.shadows[2],

				// 动画
				motionDurationSlow: "0.3s",
				motionDurationMid: "0.2s",
				motionDurationFast: "0.1s",
			},
		},
	};
};
