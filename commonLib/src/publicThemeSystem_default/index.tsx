import { useMemo, ReactNode, useEffect } from "react";
import { ConfigProvider } from "antd";

// material-ui
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { createTheme, ThemeOptions, ThemeProvider, Theme, TypographyVariantsOptions } from "@mui/material/styles";

// project import
import useConfig from "./useConfig";
import Palette from "./palette";
import Typography from "./typography";

import componentStyleOverrides from "./compStyleOverride";
import customShadows from "./shadows";
import { ConfigProvider as BerryConfigProvider } from "./ConfigContext";

// types
import { CustomShadowProps } from "types/default-theme";
import { createAntdTheme } from "./antdThemeOverride";

interface Props {
	children: ReactNode;
}

export default function ThemeCustomization({ children }: Props) {
	const { borderRadius, fontFamily, navType, outlinedFilled, presetColor, rtlLayout } = useConfig();

	const theme: Theme = useMemo<Theme>(() => Palette(navType, presetColor), [navType, presetColor]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const themeTypography: TypographyVariantsOptions = useMemo<TypographyVariantsOptions>(
		() => Typography(theme, borderRadius, fontFamily),
		[theme, borderRadius, fontFamily]
	);
	const themeCustomShadows: CustomShadowProps = useMemo<CustomShadowProps>(() => customShadows(navType, theme), [navType, theme]);

	const themeOptions: ThemeOptions = useMemo(
		() => ({
			direction: rtlLayout ? "rtl" : "ltr",
			palette: theme.palette,
			mixins: {
				toolbar: {
					minHeight: "48px",
					padding: "16px",
					"@media (min-width: 600px)": {
						minHeight: "48px",
					},
				},
			},
			typography: themeTypography,
			customShadows: themeCustomShadows,
		}),
		[rtlLayout, theme, themeCustomShadows, themeTypography]
	);

	const themes: Theme = createTheme(themeOptions);
	themes.components = useMemo(() => componentStyleOverrides(themes, borderRadius, outlinedFilled), [themes, borderRadius, outlinedFilled]);
	// 创建Ant Design主题配置
	const antdTheme = useMemo(() => createAntdTheme(themes), [themes]);

	// 完善的CSS变量支持
	useEffect(() => {
		const root = document.documentElement;

		// ==============================|| 基础背景色 ||============================== //
		root.style.setProperty("--color-paper", theme.palette.background.paper);
		root.style.setProperty("--color-background", theme.palette.background.default);

		// ==============================|| 主色调系统 ||============================== //
		root.style.setProperty("--color-primary", theme.palette.primary.main);
		root.style.setProperty("--color-primary-light", theme.palette.primary.light);
		root.style.setProperty("--color-primary-dark", theme.palette.primary.dark);
		root.style.setProperty("--color-primary-200", theme.palette.primary[200]);
		root.style.setProperty("--color-primary-800", theme.palette.primary[800]);

		// ==============================|| 次色调系统 ||============================== //
		root.style.setProperty("--color-secondary", theme.palette.secondary.main);
		root.style.setProperty("--color-secondary-light", theme.palette.secondary.light);
		root.style.setProperty("--color-secondary-dark", theme.palette.secondary.dark);
		root.style.setProperty("--color-secondary-200", theme.palette.secondary[200]);
		root.style.setProperty("--color-secondary-800", theme.palette.secondary[800]);

		// ==============================|| 文字颜色系统 ||============================== //
		root.style.setProperty("--color-text-primary", theme.palette.text.primary);
		root.style.setProperty("--color-text-secondary", theme.palette.text.secondary);
		// @ts-ignore
		root.style.setProperty("--color-text-dark", theme.palette.text.dark);
		// @ts-ignore
		root.style.setProperty("--color-text-hint", theme.palette.text.hint);

		// ==============================|| 边框和分割线 ||============================== //
		root.style.setProperty("--color-divider", theme.palette.divider);

		// ==============================|| 状态色系统 ||============================== //
		// 成功色
		root.style.setProperty("--color-success", theme.palette.success.main);
		root.style.setProperty("--color-success-light", theme.palette.success.light);
		root.style.setProperty("--color-success-dark", theme.palette.success.dark);
		root.style.setProperty("--color-success-200", theme.palette.success[200]);

		// 错误色
		root.style.setProperty("--color-error", theme.palette.error.main);
		root.style.setProperty("--color-error-light", theme.palette.error.light);
		root.style.setProperty("--color-error-dark", theme.palette.error.dark);

		// 警告色
		root.style.setProperty("--color-warning", theme.palette.warning.main);
		root.style.setProperty("--color-warning-light", theme.palette.warning.light);
		root.style.setProperty("--color-warning-dark", theme.palette.warning.dark);

		// 橙色系统
		// @ts-ignores
		root.style.setProperty("--color-orange", theme.palette.orange.main);
		// @ts-ignore
		root.style.setProperty("--color-orange-light", theme.palette.orange.light);
		// @ts-ignore
		root.style.setProperty("--color-orange-dark", theme.palette.orange.dark);

		// ==============================|| 灰度系统 ||============================== //
		root.style.setProperty("--color-grey-50", theme.palette.grey[50]);
		root.style.setProperty("--color-grey-100", theme.palette.grey[100]);
		root.style.setProperty("--color-grey-500", theme.palette.grey[500]);
		root.style.setProperty("--color-grey-600", theme.palette.grey[600]);
		root.style.setProperty("--color-grey-700", theme.palette.grey[700]);
		root.style.setProperty("--color-grey-900", theme.palette.grey[900]);

		// ==============================|| 暗色主题专用 ||============================== //
		if (navType === "dark") {
			// @ts-ignore
			root.style.setProperty("--color-dark-level1", theme.palette.dark.light);
			// @ts-ignore
			root.style.setProperty("--color-dark-level2", theme.palette.dark.main);
			// @ts-ignore
			root.style.setProperty("--color-dark-background", theme.palette.dark[800]);
			// @ts-ignore
			root.style.setProperty("--color-dark-paper", theme.palette.dark[900]);
		}

		// ==============================|| 主题模式标识 ||============================== //
		root.style.setProperty("--theme-mode", navType);
		root.setAttribute("data-theme", navType);
	}, [theme, navType]);

	return (
		<StyledEngineProvider injectFirst>
			{/* mui主题提供者 */}
			<ThemeProvider theme={themes}>
				{/* antd主题提供者 */}
				<ConfigProvider theme={antdTheme}>
					<CssBaseline />
					{children}
				</ConfigProvider>
			</ThemeProvider>
		</StyledEngineProvider>
	);
}
