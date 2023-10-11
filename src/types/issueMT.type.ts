export interface ReqIssueMTResponse {
  id: number;
  reqNumber: string;
  lot: string;
  requestBy: string;
  requestDate: string;
  reqDept: string;
  site: string;
  requireDate: string;
  remark: string;
  createBy: string;
  createDate: string;
  updateBy: string;
  updateDate: string;
  status: string;
  location: string;
  reqIssueMaterialDs: ReqIssueMaterialD[];
  reqIssueMaterialLogs: ReqIssueMaterialLog[];
}

export interface ReqIssueMaterialD {
  id: number;
  pdhid: number;
  pddid: number;
  lineNum: number;
  itemCode: string;
  itemName: string;
  location: string;
  createBy: string;
  createDate: string;
  updateBy: string;
  updateDate: string;
  status: string;
}

export interface ReqIssueMaterialLog {
  id: number;
  reqHid: number;
  users: string;
  logDate: string;
  status: string;
  levels: number;
  comment: string;
  action: string;
  clientName: string;
}

export interface changLocationItemH {
  id: number;
  department: string;
  chkReqIss: boolean;
}

export interface RequestIssueMTItemListH {
  id: number;
  itemCode: string;
  itemName: string;
  color: string;
  plandQty: number;
  uomName: string;
  department: string;
  onhand: number;
  whsCode: string;
  onhandDFwh: number;
  chkReqIss: boolean;
  itemD: ItemD[];
}

export interface ItemD {
  id: number;
  pdhid: number;
  allocateLotSizeId: number;
  lineNum: number;
  itemType: string;
  itemCode: string;
  itemName: string;
  baseQty: number;
  plandQty: number;
  uomName: string;
  department: string;
  request: string;
  chkReqIss: boolean;
  onhand: number;
  whsCode: string;
  onhandDFwh: number;
  lot: string;
  itemCodeS: string;
  sizeNo: string;
}

export interface LocationIssue {
  id: number;
  code: string;
  name: string;
  groups: string;
}

export interface IssueMTSearch {
  id?: number;
  issueNumber?: string;
  location?: string;
  lotlist?: string;
  pickingBy?: string;
  pickingDate?: string | null;
  printDate?: string | null;
  issueBy?: string;
  issueDate?: string | null;
  createBy?: string;
}

export interface IssueMTGroupD {
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
}
