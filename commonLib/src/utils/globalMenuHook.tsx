/**
 * 廖力编写
 * 模块名称：系统菜单数据全局单例模式
 * 模块说明：
 * 编写时间：
 */

import React, { createContext, useState, useContext, useEffect, ReactElement, FC, useRef } from "react";
import useLocalStorage from "use-local-storage";
import { message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import useJquery from "@bobliao/use-jquery-hook";
import { BooleanSchema } from "yup";
import toast from "react-hot-toast";

//定义勾子的返回类型
export type TGlobalMenuHookReturnType = ReturnType<typeof useGlobalMenuDataHook>;

/* 菜单的数据类型 */
export interface IMenuTreeData {
	msg: string;
	code: number;
	data: Array<IMenuDataItem>;
}

/* 菜单项目 */
export interface IMenuDataItem {
	pageNum?: number;
	pageSize?: number;
	createById?: number;
	createBy?: string;
	createByTime?: Date;
	updateById?: number;
	updateBy?: string;
	updateByTime?: Date;
	params?: any;
	id?: number;
	name?: string;
	parentId?: number;
	sort?: number;
	frontPath?: string;
	backPath?: string;
	type?: string;
	status?: string;
	perms?: string;
	icon?: string;
	systemId?: number;
	//这个字段决定某个菜单文件夹是否打开或者是否选中
	checked?: boolean;
	menuChildren?: Array<IMenuDataItem>;
	//这个字段决定菜单项目是否选中
	//如果某个文件夹节点checked = true 说明它被展开了
	//如果某个菜单项目isSelected = true 那么它上面的所有的文件夹应该被checked = true然后isSelected = true
	isSelected?: boolean;
	visible?: boolean;
}

export interface IpathItem {
	path: string;
	name: string;
}

export interface IuseGlobalMenuDataHookProps {
	/**
	 * 用于保持本地状态用的localstorage的名称
	 */
	menuLocalStorageName: string;
	/**
	 * 用于加载菜单数据的函数
	 */
	loadMenuDataFunc?: () => IMenuTreeData | Promise<IMenuTreeData>;
	/**
	 * 是否有顶部横向菜单
	 */
	isHaveTopMenu: boolean;
	/**
	 * 是否已经登录
	 */
	isLoggedIn: boolean;
	/* 是否严格干政菜单是否存在 */
	isStrect?: boolean;
}

/* 先定义勾子 */
export const useGlobalMenuDataHook = function ({
	menuLocalStorageName,
	loadMenuDataFunc,
	isHaveTopMenu,
	isLoggedIn,
	isStrect = false,
}: IuseGlobalMenuDataHookProps) {
	//===============useHooks=================
	const navigate = useNavigate();
	const location = useLocation();
	const $ = useJquery();

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [menuChangestamp, setmenuChangestamp] = useState<number>(-1);
	/* 
		菜单数据使用localStorage进行保存
		当查询菜单数据的时候，检测到为null才去查询
		当用户登出的时候，再将菜单数据删除
		关联位置src/utils/utils.ts
	*/
	const [menuData, setMenuData] = useLocalStorage<IMenuTreeData | null>(menuLocalStorageName, null);

	/* 当前应该选中的菜单项目 */
	const [selectedMenu, setselectedMenu] = useState<IMenuDataItem>(null);
	//是否已经生成过菜单了
	const [hasGenMenu, sethasGenMenu] = useState<boolean>(false);
	//当前站点地图路径
	const [navPathArr, setnavPathArr] = useState<IpathItem[]>([]);

	/* 当前的默认展示页 */
	const defaultPage = useRef<string>("/");

	//===============static===================

	//===============ref======================

	//===============function=================
	//获取当前用户菜单树数据
	const getMenuData = async function () {
		if (menuData === null) {
			let result: IMenuTreeData | null = null;
			if (menuData === null) {
				try {
					let data = await loadMenuDataFunc();
					if (typeof data !== "undefined") {
						result = data;
					} else {
						if (location.pathname !== "" && location.pathname !== "/" && isStrect) {
							//如果模糊查找都找不到页面
							navigate("/");
							//那就是没有权限
							toast.error("没有访问权限或当前页面不存在!");
						}
						return null;
					}
				} catch (_e) {
					if (location.pathname !== "" && location.pathname !== "/" && isStrect) {
						//如果模糊查找都找不到页面
						navigate("/");
						//那就是没有权限
						toast.error("没有访问权限或当前页面不存在!");
					}
					message.error(_e.msg);
					return null;
				}
			}
			setMenuData(function (menuData) {
				if (menuData === null) {
					result.data = menuFinder(
						result.data,
						function (node, isFind) {
							if (typeof node.visible !== "boolean") {
								if ((node.visible as unknown as string) === "0") {
									node.visible = true;
								} else {
									node.visible = false;
								}
							}
							return [node, isFind];
						},
						function (node) {
							return node;
						}
					).nodes;
					return result;
				}
				return menuData;
			});
			setmenuChangestamp(+new Date());
		}
	};

	//将菜单数据生成出菜单
	const genMenuTree = async function () {
		//这一步去查找当前要选中的那个菜单项目
		//如果当前路由进入了某个子页面，那就选中那个子页面的菜单项目
		//如果没有进入子页面，进入的是站点的根目录，那就查找到第一个节点下的第一个子页面，并选中进入
		return findDefaultPage();
	};

	//选择顶部子菜单中的第一个可点击菜单
	const chooseTopMenu = function (id) {
		let _menuData = { ...menuData };
		let menuItem = _menuData.data.find(function (item) {
			if (item.id.toString() === id.toString()) {
				return true;
			}
			return false;
		});

		//如果菜单没找到活着子级节点是空
		if (!menuItem || menuItem.menuChildren === null) {
			return;
		}

		let currentTopPage = "";
		let currentTopItem = null;
		//找到目标节点
		menuFinder(
			menuItem.menuChildren,
			function (node, isFind) {
				if (node.type === "C") {
					if (isFind === false && node.frontPath?.trim() !== "" && node.visible === true) {
						isFind = true;
						currentTopPage = node.frontPath;
						currentTopItem = node;
					}
				}
				return [node, isFind];
			},
			function (node) {
				return node;
			}
		);
		if (currentTopItem !== null) {
			//点击菜单，并跳转到相应页面
			clickMenu(currentTopItem.id, true);
			navigate(currentTopPage);
		}
	};

	/* 路由改动时自动查找到当前页面 */
	const routerChange = function () {
		if (location.pathname === "/building") {
			return;
		}
		if (location.pathname === "" || location.pathname === "/") {
			return;
		}
		//点击某个文件夹只需要将当前的文件夹以及上面所有的文件夹展开就好了
		let _menuData = { ...menuData };

		//先模糊匹配，找到最像的那个目录
		//因为要找编辑页面，编辑页面一般不会显示出现在菜单里
		//所以要模糊查找
		let current = { lastCount: 99999999, target: null };
		menuFinder(
			_menuData.data,
			function (node, isFind) {
				if (node.type === "C" || node.type === "F") {
					if (location.pathname !== "" && location.pathname !== "/") {
						if (location.pathname.indexOf(node.frontPath) === 0 && node.visible) {
							let strLength = location.pathname.replace(node.frontPath, "").length;
							if (strLength < current.lastCount) {
								current = {
									lastCount: strLength,
									target: node,
								};
							}
						}
					}
				}
				return [node, isFind];
			},
			function (node) {
				return node;
			}
		);
		if (current.target !== null) {
			let _pathArr = [];
			//将第一层级设置为未选中
			if (isHaveTopMenu === true) {
				for (let item of _menuData.data) {
					item.checked = false;
					item.isSelected = false;
				}
			}
			//然后再选中那个目录
			_menuData.data = menuFinder(
				_menuData.data,
				function (node, isFind) {
					if (node.id === current.target.id) {
						_pathArr.push({
							name: node.name,
							path: node.frontPath,
						});
						node.checked = true;
						node.isSelected = true;
						isFind = true;
					} else if (node.type === "C") {
						node.checked = false;
						node.isSelected = false;
					}
					return [node, isFind];
				},
				function (node) {
					_pathArr.push({
						name: node.name,
						path: node.frontPath,
					});
					node.isSelected = true;
					node.checked = true;
					return node;
				}
			).nodes;
			setnavPathArr(_pathArr.reverse());
			setMenuData(menuData);
			setmenuChangestamp(+new Date());
		} else {
			if (isStrect) {
				//如果模糊查找都找不到页面
				navigate("/");
				//那就是没有权限
				toast.error("没有访问权限或当前页面不存在!");
			}
		}
	};

	/* 查找默认页面 */
	async function findDefaultPage() {
		return new Promise(function (_res) {
			setMenuData(function (menuData) {
				//
				let _menuData = { ...menuData };
				_menuData.data = menuSort(_menuData.data);
				//先进行模糊匹配
				//找模糊相关的页面
				//主要目的是匹配（某些列表的）详情页
				let current = { lastCount: 99999999, target: null };
				if (location.pathname !== "" && location.pathname !== "/") {
					menuFinder(
						_menuData.data,
						function (node, isFind) {
							if (node.type === "C" || node.type === "F") {
								if (location.pathname.indexOf(node.frontPath) === 0) {
									let strLength = location.pathname.replace(node.frontPath, "").length;
									if (strLength < current.lastCount) {
										current = {
											lastCount: strLength,
											target: node,
										};
									}
								}
							}
							return [node, isFind];
						},
						function (node) {
							return node;
						}
					);
					if (current.target === null && isStrect) {
						//如果模糊查找都找不到页面
						navigate("/");
						//那就是没有权限
						toast.error(`没有访问权限或页面"${location.pathname}"不存在!`);
						return menuData;
					}
				}
				//先把所有的菜单都设置为不选中
				_menuData.data = menuFinder(
					_menuData.data,
					function (node, isFind, level) {
						if (node.type === "C") {
							node.checked = false;
							node.isSelected = false;
						}
						//如果有顶部菜单
						if (isHaveTopMenu === true) {
							//目前默认只展开1~2级的目录（注意不是菜单）
							//0级和2级以上的都关闭
							if (node.type === "M" && level < 2 && level >= 1) {
								node.checked = true;
								node.isSelected = true;
							} else if (node.type === "M" && level >= 2) {
								node.checked = false;
								node.isSelected = false;
							}
							if (node.type === "M" && level === 0) {
								node.checked = false;
								node.isSelected = false;
							}
						} else {
							//没有顶部菜单
							if (node.type === "M" && level < 2 && level >= 0) {
								node.checked = true;
								node.isSelected = true;
							} else if (node.type === "M" && level >= 2) {
								node.checked = false;
								node.isSelected = false;
							}
						}
						return [node, isFind];
					},
					function (node) {
						return node;
					}
				).nodes;
				let _pathArr = [];
				//如果模糊查找结果不为空
				//就以模糊查找的结果为准
				if (current.target !== null) {
					//将第一层级设置为未选中
					if (isHaveTopMenu === true) {
						for (let item of _menuData.data) {
							item.checked = false;
							item.isSelected = false;
						}
					}
					//然后再选中那个目录
					_menuData.data = menuFinder(
						_menuData.data,
						function (node, isFind) {
							if (node.id === current.target.id) {
								_pathArr.push({
									name: node.name,
									path: node.frontPath,
								});
								defaultPage.current = node.frontPath?.trim();
								//选中默认菜单项目
								setselectedMenu(node);
								node.checked = true;
								node.isSelected = true;
								isFind = true;
							}
							return [node, isFind];
						},
						function (node) {
							_pathArr.push({
								name: node.name,
								path: node.frontPath,
							});
							node.isSelected = true;
							node.checked = true;
							return node;
						}
					).nodes;
					setnavPathArr(_pathArr.reverse());
					_res("");
					setmenuChangestamp(+new Date());
					return _menuData;
				} else {
					_menuData.data = menuFinder(
						_menuData.data,
						function (node, isFind) {
							if (node.type === "C") {
								if (location.pathname !== "" && location.pathname !== "/") {
									if (node.frontPath?.trim() !== "" && node.frontPath?.trim() === location.pathname) {
										_pathArr.push({
											name: node.name,
											path: node.frontPath,
										});
										defaultPage.current = node.frontPath?.trim();
										//选中默认菜单项目
										setselectedMenu(node);
										isFind = true;
										node.isSelected = true;
										node.checked = true;
										defaultPage.current = node.frontPath;
									}
									//否则寻找默认页面
								} else if (isFind === false && node.frontPath?.trim() !== "" && node.visible === true) {
									_pathArr.push({
										name: node.name,
										path: node.frontPath,
									});
									defaultPage.current = node.frontPath?.trim();
									//选中默认菜单项目
									setselectedMenu(node);
									isFind = true;
									node.isSelected = true;
									node.checked = true;
									defaultPage.current = node.frontPath;
								}
							}
							return [node, isFind];
						},
						function (node) {
							node.isSelected = true;
							node.checked = true;
							return node;
						}
					).nodes;

					setnavPathArr(_pathArr.reverse());
					_res("");
					setmenuChangestamp(+new Date());
					return _menuData;
				}
			});
		});
	}

	//展开某个菜单文件夹
	const clickForder = function (id: number, isOpen: boolean) {
		setMenuData(function (menuData) {
			//点击某个文件夹只需要将当前的文件夹以及上面所有的文件夹展开就好了
			let _menuData = { ...menuData };

			//将第一层级设置为未选中
			//因为第一层级目前被提升到了top上横向展示
			if (isHaveTopMenu === true) {
				for (let item of _menuData.data) {
					item.checked = false;
					item.isSelected = false;
				}
			}
			//找到目标文件夹设置为当前值

			let menuTree = menuFinder(
				_menuData.data,
				function (node, isFind) {
					if (id.toString() === node.id.toString()) {
						node.checked = isOpen;
						node.isSelected = isOpen;
						isFind = true;
					}
					return [node, isFind];
				},
				function (node) {
					node.isSelected = true;
					node.checked = true;
					return node;
				}
			);

			_menuData.data = menuTree.nodes;
			return _menuData;
		});
		setmenuChangestamp(+new Date());
	};

	//打开某个菜单
	const clickMenu = function (id: number, isSelected: boolean) {
		setMenuData(function (menuData) {
			let _menuData = { ...menuData };
			//将第一层级设置为未选中
			if (isHaveTopMenu === true) {
				for (let item of _menuData.data) {
					item.checked = false;
					item.isSelected = false;
				}
			}

			//先把所有的菜单都设置为不选中
			_menuData.data = menuFinder(
				_menuData.data,
				function (node, isFind) {
					if (node.type === "C") {
						node.checked = false;
						node.isSelected = false;
					}
					return [node, isFind];
				},
				function (node) {
					return node;
				}
			).nodes;

			//再去找选中的那个
			_menuData.data = menuFinder(
				_menuData.data,
				function (node, isFind) {
					if (id.toString() === node.id.toString() && node.type === "C") {
						node.checked = isSelected;
						node.isSelected = isSelected;
						isFind = true;
					}
					return [node, isFind];
				},
				function (node) {
					node.checked = true;
					node.isSelected = true;
					return node;
				}
			).nodes;
			return _menuData;
		});
		setmenuChangestamp(+new Date());
	};

	//菜单排序
	const menuSort = function (menuData: IMenuDataItem[]) {
		menuData = [...menuData].sort(function (a, b) {
			return Number(a.sort) - Number(b.sort);
		});
		for (var node of menuData) {
			if (node.menuChildren) {
				node.menuChildren = menuSort(node.menuChildren);
			}
		}
		return menuData;
	};

	//菜单查找方法
	const menuFinder = function (
		menuData: IMenuDataItem[],
		handlecallback: (node: IMenuDataItem, isFindMenu: boolean, level: number) => [IMenuDataItem, boolean],
		childSelectedCallback: (node: IMenuDataItem, level: number) => IMenuDataItem
	) {
		let isFindMenu = false;
		let find = function (nodes: IMenuDataItem[], level: number) {
			//如果当前路由不是空，就选中当前路由的页面
			for (var node of nodes) {
				let [cnode, cisFindMenu] = handlecallback(node, isFindMenu, level);
				node = cnode;
				isFindMenu = cisFindMenu;
				if (node.menuChildren && node.menuChildren.length !== 0 && isFindMenu === false) {
					let res = find(node.menuChildren, level + 1);
					if (res.hasFindMenu === true) {
						node.menuChildren = res.nodes;
						node = childSelectedCallback(node, level);
						return { nodes: nodes, hasFindMenu: true };
					}
				}
			}

			if (isFindMenu) {
				return { nodes: nodes, hasFindMenu: true };
			}
			return { nodes: nodes, hasFindMenu: false };
		};
		return find(menuData, 0);
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

	useEffect(
		function (): ReturnType<React.EffectCallback> {
			//用户登录了才能拉取菜单树
			if (isMounted === true && isLoggedIn === true) {
				getMenuData();
			}
		},
		[isLoggedIn, isMounted]
	);

	useEffect(
		function (): ReturnType<React.EffectCallback> {
			//如果有菜单数据，就生成菜单树
			if (menuData !== null && hasGenMenu === false) {
				(async function () {
					await genMenuTree();
					sethasGenMenu(true);

					if (defaultPage.current !== "" && (location.pathname === "/" || location.pathname === "")) {
						navigate(defaultPage.current, { replace: true });
					}
				})();
			}
		},
		[menuData]
	);

	//监听路由改动并选中相应的菜单
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted && hasGenMenu) {
				routerChange();
				if ($("html,body").scrollTop() > 0) {
					$("html,body").animate({ scrollTop: 0 }, 300);
				}
			}
		},
		[location.pathname, isMounted]
	);

	return {
		//是否挂载
		isMounted,
		//当前被选中的菜单
		selectedMenu,
		//当前的默认页 (ref)
		defaultPage,
		//点击菜单文件夹
		clickForder,
		//点击菜单
		clickMenu,
		//菜单数据
		menuData,
		//选择顶部菜单中的第一个可点击的子菜单
		chooseTopMenu,
		menuChangestamp,
		navPathArr,
	};
};

