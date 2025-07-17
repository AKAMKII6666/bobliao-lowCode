/**
 * 廖力编写
 * 模块名称：
 * 模块说明：
 * 编写时间：
 */
import { FC } from "react";
import { ImageNodeAttributes } from "mui-tiptap";
/**
 * 传入参数
 */
export interface iprops {
    value: string;
    onChange: (value: string) => void;
    onImageUpload: (files: File[]) => ImageNodeAttributes[] | Promise<ImageNodeAttributes[]>;
    onBlur: (e: any) => void;
}
export type Tinputprops = iprops;
declare const TipTapRichTextEditor: FC<iprops>;
export default TipTapRichTextEditor;
//# sourceMappingURL=index.d.ts.map