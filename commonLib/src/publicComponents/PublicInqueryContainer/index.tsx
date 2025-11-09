/**
 * 廖力编写
 * 模块名称：泛用型查询条件栏容器
 * 模块说明：可通过配置将查询条件组件放置于此容器内，用于快速组织查询条件组件的数据绑定和布局
 * 编写时间：2025-05-07 11:03:31 星期三
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import PublicInqueryItem, { IPublicInqueryItemprops as PublicInqueryItemProp } from "MithalCommonLibrary/PublicInqueryItem";
import { Button, Grid, Stack } from "@mui/material";
import FoldableInqueryContainer from "MithalCommonLibrary/FoldableInqueryContainer";
import toast from "react-hot-toast";
import useDebounce from "renderer/utils/debounceAdv2Hook";
import { useFormik } from "formik";

console.log("!------------>remote React.version:", React.version);

/**
 * 传入参数
 */
export interface IPublicInqueryContainerprops {
	//查询工具栏的组件通用容器
	items: PublicInqueryItemProp[];
	//表单组件
	formik: ReturnType<typeof useFormik>;
	//是否开启折叠
	enabledFoldable?: boolean;
	//折叠后显示的组件数量
	foldShowCount?: number;
	//默认状态
	defaultState?: "fold" | "unfold";
	//提交操作
	onSubmitButtonClick?: () => void;
	//重置
	onResetButtonClick?: () => void;
	//统一label（标题）的宽度
	labelWidth?: string | number;
	//是否托管提交
	isHandleSubmit?: boolean;
	//是否托管重置
	isHandleReset?: boolean;
	//是否自动检查错误
	isCheckError?: boolean;
	//提交/重置 节流器
	throttlingTime?: number;
}

//往外面暴露统一名称的属性对象，用于生成低代码平台属性JSON schema
export type Tinputprops = IPublicInqueryContainerprops;

