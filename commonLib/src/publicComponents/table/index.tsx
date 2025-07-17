import { Box, Divider } from "@mui/material";
import { PaginationProps, Table } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { ColumnType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import { Ref, forwardRef } from "react";
import { TableSticky } from "rc-table/lib/interface";

/**
 * MithrilAntdTableComponentProps 定义了 MithrilAntdTable 组件的所有可配置项
 */
export interface MithrilAntdTableComponentProps {
	/**
	 * 表格列配置，参考 Antd ColumnType API
	 */
	columns: ColumnType<any>[];

	/**
	 * 表格数据源数组，每个元素对应一行记录
	 */
	dataSource: any[];

	/**
	 * 数据总数，用于分页显示
	 * @default 10
	 */
	total?: number;

	/**
	 * 当前页码
	 * @default 1
	 */
	current?: number;

	/**
	 * 每页条数
	 * @default 10
	 */
	pageSize?: number;

	/**
	 * 顶部或底部的自定义 DOM 操作区域，如按钮组
	 */
	actionDOM?: React.ReactNode;

	/**
	 * 用于唯一标识行的 key，可以是字段名或通过回调生成
	 */
	rowKey?: string | ((record: any) => string | number);

	/**
	 * 高亮行的标识字段值，匹配 recordKey 后给该行添加选中样式
	 */
	rowId?: number | string;

	/**
	 * 用于判断高亮行的字段名，如 'id'
	 * @default ''
	 */
	recordKey?: string;

	/**
	 * 表格滚动配置，参考 Antd Table scroll API
	 */
	scroll?: any;

	/**
	 * 是否显示表格边框
	 * @default false
	 */
	bordered?: boolean;

	/**
	 * 表格尺寸，可选 'small' | 'middle' | 'large'
	 * @default 'large'
	 */
	size?: SizeType;

	/**
	 * 行选择配置，参考 Antd TableRowSelection API
	 */
	rowSelection?: TableRowSelection<any>;

	/**
	 * 分页参数变化时回调
	 * @param page 新的页码
	 * @param pageSize 新的每页条数
	 */
	onChange?: (page: number, pageSize: number) => void;

	/**
	 * 行点击时回调，返回被点击的行数据
	 */
	onRowClick?: (record: any) => void;

	/**
	 * 鼠标悬浮在行时的回调
	 */
	onRowMouseOver?: (event: React.MouseEvent, record: any) => void;

	/**
	 * 鼠标移出行时的回调
	 */
	onRowMouseOut?: (event: React.MouseEvent, record: any) => void;

	/**
	 * 整体容器样式
	 */
	style?: React.CSSProperties;
	/**表格粘性属性设置 */
	sticky?: boolean | TableSticky;
	/**
	 * 是否正在载入数据
	 */
	loading?: boolean;
}

//往外面暴露统一名称的属性对象，用于生成低代码平台属性JSON schema
export type Tinputprops = MithrilAntdTableComponentProps;

export type TableRef = {};
const showTotal: PaginationProps["showTotal"] = (total) => `共 ${total} 条`;

const MithrilAntdTableComponent = (props: MithrilAntdTableComponentProps, _ref: Ref<TableRef>) => {
	const {
		columns = [],
		current = 1,
		pageSize = 10,
		total = 10,
		dataSource,
		rowKey,
		actionDOM,
		rowSelection = undefined,
		scroll = { x: 1500 },
		sticky = { offsetHeader: 68 },
		onChange,
		onRowClick,
		bordered = false,
		size = "large",
		recordKey = "",
		rowId = -1,
		style = {},
		onRowMouseOver,
		onRowMouseOut,
		loading = false,
	} = props;

	const setRowClass = (record: any) => {
		return record[recordKey] === rowId ? "ant-table-row-selected" : "";
	};
	const handlePaginationChange = (current: number, pageSize: number) => {
		if (onChange) {
			onChange(current, pageSize);
		}
	};
	return (
		<>
			{actionDOM}
			{actionDOM && <Divider />}
			<Table
				sticky={sticky}
				style={style}
				columns={columns}
				loading={loading}
				rowKey={rowKey}
				bordered={bordered}
				size={size}
				scroll={scroll}
				rowSelection={rowSelection}
				dataSource={dataSource}
				rowClassName={setRowClass}
				locale={{ emptyText: "暂无数据" }}
				onRow={(record) => {
					return {
						onClick: () => {
							if (onRowClick) {
								onRowClick(record);
							}
						},
						onMouseOver: (_e) => {
							if (onRowMouseOver) {
								onRowMouseOver(_e, record);
							}
						},
						onMouseOut: (_e) => {
							if (onRowMouseOut) {
								onRowMouseOut(_e, record);
							}
						},
					};
				}}
				pagination={
					handlePaginationChange
						? {
								current,
								pageSize,
								showTotal,
								hideOnSinglePage: false,
								total,
								showSizeChanger: false, //禁止更改当前页显示条数
								//pageSizeOptions: [10, 20, 50, 100],

								onChange: handlePaginationChange,
						  }
						: null
				}
			/>
		</>
	);
};

const MithrilAntdTable = forwardRef(MithrilAntdTableComponent);
//为防止在编译和混淆后，无法识别组件名称，所以在这里显示定义名称
MithrilAntdTable.displayName = "MithrilAntdTable";
export default MithrilAntdTable;
