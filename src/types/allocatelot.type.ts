export interface AllocateLotRequest {
  soNumber: string;
  buy: string;
  purOrder: string;
  lot: string;
}

export interface AllocateLotResponse {
  id: number;
  buy: string;
  saleOrderId: number;
  soNumber: string;
  saleDocDate: Date | null;
  purOrder: string;
  lot: string;
  itemNo: string;
  itemName: string;
  width: string;
  shipToCode: string;
  shipToName: string;
  saleStartDate: Date;
  total: number;
  s035: number | null;
  s040: number | null;
  s050: number | null;
  s055: number | null;
  s060: number | null;
  s065: number | null;
  s070: number | null;
  s075: number | null;
  s080: number | null;
  s085: number | null;
  s090: number | null;
  s095: number | null;
  s100: number | null;
  s105: number | null;
  s110: number | null;
  s115: number | null;
  s120: number | null;
  s130: number | null;
  s140: number | null;
  s150: number | null;
  s160: number | null;
  s170: number | null;
  createBy: string;
  createDate: Date;
  updateBy: string | null;
  updateDate: string | null;
  status: string;
  statusIssueMat: string | null;
  statusReceiveMat: string | null;
  statusReceiveFg: string | null;
  statusPlanning: string | null;
  generateMc: number;
  generateMcby: string | null;
  generatePd: number;
  generatePdby: string | null;
  statusProduction: string | null;
  allocateLotSizes: AllocateLotSize[];
  allocateMcs: any[];
}

export interface AllocateLotSize {
  id: number;
  lot: string;
  itemCode: string;
  allocateLotId: number;
  saleOrderId: number;
  saleOrderLineNum: number;
  type: string;
  sizeNo: string;
  total: number;
  qty: number;
  receive: number;
  createBy: string;
  createDate: Date;
  updateBy: string | null;
  updateDate: Date | null;
  bomVersion: string | null;
}

export interface ChangeLotnumber {
  id: number;
  LotFrom: string;
  LotTo: string;
}
