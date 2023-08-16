import React from "react";
import { useSelector } from "react-redux";
import {
  SearchMC,
  generateMCandPDSelector,
} from "../../../store/slices/generateMCandPDSlice";
import { useAppDispatch } from "../../../store/store";
import { useDebounce } from "@react-hook/debounce";
import QuickSearchToolbar from "../../QuickSearchToolbar";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import Moment from "react-moment";

type Props = {
  type: string;
};

const BarcodeList = (props: Props) => {
  const generateMCandPDReducer = useSelector(generateMCandPDSelector);
  const dispatch = useAppDispatch();

  const [keywordSearch, setKeywordSearch] = useDebounce<string>("", 1000);
  const [keywordSearchNoDelay, setKeywordSearchNoDelay] =
    React.useState<string>("");
  React.useEffect(() => {
    // dispatch(stockActions.loadStockByKeyword(keywordSearch));

    dispatch(SearchMC(keywordSearch));
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
      field: "buy",
      headerName: "Buy",
      headerAlign: "center",
      width: 80,
    },
    {
      field: "typeCode",
      headerName: "Type",
      headerAlign: "center",
      width: 120,
    },
    {
      field: "barcodeId",
      headerName: "Barcode",
      headerAlign: "center",
      width: 130,
    },
    {
      field: "barcodeQty",
      headerName: "Qty",
      headerAlign: "center",
      align: "center",
      width: 80,
    },
    {
      field: "basketSeq",
      headerName: "Basket",
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
      field: "sizeNo",
      headerName: "sizeNo",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "ponumber",
      headerName: "PurOrder",
      headerAlign: "center",
      align: "center",
      width: 150,
    },

    {
      field: "shipToCode",
      headerName: "shipTo",
      headerAlign: "center",
      align: "center",
      width: 100,
    },

    {
      field: "shipToDesc",
      headerName: "shipTo Name",
      headerAlign: "center",
      align: "center",
      width: 100,
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
          generateMCandPDReducer.mclistSearch.length > 0
            ? generateMCandPDReducer.mclistSearch
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

export default BarcodeList;
