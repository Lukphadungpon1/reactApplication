import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { issueMTListSelector } from "../../../store/slices/issueMTListSlice";

type Props = {};

const DetailList = (props: Props) => {
  const issueMTListReducer = useSelector(issueMTListSelector);

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
      field: "buy",
      headerName: "Buy",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "lot",
      headerName: "Lot",
      headerAlign: "center",
      align: "left",
      width: 250,
    },

    {
      field: "itemCode",
      headerName: "ItemCode",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "itemName",
      headerName: "ItemName",
      headerAlign: "center",
      align: "left",
      width: 250,
    },
    {
      field: "uomName",
      headerName: "UOM",
      headerAlign: "center",
      align: "left",
      width: 100,
    },
    {
      field: "warehouse",
      headerName: "Warehouse",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "baseQty",
      headerName: "BaseQty",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "plandQty",
      headerName: "plandQty",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "pickQty",
      headerName: "pickQty",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "issueQty",
      headerName: "issueQty",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "createBy",
      headerName: "CreateBy",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "createDate",
      headerName: "Create Date",
      headerAlign: "center",
      align: "center",
      width: 150,
      renderCell: ({ value }: GridRenderCellParams<any>) =>
        value !== null ? (
          <Typography variant="body1">
            <Moment format="DD/MM/YYYY HH:mm">{value}</Moment>
          </Typography>
        ) : (
          ""
        ),
    },
    {
      field: "location",
      headerName: "location",
      headerAlign: "center",
      align: "center",
      width: 120,
    },
  ];

  return (
    <Box sx={{ height: "100%", width: "100%", overflowX: "scroll" }}>
      <DataGrid
        rowHeight={30}
        rows={
          issueMTListReducer.issueMTSelected
            ? issueMTListReducer.issueMTSelected!.issueMaterialDs
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
        pageSizeOptions={[10, 50, 70]}
        // onRowDoubleClick={}
      ></DataGrid>
    </Box>
  );
};

export default DetailList;
