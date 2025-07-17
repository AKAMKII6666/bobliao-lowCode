import { IdynState } from "MithalCommonLibrary/PublicInqueryItem";
export interface IselectionItem {
    /**用于展示的名称 */
    label: string;
    /**用于提交的值 */
    value: string;
    /**数据行，包含所有的数据 */
    dataRow?: any;
}
/**
 * 传入参数
 */
export interface IDynamicSelectionsParamsProp {
    /**
     * 给选项列表命名
     * 这个名字是用来在外部获取选项列表的
     * 例如：selections.name1
     */
    name: string;
    /**
     * _depParams :{params1:"value",params2:"value"}
     * 获取选项列表的函数，用于进行异步接口访问来获取选项
     * @param value { [property: string]: any }
     * @returns IselectionItem[]
     */
    fetchFunction: (value: {
        [property: string]: any;
    }) => IselectionItem[] | Promise<IselectionItem[]> | undefined | null;
    /**
     * 依赖项目，依赖于外部的formik的值
     * 如果某个formik中的值发生了变化，那么就会触发这个选项的重新获取，并将变化的值传入fetchFunction,方便参数列表的再获取
     * 可以不填写，不填写的话就表示不依赖于外部的formik的值，fetchFunction只会在初始化的时候被调用一次
     * ["params1","params2"]
     */
    depParams?: string[];
    /**
     * 是否每次都根据依赖强制更新
     */
    forceUpdate?: boolean;
}
declare const useDynamicSelectionsParams: (DSPProps: IDynamicSelectionsParamsProp[]) => {
    updateFormikValues: (_values: {
        [property: string]: any;
    }) => void;
    forceUpdateFormikValues: (_values: {
        [property: string]: any;
    }) => void;
    selections: {
        [property: string]: IselectionItem[];
    };
    selectionsUpdateStamp: number;
    currentFormikValues: {
        [property: string]: any;
    };
    selectionsState: {
        [property: string]: IdynState;
    };
    forceReload: () => Promise<void>;
};
export default useDynamicSelectionsParams;
//# sourceMappingURL=dynamicSelectionsParamsHook.d.ts.map