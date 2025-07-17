/**
 * 廖力编写
 * 模块名称：基于formComponentsContainer的自动布局和数据绑定组件
 * 模块说明：
 * 		为更方便快速进行布局和数据绑定，基于formComponentsContainer组件进行封装，
 * 配合publicDetailDataHook.ts可以进行更快速的布局和数据绑定，也为低代码建设提供更
 * 好的基础。
 * 		该组件的设计思路是：通过传入一个json对象，自动生成表单布局和数据绑定。
 * 编写时间：2025-05-19 09:54:55 星期一
 */
import { Grid, GridProps, Typography } from "@mui/material";
import { useFormik } from "formik";
import FormComponentsContainer, { IdynStateSetting, IFormComponentsContainerProps, Irectinfo } from "MithalCommonLibrary/formComponentsContainer";
import TextField, { ITextFieldProps } from "MithalCommonLibrary/TextField";
import CustomNumberInput, { NumberInputProps } from "MithalCommonLibrary/CustomNumberInput";
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement, useCallback } from "react";
import MithrilSelect, { IMithrilSelectProps } from "MithalCommonLibrary/select";
import MithrilAutocomplete, { IMithrilAutocompleteProps } from "MithalCommonLibrary/autocomplete";
import AntdDateRangePacker, { IAntdDateRangePackerProps } from "MithalCommonLibrary/antdDateRangePicker";
import NumberRangeInput, { NumberRangeInputProps } from "MithalCommonLibrary/numberRangeInput";
import MithrilTextArea, { EnhancedTextFieldProps } from "MithalCommonLibrary/textArea";
import MithrilYesNoSwitch, { IMithrilYesNoSwitchProps } from "MithalCommonLibrary/yes-no-switch";
import { formContainerGridProps_newStyle_layout, formContainerGridProps_oldStyle_layout } from "renderer/utils/utils";
import SingleDatePicker, { ISingleDatePickerProps } from "MithalCommonLibrary/SingleDatePicker";
import toast from "react-hot-toast";

//AutoFormComsMap的组件映射表
export const AutoFormComsMap = {
	TextField: TextField,
	CustomNumberInput: CustomNumberInput,
	MithrilSelect: MithrilSelect,
	MithrilAutocomplete: MithrilAutocomplete,
	AntdDateRangePacker: AntdDateRangePacker,
	NumberRangeInput: NumberRangeInput,
	MithrilTextArea: MithrilTextArea,
	MithrilYesNoSwitch: MithrilYesNoSwitch,
	SingleDatePicker: SingleDatePicker,
};

/* 
	组件项的配置
	总体配置继承于FormComponentsContainer
	但是因为本组件使用组件名称字符串表示组件而不是组件本身，
	所以总体和FormComponentsContainer的配置项不完全相同
*/
export interface IAutoFormItemProps extends Omit<IFormComponentsContainerProps, "children" | "mode" | "formik"> {
	/**
	 * 可选的 formik 对象，若未传入将使用 AutoForm 统一传入的 formik
	 */
	formik?: ReturnType<typeof useFormik<any>>;

	/**
	 * 表单模式（可选），若未设置则继承自 AutoForm
	 * - "add": 新增
	 * - "edit": 编辑
	 * - "watch": 只读查看
	 */
	mode?: "edit" | "add" | "watch";

	/**
	 * 组件的 children（可选），可以传入自定义组件函数用于替代 comType 指定的默认组件
	 */
	children?: any;

	/**
	 * 传递给组件的属性，支持多个组件属性联合类型
	 * 注意：字段会根据 comType 对应组件类型来决定具体使用哪些字段
	 */
	comProps?: ITextFieldProps &
		NumberInputProps &
		IMithrilSelectProps &
		IAntdDateRangePackerProps &
		IMithrilAutocompleteProps &
		EnhancedTextFieldProps &
		NumberRangeInputProps &
		ISingleDatePickerProps &
		IMithrilYesNoSwitchProps;

	/**
	 * 表单项使用的组件类型，必须是 AutoFormComsMap 中定义的组件名
	 * 例如：TextField、CustomNumberInput、MithrilSelect 等
	 */
	comType?: keyof typeof AutoFormComsMap;
}

/**
 * AutoForm 组件的参数定义
 */
export interface IAutoFormProps {
	/** 表单标题，可选，显示在表单最上方 */
	title?: string;

	/** Formik 实例，用于统一处理表单状态和数据绑定 */
	formik: ReturnType<typeof useFormik<any>>;

	/** 表单操作模式，可选，默认值为 "add"
	 * - "edit"：编辑模式
	 * - "add"：新增模式
	 * - "watch"：只读查看模式
	 */
	mode?: "edit" | "add" | "watch";

	/** 是否启用表单组件，默认为 true，传 false 可统一禁用所有组件 */
	enabled?: boolean;

	/** 表单中 label 部分的布局属性（MUI 的 GridProps） */
	labelGridProps?: GridProps;

	/** 表单中组件本体的布局属性（MUI 的 GridProps） */
	comGridProps?: GridProps;

	/** 整个表单容器的布局属性（MUI 的 GridProps） */
	formContainerGridProps?: GridProps;

	/** 表单布局风格设置，默认为 "newStyle"
	 * - "newStyle"：新系统的布局风格，label 和组件都可分别设置布局属性
	 * - "oldStyle"：老系统的布局风格，仅支持设置组件的布局属性，label 部分布局固定
	 */
	layoutStyle?: "newStyle" | "oldStyle";

