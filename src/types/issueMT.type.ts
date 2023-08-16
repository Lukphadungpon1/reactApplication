export interface ReqIssueMTResponse {
  id: number;
  reqNumber: string;
  lot: string;
  requestBy: string;
  requestDate: string;
  reqDept: string;
  requireDate: string;
  remark: string;
  createBy: string;
  createDate: string;
  updateBy: string;
  updateDate: string;
  status: string;
  reqIssueMaterialDs: ReqIssueMaterialD[];
  reqIssueMaterialLogs: ReqIssueMaterialLog[] | null;
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
  createDate: Date;
  updateBy: string;
  updateDate: Date;
  status: string;
}

export interface ReqIssueMaterialLog {
  id: number;
  reqHid: number;
  users: string;
  logDate: Date;
  status: string;
  levels: number;
  comment: string;
  action: string;
  clientName: string;
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
