import { ImageNodeAttributes } from 'mui-tiptap';
import { FC } from 'react';
/**
 * 传入参数
 */
export interface iprops {
    onImageUpload: (files: File[]) => ImageNodeAttributes[] | Promise<ImageNodeAttributes[]>;
}
declare const EditorMenuControls: FC<iprops>;
export default EditorMenuControls;
//# sourceMappingURL=EditorMenuControls.d.ts.map