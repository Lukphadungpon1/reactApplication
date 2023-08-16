import React from "react";
import { useSelector } from "react-redux";
import {
  SearchLot,
  allocateLotSelector,
} from "../../../store/slices/allocateLotSlice";
import {
  AddLottoListGenMC,
  FindMCSync,
  generateMCandPDSelector,
} from "../../../store/slices/generateMCandPDSlice";
import { useAppDispatch } from "../../../store/store";
import { useDebounce } from "@react-hook/debounce";
import { Box, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import QuickSearchToolbar from "../../QuickSearchToolbar";
import Moment from "react-moment";
import {
  AllocateLotRequest,
  AllocateLotResponse,
} from "../../../types/allocatelot.type";
import QrCodeIcon from "@mui/icons-material/QrCode";
import ViewListIcon from "@mui/icons-material/ViewList";
import { mclisthead } from "../../../types/generateMCPD.type";
import {
  AddProductionOrderRequest,
  FindPDSync,
} from "../../../store/slices/productionOrderSlice";
import { useNavigate } from "react-router-dom";

type Props = {
  getLotList: any;
  handleopenDialog: any;
  handlemclisthead: any;
};

const LotListGenMC = (props: Props) => {
  const allocateLotReducer = useSelector(allocateLotSelector);
  const generateMCandPDReducer = useSelector(generateMCandPDSelector);
  const dispatch = useAppDispatch();

  const [keywordSearch, setKeywordSearch] = useDebounce<string>("", 1000);
  const [keywordSearchNoDelay, setKeywordSearchNoDelay] =
    React.useState<string>("");

  const [selectedLots, setSelectedLots] = React.useState<AllocateLotRequest[]>(
    []
  );

  const navigate = useNavigate();

  React.useEffect(() => {
    // dispatch(stockActions.loadStockByKeyword(keywordSearch));
    dispatch(SearchLot(keywordSearch));
  }, [keywordSearch]);

  const handlegetdataMC = async (value: AllocateLotRequest) => {
    var resultaction = await dispatch(FindMCSync(value));

    if (FindMCSync.fulfilled.match(resultaction)) {
      props.handleopenDialog();
    }
  };

  const handlegetdataPD = async (value: AllocateLotRequest) => {
    navigate("/pdList", { state: { type: "genMC", datarequest: value } });

    // dispatch(AddProductionOrderRequest(value));

    // var resultaction = await dispatch(FindPDSync(value));

    // if (FindPDSync.fulfilled.match(resultaction)) {

    // }
  };

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
    {
      field: "createBy",
      headerName: "CreateBy",
      headerAlign: "center",
      width: 100,
    },
    {
      field: "createDate",
      headerName: "Create Date",
      headerAlign: "center",
      width: 150,
      renderCell: ({ value }: GridRenderCellParams<Date>) => (
        <Typography variant="body1">
          <Moment format="DD/MM/YYYY HH:mm">{value}</Moment>
        </Typography>
      ),
    },
    {
      field: "updateBy",
      headerName: "UpdateBy",
      headerAlign: "center",
      width: 100,
    },
    {
      field: "updateDate",
      headerName: "Update Date",
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
      headerName: "Gemerate MC",
      width: 110,
      field: "generateMc",

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
      renderCell: ({ value }: GridRenderCellParams<String>) => (
        <Typography variant="body1">
          {value ? (value === "Released" ? "Yes" : "No") : "No"}
        </Typography>
      ),
    },
    {
      headerName: "ReceiveFG",
      width: 100,
      field: "statusReceiveFg",
      renderCell: ({ value }: GridRenderCellParams<String>) => (
        <Typography variant="body1">
          {value ? (value === "1" ? "Yes" : "No") : "No"}
        </Typography>
      ),
    },

    {
      headerName: "MC",
      headerAlign: "center",
      field: ".mc",
      width: 80,
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
              allocateLotReducer.allocateLotListSearch.filter(
                (row) => row.id === ids
              );

            selectedRows.map((obj) => {
              //console.log(obj.allocateMcs);

              const mchead: mclisthead = {
                lot: obj.lot,
                style: obj.itemNo + " : " + obj.itemName + " " + obj.width,
                total: obj.total,
              };
              props.handlemclisthead(mchead);

              const _data: AllocateLotRequest = {
                soNumber: "",
                buy: "",
                purOrder: "",
                lot: obj.lot,
              };
              handlegetdataMC(_data);
            });

            //navigate("/saleOrder", { state: { rowid: row.id } });
          }}
        >
          <QrCodeIcon fontSize="inherit" />
        </IconButton>
      ),
    },
    {
      headerName: "PD",
      headerAlign: "center",
      field: ".pd",
      width: 80,
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
              allocateLotReducer.allocateLotListSearch.filter(
                (row) => row.id === ids
              );

            selectedRows.map((obj) => {
              const _data: AllocateLotRequest = {
                soNumber: "",
                buy: "",
                purOrder: "",
                lot: obj.lot,
              };
              handlegetdataPD(_data);
            });
          }}
        >
          <ViewListIcon fontSize="inherit" />
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

          const selectedRows = allocateLotReducer.allocateLotListSearch.filter(
            (row) => selectedIDs.has(row.id)
          );

          //console.log(selectedRows);

          const newdata = selectedRows.map((obj) => {
            const _data: AllocateLotRequest = {
              soNumber: "",
              buy: "",
              purOrder: "",
              lot: obj.lot,
            };
            return _data;
          });

          dispatch(AddLottoListGenMC(newdata));

          //console.log(newdata);
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
          allocateLotReducer.allocateLotListSearch.length > 0
            ? allocateLotReducer.allocateLotListSearch
            : rows
        }
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 25,
            },
          },
          columns: {
            columnVisibilityModel: { id: false },
          },
        }}
        pageSizeOptions={[25, 50, 70]}
        // onRowDoubleClick={}
      ></DataGrid>
    </Box>
  );
};

export default LotListGenMC;
