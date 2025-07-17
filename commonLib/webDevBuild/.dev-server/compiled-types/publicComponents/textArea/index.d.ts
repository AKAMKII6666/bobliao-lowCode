/**
 * 廖力编写
 * 模块名称：文本域
 * 模块说明：
 * 编写时间：2025年3月14日
 */
import { FC } from "react";
import { TextFieldProps } from "@mui/material/TextField";
/**
 * 传入参数
 */
export type EnhancedTextFieldProps = TextFieldProps & {
    maxLength?: number;
};
export type Tinputprops = EnhancedTextFieldProps;
declare const MithrilTextArea: FC<EnhancedTextFieldProps>;
export default MithrilTextArea;
//# sourceMappingURL=index.d.ts.map