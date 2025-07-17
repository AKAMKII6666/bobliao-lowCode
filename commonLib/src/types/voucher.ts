// ==============================|| MENU TYPES  ||============================== //

export type VoucherProps = {
  error: object | string | null;
  vouchers: any[];
  voucherTable:{
    total: number;
    rows: any[];
  }
};
