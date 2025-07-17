import { createContext, useState, useContext, useRef, useCallback, useEffect, FC, ReactElement } from "react";

/**
 * 防抖钩子
 */
const useDebounce = function () {
	/**
	 * ============================state===========================
	 */
	const [isMounted, setIsMounted] = useState<boolean>(false);

	const debounceFunction = useRef<(() => void) | null>(null);
	const debounceTimeOut = useRef<NodeJS.Timeout | null>(null);

	/**
	 * ==========================函数==============================
	 */

	const debounce = function (_func: () => void, _time: number, _funcVoid?: () => void) {
		if (typeof _time === "undefined") {
			_time = 500;
		}
		if (_time === 0) {
			_func();
			return;
		}

		if (debounceTimeOut.current === null) {
			debounceFunction.current = _func;
			_func();
		} else {
			clearTimeout(debounceTimeOut.current);
			if(typeof _funcVoid !== "undefined"){
				_funcVoid();
			}
		}
		debounceTimeOut.current = setTimeout(function () {
			debounceFunction.current = null;
			debounceTimeOut.current = null;
		}, _time);
	};

	/**
	 * ==================================Effects===============================
	 */
	useEffect(function (): ReturnType<React.EffectCallback> {
		if (isMounted === false) {
			setIsMounted(true);
		}
		return function (): void {
			setIsMounted(false);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return debounce;
};

export default useDebounce;
