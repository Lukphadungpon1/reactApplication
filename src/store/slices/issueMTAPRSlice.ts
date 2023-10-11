import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AllocateLotRequest } from "../../types/allocatelot.type";
import {
  ReqIssueMTResponse,
  ReqIssueMaterialD,
  ReqIssueMaterialLog,
} from "../../types/issueMT.type";
import { IssueMTByAPRSearch } from "../../types/issueMTAPR.type";
import { header, httpClient } from "../../utils/httpclient";
import { GenPDMCResponselist } from "../../types/generateMCPD.type";

export interface IssueMTAPRState {
  isFetching: boolean;
  isError: boolean;
  message: any;
  IssueMTAPRSearch: IssueMTByAPRSearch;
  RequestissueMTHList: ReqIssueMTResponse[];
  RequestissueMTHListSearch: ReqIssueMTResponse[];
  ItemSelectedList: ReqIssueMTResponse[];
  ItemSelected: ReqIssueMTResponse | null;
  ItemSelectedDetail: ReqIssueMaterialD[];
  ItemSelectedDetailSearch: ReqIssueMaterialD[];
  ItemSelectedLog: ReqIssueMaterialLog[];
  ItemSelectedLogSearch: ReqIssueMaterialLog[];
  responselist: GenPDMCResponselist[];
}

const defaultIssueMTAPRSearch: IssueMTByAPRSearch = {
  id: 0,
  reqNumber: "",
  lot: "",
  location: "",
  itemCode: "",
  itemName: "",
  reqDept: "",
  requestBy: "",
  requestDate: new Date().toLocaleDateString("sv"),
};

const initialState: IssueMTAPRState = {
  isFetching: false,
  isError: false,
  message: null,
  IssueMTAPRSearch: defaultIssueMTAPRSearch,
  RequestissueMTHList: [],
  RequestissueMTHListSearch: [],
  ItemSelectedList: [],
  ItemSelected: null,
  ItemSelectedDetail: [],
  ItemSelectedDetailSearch: [],
  ItemSelectedLog: [],
  ItemSelectedLogSearch: [],
  responselist: [],
};

const dataresult: IssueMTAPRState = {
  isFetching: false,
  isError: false,
  message: null,
  IssueMTAPRSearch: defaultIssueMTAPRSearch,
  RequestissueMTHList: [],
  RequestissueMTHListSearch: [],
  ItemSelectedList: [],
  ItemSelected: null,
  ItemSelectedDetail: [],
  ItemSelectedDetailSearch: [],
  ItemSelectedLog: [],
  ItemSelectedLogSearch: [],
  responselist: [],
};

export const getRequestAPRListasync = createAsyncThunk(
  "issueMTAPR/GetRequestIssueByApr",
  async (params: IssueMTByAPRSearch) => {
    //console.log(params);
    const job = new Promise<IssueMTAPRState>((resolve, rejectWithValue) => {
      httpClient
        .post<any>("/RequestIssueMT/GetRequestIssueByApr", params, header())
        .then((result) => {
          //console.log(result);

          dataresult.RequestissueMTHList = result.data;
          dataresult.RequestissueMTHListSearch = result.data;

          resolve(dataresult);
        })
        .catch((error) => {
          rejectWithValue(JSON.stringify(error.response.data));
        });
    });

    return await job;
  }
);

export const getRequestMTListasync = createAsyncThunk(
  "issueMTAPR/GetRequestIssueByUser",
  async (params: IssueMTByAPRSearch) => {
    const job = new Promise<IssueMTAPRState>((resolve, rejectWithValue) => {
      httpClient
        .post<any>("/RequestIssueMT/GetRequestIssueByUser", params, header())
        .then((result) => {
          //console.log(result);

          dataresult.RequestissueMTHList = result.data;
          dataresult.RequestissueMTHListSearch = result.data;

          resolve(dataresult);
        })
        .catch((error) => {
          rejectWithValue(JSON.stringify(error.response.data));
        });
    });

    return await job;
  }
);

export const approvedRequestAPRasync = createAsyncThunk(
  "issueMTAPR/Approvedprocess",
  async (params: ReqIssueMTResponse[]) => {
    console.log(params);
    const job = new Promise<IssueMTAPRState>((resolve, rejectWithValue) => {
      httpClient
        .post<any>("/RequestIssueMT/Approvedprocess", params, header())
        .then((result) => {
          //console.log(result);
          dataresult.responselist = result.data;
          resolve(dataresult);
        })
        .catch((error) => {
          rejectWithValue(JSON.stringify(error.response.data));
        });
    });

    return await job;
  }
);

