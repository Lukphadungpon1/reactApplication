import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import { IssueMaterialD } from "../../../types/picking.type.tx";
import { useSelector } from "react-redux";
import {
  SearchIssueListD,
  issueMTSelector,
} from "../../../store/slices/issueMTSlice";
import { authSelector } from "../../../store/slices/authSlice";
import { useAppDispatch } from "../../../store/store";
import { useDebounce } from "@react-hook/debounce";
import QuickSearchToolbar from "../../QuickSearchToolbar";
import ViewListIcon from "@mui/icons-material/ViewList";

type Props = {
  handlegetdataDetail: any;
};

const IssueMTListD = (props: Props) => {
  const issueMTReducer = useSelector(issueMTSelector);

  const dispatch = useAppDispatch();

  const [keywordSearch, setKeywordSearch] = useDebounce<string>("", 1000);
  const [keywordSearchNoDelay, setKeywordSearchNoDelay] =
    React.useState<string>("");

  React.useEffect(() => {
    // dispatch(stockActions.loadStockByKeyword(keywordSearch));
    dispatch(SearchIssueListD(keywordSearch));
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
      align: "center",
      width: 100,
    },

    {
      field: "itemCode",
      headerName: "ItemCode",
      headerAlign: "center",
      align: "left",
      width: 180,
    },
    {
      field: "itemName",
      headerName: "ItemName",
      headerAlign: "center",
      align: "left",

      width: 400,
    },
    {
      field: "uomName",
      headerName: "UOM",
      headerAlign: "center",
      align: "center",
      width: 80,
    },
    {
      field: "color",
      headerName: "Color",
      headerAlign: "center",
      align: "left",
      width: 200,
    },
    {
      field: "warehouse",
      headerName: "Warehouse",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "onhand",
      headerName: "Onhand",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "onhandWH",
      headerName: "OnhandWH",
      headerAlign: "center",
      align: "center",
      width: 150,
    },

    {
      field: "plandQty",
      headerName: "PlandQty",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "pickQty",
      headerName: "PickQty",
      headerAlign: "center",
      align: "center",
      width: 150,
      editable: true,
    },
    {
      field: "issueQty",
      headerName: "IssueQty",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
  ];

  return (
    <Box
      sx={{
        height: "90vh",
        width: "100%",
        overflowX: "scroll",
      }}
    >
      <DataGrid
        rowHeight={30}
        // isRowSelectable={(param: GridRowParams) => param.row.chkreqIss === true}

        // processRowUpdate={handleProcessRowUpdate}
        // onProcessRowUpdateError={handleProcessRowUpdateError}
        // onCellEditStop={(params: GridCellEditStopParams, event: MuiEvent) => {
        //   // console.log(params.value);
        //   // console.log(params.row);

        //   if (params.reason === GridCellEditStopReasons.cellFocusOut) {
        //     event.defaultMuiPrevented = true;

        //   }
        // }}
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
        keepNonExistentRowsSelected
        rows={
          issueMTReducer.issueMTListDSearch.length > 0
            ? issueMTReducer.issueMTListDSearch
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

export default IssueMTListD;
