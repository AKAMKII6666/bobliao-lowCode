import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, ReactElement } from "react";
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

export const useDynState = function <T>(
	//
	defaultValue: T,
	config: {
		//数据加载的函数
		loadDataFuncton?: (props: IloadDataFunction<T>) => void;
		//是否开启数据轮询
		isEnablePolling: boolean;
		//轮询每次间隔时间
		pollDelay: number;
	} = {
		loadDataFuncton: undefined,
		isEnablePolling: false,
		pollDelay: 0,
	}
) {
	//===============state====================
	const [isMounted, setisMounted] = useState<boolean>(false);
	//状态本身
	const [_state, set_state] = useState<T>(defaultValue);
	//设置次数
	const [_setTimes, set_setTimes] = useState<number>(-1);
	//设置上次更新时间
	const [_stamp, set_stamp] = useState<number>(-1);
	//是否正在载入
	const [_isLoading, set_isLoading] = useState<boolean>(false);
	//是否完成载入
	const [_loadingState, set_loadingState] = useState<TloadingState>("unstarted");
	//错误信息
	const [_errorMessage, set_errorMessage] = useState<string>("none");

	//===============static===================

	//===============ref======================
	const loadFunction = useRef<((props: IloadDataFunction<T>) => void) | undefined>(config.loadDataFuncton);
	const reloadFunctionRef = useRef<(props: IloadDataFunction<T>) => void>(function () {});

	//===============function=================
	const _setState = function (_value: T | ((_value: T) => T)): void {
		set_state(_value);
		set_setTimes(function (value) {
			return value++;
		});
		set_stamp(+new Date());
		set_isLoading(false);
	};

	const _setLoading = function (_value: boolean): void {
		set_isLoading(_value);
	};

	const _resetState = function (): void {
		set_state(defaultValue);
		set_setTimes(-1);
		set_stamp(-1);
		set_isLoading(false);
		set_loadingState("unstarted");
		set_errorMessage("none");
	};

	const _set_loadingState = function (value: TloadingState) {
		switch (value) {
			case "unstarted":
				set_isLoading(false);
				break;
			case "padding":
				set_isLoading(true);
				break;
			case "finished":
				set_isLoading(false);
				break;
			case "finished nulldata":
				set_isLoading(false);
				break;
			case "finished error":
				set_isLoading(false);
				break;
			default:
				set_isLoading(false);
				break;
		}
		set_loadingState(value);
	};

	const _setLoadFunction = function (loadDataFunction: (props: IloadDataFunction<T>) => void) {
		loadFunction.current = loadDataFunction;
	};

	const _setReloadFunction = function (reloadFunction: (props: IloadDataFunction<T>) => void) {
		reloadFunctionRef.current = reloadFunction;
	};

	/**
	 * 为当前状态加载数据
	 * @returns void
	 */
	const LoadData = function () {
		if (typeof loadFunction.current === "undefined") {
			return;
		}
		loadFunction.current({
			/**
			 * 值
			 */
			val: _state,
			/**
			 * 设置值
			 */
			set: _setState,
			/**
			 * 设置是否正在载入
			 */
			setisLoading: _setLoading,
			/**
			 * 设置当前这个数据的加载状态
			 */
			setloadingState: _set_loadingState,
			/**
			 * 这个状态是否正在载入
			 */
			isLoading: _isLoading,
			/**
			 * 这个状态当前的载入状态
			 *  "unstarted" | "padding" | "finished" | "finished nulldata" | "finished error"
			 */
			loadingState: _loadingState,
			/**
			 * 这个状态被设置了多少次
			 */
			setTimes: _setTimes,
			/**
			 * 这个状态最近一次被更改的时间戳
			 */
			stamp: _stamp,
			/**
			 * 错误信息
			 */
			errorMessage: _errorMessage,
			/**
			 * 设置错误信息
			 */
			seterrorMessage: set_errorMessage,
		});
	};

	/**
	 * 重新载入的函数定义
	 */

	const reloadData = function () {
		reloadFunctionRef.current({
			/**
			 * 值
			 */
			val: _state,
			/**
			 * 设置值
			 */
			set: _setState,
			/**
			 * 设置是否正在载入
			 */
			setisLoading: _setLoading,
			/**
			 * 设置当前这个数据的加载状态
			 */
			setloadingState: _set_loadingState,
			/**
			 * 这个状态是否正在载入
			 */
			isLoading: _isLoading,
			/**
			 * 这个状态当前的载入状态
			 *  "unstarted" | "padding" | "finished" | "finished nulldata" | "finished error"
			 */
			loadingState: _loadingState,
			/**
			 * 这个状态被设置了多少次
			 */
			setTimes: _setTimes,
			/**
			 * 这个状态最近一次被更改的时间戳
			 */
			stamp: _stamp,
			/**
			 * 错误信息
			 */
			errorMessage: _errorMessage,
			/**
			 * 设置错误信息
			 */
			seterrorMessage: set_errorMessage,
		});
	};

	//===============effects==================

	useEffect(function (): ReturnType<React.EffectCallback> {
		if (isMounted === false) {
			setisMounted(true);
		}
		return function () {
			setisMounted(false);
		};
	}, []);

	//轮询功能
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (config.isEnablePolling === false || isMounted === false) {
				return;
			}
			if (
				_stamp !== -1 &&
				_isLoading === false &&
				(_loadingState === "finished" || _loadingState === "finished error" || _loadingState === "finished nulldata")
			) {
				setTimeout(async function () {
					let ismounted = await new Promise(function (_res) {
						setisMounted(function (value) {
							_res(value);
							return value;
						});
					});
					if (ismounted) {
						reloadData();
					}
				}, config.pollDelay);
			}
		},
		[_stamp]
	);

	return {
		/**
		 * 值
		 */
		val: _state,
		/**
		 * 设置值
		 */
		set: _setState,
		/**
		 * 触发数据载入函数bindLoader里绑定的函数
		 */
		load: LoadData,
		/* 重新载入 */
		reload: reloadData,
		/**
		 * 这个状态被更改的次数
		 */
		setTimes: _setTimes,
		/**
		 * 这个状态最近一次被更改的时间戳
		 */
		stamp: _stamp,
		/**
		 * 这个状态是否正在载入
		 */
		isLoading: _isLoading,
		/**
		 * 这个状态当前的载入状态
		 *  "unstarted" | "padding" | "finished" | "finished nulldata" | "finished error"
		 */
		loadingState: _loadingState,
		setLoadingState: _set_loadingState,
		/**
		 * 设置加载数据的函数
		 */
		bindLoader: _setLoadFunction,
		/**
		 * 配置重新载入的函数
		 */
		bindReloader: _setReloadFunction,
		/**
		 * 错误信息
		 */
		errorMessage: _errorMessage,
		/**重置状态 */
		reset: _resetState,
	};
};
