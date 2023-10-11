import React from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../../store/slices/authSlice";
import { useAppDispatch } from "../../../store/store";
import {
  AddIssueListSelected,
  SearchissueMTList,
  issueMTListSelector,
} from "../../../store/slices/issueMTListSlice";
import { useDebounce } from "@react-hook/debounce";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
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
import Moment from "react-moment";
import QuickSearchToolbar from "../../QuickSearchToolbar";

import ListIcon from "@mui/icons-material/List";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

type Props = {
  handleopenDialog: any;
};

const IssueMTDetail = (props: Props) => {
  const issueMTListReducer = useSelector(issueMTListSelector);
  const authReducer = useSelector(authSelector);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [keywordSearch, setKeywordSearch] = useDebounce<string>("", 1000);
  const [keywordSearchNoDelay, setKeywordSearchNoDelay] =
    React.useState<string>("");

  const [openDialogDel, setopenDialogDel] = React.useState(false);

  React.useEffect(() => {
    // dispatch(stockActions.loadStockByKeyword(keywordSearch));
    dispatch(SearchissueMTList(keywordSearch));
  }, [keywordSearch]);

  const handleDeleteConfirm = () => {};

  const showDialogDel = () => {
    if (issueMTListReducer.issueMTSelected === null) {
      return "";
    }

    return (
      <Dialog
        open={openDialogDel}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Confirm to delete the Sale Order? :{" "}
          {issueMTListReducer.issueMTSelected?.issueNumber}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You cannot restore deleted Sale.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setopenDialogDel(false)} color="info">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
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
    // {
    //   headerName: "Request",
    //   headerAlign: "center",
    //   field: ".mc",
    //   width: 100,
    //   align: "center",
    //   renderCell: ({ row }: GridRenderCellParams<any>) => (
    //     <IconButton
    //       aria-label="Maincard"
    //       color="primary"
    //       size="small"
    //       onClick={async (e: React.ChangeEvent<any>) => {
    //         e.preventDefault();

    //         //console.log(row.id);
    //         var ids = row.id;

    //         // const selectedRows = issueMTReducer.allocateLotListSearch.filter(
    //         //   (row) => row.id === ids
    //         // );
    //         // selectedRows.map((obj) => {
    //         //   //console.log(obj.allocateMcs);

    //         //   const _data: AllocateLotRequest = {
    //         //     soNumber: "",
    //         //     buy: "",
    //         //     purOrder: "",
    //         //     lot: obj.lot,
    //         //   };

    //         //   const _loglist: ReqIssueMaterialLog[] = [
    //         //     {
    //         //       id: 0,
    //         //       reqHid: 0,
    //         //       users: authReducer.account.iss,
    //         //       logDate: new Date().toLocaleDateString("sv"),
    //         //       status: "Request",
    //         //       levels: 0,
    //         //       comment: "",
    //         //       action: "Create",
    //         //       clientName: "",
    //         //     },
    //         //   ];

    //         //   const _reqmth: ReqIssueMTResponse = {
    //         //     id: 0,
    //         //     reqNumber: "0",
    //         //     lot: obj.lot,
    //         //     requestBy: authReducer.account.iss,
    //         //     requestDate: new Date().toLocaleDateString("sv"),
    //         //     reqDept: authReducer.account.EmpDepartment,
    //         //     site: authReducer.account.Site,
    //         //     requireDate: new Date().toLocaleDateString("sv"),
    //         //     remark: "",
    //         //     createBy: "",
    //         //     createDate: new Date().toLocaleDateString("sv"),
    //         //     updateBy: "",
    //         //     updateDate: new Date().toLocaleDateString("sv"),
    //         //     status: "Draft",
    //         //     location: "",
    //         //     reqIssueMaterialDs: [],
    //         //     reqIssueMaterialLogs: _loglist,
    //         //   };

    //         //   dispatch(AddLotSelectReqIssue(obj));
    //         //   dispatch(UpdateRequestissueMTH(_reqmth));

    //         //   handleGetItemRequestH(_data);
    //         });

    //         // props.handlemclisthead(selectedRows);

    //         //navigate("/saleOrder", { state: { rowid: row.id } });
    //       }}
    //     >
    //       <AddchartIcon fontSize="inherit" />
    //     </IconButton>
    //   ),
    // },
    {
      field: "issueNumber",
      headerName: "IssueNumber",
      headerAlign: "center",
      width: 120,
    },
    {
      field: "location",
      headerName: "Location",
      headerAlign: "center",
      width: 120,
      align: "center",
    },
    {
      field: "lotlist",
      headerName: "Lot",
      headerAlign: "center",
      width: 340,
    },
    {
      field: "pickingBy",
      headerName: "PickingBy",
      headerAlign: "center",
      align: "center",
      width: 120,
    },
    {
      field: "pickingDate",
      headerName: "PickingDate",
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
      field: "printDate",
      headerName: "PrintDate",
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
      field: "issueBy",
      headerName: "IssueBy",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "issueDate",
      headerName: "IssueDate",
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
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      width: 80,
    },
    {
      headerName: "CV Sap",
      width: 80,
      field: "convertSap",
      align: "center",
      renderCell: ({ value }: GridRenderCellParams<any>) => (
        <Typography variant="body1">
          {value ? (value === 1 ? "Yes" : "No") : "No"}
        </Typography>
      ),
    },
    {
      field: "docNum",
      headerName: "DocNum",
      headerAlign: "center",
      align: "center",
      width: 150,
    },

    {
      field: "remark",
      headerName: "Remark",
      headerAlign: "center",
      align: "left",
      width: 250,
    },
    {
      headerName: "Detail",
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

            const selectedRows = issueMTListReducer.issueMTListSearch.filter(
              (row) => row.id === ids
            );

            selectedRows.map((obj) => {
              props.handleopenDialog("Detail");
              dispatch(AddIssueListSelected(obj));
            });
          }}
        >
          <ListIcon fontSize="inherit" />
        </IconButton>
      ),
    },
    {
      headerName: "Manual",
      headerAlign: "center",
      field: ".manual",
      width: 100,
      align: "center",
      renderCell: ({ row }: GridRenderCellParams<any>) => (
        <IconButton
          aria-label="Maincard"
          color="primary"
          size="small"
          onClick={async (e: React.ChangeEvent<any>) => {
            e.preventDefault();
            var ids = row.id;
            const selectedRows = issueMTListReducer.issueMTListSearch.filter(
              (row) => row.id === ids
            );

            selectedRows.map((obj) => {
              props.handleopenDialog("Manual");
              dispatch(AddIssueListSelected(obj));
            });
          }}
        >
          <PlaylistAddIcon fontSize="inherit" />
        </IconButton>
      ),
    },
    {
      headerName: "Log",
      headerAlign: "center",
      field: ".log",
      width: 100,
      align: "center",
      renderCell: ({ row }: GridRenderCellParams<any>) => (
        <IconButton
          aria-label="Maincard"
          color="primary"
          size="small"
          onClick={async (e: React.ChangeEvent<any>) => {
            e.preventDefault();
            var ids = row.id;
            const selectedRows = issueMTListReducer.issueMTListSearch.filter(
              (row) => row.id === ids
            );

            selectedRows.map((obj) => {
              props.handleopenDialog("Log");
              dispatch(AddIssueListSelected(obj));
            });
          }}
        >
          <RemoveRedEyeIcon fontSize="inherit" />
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

              console.log(row.id);
              navigate("/issueMT", { state: { rowid: row.id } });
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
              var ids = row.id;
              const selectedRows = issueMTListReducer.issueMTListSearch.filter(
                (row) => row.id === ids
              );

              selectedRows.map((obj) => {
                dispatch(AddIssueListSelected(obj));
              });

              setopenDialogDel(true);
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ height: "90vh", width: "auto", overflowX: "scroll" }}>
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
          issueMTListReducer.issueMTListSearch.length > 0
            ? issueMTListReducer.issueMTListSearch
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

      {showDialogDel()}
    </Box>
  );
};

export default IssueMTDetail;
