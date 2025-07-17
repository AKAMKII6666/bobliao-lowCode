# 秘银互动web前端公共组件库
---
#### 作者:bobliao（廖力）

#### git地址: `https://gitee.com/mithril_1/mithal-common-library.git`  
#### node版本要求: `20.9.0 及以上`  
#### 推荐的包管理器: `yarn`  
本组件库基于`webpack`的`ModuleFederationPlugin`,并且使用了`@module-federation/enhanced`库，优化了：
1.types的同步
2.相较于`webpack`原始的`ModuleFederationPlugin`减少了一些没必要的错误，例如重复实例化mf入口点的问题等。
`@module-federation/enhanced`的官方文档
`https://module-federation.io/`
#### Host的环境要求:使用`@module-federation/enhanced`来托管本组件库，而不是`webpack`自带的`ModuleFederationPlugin`
  
## 调试:
---
#### 安装依赖:`yarn`
#### 启动命令:`yarn dev`
#### 启动后端口:`2203`
#### 完整路径:`http://localhost:2203/`
#### 远程入口点:`http://localhost:2203/remoteEntry.js`
#### 其它接入要求(请核对您Host项目的shared配置):
	1.依赖要求:
| 组件名称                    | 版本要求             |
| ----------------------- | ---------------- |
| react                   | 18.1.0           |
| react-dom               | 18.1.0           |
| react-router-dom        | 6.27.0           |
| antd                    | 5.17.0           |
| @mui/icons-material     | ^5.14.18         |
| @mui/lab                | ^5.0.0-alpha.153 |
| @mui/material           | ^5.14.18         |
| @mui/styles             | ^5.14.18         |
| @mui/x-data-grid        | ^6.18.2          |
| @mui/x-date-pickers     | ^6.18.2          |
| @mui/x-date-pickers-pro | ^6.19.7          |
| @mui/x-tree-view        | 7.5.0            |
| @emotion/react          | ^11.11.1         |
| @emotion/styled         | ^11.11.0         |
| webpack-dev-server      | 5.2.1            |
| react-hot-toast         | 2.5.1            |
  

  

## 发布（编译部署版本）：
---
#### 安装依赖:`yarn`
#### 编译命令:`yarn build:pro`
#### 产物目录:`./dist`
#### 目前发布的方法:
1.将`./dist`压缩成`dist.zip`
2.进入`https://ucenter.herongkeji.com/fileManage`
3.点击`上传文件`按钮
4.在上传文件的界面上选择:
```
项目->SWYTStaticFiles 
组->NewFarmerSport 
版本->0.0.4
Tag->v1
```
##### 5.勾选`上传前端组件库`选项
6.将`dist.zip`拖放到上传区域，或者选中`dist.zip`
7.点击`提交文件上传`按钮
8.完成组件库的上传后将返回类似`https://static-unzip-file-source.oss-cn-beijing.aliyuncs.com/prod/SWYTStaticFiles/NewFarmerSport/0.0.4/dist/`的路径，这个路径最好在打包上传之前写入到`./webpackConfig/webpack.config.pro.js`中的`devConfig.output.publicPath`中，如果你在上传之后发现这里`devConfig.output.publicPath`的地址未被更改，请按照返回的路径填写进`devConfig.output.publicPath`中再按照同样的步骤和参数再上传一遍！

#### 目前组件库的外部访问路径:`https://static-unzip-file-source.oss-cn-beijing.aliyuncs.com/prod/SWYTStaticFiles/NewFarmerSport/0.0.4/dist/`:
（请随时核准`./webpackConfig/webpack.config.pro.js`中的`devConfig.output.publicPath`配置，此处的链接可能过时）

## Host(业务)项目适配示例:
请参考以下项目配置您的业务项目，以适配本组件库:
`https://gitee.com/mithril_1/collective-trade-economy-system.git`

# 组件库内容
---
## 组件目录(可能过时，使用时请检查`./federation.config.json`中的配置为准):

| 组件名称                                                  | 组件路径                                                    | 备注                                                                                                                             |
| ----------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| MithalCommonLibrary/AntdDateRangePacker               | `./src/publicComponents/antdDateRangePicker/index`      | 使用 Antd 组件库中的 DateRangePacker 组件重写的时间范围组件                                                                                      |
| MithalCommonLibrary/SingleDatePicker                  | `./src/publicComponents/SingleDatePicker/index`         | 单独的时间选择器，使用 `@mui/x-date-pickers` 制作                                                                                           |
| MithalCommonLibrary/MithrilAutocomplete               | `./src/publicComponents/autocomplete/index`             | 带项目选择和删除支持检索的多选或单选下拉框，使用 `@mui/material/Autocomplete` 制作                                                                       |
| MithalCommonLibrary/FoldableInqueryContainer          | `./src/publicComponents/FoldableInqueryContainer/index` | 支持折叠的查询条件布局组件                                                                                                                  |
| MithalCommonLibrary/FormComponentsContainer           | `./src/publicComponents/formComponentsContainer/index`  | “详情页”通用数据绑定和布局容器，用于新增/修改/查看，快速绑定数据和布局，作者 bobliao                                                                               |
| MithalCommonLibrary/AutoForm                          | `./src/publicComponents/AutoForm/index`                 | 基于formComponentsContainer的自动布局和数据绑定组件，作者 bobliao                                                                               |
| MithalCommonLibrary/CustomNumberInput                 | `./src/publicComponents/CustomNumberInput/index`        | 纯数字输入框，支持浮点数、整数及非数字验证，支持单位等特性，使用 `@mui/material` 的 `TextField` 制作                                                              |
| MithalCommonLibrary/numberRangeInput                  | `./src/publicComponents/numberRangeInput/index`         | 数字范围输入框，包含“开始值”和“结束值”，基于 `CustomNumberInput` 制作                                                                                |
| MithalCommonLibrary/NumberRoller                      | `./src/publicComponents/numberRoller/index`             | 数字缓动动画组件，实现数字从 0 到任意数的缓动动画，作者 bobliao                                                                                          |
| MithalCommonLibrary/MithrilAntdTable                  | `./src/publicComponents/table/index`                    | 使用 Antd 组件库中的 `Table` 组件重写的数据表格展示组件                                                                                            |
| MithalCommonLibrary/MithrilTextArea                   | `./src/publicComponents/textArea/index`                 | 带字数显示和长度限制特性的 `TextArea` 组件，使用 `@mui/material` 的 `TextField` 制作                                                                |
| MithalCommonLibrary/TextPrinter                       | `./src/publicComponents/TextPrinter/index`              | 字符打印缓动效果组件，用于实现控制台逐字打印输出效果，作者 bobliao                                                                                          |
| MithalCommonLibrary/MithrilYesNoSwitch                | `./src/publicComponents/yes-no-switch/index`            | “是/否”开关组件，使用 `@mui/material` 的 `Button`+`ButtonGroup` 制作                                                                       |
| MithalCommonLibrary/MithrilInput                      | `./src/publicComponents/input/index`                    | 普通文本框组件，常用于查询栏，使用 `@mui/material` 的 `TextField` 制作                                                                             |
| MithalCommonLibrary/TextField                         | `./src/publicComponents/TextField/index`                | 普通文本框组件，使用 `@mui/material` 的 `TextField` 制作                                                                                    |
| MithalCommonLibrary/MithrilSelect                     | `./src/publicComponents/select/index`                   | 普通多选或单选下拉框，使用 `@mui/material` 的 `Select` 制作                                                                                    |
| MithalCommonLibrary/PublicInqueryContainer            | `./src/publicComponents/PublicInqueryContainer/index`   | 列表条件查询栏批量快速布局和数据绑定容器，集成 `FoldableInqueryContainer` 和 `PublicInqueryItem` 功能，作者 bobliao                                         |
| MithalCommonLibrary/PublicInqueryItem                 | `./src/publicComponents/PublicInqueryItem/index`        | 列表条件查询栏单个组件快速布局和数据绑定容器，作者 bobliao                                                                                              |
| MithalCommonLibrary/CommonInquery                     | `./src/publicComponents/CommonInquery/index`            | 列表条件查询栏批量布局和数据绑定容器，支持动态多条件联动，集成 `FoldableInqueryContainer`、`PublicInqueryItem`、Formik、`dynamicSelectionsParamsHook`，作者 bobliao |
| MithalCommonLibrary/Loading                           | `./src/publicComponents/loading/index`                  | 加载中组件，展示加载中 SVG 并支持调整大小，作者 bobliao                                                                                             |
| MithalCommonLibrary/Nodata                            | `./src/publicComponents/nodata/index`                   | 无数据组件，展示无数据 SVG 并支持调整大小，作者 bobliao                                                                                             |
| MithalCommonLibrary/AutoSizeText                      | `./src/publicComponents/AutoSizeText/index`             | 用于给文本按容器宽度自动调整大小的组件，作者 bobliao                                                                                             |
| MithalCommonLibrary/TipTapRichTextEditor              | `./src/publicComponents/TipTapRichTextEditor/index`     | 基于mui-TipTap的富文本编辑器                                                                                             |
| MithalCommonLibrary/Breadcrumbs              	        | `./src/publicComponents/Breadcrumbs/Breadcrumbs`        | 用于系统集成用的站点地图组件                                                                                             |
| MithalCommonLibrary/FullScreenButton              	| `./src/publicComponents/FullScreenButton/index`         | 用于系统集成用的全屏组件                                                                                             |
| MithalCommonLibrary/FullScreenButton              	| `./src/publicComponents/FullScreenButton/index`         | 用于系统集成用的全屏组件                                                                                             |
| MithalCommonLibrary/utils/customParamsSerializer      | `./src/utils/customParamsSerializer`                    | 用于条件查询时 URL 参数的字符串序列化                                                                                                          |
| MithalCommonLibrary/utils/dynamicSelectionsParamsHook | `./src/utils/dynamicSelectionsParamsHook`               | 用于实现条件间联动查询的 Hook，作者 bobliao                                                                                                   |
| MithalCommonLibrary/utils/debounceAdv2Hook            | `./src/utils/debounceAdv2Hook`                          | 防抖 Hook v2，根据最后一次触发进行 CD，CD 时间内不可再次触发，作者 bobliao                                                                               |
| MithalCommonLibrary/utils/debounceHook                | `./src/utils/debounceHook`                              | 防抖 Hook v1，根据首次触发进行 CD，CD 时间内不可再次触发，作者 bobliao                                                                                 |
| MithalCommonLibrary/utils/dynStateHook                | `./src/utils/dynStateHook`                              | 用于管理数据流的 Hook，作者 bobliao                                                                                                       |
| MithalCommonLibrary/utils/publicDetailDataHook        | `./src/utils/publicDetailDataHook`                      | 用于管理新增/修改/查看页面数据状态的通用 Hook，作者 bobliao                                                                                          |
| MithalCommonLibrary/utils/relativeEmResoHook          | `./src/utils/relativeEmResoHook/index`                  | 相对容器分辨率适配（EM 布局）的 Hook，作者 bobliao                                                                                              |
| MithalCommonLibrary/utils/formikValueChangesHook      | `./src/utils/formikValueChangesHook/index`              |`useFormikValueChanges` 是一个基于 `Formik` 的自定义 Hook，用于在表单中实现值变更联动处理。 作者bobliao |
| MithalCommonLibrary/utils/formikValueChangesHook      | `./src/utils/formikValueChangesHook/index`              | 使用这个钩子定义查询条件，将会在浏览器地址栏里创建相应的url参数以保持页面状态. 作者bobliao |
| MithalCommonLibrary/utils/inqueryState                | `./src/utils/inqueryState`                              | 用于神思通信的 Socket Hook，作者 yihang                                                                                                  |
| MithalCommonLibrary/utils/utils                       | `./src/utils/utils`                                     | 公共方法库，作者 bobliao                                                                                                               |
| MithalCommonLibrary/utils/globalMenuHook              | `./src/utils/globalMenuHook`                            | 菜单数据托管钩子，作者 bobliao                                                                                                               |
| MithalCommonLibrary/publicThemeSystem                 | `./src/publicThemeSystem/index`                         | 用于给系统集成统一样式的组件                                                                                                               |


## 组件文档: 请根据组件中的类型定义使用，注释齐全




以下是 **Antd连体时间范围组件** (`AntdDateRangePacker`) 的文档，包含模块说明、示例、以及完整的属性说明表。

---

## AntdDateRangePacker

**模块名称**：Antd连体时间范围组件
**模块说明**：基于 Ant Design `RangePicker` 的连体时间范围选择器，支持限制范围、确认按钮、清除、禁用等功能，并可通过 `ref` 暴露重置接口。

```tsx
import React, { useRef } from 'react';
import AntdDateRangePacker, { TAntdDateRangePackerRef } from 'MithalCommonLibrary/AntdDateRangePacker';

export default function Demo() {
  const ref = useRef<TAntdDateRangePackerRef>(null);

  return (
    <>
      <AntdDateRangePacker
        label="选择时间"
        format="YYYY/MM/DD HH:mm"
        showTime
        limitScope={{ enabled: true, monthScope: 3 }}
        onChange={(start, end) => console.log('范围：', start, end)}
        ref={ref}
      />
      <button onClick={() => ref.current?.reset()}>重置</button>
      <button onClick={() => ref.current?.resetToDate('2025-01-01', '2025-02-01')}>设定范围</button>
    </>
  );
}
```

---

### 组件接口

#### 属性（`IAntdDateRangePackerProps`）

