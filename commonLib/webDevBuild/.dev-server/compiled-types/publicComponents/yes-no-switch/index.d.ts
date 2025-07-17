/**
 * 廖力编写
 * 模块名称：是否开关
 * 模块说明：
 * 编写时间： 2025-03-31
 */
import { FC } from "react";
/**
 * MithrilYesNoSwitch 组件属性接口
 */
export interface IMithrilYesNoSwitchProps {
    /**
     * 控件是否可用，false 时按钮禁用（无法切换），默认 true
     */
    enabled?: boolean;
    /**
     * “是”状态显示的文本，默认为 "是"
     */
    yesStr?: string;
    /**
     * “否”状态显示的文本，默认为 "否"
     */
    noStr?: string;
    /**
     * 当前开关值，可为 string、number 或 boolean：
     * - 字符串时，"0" 代表 true（是），其他代表 false（否）
     * - 数值时，0 代表 true，其它代表 false
     * - 布尔值时，直接对应真/假
     * 默认值为 "0"（是）
     */
    value?: string | number | boolean;
    /**
     * 值变化回调函数，当用户切换状态时触发
     * @param value - 切换后的新值，类型为 boolean（true 表示“是”，false 表示“否”）
     */
    onChange?: (value: string | number | boolean) => void;
}
export type Tinputprops = IMithrilYesNoSwitchProps;
declare const MithrilYesNoSwitch: FC<IMithrilYesNoSwitchProps>;
export default MithrilYesNoSwitch;
//# sourceMappingURL=index.d.ts.map