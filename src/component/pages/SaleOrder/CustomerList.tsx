import { Box, Button, Grid, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import React from "react";
import { useSelector } from "react-redux";
import {
  SaleOrderSearchCustomer,
  saleOrderSelector,
} from "../../../store/slices/saleOrderSlice";
import {
  SaleOrderGetCustomer,
  saleOrderRequest,
} from "../../../types/saleOrder.type";
import {
  SOEditUpdate,
  saleOrderEditSelector,
} from "../../../store/slices/saleOrderEditSlice";
import { useAppDispatch } from "../../../store/store";
import QuickSearchToolbar from "../../QuickSearchToolbar";
import { useDebounce } from "@react-hook/debounce";

const rows: any = [];

const columns: GridColDef[] = [
  {
    field: "cardCode",
    headerName: "Code",
    width: 100,
    editable: true,
  },
  {
    field: "cardName",
    headerName: "Name",
    width: 500,
    editable: true,
  },
  {
    field: "currencyName",
    headerName: "Currency",
    width: 100,
    editable: true,
  },
];
type CustomerListprops = {
  handlecloseDialog: () => any;
};

const CustomerList = (props: CustomerListprops) => {
  const saleOrderReducer = useSelector(saleOrderSelector);
  const saleOrderEditReducer = useSelector(saleOrderEditSelector);

  const [keywordSearch, setKeywordSearch] = useDebounce<string>("", 1000);
  const [keywordSearchNoDelay, setKeywordSearchNoDelay] =
    React.useState<string>("");

  const dispatch = useAppDispatch();

  const initialValues: SaleOrderGetCustomer = {
    id: 0,
    cardCode: "",
    cardName: "",
    currencyName: "",
    currency: "",
  };

  const [selectRows, setselectRows] =
    React.useState<SaleOrderGetCustomer>(initialValues);

  React.useEffect(() => {
    // dispatch(stockActions.loadStockByKeyword(keywordSearch));
    dispatch(SaleOrderSearchCustomer(keywordSearch));
  }, [keywordSearch]);

  React.useEffect(() => {
    // setselectRows({
    //   ...initialValues,
    //   cardCode: saleOrderEditReducer.saleorderRequest.CardCode,
    //   cardName: saleOrderEditReducer.saleorderRequest.CardName,
    //   currencyName: saleOrderEditReducer.saleorderRequest.Currency,
    // });
  }, []);

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Typography variant="h5">
            {selectRows.cardCode !== "" &&
              selectRows.cardCode +
                " : " +
                selectRows.cardName +
                " ( " +
                selectRows.currencyName +
                " ) "}
          </Typography>
        </Grid>
        <Grid item xs>
          <Button
            variant="contained"
            onClick={() => {
              let _dataresult: saleOrderRequest = {
                ...saleOrderEditReducer.saleorderRequest,
                CardCode: selectRows.cardCode,
                CardName: selectRows.cardName,
                Currency: selectRows.currencyName,
              };

              dispatch(SOEditUpdate(_dataresult));
              props.handlecloseDialog();
            }}
            color="info"
          >
            select
          </Button>
        </Grid>
      </Grid>

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
          saleOrderReducer.saleOrderCustomerSearch.length > 0
            ? saleOrderReducer.saleOrderCustomerSearch
            : rows
        }
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        // onRowDoubleClick={}
        onRowClick={(params) => {
          //console.log(params.id);
          const selectedRows = saleOrderReducer.saleOrderCustomer.filter(
            (row) => params.id === row.id
          );

          selectedRows.map((item, index) => {
            setselectRows(item);
          });
        }}
        // onRowSelectionModelChange={(ids) => {
        //   const selectedIDs = new Set(ids);
        //   const selectedRows = saleOrderReducer.saleOrderCustomer.filter(
        //     (row) => selectedIDs.has(row.id)
        //   );

        //   selectedRows.map((item, index) => {
        //     setselectRows(item);
        //   });
        //   let data: any = {
        //     CardCode: selectRows?.cardCode!,
        //     CardName: selectRows?.cardName!,
        //     Currency: selectRows?.currencyName!,
        //   };

        //   let _dataresult: saleOrderRequest = {
        //     ...saleOrderEditReducer.saleorderRequest,
        //     CardCode: data.CardCode,
        //     CardName: data.CardName,
        //     Currency: data.Currency,
        //   };

        //   dispatch(SOEditUpdate(_dataresult));
        // }}
      ></DataGrid>
    </Box>
  );
};

export default CustomerList;