| 属性               | 类型                                           | 默认值                                 | 说明                                                              |
| ---------------- | -------------------------------------------- | ----------------------------------- | --------------------------------------------------------------- |
| `onChange`       | `(start: number, end: number) => void`       | —                                   | 时间范围变化时回调，参数为开始/结束的时间戳                                          |
| `className`      | `string`                                     | `""`                                | 附加到组件根节点的 class 名称                                              |
| `label`          | `string \| ReactNode`                        | `""`                                | 左侧标签文案                                                          |
| `labelWidth`     | `string \| number`                           | `"auto"`                            | 标签宽度，可传数字(px)或百分比                                               |
| `format`         | `string`                                     | `"YYYY-MM-DD"`                      | 日期格式，参考 moment/antd 格式化规则                                       |
| `showHelperText` | `boolean`                                    | `false`                             | 是否在输入框下显示辅助文本（未选中时展示）                                           |
| `showTime`       | `boolean`                                    | `false`                             | 是否显示时间选择（小时、分钟、秒）                                               |
| `startVal`       | `string`                                     | `""`                                | 初始开始值（字符串），与 `endVal` 配合使用                                      |
| `endVal`         | `string`                                     | `""`                                | 初始结束值（字符串），与 `startVal` 配合使用                                    |
| `defaultValue`   | `any[]`                                      | `[]`                                | 初始值数组，仅在组件第一次渲染时生效                                              |
| `value`          | `any[]`                                      | `[]`                                | 受控值数组（Dayjs 对象数组），与外部状态同步                                       |
| `sx`             | `SxProps<Theme>`                             | `{}`                                | 整体包装器的 MUI `sx` 样式                                              |
| `datePickerSx`   | `SxProps<Theme>`                             | `{ height: '40.125px'}`             | `RangePicker` 本体的 `sx` 样式                                       |
| `style`          | `SxProps<Theme>`                             | `{}`                                | 容器 `<Stack>` 的 MUI `sx` 样式                                      |
| `leftSx`         | `SxProps<Theme>`                             | `{}`                                | 标签容器的 MUI `sx` 样式                                               |
| `limitScope`     | `{ enabled?: boolean; monthScope?: number }` | `{ enabled: false; monthScope: 2 }` | 限制所选范围：`enabled` 打开后，`monthScope` 最大月数，超出自动调整并提示                |
| `allowClear`     | `boolean`                                    | `false`                             | 是否显示清除按钮                                                        |
| `enabled`        | `boolean`                                    | `true`                              | 组件是否可用                                                          |
| `needConfirm`    | `boolean`                                    | `false`                             | 是否在选择后显示“确认”按钮，只有在 `showTime=true` 时才生效，强制用户点击确认后才触发 `onChange` |

#### 方法（`TAntdDateRangePackerRef`）

通过 `forwardRef` 暴露以下方法：

| 方法            | 签名                               | 说明                      |
| ------------- | -------------------------------- | ----------------------- |
| `reset`       | `() => void`                     | 重置组件为无选中状态              |
| `resetToDate` | `(start: any, end: any) => void` | 将范围重置到指定的 `start`/`end` |

---

### 附加说明

* **国际化修复**：文档中使用了对 `locale.DatePicker.lang` 的补丁，修复 Antd 中文包中缺失的 `shortMonths`、`shortWeekDays` 字段。
* **版本依赖**：解决 `placement` 无效问题需升级 Antd 至 v5.21.1；如遇月份英文问题，需安装并配置 `moment`。
* **内部实现**：组件内部通过状态 `values` 控制 `RangePicker` 值，通过 `useImperativeHandle` 暴露重置 API，同时对超范围自动调整并通过 `react-hot-toast` 给出提示。



---
# MithrilAutocomplete 组件文档

**模块说明**：基于 MUI `Autocomplete` 封装的下拉选择组件，支持单选/多选、校验、标签、布局和样式自定义。

## 安装与引入

```tsx
import React from 'react';
import MithrilAutocomplete, { IMithrilAutocompleteProps, AutocompleteValType } from 'MithalCommonLibrary/MithrilAutocomplete';
```

## 基本示例

```tsx
<MithrilAutocomplete
  label="请选择项目"
  data={[
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
  ]}
  value={{ label: '选项一', value: '1' }}
  onChange={(val: AutocompleteValType) => console.log(val)}
/>
```

## 属性说明

| 属性            | 类型                                          | 默认值              | 说明                                            |
| ------------- | ------------------------------------------- | ---------------- | --------------------------------------------- |
| `id`          | `string`                                    | —                | 唯一标识，可用于区分多个实例                                |
| `label`       | `React.ReactNode`\|`string`                 | —                | 左侧标签文案或自定义节点                                  |
| `labelWidth`  | `number`                                    | —                | 标签宽度(px)，不传则自适应                               |
| `value`       | `AutocompleteValType`\|`any`                | —                | 当前选中值，单选时为对象，多选时为数组                           |
| `data`        | `Array<AutocompleteValType>`                | `[]`             | 下拉选项数据源，每项 `{ label: string; value: string }` |
| `multiple`    | `boolean`                                   | `false`          | 是否支持多选                                        |
| `fullWidth`   | `boolean`                                   | `false`          | 是否占满父容器宽度                                     |
| `disabled`    | `boolean`                                   | `false`          | 是否禁用控件                                        |
| `placeholder` | `string`                                    | —                | 输入框 placeholder 文案                            |
| `judgeFn`     | `(val: any) => boolean`                     | —                | 多选校验函数，当选中项超过 1 个时调用，返回 `true` 允许更新，否则取消      |
| `direction`   | `'row'`\|`'column'`                         | `"row"`          | 标签与控件的排列方向                                    |
| `spacing`     | `any`                                       | `2`              | `Stack` 子元素间距                                 |
| `sx`          | `SxProps<Theme>`                            | `{ width: 210 }` | 控件根节点的 `sx` 样式                                |
| `stackSx`     | `SxProps<Theme>`                            | `{ mt: 0 }`      | 外层 `Stack` 的 `sx` 样式                          |
| `colon`       | `boolean`                                   | `true`           | 标签后是否显示冒号                                     |
| `onChange`    | `(value: AutocompleteValType\|any) => void` | —                | 选中值变化回调                                       |

## 高级示例

### 多选并且自定义校验

```tsx
<MithrilAutocomplete
  label="选择多个"
  multiple
  data={[{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }]}
  judgeFn={(vals) => vals.length <= 3}
  onChange={(vals) => console.log('最多三个:', vals)}
/>
```

### 表单集成示例（Formik）

```tsx
import { useFormik } from 'formik';

function Form() {
  const formik = useFormik({
    initialValues: { item: null },
    onSubmit: values => console.log(values),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <MithrilAutocomplete
        id="item"
        name="item"
        value={formik.values.item}
        onChange={val => formik.setFieldValue('item', val)}
        data={[ /* options */ ]}
      />
      <button type="submit">提交</button>
    </form>
  );
}
```

---

> **提示**：组件内使用 `slotProps` 清空了默认按钮的 `title` 属性以移除悬浮提示，样式可通过 `sx` 和 `stackSx` 灵活扩展。

---
# CommonInquery 组件文档

**模块名称**：查询栏快速数据绑定和布局组件
**模块说明**：

> 虽然已有 `PublicInqueryContainer`，但在构建查询栏时仍显繁琐。本组件集成了 Formik、下拉选/多选数据拉取、查询验证等常见功能，旨在减少重复代码，方便在列表页内快速定义多种查询条件组合，并集中维护。
>
> * 支持多种输入类型：文本、数字、数字范围、日期范围、下拉/多选、文本域等
> * 自动生成 Formik 初始值与验证规则
> * 内置动态选项拉取逻辑
> * 暴露获取当前值和 Formik 实例的 Ref 方法

---

## 安装与引入



```tsx
import React, { useRef } from 'react';
import CommonInquery, { ICommonInqueryprops, TCommonInqueryRef } from 'MithalCommonLibrary/CommonInquery';
```

## 典型使用示例

```tsx
import * as yup from 'yup';
import React, { useRef } from 'react';
import CommonInquery, { ICommonInqueryprops, TCommonInqueryRef } from 'MithalCommonLibrary/CommonInquery';

const queryItems = [
  {
    label: '资产名称',
    name: 'name',
    defaultValue: '',
    comType: 'MithrilInput',
    yupObj: yup.string().max(30, '最多 30 个字符'),
  },
  {
    label: '登记时间',
    name: ['startDate', 'endDate'],
    defaultValue: ['', ''],
    dateFormat: 'YYYY-MM-DD HH:mm',
    comType: 'AntdDateRangePacker',
    comProps: { showTime: true, allowClear: true },
    yupObj: [yup.string(), yup.string()],
  },
  {
    label: '土地类型',
    name: 'landType',
    defaultValue: '',
    selectItems: [
      { label: '农用地', value: '1' },
      { label: '建设用地', value: '2' },
    ],
    comType: 'MithrilSelect',
    yupObj: yup.string(),
  },
];

export default function ListPage() {
  const ref = useRef<TCommonInqueryRef>(null);

  const handleSubmit = (values: any) => {
    console.log('查询参数:', values);
  };

  const handleReset = (values: any) => {
    console.log('已重置为:', values);
  };

  return (
    <CommonInquery
      ref={ref}
      items={queryItems}
      onSubmit={handleSubmit}
      onReset={handleReset}
      enabledFoldable={true}
      defaultState="fold"
    />
  );
}
```

---

## 属性（`ICommonInqueryprops`）

| 属性                              | 类型                                                      | 必填         | 默认值       | 说明                           |   |   |            |
| ------------------------------- | ------------------------------------------------------- | ---------- | --------- | ---------------------------- | - | - | ---------- |
| `formik`                        | `ReturnType<typeof useFormik>` \| `null` \| `undefined` | 否          | `null`    | 自定义 Formik 实例，若不传则内部会自动创建    |   |   |            |
| `items`                         | `ICommonInqueryitemprops[]`                             | 是          | —         | 查询项配置数组，每项定义一个条件字段与对应组件      |   |   |            |
| `onSubmit`                      | `(values: any) => void`                                 | 是          | —         | 点击查询或回车后触发，参数为当前表单值          |   |   |            |
| `onReset`                       | `(values: any) => void`                                 | 是          | —         | 点击重置时触发，参数为初始表单值             |   |   |            |
| `enabledFoldable`               | `boolean`                                               | 否          | `false`   | 是否启用折叠功能，可自动收起长列表            |   |   |            |
| `defaultState`                  | `"fold"` \| `"expand"`                                  | 否          | —         | 初始折叠状态，`fold` 收起，`expand` 展开 |   |   |            |
| ...(继承自 PublicInqueryContainer) | \`...Omit\<IPublicInqueryContainerprops, 'items'        | 'onSubmit' | 'onReset' | 'formik'>\`                  | — | — | 其他公共表单容器属性 |

### 子项配置（`ICommonInqueryitemprops`）

| 属性                    | 类型                                                                     | 必填 | 默认值 | 说明                                                                                 |
| --------------------- | ---------------------------------------------------------------------- | -- | --- | ---------------------------------------------------------------------------------- |
| `label`               | `string`                                                               | 是  | —   | 字段标签，不需要添加冒号                                                                       |
| `name`                | `string` \| `string[]`                                                 | 是  | —   | 绑定字段名，若组件关联多个值（如日期范围、数字范围）则为数组                                                     |
| `defaultValue`        | `string` \| `string[]`                                                 | 是  | —   | 默认值，类型与 `name` 对应；数组时按顺序对应多字段                                                      |
| `comType`             | `keyof typeof comsMap`                                                 | 是  | —   | 字符串标识组件类型，对应内置组件：`AntdDateRangePacker`、`MithrilAutocomplete`、`CustomNumberInput` 等 |
| `comProps`            | 组件对应的属性类型集合                                                            | 否  | —   | 传入到实际渲染组件的属性，联合了所有支持的组件 Props 接口                                                   |
| `yupObj`              | `yup.StringSchema \| yup.StringSchema[]`                               | 否  | —   | 表单字段验证规则，可为单条规则或与 `name` 数组对应的规则数组                                                 |
| `selectItems`         | `{ label: string; value: string }[]` \| `IDynamicSelectionsParamsProp` | 否  | —   | 下拉或多选的静态选项列表，或动态参数获取配置；若为动态则组件会自动调用 Hook 拉取数据并更新选项                                 |
| `comGridProps`        | `GridProps`                                                            | 否  | —   | 该项在容器中所占的网格布局属性                                                                    |
| `dateFormat`          | `string`                                                               | 否  | —   | 日期/时间格式，传给 `AntdDateRangePacker`                                                   |
| `isMutipleSelections` | `boolean`                                                              | 否  | —   | 对于多选组件（如 `MithrilAutocomplete`），是否允许多选                                             |
| `labelWidth`          | `number` \| `string`                                                   | 否  | —   | 标签容器宽度，覆盖默认                                                                        |

---

## 参考与扩展

* 动态数据拉取 Hook: `useDynamicSelectionsParams`
* 公共容器: `PublicInqueryContainer` / `PublicInqueryItem`
* 支持的子组件列表请参考源码 `comsMap` 映射

以上文档涵盖了组件核心功能、属性及使用示例，可直接拷贝到项目 README 或团队 Wiki。

---

# CustomNumberInput 数字输入组件文档

**模块说明**：

`CustomNumberInput` 是基于 MUI `TextField` 的数字输入组件，支持：

* 输入整数和浮点数，动态校验合法性
* 延迟格式化（失焦或增减按钮触发）
* 可配置小数位数及补零策略
* 增减按钮（可选）
* 最小值限制
* BigNumber 支持大数精度控制，禁止科学计数法输出

---


---

## 引入

```tsx
import React, { useRef } from 'react';
import CustomNumberInput, { NumberInputProps } from 'MithalCommonLibrary/CustomNumberInput';
```

---

## 示例

```tsx
export default function Demo() {
  const [val, setVal] = React.useState('');

  return (
    <CustomNumberInput
      label="金额"
      value={val}
      fixed={2}
      isFillZero
      min={0}
      onChange={newVal => setVal(newVal)}
      onBlur={() => console.log('失焦后格式化：', val)}
    />
  );
}
```

---

## 组件属性（`NumberInputProps`）

| 属性               | 类型                                                   | 默认值        | 说明                                                                  |
| ---------------- | ---------------------------------------------------- | ---------- | ------------------------------------------------------------------- |
| `value`          | `string`                                             | `''`       | 当前文本值，允许不完整输入（如 `'-'`、`'3.'`）                                       |
| `onChange`       | `(newValue: string) => void`                         | `() => {}` | 输入有效数字时触发（输入过程中实时触发），回传 BigNumber 格式化后的字符串                          |
| `onBlur`         | `FocusEventHandler<HTMLInputElement>`                | —          | 失焦时回调，触发格式化并上报最终值                                                   |
| `fixed`          | `number`                                             | `2`        | 格式化时保留的小数位数                                                         |
| `isFillZero`     | `boolean`                                            | `true`     | 是否补齐 0，如保留两位时 `3.1` → `3.10`                                        |
| `min`            | `number`                                             | —          | 最小值限制，禁止输入或增减后低于此值                                                  |
| `handleAccredit` | `() => void`                                         | —          | 格式化或增减操作完成后额外回调                                                     |
| *(其余)*           | *继承自 `TextFieldProps`，除 `onChange`、`value`、`onBlur`* | —          | 其他 MUI `TextField` 支持的所有属性，例如 `label`、`variant`、`helperText`、`sx` 等 |

---

## 进阶用法

* **自定义小数位**：`fixed={4}` 保留 4 位小数
* **禁止负数**：`min={0}`
* **大数支持**：通过 `bignumber.js` 禁止科学计数法，确保超过 JS 精度范围的数字正常显示
* **增减按钮**：可在 `InputProps.endAdornment` 中手动打开注释部分，显示上下箭头进行步进控制

---

> **注意**：组件内部采用 `BigNumber.config({ EXPONENTIAL_AT: 1e3 })` 全局设置，避免科学计数法。如果需要调整阈值，请在应用入口或本组件前修改配置。

---

# FoldableInqueryContainer 可折叠查询框容器

**模块说明**：

用于在列表页面中快速生成可折叠的查询栏。该容器可根据需要折叠或展开查询内容，配合操作按钮，一键切换视图，简化查询栏布局。

---

## 安装与引入



```tsx
import React from 'react';
import FoldableInqueryContainer, { iprops as FoldableProps } from 'MithalCommonLibrary/FoldableInqueryContainer';
```

---

## 基本示例

```tsx
<FoldableInqueryContainer
  defaultState="fold"
  enabled={true}
  foldContent={
    <>
      {/* 折叠状态下显示的查询项 */}
      <div>查询条件1</div>
      <div>查询条件2</div>
    </>
  }
  unfoldContent={
    <>
      {/* 展开状态下显示的全部查询项 */}
      <div>更多条件...</div>
    </>
  }
  opreateButtons={
    <>
      <button>查询</button>
      <button>重置</button>
    </>
  }
