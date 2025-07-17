export type AuthorizedProps = {
  error: object | string | null;
  authorizeds: AuthorizedItem[];
  selectAuthorizeds: AuthorizedItem[];
};

export interface AuthorizedItem {
  createBy: string;
  createById: number;
  createTime: string;
  updateBy: string;
  updateById: number;
  updateTime: string;
  remark: string;
  authId: number;
  authFunction: string;
  functionDescription: string;
  authType: string;
  parentId: number;
  status: string;
  allocatedIds: string | null;
  transactionId: string;
  children: AuthorizedItem[];
}

export interface BatchItem {
  allocatedIds: string | number[];
  authIds: string | number[];
}

export interface CancelItem {
  allocatedIds: string;
  authId: number;
}
