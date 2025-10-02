// project imports
import { Theme } from "@mui/material/styles";

export default function componentStyleOverrides(theme: Theme, borderRadius: number, outlinedFilled: boolean) {
	const mode = theme.palette.mode;

	// 暗色模式适配的背景色
	// @ts-ignore

	// @ts-ignore

	const bgColor = mode === "dark" ? theme.palette.dark[800] : theme.palette.grey[50];
	// @ts-ignore

	const inputBgColor = mode === "dark" ? theme.palette.darkLevel2 : theme.palette.grey[50];

	// 统一的边框颜色标准 - 暗色模式适配
	// @ts-ignore

	const defaultBorderColor = mode === "dark" ? theme.palette.darkTextPrimary : theme.palette.divider;
	const hoverBorderColor = theme.palette.primary.main;
	const focusBorderColor = theme.palette.primary.dark;

	return {
		MuiButton: {
			styleOverrides: {
				root: {
					fontWeight: 500,
					borderRadius: "4px",
					"&:hover": {
						backgroundColor: theme.palette.primary.main, // 使用主色背景
						color: theme.palette.primary.contrastText,
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
					/* 直接忽略这里的ts错误 */
					// @ts-ignore
					color: theme.palette.text.dark,
					padding: "24px",
				},
				title: {
					fontSize: "1.125rem",
				},
			},
		},
		MuiCardContent: {
			styleOverrides: {
				root: {
					padding: "24px",
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
						color: theme.palette.secondary.main, // 使用主色
						backgroundColor: theme.palette.secondary.light, // 使用次要背景
						"&:hover": {
							backgroundColor: theme.palette.secondary.light,
						},
						"& .MuiListItemIcon-root": {
							color: theme.palette.secondary.main, // 使用主色
						},
					},
					"&:hover": {
						backgroundColor: theme.palette.secondary.light,
						color: theme.palette.secondary.main, // 使用主色
						"& .MuiListItemIcon-root": {
							color: theme.palette.secondary.main, // 使用主色
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
					/* 直接忽略这里的ts错误 */
					// @ts-ignore
					color: theme.palette.text.dark,
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				input: {
					/* 直接忽略这里的ts错误 */
					// @ts-ignore
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
					background: outlinedFilled ? inputBgColor : "transparent",
					borderRadius: `${borderRadius}px`,
					"& .MuiOutlinedInput-notchedOutline": {
						borderColor: defaultBorderColor,
					},
					"&:hover $notchedOutline": {
						borderColor: hoverBorderColor,
					},
					"&.Mui-focused $notchedOutline": {
						borderColor: focusBorderColor,
						borderWidth: 2,
					},
					"&.MuiInputBase-multiline": {
						padding: 1,
					},
				},
				input: {
					fontWeight: 500,
					background: outlinedFilled ? inputBgColor : "transparent",
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
						color: mode === "dark" ? theme.palette.text.primary + 50 : theme.palette.text.secondary,
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
						//@ts-ignore
						color: mode === "dark" ? theme.palette.darkTextPrimary : theme.palette.text.dark,
						".MuiChip-deleteIcon": {
							color: mode === "dark" ? theme.palette.text.primary + 80 : theme.palette.secondary.light,
						},
					},
					// 添加输入框样式
					"& .MuiOutlinedInput-root": {
						backgroundColor: inputBgColor,
						"& .MuiOutlinedInput-notchedOutline": {
							borderColor: defaultBorderColor,
						},
						"&:hover .MuiOutlinedInput-notchedOutline": {
							borderColor: hoverBorderColor,
						},
						"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
							borderColor: focusBorderColor,
							borderWidth: 2,
						},
					},
				},
				popper: {
					borderRadius: `${borderRadius}px`,
					boxShadow:
						mode === "dark"
							? "0 4px 12px rgba(0, 0, 0, 0.4)"
							: "0px 8px 10px -5px rgb(0 0 0 / 20%), 0px 16px 24px 2px rgb(0 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 12%)",
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
				root: {
					"& .MuiOutlinedInput-notchedOutline": {
						borderColor: defaultBorderColor,
					},
					"&:hover .MuiOutlinedInput-notchedOutline": {
						borderColor: hoverBorderColor, // 使用更重的主色
					},
					"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
						borderColor: focusBorderColor, // 使用深色
						borderWidth: 2,
					},
					select: {
						"&:focus": {
							backgroundColor: "transparent",
						},
					},
				},
			},
		},
		MuiAvatar: {
			styleOverrides: {
				root: {
					/* 直接忽略这里的ts错误 */
					// @ts-ignore
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
					"&:hover": {
						backgroundColor: theme.palette.primary.main, // 使用主色背景
						color: theme.palette.primary.contrastText,
					},
				},
			},
		},
		MuiTimelineContent: {
			styleOverrides: {
				root: {
					/* 直接忽略这里的ts错误 */
					// @ts-ignore
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
					/* 直接忽略这里的ts错误 */
					// @ts-ignore
					backgroundColor: mode === "dark" ? theme.palette.dark[900] : theme.palette.primary.light,
					"& .MuiTabs-flexContainer": {
						borderColor: mode === "dark" ? theme.palette.text.primary + 20 : theme.palette.primary.light,
					},
					"& .MuiTab-root": {
						color: mode === "dark" ? theme.palette.text.secondary : theme.palette.text.primary,
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
					borderColor: theme.palette.divider, // 使用主题的divider颜色
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
					borderColor: theme.palette.divider, // 统一使用divider颜色
					"&.MuiTableCell-head": {
						fontSize: "0.875rem",
						color: mode === "dark" ? theme.palette.text.secondary : theme.palette.text.primary,
						fontWeight: 500,
					},
				},
			},
		},
		MuiDateTimePickerToolbar: {
			styleOverrides: {
				timeDigitsContainer: {
					alignItems: "center",
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
		MuiPaginationItem: {
			styleOverrides: {
				root: {
					margin: "3px",
				},
			},
		},
		MuiDataGrid: {
			defaultProps: {
				rowHeight: 54,
			},
			styleOverrides: {
				root: {
					border: "none",
					"& .MuiFormControl-root>.MuiInputBase-root": {
						// @ts-ignore
						backgroundColor: mode === "dark" ? theme.palette.darkLevel2 : theme.palette.background.default,
						// @ts-ignore

						borderColor: mode === "dark" ? theme.palette.darkTextPrimary : theme.palette.divider,
					},
				},
				row: {
					// @ts-ignore

					borderBottom: `1px solid ${mode === "dark" ? theme.palette.darkTextPrimary : theme.palette.divider}`,
				},
				columnHeader: {
					// @ts-ignore

					color: mode === "dark" ? theme.palette.darkTextSecondary : theme.palette.text.secondary,
					paddingLeft: 24,
					paddingRight: 24,
					// @ts-ignore

					borderBottom: `1px solid ${mode === "dark" ? theme.palette.darkTextPrimary : theme.palette.divider}`,
				},
				columnHeaderCheckbox: {
					paddingLeft: 0,
					paddingRight: 0,
				},
				cellCheckbox: {
					paddingLeft: 0,
					paddingRight: 0,
				},
				cell: {
					border: "none",
					paddingLeft: 24,
					paddingRight: 24,
					"&.MuiDataGrid-cell--withRenderer > div ": {
						...(theme.palette.mode === "dark" && {
							// @ts-ignore
							color: theme.palette.darkTextPrimary,
						}),
						" > .high": {
							backgroundColor: theme.palette.mode === "dark" ? theme.palette.success.dark : theme.palette.success.light,
						},
						"& > .medium": {
							backgroundColor: theme.palette.mode === "dark" ? theme.palette.warning.dark : theme.palette.warning.light,
						},
						"& > .low": {
							backgroundColor: theme.palette.mode === "dark" ? theme.palette.error.dark : theme.palette.error.light,
						},
					},
				},
				columnsContainer: {
					// @ts-ignore

					borderColor: mode === "dark" ? theme.palette.darkTextPrimary : theme.palette.divider,
				},
				columnSeparator: {
					// @ts-ignore

					borderColor: mode === "dark" ? theme.palette.darkTextPrimary : theme.palette.divider,
				},
				withBorderColor: {
					// @ts-ignore

					borderColor: mode === "dark" ? theme.palette.darkTextPrimary : theme.palette.divider,
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					"& .MuiOutlinedInput-root": {
						"& .MuiOutlinedInput-notchedOutline": {
							borderColor: defaultBorderColor,
						},
						"&:hover .MuiOutlinedInput-notchedOutline": {
							borderColor: hoverBorderColor, // 使用更重的主色
						},
						"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
							borderColor: focusBorderColor, // 使用深色
							borderWidth: 2,
						},
					},
				},
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					"&:hover": {
						backgroundColor: theme.palette.primary.main, // 使用主色背景
						color: theme.palette.primary.contrastText,
					},
				},
			},
		},
	};
}
