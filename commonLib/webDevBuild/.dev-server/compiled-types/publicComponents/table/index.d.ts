import { SizeType } from "antd/es/config-provider/SizeContext";
import { ColumnType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
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
export type Tinputprops = MithrilAntdTableComponentProps;
export type TableRef = {};
declare const MithrilAntdTable: import("react").ForwardRefExoticComponent<MithrilAntdTableComponentProps & import("react").RefAttributes<TableRef>>;
export default MithrilAntdTable;
//# sourceMappingURL=index.d.ts.map