/>
```

---

## 属性说明

| 属性               | 类型                               | 默认值      | 说明                                     |
| ---------------- | -------------------------------- | -------- | -------------------------------------- |
| `foldContent`    | `ReactElement \| ReactElement[]` | `null`   | 折叠状态下渲染的内容区域                           |
| `unfoldContent`  | `ReactElement \| ReactElement[]` | `null`   | 展开状态下渲染的内容区域                           |
| `opreateButtons` | `ReactElement \| ReactElement[]` | `null`   | 操作按钮区域（如查询、重置按钮）                       |
| `defaultState`   | `'fold' \| 'unfold'`             | `'fold'` | 初始状态，`fold` 为折叠；`unfold` 为展开           |
| `enabled`        | `boolean`                        | `true`   | 是否启用折叠功能；`false` 时始终展示 `unfoldContent` |

---

## 交互说明

1. **折叠/展开切换**：点击底部折叠/展开图标后，容器在 `foldContent` 与 `unfoldContent` 之间切换。
2. **禁用模式**：当 `enabled=false`，不渲染折叠按钮，始终显示展开内容。

---

## 样式定制

* 使用 `styles` 模块定义的 `.expand` 和 `.fold` 触发器样式。
* 可通过外部传入的元素中添加 MUI 或自定义样式。

---

> **提示**：将查询逻辑与操作按钮作为 `foldContent`／`unfoldContent` 子节点传入，可灵活组合各种表单内容，无需额外容器组件。

---


# FormComponentsContainer 表单组件公用容器 文档

**模块名称**：表单组件公用容器
**模块说明**：用于承载单个表单项组件，根据不同 `mode`（新增、查看、编辑）自动渲染或只读展示，同时集成了 Formik 值绑定、校验提示、单位显示、选项映射、日期/范围格式化等常见功能，简化表单项重复代码。
**编写时间**：2025-04-14 10:57:04

---

## 安装与引入



```tsx
import React, { useRef } from 'react';
import FormComponentsContainer, { iprops as FormContainerProps } from 'MithalCommonLibrary/FormComponentsContainer';
```

---

## 基本使用示例

```tsx
<FormComponentsContainer
  mode="edit"
  label="资产名称"
  name="assetName"
  formik={formik}
  isRequiredStyle={true}
>
  <TextField />
