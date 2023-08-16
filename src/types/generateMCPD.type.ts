export interface GenPDMCResponselist {
  id: number;
  errorMessage: string;
  referenceNumber: string;
  generatePD: PDResponselist[] | null;
}

export interface PDResponselist {
  id: number;
  errorMessage: string;
  itemCode: string;
}

export interface MaincardResponse {
  id: number;
  plantCode: string;
  typeCode: string;
  barcodeId: string;
  basketSeq: number;
  barcodeQty: number;
  allocateLotid: number;
  saleOrderid: number;
  lot: string;
  sizeNo: string;
  allocateSizeId: number;
  itemNo: string;
  itemName: string;
  statusMc: string;
  productionOrderId: number;
  itemCodePd: string;
  itemNamePd: string;
  createBy: string;
  createDate: Date;
  updateBy: string;
  updateDate: Date;
  buy: string;
  width: string;
  ponumber: string;
  shipToCode: string;
  shipToDesc: string;
  colors: string;
  category: string;
  gender: string;
}

export interface mclisthead {
  lot: string;
  style: string;
  total: number;
}
