// types
import { ConfigProps } from "types/config";

export const HORIZONTAL_MAX_ITEM = 7;

const config: ConfigProps = {
	layout: "vertical",
	drawerType: "default",
	fontFamily: `'Roboto', sans-serif`,
	borderRadius: 8,
	outlinedFilled: true,
	navType: "light", // light, dark
	presetColor: "theme7", // default, theme1, theme2, theme3, theme4, theme5, theme6
	locale: "en", // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
	rtlLayout: false,
	container: false,
};

export default config;
