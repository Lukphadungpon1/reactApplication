import React from "react";
import { useSelector } from "react-redux";
import {
  SearchItemSelectedDetail,
  issueMTAPRSelector,
} from "../../../store/slices/issueMTAPRSlice";
import { authSelector } from "../../../store/slices/authSlice";
import { useAppDispatch } from "../../../store/store";
import { useDebounce } from "@react-hook/debounce";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import QuickSearchToolbar from "../../QuickSearchToolbar";
import Moment from "react-moment";

type Props = {};

const DetailList = (props: Props) => {
  const issueMTAPRReducer = useSelector(issueMTAPRSelector);
  const authReducer = useSelector(authSelector);
  const dispatch = useAppDispatch();

  const [keywordSearch, setKeywordSearch] = useDebounce<string>("", 1000);
  const [keywordSearchNoDelay, setKeywordSearchNoDelay] =
    React.useState<string>("");

  React.useEffect(() => {
    // dispatch(stockActions.loadStockByKeyword(keywordSearch));
    dispatch(SearchItemSelectedDetail(keywordSearch));
  }, [keywordSearch]);

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
      width: 650,
    },
    {
      field: "location",
      headerName: "Location",
      headerAlign: "center",
      align: "center",
      width: 120,
    },
    {
      field: "createBy",
      headerName: "createBy",
      headerAlign: "center",
      align: "center",
      width: 120,
    },
    {
      field: "createDate",
      headerName: "Create Date",
      headerAlign: "center",
      align: "center",
      width: 120,
      renderCell: ({ value }: GridRenderCellParams<any>) =>
        value !== null ? (
          <Typography variant="body1">
            <Moment format="DD/MM/YYYY">{value}</Moment>
          </Typography>
        ) : (
          ""
        ),
    },
    {
      field: "updateBy",
      headerName: "UpdateBy",
      headerAlign: "center",
      align: "center",
      width: 120,
    },
    {
      field: "updateDate",
      headerName: "Update Date",
      headerAlign: "center",
      align: "center",
      width: 120,
      renderCell: ({ value }: GridRenderCellParams<any>) =>
        value !== null ? (
          <Typography variant="body1">
            <Moment format="DD/MM/YYYY">{value}</Moment>
          </Typography>
        ) : (
          ""
        ),
    },
  ];

  return (
    <Box sx={{ height: "100%", width: "100%", overflowX: "scroll" }}>
      <DataGrid
        rowHeight={30}
        components={{ Toolbar: QuickSearchToolbar }}
        componentsProps={{
          toolbar: {
            value: keywordSearchNoDelay,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              setKeywordSearch(e.target.value);
              setKeywordSearchNoDelay(e.target.value);
            },
            clearSearch: () => {
              setKeywordSearch("");
              setKeywordSearchNoDelay("");
            },
          },
        }}
        rows={
          issueMTAPRReducer.ItemSelectedDetailSearch.length > 0
            ? issueMTAPRReducer.ItemSelectedDetailSearch
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
