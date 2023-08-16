import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  SOListRequest,
  SOResultByID,
  SaleOrderDetailExcel,
  SaleOrderGetCustomer,
  SaleOrderMasterResult,
  saleOrderRequest,
} from "../../types/saleOrder.type";
import { RootState } from "../store";
import { header, httpClient } from "../../utils/httpclient";

export interface SaleOrderState {
  isFetching: boolean;
  isError: boolean;
  message: any;
  saleOrder: SOResultByID[];
  saleOrderSearch: SOResultByID[];
  saleOrderCustomer: SaleOrderGetCustomer[];
  saleOrderCustomerSearch: SaleOrderGetCustomer[];
  saleType: SaleOrderMasterResult[];
  buyMonth: SaleOrderMasterResult[];
  buyYear: SaleOrderMasterResult[];
}

const initialState: SaleOrderState = {
  isFetching: false,
  isError: false,
  message: null,
  saleOrder: [],
  saleOrderSearch: [],
  saleOrderCustomer: [],
  saleOrderCustomerSearch: [],
  saleType: [],
  buyMonth: [],
  buyYear: [],
};

const dataresult: SaleOrderState = {
  isFetching: false,
  isError: false,
  message: null,
  saleOrder: [],
  saleOrderSearch: [],
  saleOrderCustomer: [],
  saleOrderCustomerSearch: [],
  saleType: [],
  buyMonth: [],
  buyYear: [],
};

export const SaleOrderMasterData = createAsyncThunk(
  "saleOrder/MasterData",
  async () => {
    const job = new Promise<SaleOrderState>((resolve, rejectWithValue) => {
      httpClient
        .get<any>("/SaleOrder/GetCustomer", header())
        .then((result) => {
          // console.log(result.data);

          dataresult.saleOrderCustomer = result.data;
          resolve(dataresult);
          // state.saleOrderCustomer = JSON.parse(result.data);
        })
        .catch((error) => {
          rejectWithValue(error.response.data);
        });
    });

    return await job;
  }
);

export const SaleOrderMasterDataBuyMonth = createAsyncThunk(
  "saleOrder/MasterDataBuyMonth",
  async () => {
    const job = new Promise<SaleOrderState>((resolve, rejectWithValue) => {
      httpClient
        .get<any>("/SaleOrder/GetBuyMonth", header())
        .then((result) => {
          dataresult.buyMonth = result.data;
          resolve(dataresult);
          //   resolve(dataresult);
        })
        .catch((error) => {
          rejectWithValue(error.response.data);
        });
    });

    return await job;
  }
);

export const SaleOrderMasterDataBuyYear = createAsyncThunk(
  "saleOrder/MasterDataBuyYear",
  async () => {
    const job = new Promise<SaleOrderState>((resolve, rejectWithValue) => {
      httpClient
        .get<any>("/SaleOrder/GetTBuyYear", header())
        .then((result) => {
          dataresult.buyYear = result.data;
          resolve(dataresult);
          //   resolve(dataresult);
        })
        .catch((error) => {
          rejectWithValue(error.response.data);
        });
    });

    return await job;
  }
);

export const SaleOrderMasterDataSaleType = createAsyncThunk(
  "saleOrder/MasterDataSaleType",
  async () => {
    const job = new Promise<SaleOrderState>((resolve, rejectWithValue) => {
      httpClient
        .get<any>("/SaleOrder/GetSaleType", header())
        .then((result) => {
          dataresult.saleType = result.data;
          resolve(dataresult);
          //   resolve(dataresult);
        })
        .catch((error) => {
          dataresult.message = error.response.data;
          dataresult.isError = true;
          rejectWithValue(error.response.data);
        });
    });

    return await job;
  }
);

export const SaleOrderGetByID = createAsyncThunk(
  "saleOrder/SaleOrderGetByID",
  async (id: number) => {
    const job = new Promise<SaleOrderState>((resolve, rejectWithValue) => {
      httpClient
        .get<any>("/SaleOrder/" + id, header())
        .then((result) => {
          let _byear = result.data.buy;
          let _bmonth = result.data.buy;

          let _data: saleOrderRequest = {
            DocEntry: result.data.docEntry,
            SoNumber: result.data.soNumber,
            CardCode: result.data.cardCode,
            CardName: result.data.cardName,
            Currency: result.data.docEntry,
            BuyYear: _byear,
            BuyMonth: _bmonth,
            DocStatus: result.data.docStatus,
            SaleTypes: result.data.saleTypes,
            DeliveryDate: result.data.deliveryDate,
            Remark: result.data.remark,
            FormFiles: null,
          };

          resolve(result.data);
          //   resolve(dataresult);
        })
        .catch((error) => {
          rejectWithValue(error.response.data);
        });
    });

    return await job;
  }
);

export const SaleOrderSearch = createAsyncThunk(
  "saleOrder/Search",
  async (params: SOListRequest) => {
    //console.log(JSON.stringify(params));
    const job = new Promise<SaleOrderState>((resolve, rejectWithValue) => {
      httpClient
        .post<any>("/SaleOrder/Search", params, header())
        .then((result) => {
          dataresult.saleOrder = result.data;
          dataresult.saleOrderSearch = result.data;
          resolve(dataresult);

          //   resolve(dataresult);
        })
        .catch((error) => {
          rejectWithValue(error.response.data);
        });
    });

    return await job;
  }
);

