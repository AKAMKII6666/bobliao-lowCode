import { Theme } from '@mui/material/styles';
export default function componentStyleOverrides(theme: Theme, borderRadius: number, outlinedFilled: boolean): {
    MuiButton: {
        styleOverrides: {
            root: {
                fontWeight: number;
                borderRadius: string;
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
                color: string;
                paddingTop: string;
                paddingBottom: string;
                '&.Mui-selected': {
                    color: string;
                    backgroundColor: string;
                    '&:hover': {
                        backgroundColor: string;
                    };
                    '& .MuiListItemIcon-root': {
                        color: string;
                    };
                };
                '&:hover': {
                    backgroundColor: string;
                    color: string;
                    '& .MuiListItemIcon-root': {
                        color: string;
                    };
                };
            };
        };
    };
    MuiListItemIcon: {
        styleOverrides: {
            root: {
                color: string;
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
                '&::placeholder': {
                    color: string;
                    fontSize: string;
                };
            };
        };
    };
    MuiOutlinedInput: {
        styleOverrides: {
            root: {
                background: any;
                borderRadius: string;
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: string;
                };
                '&:hover $notchedOutline': {
                    borderColor: string;
                };
                '&.MuiInputBase-multiline': {
                    padding: number;
                };
            };
            input: {
                fontWeight: number;
                background: any;
                padding: string;
                borderRadius: string;
                '&.MuiInputBase-inputSizeSmall': {
                    padding: string;
                    '&.MuiInputBase-inputAdornedStart': {
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
                '&.Mui-disabled': {
                    color: string;
                };
            };
            mark: {
                backgroundColor: string;
                width: string;
            };
            valueLabel: {
                color: string;
            };
        };
    };
    MuiAutocomplete: {
        styleOverrides: {
            root: {
                '& .MuiAutocomplete-tag': {
                    background: string;
                    borderRadius: number;
                    color: any;
                    '.MuiChip-deleteIcon': {
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
                borderColor: string;
                opacity: number;
            };
        };
    };
    MuiSelect: {
        styleOverrides: {
            select: {
                '&:focus': {
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
                '&.MuiChip-deletable .MuiChip-deleteIcon': {
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
                '& .MuiTabs-flexContainer': {
                    borderColor: any;
                };
                '& .MuiTab-root': {
                    color: string;
                };
                '& .MuiTabs-indicator': {
                    backgroundColor: string;
                };
                '& .Mui-selected': {
                    color: string;
                };
            };
        };
    };
    MuiTabs: {
        styleOverrides: {
            flexContainer: {
                borderBottom: string;
                borderColor: string;
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
                borderColor: string;
                '&.MuiTableCell-head': {
                    fontSize: string;
                    color: string;
                    fontWeight: number;
                };
            };
        };
    };
    MuiDateTimePickerToolbar: {
        styleOverrides: {
            timeDigitsContainer: {
                alignItems: string;
            };
        };
    };
    MuiTooltip: {
        styleOverrides: {
            tooltip: {
                color: string;
                background: string;
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
    MuiPaginationItem: {
        styleOverrides: {
            root: {
                margin: string;
            };
        };
    };
    MuiDataGrid: {
        defaultProps: {
            rowHeight: number;
        };
        styleOverrides: {
            root: {
                border: string;
                '& .MuiFormControl-root>.MuiInputBase-root': {
                    backgroundColor: string;
                    borderColor: string;
                };
            };
            row: {
                borderBottom: string;
            };
            columnHeader: {
                color: string;
                paddingLeft: number;
                paddingRight: number;
                borderBottom: string;
            };
            columnHeaderCheckbox: {
                paddingLeft: number;
                paddingRight: number;
            };
            cellCheckbox: {
                paddingLeft: number;
                paddingRight: number;
            };
            cell: {
                border: string;
                paddingLeft: number;
                paddingRight: number;
                '&.MuiDataGrid-cell--withRenderer > div ': {
                    ' > .high': {
                        backgroundColor: string;
                    };
                    '& > .medium': {
                        backgroundColor: string;
                    };
                    '& > .low': {
                        backgroundColor: string;
                    };
                    color: string;
                };
            };
            columnsContainer: {
                borderColor: string;
            };
            columnSeparator: {
                borderColor: string;
            };
            withBorderColor: {
                borderColor: string;
            };
        };
    };
};
//# sourceMappingURL=compStyleOverride.d.ts.map