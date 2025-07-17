import { useState, useEffect } from "react";
import { SxProps, Theme, useTheme } from "@mui/material/styles";
import { Typography, Stack, TextField } from "@mui/material";

import Autocomplete from "@mui/material/Autocomplete";

export type AutocompleteValType = {
	label: string;
	value: string;
};

/**
 * MithrilAutocomplete 组件的属性接口
 */
export interface IMithrilAutocompleteProps {
	/**
	 * 唯一标识，可用于区分页面中多个实例
	 */
	id?: string;

	/**
	 * 自定义校验函数，当 multiple 为 true 且值超过一个时，会调用该函数判断是否允许选中
	 * @param val 当前选中的值或值数组
	 * @returns 返回 true 则允许，否则不更新选中
	 */
	judgeFn?: (val: any) => boolean;

	/**
	 * 左侧标签宽度，可传数字（px）或百分比等单位，默认根据内容自适应
	 */
	labelWidth?: number;

	/**
	 * 左侧标签文本或 React 节点
	 */
	label?: React.ReactNode | string;

	/**
	 * 控件当前选中值，单选时为单个对象，多选时为数组，类型为 { label: string; value: string }
	 */
	value?: AutocompleteValType | any;

	/**
	 * 是否占满父容器宽度，默认为 false
	 */
	fullWidth?: boolean;

	/**
	 * 是否支持多选，默认为 false （单选）
	 */
	multiple?: boolean;

	/**
	 * 自定义样式，使用 MUI 的 sx 语法扩展
	 */
	sx?: SxProps<Theme>;

	/**
	 * 是否禁用输入框，默认为 false
	 */
	disabled?: boolean;

	/**
	 * 是否在标签后面显示冒号，默认为 true
	 */
	colon?: boolean;

	/**
	 * 布局方向，row 或 column，默认 row
	 */
	direction?: any;

	/**
	 * Stack 组件的额外样式，使用 MUI 的 sx 语法扩展
	 */
	stackSx?: SxProps<Theme>;

	/**
	 * 下拉选项数据源，数组中每项为 { label: string; value: string }
	 */
	data?: any[];

	/**
	 * 输入框 placeholder 提示文案
	 */
	placeholder?: string;

	/**
	 * Stack 组件的子元素之间间距，默认 2
	 */
	spacing?: any;

	/**
	 * 值变化时的回调
	 * @param value 当前选中的值或值数组
	 */
	onChange?: (value: AutocompleteValType | any) => void;
}

//往外面暴露统一名称的属性对象，用于生成低代码平台属性JSON schema
export type Tinputprops = IMithrilAutocompleteProps;

const MithrilAutocomplete = (props: IMithrilAutocompleteProps) => {
	const theme = useTheme();

	const {
		label,
		multiple = false,
		sx = { width: 210 },
		data = [],
		labelWidth,
		fullWidth = false,
		stackSx = { mt: 0 },
		value,
		spacing = 2,
		placeholder,
		disabled = false,
		direction = "row",
		colon = true,
		judgeFn,
	} = props;
	const [selected, setSelected] = useState<AutocompleteValType | AutocompleteValType[] | null>(value);

	useEffect(() => {
		if (props.value) {
			setSelected(props.value);
		}
	}, [props.value]);

	const handleChange = (_event: React.SyntheticEvent<Element, Event>, value: any) => {
		if (judgeFn && value.length > 1) {
			if (judgeFn(value)) {
				setSelected(value);
				if (props.onChange) {
					props.onChange(value);
				}
			}
		} else {
			setSelected(value);
			if (props.onChange) {
				props.onChange(value);
			}
		}
	};

	return (
		<Stack alignItems={direction === "row" ? "center" : "start"} sx={stackSx} direction={direction} justifyContent="start" spacing={spacing}>
			{label && (
				<Typography sx={{ width: labelWidth ? labelWidth : "auto" }}>
					{label}
					{colon && ":"}
				</Typography>
			)}
			<Autocomplete
				sx={{
					"& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
						pt: "7.5px",
						pb: "7.5px",
						bgcolor: theme.palette.grey[50],
					},
					"& .MuiAutocomplete-input": {
						bgcolor: theme.palette.grey[50],
					},
					...sx,
				}}
				size="small"
				multiple={multiple}
				getOptionLabel={(option) => (option ? `${option.label}` : "")}
				onChange={handleChange}
				options={data}
				disabled={disabled}
				noOptionsText={"选项为空"}
				fullWidth={fullWidth}
				value={selected}
				renderInput={(params) => <TextField placeholder={placeholder} {...params} />}
				slotProps={{
					popupIndicator: {
						title: "", // 把默认的 "Open" 清空
					},
					// 去掉清除按钮的提示
					clearIndicator: {
						title: "",
					},
				}}
			/>
		</Stack>
	);
};
//为防止在编译和混淆后，无法识别组件名称，所以在这里显示定义名称
MithrilAutocomplete.displayName = "MithrilAutocomplete";

export default MithrilAutocomplete;