const saleOrderSlice = createSlice({
  name: "saleOrder",
  initialState,
  reducers: {
    SaleOrderFetchine: (state: SaleOrderState, action: PayloadAction<void>) => {
      state.isFetching = true;
      state.isError = false;
    },
    SaleOrderClear: (state: SaleOrderState) => {
      state.saleOrder = [];
      state.saleOrderSearch = [];
      state.isError = false;
      state.isFetching = false;
      state.message = null;
    },
    SaleOrderSaleTypeAdd: (
      state: SaleOrderState,
      action: PayloadAction<SaleOrderState>
    ) => {
      return { ...state, ...action.payload };
    },
    SaleOrderSearchCustomer: (
      state: SaleOrderState,
      action: PayloadAction<string>
    ) => {
      //console.log(action.payload);

      const filtered = state.saleOrderCustomer.filter((entry) =>
        Object.values(entry).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(action.payload.toLowerCase())
        )
      );

      state.saleOrderCustomerSearch = filtered;

      //console.log(JSON.stringify(filtered));
    },
    SaleOrderSearchSaleOrder: (
      state: SaleOrderState,
      action: PayloadAction<string>
    ) => {
      const filtered = state.saleOrder.filter((entry) =>
        Object.values(entry).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(action.payload.toLowerCase())
        )
      );
      state.saleOrderSearch = filtered;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(SaleOrderMasterData.fulfilled, (state, action) => {
      state.saleOrderCustomer = action.payload.saleOrderCustomer;
      state.saleOrderCustomerSearch = action.payload.saleOrderCustomer;
      state.isFetching = false;
      state.isError = false;
      state.message = "OK";
    });
    builder.addCase(SaleOrderMasterData.rejected, (state, action) => {
      state.saleOrderCustomer = [];
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
    });
    builder.addCase(SaleOrderMasterData.pending, (state, action) => {
      state.isFetching = true;
      state.message = "Loading";
    });

    //// get saleType
    builder.addCase(SaleOrderMasterDataSaleType.fulfilled, (state, action) => {
      //console.log(action.payload);
      state.saleType = action.payload.saleType;
      state.isFetching = false;
      state.isError = false;
      state.message = "OK";
    });
    builder.addCase(SaleOrderMasterDataSaleType.rejected, (state, action) => {
      state.saleType = [];
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
    });
    builder.addCase(SaleOrderMasterDataSaleType.pending, (state, action) => {
      state.isFetching = true;
      state.message = "Loading";
    });

    //// get BuyMonth
    builder.addCase(SaleOrderMasterDataBuyMonth.fulfilled, (state, action) => {
      //console.log(action.payload);
      state.buyMonth = action.payload.buyMonth;
      state.isFetching = false;
      state.isError = false;
      state.message = "OK";
    });
    builder.addCase(SaleOrderMasterDataBuyMonth.rejected, (state, action) => {
      state.buyMonth = [];
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
    });
    builder.addCase(SaleOrderMasterDataBuyMonth.pending, (state, action) => {
      state.isFetching = true;
      state.message = "Loading";
    });

    //// get BuyYear
    builder.addCase(SaleOrderMasterDataBuyYear.fulfilled, (state, action) => {
      //console.log(action.payload);
      state.buyYear = action.payload.buyYear;
      state.isFetching = false;
      state.isError = false;
      state.message = "OK";
    });
    builder.addCase(SaleOrderMasterDataBuyYear.rejected, (state, action) => {
      state.buyYear = [];
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
    });
    builder.addCase(SaleOrderMasterDataBuyYear.pending, (state, action) => {
      state.isFetching = true;
      state.message = "Loading";
    });

    //// get SaleOrderByID
    builder.addCase(SaleOrderGetByID.fulfilled, (state, action) => {
      state.saleOrder = action.payload.saleOrder;
      state.isFetching = false;
      state.isError = false;
      state.message = "OK";
    });
    builder.addCase(SaleOrderGetByID.rejected, (state, action) => {
      state.saleOrder = [];
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
    });
    builder.addCase(SaleOrderGetByID.pending, (state, action) => {
      state.isFetching = true;
      state.message = "Loading";
    });

    ///// get SaleOrderSearch
    builder.addCase(SaleOrderSearch.fulfilled, (state, action) => {
      state.saleOrder = action.payload.saleOrder;
      state.saleOrderSearch = action.payload.saleOrderSearch;
      state.isFetching = false;
      state.isError = false;
      state.message = "OK";
    });
    builder.addCase(SaleOrderSearch.rejected, (state, action) => {
      state.saleOrder = [];
      state.saleOrderSearch = [];
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
    });
    builder.addCase(SaleOrderSearch.pending, (state, action) => {
      state.saleOrder = [];
      state.saleOrderSearch = [];
      state.isFetching = true;
      state.message = "Loading";
    });
  },
});

export const {
  SaleOrderFetchine,
  SaleOrderClear,
  SaleOrderSaleTypeAdd,
  SaleOrderSearchCustomer,
  SaleOrderSearchSaleOrder,
} = saleOrderSlice.actions;
export const saleOrderSelector = (store: RootState) => store.saleOrderReducer;
export default saleOrderSlice.reducer;
