/**
 * 廖力编写
 * 模块名称：用于托管查询条件状态的钩子
 * 模块说明：使用这个钩子定义查询条件，将会在浏览器地址栏里创建相应的url参数以保持页面状态
 * 			注意，暂时不支持对象，数组
 * 编写时间：2025-05-22 10:19:49 星期四
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

/**
 * 用于托管查询条件状态的钩子
 * 使用这个钩子定义查询条件，将会在浏览器地址栏里创建相应的url参数以保持页面状态,注意，暂时不支持对象，数组.
 * @param defaultValues 默认值
 * @returns  [getter,setter]
 */
const useInqueryState = function <T = any>(defaultValues: T): [T, React.Dispatch<React.SetStateAction<T>>] {
	//===============useHooks=================
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const location = useLocation();
	//从url参数里将值覆盖到默认值
	for (var i in defaultValues) {
		if (defaultValues.hasOwnProperty(i)) {
			let value = searchParams.get(i);
			if (value !== null) {
				defaultValues[i] = value as any;
			}
		}
	}

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [inqueryValues, setinqueryValues] = useState<T>(defaultValues);

	//===============static===================

	//===============ref======================

	//===============function=================
	const updateUrlParams = () => {
		const searchParams = new URLSearchParams(location.search);
		for (var i in inqueryValues) {
			if (inqueryValues.hasOwnProperty(i) && typeof inqueryValues[i] !== "undefined" && inqueryValues[i] !== null && inqueryValues[i] !== "") {
				searchParams.set(i, inqueryValues[i] as any);
			} else {
				searchParams.delete(i);
			}
		}

		navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
	};

	//===============effects==================
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted === false) {
				setIsMounted(true);
			}
		},
		[isMounted]
	);

	useEffect(function (): ReturnType<React.EffectCallback> {
		return function (): void {
			setIsMounted(false);
		};
	}, []);

	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted) {
				updateUrlParams();
			}
		},
		[inqueryValues, isMounted]
	);

	return [
		/**
		 * 查询参数
		 */
		inqueryValues,
		/**
		 * 设置查询参数
		 */
		setinqueryValues,
	];
};
export default useInqueryState;
