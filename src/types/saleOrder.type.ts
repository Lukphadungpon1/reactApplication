export interface saleOrderRequest {
  DocEntry: number;
  SoNumber: string;
  CardCode: string;
  CardName: string;
  Currency: string;
  BuyYear: string;
  BuyMonth: string;
  DocStatus: string;
  SaleTypes: string;
  DeliveryDate: string;
  Remark?: string;
  FormFiles: any;
}

export interface SaleOrderSearchRequest {
  soNumber: string;
  cardCode: string;
  cardName: string;
  buy: string;
  docNum: string;
}

export interface SaleOrderGetCustomer {
  id: number;
  cardCode: string;
  cardName: string;
  currencyName: string;
  currency: string;
}

export interface SaleOrderMasterResult {
  id: number;
  name: string;
  value: string;
  createBy: string;
  createDate: Date;
  status: number;
}

export interface SOListRequest {
  soNumber: string;
  cardCode: string;
  cardName: string;
  buy: string;
  docNum: string;
}

export interface SOResultByID {
  id: number;
  soNumber: string;
  docEntry: number;
  docNum: null;
  cardCode: string;
  cardName: string;
  docRate: null;
  currency: string;
  buy: string;
  docStatus: string;
  saleTypes: string;
  remark: string;
  uploadFile: string;
  deliveryDate: Date;
  createBy: string;
  createDate: Date;
  updateBy: null;
  updateDate: null;
  convertSap: number;
  generateLot: number;
  generateLotBy: string;

  saleOrderD: SaleOrderD[];
}

export interface SaleOrderD {
  id: number;
  sohid: number;
  lineNum: number;
  itemCode: string;
  billOfMaterial: any;
  dscription: string;
  quantity: number;
  width: string;
  uomCode: string;
  shipToCode: string;
  shipToDesc: string;
  poNumber: string;
  buy: string;
  itemNo: string;
  sizeNo: number;
  colors: string;
  category: string;
  gender: string;
  style: string;
  lineStatus: string;
  generateLot: number;
}

export interface SaleOrderDetailExcel {
  id: number;
  itemCode: string;
  style: string;
  quantity: number;
  shipToCode: string;
  shipToDesc: string;
  poNumber: string;
  width: string;
  status: string;
  colors: string;
  category: string;
  gender: string;
}

export interface SaleOrderExcel {
  id: number;
  itemCode: string;
  quantity: number;
  shipToCode: string;
  shipToName: string;
  poNumber: string;
  width: string;
}
