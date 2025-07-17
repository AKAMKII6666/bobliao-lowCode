export type StockAuthorRecordsProps = {
  error: object | string | null;
  recordInfo: RecordInfoItem | undefined;
};

export interface FetchRecordInfoItem {
  stockId: number;
  operationType: string;
  transactionId: string;
}

export interface RecordInfoItem {
  recordId: number;
  stockId: number;
  authorizerId: number;
  authorizerName: string;
  transactionId: string;
}
