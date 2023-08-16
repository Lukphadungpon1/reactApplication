import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  AllocateLotResponse,
  AllocateLotSize,
} from "../../types/allocatelot.type";
import { header, httpClient } from "../../utils/httpclient";
import { startTransition } from "react";

export interface AllocateLotEditState {
  isFetching: boolean;
  isError: boolean;
  message: any;
  allocateLotEdit: AllocateLotResponse | null;
}

export interface AllocateLotEditUpdateQty {
  id: number;
  qty: number;
}

const initialState: AllocateLotEditState = {
  isFetching: false,
  isError: false,
  message: null,
  allocateLotEdit: null,
};

export const AllocateLotEditDeldb = createAsyncThunk(
  "allocateLotEdit/Delete",
  async (id: Number) => {
    const job = new Promise<string>((resolve, rejectWithValue) => {
      httpClient
        .delete("/Allocate/" + id, header())
        .then((result) => {
          resolve(result.data);
        })
        .catch((error) => {
          rejectWithValue(error.response.data);
        });
    });
    return await job;
  }
);

export const AllocateLotEditUpdatedb = createAsyncThunk(
  "allocateLotEdit/Update",
  async ({ id, values }: { id: Number; values: AllocateLotResponse }) => {
    console.log(values);

    const job = new Promise<AllocateLotResponse>((resolve, rejectWithValue) => {
      httpClient
        .put("/Allocate/" + id, values, header())
        .then((result) => {
          resolve(result.data);
        })
        .catch((error) => {
          rejectWithValue(error.response.data);
        });
    });
    return await job;
  }
);

const allocateLotEditSlice = createSlice({
  name: "allocateLotEdit",
  initialState,
  reducers: {
    ClearallocateLotEdit: (state: AllocateLotEditState) => {
      state.isError = false;
      state.isFetching = false;
      state.message = null;
      state.allocateLotEdit = null;
    },
    UpdateQty: (
      state: AllocateLotEditState,
      action: PayloadAction<AllocateLotSize[]>
    ) => {
      return {
        ...state,
        allocateLotEdit: {
          ...state.allocateLotEdit!,
          allocateLotSizes: action.payload,
        },
      };

      // state = { ...state, allocateLotEdit: action.payload };
    },
    GetdataallocateLotEdit: (
      state: AllocateLotEditState,
      action: PayloadAction<AllocateLotResponse>
    ) => {
      //  console.log(action.payload);

      return {
        ...state,
        isError: false,
        isFetching: false,
        message: null,
        allocateLotEdit: action.payload,
      };
      //   let aaa = (state.allocateLotEdit = action.payload);
      //   //console.log(aaa);
      //   state = { ...state, allocateLotEdit: aaa };

      // state.isError = false;
      // state.isFetching = false;
      // state.message = null;

      // state.allocateLotEdit = action.payload;
    },
  },
  extraReducers: (builder) => {
    //// Del Lot
    builder.addCase(AllocateLotEditDeldb.fulfilled, (state, action) => {
      state.allocateLotEdit = null;
      state.isFetching = false;
      state.isError = false;
      state.message = "Delete Lot Complete..";
    });
    builder.addCase(AllocateLotEditDeldb.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
    });
    builder.addCase(AllocateLotEditDeldb.pending, (state, action) => {
      state.isFetching = true;
      state.message = "Loading...";
    });
    //// Update Lot
    builder.addCase(AllocateLotEditUpdatedb.fulfilled, (state, action) => {
      state.allocateLotEdit = action.payload;
      state.isFetching = false;
      state.isError = false;
      state.message = "Update Lot Complete..";
    });
    builder.addCase(AllocateLotEditUpdatedb.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
    });
    builder.addCase(AllocateLotEditUpdatedb.pending, (state, action) => {
      state.isFetching = true;
      state.message = "Loading...";
    });
  },
});

export const { ClearallocateLotEdit, GetdataallocateLotEdit, UpdateQty } =
  allocateLotEditSlice.actions;
export const allocateLotEditSelector = (store: RootState) =>
  store.allocateLotEditReducer;
export default allocateLotEditSlice.reducer;
