export type StockSharesProps = {
  error: object | string | null;
  stockshares: any[];
  stockshareInfo: StockShareItem | undefined;
  printAccountHeadInfo: PrintAccountHead | undefined;
  printReceiptInfo: ReceiptInfo | undefined;
  printScripInfo: ScripInfo | undefined;
  shareDetail: any;
  receivingBanks: any[];
  printAccountCont: PrintAccountItem[];
  printStatus: boolean;
  investmentsInfo: InvestmentsInfo | undefined;
  isPrintL: number;
  allVoucherArr: any[];
  subscriptionInfo: any;
  subscriptionRefund: any;
  total: number;
  investmentDetailsArr: any[];
};

export interface InvestmentsInfo {
  investmentArr: any[];
  total: number;
}

export interface PrintItem {
  top: number;
  printArr: PrintAccountItem[];
}

export interface PrintAccountItem {
  date: string;
  summary: string;
  type: string;
  transactionId: number;
  amount: number;
  balance: number;
  operator: string;
  isPrinted: string;
  accountId: number;
}

export interface ScripInfo {
  orgName: string;
  memberName: string;
  stockAccount: string;
  amount: number;
  amountUpper: string;
  depositPeriod: string;
  depositDate: string;
  maturityDate: string;
  expectedAnnualRate: number;
  maturityInterest: number;
  isSecretWithdrawal: string;
  transferMark: string;
  operator: string;
}

export interface ReceiptInfo {
  accountSubject: string;
  currency: string;
  voucherNo: number;
  stockCode: string;
  orgName: string;
  userName: string;
  communeCode: string;
  amount: number;
  amountUpper: string;
  date: string;
  businessType: string;
  operator: string;
  isSecretWithdrawal: string;
  shareCoefficient: number;
  share: number;
}

export interface PrintAccountHead {
  account: string;
  userName: string;
  orgName: string;
  memberCode: string;
  accountNature: string;
  passwordWithdrawal: string;
  openAccountDate: string;
  openAccountFlag: string;
}

export interface StockShareItem {
  stockId: number;
  stockCode: string;
  shareType: string;
  shareCertificateNumber: number;
  memberId: number;
  dividendAmount: number;
  memberName: string;
  communeCode: string;
  mobile: number;
  isWithdrawnUnderPromise: number;
  password: string | null;
  status: string;
  delFlag: string;
  annexs: string;
  printType: string | null;
  isAutoRenewal: string | null;
  dividendMethod: string | null;
  expirationDate: string | null;
  term: string | null;
  stockBalance: number;
  transactionId: string;
  dividendId: string | null;
  createTime: string;
}
