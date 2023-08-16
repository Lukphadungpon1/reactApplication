import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import { useSelector } from "react-redux";
import { saleOrderEditSelector } from "../../../store/slices/saleOrderEditSlice";

type Props = {};

const SaleOrderDetailExcelList = (props: Props) => {
  const rows: any = [];

  const columns: GridColDef[] = [
    {
      headerName: "ID",
      headerAlign: "center",
      field: "id",
      width: 50,
      renderCell: ({ value }: GridRenderCellParams<Number>) => (
        <Typography variant="body1">{value + 1}</Typography>
      ),
      // hideable: false,
    },
    {
      field: "itemCode",
      headerName: "ItemCode",
      width: 150,
      editable: true,
    },
    {
      field: "style",
      headerName: "Style",
      width: 300,
      editable: true,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 80,
      editable: true,
    },
    {
      field: "shipToCode",
      headerName: "ShipToCode",
      width: 80,
      editable: true,
    },
    {
      field: "shipToDesc",
      headerName: "ShipToDesc",
      width: 200,
      editable: true,
    },
    {
      field: "poNumber",
      headerName: "PoNumber",
      width: 100,
      editable: true,
    },
    {
      field: "width",
      headerName: "Width",
      width: 80,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 80,
      editable: true,
    },
    {
      field: "Colors",
      headerName: "Colors",
      width: 150,
      editable: true,
    },
    {
      field: "category",
      headerName: "Category",
      width: 100,
      editable: true,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 80,
      editable: true,
    },
  ];

  const saleOrderEditReducer = useSelector(saleOrderEditSelector);

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={
          saleOrderEditReducer.excelDetail.length > 0
            ? saleOrderEditReducer.excelDetail
            : rows
        }
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        // onRowDoubleClick={}

        // onRowSelectionModelChange={(ids) => {
        //   const selectedIDs = new Set(ids);
        //   const selectedRows = saleOrderReducer.saleOrderCustomer.filter(
        //     (row) => selectedIDs.has(row.id)
        //   );

        //   selectedRows.map((item, index) => {
        //     setselectRows(item);
        //   });
        //   let data: any = {
        //     CardCode: selectRows?.cardCode!,
        //     CardName: selectRows?.cardName!,
        //     Currency: selectRows?.currencyName!,
        //   };

        //   let _dataresult: saleOrderRequest = {
        //     ...saleOrderEditReducer.saleorderRequest,
        //     CardCode: data.CardCode,
        //     CardName: data.CardName,
        //     Currency: data.Currency,
        //   };

        //   dispatch(SOEditUpdate(_dataresult));
        // }}
      ></DataGrid>
    </Box>
  );
};

export default SaleOrderDetailExcelList;
