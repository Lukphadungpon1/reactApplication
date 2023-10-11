import React from "react";
import { useSelector } from "react-redux";
import {
  AddLotSelectReqIssue,
  GetItemRequestHasync,
  SearchLotRequestMT,
  UpdateRequestissueMTH,
  requestissueMTSelector,
} from "../../../store/slices/RequestissueMTSlice";
import { useAppDispatch } from "../../../store/store";
import { useDebounce } from "@react-hook/debounce";
import { AllocateLotRequest } from "../../../types/allocatelot.type";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, IconButton, Typography } from "@mui/material";
import Moment from "react-moment";
import QuickSearchToolbar from "../../QuickSearchToolbar";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AddchartIcon from "@mui/icons-material/Addchart";
import {
  ReqIssueMTResponse,
  ReqIssueMaterialLog,
} from "../../../types/issueMT.type";
import { authSelector } from "../../../store/slices/authSlice";

type Props = {
  getLotList: any;
  handlecloseDialog: any;
};

const LotListReqMT = (props: Props) => {
  const requestissueMTReducer = useSelector(requestissueMTSelector);
  const authReducer = useSelector(authSelector);
  const dispatch = useAppDispatch();

  const [keywordSearch, setKeywordSearch] = useDebounce<string>("", 1000);
  const [keywordSearchNoDelay, setKeywordSearchNoDelay] =
    React.useState<string>("");

  const [selectedLots, setSelectedLots] = React.useState<AllocateLotRequest[]>(
    []
  );

  const handleGetItemRequestH = async (value: AllocateLotRequest) => {
    var resultaction = await dispatch(GetItemRequestHasync(value));

    if (GetItemRequestHasync.fulfilled.match(resultaction)) {
      props.handlecloseDialog();
    }
  };

  React.useEffect(() => {
    // dispatch(stockActions.loadStockByKeyword(keywordSearch));
    dispatch(SearchLotRequestMT(keywordSearch));
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
      headerName: "Request",
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
              requestissueMTReducer.allocateLotListSearch.filter(
                (row) => row.id === ids
              );
            selectedRows.map((obj) => {
              //console.log(obj.allocateMcs);

              const _data: AllocateLotRequest = {
                soNumber: "",
                buy: "",
                purOrder: "",
                lot: obj.lot,
              };

              const _loglist: ReqIssueMaterialLog[] = [
                {
                  id: 0,
                  reqHid: 0,
                  users: authReducer.account.iss,
                  logDate: new Date().toLocaleDateString("sv"),
                  status: "Request",
                  levels: 0,
                  comment: "",
                  action: "Create",
                  clientName: "",
                },
              ];

              const _reqmth: ReqIssueMTResponse = {
                id: 0,
                reqNumber: "0",
                lot: obj.lot,
                requestBy: authReducer.account.iss,
                requestDate: new Date().toLocaleDateString("sv"),
                reqDept: authReducer.account.EmpDepartment,
                site: authReducer.account.Site,
                requireDate: new Date().toLocaleDateString("sv"),
                remark: "",
                createBy: "",
                createDate: new Date().toLocaleDateString("sv"),
                updateBy: "",
                updateDate: new Date().toLocaleDateString("sv"),
                status: "Draft",
                location: "",
                reqIssueMaterialDs: [],
                reqIssueMaterialLogs: _loglist,
              };

              dispatch(AddLotSelectReqIssue(obj));
              dispatch(UpdateRequestissueMTH(_reqmth));

              handleGetItemRequestH(_data);
            });

            // props.handlemclisthead(selectedRows);

            //navigate("/saleOrder", { state: { rowid: row.id } });
          }}
        >
          <AddchartIcon fontSize="inherit" />
        </IconButton>
      ),
    },
    {
      field: "buy",
      headerName: "Buy",
      headerAlign: "center",
      width: 80,
    },
    {
      field: "soNumber",
      headerName: "SO Number",
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
      field: "itemNo",
      headerName: "ItemNo",
      headerAlign: "center",
      align: "center",
      width: 80,
    },
    {
      field: "itemName",
      headerName: "ItemName",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "width",
      headerName: "Width",
      headerAlign: "center",
      align: "center",
      width: 80,
    },
    {
      field: "shipToCode",
      headerName: "Ship To Code",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "shipToName",
      headerName: "Ship To Desc",
      headerAlign: "center",
      align: "center",
      width: 150,
    },

    {
      field: "purOrder",
      headerName: "PU Order",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "saleDocDate",
      headerName: "SO Date",
      headerAlign: "center",
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
      field: "total",
      headerName: "Total",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s035",
      headerName: "035",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s040",
      headerName: "040",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s050",
      headerName: "050",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s055",
      headerName: "055",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s060",
      headerName: "060",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s065",
      headerName: "065",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s070",
      headerName: "070",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s075",
      headerName: "075",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s080",
      headerName: "080",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s085",
      headerName: "085",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s090",
      headerName: "090",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s095",
      headerName: "095",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s100",
      headerName: "100",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s105",
      headerName: "105",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s110",
      headerName: "110",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s115",
      headerName: "115",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s120",
      headerName: "120",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s130",
      headerName: "130",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s140",
      headerName: "140",
      headerAlign: "center",
      align: "center",
      width: 50,
    },

    {
      field: "s150",
      headerName: "150",
      headerAlign: "center",
      align: "center",
      width: 50,
    },

    {
      field: "s160",
      headerName: "160",
      headerAlign: "center",
      align: "center",
      width: 50,
    },

    {
      field: "s170",
      headerName: "170",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    // {
    //   field: "createBy",
    //   headerName: "CreateBy",
    //   headerAlign: "center",
    //   width: 100,
    // },
    // {
    //   field: "createDate",
    //   headerName: "Create Date",
    //   headerAlign: "center",
    //   width: 150,
    //   renderCell: ({ value }: GridRenderCellParams<Date>) => (
    //     <Typography variant="body1">
    //       <Moment format="DD/MM/YYYY HH:mm">{value}</Moment>
    //     </Typography>
    //   ),
    // },
    // {
    //   field: "updateBy",
    //   headerName: "UpdateBy",
    //   headerAlign: "center",
    //   width: 100,
    // },
    // {
    //   field: "updateDate",
    //   headerName: "Update Date",
    //   headerAlign: "center",
    //   width: 150,
    //   renderCell: ({ value }: GridRenderCellParams<any>) =>
    //     value !== null ? (
    //       <Typography variant="body1">
    //         <Moment format="DD/MM/YYYY HH:mm">{value}</Moment>
    //       </Typography>
    //     ) : (
    //       ""
    //     ),
    // },
    {
      headerName: "Gemerate MC",
      width: 110,
      field: "generateMc",
      align: "center",
      renderCell: ({ value }: GridRenderCellParams<any>) => (
        <Typography variant="body1">
          {value ? (value === 1 ? "Yes" : "No") : "No"}
        </Typography>
      ),
    },
    {
      headerName: "Status PD",
      width: 110,
      field: "generatePd",

      renderCell: ({ value }: GridRenderCellParams<String>) => (
        <Typography variant="body1">
          {value
            ? value === 0
              ? "NO"
              : value === 1
              ? "Gen PD"
              : value === 2
              ? "Queue CV"
              : value === 3
              ? "CV SAP"
              : value === 4
              ? "Queue Released"
              : value === 5
              ? "Released"
              : value === 6
              ? "Queue Close"
              : value === 7
              ? "Close"
              : value === 8
              ? "Queue Cancel"
              : "Err."
            : "No"}
        </Typography>
      ),
    },
    {
      headerName: "IssueMat",
      width: 100,
      field: "statusIssueMat",
      align: "center",
      renderCell: ({ value }: GridRenderCellParams<String>) => (
        <Typography variant="body1">
          {value ? (value === "1" ? "Yes" : "No") : "No"}
        </Typography>
      ),
    },
    {
      headerName: "ReceiveMat",
      width: 100,
      field: "statusReceiveMat",
      align: "center",
      renderCell: ({ value }: GridRenderCellParams<String>) => (
        <Typography variant="body1">
          {value ? (value === "1" ? "Yes" : "No") : "No"}
        </Typography>
      ),
    },
    {
      headerName: "Released PD",
      width: 100,
      field: "statusProduction",
      align: "center",
      renderCell: ({ value }: GridRenderCellParams<String>) => (
        <Typography variant="body1">
          {value ? (value === "Released" ? "Yes" : "No") : "No"}
        </Typography>
      ),
    },
    // {
    //   headerName: "ReceiveFG",
    //   width: 100,
    //   field: "statusReceiveFg",
    //   renderCell: ({ value }: GridRenderCellParams<String>) => (
    //     <Typography variant="body1">
    //       {value ? (value === "1" ? "Yes" : "No") : "No"}
    //     </Typography>
    //   ),
    // },
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
          requestissueMTReducer.allocateLotListSearch.length > 0
            ? requestissueMTReducer.allocateLotListSearch
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

export default LotListReqMT;
