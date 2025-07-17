// ==============================|| MENU TYPES  ||============================== //

export type LedgerProps = {
  error: object | string | null;
  ledgers: any[];
};

 
export type LedgerQuery = {
  firstSubjectId?: number | null;
  secondSubjectId?: number| null;
  ownSubjectId?: number | null;
  "params[beginTime]"?: string;
  "params[endTime]"?: string;
}
