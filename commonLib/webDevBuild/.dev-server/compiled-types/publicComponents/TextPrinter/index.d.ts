export type Tinputprops = {
    _value?: string;
    _isAnimate?: boolean;
    _hideCursor?: boolean;
    _time?: number;
    _delayTime?: number;
};
/**
 * 逐字打印文本组件
 *
 * @param _value - 要打印的文本内容，非必填，默认为空字符串
 * @param _isAnimate - 是否启用动画效果（逐字符显示），默认为 true
 * @param _hideCursor - 打印完成后是否隐藏闪烁光标，默认为 false
 * @param _time - 打印动画总时长，单位毫秒，默认为 800
 * @param _delayTime - 动画开始前的延迟时长，单位毫秒，默认为 0
 */
declare const TextPrinter: {
    ({ _value, _isAnimate, _hideCursor, _time, _delayTime }: Tinputprops): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export default TextPrinter;
//# sourceMappingURL=index.d.ts.map