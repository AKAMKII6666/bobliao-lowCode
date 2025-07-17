import React, { Ref } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Card, CardContent, CardHeader, Divider, Typography, CardProps, CardHeaderProps, CardContentProps } from "@mui/material";

// project imports
import { KeyedObject } from "types";

// constant
const headerSX = {
	"& .MuiCardHeader-action": { mr: 0 },
};

// ==============================|| CUSTOM MAIN CARD ||============================== //

export interface MainCardProps extends KeyedObject {
	/** 是否显示边框（默认 false） */
	border?: boolean;
	/** 是否启用悬浮阴影（默认 undefined） */
	boxShadow?: boolean;
	/** 子组件内容，通常为 JSX 结构 */
	children: React.ReactNode | string;
	/** 卡片整体样式对象 */
	style?: React.CSSProperties;
	/** 是否启用 CardContent 包裹内容（默认 true） */
	content?: boolean;
	/** 外层 Card 的 className */
	className?: string;
	/** 内容区域（CardContent）的 className */
	contentClass?: string;
	/** 内容区域（CardContent）的 sx 样式对象 */
	contentSX?: CardContentProps["sx"];
	/** 是否使用深色标题（加粗显示 h3），默认 false */
	darkTitle?: boolean;
	/** 最外层 Card 的 sx 样式对象 */
	sx?: CardProps["sx"];
	/** 卡片右上角操作区域，一般用于按钮、图标等 */
	secondary?: CardHeaderProps["action"];
	/** 自定义阴影样式，用于替代默认值 */
	shadow?: string | number;
	/** MUI Card 的 elevation（阴影层级），如设置此项可不使用 boxShadow */
	elevation?: number;
	/** 卡片标题，可以是字符串或 JSX 结构 */
	title?: React.ReactNode | string;
}

//往外面暴露统一名称的属性对象，用于生成低代码平台属性JSON schema
export type Tinputprops = MainCardProps;

const MainCard = React.forwardRef(
	(
		{
			border = false, // 是否显示边框
			boxShadow = true, // 是否启用 hover 时阴影
			children, // 子元素内容
			content = true, // 是否使用 CardContent 包裹 children
			contentClass = "", // CardContent 的 className
			contentSX = {}, // CardContent 的 sx 样式对象
			darkTitle, // 是否加粗标题
			secondary, // 标题右侧操作按钮（如 IconButton）
			shadow, // 自定义阴影样式
			sx = {}, // Card 的 sx 样式
			title, // 卡片标题
			...others // 其他透传给 Card 的属性
		}: MainCardProps,
		ref: Ref<HTMLDivElement>
	) => {
		const theme = useTheme();
		if (!shadow) {
			shadow = theme.shadows[16];
		}
		return (
			<Card
				ref={ref}
				{...others}
				sx={{
					overflow: "unset",
					border: border ? "1px solid" : "none",
					borderColor: theme.palette.mode === "dark" ? theme.palette.background.default : theme.palette.grey[300] + 98,
					":hover": {
						boxShadow: boxShadow
							? shadow || (theme.palette.mode === "dark" ? "0 2px 14px 0 rgb(33 150 243 / 10%)" : "0 2px 14px 0 rgb(32 40 45 / 8%)")
							: "inherit",
					},
					...sx,
				}}
			>
				{/* card header and action */}
				{!darkTitle && title && <CardHeader sx={headerSX} title={title} action={secondary} />}
				{darkTitle && title && <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />}

				{/* content & header divider */}
				{title && <Divider />}

				{/* card content */}
				{content && (
					<CardContent sx={contentSX} style={{ overflow: "unset" }} className={contentClass}>
						{children}
					</CardContent>
				)}
				{!content && children}
			</Card>
		);
	}
);

export default MainCard;
