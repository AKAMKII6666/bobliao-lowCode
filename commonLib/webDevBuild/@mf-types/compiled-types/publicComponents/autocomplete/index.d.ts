import { SxProps, Theme } from "@mui/material/styles";
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
export type Tinputprops = IMithrilAutocompleteProps;
declare const MithrilAutocomplete: {
    (props: IMithrilAutocompleteProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export default MithrilAutocomplete;
//# sourceMappingURL=index.d.ts.map