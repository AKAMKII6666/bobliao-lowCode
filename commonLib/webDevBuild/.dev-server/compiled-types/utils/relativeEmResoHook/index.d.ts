/**
 * 廖力编写
 * 模块名称：相对容器的resohook
 * 模块说明：用这个钩子的时候要注意，父容器的任何fontSize的设置都会影响子容器的em相对大小，
 * 在这个组件下的所有结构如果有文字的话就单独给文字套一个设置字体大小的父节点，而不是给n个子节点设置字体大小，会产生奇怪的副作用
 * 编写时间：2024年9月5日 22:12:19
 */
import React, { ReactElement, FC } from "react";
export type TRelativeEmResoHookHookReturnType = ReturnType<typeof useRelativeEmResoHookDataHook>;
export type IRelativeEmResoHookHookReturnType = ReturnType<typeof useRelativeEmResoHookDataHook>;
export type TadjestType = "auto" | "width" | "height";
export interface IRelativeEmResoHookProps {
    fontSize: number;
    designWidth: number;
    designHeight: number;
    mode: TadjestType;
}
export declare const useRelativeEmResoHookDataHook: ({ fontSize, designWidth, designHeight, mode }: IRelativeEmResoHookProps) => {
    isMounted: boolean;
    updateContainerSize: (width: number, height: number) => void;
    currentFontSize: number;
    containerWidth: number;
    containerHeight: number;
    updateStamp: number;
};
/**
 * 创建一个需要全局使用的context
 **/
export declare const RelativeEmResoHookDataContext: React.Context<{
    isMounted: boolean;
    updateContainerSize: (width: number, height: number) => void;
    currentFontSize: number;
    containerWidth: number;
    containerHeight: number;
    updateStamp: number;
}>;
/**
 * 给子节点使用的context
 * @returns
 */
export declare const useRelativeEmResoHookDataContext: () => TRelativeEmResoHookHookReturnType;
/**
 * 传入参数
 */
export interface IRelativeEmResoHookDataProviderProps {
    className: string;
    fontSize: number;
    designWidth: number;
    designHeight: number;
    mode: TadjestType;
    debounceTime: number;
    children: ReactElement | ReactElement[] | undefined | null;
}
/**
 * 相对容器的resohook
 * 这个节点将生成一个div
 * 用于放置字体大小的计算结果
 * 这个节点之下的所有元素使用em布局将得到缩放效果
 * 用于一些比较苛刻的布局情况
 */
export declare const RelativeEmResoDiv: FC<IRelativeEmResoHookDataProviderProps>;
//# sourceMappingURL=index.d.ts.map