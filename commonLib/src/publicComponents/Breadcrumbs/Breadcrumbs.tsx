import { CSSProperties, ReactElement, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useNavigation } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Card, Divider, Grid, Stack, Tooltip, Typography } from "@mui/material";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// assets
import { IconChevronRight, IconTallymark1 } from "@tabler/icons-react";
import AccountTreeTwoToneIcon from "@mui/icons-material/AccountTreeTwoTone";
import HomeIcon from "@mui/icons-material/Home";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";

// types
import { NavItemType, OverrideIcon } from "types";
import { IMenuDataItem, IMenuTreeData, useGlobalMenuDataContext } from "../../utils/globalMenuHook";
import useLocalStorage from "use-local-storage";

interface BreadcrumbLinkProps {
	title: string;
	to?: string;
	icon?: string | OverrideIcon;
}

// ==============================|| BREADCRUMBS TITLE ||============================== //

const BTitle = ({ title, backCall }: { title: string; backCall: any }) => {
	return (
		<Grid item>
			<Stack direction="row" spacing={2} alignItems={"center"} alignContent={"center"}>
				<div
					onClick={function () {
						backCall();
					}}
					style={{ height: "23px", overflow: "hidden" }}
				>
					<Tooltip title={"点击返回"}>
						<ArrowBackIcon sx={{ cursor: "pointer" }} />
					</Tooltip>
				</div>

				<Typography variant="h3" sx={{ fontWeight: 500 }}>
					{title}
				</Typography>
			</Stack>
		</Grid>
	);
};

// ==============================|| BREADCRUMBS ||============================== //

export interface BreadCrumbSxProps extends CSSProperties {
	mb?: string;
	bgcolor?: string;
}

/**
 * 面包屑导航组件的参数定义
 */
interface Props {
	/** 是否使用 Card 包裹面包屑（默认开启） */
	card?: boolean;

	/** 是否启用自定义模式（启用后读取 links 参数渲染路径） */
	custom?: boolean;

	/** 是否显示底部分隔线（默认 false） */
	divider?: boolean;

	/** 自定义模式下的标题（custom=true 时使用） */
	heading?: string;

	/** 是否显示首页图标（默认 true） */
	icon?: boolean;

	/** 是否为每个路径项显示图标（如菜单图标等） */
	icons?: boolean;

	/** 自定义面包屑路径数组，仅 custom=true 时生效 */
	links?: BreadcrumbLinkProps[];

	/** 最多展示的面包屑项数，超出后会折叠为省略号 */
	maxItems?: number;

	/** 是否右对齐面包屑和标题（默认 true） */
	rightAlign?: boolean;

	/** 自定义分隔符图标（默认使用 IconChevronRight） */
	separator?: OverrideIcon;

	/** 是否显示标题（页面主标题） */
	title?: boolean;

	/** 是否将标题显示在面包屑下方（默认上方） */
	titleBottom?: boolean;

	/** 自定义整体 sx 样式对象，支持 MUI 的 sx 写法 */
	sx?: BreadCrumbSxProps;

	/** 是否固定在顶部（开启后使用 fixed 定位吸顶） */
	fixedTop?: boolean;

	/** 用于从 localStorage 中读取菜单树数据的 key 名 */
	menuStroageName: string;
}

//往外面暴露统一名称的属性对象，用于生成低代码平台属性JSON schema
export type Tinputprops = Props;

