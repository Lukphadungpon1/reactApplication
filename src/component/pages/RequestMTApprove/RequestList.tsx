import React from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../../store/slices/authSlice";
import { useAppDispatch } from "../../../store/store";
import { useDebounce } from "@react-hook/debounce";
import {
  AddItemSelectedList,
  AddRequestIssueSelected,
  SearchRequestMT,
  issueMTAPRSelector,
} from "../../../store/slices/issueMTAPRSlice";
import { Box, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import QuickSearchToolbar from "../../QuickSearchToolbar";
import Moment from "react-moment";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

type Props = {
  handleopenDialog: any;
};

const RequestList = (props: Props) => {
  const issueMTAPRReducer = useSelector(issueMTAPRSelector);
  const authReducer = useSelector(authSelector);
  const dispatch = useAppDispatch();

  const [keywordSearch, setKeywordSearch] = useDebounce<string>("", 1000);
  const [keywordSearchNoDelay, setKeywordSearchNoDelay] =
    React.useState<string>("");

  React.useEffect(() => {
    // dispatch(stockActions.loadStockByKeyword(keywordSearch));
    dispatch(SearchRequestMT(keywordSearch));
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
      field: "reqNumber",
      headerName: "ReqNumber",
      headerAlign: "center",
      width: 120,
    },
    {
      field: "lot",
      headerName: "Lot",
      headerAlign: "center",
      width: 120,
    },
    {
      field: "requestBy",
      headerName: "Request By",
      headerAlign: "center",
      width: 120,
    },
    {
      field: "requestDate",
      headerName: "Request Date",
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
      field: "requireDate",
      headerName: "Require Date",
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
      field: "reqDept",
      headerName: "Department",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "site",
      headerName: "Site",
      headerAlign: "center",
      align: "center",
      width: 80,
    },
    {
      field: "remark",
      headerName: "Remark",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      headerName: "Detail",
      headerAlign: "center",
      field: ".dt",
      width: 100,
      align: "center",
      renderCell: ({ row }: GridRenderCellParams<any>) => (
        <IconButton
          aria-label="Maincard"
          color="primary"
          size="small"
          onClick={async (e: React.ChangeEvent<any>) => {
            e.preventDefault();

            //console.log(row.id);
            var ids = row.id;

            const selectedRows =
              issueMTAPRReducer.RequestissueMTHListSearch.filter(
                (row) => row.id === ids
              );

            selectedRows.map((obj) => {
              props.handleopenDialog("Detail");
              dispatch(AddRequestIssueSelected(obj));
            });
          }}
        >
          <ZoomInIcon fontSize="inherit" />
        </IconButton>
      ),
    },
    {
      headerName: "Log",
      headerAlign: "center",
      field: ".mc",
      width: 100,
      align: "center",
      renderCell: ({ row }: GridRenderCellParams<any>) => (
        <IconButton
          aria-label="Maincard"
          color="primary"
          size="small"
          onClick={async (e: React.ChangeEvent<any>) => {
            e.preventDefault();

            //console.log(row.id);
            var ids = row.id;

            const selectedRows =
              issueMTAPRReducer.RequestissueMTHListSearch.filter(
                (row) => row.id === ids
              );

            selectedRows.map((obj) => {
              props.handleopenDialog("Log");
              dispatch(AddRequestIssueSelected(obj));
            });
          }}
        >
          <RemoveRedEyeIcon fontSize="inherit" />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ height: "100%", width: "100%", overflowX: "scroll" }}>
      <DataGrid
        rowHeight={30}
        checkboxSelection
        onRowSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);

          const selectedRows = issueMTAPRReducer.RequestissueMTHList.filter(
            (row) => selectedIDs.has(row.id)
          );

          dispatch(AddItemSelectedList(selectedRows));
        }}
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
          issueMTAPRReducer.RequestissueMTHListSearch.length > 0
            ? issueMTAPRReducer.RequestissueMTHListSearch
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

export default RequestList;
