import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AllocateLotRequest } from "../../types/allocatelot.type";
import { ProductionOrderHResponse } from "../../types/productionOrder.type";
import { header, httpClient } from "../../utils/httpclient";

export interface ProductionOrderState {
  isFetching: boolean;
  isError: boolean;
  message: any;
  productionOrderrequest: AllocateLotRequest;
  pdlist: ProductionOrderHResponse[];
  pdlistSearch: ProductionOrderHResponse[];
  pdselected: ProductionOrderHResponse | null;
}

const requestdefault: AllocateLotRequest = {
  soNumber: "",
  buy: "",
  purOrder: "",
  lot: "",
};

const initialState: ProductionOrderState = {
  isFetching: false,
  isError: false,
  message: null,
  productionOrderrequest: requestdefault,
  pdlist: [],
  pdlistSearch: [],
  pdselected: null,
};

export const FindPDSync = createAsyncThunk(
  "productionOrder/SearchPD",
  async (params: AllocateLotRequest) => {
    const job = new Promise<ProductionOrderHResponse[]>(
      (resolve, rejectWithValue) => {
        httpClient
          .post<ProductionOrderHResponse[]>(
            "/GenerateMCandPD/SearchPD",
            params,
            header()
          )
          .then((result) => {
            // console.log(result.data);
            // dataresult.pdlist = result.data;

            resolve(result.data);
          })
          .catch((error) => {
            rejectWithValue(error.response.data);
          });
      }
    );

    return await job;
  }
);

const productionOrderSlice = createSlice({
  name: "productionOrder",
  initialState,
  reducers: {
    ClearProductionOrder: (state: ProductionOrderState) => {
      return initialState;
    },
    AddProductionOrderRequest: (
      state: ProductionOrderState,
      action: PayloadAction<AllocateLotRequest>
    ) => {
      return { ...state, productionOrderrequest: action.payload };
    },
    SearchPD: (state: ProductionOrderState, action: PayloadAction<string>) => {
      const filtered = state.pdlist.filter((entry) =>
        Object.values(entry).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(action.payload.toLowerCase())
        )
      );
      return { ...state, pdlistSearch: filtered };
      //  state.pdlistSearch = filtered;
    },
    SelectedPD: (
      state: ProductionOrderState,
      action: PayloadAction<ProductionOrderHResponse>
    ) => {
      console.log(action.payload);
      return { ...state, pdselected: action.payload };
    },
    ClearselectedPD: (state: ProductionOrderState) => {
      return { ...state, pdselected: null };
    },
  },
  extraReducers(builder) {
    // Search PD
    builder.addCase(FindPDSync.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.message = "Find Production Order completed.";
      state.pdlist = action.payload;
      state.pdlistSearch = action.payload;
    });
    builder.addCase(FindPDSync.rejected, (state, action) => {
      state.pdlist = [];
      state.pdlistSearch = [];
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
    });
    builder.addCase(FindPDSync.pending, (state, action) => {
      state.isFetching = true;
      state.isError = false;
      state.message = "Loading...";
    });
  },
});

export const {
  ClearProductionOrder,
  AddProductionOrderRequest,
  SearchPD,
  SelectedPD,
  ClearselectedPD,
} = productionOrderSlice.actions;
export const productionOrderSelector = (store: RootState) =>
  store.productionOrderReducer;
export default productionOrderSlice.reducer;
