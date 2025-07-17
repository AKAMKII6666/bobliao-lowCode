import { PaletteMode } from "@mui/material";

export type ConfigProps = {
	fontFamily: string;
	borderRadius: number;
	outlinedFilled: boolean;
	navType: PaletteMode;
	presetColor: string;
	locale: string;
	rtlLayout: boolean;
	container: boolean;
	layout: string;
	drawerType: string;
};

export type CustomizationProps = {
	fontFamily: string;
	borderRadius: number;
	outlinedFilled: boolean;
	navType: PaletteMode;
	presetColor: string;
	locale: string;
	rtlLayout: boolean;
	container: boolean;
	layout: string;
	drawerType: string;
	onChangeMenuType: (navType: PaletteMode) => void;
	onChangePresetColor: (presetColor: string) => void;
	onChangeLocale: (locale: string) => void;
	onChangeRTL: (rtlLayout: boolean) => void;
	onChangeContainer?: any;
	onChangeFontFamily: (fontFamily: string) => void;
	onChangeBorderRadius: (event: Event, newValue: number | number[]) => void;
	onChangeOutlinedField: (outlinedFilled: boolean) => void;
	onChangeLayout?: any;
	onChangeDrawer?: any;
	onReset?: any;
};
