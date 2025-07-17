export type TloadingState = "unstarted" | "padding" | "finished" | "finished nulldata" | "finished error";
/**
 * 廖力编写
 * 模块名称：动态数据状态钩子
 * 模块说明：专门用来管理动态数据的钩子，定义一个状态的同时，定义它的数据的载入状态
 * 编写时间：2024年8月5日 03:44:00
 */
export interface IloadDataFunction<T> {
    /**
     * 值
     */
    val: T;
    /**
     * 设置值
     */
    set: (_value: T | ((_value: T) => T)) => void;
    /**
     * 设置是否正在载入
     */
    setisLoading: (_value: boolean) => void;
    /**
     * 设置当前这个数据的加载状态
     */
    setloadingState: (_value: TloadingState) => void;
    /**
     * 设置错误信息
     */
    seterrorMessage: (_value: string) => void;
    /**
     * 这个状态是否正在载入
     */
    isLoading: boolean;
    /**
     * 这个状态当前的载入状态
     *  "unstarted" | "padding" | "finished" | "finished nulldata" | "finished error"
     */
    loadingState: TloadingState;
    /**
     * 这个状态被设置了多少次
     */
    setTimes: number;
    /**
     * 这个状态最近一次被更改的时间戳
     */
    stamp: number;
    /**
     * 错误信息
     */
    errorMessage: string;
}
export declare const useDynState: <T>(defaultValue: T, config?: {
    loadDataFuncton?: (props: IloadDataFunction<T>) => void;
    isEnablePolling: boolean;
    pollDelay: number;
}) => {
    /**
     * 值
     */
    val: T;
    /**
     * 设置值
     */
    set: (_value: T | ((_value: T) => T)) => void;
    /**
     * 触发数据载入函数bindLoader里绑定的函数
     */
    load: () => void;
    reload: () => void;
    /**
     * 这个状态被更改的次数
     */
    setTimes: number;
    /**
     * 这个状态最近一次被更改的时间戳
     */
    stamp: number;
    /**
     * 这个状态是否正在载入
     */
    isLoading: boolean;
    /**
     * 这个状态当前的载入状态
     *  "unstarted" | "padding" | "finished" | "finished nulldata" | "finished error"
     */
    loadingState: TloadingState;
    setLoadingState: (value: TloadingState) => void;
    /**
     * 设置加载数据的函数
     */
    bindLoader: (loadDataFunction: (props: IloadDataFunction<T>) => void) => void;
    /**
     * 配置重新载入的函数
     */
    bindReloader: (reloadFunction: (props: IloadDataFunction<T>) => void) => void;
    /**
     * 错误信息
     */
    errorMessage: string;
    /**重置状态 */
    reset: () => void;
};
//# sourceMappingURL=dynStateHook.d.ts.map