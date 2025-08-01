/**
 * 廖力编写
 * 模块名称：
 * 模块说明：
 * 编写时间：
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import styles from "./index.module.scss";
import { useRendererDataContext } from "renderer/lcSupport/renderer";
import useJquery from "@bobliao/use-jquery-hook";
import StopCircleIcon from "@mui/icons-material/StopCircle";

/**
 * 传入参数
 */
export interface iprops {}

const layoutGenLay: FC<iprops> = ({}, _ref): ReactElement => {
	//===============useHooks=================
	const renderData = useRendererDataContext();
	const $ = useJquery();
	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);

	//===============static===================

	//===============ref======================
	const maincontainerRef = useRef<HTMLDivElement>(null);
	//===============function=================

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

	return (
		<>
			<div className={styles.background}>
				<div className={styles.maincontainer} ref={maincontainerRef}>
					<div className={styles.headTitle}>BobBot正在为您生成布局结构，请稍等 ...</div>
					<div className={styles.userInput}>
						<div className={styles.userInputTitle}>您说:</div>
						<div className={styles.userInputContent}>{renderData.userInput}</div>
					</div>
				</div>
				<div
					className={styles.aiResult}
					style={{
						maxHeight: $(window).outerHeight() - maincontainerRef.current?.clientHeight - 200 + "px",
					}}
				>
					<div className={styles.userInputTitle}>正在为您布局中：</div>
					<div className={styles.userInputContent}>{renderData.generatingContent}</div>
				</div>
				<div className={styles.stopButtonContainer}>
					<div className={styles.stopButton} onClick={renderData.stopGenerateLayout}>
						<StopCircleIcon></StopCircleIcon>
						停止生成
					</div>
				</div>
			</div>
		</>
	);
};
export default layoutGenLay;
