import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';

interface IadminMainMenu {
  text: string;
  icon?: OverridableComponent<SvgIconTypeMap<unknown, 'svg'>> & {
    muiName: string;
  };
  status?: boolean;
  id: number;
  path?: string;
  children?: IadminMainMenu[];
}

interface IuserInfo {
  id?: string;
  firstName?: string;
  job?: string;
  lastName?: string;
  progress?: number;
  role?: string;
  admin?: boolean;
  avatar?: string;
  createBy?: string;
  email?: string;
  nickName?: string;
  phonenumber?: string;
  remark?: string;
  sex?: string;
  userName?: string;
  userId?: number;
}

interface IauthContext {
  hasRole: (roles?: string[]) => boolean;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  login: (
    username?: string,
    password?: string,
    uuid?: string,
    code?: string
  ) => Promise<unknown>;
  logout: () => Promise<unknown>;
  userInfo?: IuserInfo;
}

// 系统设置 - 参数管理
interface ISysConfig {
  createBy: string;
  createTime: string;
  updateBy?: string | number;
  updateTime?: string | number;
  remark: string;
  configId: number;
  configName: string;
  configKey: string;
  configValue: string;
  configType: string;
}

// 业务操作日志表格项
interface IOperationLogListItem {
  amount?: number;
  category?: string;
  createBy?: string;
  createById?: number;
  createTime?: string;
  logId?: number;
  memberName?: string;
  operator?: number;
  params?: string;
  remark?: string;
  searchValue?: string;
  subCategory?: string;
  updateBy?: string;
  updateById?: number;
  updateTime?: string;
}

// role
interface IRoleInfo {
  admin: boolean;
  createBy: string;
  createTime: string;
  dataScope: string;
  delFlag: string;
  deptCheckStrictly: boolean;
  deptIds: number[];
  flag: boolean;
  menuCheckStrictly: boolean;
  menuIds: number[];
  params: Record<string, unknown>;
  permissions: string[];
  remark: string;
  roleId: number;
  roleKey: string;
  roleName: string;
  roleSort: number;
  searchValue: string;
  status: string;
  updateBy?: string;
  updateTime?: string;
}

interface IMenuInfo {
  createBy: string | null;
  createTime: string;
  updateBy: string | null;
  updateTime: string | null;
  remark: string | null;
  menuId: number;
  menuName: string;
  parentName: string | null;
  parentId: number;
  orderNum: number;
  path: string;
  component: string | null;
  query: string;
  isFrame: string;
  isCache: string;
  menuType: string;
  visible: string;
  status: string;
  perms: string;
  icon: string;
  children: IMenuInfo[];
}

export interface IDeptInfo {
  ancestors: string;
  children: IDeptInfo[];
  createBy: string;
  createTime: string;
  // 删除标志（0代表存在 2代表删除）
  delFlag: string;
  deptId: number;
  deptName: string;
  email: string;
  leader: string;
  orderNum: number;
  parentId: number;
  parentName: string;
  phone: string;
  remark: string;
  // 部门状态:0正常,1停用
  status: string;
  updateBy: string;
  updateTime: string;
}

export interface IUserTableListItem {
  createBy?: string;
  createTime?: string;
  updateBy?: string;
  updateTime?: string;
  remark?: string;
  userId: number;
  deptId?: number;
  userName?: string;
  nickName?: string;
  email?: string;
  phonenumber?: string;
  sex?: string;
  avatar?: string;
  password?: string | null;
  status?: string;
  delFlag?: string;
  loginIp?: string;
  loginDate?: string;
  dept?: {
    createBy?: string | null;
    createTime?: string;
    updateBy?: string;
    updateTime?: string;
    remark?: string;
    deptId?: string;
    parentId?: string;
    ancestors?: string;
    deptName?: string;
    orderNum?: string;
    leader?: string;
    phone?: number;
    email?: string;
    status?: string;
    delFlag?: string;
    parentName?: string;
    children?: string;
  };
  roles?: string[];
  roleIds?: string[];
  postIds?: string[];
  roleId?: string[];
  admin: boolean;
}

export interface IUserTableList {
  total: number;
  rows?: IUserTableListItem[];
}

// 信用系统 - 股金管理
interface ICrRegulationStock {
  confirmPassword: string;
  createBy: string;
  createById: string;
  createTime: number;
  delFlag: string;
  isWithdrawnUnderPromise: number;
  memberId: number;
  password: string;
  remark: string;
  shareCertificateNumber: string;
  shareType: string;
  status: string;
  stockId: string;
  updateBy: string;
  updateById: number;
  updateTime: string;
}

// 公告
interface INoticeInfo {
  content: string;
  createBy: string;
  createByName: string;
  createTime: string;
  noticeId: number;
  remark: string;
  status: string;
  // 状态（0：正常，1：停用）
  title: string;
  type: string;
  // 类型（1：公告）
  updateBy: string;
  updateByName: string;
  updateTime: string;
}

// 用户公告
interface IUserNoticeInfo {
  createBy: string;
  createById: number;
  createTime: string;
  noticeId: number;
  noticeStatus: string;
  // 公告状态（0：正常，1：停用）
  noticeUserId: number;
  remark: string;
  status: string;
  // 状态（0：未读，1：已读
  title: string;
  updateBy: string;
  updateById: number;
  updateTime: string;
  userId: number;
}
