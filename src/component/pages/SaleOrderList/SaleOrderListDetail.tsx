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
import { useSelector } from "react-redux";
import {
  SaleOrderMasterData,
  SaleOrderMasterDataBuyMonth,
  SaleOrderMasterDataBuyYear,
  SaleOrderMasterDataSaleType,
  SaleOrderSearch,
  SaleOrderSearchSaleOrder,
  saleOrderSelector,
} from "../../../store/slices/saleOrderSlice";
import {
  SOEditCVSAP,
  SOEditDelDB,
  SOEditGeyByID,
  saleOrderEditSelector,
} from "../../../store/slices/saleOrderEditSlice";
import { useDebounce } from "@react-hook/debounce";
import Moment from "react-moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { SOResultByID, saleOrderRequest } from "../../../types/saleOrder.type";
import { sortAndDeduplicateDiagnostics } from "typescript";
import { opensnackbar } from "../../../store/slices/snackbarSlice";
import FileUploadIcon from "@mui/icons-material/FileUpload";

type Props = {
  getSOList: any;
};

const SaleOrderListDetail = (props: Props) => {
  const saleOrderReducer = useSelector(saleOrderSelector);
  const saleOrderEditReducer = useSelector(saleOrderEditSelector);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [keywordSearch, setKeywordSearch] = useDebounce<string>("", 1000);
  const [keywordSearchNoDelay, setKeywordSearchNoDelay] =
    React.useState<string>("");

  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const [selectSo, setselectSo] = React.useState<SOResultByID | null>(null);

  const dataFetchedRef = React.useRef(false);

  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    return () => {};
  }, []);

  React.useEffect(() => {
    // dispatch(stockActions.loadStockByKeyword(keywordSearch));
    dispatch(SaleOrderSearchSaleOrder(keywordSearch));
  }, [keywordSearch]);

  const rows: any = [];

  const handleCVSAP = async (id: number) => {
    // console.log(id);

    const resultaction = await dispatch(SOEditCVSAP(id));

    if (SOEditCVSAP.fulfilled.match(resultaction)) {
      dispatch(
        opensnackbar({
          isOpen: true,
          message:
            "Convert SO to SAP : " +
            saleOrderEditReducer.saleorderRequest.SoNumber +
            " Complete..",
          types: "success",
        })
      );

      props.getSOList();
    }
  };

  const columns: GridColDef[] = [
    {
      headerName: "ID",
      headerAlign: "center",
      field: "id",
      width: 50,
      // hideable: false,
    },
    {
      field: "soNumber",
      headerName: "SO Number",
      headerAlign: "center",
      width: 120,
    },
    {
      field: "cardCode",
      headerName: "Cust Code",
      headerAlign: "center",
      width: 100,
    },
    {
      field: "cardName",
      headerName: "Cust Name",
      headerAlign: "center",
      width: 250,
    },
    {
      field: "currency",
      headerName: "Curr",
      headerAlign: "center",
      align: "center",
      width: 80,
    },
    {
      field: "buy",
      headerName: "Buy",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "saleTypes",
      headerName: "Type",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "docStatus",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "deliveryDate",
      headerName: "Delivery Date",
      headerAlign: "center",
      width: 150,
      renderCell: ({ value }: GridRenderCellParams<Date>) => (
        <Typography variant="body1">
          <Moment format="DD/MM/YYYY HH:mm">{value}</Moment>
        </Typography>
      ),
    },
    {
      field: "createBy",
      headerName: "createBy",
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
      field: "generateLot",
      headerName: "Gen Lot",
      headerAlign: "center",
      align: "center",
      width: 100,
      renderCell: ({ value }: GridRenderCellParams<any>) => (
        <Typography variant="body1">{value === 0 ? "No" : "Yes"}</Typography>
      ),
    },
    {
      field: "convertSap",
      headerName: "convertSap",
      headerAlign: "center",
      align: "center",
      width: 100,
      renderCell: ({ value }: GridRenderCellParams<any>) => (
        <Typography variant="body1">{value === 0 ? "No" : "Yes"}</Typography>
      ),
    },
    {
      field: "docNum",
      headerName: "docNum (SAP)",
      headerAlign: "center",
      width: 120,
    },
    {
      headerName: "CV SAP",
      headerAlign: "center",
      field: "..",
      width: 80,

      renderCell: ({ row }: GridRenderCellParams<any>) => (
        <IconButton
          aria-label="cloud_upload"
          color="secondary"
          size="large"
          disabled={saleOrderEditReducer.isFetching}
          onClick={async (e: React.ChangeEvent<any>) => {
            e.preventDefault();

            handleCVSAP(row.id);
            //console.log(row.id);
            // navigate("/saleOrder", { state: { rowid: row.id } });
          }}
        >
          <FileUploadIcon fontSize="inherit" />
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

              //console.log(row.id);
              navigate("/saleOrder", { state: { rowid: row.id } });
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

              setselectSo(row);

              setOpenDialog(true);
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const showDialog = () => {
    if (selectSo === null) {
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
          Confirm to delete the Sale Order? : {selectSo.soNumber}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You cannot restore deleted Sale.
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

  const handleDeleteConfirm = async () => {
    // dispatch(stockActions.deleteProduct(String(selectedProduct!.id!)));
    if (selectSo === null) {
      return "";
    }

    if (selectSo.docStatus !== "D") {
      dispatch(
        opensnackbar({
          isOpen: true,
          message:
            "Can't delete SO : " +
            selectSo.soNumber +
            " , Please check Status..",
          types: "warning",
        })
      );
      return "";
    }
    const deleteso = await dispatch(SOEditDelDB(selectSo!.id!));

    if (SOEditDelDB.fulfilled.match(deleteso)) {
      props.getSOList();
      setOpenDialog(false);
    }
  };

  return (
    <Box sx={{ height: "100%" }}>
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
          saleOrderReducer.saleOrderSearch.length > 0
            ? saleOrderReducer.saleOrderSearch
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
        onRowClick={(params) => {
          //console.log(params.id);
          const selectedRows = saleOrderReducer.saleOrderCustomer.filter(
            (row) => params.id === row.id
          );
        }}
      ></DataGrid>
      {showDialog()}
    </Box>
  );
};

export default SaleOrderListDetail;
