import { GridProps } from "@mui/material";
export declare const emptyImageUrl = "https://mithril-trinity.oss-cn-beijing.aliyuncs.com/main/home/emptyImage.png";
export declare const setCookieSameDomain: (name: string, value: string, time: string | number) => void;
export declare const setCookie: (name: string, value: string, time: string | number) => void;
export declare const newGuid: () => string;
/**
 * 删除cookie
 */
export declare const delCookie: (name: string) => void;
export declare const getCookie: (name: string) => void | null | string;
/**
 * 提取url参数
 */
export declare const getUrlParams: () => any;
export declare const filterEmptyKey: (obj: any) => any;
export declare const filterEmptyKeyV2: (obj: any) => any;
export declare const useTimedout: (promiseObj: any, time: any) => Promise<any>;
export declare const copyToClipboard: (text: string) => Promise<boolean>;
export declare const thousandsSplit: (num: number | string) => string;
export declare const OSS_UrlHead = "https://static-file-source.oss-cn-beijing.aliyuncs.com/";
export declare const inqueryItemGridSize_public: {
    item: boolean;
    xl: number;
    lg: number;
    md: number;
    sm: number;
    xs: number;
};
export declare const titleGridP_layout: GridProps;
export declare const contentGridP_layout: GridProps;
export declare const oldContentGridP_layout: GridProps;
export declare const formContainerGridProps_newStyle_layout: GridProps;
export declare const formContainerGridProps_oldStyle_layout: GridProps;
export declare const MAP_ColorGroup: string[];
export declare const convertToNumber: (Obj: any, name: string) => any;
export declare const isEmpty: (obj: any) => boolean;
export declare const ellipsisText: (text: string, maxLength: number) => string;
//# sourceMappingURL=utils.d.ts.map