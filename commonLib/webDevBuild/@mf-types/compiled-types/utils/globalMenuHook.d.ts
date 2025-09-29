/**
 * 廖力编写
 * 模块名称：系统菜单数据全局单例模式
 * 模块说明：
 * 编写时间：
 */
import React, { ReactElement, FC } from "react";
export type TGlobalMenuHookReturnType = ReturnType<typeof useGlobalMenuDataHook>;
export interface IMenuTreeData {
    msg: string;
    code: number;
    data: Array<IMenuDataItem>;
}
export interface IMenuDataItem {
    pageNum?: number;
    pageSize?: number;
    createById?: number;
    createBy?: string;
    createByTime?: Date;
    updateById?: number;
    updateBy?: string;
    updateByTime?: Date;
    params?: any;
    id?: number;
    name?: string;
    parentId?: number;
    sort?: number;
    frontPath?: string;
    backPath?: string;
    type?: string;
    status?: string;
    perms?: string;
    icon?: string;
    systemId?: number;
    checked?: boolean;
    menuChildren?: Array<IMenuDataItem>;
    isSelected?: boolean;
    visible?: boolean;
}
export interface IpathItem {
    path: string;
    name: string;
}
export interface IuseGlobalMenuDataHookProps {
    /**
     * 用于保持本地状态用的localstorage的名称
     */
    menuLocalStorageName: string;
    /**
     * 用于加载菜单数据的函数
     */
    loadMenuDataFunc?: () => IMenuTreeData | Promise<IMenuTreeData>;
    /**
     * 是否有顶部横向菜单
     */
    isHaveTopMenu: boolean;
    /**
     * 是否已经登录
     */
    isLoggedIn: boolean;
    isStrect?: boolean;
}
export declare const useGlobalMenuDataHook: ({ menuLocalStorageName, loadMenuDataFunc, isHaveTopMenu, isLoggedIn, isStrect, }: IuseGlobalMenuDataHookProps) => {
    isMounted: boolean;
    selectedMenu: IMenuDataItem;
    defaultPage: React.RefObject<string>;
    clickForder: (id: number, isOpen: boolean) => void;
    clickMenu: (id: number, isSelected: boolean) => void;
    menuData: IMenuTreeData;
    chooseTopMenu: (id: any) => void;
    menuChangestamp: number;
    navPathArr: IpathItem[];
    menuHashTable: {
        [key: string]: IMenuDataItem;
    };
};
/**
 * 创建一个需要全局使用的context
 **/
export declare const GlobalMenuDataContext: React.Context<{
    isMounted: boolean;
    selectedMenu: IMenuDataItem;
    defaultPage: React.RefObject<string>;
    clickForder: (id: number, isOpen: boolean) => void;
    clickMenu: (id: number, isSelected: boolean) => void;
    menuData: IMenuTreeData;
    chooseTopMenu: (id: any) => void;
    menuChangestamp: number;
    navPathArr: IpathItem[];
    menuHashTable: {
        [key: string]: IMenuDataItem;
    };
}>;
/**
 * 给子节点使用的context
 * @returns
 */
export declare const useGlobalMenuDataContext: () => TGlobalMenuHookReturnType;
/**
 * 传入参数
 */
export interface IGlobalMenuDataProviderProps {
    children: ReactElement | ReactElement[] | undefined | null;
    /**
     * 用于保持本地状态用的localstorage的名称
     */
    menuLocalStorageName: string;
    /**
     * 用于加载菜单数据的函数
     */
    loadMenuDataFunc?: () => IMenuTreeData | Promise<IMenuTreeData>;
    /**
     * 是否有顶部横向菜单
     */
    isHaveTopMenu: boolean;
    /**
     * 是否已经登录
     */
    isLoggedIn: boolean;
    isStrect?: boolean;
}
/**
 * 数据提供器
 */
declare const DAGlobalMenuDataProviderLayout: FC<IGlobalMenuDataProviderProps>;
export default DAGlobalMenuDataProviderLayout;
//# sourceMappingURL=globalMenuHook.d.ts.map