const PublicInqueryContainer: FC<IPublicInqueryContainerprops> = ({
	//
	//查询工具栏的组件通用容器
	items,
	//表单组件
	formik,
	//是否开启折叠
	enabledFoldable = false,
	//折叠后显示的组件数量
	foldShowCount = 2,
	//默认状态
	defaultState = "fold",
	//提交操作
	onSubmitButtonClick = function () {},
	//重置
	onResetButtonClick = function () {},
	//统一label（标题）的宽度
	labelWidth = 120,
	//是否托管提交
	isHandleSubmit = false,
	//是否托管重置
	isHandleReset = false,
	//是否自动检查表单错误
	isCheckError = true,
	//提交/重置 节流器
	throttlingTime = 1000,
}): ReactElement => {
	//===============useHooks=================
	const throttlHook = useDebounce();
	const debounceFuncToast = useDebounce();

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [initialValues, setinitialValues] = useState<any>(null);

	//===============static===================

	//===============ref======================

	//===============function=================
	//附加属性
	const appendProps = function (itemProps: PublicInqueryItemProp) {
		if (typeof itemProps.formik === "undefined") {
			itemProps.formik = formik;
		}
		if (typeof itemProps.labelWidth === "undefined") {
			itemProps.labelWidth = labelWidth;
		}
		return itemProps;
	};

	//检查主formik的错误
	const checkFormikError = function () {
		if (formik.errors) {
			for (let i in formik.errors) {
				if (formik.errors.hasOwnProperty(i)) {
					toast.error(("查询条件:" + formik.errors[i]) as string);
					return false;
				}
			}
		}
		return true;
	};
	const reset = function () {
		formik.setValues(initialValues);
		submit();
	};
	const submit = function () {
		throttlHook(
			function () {
				/* 是否自动处理提交 */
				if (isHandleSubmit) {
					/* 是否检查错误 */
					if (isCheckError) {
						//检查没错再提交
						if (checkFormikError()) {
							formik.handleSubmit();
						}
					} else {
						//直接提交
						formik.handleSubmit();
					}
				} else {
					/* 是否检查错误 */
					if (isCheckError) {
						//检查没错再提交
						if (checkFormikError()) {
							onSubmitButtonClick();
						}
					} else {
						//直接提交
						onSubmitButtonClick();
					}
				}
			},
			throttlingTime,
			function () {
				debounceFuncToast(function () {
					toast.error("查询频率太高，请稍候重试..");
				}, 1000);
			}
		);
	};

	//===============effects==================
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted === false) {
				setIsMounted(true);
				setinitialValues(JSON.parse(JSON.stringify(formik.values)));
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
			<FoldableInqueryContainer
				/* 折叠时显示的组件 */
				foldContent={
					<>
						<Grid container={true} spacing={2}>
							{items.reduce(function (acc, item, index) {
								if (index < foldShowCount) {
									let _propItem = appendProps({ ...item });
									//折叠时仅显示两个组件
									//超小屏的时候组件独占一列
									//中屏以上的时候组件占两列
									_propItem.comGridProps = { item: true, xs: 12, md: 6 };
									delete _propItem.children;
									/* 使用组件公用容器装载组件并绑定数据 */
									acc.push(
										<React.Fragment key={index}>
											<PublicInqueryItem {..._propItem}>{item.children}</PublicInqueryItem>
										</React.Fragment>
									);
									return acc;
								}
								return acc;
							}, [] as ReactElement[])}
						</Grid>
					</>
				}
				/* 不折叠时显示的组件 */
				unfoldContent={
					<>
						<Grid container={true} spacing={2}>
							{items.reduce(function (acc, item, index) {
								let _propItem = appendProps({ ...item });
								delete _propItem.children;
								/* 使用组件公用容器装载组件并绑定数据 */
								acc.push(
									<React.Fragment key={index}>
										<PublicInqueryItem {..._propItem}>{item.children}</PublicInqueryItem>
									</React.Fragment>
								);
								return acc;
							}, [] as ReactElement[])}
						</Grid>
					</>
				}
				opreateButtons={
					<Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
						<Button
							onClick={function () {
								submit();
							}}
							variant="contained"
						>
							查询
						</Button>
						<Button
							onClick={function () {
								throttlHook(
									function () {
										if (isHandleReset) {
											reset();
										} else {
											onResetButtonClick();
										}
									},
									throttlingTime,
									function () {
										debounceFuncToast(function () {
											toast.error("重置频率太高，请稍候重试..");
										}, 1000);
									}
								);
							}}
							variant="outlined"
						>
							重置
						</Button>
					</Stack>
				}
				enabled={enabledFoldable}
				defaultState={defaultState}
			/>
		</>
	);
};
//为防止在编译和混淆后，无法识别组件名称，所以在这里显示定义名称
PublicInqueryContainer.displayName = "PublicInqueryContainer";
export default PublicInqueryContainer;

/* 
	组件使用示例：
			<PublicInqueryContainer
				items={[
					{
						label: "资产名称",
						name: "name",
						children: <MithrilInput />,
					},
					{
						label: "承包人",
						name: "lastContractor",
						children: <MithrilInput />,
					},
					{
						label: "登记时间",
						name: ["createByTimeSt", "createByTimeEt"],
						dateFormat: "YYYY-MM-DD HH:mm:ss",
						children: <AntdDateRangePacker showTime={true} allowClear={true} />,
					},
					{
						label: "土地价值",
						name: ["minValue", "maxValue"],
						children: <NumberRangeInput splitStr="至" />,
					},
					{
						label: "利用现状类型",
						name: "statusTypeId",
						selectItems: dynSelections.selections.statusTypeArr,
						children: <MithrilSelect />,
					},
					{
						label: "承包期限",
						name: ["lastContractSt", "lastContractEt"],
						dateFormat: "YYYY-MM-DD",
						children: <AntdDateRangePacker allowClear={true} />,
					},
					{
						label: "土地类型",
						name: "landType",
						selectItems: landTypeSelectItems,
						children: <MithrilSelect />,
					},
				]}
				
				formik={formik}
				
				enabledFoldable={true}
			
				defaultState={"fold"}
				
				isHandleSubmit={true}
				
				isHandleReset={true}
			/>
*/
