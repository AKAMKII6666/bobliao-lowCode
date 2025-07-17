export interface DailyItem {
    createBy?: string;
    createById?: number;
    createTime: string;
    updateBy?: string;
    updateById?: number;
    updateTime?: string;
    remark?: string;
    taskId: number;
    taskName: string;
    taskCode: string;
    taskNumber?: number;
    status: string;
}
export interface MonthClosureItem {
    date: string;
    status: string;
}
export interface DailyInfo {
    createBy?: string;
    createById?: string;
    createTime?: string;
    updateBy?: string;
    updateById?: string;
    updateTime?: string;
    remark?: string;
    taskId: number;
    taskName?: null;
    taskCode: string;
    taskNumber: string;
    status?: string;
    orgCode: number;
    orgName: string;
}
export type DailyProps = {
    error: object | string | null;
    dailys: DailyItem[];
    total: number;
    monthClosures: MonthClosureItem[];
    tellersBox: {
        yesterdayDetails: TellerItem;
        todayIncomeDetails: TellerItem;
        todayExpenditureDetails: TellerItem;
        todayDetails: TellerItem;
    };
    dailyInfo: DailyInfo;
    currencys: CurrencyItem[];
    transfers: CurrencyItem[];
    accountDailyStatement: DailyStatementItem[];
    dailyStatementSummary: DailyStatementItem[];
    subjectBalances: SubjectBalanceItem[];
    emptyVouchers: EmptyVoucherItem[];
    offBalanceSheet: OffBalanceSheetItem[];
    offBalanceSheetSubject: OffBalanceSheetSubjectItem[];
    offBlanceSubjectBalances: OffBlanceSubjectBalanceItem[];
};
export interface DailyStatementItem {
    subjectCode?: number;
    firstSubjectId?: number;
    firstSubject?: string;
    debitCount?: number;
    debitAmount?: number;
    debitCountTotal?: number;
    debitAmountTotal?: number;
    creditCount?: number;
    creditAmount?: number;
    creditCountTotal?: number;
    creditAmountTotal?: number;
    currencyChildren?: DailyStatementItem;
    transferChildren?: DailyStatementItem;
}
export interface CurrencyItem {
    createBy?: string;
    createById?: number;
    createTime?: string;
    updateBy?: string;
    updateById?: number;
    updateTime?: string;
    remark?: string;
    ledgerId?: number;
    firstSubjectId?: number;
    secondSubjectId?: number;
    ownSubjectId?: number;
    ownSubject?: string;
    counterpartSubjectId?: number;
    counterpartSubject?: string;
    debitAmount?: number;
    creditAmount?: number;
    debitBalance?: number;
    creditBalance?: number;
    voucherNumber?: number;
    businessSerialNumber?: string;
    summary?: string;
    subjectDirection?: string;
    incomeQuantity?: number;
    expenditureQuantity?: number;
    balanceQuantity?: number;
    previousDebitBalance?: number;
    previousCreditBalance?: number;
    previousBalance?: number;
}
export interface TellerItem {
    createBy?: number;
    createById?: number;
    createTime?: string;
    updateBy?: string;
    updateById?: number;
    updateTime?: string;
    remark?: string;
    cashId?: number;
    oneHundred?: number;
    fifty?: number;
    twenty?: number;
    ten?: number;
    five?: number;
    two?: number;
    one?: number;
    smallDenomination?: number;
    fullRemainder?: number;
    halfRemainder?: number;
    totalAmount?: number;
    type?: string;
    oneHundredAmount?: number;
    fiftyAmount?: number;
    twentyAmount?: number;
    tenAmount?: number;
    fiveAmount?: number;
    twoAmount?: number;
    oneAmount?: number;
}
export interface SubjectBalanceItem {
    subjectCode?: number;
    subjectId?: number;
    subject?: string;
    yesterdayDebitBalance?: number;
    yesterdayCreditBalance?: number;
    todayDebitAmount?: number;
    todayCreditAmount?: number;
    todayDebitBalance?: number;
    todayCreditBalance?: number;
}
export interface EmptyVoucherItem {
    subjectId?: number;
    voucherType?: string;
    yesterdayVoucherStock?: number;
    todayIncomeAmount?: number;
    todayPayAmount?: number;
    todayVoucherStock?: number;
}
export interface OffBalanceSheetItem {
    createBy?: string;
    createById?: number;
    createTime?: string;
    updateBy?: string;
    updateById?: number;
    updateTime?: string;
    remark?: string;
    ledgerId?: number;
    firstSubjectId?: number;
    secondSubjectId?: number;
    ownSubjectId?: number;
    ownSubject?: string;
    counterpartSubjectId?: number;
    counterpartSubject?: string;
    debitAmount?: number;
    creditAmount?: number;
    debitBalance?: number;
    creditBalance?: number;
    voucherNumber?: number;
    businessSerialNumber?: string;
    summary?: string;
    subjectDirection?: string;
    incomeQuantity?: number;
    expenditureQuantity?: number;
    balanceQuantity?: number;
    previousDebitBalance?: number;
    previousCreditBalance?: number;
    previousBalance?: number;
}
export interface OffBalanceSheetSubjectItem {
    subjectId: number;
    subject: string;
    incomeAmount: number;
    payAmount: number;
}
export interface OffBlanceSubjectBalanceItem {
    subjectCode: number;
    subjectId: number;
    subject: string;
    yesterdayDebitBalance: number;
    todayDebitAmount: number;
    todayCreditAmount: number;
    todayDebitBalance: number;
}
//# sourceMappingURL=daily.d.ts.map