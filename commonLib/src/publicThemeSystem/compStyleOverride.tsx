// project imports
import { Theme } from "@mui/material/styles";

export default function componentStyleOverrides(theme: any, borderRadius: number, outlinedFilled: boolean) {
	const mode = theme.palette.mode;
	const bgColor = mode === "dark" ? theme.palette.dark[800] : theme.palette.grey[50];
	const menuSelectedBack = mode === "dark" ? theme.palette.secondary.main + 15 : theme.palette.secondary.light;
	const menuSelected = mode === "dark" ? theme.palette.secondary.main : theme.palette.secondary.dark;

	return {
		/* 自定义muiswitch的样式 */
		MuiSwitch: {
			styleOverrides: {
				track: {
					height: 14,
					width: 28,
					opacity: 0.3,
				},
				thumb: {
					// 默认 thumb 样式
					width: 18,
					height: 18,
				},
				switchBase: {
					padding: 9.5,
					right: 19,
					left: "unset",
					// 选中状态
					"&.Mui-checked": {
						// 设置选中状态下的 thumb 位置（可以通过 `transform` 控制位置）
						right: 28, // thumb 向右移动 16px
						left: "unset",
					},
				},
			},
		},
		MuiCheckbox: {
			styleOverrides: {
				root: {
					width: "14px",
					height: "14px",
					boxSizing: "border-box",
					margin: "5px",
					padding: "0px",
					overflow: "hidden",
					borderRadius: "3px",
					border: "1px solid " + theme.palette.primary.main,
					"&.Mui-disabled": {
						border: "1px solid " + theme.palette.secondary[100],
						backgroundColor: theme.palette.primary[400],
					},
					"&.Mui-checked": {
						border: "3px solid " + theme.palette.primary.main,
						".MuiSvgIcon-root": {
							width: "14px",
							height: "14px",
							boxSizing: "border-box",
							display: "inline-block",
						},
					},
					".MuiSvgIcon-root": {
						display: "none",
					},
					"&.MuiCheckbox-indeterminate": {
						".MuiSvgIcon-root": {
							display: "inline-block",
							width: "8px",
							height: "8px",
							boxSizing: "border-box",
							backgroundColor: theme.palette.primary.main,
							borderRadius: "2px",
						},
					},
				},
			},
		},
		DatePicker: {
			styleOverrides: {
				root: {
					background: outlinedFilled ? "#FFFFFF" : "#FFFFFF",
					borderRadius: `${borderRadius}px`,
					"& .MuiOutlinedInput-notchedOutline": {
						// borderColor: mode === 'dark' ? theme.palette.text.primary + 28 : theme.palette.grey[400],
						// borderColor: '#ffffff',
					},
					"&:hover $notchedOutline": {
						borderColor: theme.palette.primary.light,
					},
					"&.MuiInputBase-multiline": {
						padding: 1,
					},
				},
				input: {
					fontWeight: 500,
					background: outlinedFilled ? bgColor : "transparent",
					padding: "15.5px 14px",

					borderRadius: `${borderRadius}px`,
					"&.MuiInputBase-inputSizeSmall": {
						padding: "10px 14px",
						"&.MuiInputBase-inputAdornedStart": {
							paddingLeft: 0,
						},
					},
				},
				inputAdornedStart: {
					paddingLeft: 4,
				},
				notchedOutline: {
					borderRadius: `${borderRadius}px`,
				},
			},
		},
		/* 定义mui按钮 */
		MuiButton: {
			styleOverrides: {
				root: {
					fontWeight: 400,
					borderRadius: "4px",
					//鼠标放上去也不要阴影
					"&:hover": {
						boxShadow: "none",
						backgroundColor: theme.palette.primary[400],
					},
					/* 鼠标按下去 */
					"&:active": {
						boxShadow: "none",
						backgroundColor: theme.palette.primary[50],
					},
					"&.Mui-disabled": {
						color: theme.palette.secondary[300],
					},

					/* 有背景色的按钮 */
					"&.MuiButton-contained": {
						fontWeight: 400,
						//不要阴影
						boxShadow: "none",
						//鼠标放上去也不要阴影
						"&:hover": {
							boxShadow: "none",
							backgroundColor: theme.palette.primary.dark,
							color: theme.palette.secondary[400],
						},
						/* 鼠标按下去 */
						"&:active": {
							boxShadow: "none",
							backgroundColor: theme.palette.primary[300],
						},
						/* 被禁用 */
						"&.Mui-disabled": {
							backgroundColor: theme.palette.primary[400],
							color: theme.palette.primary[500],
						},
					},
					/* 线框按钮 */
					"&.MuiButton-outlined": {
						fontWeight: 400,
						border: "1px solid " + theme.palette.primary[600],
						backgroundColor: theme.palette.background.paper,
						color: theme.palette.primary[700],
						"&:hover": {
							boxShadow: "none",
							border: "1px solid " + theme.palette.primary.main,
							backgroundColor: theme.palette.background.paper,
							color: theme.palette.primary[900],
						},
						"&:active": {
							boxShadow: "none",
							border: "1px solid " + theme.palette.primary.main,
							backgroundColor: theme.palette.primary[50],
							color: theme.palette.primary[100],
						},
						"&.Mui-disabled": {
							border: "1px solid " + theme.palette.secondary[100],
							backgroundColor: theme.palette.primary[400],
							color: theme.palette.primary[500],
						},
					},
					"&.MuiButton-outlinedSecondary": {
						color: "#989898",
						border: "1px solid #C4C4C4",
					},
				},
			},
		},
		MuiPaper: {
			defaultProps: {
				elevation: 0,
			},
			styleOverrides: {
				root: {
					backgroundImage: "none",
				},
				rounded: {
					borderRadius: `${borderRadius}px`,
				},
			},
		},
		MuiCardHeader: {
			styleOverrides: {
				root: {
					color: theme.palette.text.dark,
					padding: "16px 24px",
				},
				title: {
					fontSize: "1.125rem",
				},
			},
		},
		MuiCardContent: {
			styleOverrides: {
				root: {
					padding: "16px 24px",
				},
			},
		},
		MuiCardActions: {
			styleOverrides: {
				root: {
					padding: "24px",
				},
			},
		},
		MuiAlert: {
			styleOverrides: {
				root: {
					alignItems: "center",
				},
				outlined: {
					border: "1px dashed",
				},
			},
		},
		MuiListItemButton: {
			styleOverrides: {
				root: {
					color: theme.palette.text.primary,
					paddingTop: "10px",
					paddingBottom: "10px",
					"&.Mui-selected": {
						color: menuSelected,
						backgroundColor: menuSelectedBack,
						"&:hover": {
							backgroundColor: menuSelectedBack,
						},
						"& .MuiListItemIcon-root": {
							color: menuSelected,
						},
					},
					"&:hover": {
						backgroundColor: menuSelectedBack,
						color: menuSelected,
						"& .MuiListItemIcon-root": {
							color: menuSelected,
						},
					},
				},
			},
		},
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					color: theme.palette.text.primary,
					minWidth: "36px",
				},
			},
		},
		MuiListItemText: {
			styleOverrides: {
				primary: {
					color: theme.palette.text.dark,
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				input: {
					color: theme.palette.text.dark,
					"&::placeholder": {
						color: theme.palette.text.secondary,
						fontSize: "0.875rem",
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					background: outlinedFilled ? "#FFFFFF" : "#FFFFFF",
					borderRadius: `${borderRadius}px`,
					"& .MuiOutlinedInput-notchedOutline": {
						// borderColor: mode === 'dark' ? theme.palette.text.primary + 28 : theme.palette.grey[400],
						// borderColor: '#ffffff',
					},
					"&:hover $notchedOutline": {
						borderColor: theme.palette.primary.light,
					},
					"&.MuiInputBase-multiline": {
						padding: 1,
					},
				},
				input: {
					fontWeight: 500,
					background: outlinedFilled ? bgColor : "transparent",
					padding: "15.5px 14px",

					borderRadius: `${borderRadius}px`,
					"&.MuiInputBase-inputSizeSmall": {
						padding: "10px 14px",
						"&.MuiInputBase-inputAdornedStart": {
							paddingLeft: 0,
						},
					},
				},
				inputAdornedStart: {
					paddingLeft: 4,
				},
				notchedOutline: {
					borderRadius: `${borderRadius}px`,
				},
			},
		},
		MuiSlider: {
			styleOverrides: {
				root: {
					"&.Mui-disabled": {
						color: mode === "dark" ? theme.palette.text.primary + 50 : theme.palette.grey[300],
					},
				},
				mark: {
					backgroundColor: theme.palette.background.paper,
					width: "4px",
				},
				valueLabel: {
					color: mode === "dark" ? theme.palette.primary.main : theme.palette.primary.light,
				},
			},
		},
		MuiAutocomplete: {
			styleOverrides: {
				root: {
					"& .MuiAutocomplete-tag": {
						background: mode === "dark" ? theme.palette.text.primary + 20 : theme.palette.secondary.light,
						borderRadius: 4,
						color: theme.palette.text.dark,
						".MuiChip-deleteIcon": {
							color: mode === "dark" ? theme.palette.text.primary + 80 : theme.palette.secondary[200],
						},
					},
				},
				popper: {
					borderRadius: `${borderRadius}px`,
					boxShadow: "0px 8px 10px -5px rgb(0 0 0 / 20%), 0px 16px 24px 2px rgb(0 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 12%)",
				},
			},
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					borderColor: theme.palette.divider,
					opacity: mode === "dark" ? 0.2 : 1,
				},
			},
		},
		MuiSelect: {
			styleOverrides: {
				select: {
					"&:focus": {
						backgroundColor: "transparent",
					},
				},
			},
		},
		MuiAvatar: {
			styleOverrides: {
				root: {
					color: mode === "dark" ? theme.palette.dark.main : theme.palette.primary.dark,
					background: mode === "dark" ? theme.palette.text.primary : theme.palette.primary[200],
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					"&.MuiChip-deletable .MuiChip-deleteIcon": {
						color: "inherit",
					},
				},
			},
		},
		MuiTimelineContent: {
			styleOverrides: {
				root: {
					color: theme.palette.text.dark,
					fontSize: "16px",
				},
			},
		},
		MuiTreeItem: {
			styleOverrides: {
				label: {
					marginTop: 14,
					marginBottom: 14,
				},
			},
		},
		MuiTimelineDot: {
			styleOverrides: {
				root: {
					boxShadow: "none",
				},
			},
		},
		MuiInternalDateTimePickerTabs: {
			styleOverrides: {
				tabs: {
					backgroundColor: mode === "dark" ? theme.palette.dark[900] : theme.palette.primary.light,
					"& .MuiTabs-flexContainer": {
						borderColor: mode === "dark" ? theme.palette.text.primary + 20 : theme.palette.primary[200],
					},
					"& .MuiTab-root": {
						color: mode === "dark" ? theme.palette.text.secondary : theme.palette.grey[900],
					},
					"& .MuiTabs-indicator": {
						backgroundColor: theme.palette.primary.dark,
					},
					"& .Mui-selected": {
						color: theme.palette.primary.dark,
					},
				},
			},
		},
		MuiTabs: {
			styleOverrides: {
				flexContainer: {
					borderBottom: "1px solid",
					borderColor: mode === "dark" ? theme.palette.text.primary + 20 : theme.palette.grey[200],
				},
			},
		},
		MuiDialog: {
			styleOverrides: {
				paper: {
					padding: "12px 0 12px 0",
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					borderColor: mode === "dark" ? theme.palette.text.primary + 15 : theme.palette.grey[200],
					"&.MuiTableCell-head": {
						fontSize: "0.875rem",
						color: theme.palette.grey[600],
						fontWeight: 500,
					},
				},
			},
		},
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					color: theme.palette.background.paper,
					background: theme.palette.text.primary,
				},
			},
		},
		MuiDialogTitle: {
			styleOverrides: {
				root: {
					fontSize: "1.25rem",
				},
			},
		},
	};
}
