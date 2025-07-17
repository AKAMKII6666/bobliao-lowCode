import { CSSProperties, ReactElement } from "react";
import type { UploadFile } from "antd/es/upload/interface";
import { UploadChangeParam } from "antd/lib/upload";
interface PropsType {
    /**
     * 文件列表
     */
    files: any[];
    /**
     * 消息
     */
    msg?: string;
    /**
     * 类型限制
     */
    limitType?: string;
    /**
     * 文件数量限制
     */
    limit?: number;
    /**
     * 样式定制
     */
    style?: CSSProperties;
    /**
     * 是否显示上传列表
     */
    isShowUploadList?: boolean;
    /**
     * 是否只能上传图片
     */
    limitImg?: boolean;
    /**
     * 是否启用
     */
    disabled?: boolean;
    /**
     * 文件上传之后的回调
     * @returns
     */
    beforeUpload?: () => void;
    /**
     * 子对象
     */
    children?: ReactElement | ReactElement[] | null | undefined;
    /**
     * 当文件列表发生改变的时候
     * @param param
     * @returns
     */
    onFilesChange: (param: any[]) => void;
    /**
     * 当上传状态发生改变的时候
     * @param param
     * @returns
     */
    onchangeState?: (param: UploadChangeParam<UploadFile<any>>) => void;
    /**
     * 附加样式
     */
    className?: string;
    /**
     * 上传时接受的文件类型
     */
    accept?: any;
    /**
     * 上传用的url地址
     */
    action?: string;
    /**
     * 上传时请求时用的header
     */
    headers?: {
        [property: string]: any;
    };
}
export type Tinputprops = PropsType;
declare const UploadFile: ({ limit, limitType, files, limitImg, disabled, onFilesChange, beforeUpload, style, msg, children, isShowUploadList, onchangeState, className, accept, action, headers, }: PropsType) => import("react/jsx-runtime").JSX.Element;
export default UploadFile;
//# sourceMappingURL=upload.d.ts.map