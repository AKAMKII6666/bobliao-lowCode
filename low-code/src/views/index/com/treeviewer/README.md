# 树形查看器组件 (TreeViewer)

## 功能描述

树形查看器是一个用于展示当前编辑器渲染树状态的组件，它以树形结构的方式显示所有组件的层级关系。

## 组件结构

```
treeviewer/
├── index.tsx              # 主组件
├── index.module.scss      # 样式文件
├── README.md             # 说明文档
└── com/                  # 子组件目录
    ├── TreeList.tsx      # 树形列表组件
    └── TreeNodeItem.tsx  # 树节点项组件
```

## 组件功能

### 主组件 (TreeViewer)
- 使用 `FreeWindow` 创建可拖拽的窗口
- 通过 `useRendererDataContext()` 获取渲染树数据
- 展示树形结构的整体布局

### 树形列表组件 (TreeList)
- 递归渲染树形结构
- 处理节点的层级关系
- 传递更新戳以触发重新渲染

### 树节点项组件 (TreeNodeItem)
- 渲染单个树节点
- 显示节点类型（布局/控件）
- 显示节点信息（名称、标签、ID）
- 显示子节点数量
- 支持层级缩进

## 数据来源

组件从 `renderTreeHook.ts` 中的 `renderTreeObj.renderTree` 获取数据，数据结构为 `ITreeNode` 类型。

## 样式特性

- 响应式设计，支持移动端
- 渐变色头部设计
- 节点类型用不同颜色标识
- 悬停效果和过渡动画
- 层级缩进和连接线

## 使用方法

组件已集成到主应用中，会在页面加载时自动显示。窗口可以拖拽移动，点击关闭按钮可以隐藏。

## 技术栈

- React 18
- TypeScript
- SCSS 模块化样式
- 组件化架构 