const Breadcrumbs = ({
	card, // 是否使用 Card 包裹
	custom = false, // 是否自定义模式
	divider = false, // 是否显示分隔线
	heading, // 自定义模式标题
	icon = true, // 是否显示首页图标
	icons, // 是否显示每个项图标
	links, // 自定义模式的路径数组
	maxItems, // 最大面包屑显示数
	rightAlign = true, // 是否右对齐
	separator = IconChevronRight, // 分隔图标
	title = true, // 是否显示标题
	titleBottom, // 标题是否在下方
	sx, // 样式
	fixedTop = false, // 是否固定顶部
	menuStroageName, // 存储菜单结构的 localStorage key
	...others // 透传给 Card 的其他属性
}: Props) => {
	const theme = useTheme();
	const gMenu = useGlobalMenuDataContext();
	const location = useLocation();
	const [main, setMain] = useState<IMenuDataItem | undefined>();
	const [item, setItem] = useState<IMenuDataItem>();
	/* 权限菜单的渲染树 */
	const [menuTree, setmenuTree] = useLocalStorage<IMenuTreeData | null>(menuStroageName, null);
	const navigate = useNavigate();

	const iconSX = {
		marginRight: theme.spacing(0.75),
		marginTop: `-${theme.spacing(0.25)}`,
		width: "1rem",
		height: "1rem",
		color: theme.palette.secondary.main,
	};

	const linkSX = {
		display: "flex",
		color: "grey.900",
		textDecoration: "none",
		alignContent: "center",
		alignItems: "center",
	};

	let customLocation = location.pathname;

	const backFunc = function () {
		window.history.back();
	};

	useEffect(() => {
		let result: any = false;
		if (!menuTree || !menuTree.data) {
			return;
		}
		menuTree.data?.map((menu: IMenuDataItem) => {
			if (customLocation.indexOf(menu.frontPath) === 0 && menu.frontPath !== "/") {
				setMain(menu);
				setItem(menu);
			} else {
				let res = getCollapse(menu);
				if (res !== false) {
					result = res;
				}
			}
			return false;
		});
		//如果最终什么都没找到，就不显示标题栏
		if (result === false) {
			setMain(null);
			setItem(null);
		}
	}, [menuTree, customLocation]);

	// set active item state
	const getCollapse = (menu: IMenuDataItem) => {
		if (!custom && menu.menuChildren) {
			let current = { lastCount: 99999999, target: null };
			for (let collapse of menu.menuChildren) {
				let result = getCollapse(collapse);
				if (result !== false) {
					current = result;
				}
				if (collapse.type && collapse.type === "M") {
					if (customLocation.indexOf(collapse.frontPath) === 0) {
						let strLength = customLocation.replace(collapse.frontPath, "").length;
						if (strLength < current.lastCount) {
							current = {
								lastCount: strLength,
								target: collapse,
							};
						}
					}
				} else if (collapse.type && (collapse.type === "C" || collapse.type === "F")) {
					if (customLocation.indexOf(collapse.frontPath) === 0) {
						let strLength = customLocation.replace(collapse.frontPath, "").length;
						if (strLength < current.lastCount) {
							current = {
								lastCount: strLength,
								target: collapse,
							};
						}
					}
				}
			}
			if (current.target !== null) {
				setMain(current.target);
				setItem(current.target);
				return current;
			}
		}
		return false;
	};

	// item separator
	const SeparatorIcon = separator!;
	const separatorIcon = separator ? <SeparatorIcon /> : <IconTallymark1 stroke={1.5} size="16px" />;

	let mainContent;
	let itemContent;
	let breadcrumbContent: ReactElement = null;
	let itemTitle: NavItemType["title"] = "";
	let CollapseIcon;
	let ItemIcon;

	// collapse item
	if (main && main.type === "collapse") {
		CollapseIcon = main.icon ? main.icon : AccountTreeTwoToneIcon;
		mainContent = (
			<Typography
				{...(main.frontPath && { component: Link, to: main.frontPath })}
				variant="subtitle1"
				sx={linkSX}
				color={window.location.pathname === main.frontPath ? "text.primary" : "text.secondary"}
			>
				{icons && <CollapseIcon style={iconSX} />}
				{main.name}
			</Typography>
		);
	}

	if (!custom && main && customLocation !== "/dashBoard") {
		breadcrumbContent = (
			<>
				{(function () {
					if (fixedTop) {
						return (
							<div
								style={{
									height: "56.5px",
									width: "100%",
									marginBottom: "24px",
								}}
							></div>
						);
					}
					return null;
				})()}
				<Card
					sx={card === false ? { mb: 3, bgcolor: "transparent", ...sx } : { mb: 3, bgcolor: "background.default", ...sx }}
					{...others}
					style={(function () {
						if (fixedTop) {
							return {
								transition: "all 0.3s ease-in-out",
								position: "fixed",
								top: "68px",
								left: "260px",
								right: 0,
								zIndex: 5,
								borderRadius: "0px",
								backgroundColor: "rgb(250 250 250 / 95%)",
							};
						}
						return { transition: "all 0.3s ease-in-out" };
					})()}
				>
					<Box
						sx={(function () {
							if (fixedTop) {
								return { p: 0.5, transition: "all 0.3s ease-in-out" };
							}
							return { p: 2, pl: card === false ? 0 : 2, transition: "all 0.3s ease-in-out" };
						})()}
					>
						<Grid
							container
							direction={rightAlign ? "row" : "column"}
							justifyContent={rightAlign ? "space-between" : "flex-start"}
							alignItems={rightAlign ? "center" : "flex-start"}
							spacing={1}
						>
							{title && !titleBottom && (
								<BTitle
									title={
										(function () {
											try {
												return gMenu.navPathArr[gMenu.navPathArr.length - 1].name;
											} catch (_e) {
												console.log(_e);
											}
											return "";
										})() as string
									}
									backCall={function () {
										backFunc();
									}}
								/>
							)}
							<Grid item>
								<MuiBreadcrumbs
									aria-label="breadcrumb"
									maxItems={maxItems || 8}
									separator={separatorIcon}
									sx={{ "& .MuiBreadcrumbs-separator": { width: 16, ml: 1.25, mr: 1.25 } }}
								>
									<Typography
										component={Link}
										to={(function () {
											try {
												if (typeof gMenu.selectedMenu.frontPath !== "undefined") {
													return gMenu.selectedMenu.frontPath;
												}
											} catch (_e) {
												console.log(gMenu);
												console.log(gMenu.selectedMenu);
												console.log(_e);
											}
											return "/";
										})()}
										color="textSecondary"
										variant="subtitle1"
										sx={linkSX}
									>
										{icons && <HomeTwoToneIcon style={iconSX} />}
										{icon && !icons && <HomeIcon style={{ ...iconSX, marginRight: 0 }} />}
										{(!icon || icons) && "Dashboard"}
									</Typography>
									{(function () {
										return gMenu.navPathArr.reduce(function (acc, item, index) {
											acc.push(
												<Typography
													key={index}
													variant="subtitle1"
													sx={linkSX}
													color={window.location.pathname === main.frontPath ? "text.primary" : "text.secondary"}
												>
													{item.name}
												</Typography>
											);
											return acc;
										}, []);
									})()}
								</MuiBreadcrumbs>
							</Grid>
							{title && titleBottom && (
								<BTitle
									backCall={function () {
										backFunc();
									}}
									title={main.name as string}
								/>
							)}
						</Grid>
					</Box>
					{card === false && divider !== false && <Divider sx={{ mt: 2 }} />}
				</Card>
			</>
		);
	}

	// items
	if ((item && item.type === "C") || (item?.type === "M" && item?.frontPath) || custom) {
		itemTitle = item?.name;

		ItemIcon = item?.icon ? item.icon : AccountTreeTwoToneIcon;
		itemContent = (
			<Typography variant="subtitle1" sx={{ ...linkSX, color: "text.secondary" }}>
				{icons && <ItemIcon style={iconSX} />}
				{itemTitle}
			</Typography>
		);

		let tempContent = (
			<MuiBreadcrumbs
				aria-label="breadcrumb"
				maxItems={maxItems || 8}
				separator={separatorIcon}
				sx={{ "& .MuiBreadcrumbs-separator": { width: 16, ml: 1.25, mr: 1.25 } }}
			>
				<Typography component={Link} to="/" color="textSecondary" variant="subtitle1" sx={linkSX}>
					{icons && <HomeTwoToneIcon style={iconSX} />}
					{icon && !icons && <HomeIcon style={{ ...iconSX, marginRight: 0 }} />}
					{(!icon || icons) && "Dashboard"}
				</Typography>
				{mainContent}
				{itemContent}
			</MuiBreadcrumbs>
		);

		if (custom && links && links?.length > 0) {
			tempContent = (
				<MuiBreadcrumbs
					aria-label="breadcrumb"
					maxItems={maxItems || 8}
					separator={separatorIcon}
					sx={{ "& .MuiBreadcrumbs-separator": { width: 16, ml: 1.25, mr: 1.25 } }}
				>
					{links?.map((link: BreadcrumbLinkProps, index: number) => {
						CollapseIcon = link.icon ? link.icon : AccountTreeTwoToneIcon;

						return (
							<Typography
								key={index}
								{...(link.to && { component: Link, to: link.to })}
								variant="subtitle1"
								sx={linkSX}
								color={!link.to ? "text.primary" : "text.secondary"}
							>
								{link.icon && <CollapseIcon style={iconSX} />}
								{link.title}
							</Typography>
						);
					})}
				</MuiBreadcrumbs>
			);
		}

		// main
		if (custom && customLocation !== "/dashBoard") {
			breadcrumbContent = (
				<Card sx={card === false ? { mb: 3, bgcolor: "transparent", ...sx } : { mb: 3, bgcolor: "background.default", ...sx }} {...others}>
					<Box sx={{ p: 2, pl: card === false ? 0 : 2 }}>
						<Grid
							container
							direction={rightAlign ? "row" : "column"}
							justifyContent={rightAlign ? "space-between" : "flex-start"}
							alignItems={rightAlign ? "center" : "flex-start"}
							spacing={1}
						>
							{title && !titleBottom && (
								<BTitle
									backCall={function () {
										backFunc();
									}}
									title={custom ? (heading as string) : (item?.name as string)}
								/>
							)}
							<Grid item>{tempContent}</Grid>
							{title && titleBottom && (
								<BTitle
									backCall={function () {
										backFunc();
									}}
									title={custom ? (heading as string) : (item?.name as string)}
								/>
							)}
						</Grid>
					</Box>
					{card === false && divider !== false && <Divider sx={{ mt: 2 }} />}
				</Card>
			);
		}
	}

	return breadcrumbContent;
};

export default Breadcrumbs;
