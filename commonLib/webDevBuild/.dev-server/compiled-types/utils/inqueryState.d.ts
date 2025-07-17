/**
 * 廖力编写
 * 模块名称：用于托管查询条件状态的钩子
 * 模块说明：使用这个钩子定义查询条件，将会在浏览器地址栏里创建相应的url参数以保持页面状态
 * 			注意，暂时不支持对象，数组
 * 编写时间：2025-05-22 10:19:49 星期四
 */
import React from "react";
/**
 * 用于托管查询条件状态的钩子
 * 使用这个钩子定义查询条件，将会在浏览器地址栏里创建相应的url参数以保持页面状态,注意，暂时不支持对象，数组.
 * @param defaultValues 默认值
 * @returns  [getter,setter]
 */
declare const useInqueryState: <T = any>(defaultValues: T) => [T, React.Dispatch<React.SetStateAction<T>>];
export default useInqueryState;
//# sourceMappingURL=inqueryState.d.ts.map