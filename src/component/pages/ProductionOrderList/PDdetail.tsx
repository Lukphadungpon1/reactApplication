import React from "react";
import { productionOrderSelector } from "../../../store/slices/productionOrderSlice";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ProductionOrderDRespon } from "../../../types/productionOrder.type";

type Props = {};

const PDdetail = (props: Props) => {
  const productionOrderReducer = useSelector(productionOrderSelector);

  const rows: any = [];
  const columns: GridColDef[] = [
    {
      headerName: "id",
      headerAlign: "center",
      field: "id",
      width: 50,
      // hideable: false,
    },
    {
      field: "lineNum",
      headerName: "Line",
      headerAlign: "center",
      width: 80,
    },
    {
      field: "itemCode",
      headerName: "Code",
      headerAlign: "center",
      width: 150,
    },
    {
      field: "itemName",
      headerName: "Name",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "baseQty",
      headerName: "BaseQty",
      headerAlign: "center",
      width: 100,
    },
    {
      field: "plandQty",
      headerName: "PlanQty",
      headerAlign: "center",
      width: 100,
    },
    {
      field: "uomName",
      headerName: "UOM",
      headerAlign: "center",
      align: "center",
      width: 80,
    },
    {
      field: "warehouse",
      headerName: "Warehouse",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "department",
      headerName: "Department",
      headerAlign: "center",
      align: "center",
      width: 80,
    },
  ];

  return (
    <Box sx={{ height: "100%", width: "100%", overflowX: "scroll" }}>
      <DataGrid
        rows={
          productionOrderReducer.pdselected
            ? productionOrderReducer.pdselected.productionOrderDs
            : rows
        }
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
          columns: {
            columnVisibilityModel: { id: false },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        // onRowDoubleClick={}
      ></DataGrid>
    </Box>
  );
};

export default PDdetail;
