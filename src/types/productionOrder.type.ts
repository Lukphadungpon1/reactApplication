export interface ProductionOrderHResponse {
  id: number;
  itemCode: string;
  itemName: string;
  planQty: number;
  uomCode: string;
  type: string;
  status: string;
  warehouse: string;
  priority: string;
  orderDate: Date | null;
  startDate: Date;
  dueDate: Date;
  project: string;
  remark: string;
  allocateLotSizeId: number;
  convertSap: number | null;
  docNum: string;
  docEntry: number | null;
  createBy: string;
  createDate: Date;
  updateBy: string;
  updateDate: Date;
  lot: string;
  width: string | null;
  sodocEntry: number | null;
  allocateLotSizeName: string;
  productionOrderDs: ProductionOrderDRespon[];
}

export interface ProductionOrderDRespon {
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
  warehouse: string;
  issueMethod: string;
  startDate: Date;
  endDate: Date;
  department: string;
  bomItemCode: string | null;
  bomVersion: string | null;
  status: string;
  bomLine: number | null;
}
