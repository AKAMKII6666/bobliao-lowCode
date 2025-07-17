/**
 * 廖力编写
 * 模块名称：
 * 模块说明：
 * 编写时间：
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import { Box, Button, Divider, Grid, MenuItem, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
/**
 * 传入参数
 */
export interface iprops {}

const TestPage: FC<iprops> = (): ReactElement => {
	//===============useHooks=================

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [isOpenWindow1, setisOpenWindow1] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	//===============static===================
	const creditLevelArr = [
		{ label: "C", value: "0" },
		{ label: "B", value: "1" },
		{ label: "A", value: "2" },
		{ label: "AA", value: "3" },
		{ label: "AAA", value: "4" },
	];

	const columns: GridColDef<any>[] = [
		// @ts-ignore
		{
			field: "index",
			headerName: "",
			align: "center",
			flex: 1 / 10,
			renderCell: (params: any) => {
				return params.row.index + 1;
			},
		},
		{ field: "taskName", headerName: "日结任务", align: "left", flex: 5 / 10 },
		{
			field: "status",
			headerName: "状态",
			align: "left",
			flex: 2 / 10,
			renderCell: (params: any) => {
				return "已完成";
			},
		},
		{
			field: "",
			headerName: "操作",
			align: "left",
			flex: 2 / 10,
			renderCell: (params: any) => {
				return (
					<Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} width={"100%"}>
						<Button color="primary" onClick={() => {}} sx={{ padding: 1 }} variant="text">
							查看
						</Button>
					</Box>
				);
			},
		},
	];

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
			<Grid container spacing={4}></Grid>
		</>
	);
};
export default TestPage;
