/**
 * 廖力编写
 * 模块名称：
 * 模块说明：
 * 编写时间：
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import styles from "./index.module.scss";
import { coordXY } from "renderer/lcSupport/interface/renderer";
import Textarea from "@mui/joy/Textarea";
import { CssVarsProvider } from "@mui/joy/styles";
import useJquery from "@bobliao/use-jquery-hook";

/**
 * 传入参数
 */
export interface iprops {
	/* 是否打开 */
	isOpen: boolean;
	/* 设置是否打开 */
	setisOpen: (val: boolean) => void;
	/* 用户输入的布局生成内容 */
	chatInputContent: string;
	/* 设置用户输入的布局生成内容 */
	setchatInputContent: (val: string) => void;
	/* 当前窗口点击的位置 */
	chatWindowPosition: coordXY;
	/* 提交生成布局的函数 */
	submitLayout: () => void;
}

const ChatWindow: FC<iprops> = (
	{
		//
		isOpen,
		setisOpen,
		chatInputContent,
		setchatInputContent,
		chatWindowPosition,
		submitLayout,
	},
	_ref
): ReactElement => {
	//===============useHooks=================
	const $ = useJquery();

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);

	//===============static===================

	//===============ref======================
	const containerRef = useRef<HTMLDivElement>(null);

	//===============function=================
	/* esc退出 */
	const escExit = function (e) {
		if (e.key === "Escape") {
			setisOpen(false);
		}
	};
	const bindEscExit = function () {
		document.addEventListener("keydown", function (e) {
			escExit(e);
		});
	};
	const unbindEscExit = function () {
		document.removeEventListener("keydown", escExit);
	};

	//===============effects==================
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted === false) {
				setIsMounted(true);
				bindEscExit();
			}
		},
		[isMounted]
	);

	useEffect(function (): ReturnType<React.EffectCallback> {
		return function (): void {
			setIsMounted(false);
			unbindEscExit();
		};
	}, []);

	return (
		<>
			{(function () {
				if (isOpen) {
					return (
						<>
							<div className={styles.eventBlockbackground} onClick={() => setisOpen(false)}></div>
							<div
								ref={containerRef}
								className={styles.inputContainer}
								style={{
									bottom: $(window).height() - 45 - chatWindowPosition.y + "px",
									left:
										(function () {
											let left = chatWindowPosition.x + 45;
											if (left + $(containerRef.current).width() > $(window).width()) {
												return $(window).width() - $(containerRef.current).width();
											}
											return left;
										})() + "px",
								}}
							>
								<div className={styles.inputContainer_input}>
									<CssVarsProvider>
										<Textarea
											maxRows={8}
											placeholder="在这里告诉我您想要什么布局"
											value={chatInputContent}
											className={styles.inputContainer_input_textarea}
											onChange={(e) => setchatInputContent(e.target.value)}
										/>
									</CssVarsProvider>
								</div>
								<div className={styles.inputContainer_buttoncontainer}>
									<div className={styles.inputContainer_buttoncontainer_button} onClick={submitLayout}>
										开始生成
									</div>
								</div>
							</div>
						</>
					);
				}
				return null;
			})()}
		</>
	);
};
export default ChatWindow;
