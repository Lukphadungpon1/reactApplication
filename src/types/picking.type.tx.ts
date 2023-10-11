export interface PickingItemH {
  id: number;
  buy: string;
  location: string;
  itemCode: string;
  itemName: string;
  uomName: string;
  color: string;
  warehouse: string;
  baseQty: number;
  onhand: number;
  onhandWH: number;
  plandQty: number;
  pickQty: number;
  issueQty: number;
  confirmQty: number;

  pickingItemD: PickingItemD[];
}

export interface PickingItemD {
  id: number;
  issueHid: number;
  buy: string;
  lot: string;
  reqHid: number;
  reqDid: number;
  pdhid: number;
  pddid: number;
  lineNum: number;
  itemCode: string;
  itemName: string;
  uomName: string;
  warehouse: string;
  baseQty: number;
  plandQty: number;
  pickQty: number;
  issueQty: number;
  confirmQty: number;
  createBy: string;
  createDate: Date;
  updateBy: string;
  updateDate: Date;
  status: string;
  location: string;
  sizeNo: string;
}

export interface IssueMaterialHResponse {
  id: number;
  issueNumber: string;
  location: string;
  lotlist: string;
  pickingBy: string;
  pickingDate: string;
  printDate: string | null;
  issueBy: string;
  issueDate: string | null;
  createBy: string;
  createDate: string;
  updateBy: string;
  updateDate: string | null;
  status: string;
  uploadFile: string;
  convertSap: number;
  docEntry: number;
  docNum: string;
  remark: string;
  issueMaterialDs: IssueMaterialD[];
  issueMaterialManuals: IssueMaterialManual[];
  issueMaterialLogs: IssueMaterialLog[];
}

export interface IssueMaterialD {
  id: number;
  issueHid: number;
  buy: string;
  lot: string;
  reqHid: number;
  reqDid: number;
  pdhid: number;
  pddid: number;
  lineNum: number;
  itemCode: string;
  itemName: string;
  uomName: string;
  warehouse: string;
  issueMethod: string;
  baseQty: number;
  plandQty: number;
  pickQty: number;
  issueQty: number;
  confirmQty: number;
  createBy: string;
  createDate: string;
  updateBy: string;
  updateDate: string | null;
  status: string;
  itemCodeRef: string;
  itemNameRef: string;
  location: string;
}

export interface IssueMaterialLog {
  id: number;
  issueHid: number;
  users: string;
  logDate: string;
  status: string;
  levels: number;
  comment: string;
  action: string;
  clientName: string;
}

export interface IssueMaterialManual {
  id: number;
  issueHid: number;
  buy: string;
  lot: string;
  itemCode: string;
  itemName: string;
  warehouse: string;
  issueMethod: string;
  baseQty: number;
  plandQty: number;
  pickQty: number;
  issueQty: number;
  confirmQty: number;
  createBy: string;
  createDate: string | null;
  updateBy: string;
  updateDate: string | null;
  status: string;
  convertSap: number;
  docEntry: number;
  docNum: string;
  location: string;
}

export interface UpdatePickQtyM {
  id: number;
  pickQty: number;
}
