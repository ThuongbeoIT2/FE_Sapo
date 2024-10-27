export interface StoreResponse {
  storeId: number;
  storeCode: string; // UUID được lưu dưới dạng chuỗi trong TypeScript
  storeName: string;
  address: string;
  email_manager: string;
  phoneNumber: string;
  thumbnail: string;
  ekyc_01: string;
  ekyc_02: string;
  description: string;
  status: boolean;
  evaluate: number;
  createdAt: Date;
  updatedAt: Date;
  view: number;
  storeType: string;
  urlIntroduce: number;

}
