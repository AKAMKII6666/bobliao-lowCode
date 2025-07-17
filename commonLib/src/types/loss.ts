export type LossProps = {
  error: object | string | null;
  lossArr: LossItem[];
  total: number;
  lossApplyInfo: LossApplyInfoItem | undefined;
  lossInfo: any;
  lossDelInfo: LossApplyInfoItem | undefined;
};

export interface LossItem {
  lossId: number;
  lossCode: string;
  lossType: string;
  lossMethod: string;
  status: string;
  memberName: string;
  memberCode: string;
  idCard: string;
  stockCode: string;
  balance: number;
  capitalBalance: string;
  openDate: string;
  printCode: number;
  agentName?: string;
  agentIdCard?: string;
  agentAddress?: string;
  relationWithHolder?: string;
  lossReason?: string;
  annexs: string;
  transactionId: string;
  createTime: string;
}

export interface LossApplyInfoItem {
  orgName: string;
  orgCode: number;
  lossCode: string;
  lossType: string;
  lossMethod: string;
  memberName: string;
  memberCode: string;
  idCard: string;
  lossIdCard: string;
  stockCode: string;
  balance: number;
  capitalBalance: string;
  openDate: string;
  printCode: number;
  agentName?: string;
  agentIdCard?: string;
  agentAddress?: string;
  lossReason: string;
  remark: string;
  operator: string;
  applyDate: string;
  
  dealResult?: string;
}

export interface LossDelItem {
  annexs?: string;
  authorizerId: number;
  authorizerPassword: string;
  lossDeal: string;
  lossId: number;
}

export interface LossResetPasswodItem {
  stockPassword: string;
  confirmStockPassword: string;
  lossId: number;
}

export interface LossResetItem {
  stockPassword: string;
  confirmStockPassword: string;
  drawSecretDeposit: string;
  annexs: string;
  lossId: number;
  usageId: number;
  voucherCode: number;
}
