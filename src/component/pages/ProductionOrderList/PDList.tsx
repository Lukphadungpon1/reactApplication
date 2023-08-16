import React from "react";
import { useAppDispatch } from "../../../store/store";
import {
  SearchPD,
  SelectedPD,
  productionOrderSelector,
} from "../../../store/slices/productionOrderSlice";
import { useSelector } from "react-redux";
import { useDebounce } from "@react-hook/debounce";
import { Box, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import QuickSearchToolbar from "../../QuickSearchToolbar";
import Moment from "react-moment";
import { AllocateLotRequest } from "../../../types/allocatelot.type";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  handleOpenDialog: any;
};

const PDList = (props: Props) => {
  const productionOrderReducer = useSelector(productionOrderSelector);

  const dispatch = useAppDispatch();

  const [keywordSearch, setKeywordSearch] = useDebounce<string>("", 1000);
  const [keywordSearchNoDelay, setKeywordSearchNoDelay] =
    React.useState<string>("");

  React.useEffect(() => {
    // dispatch(stockActions.loadStockByKeyword(keywordSearch));
    dispatch(SearchPD(keywordSearch));
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
      field: "allocateLotSizeName",
      headerName: "Size",
      headerAlign: "center",
      width: 120,
    },
    {
      field: "itemCode",
      headerName: "Code",
      headerAlign: "center",
      width: 150,
    },
    {
      field: "planQty",
      headerName: "Qty",
      headerAlign: "center",
      width: 100,
    },
    {
      field: "uomCode",
      headerName: "UOM",
      headerAlign: "center",
      align: "center",
      width: 80,
    },
    {
      field: "project",
      headerName: "Type",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      width: 100,
      renderCell: ({ value }: GridRenderCellParams<any>) => (
        <Typography variant="body1">
          {value
            ? value === "1"
              ? "Active"
              : value === "P"
              ? "Planned"
              : value === "R"
              ? "Released"
              : value === "L"
              ? "Close"
              : value === "C"
              ? "Cancel"
              : "Err."
            : "Cancel"}
        </Typography>
      ),
    },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   headerAlign: "center",
    //   align: "center",
    //   width: 80,
    // },
    {
      field: "convertSap",
      headerName: "CV To SAP",
      headerAlign: "center",
      align: "center",
      width: 100,
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
      headerName: "Action",
      headerAlign: "center",
      field: ".mc",
      width: 80,
      renderCell: ({ row }: GridRenderCellParams<any>) => (
        <IconButton
          aria-label="Detail"
          color="primary"
          size="large"
          onClick={async (e: React.ChangeEvent<any>) => {
            e.preventDefault();

            console.log(row.id);
            var ids = row.id;

            const selectedRows = productionOrderReducer.pdlistSearch.filter(
              (row) => row.id === ids
            );

            selectedRows.map((obj) => {
              dispatch(SelectedPD(obj));
            });

            props.handleOpenDialog();

            // selectedRows.map((obj) => {

            //   console.log(obj.productionOrderDs);
            //     //dispatch(SelectedPD(obj));
            //   //   const mchead: mclisthead = {
            //   //     lot: obj.lot,
            //   //     style: obj.itemNo + " : " + obj.itemName + " " + obj.width,
            //   //     total: obj.total,
            //   //   };
            //   //   props.handlemclisthead(mchead);

            //   selectedRows.map((obj) => {
            //     const _data: AllocateLotRequest = {
            //       soNumber: "",
            //       buy: "",
            //       purOrder: "",
            //       lot: obj.lot,
            //     };
            //     // handlegetdataMC(_data);
            //   });
            // });

            //navigate("/saleOrder", { state: { rowid: row.id } });
          }}
        >
          <SearchIcon fontSize="inherit" />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ height: "100%", width: "100%", overflowX: "scroll" }}>
      <DataGrid
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
          productionOrderReducer.pdlistSearch.length > 0
            ? productionOrderReducer.pdlistSearch
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
      ></DataGrid>
    </Box>
  );
};

export default PDList;