const issueMTAPRSlice = createSlice({
  name: "issueMTAPR",
  initialState,
  reducers: {
    SearchRequestMT: (
      state: IssueMTAPRState,
      action: PayloadAction<string>
    ) => {
      const filtered = state.RequestissueMTHList.filter((entry) =>
        Object.values(entry).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(action.payload.toLowerCase())
        )
      );
      if (filtered.length > 0) state.RequestissueMTHListSearch = filtered;
    },
    SearchItemSelectedDetail: (
      state: IssueMTAPRState,
      action: PayloadAction<string>
    ) => {
      const filtered = state.ItemSelectedDetail.filter((entry) =>
        Object.values(entry).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(action.payload.toLowerCase())
        )
      );
      if (filtered.length > 0) state.ItemSelectedDetailSearch = filtered;
    },
    SearchItemSelectedLog: (
      state: IssueMTAPRState,
      action: PayloadAction<string>
    ) => {
      const filtered = state.ItemSelectedLog.filter((entry) =>
        Object.values(entry).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(action.payload.toLowerCase())
        )
      );
      if (filtered.length > 0) state.ItemSelectedLogSearch = filtered;
    },
    AddRequestIssueSelected: (
      state: IssueMTAPRState,
      action: PayloadAction<ReqIssueMTResponse>
    ) => {
      state.ItemSelected = action.payload;
      state.ItemSelectedDetail = action.payload.reqIssueMaterialDs;
      state.ItemSelectedDetailSearch = action.payload.reqIssueMaterialDs;
      state.ItemSelectedLog = action.payload.reqIssueMaterialLogs;
      state.ItemSelectedLogSearch = action.payload.reqIssueMaterialLogs;
    },
    AddItemSelectedList: (
      state: IssueMTAPRState,
      action: PayloadAction<ReqIssueMTResponse[]>
    ) => {
      state.ItemSelectedList = action.payload;
    },
    ClearReqIssueMTAPR: (state: IssueMTAPRState) => {
      state = initialState;
    },
  },
  extraReducers(builder) {
    // get GetLotForRequest
    builder.addCase(getRequestAPRListasync.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.message = "OK";
      state.RequestissueMTHList = action.payload.RequestissueMTHList;
      state.RequestissueMTHListSearch =
        action.payload.RequestissueMTHListSearch;
    });
    builder.addCase(getRequestAPRListasync.rejected, (state, action) => {
      state.RequestissueMTHList = [];
      state.RequestissueMTHListSearch = [];
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
    });
    builder.addCase(getRequestAPRListasync.pending, (state, action) => {
      state.isFetching = true;
      state.isError = false;
      state.message = "Loading...";
    });

    //getRequestMTListasync
    builder.addCase(getRequestMTListasync.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.message = "OK";
      state.RequestissueMTHList = action.payload.RequestissueMTHList;
      state.RequestissueMTHListSearch =
        action.payload.RequestissueMTHListSearch;
    });
    builder.addCase(getRequestMTListasync.rejected, (state, action) => {
      state.RequestissueMTHList = [];
      state.RequestissueMTHListSearch = [];
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
    });
    builder.addCase(getRequestMTListasync.pending, (state, action) => {
      state.isFetching = true;
      state.isError = false;
      state.message = "Loading...";
    });

    //approved pro
    builder.addCase(approvedRequestAPRasync.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.message = "OK";
      state.responselist = action.payload.responselist;
      state.ItemSelectedList = [];
      state.ItemSelectedDetail = [];
      state.ItemSelectedDetailSearch = [];
      state.ItemSelectedLog = [];
      state.ItemSelectedLogSearch = [];
    });
    builder.addCase(approvedRequestAPRasync.rejected, (state, action) => {
      state.ItemSelectedList = [];
      state.ItemSelectedDetail = [];
      state.ItemSelectedDetailSearch = [];
      state.ItemSelectedLog = [];
      state.ItemSelectedLogSearch = [];
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
    });
    builder.addCase(approvedRequestAPRasync.pending, (state, action) => {
      state.isFetching = true;
      state.isError = false;
      state.message = "Loading...";
      state.responselist = [];
    });
  },
});

export const {
  SearchRequestMT,
  AddRequestIssueSelected,
  ClearReqIssueMTAPR,
  SearchItemSelectedDetail,
  SearchItemSelectedLog,
  AddItemSelectedList,
} = issueMTAPRSlice.actions;

export const issueMTAPRSelector = (store: RootState) => store.issueMTAPRReducer;
export default issueMTAPRSlice.reducer;