</FormComponentsContainer>
```

— 当 `mode="watch"` 时，组件会以只读文本形式展示当前值；其它模式下会渲染传入的 `children` 并绑定 Formik。

---

## 属性说明（`iprops`）

| 属性                    | 类型                                   | 必填 | 默认      | 说明                                              |
| --------------------- | ------------------------------------ | -- | ------- | ----------------------------------------------- |
| `mode`                | `'add' \| 'watch' \| 'edit'`         | 是  | —       | 当前表单模式：`add` 新增、`edit` 编辑、`watch` 查看            |
| `children`            | `ReactElement \| ReactElement[]`     | 是  | —       | 要渲染的表单组件，如 `<TextField>`、自定义输入组件等               |
| `label`               | `string`                             | 是  | —       | 字段标签文本，不需添加冒号，容器会自动追加                           |
| `name`                | `string \| string[]`                 | 是  | —       | 字段名；如为数组则支持范围型组件（日期/数字范围），或多字段验证                |
| `formik`              | `any`                                | 是  | —       | Formik 实例对象，负责值管理与校验                            |
| `isRequiredStyle`     | `boolean`                            | 否  | `false` | 必填时是否在标签前显示红色星号                                 |
| `unit`                | `string`                             | 否  | `''`    | 值后缀单位，仅在查看模式下显示                                 |
| `selectItems`         | `{ label: string; value: string }[]` | 否  | —       | 静态下拉/多选选项列表，结合 `children` 组件使用                  |
| `isMutipleSelections` | `boolean`                            | 否  | `false` | 对于下拉/多选组件，是否允许多选                                |
| `enabled`             | `boolean`                            | 否  | `true`  | 是否启用编辑；`false` 时输入框禁用，查看模式仍可展示                  |
| `labelGridProps`      | `GridProps`                          | 否  | 默认布局    | 标签所在 `<Grid>` 布局属性，默认使用公共 `titleGridP_layout`   |
| `comGridProps`        | `GridProps`                          | 否  | 默认布局    | 组件所在 `<Grid>` 布局属性，默认使用公共 `contentGridP_layout` |
| `dateFormat`          | `string`                             | 否  | —       | 日期/时间格式，传入 DateRange 组件或自行格式化                   |
| `render`              | `(data: any) => ReactNode`           | 否  | —       | 自定义查看模式渲染函数，接收获取到的值（可能已映射标签或格式化后）               |

---

## 行内错误提示

* 在编辑模式下，组件自动监控 `formik.touched` 与 `formik.errors`，并在组件下方渲染 `<FormHelperText>` 显示错误信息。
* 对于多字段（数组 `name`）场景，分别渲染每个字段的错误提示。

---

## 只读模式渲染逻辑

* **普通字段**：直接输出文本，空值或 `null` 显示 `-`。
* **选项列表**：将字段值映射为 `selectItems` 中的 `label`，多选用逗号分隔。
* **范围字段（数组名）**：日期或数字范围按 `dateFormat` 格式化并用 `~` 分隔。
* **自定义渲染**：若传入 `render` 回调，则使用其返回结果覆盖默认展示。

---

## 注意事项

* `children` 组件需支持被 `cloneElement` 传入 `name`、`value`、`onChange` 等属性以完成绑定。
* 对于复杂场景（动态参数、异步选项），请在传入 `children` 前处理数据，并通过 `render` 自定义展示。

以上文档可复制至项目 README 或 Wiki 中，为团队提供快速集成与二次开发参考。

---

# MithrilInput 组件文档

**模块名称**：文本输入组件

**模块说明**：
基于 MUI `TextField` 封装的通用文本输入组件，支持可选标签、布局方向、宽度、自定义样式及错误显示，适用于表单或查询栏。

---

## 安装与引入



```tsx
import React from 'react';
import MithrilInput, { IMithrilInputProps } from 'MithalCommonLibrary/MithrilInput';
```

---

## 示例

```tsx
function Demo() {
  const [text, setText] = React.useState('');

  return (
    <MithrilInput
      label="用户名"
      name="username"
      value={text}
      placeholder="请输入用户名"
      onChange={(e) => setText(e.target.value)}
      error={text.length > 10}
      helperText={text.length > 10 ? '最多10个字符' : ''}
      fullWidth
    />
  );
}
```

---

## 属性（`IMithrilInputProps`）

| 属性            | 类型                                       | 默认               | 说明                                          |
| ------------- | ---------------------------------------- | ---------------- | ------------------------------------------- |
| `type`        | `string`                                 | `text`           | 输入框类型，支持 `text`、`number`、`password` 等       |
| `id`          | `string`                                 | —                | 输入框 `id` 属性，用于标签关联或测试                       |
| `label`       | `ReactNode \| string`                    | —                | 左侧标签内容，会自动添加冒号                              |
| `labelWidth`  | `number`                                 | 自动               | 标签宽度 (px)，不传则自适应                            |
| `name`        | `string`                                 | —                | input 的 `name` 属性，用于表单提交                    |
| `value`       | `string`                                 | —                | 当前输入值                                       |
| `placeholder` | `string`                                 | —                | 占位提示文本                                      |
| `disabled`    | `boolean`                                | `false`          | 是否禁用                                        |
| `fullWidth`   | `boolean`                                | `false`          | 是否占满父容器宽度                                   |
| `direction`   | `'row'` \| `'column'`                    | `'row'`          | 标签与输入框排列方向                                  |
| `colon`       | `boolean`                                | `true`           | 是否在标签后显示冒号                                  |
| `stackSx`     | `SxProps<Theme>`                         | —                | 包裹标签和输入框的 `Stack` 组件样式                      |
| `sx`          | `SxProps<Theme>`                         | `{ width: 140 }` | 输入框的 `sx` 样式                                |
| `error`       | `boolean` \| `FormControlProps['error']` | —                | 是否展示错误状态（红色边框）                              |
| `spacing`     | `number`                                 | `2`              | 标签和输入框之间的间距                                 |
| `onChange`    | `ChangeEventHandler<HTMLInputElement>`   | —                | 输入变化回调                                      |
| `InputProps`  | `TextFieldProps['InputProps']`           | —                | 传给 MUI `TextField` 的 `InputProps`，可自定义前后缀图标 |

---

## 特性

* **灵活布局**：结合 `direction`、`stackSx` 与 `labelWidth`，可实现横向或纵向表单项布局。
* **样式扩展**：通过 `sx` 扩展 MUI 样式，支持调整宽度、背景、边框等。
* **错误提示**：可结合 `FormHelperText` 或外部 `helperText` 配合使用，展示验证信息。

---

> 建议在表单中配合 Formik 或 React Hook Form 使用，通过 `name`、`value` 与 `onChange` 完成数据绑定。

---
# Loading 组件文档

**模块名称**：加载中组件
**模块说明**：展示一个自定义的加载动画，用于提示页面或区域正在加载中
**编写时间**：

---

## 安装与引入


```tsx
import React from 'react';
import Loading from 'MithalCommonLibrary/Loading';
```

---

## 示例

```tsx
export default function Demo() {
  return (
    <div style={{ position: 'relative', width: 200, height: 200 }}>
      {/* 在容器中居中显示加载动画 */}
      <Loading style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
```

---

## 属性说明

| 属性      | 类型                    | 默认值 | 说明                             |
| ------- | --------------------- | --- | ------------------------------ |
| `style` | `React.CSSProperties` | —   | 覆盖根节点 `<div>` 的内联样式，用于设置尺寸、定位等 |

---

## 样式与定制

* `styles.container` 来自 `index.module.scss`，提供了加载动画的关键帧与布局。
* 可通过传入 `style` 属性覆盖或补充容器样式，例如调整宽高、背景色、定位方式等。

---

> **提示**：将该组件放于相对定位的父元素中，可实现全局或局部加载遮罩效果。
---

# NoData 组件文档

**模块名称**：暂无数据组件
**模块说明**：在数据为空或加载失败时，展示“暂无数据”提示，支持自定义标题与容器样式
**编写时间**：

---

## 安装与引入



```tsx
import React from 'react';
import NoData from 'MithalCommonLibrary/NoData';
```

---

## 示例

```tsx
export default function Demo() {
  return (
    <div style={{ width: 300, height: 200, position: 'relative' }}>
      <NoData title="暂无记录" style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
```

---

## 属性说明

| 属性      | 类型                    | 默认值  | 说明                            |
| ------- | --------------------- | ---- | ----------------------------- |
| `title` | `string`              | `''` | 标题文本，显示在组件中央                  |
| `style` | `React.CSSProperties` | —    | 覆盖根节点 `<div>` 的内联样式，可设置尺寸、定位等 |

---

## 样式与定制

* 样式来源：`index.module.scss` 中的 `.container` 与 `.title`，包括图标背景和文字样式
* 可通过 `style` 属性定制容器宽高或布局，如居中、背景色等

---

> **提示**：建议将组件放在相对定位的父元素中，以保证提示图标和文字居中显示。

---
# NumberRangeInput 组件文档

**模块名称**：数值范围输入框
**模块说明**：用于输入数值范围，内置两个关联的数字输入框，支持自定义单位、分隔符及 Formik 等表单绑定。
**编写时间**：2025-05-07 16:03:14

---

## 安装与引入



```tsx
import React from 'react';
import NumberRangeInput, { NumberRangeInputProps } from 'MithalCommonLibrary/NumberRangeInput';
```

---

## 基本示例

```tsx
export default function Demo() {
  const [range, setRange] = React.useState(['', '']);

  return (
    <NumberRangeInput
      label="价格区间"
      value={range}
      onChange={vals => setRange(vals)}
      splitStr="-"
      units={["元", "元"]}
      placeholder={["最低价", "最高价"]}
    />
  );
}
```

---

## 属性说明（`NumberRangeInputProps`）

| 属性            | 类型                                    | 默认值       | 说明                                       |
| ------------- | ------------------------------------- | --------- | ---------------------------------------- |
| `label`       | `string`                              | `''`      | 标题文本，通常用于查询栏显示，如“价格区间”                   |
| `labelWidth`  | `string` \| `number`                  | `110`     | 标题宽度，单位可为 px 或百分比                        |
| `value`       | `string[]`                            | `['','']` | 当前输入值数组，`[min, max]`                     |
| `name`        | `string[]`                            | `['','']` | 字段名数组，用于表单库（如 Formik）绑定                  |
| `onChange`    | `(value: string[]\|number[]) => void` | `()=>{}`  | 输入值变化回调，每次 min 或 max 改变时返回 `[min, max]`  |
| `splitStr`    | `string`                              | `''`      | 分隔文本，显示在两侧输入框之间，如“-”                     |
| `containerSx` | `SxProps<Theme>`                      | —         | 容器外层 `Stack` 的 MUI `sx` 样式               |
| `units`       | `string[]`                            | `[]`      | 单位数组，对应左右两侧输入框的 `InputAdornment` 文本      |
| `placeholder` | `string[]`                            | `[]`      | 占位符数组，对应左右两侧输入框，如 `['最小值','最大值']`        |
| *(继承)*        | *其余属性继承自 `NumberInputProps`（定制数字输入）*  | —         | 支持 `fixed`、`min`、`isFillZero` 等精度与限制相关配置 |

---

## 特性与注意事项

* **内置状态同步**：组件通过内部 `useState` 同步外部 `value`，确保受控与非受控一致。
* **单位展示**：`units` 支持在输入框后缀显示单位符号。
* **自定义分隔**：`splitStr` 可自定义分隔文案或图标样式。
* **Formik 集成**：可与 Formik 绑定，`name` 用于设置字段名，配合 Formik `setFieldValue` 使用。
* **样式扩展**：通过 `containerSx` 可自定义外层布局样式。

---

> **示例**：结合 Formik，使用 `name` 数组将两个值映射到不同字段。

```tsx
<Formik initialValues={{ minPrice: '', maxPrice: '' }} onSubmit={console.log}>
  {formik => (
    <form onSubmit={formik.handleSubmit}>
      <NumberRangeInput
        label="价格区间"
        name={["minPrice", "maxPrice"]}
        value={[formik.values.minPrice, formik.values.maxPrice]}
        onChange={([min, max]) => formik.setValues({ minPrice: min, maxPrice: max })}
        units={["元", "元"]}
        splitStr="~"
      />
      <button type="submit">提交</button>
    </form>
  )}
</Formik>
```
---


# NumberRoller 数字滚动组件

> 作者：廖力
> 创建时间：2022/04/11

一个支持数字滚动动画、千分位格式化、自适应字号显示的 React 组件，适用于仪表盘、报表等场景。

---

## ✨ 功能特色

* 支持数字平滑滚动动画
* 支持千分位格式化
* 支持小数点保留
* 支持自适应字体缩放
* 支持纯字符串渲染模式
* 提供数字变化回调

---

## 📦 安装与引入



```tsx
import NumberRoller from "MithalCommonLibrary/NumberRoller";
```

---

## 🔧 参数说明（Props）

| 参数名            | 类型                      | 默认值      | 描述                          |
| -------------- | ----------------------- | -------- | --------------------------- |
| `_value`       | `number \| string`      | `null`   | 要显示的数值，或 `"loadding"` 表示加载中 |
| `_isSplit`     | `boolean`               | `true`   | 是否启用千分位格式化                  |
| `_isAnimate`   | `boolean`               | `true`   | 是否启用数字滚动动画                  |
| `_delay`       | `number`                | `800`    | 动画持续时间，单位：毫秒                |
| `_fix`         | `number`                | `0`      | 小数位数                        |
| `_isAutoWidth` | `boolean`               | `false`  | 是否开启字号自动缩放以适配容器宽度           |
| `pureString`   | `boolean`               | `false`  | 是否渲染为纯字符串（非 React 元素）       |
| `onChange`     | `(val: string) => void` | `()=>{}` | 数字变化时触发的回调函数                |

---

## 📍 使用示例

### 基本使用

```tsx
<NumberRoller _value={123456} />
```

### 自定义参数

```tsx
<NumberRoller
  _value={45678.901}
  _isSplit={true}
  _isAnimate={true}
  _delay={500}
  _fix={2}
  _isAutoWidth={true}
/>
```

### 加载中状态

```tsx
<NumberRoller _value="loadding" />
```

### 纯字符串渲染

```tsx
<NumberRoller _value={123456} pureString />
```

---

## 🧠 实现细节

* 使用 jQuery 动画（`.animate()`）模拟数字滚动效果。
* 通过 `bignumber.js` 提供高精度处理。
* 自动监听 `resize` 事件，根据容器宽度动态缩放字体。
* 当 `_value` 为 `"loadding"` 时，会显示 loading 图标（需自行引入图标资源）。
* 组件已通过 `displayName` 明确命名，便于调试与识别。

---

## 🧪 注意事项

* 如使用自动缩放功能，请确保组件容器有明确的宽度限制。
* loading 图标路径默认注释，需按需启用：

  ```tsx
  // let svg = require('./load.svg');
  ```

---

## 📁 依赖库

* `@bobliao/use-jquery-hook` — 封装 jQuery 及环境判断
* `bignumber.js` — 精确计算浮点数
* 自定义工具函数：

  * `thousandsSplit` — 实现千分位格式化
  * `useDebounce` — 防抖 Hook，防止频繁计算




---


# PublicInqueryContainer 泛用型查询条件栏容器

> 编写者：廖力  
> 编写时间：2025-05-07 11:03:31 星期三  
> 所属模块：MithalCommonLibrary

## 📦 模块说明

`PublicInqueryContainer` 是一个可配置、可折叠的查询条件栏容器组件。通过统一的数据绑定与布局管理，快速组织 `PublicInqueryItem` 类型的子查询组件。支持自动化的表单提交、错误检查与节流处理，广泛应用于后台系统的高级筛选功能中。

---

## ⚙️ 属性定义（Props）

| 参数名                | 类型                          | 默认值         | 说明                                                                 |
|---------------------|-----------------------------|--------------|----------------------------------------------------------------------|
| `items`             | `PublicInqueryItemProp[]`   | —            | 查询项组件配置列表                                                  |
| `formik`            | `ReturnType<typeof useFormik>` | —            | 表单对象，需使用 `formik` 初始化                                     |
| `enabledFoldable`   | `boolean`                    | `false`      | 是否启用折叠模式                                                     |
| `foldShowCount`     | `number`                     | `2`          | 折叠状态下默认展示的查询项个数                                       |
| `defaultState`      | `"fold"` or `"unfold"`       | `"fold"`     | 折叠组件的默认展示状态                                              |
| `onSubmitButtonClick` | `() => void`               | 空函数        | 提交按钮点击回调（`isHandleSubmit = false` 时使用）                  |
| `onResetButtonClick`  | `() => void`               | 空函数        | 重置按钮点击回调（`isHandleReset = false` 时使用）                   |
| `labelWidth`        | `string \| number`           | `120`        | 统一设置查询项 label 宽度                                            |
| `isHandleSubmit`    | `boolean`                    | `false`      | 是否托管提交逻辑，由组件内部调用 `formik.handleSubmit`              |
| `isHandleReset`     | `boolean`                    | `false`      | 是否托管重置逻辑，自动恢复 `formik.values` 初始值并提交             |
| `isCheckError`      | `boolean`                    | `true`       | 提交时是否检查 `formik.errors` 并自动 toast 提示                    |
| `throttlingTime`    | `number`                     | `1000`       | 提交与重置操作的节流间隔，单位为毫秒                                |

---

## 🧩 依赖组件

- `PublicInqueryItem`: 查询项封装组件
- `FoldableInqueryContainer`: 可折叠容器组件
- `formik`: 表单管理库
- `@mui/material`: UI 布局和按钮
- `react-hot-toast`: 错误提示弹窗
- `useDebounce`: 自定义节流 Hook

---

## 🧪 使用示例

```tsx
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
      dateFormat: "YYYY-MM-DD hh:mm:ss",
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
  defaultState="fold"
  isHandleSubmit={true}
  isHandleReset={true}
/>
```

---

## 💡 注意事项

* 若设置 `isHandleSubmit = true`，则内部会调用 `formik.handleSubmit()`，否则需自行处理 `onSubmitButtonClick`。
* 若设置 `isHandleReset = true`，则重置按钮会回滚至首次挂载时的初始值并自动提交。
* `throttlingTime` 节流器可防止表单被过于频繁地提交。
* 表单错误将通过 `toast.error` 自动提示，提升用户体验。

---

## 🏷️ License

本组件用于 Mithal 内部系统，不对外开放使用。


---

# 公用查询组件容器（PublicInqueryItem）

> 📌 廖力编写 | 编写时间：2025-05-06 星期二 18:48:00  
> 模块名称：公用查询组件容器  
> 模块说明：用于快速开发查询条件栏目，将大量重复的查询条件组件中的编码集中到这个组件中统一管理。

---

## 📦 组件介绍

`PublicInqueryItem` 是一个用于封装表单查询项的通用容器组件，旨在减少在查询表单中对各种输入组件的重复封装和逻辑处理，提升开发效率。

该组件支持多种类型的输入组件，例如：
- `MithrilInput`
- `CustomNumberInput`
- `MithrilSelect`（支持单选/多选）
- `MithrilAutocomplete`（支持单选/多选）
- `AntdDateRangePacker`（时间范围选择器）
- `NumberRangeInput`

通过传入 `children`，并根据其组件类型自动注入标准化的 `props`（如 `placeholder`, `value`, `onChange` 等），并结合 `formik` 实现自动数据双向绑定。

---

## 🧩 Props 参数说明

| 参数名             | 类型                                                 | 说明                                                 | 默认值         |
|------------------|----------------------------------------------------|----------------------------------------------------|--------------|
| `children`       | `ReactElement \| ReactElement[] \| null`            | 查询项组件，如输入框、选择框等                              | 必填           |
| `label`          | `string`                                            | 显示名称（组件标签），可自动添加 placeholder 前缀                 | 可选           |
| `name`           | `string \| string[]`                                | 对应表单数据字段名。部分组件（如范围类组件）支持数组方式传递         | 可选           |
| `formik`         | `any`                                               | 绑定的 Formik 实例，用于处理表单状态                            | 可选           |
| `selectItems`    | `{ label: string; value: string }[]`               | 下拉选项数据源，适用于 Select 和 Autocomplete 类型组件       | 可选           |
| `comGridProps`   | `GridProps`                                         | 包裹组件的 MUI `Grid` 布局属性                           | `{}`         |
| `dateFormat`     | `string`                                            | 时间组件格式化方式（适用于 `AntdDateRangePacker`）         | `"YYYY-MM-DD"` |
| `isMutipleSelections` | `boolean`                                       | 是否为多选（适用于 Select 或 Autocomplete）              | `false`      |
| `labelWidth`     | `number \| string`                                  | 标签宽度（组件内部传递）                                 | `120`        |

---

## 🛠️ 功能亮点

### 🔁 自动注入属性

通过识别子组件类型，自动注入合适的 props：

- `placeholder`：根据组件类型自动生成（如"请输入xxx"、"请选择xxx"）
- `value` 和 `onChange`：自动与 Formik 对应字段进行绑定
- `multiple`：自动支持多选场景
- `defaultValue` / `value`：统一兼容 Select、Autocomplete、日期范围组件等格式

### 🔍 组件识别逻辑

通过 `children.type.displayName` / `children.type.name` 等方式判断组件类型，并自动适配内部逻辑，减少调用方配置工作。

### 📚 表单状态管理

集成 Formik 表单库，实现统一的字段状态维护和数据收集。可自动调用 `formik.setFieldValue` 进行赋值和更新。

---

## 🧪 使用示例

```tsx
	<Formik initialValues={{ username: "", gender: "", dateRange: ["", ""] }} onSubmit={handleSubmit}>
		{(formik) => (
			<Grid container spacing={2}>
				<PublicInqueryItem label="用户名" name="username" formik={formik}>
					<MithrilInput />
				</PublicInqueryItem>

				<PublicInqueryItem
					label="性别"
					name="gender"
					selectItems={[{ label: "男", value: "1" }, { label: "女", value: "2" }]}
					formik={formik}
				>
					<MithrilSelect />
				</PublicInqueryItem>

				<PublicInqueryItem
					label="注册日期"
					name={["startDate", "endDate"]}
					formik={formik}
				>
					<AntdDateRangePacker />
				</PublicInqueryItem>
			</Grid>
		)}
	</Formik>
```

---

# MithrilSelect 组件文档

`MithrilSelect` 是一个基于 MUI `Select` 的二次封装组件，支持单选、多选、占位符、自定义样式、布局方向控制等功能。

---

## ✨ 使用示例

```tsx
	import MithrilSelect from 'MithalCommonLibrary/MithrilSelect';

	const options = [
	{ value: 'apple', label: '苹果' },
	{ value: 'banana', label: '香蕉' },
	{ value: 'orange', label: '橘子' },
	];

	<MithrilSelect
	label="水果"
	required
	placeholder="请选择水果"
	value="apple"
	data={options}
	onChange={(val) => console.log(val)}
	/>
```

---

## 📦 Props

| 参数名            | 类型                                             | 说明                          | 默认值              |
| -------------- | ---------------------------------------------- | --------------------------- | ---------------- |
| `id`           | `string`                                       | 组件唯一标识                      | -                |
| `name`         | `string`                                       | Select 的 `name` 属性          | -                |
| `label`        | `React.ReactNode \| string`                    | 左侧标签内容                      | -                |
| `labelWidth`   | `number`                                       | 标签宽度（px）                    | 自动宽度             |
| `required`     | `boolean`                                      | 是否为必填项，显示红色星号               | `false`          |
| `value`        | `string \| string[]`                           | 当前选中值                       | `[]`             |
| `defaultValue` | `string \| string[]`                           | 默认初始值                       | -                |
| `multiple`     | `boolean`                                      | 是否多选                        | `false`          |
| `sx`           | `SxProps<Theme>`                               | MUI `Select` 根节点样式扩展        | `{ width: 140 }` |
| `stackSx`      | `SxProps<Theme>`                               | 外层 `Stack` 样式               | -                |
| `fullWidth`    | `boolean`                                      | 是否占满父容器宽度                   | `false`          |
| `size`         | `'small' \| 'medium'`                          | 尺寸规格                        | `'small'`        |
| `error`        | `boolean`                                      | 是否展示错误状态（红边等）               | `false`          |
| `direction`    | `'row' \| 'column'`                            | `label` 和 `Select` 排列方向     | `'row'`          |
| `data`         | `{ value: string \| number, label: string }[]` | 下拉选项数据源                     | `[]`             |
| `placeholder`  | `string`                                       | 无选项时的占位文本                   | -                |
| `change`       | `boolean`                                      | 是否启用直接触发 `onChange`（跳过格式处理） | `false`          |
| `disabled`     | `boolean`                                      | 是否禁用                        | `false`          |
| `colon`        | `boolean`                                      | 是否在标签后显示冒号                  | `true`           |
| `spacing`      | `number`                                       | `Stack` 子项间距                | `2`              |
| `onChange`     | `(value: string \| string[]) => void`          | 选中值变化回调                     | -                |

---

## 🧠 逻辑说明

* **占位符逻辑**：当 `value` 为空时，且 `placeholder` 存在，会渲染一个隐藏且禁用的 `MenuItem` 作为默认选项。
* **多选处理**：当 `multiple = true` 时，`value` 和 `onChange` 参数为数组。
* **change = true**：表示直接将值传给 `onChange`，否则会对 string 类型值做切割处理。
* **主题样式**：若当前为占位符状态，会使用浅色文字和透明度样式以示区别。

---

## 📌 注意事项

1. `value` 和 `defaultValue` 建议配合使用，受控模式下请传入 `value`。
2. 如果是多选，请确保传入的是字符串数组。
3. 若需强制占位符显示，请确保 `value` 为空或为 `""`，并传入 `placeholder`。

---

## 🧩 样式建议

* 推荐通过 `sx` 自定义 `Select` 的宽度等样式；
* 推荐通过 `stackSx` 控制整体布局和外间距。

---

## 📛 开发备注

* 组件显示名称：`MithrilSelect`
* 默认导出，可直接使用 `import MithrilSelect from '...'`

```tsx
	MithrilSelect.displayName = "MithrilSelect";
	export default MithrilSelect;
```

---


# SingleDatePicker 组件文档

## 模块说明

**作者：廖力**  
**编写时间：2025-05-13 17:40:27（星期二）**

此组件为系统内统一样式的**单一时间选择框**，解决了以下问题：

- 默认时间格式强制显示为 `YYYY-MM-DD`，不符合部分场景需求。
- 无法自定义 `placeholder` 占位符的问题。
- 在组件获得焦点后强制显示默认格式 `YYYY-MM-DD` 的问题。
- 时间框在关闭时弹窗反复跳动影响用户体验的问题。

---

## 功能特性

- 支持传入自定义 `placeHolder` 或 `placeholder`。
- 使用 `dayjs` 作为时间处理库，并设置中文语言。
- 禁止键盘输入，仅允许通过日期选择器选择时间。
- 点击整个输入框区域可打开选择器。
- 修复时间选择面板在关闭时闪动跳动的问题。

---

## 使用示例

```tsx
import React from "react";
import SingleDatePicker from "./SingleDatePicker";

const App = () => {
  return (
    <SingleDatePicker
      label="选择日期"
      placeHolder="请选择日期"
      format="YYYY-MM-DD"
      value={dayjs()}
      onChange={(val) => console.log(val?.format("YYYY-MM-DD"))}
    />
  );
};
```

---

## 接口定义

```ts
interface iprops extends Omit<DatePickerProps<Dayjs>, "placeHolder" | "placeholder"> {
  /**
   * 占位符文本（优先级高于 placeholder）
   */
  placeHolder?: string;

  /**
   * 占位符文本
   */
  placeholder?: string;
}
```

---

## 技术实现要点

* 使用 `@mui/x-date-pickers` 提供的 `DatePicker` 组件。
* 重写 `slots.field` 插槽，替换默认输入框行为。
* 将输入框设置为 `readOnly`，避免键盘输入带来的不一致行为。
* 使用 `zIndex` 控制 `popper` 显隐，解决组件关闭时抖动问题。
* 状态 `open` 显式控制弹窗开关逻辑，避免默认行为引发的异常。

---

## 注意事项

* 该组件默认设置为 `readOnly`，不可键盘输入日期。
* 建议配合 `format="YYYY-MM-DD"` 使用，确保日期格式统一。
* 如果使用自定义 `placeHolder`，无需传递 `placeholder`，但仍可兼容旧参数。

---

## 依赖项

* `@mui/material`
* `@mui/x-date-pickers`
* `dayjs`

---



# MithrilAntdTable 组件说明文档

> **编写者：** 廖力
> **组件名称：** `MithrilAntdTable`
> **编写日期：** *2025-05-13*

## ✨ 组件目的

`MithrilAntdTable` 是一个基于 [Ant Design Table](https://ant.design/components/table/) 的二次封装组件，旨在提供：

* 通用、统一风格的表格展示能力；
* 支持分页、高亮行、操作区、滚动、选择行等常见需求；
* 精简封装常用交互逻辑，提升开发效率。

---

## 📦 使用方式

```tsx
import MithrilAntdTable from "MithalCommonLibrary/MithrilAntdTable";

<MithrilAntdTable
  columns={columns}
  dataSource={data}
  total={100}
  current={1}
  pageSize={10}
  onChange={(page, size) => {}}
  onRowClick={(row) => console.log(row)}
  rowId={selectedId}
  recordKey="id"
  actionDOM={<MyActionBar />}
/>
```

---

## 🔧 组件属性（Props）

| 属性名              | 类型                                         | 默认值         | 描述                             |
| ---------------- | ------------------------------------------ | ----------- | ------------------------------ |
| `columns`        | `ColumnType[]`                             | -           | 表格列配置，详见 Antd Table Column API |
| `dataSource`     | `any[]`                                    | -           | 表格数据源                          |
| `total`          | `number`                                   | `10`        | 数据总数（用于分页）                     |
| `current`        | `number`                                   | `1`         | 当前页码                           |
| `pageSize`       | `number`                                   | `10`        | 每页数据条数                         |
| `actionDOM`      | `ReactNode`                                | -           | 顶部/底部操作区域（如按钮组）                |
| `rowKey`         | `string \| (record) => string`             | -           | 行唯一标识字段                        |
| `rowId`          | `number \| string`                         | `-1`        | 需要高亮的行的标识值                     |
| `recordKey`      | `string`                                   | `""`        | 高亮行对应的字段名                      |
| `scroll`         | `object`                                   | `undefined` | 表格滚动设置                         |
| `bordered`       | `boolean`                                  | `false`     | 是否展示边框                         |
| `size`           | `'small' \| 'middle' \| 'large'`           | `'large'`   | 表格尺寸                           |
| `rowSelection`   | `TableRowSelection<any>`                   | `undefined` | 行选择配置                          |
| `onChange`       | `(page: number, pageSize: number) => void` | -           | 分页改变的回调函数                      |
| `onRowClick`     | `(record: any) => void`                    | -           | 行点击回调                          |
| `onRowMouseOver` | `(event, record) => void`                  | -           | 鼠标悬浮某行时的回调                     |
| `onRowMouseOut`  | `(event, record) => void`                  | -           | 鼠标离开某行时的回调                     |
| `style`          | `React.CSSProperties`                      | `{}`        | 表格外层容器样式                       |

---

## 📚 特性与行为说明

### ✅ 支持分页（默认开启）

* 显示总数（例如“共 100 条”）；
* 默认禁用“每页条数”切换；
* 提供分页变更回调 `onChange`。

### ✅ 支持高亮某一行

* 通过 `rowId` 与每行的 `recordKey` 对应；
* 自动给命中的行添加 Antd 默认选中行样式。

### ✅ 支持顶部操作栏

* `actionDOM` 参数用于传入任意 DOM，如操作按钮等；
* 存在操作栏时会自动渲染分割线。

### ✅ 支持鼠标交互事件

* `onRowClick`：点击行触发；
* `onRowMouseOver` / `onRowMouseOut`：悬浮与离开事件。

### ✅ 默认无 loading 状态

* 可按需拓展为带加载指示的表格。

---

## 🧩 样式覆盖说明

* 高亮选中行使用的是 `ant-table-row-selected` 样式类；
* 外层容器使用 MUI 的 `Box` 包裹，支持额外样式传入。

---


# MithrilTextArea 文本域组件

> 廖力编写
> 编写时间：2025年3月14日
> 模块名称：文本域
> 模块说明：封装了带有最大长度控制的 Material UI 文本域组件。

---

## ✨ 简介

`MithrilTextArea` 是一个基于 Material UI 的 `TextField` 组件进行二次封装的文本输入组件，提供了 `maxLength` 属性用于控制最大输入字符数。由于 MUI 的 `TextField`（`multiline`）不原生支持 `maxLength`，此组件使用 jQuery 动态添加 `textarea` 的 `maxLength` 属性。

---


---

## 🔧 使用方式

```tsx
import React from "react";
import MithrilTextArea from "MithalCommonLibrary/MithrilTextArea";

const Example = () => {
	return (
		<MithrilTextArea
			label="备注"
			variant="outlined"
			multiline
			rows={4}
			fullWidth
			maxLength={100}
		/>
	);
};

export default Example;
```

---

## 🧩 Props

`MithrilTextArea` 继承了 Material UI 的 [`TextFieldProps`](https://mui.com/material-ui/api/text-field/) 类型，同时扩展了以下属性：

| 属性名         | 类型       | 默认值 | 说明                      |
| ----------- | -------- | --- | ----------------------- |
| `maxLength` | `number` | -   | 设置 `textarea` 输入的最大字符长度 |

> ⚠️ 注意：需要在 `multiline={true}` 的前提下使用 `maxLength` 才有效。

---

## 🧠 实现细节

* 使用了 `useRef` 获取内部的 DOM 节点；
* 通过 `@bobliao/use-jquery-hook` 提供的 `$` 来访问 textarea 元素；
* 首次渲染时自动为内部 `<textarea>` 添加 `maxLength` 属性；
* 使用 `isMounted` 状态控制只在组件挂载时操作 DOM，防止重复设置。

---



# TextPrinter 逐字打印文本组件

> 模块说明：群组首页 - 文本动画打印组件
> 作者：廖力
> 编写时间：暂无记录

---

## ✨ 简介

`TextPrinter` 是一个用于逐字打印文本内容的 React 组件，支持打字机动画效果，并附带可选的闪烁光标。适用于群组首页、登录欢迎页、提示引导等动态展示场景。

---

## 🧩 Props 参数说明

| 参数名           | 类型        | 默认值     | 说明              |
| ------------- | --------- | ------- | --------------- |
| `_value`      | `string`  | `""`    | 要打印的文本内容        |
| `_isAnimate`  | `boolean` | `true`  | 是否启用打字动画效果      |
| `_hideCursor` | `boolean` | `false` | 文本打印完成后是否自动隐藏光标 |
| `_time`       | `number`  | `800`   | 动画持续时间（毫秒）      |
| `_delayTime`  | `number`  | `0`     | 延迟动画开始的时间（毫秒）   |

---

## 📦 依赖环境

该组件依赖以下环境和库：

* React 17+ 或 18+
* jQuery（通过 `@bobliao/use-jquery-hook` 获取 `$` 实例）
* CSS Modules（组件使用了 `index.module.scss`）
* SCSS 动画样式（用于光标动画）

---

## 💡 使用示例

```tsx
import React from "react";
import TextPrinter from "./TextPrinter";

export default function Example() {
	return (
		<div>
			<TextPrinter
				_value="欢迎来到群组首页！"
				_isAnimate={true}
				_hideCursor={true}
				_time={1200}
				_delayTime={300}
			/>
		</div>
	);
}
```

---

## 🎨 动画说明

* 文字动画是基于 `jQuery.animate` 实现的逐字符输出；
* 光标动画依赖 `SCSS` 中的 `@keyframes` 动画；
* `animation-duration` 会在 0s \~ 2s 之间随机变化，增加打字真实感。

---

## 🔧 样式自定义

组件使用了 CSS Module（`index.module.scss`）中定义的类名：

```scss
.textPrinter_cursor {
	animation: blink 1s step-end infinite;
}
```

你可以自由修改 `textPrinter_cursor` 样式来自定义光标颜色、动画节奏、闪烁频率等。

---

## 📌 注意事项

* 不建议在 SSR 环境中使用本组件，因为其依赖 DOM 和 jQuery 操作；
* 若 `_isAnimate` 设置为 `false`，文本会直接完整显示，不进行动画；
* `_hideCursor` 设置为 `true` 后，在动画完成约 1 秒后会自动淡出光标；

---

以下是为你提供的 `MithrilYesNoSwitch` 组件编写的 `README.md` 文档，内容包括组件介绍、使用说明、参数说明等，适合放在项目文档或组件库中：

---

# MithrilYesNoSwitch 开关组件

> 📦 作者：廖力
> 🧩 模块名称：是否开关
> 🕒 编写时间：2025-03-31

## 简介

`MithrilYesNoSwitch` 是一个“是 / 否”二选一的 UI 组件，适用于表单、设置项等需要布尔类型选择的场景。该组件使用 Material UI 的 `ButtonGroup` 实现，支持禁用状态、文案自定义、值回传等功能。

---

## 示例

```tsx
import React, { useState } from "react";
import MithrilYesNoSwitch from "MithalCommonLibrary/MithrilYesNoSwitch";

export default function Demo() {
  const [status, setStatus] = useState(true);

  return (
    <MithrilYesNoSwitch
      value={status}
      onChange={(val) => setStatus(Boolean(val))}
      yesStr="启用"
      noStr="禁用"
      enabled={true}
    />
  );
}
```

---

## 属性（Props）

| 属性名        | 类型                            | 默认值        | 说明                                            |
| ---------- | ----------------------------- | ---------- | --------------------------------------------- |
| `enabled`  | `boolean`                     | `true`     | 控件是否可用，`false` 时按钮不可点击                        |
| `yesStr`   | `string`                      | `"是"`      | “是”按钮显示的文本                                    |
| `noStr`    | `string`                      | `"否"`      | “否”按钮显示的文本                                    |
| `value`    | `string \| number \| boolean` | `"0"`      | 当前值，可为 `"0"`、`0`、`true`、`false` 等多种类型，内部将自动转换 |
| `onChange` | `(value: boolean) => void`    | `() => {}` | 值变更时的回调函数，参数为布尔值                              |

---

## 交互逻辑

* 当 `value` 为以下任意值时视为“是”状态：

  * 字符串 `"0"`
  * 数值 `0`
  * 布尔值 `true`

* 其他值一律视为“否”状态。

* 当用户点击按钮切换状态后，会调用 `onChange` 回调，将新的布尔值作为参数传出。

---

## 样式说明

* 使用 Material UI 提供的 `ButtonGroup`、`Button` 进行样式组织。
* 支持根据状态动态设置颜色、背景、边框等样式。
* 禁用状态下，按钮样式会变为灰色背景或边框，防止交互。

---

## 注意事项

* 若传入 `value` 为非标准布尔、数字、字符串，建议开发者自行进行类型转换以确保逻辑一致性。
* 若需要国际化，请自行根据语言包设置 `yesStr` 和 `noStr` 文案。

---

## 组件命名

组件的 `displayName` 被手动设置为 `"MithrilYesNoSwitch"`，以确保在混淆或打包压缩时仍能被准确识别。

---


# 相对容器的 resohook

作者：廖力  
编写时间：2024年9月5日 22:12:19  

---

## 模块说明

`RelativeEmResoHook` 是一个用于计算和管理相对字体大小的 React Hook 和组件。它基于父容器尺寸及设计稿尺寸，动态计算当前容器内元素的字体大小，从而实现基于 `em` 单位的响应式布局。

> **注意事项**  
> - 父容器的任何 `fontSize` 设置都会影响子容器的 `em` 相对大小。  
> - 在使用该组件时，如果组件内存在文字，建议给文字单独包裹一个设置字体大小的父节点，而不是给多个子节点分别设置字体大小，否则会产生奇怪的副作用。

---

## 功能特点

- 动态监听容器大小变化（通过 `ResizeObserver`），实时计算字体大小。  
- 支持基于宽度、高度或自动模式（宽高比例比较）调整字体大小。  
- 通过 Context 提供字体大小信息，方便子组件消费。  
- 适合用于复杂、苛刻的布局需求，实现相对字体大小的统一管理和缩放。

---

## 使用示例

```tsx
import { RelativeEmResoDiv } from "MithalCommonLibrary/RelativeEmResoHook";

<RelativeEmResoDiv
  className="container-class"
  fontSize={16}
  designWidth={1920}
  designHeight={1080}
  mode="auto"
  debounceTime={200}
>
  {/* 子元素，内部采用em单位布局 */}
  <div style={{ fontSize: "1em" }}>这里的字体大小会根据容器动态调整</div>
</RelativeEmResoDiv>
```
---

## API 说明

### `useRelativeEmResoHookDataHook(props: IRelativeEmResoHookProps)`

计算相对字体大小的 Hook，返回包含当前容器尺寸和计算后字体大小的对象。

| 参数             | 类型                              | 说明                |
| -------------- | ------------------------------- | ----------------- |
| `fontSize`     | `number`                        | 标准字体大小，通常为设计稿字体大小 |
| `designWidth`  | `number`                        | 设计稿宽度             |
| `designHeight` | `number`                        | 设计稿高度             |
| `mode`         | `"auto" \| "width" \| "height"` | 计算模式：自动、基于宽度或基于高度 |

返回值包含：

* `isMounted`：组件是否挂载
* `containerWidth`：当前容器宽度
* `containerHeight`：当前容器高度
* `currentFontSize`：当前计算得到的字体大小
* `updateContainerSize(width, height)`：更新容器尺寸方法

---

### `RelativeEmResoHookDataContext`

React Context，提供 Hook 计算的字体大小和容器尺寸数据，供子组件使用。

---

### `useRelativeEmResoHookDataContext()`

自定义 Hook，用于消费 `RelativeEmResoHookDataContext` 中的数据。

---

### `RelativeEmResoDiv` 组件

基于 `useRelativeEmResoHookDataHook` 实现的容器组件，内部通过 `ResizeObserver` 监听尺寸变化，并动态调整字体大小。

#### Props

| 参数             | 类型                               | 说明                |
| -------------- | -------------------------------- | ----------------- |
| `className`    | `string`                         | 容器的 CSS 类名        |
| `fontSize`     | `number`                         | 标准字体大小，通常是设计稿字体大小 |
| `designWidth`  | `number`                         | 设计稿宽度             |
| `designHeight` | `number`                         | 设计稿高度             |
| `mode`         | `"auto" \| "width" \| "height"`  | 字体计算模式            |
| `debounceTime` | `number`                         | 尺寸变化防抖时间，单位毫秒     |
| `children`     | `ReactElement \| ReactElement[]` | 子元素               |

---

## 关键实现细节

* 通过 `ResizeObserver` 监听容器尺寸变化，结合防抖 `useDebounce` 减少频繁计算。
* 字体大小计算遵循设计稿宽高比例，自动/宽度/高度模式切换。
* 使用 Context 共享计算结果，方便内部子组件调用。
* 组件渲染一个 `div` 容器，并通过动态设置 `font-size` 样式，实现内部 `em` 单位的缩放。

---

## 注意

* 使用时，尽量避免父容器有多处字体大小设置，尤其是嵌套文字时，最好单独包裹文字部分。
* 适合需要精细字体缩放及响应式布局的复杂场景。

---

如果你需要示例代码或者集成建议，欢迎随时提问！

```

如果你希望我帮你生成更简洁版本或包含具体示例代码，也可以告诉我！
```

---
下面是基于你提供的防抖钩子代码，帮你写的一个完整且规范的 Markdown 文档：


# useDebounce Hook

## 模块说明

`useDebounce` 是一个 React 自定义 Hook，用于实现函数防抖功能，避免某些函数被频繁调用，从而优化性能和体验。

该钩子可以帮助你在指定时间内只执行一次函数调用，适用于处理输入框搜索、窗口大小调整、滚动事件等频繁触发的场景。

---

## API

### `debounce(_func: () => void, _time?: number, _funcVoid?: () => void): void`

防抖函数。

| 参数       | 类型         | 说明                                                         | 默认值  |
| ---------- | ------------ | ------------------------------------------------------------ | ------- |
| `_func`    | `() => void` | 需要执行的防抖函数                                           | 必填    |
| `_time`    | `number`     | 防抖延迟时间，单位毫秒。若为 `0`，则直接执行，不做防抖。      | `500`   |
| `_funcVoid` | `() => void` | 当函数被重复调用取消之前的延迟时执行的回调函数（可选）。     | 无      |

---

## 使用示例

```tsx
import React, { useState } from "react";
import useDebounce from "MithalCommonLibrary/utils/useDebounce";

const SearchInput: React.FC = () => {
  const [query, setQuery] = useState("");
  const debounce = useDebounce();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debounce(() => {
      setQuery(value);
      console.log("搜索关键词：", value);
    }, 300);
  };

  return <input type="text" onChange={handleChange} placeholder="输入关键词搜索" />;
};
```

---

## 代码说明

* 使用 `useRef` 保存当前防抖函数和定时器 ID，避免每次渲染重新创建。
* 第一次调用时立即执行函数（除非设置时间为0）。
* 在指定时间内如果再次调用，则清除之前定时器，执行可选的取消回调。
* 组件卸载时清理状态，防止内存泄漏。

---

## 注意事项

* 该 Hook 内部维护了一个 `isMounted` 状态，确保组件挂载时才会生效。
* 传入的防抖时间默认是 500 毫秒，可以根据需要调整。
* 如果设置防抖时间为 0，则函数不会被防抖，直接执行。

---

## 版本信息

* 编写时间：2024年5月15日
* 作者：廖力

---

## 相关依赖

* React 17+ 或 React 18+
* TypeScript（可选，代码示例为 TypeScript）

---

如有问题欢迎反馈。

---
以下是你这段代码的完整 Markdown 文档，包含模块介绍、接口说明、功能描述、使用示例等，方便直接用作项目文档：


# 动态下拉框选项等参数快速获取器（useDynamicSelectionsParams）

---

## 模块信息

- **作者**：廖力  
- **模块名称**：动态下拉框选项等参数快速获取器  
- **模块说明**：用于表单填写/查询栏的动态下拉框参数获取，通过依赖参数动态拉取选项数据。  
- **编写时间**：2025-05-14 09:21:32 星期三

---

## 功能介绍

该 Hook 通过传入一组配置项（包含名称、依赖参数及异步拉取选项数据的方法），根据传入的外部参数（如 Formik 的 values）动态异步获取对应的下拉框选项数据。

它自动监听依赖参数变化，避免无效重复拉取，提升性能与体验。

---

## 主要接口说明

### `IselectionItem`

```ts
interface IselectionItem {
  label: string;      // 选项显示文本
  value: string;      // 选项对应的值
  dataRow?: any;      // 额外附加数据（可选）
}
```

### `IDynamicSelectionsParamsProp`

```ts
interface IDynamicSelectionsParamsProp {
  name: string;       // 该选项组的唯一标识名称
  fetchFunction: (value: { [property: string]: any }) => IselectionItem[] | Promise<IselectionItem[]> | undefined | null;
                      // 用于拉取选项数据的函数，接收依赖参数对象，返回选项数组或 Promise
  depParams?: string[];  // 依赖的外部参数字段名数组（可选）
}
```

---

## Hook 使用方式

```ts
const {
  updateFormikValues,       // 外部提交参数更新函数，传入Formik最新值
  forceUpdateFormikValues,  // 强制更新Formik值
  selections,               // 拉取到的选项集合，key为name，value为IselectionItem数组
  selectionsUpdateStamp,    // 选项更新时间戳，每次更新都会刷新
  currentFormikValues       // 当前内部存储的Formik值
} = useDynamicSelectionsParams(DSPProps);
```

---

## 参数说明

* **DSPProps**: `IDynamicSelectionsParamsProp[]`
  动态下拉框配置数组。每项配置指定一个下拉选项集的名称、获取数据的方法和依赖的外部参数字段。

---

## 核心逻辑描述

1. 内部维护当前Formik参数状态，监听依赖字段变更，避免无谓的重复请求。
2. 依赖字段发生变化或组件初始化时，依次调用各配置的 `fetchFunction`，传入对应依赖参数获取最新选项数据。
3. 将所有选项存储在 `selections` 状态中，通过 `name` 作为 key 访问。
4. 通过时间戳 `selectionsUpdateStamp` 标识选项数据的最新变更，方便触发组件刷新。

---

## 使用示例

```tsx
import React, { useEffect } from "react";
import useDynamicSelectionsParams, { IselectionItem } from "MithalCommonLibrary/utils/useDynamicSelectionsParams";
import axiosServices from "./axiosServices"; // 自定义 axios 封装

const MyComponent = () => {
  const dynSelections = useDynamicSelectionsParams([
    {
      name: "name1",
      fetchFunction: async () => {
        const { data } = await axiosServices.get(`/statusType/query`);
        return data.data.map((item: any) => ({
          label: item.name.toString(),
          value: item.id.toString(),
        }));
      },
    },
    {
      name: "name2",
      fetchFunction: async (_depParams) => {
        const { data } = await axiosServices.get(`/statusType/query`);
        return data.data.map((item: any) => ({
          label: item.name.toString(),
          value: item.id.toString(),
        }));
      },
      depParams: ["FormiKname1"],
    },
    {
      name: "statusTypeArr",
      fetchFunction: async (_depParams) => {
        const { data } = await axiosServices.get(`/statusType/query`);
        return data.data.map((item: any) => ({
          label: item.name.toString(),
          value: item.id.toString(),
        }));
      },
      depParams: ["FormiKname1", "FormiKname2"],
    },
  ]);

  // 假设 formik.values 变化时调用此hook的update函数
  useEffect(() => {
    dynSelections.updateFormikValues(formik.values);
  }, [formik.values]);

  // 使用示例访问选项
  // dynSelections.selections.name1
  // dynSelections.selections.name2
  // dynSelections.selections.statusTypeArr

  return <div>...</div>;
};
```

---

## 注意事项

* `fetchFunction` 支持同步和异步返回选项数据。
* `depParams` 用于指定当前选项数据依赖的外部参数字段，只有依赖字段变化时才重新拉取数据。
* 该 Hook 依赖 React 16.8+ Hooks 体系。
* 选项数据结构统一为 `{label, value, dataRow?}`，方便直接渲染下拉列表。

---

下面是你提供的 `useDynState` 钩子的完整 Markdown 文档，包含模块说明、接口说明、使用说明及示例，方便阅读和后续维护。

---

# useDynState — 动态数据状态钩子

## 模块说明

`useDynState` 是一个用于管理动态数据状态的 React Hook。它不仅管理数据的值，还管理该数据的加载状态、加载次数、加载时间戳、是否正在加载及错误信息等。适用于需要异步加载数据且可能轮询刷新数据的场景。

* **编写时间**：2024年8月5日 03:44:00
* **作者**：廖力

---

## 类型定义

```ts
export type TloadingState = "unstarted" | "padding" | "finished" | "finished nulldata" | "finished error";
```

动态数据的加载状态，含义如下：

| 状态                  | 说明        |
| ------------------- | --------- |
| `unstarted`         | 未开始加载     |
| `padding`           | 加载中       |
| `finished`          | 加载完成      |
| `finished nulldata` | 加载完成但无数据  |
| `finished error`    | 加载完成且发生错误 |

---

## 接口说明：`IloadDataFunction<T>`

这是传递给加载数据函数的参数对象接口，定义如下：

```ts
export interface IloadDataFunction<T> {
  val: T; // 当前值
  set: (_value: T | ((_value: T) => T)) => void; // 设置值
  setisLoading: (_value: boolean) => void; // 设置加载中状态
  setloadingState: (_value: TloadingState) => void; // 设置加载状态
  seterrorMessage: (_value: string) => void; // 设置错误信息
  isLoading: boolean; // 是否正在加载
  loadingState: TloadingState; // 当前加载状态
  setTimes: number; // 状态被设置的次数
  stamp: number; // 最近一次更新时间戳
  errorMessage: string; // 错误信息
}
```

---

## Hook 参数说明

```ts
useDynState<T>(
  defaultValue: T,
  config?: {
    loadDataFuncton?: (props: IloadDataFunction<T>) => void; // 加载数据函数
    isEnablePolling: boolean; // 是否开启轮询
    pollDelay: number; // 轮询间隔，单位毫秒
  }
)
```

* `defaultValue`: 状态的默认值。
* `config`: 配置对象，可选

  * `loadDataFuncton`: 绑定的加载数据函数
  * `isEnablePolling`: 是否开启轮询，默认关闭
  * `pollDelay`: 轮询间隔，单位毫秒

---

## 返回值

Hook 返回一个对象，包含以下属性和方法：

| 属性/方法             | 类型                                                    | 说明                        |     |
| ----------------- | ----------------------------------------------------- | ------------------------- | --- |
| `val`             | `T`                                                   | 当前值                       |     |
| `set`             | \`(value: T                                           | (prev: T) => T) => void\` | 设置值 |
| `load`            | `() => void`                                          | 触发绑定的加载函数                 |     |
| `reload`          | `() => void`                                          | 触发绑定的重新加载函数               |     |
| `setTimes`        | `number`                                              | 设置次数                      |     |
| `stamp`           | `number`                                              | 最近一次更改时间戳                 |     |
| `isLoading`       | `boolean`                                             | 是否正在加载                    |     |
| `loadingState`    | `TloadingState`                                       | 当前加载状态                    |     |
| `setLoadingState` | `(state: TloadingState) => void`                      | 设置加载状态                    |     |
| `bindLoader`      | `(fn: (props: IloadDataFunction<T>) => void) => void` | 绑定加载数据函数                  |     |
| `bindReloader`    | `(fn: (props: IloadDataFunction<T>) => void) => void` | 绑定重新加载函数                  |     |
| `errorMessage`    | `string`                                              | 当前错误信息                    |     |
| `reset`           | `() => void`                                          | 重置状态到初始值                  |     |

---

## 使用示例

```tsx
import React, { useEffect } from "react";
import { useDynState, TloadingState } from "MithalCommonLibrary/utils/useDynState";

interface IUserData {
  name: string;
  age: number;
}

const fetchUserData = async (): Promise<IUserData> => {
  // 模拟异步请求
  return new Promise((res) => setTimeout(() => res({ name: "张三", age: 30 }), 1000));
};

function UserComponent() {
  const {
    val: userData,
    set,
    load,
    isLoading,
    loadingState,
    errorMessage,
    reset,
    bindLoader,
  } = useDynState<IUserData>({ name: "", age: 0 }, {
    isEnablePolling: false,
    pollDelay: 0,
  });

  // 绑定加载函数
  useEffect(() => {
    bindLoader(async ({ set, setloadingState, seterrorMessage }) => {
      try {
        setloadingState("padding");
        const data = await fetchUserData();
        set(data);
        setloadingState("finished");
      } catch (error) {
        setloadingState("finished error");
        seterrorMessage("加载失败");
      }
    });
  }, [bindLoader]);

  // 页面加载时触发加载数据
  useEffect(() => {
    load();
  }, [load]);

  if (isLoading) return <div>加载中...</div>;
  if (loadingState === "finished error") return <div>错误：{errorMessage}</div>;

  return (
    <div>
      <h3>用户信息</h3>
      <p>姓名：{userData.name}</p>
      <p>年龄：{userData.age}</p>
      <button onClick={reset}>重置</button>
    </div>
  );
}
```

---

## 备注

* 轮询功能会在数据加载完成后根据配置的 `pollDelay` 自动重新触发加载。
* 加载函数和重新加载函数通过 `bindLoader` 和 `bindReloader` 绑定。
* 错误信息由钩子自动管理，方便在组件中展示。

---


# 公用详情页面用的 Data Hook (useMainDataHook)

> **作者**：廖力
> **编写时间**：2025-04-14 10:57:04 星期一
> **模块说明**：该模块实现了一个公用详情页面的 React Hook，集成了 `formik` 表单管理、路由参数获取、节流提交、动态参数处理等功能，并基于 Context 进行状态共享。

---

## 目录

* [功能说明](#功能说明)
* [类型定义](#类型定义)
* [参数说明](#参数说明)
* [返回值](#返回值)
* [使用示例](#使用示例)
* [Context 说明](#context-说明)

---

## 功能说明

* 支持三种模式：新增(`add`)、编辑(`edit`)、查看(`watch`)
* 通过路由参数自动识别当前模式和详情数据 ID
* 集成 `formik`，支持表单验证、自动加载数据、节流提交等
* 状态控制是否允许编辑（上传状态控制）
* 支持动态参数（`dynamicSelectionsParams`）的自动更新
* 暴露用于页面跳转的编辑、返回方法
* 提供全局 Context 共享该 Hook 状态，方便子组件访问

---

## 类型定义

```ts
export type Tmode = "edit" | "add" | "watch";

export interface Iprops<T> {
  defaultValue: T;
  mainValidationSchema?: any;
  onSubmit?: (values: T) => void;
  loadData?: () => T;
  init?: () => void;
  currentUrl: string;
  dynamicSelectionsParams?: IDynamicSelectionsParamsProp[];
  throttlingTime?: number;  // 提交节流时间，单位毫秒，默认3000
}

export type TMainHookReturnType<T> = ReturnType<typeof useMainDataHook<T>>;
```

---

## 参数说明

| 参数名                       | 类型                               | 说明                      | 是否必填 | 默认值  |
| ------------------------- | -------------------------------- | ----------------------- | ---- | ---- |
| `defaultValue`            | `T`                              | 表单的初始默认值                | 是    | —    |
| `mainValidationSchema`    | `any`                            | 表单验证规则，通常是 Yup 验证Schema | 否    | —    |
| `onSubmit`                | `(values: T) => void`            | 表单提交回调函数                | 否    | —    |
| `loadData`                | `() => T`                        | 加载详情数据函数（编辑和查看时调用）      | 否    | —    |
| `init`                    | `() => void`                     | 组件初始化时调用的回调             | 否    | —    |
| `currentUrl`              | `string`                         | 当前页面的基础路由，用于导航跳转        | 是    | —    |
| `dynamicSelectionsParams` | `IDynamicSelectionsParamsProp[]` | 动态参数相关的配置，用于联动更新参数      | 否    | \[]  |
| `throttlingTime`          | `number`                         | 表单提交节流时间，防止频繁提交         | 否    | 3000 |

---

## 返回值

返回一个对象，包含以下主要属性和方法：

| 属性/方法                  | 类型                        | 说明                   |             |           |          |        |
| ---------------------- | ------------------------- | -------------------- | ----------- | --------- | -------- | ------ |
| `isMounted`            | `boolean`                 | 组件是否已挂载              |             |           |          |        |
| `avatarUploadState`    | \`"error"                 | "done"               | "uploading" | "removed" | "init"\` | 封面上传状态 |
| `setavatarUploadState` | `(state) => void`         | 设置封面上传状态             |             |           |          |        |
| `mode`                 | `Tmode`                   | 当前页面模式               |             |           |          |        |
| `checkFormikError`     | `() => boolean`           | 检查表单错误，显示错误提示，返回是否通过 |             |           |          |        |
| `loadDetailData`       | `() => Promise<void>`     | 加载详情数据               |             |           |          |        |
| `enabled`              | `boolean`                 | 当前是否可编辑              |             |           |          |        |
| `mainFormik`           | `FormikHelpers<T>`        | Formik 实例，管理表单       |             |           |          |        |
| `id`                   | `string`                  | 当前详情页的 ID            |             |           |          |        |
| `filesIsUpLoading`     | `boolean`                 | 是否有文件正在上传            |             |           |          |        |
| `setfilesIsUpLoading`  | `(flag: boolean) => void` | 设置文件上传状态             |             |           |          |        |
| `editForm`             | `() => void`              | 跳转到编辑页面              |             |           |          |        |
| `back`                 | `() => void`              | 跳转回查看页面              |             |           |          |        |
| `dynSelections`        | 动态参数相关实例                  | 处理动态参数联动             |             |           |          |        |

---

## 使用示例

```tsx
import React from "react";
import { useMainDataHook, MainDataContext } from "MithalCommonLibrary/utils/useMainDataHook";

interface IFormData {
  name: string;
  age: number;
}

const defaultValue = {
  name: "",
  age: 0,
};

const MyDetailPage: React.FC = () => {
  const mainHook = useMainDataHook<IFormData>({
    defaultValue,
    currentUrl: "/detail",
    loadData: async () => {
      // 异步加载数据
      return {
        name: "廖力",
        age: 30,
      };
    },
    onSubmit: (values) => {
      console.log("提交表单", values);
    },
  });

  return (
    <MainDataContext.Provider value={mainHook}>
      {/* 你的页面内容 */}
      <form onSubmit={mainHook.mainFormik.handleSubmit}>
        <input
          name="name"
          value={mainHook.mainFormik.values.name}
          onChange={mainHook.mainFormik.handleChange}
        />
        {/* 其他表单字段 */}
        <button type="submit" disabled={!mainHook.enabled}>提交</button>
      </form>
    </MainDataContext.Provider>
  );
};
```

---

## Context 说明

* `MainDataContext`：用于在组件树中共享 `useMainDataHook` 的返回值，避免逐层传递 props
* `useMainDataContext<T>()`：自定义 Hook，方便子组件直接使用 Context 中的数据和方法

```ts
const mainHook = useMainDataContext<IFormData>();
console.log(mainHook.mode);
```

---


# useFormikValueChanges

> **作者**：廖力
> **编写时间**：2025-05-16 10:30:48
> **模块说明**：
> `useFormikValueChanges` 是一个基于 Formik 的自定义 Hook，用于在表单中实现值变更联动处理。
> 当指定字段发生变更时，可根据配置规则自动更新其他字段的值，并支持结合动态选项列表进行数据处理和填充。
> 本 Hook 可选依赖 `useDynamicSelectionsParams` 钩子提供的动态选项数据。

---

## 📦 依赖

```bash
npm install formik
# or
yarn add formik
```

如果需要动态选项，请一并安装并使用你的 `useDynamicSelectionsParams` 钩子。

---

## 🔧 API

### Hook 签名

```ts
function useFormikValueChanges<T>(
  props: IuseFormikValueChangeHandlerProps<T>
): {
  currentFormikValues: Partial<T>;
  selectionsUpdateStamp: number;
  setselectionsUpdateStamp: React.Dispatch<React.SetStateAction<number>>;
};
```

### 参数类型

```ts
interface IuseFormikValueChangeHandlerProps<T> {
  /** 联动项配置数组 */
  options: IuseFormikValueChangeHandlerItemProps<T>[];
  /** Formik 实例 */
  formik: ReturnType<typeof useFormik<T>>;
  /** 动态选项对象（可选） */
  dynamicSelectionsObj?: ReturnType<typeof useDynamicSelectionsParams>;
  /** 是否禁用全部联动逻辑 */
  disabled: boolean;
}
```

#### 单项配置

```ts
interface IuseFormikValueChangeHandlerItemProps<T> {
  /** 依赖字段，值变化时触发联动 */
  depKey: keyof T;

  /**
   * 以下三项配合使用，若未提供 handleFunc，则自动
   * 从 dynamicSelectionsObj.selections[depSelectionsListName]
   * 中根据 depSelectionsListRowKey 值查到 selectedSelectionRowItemKey 字段来赋值
   */
  depSelectionsListName?: string;
  depSelectionsListRowKey?: string;
  selectedSelectionRowItemKey?: string;

  /**
   * 自定义处理函数（优先级高于自动查找）
   * - value: 当前 depKey 字段的新值
   * - formik: Formik 实例
   * - selectedItemRowValue: 自动查找到的行字段值
   * - selectedSelectionRow: 自动查找到的整行数据
   * - selectionList: 整个选项列表
   * - selectionsObj: dynamicSelectionsObj 钩子返回值
   *
   * 函数返回值或 Promise<返回值>，将用于赋值给 targetKey
   */
  handleFunc?: (params: {
    value: any;
    formik: ReturnType<typeof useFormik<T>>;
    selectedItemRowValue?: any;
    selectedSelectionRow?: { [prop: string]: any };
    selectionList?: any[];
    selectionsObj?: ReturnType<typeof useDynamicSelectionsParams>;
  }) => T[keyof T] | Promise<T[keyof T]>;

  /** 赋值目标字段数组 */
  targetKey: Array<keyof T>;
}
```

---

## 🔍 返回值

```ts
{
  currentFormikValues: Partial<T>;       // Formik.values 的快照
  selectionsUpdateStamp: number;         // 每次值变动后更新时间戳
  setselectionsUpdateStamp: Dispatch;    // 手动触发更新时间戳
}
```

---

## ⚡️ 用法示例

```tsx
import React from 'react';
import { useFormik } from 'formik';
import useDynamicSelectionsParams from 'MithalCommonLibrary/utils/dynamicSelectionsParamsHook';
import useFormikValueChanges from 'MithalCommonLibrary/utils/useFormikValueChanges';

type FormValues = {
  countryId: string;
  countryName: string;
  cityId: string;
  cityName: string;
};

export function AddressForm() {
  const formik = useFormik<FormValues>({
    initialValues: {
      countryId: '',
      countryName: '',
      cityId: '',
      cityName: '',
    },
    onSubmit: (vals) => console.log(vals),
  });

  const dynamicSelections = useDynamicSelectionsParams();

  // 当 countryId 改变时：
  // - 自动从 dynamicSelections.selections['countries'] 中查找对应行
  //   再取字段 `name` 赋给 countryName
  // - 手动通过 handleFunc 异步加载城市列表，再赋给 cityListStamp（示例用法）
  useFormikValueChanges<FormValues>({
    formik,
    dynamicSelectionsObj: dynamicSelections,
    disabled: false,
    options: [
      {
        depKey: 'countryId',
        depSelectionsListName: 'countries',
        depSelectionsListRowKey: 'id',
        selectedSelectionRowItemKey: 'name',
        targetKey: ['countryName'],
      },
      {
        depKey: 'countryId',
        handleFunc: async ({ value }) => {
          await fetchCitiesForCountry(value);
          return value; // 这里只演示不改变值
        },
        targetKey: ['cityId'], 
      },
    ],
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* 表单字段... */}
    </form>
  );
}
```

---

## 💡 注意事项

* **必需**：`options` 中的 `depKey` 与 `targetKey` 必须为你的 `FormValues` 类型的键名。
* 若使用自动查找功能，务必同时指定 `depSelectionsListName`、`depSelectionsListRowKey` 与 `selectedSelectionRowItemKey`。
* 如提供了 `handleFunc`，将**优先**使用其返回值进行赋值。
* 异步 `handleFunc` 内部已做好组件卸载检查，避免内存泄漏。
* 若不希望钩子生效，可将 `disabled` 设为 `true`。

---

## 🛠️ 拓展

* **多字段联动**：可在同一次调用中传入多条 `options` 配置。
* **节流/防抖**：若依赖字段变动非常频繁，可在 `handleFunc` 内部自行加节流或防抖。
* **错误处理**：`handleFunc` 中可自行包裹 `try/catch`，或在上层捕获异步抛出的错误。

---

## ©️ 版权

本模块由廖力编写，通用开源、可在项目中自由使用与修改。如需帮助或提建议，欢迎提 Issue！

---


# `AutoForm` 自动布局和数据绑定组件

> 作者：廖力
> 创建时间：2025-05-19
> 所属模块：基于 `formComponentsContainer` 的自动布局和数据绑定封装

## ✨ 简介

`AutoForm` 是一个基于 `formComponentsContainer` 进行封装的表单组件，旨在通过配置化的方式快速实现布局和数据绑定。
配合 `publicDetailDataHook.ts` 使用，可用于快速构建表单页面，为低代码平台提供强大支持。

---

## 🚀 特性

* 支持多种常用表单组件的自动渲染
* 基于配置的自动布局能力，支持新旧两种布局风格
* 与 Formik 完美集成，实现统一的数据管理和校验
* 可选组件自定义渲染与默认组件映射
* 灵活支持“新增”、“编辑”、“查看”等多种表单模式
* 支持统一启用 / 禁用所有控件

---

## 🧩 组件映射（AutoFormComsMap）

组件类型通过 `comType` 字段指定，必须是以下类型中的一个：

| `comType` 值           | 渲染组件                                      |
| --------------------- | ----------------------------------------- |
| `TextField`           | `MithalCommonLibrary/TextField`           |
| `CustomNumberInput`   | `MithalCommonLibrary/CustomNumberInput`   |
| `MithrilSelect`       | `MithalCommonLibrary/select`              |
| `MithrilAutocomplete` | `MithalCommonLibrary/autocomplete`        |
| `AntdDateRangePacker` | `MithalCommonLibrary/antdDateRangePicker` |
| `NumberRangeInput`    | `MithalCommonLibrary/numberRangeInput`    |
| `MithrilTextArea`     | `MithalCommonLibrary/textArea`            |
| `MithrilYesNoSwitch`  | `MithalCommonLibrary/yes-no-switch`       |

---

## 📦 使用示例

```tsx
import AutoForm from "MithalCommonLibrary/AutoForm";
import { useFormik } from "formik";

const formik = useFormik({
  initialValues: {
    name: "",
    age: 0,
    isActive: true
  },
  onSubmit: (values) => console.log(values),
});

<AutoForm
	formik={dataHook.mainFormik}
	mode={dataHook.mode}
	enabled={dataHook.enabled}
	items={[
		/* ----------------------------------------------------------------------------------------------------------------------------------------------- */
		{
			isRequiredStyle: false,
			label: "资源登记编号",
			name: "code",
			comType: "TextField",
			comProps: {
				value:
					dataHook.mode === "watch"
						? dataHook.mainFormik.values.code
						: dataHook.mainFormik.values.code === ""
						? "-"
						: dataHook.mainFormik.values.code,
				onChange: function () {},
				disabled: true,
			} as ITextFieldProps,
		},
		/* ----------------------------------------------------------------------------------------------------------------------------------------------- */
		{
			isRequiredStyle: true,
			label: "土地资产名称",
			name: "name",
			comType: "TextField",
		},
		/* ----------------------------------------------------------------------------------------------------------------------------------------------- */
		{
			isRequiredStyle: true,
			label: "面积",
			name: "area",
			unit: "亩",
			comType: "CustomNumberInput",
			comProps: {
				fixed: 2,
				min: 0.01,
			} as NumberInputProps,
		},
		/* ----------------------------------------------------------------------------------------------------------------------------------------------- */
		{
			isRequiredStyle: false,
			label: "土地价值",
			name: "value",
			unit: "元",
			render: function (data) {
				if (data !== "-") {
					return Number(data).toFixed(2) + " 元";
				}
				return data + " 元";
			},
			comType: "CustomNumberInput",
			comProps: {
				fixed: 2,
				min: 0.01,
			} as NumberInputProps,
		},
		/* ----------------------------------------------------------------------------------------------------------------------------------------------- */
		{
			isRequiredStyle: false,
			label: "土地经纬度",
			name: ["longitude", "latitude"],
			comType: "NumberRangeInput",
			comProps: {
				units: ["经度", "纬度"],
				placeholder: ["经度", "纬度"],
				fixed: 6,
				min: 0.0000001,
				isFillZero: false,
			} as NumberRangeInputProps,
		},
		/* ----------------------------------------------------------------------------------------------------------------------------------------------- */
		{
			isRequiredStyle: false,
			label: "土地类型",
			name: "landType",
			selectItems: dataHook.dynSelections.selections.landTypeSelectItems,
			comType: "MithrilSelect",
		},
		/* ----------------------------------------------------------------------------------------------------------------------------------------------- */
		{
			isRequiredStyle: false,
			label: "利用现状类型",
			name: "statusTypeId",
			selectItems: dataHook.dynSelections.selections.statusTypeArr,
			comType: "MithrilSelect",
		},
		/* ----------------------------------------------------------------------------------------------------------------------------------------------- */
		{
			isRequiredStyle: false,
			label: "土地凭证类型",
			name: "certificateType",
			selectItems: dataHook.dynSelections.selections.certificateTypeSelectItems,
			comType: "MithrilSelect",
		},
		/* ----------------------------------------------------------------------------------------------------------------------------------------------- */
		{
			isRequiredStyle: false,
			label: "凭证号",
			name: "certificateNumber",
			comType: "TextField",
		},
		/* ----------------------------------------------------------------------------------------------------------------------------------------------- */
		{
			isRequiredStyle: false,
			label: "状态",
			name: "status",
			selectItems: [
				{
					label: "启用",
					value: "0",
				},
				{
					label: "停用",
					value: "1",
				},
			],
			comType: "MithrilYesNoSwitch",
		},
	]}
/>
```

---

## 🔧 Props

### `AutoForm` 组件参数（`IAutoFormProps`）

| 参数名                       | 类型                               | 说明                     |
| ------------------------- | -------------------------------- | ---------------------- |
| `title?`                  | `string`                         | 表单标题                   |
| `formik`                  | `ReturnType<typeof useFormik>`   | `Formik` 实例，用于数据绑定     |
| `mode?`                   | `"add"` \| `"edit"` \| `"watch"` | 表单操作模式，默认 `"add"`      |
| `enabled?`                | `boolean`                        | 是否启用所有表单项，默认 `true`    |
| `labelGridProps?`         | `GridProps`                      | label 栏的布局参数           |
| `comGridProps?`           | `GridProps`                      | 组件本体的布局参数              |
| `formContainerGridProps?` | `GridProps`                      | 表单外层 Grid 的参数          |
| `layoutStyle?`            | `"newStyle"` \| `"oldStyle"`     | 表单布局风格，默认 `"newStyle"` |
| `items`                   | `IAutoFormItemProps[]`           | 表单项配置列表                |

---

### `IAutoFormItemProps` 表单项参数

基于 `FormComponentsContainer` 封装而来：

| 参数名         | 类型                               | 说明                                |
| ----------- | -------------------------------- | --------------------------------- |
| `formik?`   | `ReturnType<typeof useFormik>`   | 可选单独指定 `formik`，否则继承 `AutoForm` 的 |
| `mode?`     | `"add"` \| `"edit"` \| `"watch"` | 可单独指定模式                           |
| `enabled?`  | `boolean`                        | 单独禁用此项                            |
| `children?` | `ReactNode`                      | 自定义渲染组件，优先级高于 `comType`           |
| `comProps`  | `组件属性合集`                         | 组件专属属性，自动匹配对应组件                   |
| `comType`   | `keyof typeof AutoFormComsMap`   | 指定要渲染的组件类型                        |

---

## 🎨 布局风格说明

* `newStyle`:

  * `labelGridProps` 与 `comGridProps` 均可独立设置
  * 适用于新系统风格，布局更灵活
* `oldStyle`:

  * `labelGridProps` 被忽略，仅 `comGridProps` 生效
  * 模拟旧系统的紧凑布局方式

---

## 📌 注意事项

* `comType` 必须在 `AutoFormComsMap` 中有对应组件，否则无法渲染
* 若使用 `children` 自定义组件，将完全替代 `comType` 的默认行为
* 所有表单项将自动包裹在 `FormComponentsContainer` 中，支持样式与交互控制

---


如需进一步配合业务使用，可参考 `publicDetailDataHook.ts` 来构建高可复用的低代码表单逻辑模块。

---


# `useInqueryState` 查询条件状态托管钩子

> 廖力编写
> 编写时间：2025-05-22 10:19:49（星期四）

## 📌 模块名称

用于托管查询条件状态的 Hook

---

## 📖 模块说明

`useInqueryState<T>()` 是一个用于管理查询参数的 React 自定义 Hook。它的核心功能是：

* 将查询条件（如分页、筛选等）通过 URL 参数持久化在地址栏中；
* 实现“页面刷新/返回保持查询条件状态”的能力；
* 在参数变更时自动同步到 URL，便于分享和恢复页面状态。

适用于列表页、查询页等需要保留用户筛选条件的场景。

---

## 📦 使用方法

### ✅ 引入 Hook

```ts
import useInqueryState from 'MithalCommonLibrary/utils/useInqueryState';
```

### ✅ 定义默认查询条件

```ts
const queryDefault = {
  current: 1,
  pageSize: 10,
  keyword: '',
  status: '',
};
```

### ✅ 使用 Hook

```ts
const [queryInfo, setQueryInfo] = useInqueryState<typeof queryDefault>(queryDefault);
```

现在你就可以使用 `queryInfo` 访问当前的查询条件，使用 `setQueryInfo` 更新它们。

---

## 🧠 功能说明

* 第一次渲染时，会自动读取当前 URL 中的参数覆盖 `defaultValues`；
* `queryInfo` 更新后，会同步更新 URL 中的参数（使用 `replaceState`，不会刷新页面，也不会新增历史记录）；
* 空值（`null`、`undefined`、空字符串）会被自动从 URL 中移除，避免污染地址栏。

---

## 🧪 示例代码

```tsx
const queryDefault = {
  current: 1,
  pageSize: 10,
  keyword: '',
  category: ''
};

const [queryInfo, setQueryInfo] = useInqueryState<typeof queryDefault>(queryDefault);

// 示例：分页切换
const onPageChange = (page: number, size: number) => {
  setQueryInfo({
    ...queryInfo,
    current: page,
    pageSize: size
  });
};

// 示例：关键词搜索
const onSearch = (keyword: string) => {
  setQueryInfo({
    ...queryInfo,
    keyword,
    current: 1 // 重置到第一页
  });
};
```

---

## 💡 返回值类型

```ts
const [queryInfo, setQueryInfo] = useInqueryState<T>(defaultValues);
```

| 返回值            | 类型                                        | 说明                 |
| -------------- | ----------------------------------------- | ------------------ |
| `queryInfo`    | `T`                                       | 当前查询条件（已从 URL 初始化） |
| `setQueryInfo` | `React.Dispatch<React.SetStateAction<T>>` | 用于更新查询条件，自动同步到 URL |

---

## ⚠ 注意事项

* 该 Hook 默认只在 `queryInfo` 变化时更新 URL，不监听 URL 外部变更；
* 若你需要响应浏览器地址栏手动修改、返回按钮导航等行为，请配合监听 `popstate` 或 `location.search`；
* 如果 URL 中的参数值非字符串（如布尔值、数字），请在使用时自行处理转换（例如 `Number(searchParams.get('current'))`）；

---

## 🔧 内部实现逻辑概览

* 利用 `useLocation()` 获取当前路径；
* 利用 `useSearchParams()` 读取初始参数；
* 通过 `navigate(..., { replace: true })` 实现无刷新 URL 更新；
* 利用 `useEffect` 自动同步参数与 URL 状态；



