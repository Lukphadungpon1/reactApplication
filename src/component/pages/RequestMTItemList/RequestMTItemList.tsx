import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import { useSelector } from "react-redux";
import {
  SearchItemIssue,
  issueMTSelector,
} from "../../../store/slices/issueMTSlice";
import { useAppDispatch } from "../../../store/store";
import { useDebounce } from "@react-hook/debounce";
import QuickSearchToolbar from "../../QuickSearchToolbar";

type RequestMTItemListProps = {
  //
};

const RequestMTItemList: React.FC<any> = () => {
  const issueMTReducer = useSelector(issueMTSelector);

  const dispatch = useAppDispatch();

  const [keywordSearch, setKeywordSearch] = useDebounce<string>("", 1000);
  const [keywordSearchNoDelay, setKeywordSearchNoDelay] =
    React.useState<string>("");

  React.useEffect(() => {
    // dispatch(stockActions.loadStockByKeyword(keywordSearch));
    dispatch(SearchItemIssue(keywordSearch));
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
      width: 180,
    },
    {
      field: "itemName",
      headerName: "Item Name",
      headerAlign: "center",
      width: 400,
    },
    {
      field: "color",
      headerName: "Color",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "plandQty",
      headerName: "Qty",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "uomName",
      headerName: "UOM",
      headerAlign: "center",
      align: "center",
      width: 80,
    },
    {
      field: "department",
      headerName: "Location",
      headerAlign: "center",  
      align: "center",
      width: 150,
    },
    {
      field: "onhand",
      headerName: "Onhand",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "whsCode",
      headerName: "WH Code",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "onhandDFwh",
      headerName: "Onhand WH_Code",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
  ];

  return (
    <Box sx={{ height: "100%", width: "100%", overflowX: "scroll" }}>
      <DataGrid
        rowHeight={30}
        checkboxSelection
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
          issueMTReducer.ItemReqIssueHSearch.length > 0
            ? issueMTReducer.ItemReqIssueHSearch
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

export default RequestMTItemList;