	/** 表单项配置列表，每一项对应一个输入组件和其属性定义 */
	items: IAutoFormItemProps[];
	/**
	  是否在低代码编辑器内 
	  */
	isInLowCodeMode?: boolean;
	/**
	 * 强制更新rectinfo (isInLowCodeMode = true)才有效
	 */
	forceUpdateRectInfoStamp?: number;
	/**
	 * 设置每个组件的rect信息（x,y,width,height） (isInLowCodeMode = true)才有效
	 */
	reportRectInfo?: (index: number, value: Irectinfo) => void;
}

//往外面暴露统一名称的属性对象，用于生成低代码平台属性JSON schema
export type Tinputprops = IAutoFormProps;

const AutoForm: FC<IAutoFormProps> = ({
	//标题
	title,
	//给内部formComponentsContainer组件统一的formik对象
	formik,
	//给内部formComponentsContainer组件统一的状态对象
	mode = "add",
	//给内部formComponentsContainer组件统一的是否能编辑的状态
	enabled = true,
	//给内部formComponentsContainer组件统一的标题布局属性（muiGrid的属性）
	labelGridProps,
	//给内部formComponentsContainer组件统一的组件的布局属性（muiGrid的属性）
	comGridProps,
	//给内部formComponentsContainer组件统一的表单的布局属性（muiGrid的属性）
	formContainerGridProps,
	//布局风格设置
	//newStyle 对应新集运中土地资产详情那种布局风格
	// 	当配置为newStyle时，labelGridProps和comGridProps的属性均有效
	//oldStyle 对应老系统里的那种布局风格
	// 	当配置为oldStyle时，labelGridProps的属性无效,comGridProps的属性有效
	//默认为新风格布局样式
	layoutStyle = "newStyle",
	//组件列表
	items,
	isInLowCodeMode = false,
	forceUpdateRectInfoStamp = -1,
	reportRectInfo = (index: number, value: Irectinfo) => {},
}): ReactElement => {
	//===============useHooks=================

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);

	//===============static===================

	//===============ref======================

	//===============function=================
	/* 属性合并器 
		主要逻辑是进行属性合并
		但是：
		如果传入的属性中有值，则不进行覆盖
		如果传入的属性中没有值，则使用props进行覆盖
		props:被覆盖的属性
		p2:覆盖的属性
	*/
	const propsMerger = function (props, p2) {
		for (var i in props) {
			if (props.hasOwnProperty(i)) {
				let value = props[i];
				if (typeof (p2 as any)[i] === "undefined") {
					p2[i] = value;
				}
			}
		}
		return p2;
	};

	//获得组件渲染列表
	const getComList = function () {
		let result = [];
		let index = 0;
		for (let comPropsItem of items) {
			let ci = <>-</>;
			if (typeof comPropsItem.children !== "undefined") {
				ci = React.cloneElement(comPropsItem.children as ReactElement, comPropsItem.comProps || {});
			} else if (typeof AutoFormComsMap[comPropsItem.comType] !== "undefined") {
				let ChildrenItem = AutoFormComsMap[comPropsItem.comType] as any;
				ci = <ChildrenItem {...comPropsItem.comProps} />;
			} else {
				//组件无法渲染就报错并直接跳过这个组件的渲染
				ci = (
					<>
						AutoForm::组件无法渲染 - comType:{comPropsItem.comType} - children:{comPropsItem.children}
					</>
				);
				result.push(ci);
				continue;
			}
			let _comPropsItem = { ...comPropsItem };
			(function (_index) {
				delete _comPropsItem.comProps;
				delete _comPropsItem.comType;
				let nodeIndex = _index;
				let _reportRectInfo = reportRectInfo;
				//将用户配置到每个组件上的属性和统一的属性进行合并
				let props = propsMerger(
					{
						formik,
						mode,
						enabled,
						labelGridProps,
						comGridProps,
						layoutStyle,
						isInLowCodeMode,
						nodeIndex,
						reportRectInfo: _reportRectInfo,
						forceUpdateRectInfoStamp,
					},
					_comPropsItem
				);
				result.push(
					<React.Fragment key={index}>
						<FormComponentsContainer {...props}>{ci}</FormComponentsContainer>
					</React.Fragment>
				);
			})(index);
			index++;
		}
		return result;
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

	return (
		<>
			<Grid
				{...(function () {
					//有传入的布局属性就用传入的
					if (typeof formContainerGridProps !== "undefined") {
						return formContainerGridProps;
					}
					//如果是新布局样式
					if (layoutStyle === "newStyle") {
						return formContainerGridProps_newStyle_layout;
					}
					//那就是老布局样式了
					return formContainerGridProps_oldStyle_layout;
				})()}
				style={(function () {
					if (isInLowCodeMode && items.length === 0) {
						return {
							minHeight: "100px",
						};
					}
					return {};
				})()}
			>
				{/* 标题 */}
				{(function () {
					if (typeof title !== "undefined") {
						return (
							<Grid item xs={12}>
								<Typography variant="h3" gutterBottom>
									{title}
								</Typography>
							</Grid>
						);
					}
					return null;
				})()}
				{/* 制造组件列表 */}
				{getComList()}
			</Grid>
		</>
	);
};
export default AutoForm;
