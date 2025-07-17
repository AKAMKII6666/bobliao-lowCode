import { useCallback, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Avatar, Box, Tooltip } from "@mui/material";
import { IconArrowsMaximize, IconArrowsMinimize } from "@tabler/icons-react";

//往外面暴露统一名称的属性对象，用于生成低代码平台属性JSON schema
export type Tinputprops = {};

const FullScreenButton = () => {
	const theme: any = useTheme();
	const [open, setOpen] = useState<boolean>(false);

	const doc = document as Document & {
		webkitFullscreenElement?: Element;
		mozFullScreenElement?: Element;
		msFullscreenElement?: Element;
	};

	// 切换全屏
	const handleToggle = useCallback(() => {
		const docElm = document.documentElement as any;

		if (!document.fullscreenElement && !doc.webkitFullscreenElement && !doc.mozFullScreenElement && !doc.msFullscreenElement) {
			// 进入全屏（兼容各种前缀）
			if (docElm.requestFullscreen) {
				docElm.requestFullscreen();
			} else if (docElm.webkitRequestFullscreen) {
				docElm.webkitRequestFullscreen();
			} else if (docElm.mozRequestFullScreen) {
				docElm.mozRequestFullScreen();
			} else if (docElm.msRequestFullscreen) {
				docElm.msRequestFullscreen();
			}
		} else {
			// 退出全屏
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if ((document as any).webkitExitFullscreen) {
				(document as any).webkitExitFullscreen();
			} else if ((document as any).mozCancelFullScreen) {
				(document as any).mozCancelFullScreen();
			} else if ((document as any).msExitFullscreen) {
				(document as any).msExitFullscreen();
			}
		}
	}, []);

	// 键盘监听（示例）
	const funcKd = useCallback((e: KeyboardEvent) => {
		console.log("你按下了键：", e.key);
		// 例如：监听 esc 以外的其它快捷键
	}, []);

	// 监听全屏状态变化
	const handleFullScreenChange = useCallback(() => {
		const isFull = !!(
			document.fullscreenElement ||
			(document as any).webkitFullscreenElement ||
			(document as any).mozFullScreenElement ||
			(document as any).msFullscreenElement
		);
		setOpen(isFull);

		if (isFull) {
			document.addEventListener("keydown", funcKd);
		} else {
			document.removeEventListener("keydown", funcKd);
		}
	}, [funcKd]);

	useEffect(() => {
		// 各种浏览器的 fullscreenchange 事件
		document.addEventListener("fullscreenchange", handleFullScreenChange);
		document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
		document.addEventListener("mozfullscreenchange", handleFullScreenChange);
		document.addEventListener("MSFullscreenChange", handleFullScreenChange);

		return () => {
			document.removeEventListener("fullscreenchange", handleFullScreenChange);
			document.removeEventListener("webkitfullscreenchange", handleFullScreenChange);
			document.removeEventListener("mozfullscreenchange", handleFullScreenChange);
			document.removeEventListener("MSFullscreenChange", handleFullScreenChange);
			document.removeEventListener("keydown", funcKd);
		};
	}, [handleFullScreenChange, funcKd]);

	return (
		<Box sx={{ ml: 2, mr: 2 }}>
			<Tooltip title={open ? "退出全屏" : "进入全屏"}>
				<Avatar
					variant="rounded"
					sx={{
						...theme.typography.commonAvatar,
						...theme.typography.mediumAvatar,
						border: "1px solid",
						borderColor: theme.palette.mode === "dark" ? theme.palette.dark.main : theme.palette.primary.light,
						background: theme.palette.mode === "dark" ? theme.palette.dark.main : theme.palette.primary.light,
						color: theme.palette.primary.dark,
						transition: "all .2s ease-in-out",
						"&:hover": {
							borderColor: theme.palette.primary.main,
							background: theme.palette.primary.main,
							color: theme.palette.primary.light,
						},
					}}
					aria-controls={open ? "menu-list-grow" : undefined}
					aria-haspopup="true"
					onClick={handleToggle}
					color="inherit"
				>
					{open ? <IconArrowsMinimize /> : <IconArrowsMaximize />}
				</Avatar>
			</Tooltip>
		</Box>
	);
};

export default FullScreenButton;
