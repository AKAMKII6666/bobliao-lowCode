// material-ui
import { createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

// assets
// import defaultColor from '@/assets/scss/_themes-vars.module.scss';
import defaultColor from "assets/scss/_theme1.module.scss";
/* 为本系统系统客制的色盘 */
import RCGColor from "assets/scss/_RCG_theme.module.scss";

// types
export interface ColorProps {
	readonly [key: string]: string;
}

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

const Palette = (navType: PaletteMode) => {
	let colors: ColorProps = defaultColor;

	return createTheme({
		palette: {
			mode: navType,
			common: {
				black: colors.darkPaper,
			},
			primary: {
				light: RCGColor.primaryLight,
				/* 主颜色 包括按钮颜色 */
				main: RCGColor.primaryMain,
				/* 按钮鼠标hover */
				dark: RCGColor.primaryDark,
				200: RCGColor.primary200,
				/* 按钮按下 */
				300: RCGColor.primary300,
				/* 按钮禁用底色 */
				400: RCGColor.primary400,
				/* 按钮禁用文字 */
				500: RCGColor.primary500,
				/* 线框 按钮边框 */
				600: RCGColor.primary600,
				/* 线框 按钮文字 */
				700: RCGColor.primary700,
				900: RCGColor.primary900,
				100: RCGColor.primary100,
				50: RCGColor.primary50,
				800: navType === "dark" ? colors.darkPrimary800 : colors.primary800,
			},
			secondary: {
				light: navType === "dark" ? colors.darkSecondaryLight : colors.secondaryLight,
				main: navType === "dark" ? colors.darkSecondaryMain : colors.secondaryMain,
				dark: navType === "dark" ? colors.darkSecondaryDark : colors.secondaryDark,
				200: navType === "dark" ? colors.darkSecondary200 : colors.secondary200,
				800: navType === "dark" ? colors.darkSecondary800 : colors.secondary800,
				100: RCGColor.secondary100,
				300: RCGColor.secondary300,
				400: RCGColor.secondary400,
			},
			error: {
				light: colors.errorLight,
				main: colors.errorMain,
				dark: colors.errorDark,
			},
			orange: {
				light: colors.orangeLight,
				main: colors.orangeMain,
				dark: colors.orangeDark,
			},
			warning: {
				light: colors.warningLight,
				main: colors.warningMain,
				dark: colors.warningDark,
			},
			success: {
				light: colors.successLight,
				200: colors.success200,
				main: colors.successMain,
				dark: colors.successDark,
			},
			grey: {
				50: colors.grey50,
				100: colors.grey100,
				500: navType === "dark" ? colors.darkTextSecondary : colors.grey500,
				600: navType === "dark" ? colors.darkTextTitle : colors.grey900,
				700: navType === "dark" ? colors.darkTextPrimary : colors.grey700,
				900: navType === "dark" ? colors.darkTextPrimary : colors.grey900,
			},
			dark: {
				light: colors.darkTextPrimary,
				main: colors.darkLevel1,
				dark: colors.darkLevel2,
				800: colors.darkBackground,
				900: colors.darkPaper,
			},
			text: {
				primary: navType === "dark" ? colors.darkTextPrimary : colors.grey700,
				secondary: navType === "dark" ? colors.darkTextSecondary : colors.grey500,
				dark: navType === "dark" ? colors.darkTextPrimary : colors.grey900,
				hint: colors.grey100,
			},
			divider: navType === "dark" ? colors.darkTextPrimary : colors.grey200,
			background: {
				paper: RCGColor.paper,
				default: navType === "dark" ? colors.darkPaper : colors.paper,
			},
		},
	} as any);
};

export default Palette;
