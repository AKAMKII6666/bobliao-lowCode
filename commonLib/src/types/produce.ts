// ==============================|| MENU TYPES  ||============================== //

export type ProduceProps = {
  error: object | string | null;
  produceTypes: ProduceTypeItem[];
  broadProduceTypes: ProduceTypeItem[];
  classProduceTypes: ProduceTypeItem[];
  subjectArr: any[];
  registerList: any[];
  stockRegisterArr: any[];
  produceInfo: any;
  registerInfo: any;
  statisLandInfo: any;
  statisLandArr: any[];
  total: number;
  landHeaderInfo: {
    landRegistrationArea: number | string;
    landAssessmentValue: number | string;
    landNum: number | string;
    notUsedLandNum: number | string;
    notUsedLandArea: number | string;
  };
  providerArr: ProviderItem[];
};
export interface ProviderItem {
  address: string;
  annex: string;
  category: string;
  code: string;
  contact: string;
  createTime: string;
  idCard: string;
  idType: string;
  memberIds: number[];
  memberNames: string;
  name: string;
  phone: string;
  providerId?: number;
  remark: string;
  serviceScope: string;
}

export interface ProduceParams {
  parentId?: number;
  status?: string;
  subjectId?: number;
  type: string;
  remark: string;
  name: string;
}

export interface ProduceTypeItem {
  createBy: string;
  createById: number;
  createTime: string;
  updateBy: string;
  updateById: number;
  updateTime: string;
  remark?: string;
  resourceId: number;
  name: string;
  type: string;
  subjectId?: number;
  subjectCode?: null;
  subject?: null;
  status: string;
  parentId?: number;
  transactionId?: number;
  children: ProduceTypeItem[];
}
