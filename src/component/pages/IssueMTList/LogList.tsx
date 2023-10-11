import React from "react";
import { useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import { issueMTListSelector } from "../../../store/slices/issueMTListSlice";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import Moment from "react-moment";

type Props = {};

const LogList = (props: Props) => {
  const issueMTListReducer = useSelector(issueMTListSelector);
  const dispatch = useAppDispatch();

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
      field: "users",
      headerName: "Users",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "logDate",
      headerName: "Date",
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
      field: "comment",
      headerName: "Comment",
      headerAlign: "center",
      width: 250,
    },
    {
      field: "action",
      headerName: "Action",
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
            ? issueMTListReducer.issueMTSelected!.issueMaterialLogs
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

export default LogList;
