export default function componentStyleOverrides(theme: any, borderRadius: number, outlinedFilled: boolean): {
    MuiSwitch: {
        styleOverrides: {
            track: {
                height: number;
                width: number;
                opacity: number;
            };
            thumb: {
                width: number;
                height: number;
            };
            switchBase: {
                padding: number;
                right: number;
                left: string;
                "&.Mui-checked": {
                    right: number;
                    left: string;
                };
            };
        };
    };
    MuiCheckbox: {
        styleOverrides: {
            root: {
                width: string;
                height: string;
                boxSizing: string;
                margin: string;
                padding: string;
                overflow: string;
                borderRadius: string;
                border: string;
                "&.Mui-disabled": {
                    border: string;
                    backgroundColor: any;
                };
                "&.Mui-checked": {
                    border: string;
                    ".MuiSvgIcon-root": {
                        width: string;
                        height: string;
                        boxSizing: string;
                        display: string;
                    };
                };
                ".MuiSvgIcon-root": {
                    display: string;
                };
                "&.MuiCheckbox-indeterminate": {
                    ".MuiSvgIcon-root": {
                        display: string;
                        width: string;
                        height: string;
                        boxSizing: string;
                        backgroundColor: any;
                        borderRadius: string;
                    };
                };
            };
        };
    };
    DatePicker: {
        styleOverrides: {
            root: {
                background: string;
                borderRadius: string;
                "& .MuiOutlinedInput-notchedOutline": {};
                "&:hover $notchedOutline": {
                    borderColor: any;
                };
                "&.MuiInputBase-multiline": {
                    padding: number;
                };
            };
            input: {
                fontWeight: number;
                background: any;
                padding: string;
                borderRadius: string;
                "&.MuiInputBase-inputSizeSmall": {
                    padding: string;
                    "&.MuiInputBase-inputAdornedStart": {
                        paddingLeft: number;
                    };
                };
            };
            inputAdornedStart: {
                paddingLeft: number;
            };
            notchedOutline: {
                borderRadius: string;
            };
        };
    };
    MuiButton: {
        styleOverrides: {
            root: {
                fontWeight: number;
                borderRadius: string;
                "&:hover": {
                    boxShadow: string;
                    backgroundColor: any;
                };
                "&:active": {
                    boxShadow: string;
                    backgroundColor: any;
                };
                "&.Mui-disabled": {
                    color: any;
                };
                "&.MuiButton-contained": {
                    fontWeight: number;
                    boxShadow: string;
                    "&:hover": {
                        boxShadow: string;
                        backgroundColor: any;
                        color: any;
                    };
                    "&:active": {
                        boxShadow: string;
                        backgroundColor: any;
                    };
                    "&.Mui-disabled": {
                        backgroundColor: any;
                        color: any;
                    };
                };
                "&.MuiButton-outlined": {
                    fontWeight: number;
                    border: string;
                    backgroundColor: any;
                    color: any;
                    "&:hover": {
                        boxShadow: string;
                        border: string;
                        backgroundColor: any;
                        color: any;
                    };
                    "&:active": {
                        boxShadow: string;
                        border: string;
                        backgroundColor: any;
                        color: any;
                    };
                    "&.Mui-disabled": {
                        border: string;
                        backgroundColor: any;
                        color: any;
                    };
                };
                "&.MuiButton-outlinedSecondary": {
                    color: string;
                    border: string;
                };
            };
        };
    };
    MuiPaper: {
        defaultProps: {
            elevation: number;
        };
        styleOverrides: {
            root: {
                backgroundImage: string;
            };
            rounded: {
                borderRadius: string;
            };
        };
    };
    MuiCardHeader: {
        styleOverrides: {
            root: {
                color: any;
                padding: string;
            };
            title: {
                fontSize: string;
            };
        };
    };
    MuiCardContent: {
        styleOverrides: {
            root: {
                padding: string;
            };
        };
    };
    MuiCardActions: {
        styleOverrides: {
            root: {
                padding: string;
            };
        };
    };
    MuiAlert: {
        styleOverrides: {
            root: {
                alignItems: string;
            };
            outlined: {
                border: string;
            };
        };
    };
    MuiListItemButton: {
        styleOverrides: {
            root: {
                color: any;
                paddingTop: string;
                paddingBottom: string;
                "&.Mui-selected": {
                    color: any;
                    backgroundColor: any;
                    "&:hover": {
                        backgroundColor: any;
                    };
                    "& .MuiListItemIcon-root": {
                        color: any;
                    };
                };
                "&:hover": {
                    backgroundColor: any;
                    color: any;
                    "& .MuiListItemIcon-root": {
                        color: any;
                    };
                };
            };
        };
    };
    MuiListItemIcon: {
        styleOverrides: {
            root: {
                color: any;
                minWidth: string;
            };
        };
    };
    MuiListItemText: {
        styleOverrides: {
            primary: {
                color: any;
            };
        };
    };
    MuiInputBase: {
        styleOverrides: {
            input: {
                color: any;
                "&::placeholder": {
                    color: any;
                    fontSize: string;
                };
            };
        };
    };
    MuiOutlinedInput: {
        styleOverrides: {
            root: {
                background: string;
                borderRadius: string;
                "& .MuiOutlinedInput-notchedOutline": {};
                "&:hover $notchedOutline": {
                    borderColor: any;
                };
                "&.MuiInputBase-multiline": {
                    padding: number;
                };
            };
            input: {
                fontWeight: number;
                background: any;
                padding: string;
                borderRadius: string;
                "&.MuiInputBase-inputSizeSmall": {
                    padding: string;
                    "&.MuiInputBase-inputAdornedStart": {
                        paddingLeft: number;
                    };
                };
            };
            inputAdornedStart: {
                paddingLeft: number;
            };
            notchedOutline: {
                borderRadius: string;
            };
        };
    };
    MuiSlider: {
        styleOverrides: {
            root: {
                "&.Mui-disabled": {
                    color: any;
                };
            };
            mark: {
                backgroundColor: any;
                width: string;
            };
            valueLabel: {
                color: any;
            };
        };
    };
    MuiAutocomplete: {
        styleOverrides: {
            root: {
                "& .MuiAutocomplete-tag": {
                    background: any;
                    borderRadius: number;
                    color: any;
                    ".MuiChip-deleteIcon": {
                        color: any;
                    };
                };
            };
            popper: {
                borderRadius: string;
                boxShadow: string;
            };
        };
    };
    MuiDivider: {
        styleOverrides: {
            root: {
                borderColor: any;
                opacity: number;
            };
        };
    };
    MuiSelect: {
        styleOverrides: {
            select: {
                "&:focus": {
                    backgroundColor: string;
                };
            };
        };
    };
    MuiAvatar: {
        styleOverrides: {
            root: {
                color: any;
                background: any;
            };
        };
    };
    MuiChip: {
        styleOverrides: {
            root: {
                "&.MuiChip-deletable .MuiChip-deleteIcon": {
                    color: string;
                };
            };
        };
    };
    MuiTimelineContent: {
        styleOverrides: {
            root: {
                color: any;
                fontSize: string;
            };
        };
    };
    MuiTreeItem: {
        styleOverrides: {
            label: {
                marginTop: number;
                marginBottom: number;
            };
        };
    };
    MuiTimelineDot: {
        styleOverrides: {
            root: {
                boxShadow: string;
            };
        };
    };
    MuiInternalDateTimePickerTabs: {
        styleOverrides: {
            tabs: {
                backgroundColor: any;
                "& .MuiTabs-flexContainer": {
                    borderColor: any;
                };
                "& .MuiTab-root": {
                    color: any;
                };
                "& .MuiTabs-indicator": {
                    backgroundColor: any;
                };
                "& .Mui-selected": {
                    color: any;
                };
            };
        };
    };
    MuiTabs: {
        styleOverrides: {
            flexContainer: {
                borderBottom: string;
                borderColor: any;
            };
        };
    };
    MuiDialog: {
        styleOverrides: {
            paper: {
                padding: string;
            };
        };
    };
    MuiTableCell: {
        styleOverrides: {
            root: {
                borderColor: any;
                "&.MuiTableCell-head": {
                    fontSize: string;
                    color: any;
                    fontWeight: number;
                };
            };
        };
    };
    MuiTooltip: {
        styleOverrides: {
            tooltip: {
                color: any;
                background: any;
            };
        };
    };
    MuiDialogTitle: {
        styleOverrides: {
            root: {
                fontSize: string;
            };
        };
    };
};
//# sourceMappingURL=compStyleOverride.d.ts.map