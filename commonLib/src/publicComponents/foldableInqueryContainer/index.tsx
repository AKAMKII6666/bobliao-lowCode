/**
 * 廖力编写
 * 模块名称：可折叠的查询框容器
 * 模块说明：
 * 编写时间：
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import styles from "./index.module.scss";
import { Box, Grid, Tooltip } from "@mui/material";
import { Divider } from "antd";

/**
 * 传入参数
 */
export interface iprops {
	/* 折叠时的内容 */
	foldContent: ReactElement | ReactElement[] | undefined | null;
	/* 展开后的内容 */
	unfoldContent: ReactElement | ReactElement[] | undefined | null;
	/* 操作按钮 */
	opreateButtons: ReactElement | ReactElement[] | undefined | null;
	/* 默认折叠还是不折叠 */
	defaultState?: "fold" | "unfold";
	/* 是否启用折叠功能 */
	enabled?: boolean;
}

//往外面暴露统一名称的属性对象，用于生成低代码平台属性JSON schema
export type Tinputprops = iprops;

const FoldableInqueryContainer: FC<iprops> = ({ foldContent, unfoldContent, opreateButtons, defaultState = "fold", enabled = true }): ReactElement => {
	//===============useHooks=================

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [isFold, setisFold] = useState<boolean>(defaultState === "fold" ? true : false);

	//===============static===================
	const inqueryItemGridSize_fold_left = {
		item: true,
		xl: 9,
		lg: 9,
		md: 9,
		sm: 12,
		xs: 12,
	};
	const inqueryItemGridSize_fold_right = {
		item: true,
		xl: 3,
		lg: 3,
		md: 3,
		sm: 12,
		xs: 12,
	};
	const inqueryItemGridSize_unfold_left = {
		item: true,
		xl: 12,
		lg: 12,
		md: 12,
		sm: 12,
		xs: 12,
	};
	const inqueryItemGridSize_unfold_right = {
		item: true,
		xl: 12,
		lg: 12,
		md: 12,
		sm: 12,
		xs: 12,
	};

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

	return (
		<>
			{(function () {
				if (isFold && enabled) {
					return (
						<>
							<Box sx={{ p: 3 }}>
								<Grid container={true} spacing={2}>
									<Grid {...inqueryItemGridSize_fold_left}>{foldContent}</Grid>
									<Grid {...inqueryItemGridSize_fold_right}>{opreateButtons}</Grid>
								</Grid>
							</Box>
						</>
					);
				}
				return (
					<>
						<Box sx={{ p: 3 }}>{unfoldContent}</Box>
						<Box sx={{ pr: 3 }}>{opreateButtons}</Box>
					</>
				);
			})()}
			<div className={styles.divder} style={{ marginTop: "16px" }}></div>
			{(function () {
				if (enabled) {
					return (
						<div className={styles.expand} style={{ marginBottom: "16px" }}>
							{" "}
							<Tooltip title={isFold ? "展开" : "折叠"}>
								<label
									className={(function () {
										if (isFold) {
											return styles.fold;
										}
										return "";
									})()}
									onClick={function () {
										setisFold(!isFold);
									}}
								></label>
							</Tooltip>
						</div>
					);
				}
				return null;
			})()}
		</>
	);
};
//为防止在编译和混淆后，无法识别组件名称，所以在这里显示定义名称
FoldableInqueryContainer.displayName = "FoldableInqueryContainer";
export default FoldableInqueryContainer;
