export type DividendProps = {
    error: object | string | null;
    dividends: DividendItem[];
    dividendInfo: DividendItem | undefined;
};
export interface DividendItem {
    createBy: string;
    createById: number;
    createTime: string;
    updateBy: string;
    updateById: number;
    updateTime: string;
    remark?: null;
    dividendId: number;
    period?: null;
    autoRenewal?: null;
    annualRate: number;
    type: string;
    status: string;
    remarks: string;
}
export interface DividendParams {
    dividendId?: number;
    status: string;
    annualRate?: number | null | string;
    type: string;
}
//# sourceMappingURL=dividend.d.ts.map