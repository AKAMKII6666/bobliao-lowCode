import { ReactElement, ForwardedRef } from "react";
import { NumberInputProps } from "MithalCommonLibrary/CustomNumberInput";
import { SxProps, Theme } from "@mui/system";
/**
 * 传入参数
 */
export interface NumberRangeInputProps extends Omit<NumberInputProps, "placeholder" | "units" | "name" | "labelWidth" | "label" | "onChange" | "value" | "splitStr"> {
    label?: string;
    labelWidth?: string | number;
    value?: string[];
    name?: string[];
    onChange?: (value: string[] | number[]) => void;
    splitStr?: string;
    containerSx?: SxProps<Theme>;
    units?: string[];
    placeholder?: string[];
}
export type Tinputprops = NumberRangeInputProps;
declare const NumberRangeInput: {
    (props: NumberRangeInputProps, _ref: ForwardedRef<HTMLInputElement>[]): ReactElement;
    displayName: string;
};
export default NumberRangeInput;
//# sourceMappingURL=index.d.ts.map