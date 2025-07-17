/**
 * 廖力编写
 * 模块名称：是否开关
 * 模块说明：
 * 编写时间： 2025-03-31
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import { Button, ButtonGroup } from "@mui/material";

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

//往外面暴露统一名称的属性对象，用于生成低代码平台属性JSON schema
export type Tinputprops = IMithrilYesNoSwitchProps;

const MithrilYesNoSwitch: FC<IMithrilYesNoSwitchProps> = ({
	enabled = true,
	yesStr = "是",
	noStr = "否",
	value = "0",
	onChange = function () {},
}): ReactElement => {
	//===============useHooks=================

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [curentValue, setcurentValue] = useState<boolean>(false);

	//===============static===================

	//===============ref======================

	//===============function=================
	const loadData = async function (): Promise<void> {};

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
				setcurentValue(function () {
					if (typeof value === "string") {
						return value === "0" ? true : false;
					}
					if (typeof value === "number") {
						return value === 0 ? true : false;
					}
					return value;
				});
			}
		},
		[isMounted, value]
	);

	return (
		<>
			<ButtonGroup disabled={!enabled} fullWidth sx={{ mt: "0", height: "40px" }} aria-label="status">
				<Button
					sx={{ width: "50%" }}
					onClick={() => {
						setcurentValue(true);
						onChange(true);
					}}
					color={curentValue ? "primary" : "secondary"}
					variant={curentValue ? "contained" : "outlined"}
					style={(function () {
						if (!enabled && curentValue === false) {
							return { background: "transparent", border: "1px solid rgba(242, 242, 242, 1)" };
						}
						if (!enabled && curentValue === true) {
							return { background: "rgba(242, 242, 242, 1)", border: "1px solid rgba(242, 242, 242, 1)" };
						}
						return {};
					})()}
				>
					{yesStr}
				</Button>
				<Button
					sx={{ width: "50%" }}
					onClick={() => {
						setcurentValue(false);
						onChange(false);
					}}
					color={!curentValue ? "primary" : "secondary"}
					variant={!curentValue ? "contained" : "outlined"}
					style={(function () {
						if (!enabled && curentValue === true) {
							return { background: "transparent", border: "1px solid rgba(242, 242, 242, 1)" };
						}
						if (!enabled && curentValue === false) {
							return { background: "rgba(242, 242, 242, 1)", border: "1px solid rgba(242, 242, 242, 1)" };
						}
						return {};
					})()}
				>
					{noStr}
				</Button>
			</ButtonGroup>
		</>
	);
};
//为防止在编译和混淆后，无法识别组件名称，所以在这里显示定义名称
MithrilYesNoSwitch.displayName = "MithrilYesNoSwitch";
export default MithrilYesNoSwitch;
