export type BillingProps = {
  error: object | string | null;
  billingArr: BillingRecordItem[];
  balanceArr: BalanceRecordItem[];
  assetsArr: AssetsRecordItem[];
  profitArr: ProfitRecordItem[];
  dividendArr: any[];
  surplusArr: SurplusItem[];
  dividendSum: undefined | object;
  rightsInfo: undefined | any;
  stlmtArr: StlmtItem[];
  annualStlmtArr: AnnualStlmtItem[];
};

export interface StlmtItem {
  month: number;
  remark: undefined | null | string;
  stlmtId: number;
  title: string;
  type: string;
  year: number;
}

export interface AnnualStlmtItem {
  remark: undefined | null | string;
  annualId: number;
  title: string;
  type: string;
  year: number;
}

export interface SurplusItem {
  surplusId: number;
  name: string;
  code: string;
  rowNum: number;
  currentBalance: number;
  yesterBal: number;
  eventYear: string;
}
export interface ProfitRecordItem {
  name: string;
  code: string;
  rowNum: number;
  yesterBal: number;
  currentBalance: number;
}

export interface AssetsRecordItem {
  type: string;
  name: string;
  code: string;
  rowNum: number;
  yesterBal: number;
  currentBalance: number;
}

export interface BalanceRecordItem {
  subject: string;
  beginDebit: number;
  beginCredit: number;
  currentDebit: number;
  currentCredit: number;
  endDebit: number;
  endCredit: number;
}

export interface FinAccountingItem {
  creditAmount: number;
  debitAmount: number;
  detailId: number;
  firstSubjectId: number;
  recordId: number;
  secondSubjectId: number;
  subjectDirection: string;
  subjectFullName: string;
  subjectId: number;
  summary: string;
  thirdSubjectCode: string;
  thirdSubjectId: number;
}

export interface BillingRecordItem {
  code: string;
  createBy: string;
  createById: number;
  createTime: string;
  finAccountingDetailList: FinAccountingItem[];
  recordId: number;
  remark: string;
  status: string;
  totalAmount: number;
  transactionId: string;
}
