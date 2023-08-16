import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import QuickSearchToolbar from "../../QuickSearchToolbar";
import { useDebounce } from "@react-hook/debounce";
import Moment from "react-moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BuildIcon from "@mui/icons-material/Build";

import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";
import {
  AddChLotNumber,
  ClearChLotNumber,
  SearchLot,
  allocateLotSelector,
} from "../../../store/slices/allocateLotSlice";
import { useAppDispatch } from "../../../store/store";
import {
  AllocateLotResponse,
  ChangeLotnumber,
} from "../../../types/allocatelot.type";
import { opensnackbar } from "../../../store/slices/snackbarSlice";
import { useNavigate } from "react-router-dom";
import {
  AllocateLotEditDeldb,
  GetdataallocateLotEdit,
  allocateLotEditSelector,
} from "../../../store/slices/allocateLotEditSlice";
import ChangLotNumber from "./ChangLotNumber";

type Props = {
  getLotList: any;
};

const LotList = (props: Props) => {
  const allocateLotReducer = useSelector(allocateLotSelector);
  const allocatelotEditReducer = useSelector(allocateLotEditSelector);
  const dispatch = useAppDispatch();

  const [keywordSearch, setKeywordSearch] = useDebounce<string>("", 1000);
  const [keywordSearchNoDelay, setKeywordSearchNoDelay] =
    React.useState<string>("");

  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [selectLot, setselectLot] = React.useState<AllocateLotResponse | null>(
    null
  );

  const [openDialogCHLot, setopenDialogCHLot] = React.useState<boolean>(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    // dispatch(stockActions.loadStockByKeyword(keywordSearch));
    dispatch(SearchLot(keywordSearch));
  }, [keywordSearch]);

  const showDialog = () => {
    if (selectLot === null) {
      return "";
    }

    return (
      <Dialog
        open={openDialog}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Confirm to delete the Lot Number? : {selectLot.lot}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You cannot restore deleted Lot Number.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="info">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const showDialogCHLot = () => {
    if (selectLot === null) {
      return "";
    }

    return (
      <Dialog
        fullWidth
        maxWidth="sm"
        open={openDialogCHLot}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <Typography>Change Lot Number</Typography>
        </DialogTitle>
        <DialogContent>
          {/* <Typography>{JSON.stringify(props.values)}</Typography> */}
          <ChangLotNumber
            handleClearChangeLotNumber={handleClearChangeLotNumber}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClearChangeLotNumber()} color="info">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const handelupdateQtyLot = async (value: AllocateLotResponse) => {
    // let aaa = allocateLotReducer.allocateLotList.find((x) => x.id === value.id);

    // console.log(aaa);
    dispatch(GetdataallocateLotEdit(value));
    navigate("/allocateLotUpdate");
  };

  const handleDeleteConfirm = async () => {
    // dispatch(stockActions.deleteProduct(String(selectedProduct!.id!)));
    if (selectLot === null) {
      return "";
    }

    // if (selectLot.generateMc !== 0) {
    //   dispatch(
    //     opensnackbar({
    //       isOpen: true,
    //       message:
    //         "Can't delete Lot : " + selectLot.lot + " , Please check Status..",
    //       types: "warning",
    //     })
    //   );
    //   return "";
    // }
    const deletelot = await dispatch(AllocateLotEditDeldb(selectLot!.id!));

    if (AllocateLotEditDeldb.fulfilled.match(deletelot)) {
      props.getLotList(allocateLotReducer.allocateLotLisrequest!);

      setOpenDialog(false);
    } else {
      dispatch(
        opensnackbar({
          isOpen: true,
          message:
            "Can't delete Lot : " +
            selectLot.lot +
            " , error : " +
            allocatelotEditReducer.message,
          types: "danger",
        })
      );
      return "";
    }
  };

  const handleChangeLotNumber = async (value: AllocateLotResponse) => {
    setselectLot(value);
    setopenDialogCHLot(true);

    dispatch(AddChLotNumber({ id: 0, LotFrom: value.lot, LotTo: "" }));
  };

  const handleClearChangeLotNumber = () => {
    setopenDialogCHLot(false);
    dispatch(ClearChLotNumber());
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
      width: 100,
      field: "generateMc",
      renderCell: ({ value }: GridRenderCellParams<any>) => (
        <Typography variant="body1">
          {value ? (value === "1" ? "Yes" : "No") : "No"}
        </Typography>
      ),
    },
    {
      headerName: "Status PD",
      width: 100,
      field: "generatePd",
      renderCell: ({ value }: GridRenderCellParams<String>) => (
        <Typography variant="body1">
          {value
            ? value === 0
              ? "NO"
              : value === 1
              ? "Gen PD"
              : value === 2
              ? "CV SAP"
              : value === 3
              ? "Released"
              : value === 4
              ? "Close"
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
      headerName: "CH LOT",
      headerAlign: "center",
      field: "..",
      width: 70,
      renderCell: ({ row }: GridRenderCellParams<any>) => (
        <IconButton
          aria-label="edit"
          color="warning"
          size="large"
          onClick={async (e: React.ChangeEvent<any>) => {
            e.preventDefault();

            // console.log(row.id);
            row.id && handleChangeLotNumber(row);

            //navigate("/saleOrder", { state: { rowid: row.id } });
          }}
        >
          <BuildIcon fontSize="inherit" />
        </IconButton>
      ),
    },
    {
      headerName: "ACTION",
      headerAlign: "center",
      field: ".",
      width: 120,
      renderCell: ({ row }: GridRenderCellParams<any>) => (
        <Stack direction="row">
          <IconButton
            aria-label="edit"
            color="primary"
            size="large"
            onClick={async (e: React.ChangeEvent<any>) => {
              e.preventDefault();

              // console.log(row.id);
              row.id && handelupdateQtyLot(row);

              //navigate("/saleOrder", { state: { rowid: row.id } });
            }}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="secondary"
            size="large"
            onClick={(e: React.ChangeEvent<any>) => {
              e.preventDefault();

              setselectLot(row);

              setOpenDialog(true);
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Stack>
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
        onRowClick={(params) => {
          //console.log(params.id);
          //   const selectedRows = saleOrderReducer.saleOrderCustomer.filter(
          //     (row) => params.id === row.id
          //   );
        }}
      ></DataGrid>
      {showDialog()}
      {showDialogCHLot()}
    </Box>
  );
};

export default LotList;
