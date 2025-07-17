// material-ui
import { Card, CardContent, Grid, Typography } from "@mui/material";

/**
 * 社交信息卡片组件参数
 */
interface SocialCardProps {
	/** 卡片底部标题文本（一般显示小标题） */
	title?: string;

	/** 卡片主标题或说明内容（一般为描述或关键指标） */
	primary?: string | number | undefined;

	/** 卡片主数据显示（一般为数值） */
	secondary?: any;

	/** 附加内容，可选字段（备用） */
	content?: string;

	/** 图片地址（备用字段，当前未使用） */
	image?: string;

	/** 时间戳或时间信息（备用字段，当前未使用） */
	dateTime?: string;

	/** 主图标地址，显示在卡片右侧 */
	iconPrimary?: string;

	/** 背景色（必填） */
	color: string;

	/** 备用尺寸字段（当前未使用） */
	size?: string;
}

//往外面暴露统一名称的属性对象，用于生成低代码平台属性JSON schema
export type Tinputprops = SocialCardProps;

/**
 * Hover SocialCard 社交信息展示卡片
 *
 * 用于展示简要数值和图标信息的卡片，支持悬浮放大图标效果。
 *
 * @param primary - 主标题文本（如“访问量”）
 * @param secondary - 主数值信息（如“26,354”）
 * @param iconPrimary - 图标图片地址（base64 或 URL）
 * @param color - 背景颜色
 */
const SocialCard = ({ primary, secondary, iconPrimary, color }: SocialCardProps) => {
	return (
		<Card
			sx={{
				background: color,
				position: "relative",
				color: "#fff",
				height: 150,
				"&:hover svg": {
					opacity: "1",
					transform: "scale(1.1)",
				},
			}}
		>
			<CardContent
				sx={{
					height: "100%",
					width: "100%",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					paddingBottom: "16px !important",
				}}
			>
				<Grid container spacing={0}>
					{/* 左侧数值展示 */}
					<Grid item xs={9}>
						<Grid item xs={12}>
							<Typography variant="h1" color="inherit">
								{secondary}
							</Typography>
						</Grid>
						<Grid item xs={12} sx={{ mt: 2 }}>
							<Typography variant="h4" color="inherit">
								{primary}
							</Typography>
						</Grid>
					</Grid>

					{/* 右侧图标展示 */}
					<Grid item xs={3}>
						<img src={iconPrimary} width="60px" height="60px" alt="Icon" style={{ margin: "auto", display: "block" }} />
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};
//为防止在编译和混淆后，无法识别组件名称，所以在这里显示定义名称
SocialCard.displayName = "SocialCard";
export default SocialCard;
