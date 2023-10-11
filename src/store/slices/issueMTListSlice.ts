import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IssueMaterialHResponse } from "../../types/picking.type.tx";
import { IssueMTSearch } from "../../types/issueMT.type";
import { header, httpClient } from "../../utils/httpclient";
import { RootState } from "../store";

export interface issueMTListState {
  isFetching: boolean;
  isError: boolean;
  message: any;
  issueMTList: IssueMaterialHResponse[];
  issueMTListSearch: IssueMaterialHResponse[];
  issueMTSelected: IssueMaterialHResponse | null;
  issueMTListRequest: IssueMTSearch;
}

const defaultIssueMTHReq: IssueMTSearch = {
  id: 0,
  issueNumber: "",
  location: "",
  lotlist: "",
  pickingBy: "",
  pickingDate: new Date().toLocaleDateString("sv"),
  printDate: new Date().toLocaleDateString("sv"),
  issueBy: "",
  issueDate: new Date().toLocaleDateString("sv"),
};

const dataresult: issueMTListState = {
  isFetching: false,
  isError: false,
  message: null,
  issueMTList: [],
  issueMTListSearch: [],
  issueMTSelected: null,
  issueMTListRequest: defaultIssueMTHReq,
};

const initialState: issueMTListState = {
  isFetching: false,
  isError: false,
  message: null,
  issueMTList: [],
  issueMTListSearch: [],
  issueMTSelected: null,
  issueMTListRequest: defaultIssueMTHReq,
};

export const getissueMTListasync = createAsyncThunk(
  "issueMTList/GetIssueList",
  async (params: IssueMTSearch) => {
    const job = new Promise<issueMTListState>((resolve, rejectWithValue) => {
      httpClient
        .post<any>("/Picking/GetIssueList", params, header())
        .then((result) => {
          //console.log(result);
          dataresult.issueMTList = result.data;
          dataresult.issueMTListSearch = result.data;
          dataresult.issueMTListRequest = params;

          resolve(dataresult);
        })
        .catch((error) => {
          rejectWithValue(error.response.data);
        });
    });

    return await job;
  }
);

const issueMTListSlice = createSlice({
  name: "issueMTList",
  initialState,
  reducers: {
    CleanissueMTListState: (state: issueMTListState) => {
      //state = initialS  tate;
      state.isError = false;
      state.isFetching = false;
      state.message = null;
      state.issueMTList = [];
      state.issueMTListSearch = [];
      state.issueMTSelected = null;
      state.issueMTListRequest = defaultIssueMTHReq;

      //return initialState;
    },
    SearchissueMTList: (
      state: issueMTListState,
      action: PayloadAction<string>
    ) => {
      const filtered = state.issueMTList.filter((entry) =>
        Object.values(entry).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(action.payload.toLowerCase())
        )
      );

      state.issueMTListSearch = filtered;
    },
    AddIssueListSelected: (
      state: issueMTListState,
      action: PayloadAction<IssueMaterialHResponse>
    ) => {
      state.issueMTSelected = action.payload;
    },
  },
  extraReducers(builder) {
    // get GetIssueList
    builder.addCase(getissueMTListasync.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.message = "OK";
      state.issueMTList = action.payload.issueMTList;
      state.issueMTListSearch = action.payload.issueMTListSearch;
      state.issueMTListRequest = action.payload.issueMTListRequest;
    });
    builder.addCase(getissueMTListasync.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
      state.issueMTList = [];
      state.issueMTListSearch = [];
      state.issueMTListRequest = defaultIssueMTHReq;
    });
    builder.addCase(getissueMTListasync.pending, (state, action) => {
      state.isFetching = true;
      state.isError = false;
      state.message = "Loading...";
    });
  },
});

export const {
  CleanissueMTListState,
  SearchissueMTList,
  AddIssueListSelected,
} = issueMTListSlice.actions;
export const issueMTListSelector = (store: RootState) =>
  store.issueMTListReducer;
export default issueMTListSlice.reducer;