/**
 * 创建一个需要全局使用的context
 **/
export const GlobalMenuDataContext = createContext<TGlobalMenuHookReturnType>({} as unknown as TGlobalMenuHookReturnType);

/**
 * 给子节点使用的context
 * @returns
 */
export const useGlobalMenuDataContext = function (): TGlobalMenuHookReturnType {
	return useContext(GlobalMenuDataContext);
};

/**
 * 传入参数
 */
export interface IGlobalMenuDataProviderProps {
	children: ReactElement | ReactElement[] | undefined | null;
	/**
	 * 用于保持本地状态用的localstorage的名称
	 */
	menuLocalStorageName: string;
	/**
	 * 用于加载菜单数据的函数
	 */
	loadMenuDataFunc?: () => IMenuTreeData | Promise<IMenuTreeData>;
	/**
	 * 是否有顶部横向菜单
	 */
	isHaveTopMenu: boolean;
	/**
	 * 是否已经登录
	 */
	isLoggedIn: boolean;
	/* 是否严格干政菜单是否存在 */
	isStrect?: boolean;
}

/**
 * 数据提供器
 */
const DAGlobalMenuDataProviderLayout: FC<IGlobalMenuDataProviderProps> = ({
	children,
	menuLocalStorageName,
	loadMenuDataFunc,
	isHaveTopMenu,
	isLoggedIn,
	isStrect = false,
}): ReactElement => {
	//===============useHooks=================
	let GlobalMenuData = useGlobalMenuDataHook({ menuLocalStorageName, loadMenuDataFunc, isHaveTopMenu, isLoggedIn, isStrect });

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);

	//===============static===================

	//===============ref======================

	//===============function=================

	//===============effects==================
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted === false) {
				setIsMounted(true);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[isMounted]
	);

	useEffect(function (): ReturnType<React.EffectCallback> {
		return function (): void {
			setIsMounted(false);
		};
	}, []);

	return (
		<>
			<GlobalMenuDataContext.Provider value={GlobalMenuData}>{children}</GlobalMenuDataContext.Provider>
		</>
	);
};
export default DAGlobalMenuDataProviderLayout;
