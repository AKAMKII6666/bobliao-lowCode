/**
 * 数字滚动器
 * 廖力编写
 * 2022/04/11
 */
import { FC } from "react";
/**
 * 传入参数
 */
export interface Iprops {
    /**
     * 传入数字
     * 或"loadding"
     */
    _value: number | string | void;
    /**
     * 是否千分位分割
     */
    _isSplit?: boolean;
    /**
     * 是否缓动
     */
    _isAnimate?: boolean;
    /**
     * 缓动时间
     */
    _delay?: number;
    /**
     * 保留小数点
     */
    _fix?: number;
    _isAutoWidth?: boolean;
    pureString?: boolean;
    onChange?: (val: string) => void;
}
export type Tinputprops = Iprops;
declare const NumberRoller: FC<Iprops>;
export default NumberRoller;
//# sourceMappingURL=index.d.ts.map