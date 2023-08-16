import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AllocateLotRequest,
  AllocateLotResponse,
} from "../../types/allocatelot.type";
import { RootState } from "../store";
import { header, httpClient } from "../../utils/httpclient";
import {
  LocationIssue,
  ReqIssueMTResponse,
  RequestIssueMTItemListH,
} from "../../types/issueMT.type";
import { stat } from "fs";
import { act } from "react-dom/test-utils";

export interface IssueMTState {
  isFetching: boolean;
  isError: boolean;
  message: any;
  allocateLotLisrequest: AllocateLotRequest;
  allocateLotList: AllocateLotResponse[];
  allocateLotListSearch: AllocateLotResponse[];
  lotSelect: AllocateLotResponse | null;
  ItemReqIssueH: RequestIssueMTItemListH[];
  ItemReqIssueHSearch: RequestIssueMTItemListH[];
  RequestissueMTH: ReqIssueMTResponse;
  LocationIssue: LocationIssue[];
}

const defaultrequest: AllocateLotRequest = {
  soNumber: "",
  buy: "",
  purOrder: "",
  lot: "",
};

const defaultrequestissueH: ReqIssueMTResponse = {
  id: 0,
  reqNumber: "0",
  lot: "",
  requestBy: "",
  requestDate: new Date().toLocaleDateString("sv"),
  reqDept: "",
  requireDate: new Date().toLocaleDateString("sv"),
  remark: "",
  createBy: "",
  createDate: new Date().toLocaleDateString("sv"),
  updateBy: "",
  updateDate: new Date().toLocaleDateString("sv"),
  status: "",
  reqIssueMaterialDs: [],
  reqIssueMaterialLogs: null,
};

const initialState: IssueMTState = {
  isFetching: false,
  isError: false,
  message: null,
  allocateLotLisrequest: defaultrequest,
  allocateLotList: [],
  allocateLotListSearch: [],
  lotSelect: null,
  ItemReqIssueH: [],
  ItemReqIssueHSearch: [],
  RequestissueMTH: defaultrequestissueH,
  LocationIssue: [],
};

const dataresult: IssueMTState = {
  isFetching: false,
  isError: false,
  message: null,
  allocateLotLisrequest: defaultrequest,
  allocateLotList: [],
  allocateLotListSearch: [],
  lotSelect: null,
  ItemReqIssueH: [],
  ItemReqIssueHSearch: [],
  RequestissueMTH: defaultrequestissueH,
  LocationIssue: [],
};

export const GetLotForRequestasync = createAsyncThunk(
  "issueMT/GetLotForRequest",
  async (params: AllocateLotRequest) => {
    console.log(params);
    const job = new Promise<IssueMTState>((resolve, rejectWithValue) => {
      httpClient
        .post<any>("/RequestIssueMT/GetLotForRequest", params, header())
        .then((result) => {
          console.log(result);

          dataresult.allocateLotLisrequest = params;
          dataresult.allocateLotList = result.data;
          dataresult.allocateLotListSearch = result.data;
          resolve(dataresult);
        })
        .catch((error) => {
          rejectWithValue(error.response.data);
        });
    });

    return await job;
  }
);

export const GetItemRequestHasync = createAsyncThunk(
  "issueMT/GetItemPDByLot",
  async (params: AllocateLotRequest) => {
    const job = new Promise<IssueMTState>((resolve, rejectWithValue) => {
      httpClient
        .post<any>("/RequestIssueMT/GetItemPDByLot", params, header())
        .then((result) => {
          console.log(result);

          dataresult.ItemReqIssueH = result.data;
          dataresult.ItemReqIssueHSearch = result.data;
          resolve(dataresult);
        })
        .catch((error) => {
          rejectWithValue(error.response.data);
        });
    });

    return await job;
  }
);

export const GetLocationIssueasync = createAsyncThunk(
  "issueMT/GetLocationIssue",
  async () => {
    const job = new Promise<IssueMTState>((resolve, rejectWithValue) => {
      httpClient
        .get<any>("/RequestIssueMT/GetLocationIssue", header())
        .then((result) => {
          console.log(result);

          dataresult.LocationIssue = result.data;
          resolve(dataresult);
        })
        .catch((error) => {
          rejectWithValue(error.response.data);
        });
    });

    return await job;
  }
);

const issueMTSlice = createSlice({
  name: "issueMT",
  initialState,
  reducers: {
    SearchLotRequestMT: (
      state: IssueMTState,
      action: PayloadAction<string>
    ) => {
      const filtered = state.allocateLotList.filter((entry) =>
        Object.values(entry).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(action.payload.toLowerCase())
        )
      );

      state.allocateLotListSearch = filtered;
    },
    AddLotSelectReqIssue: (
      state: IssueMTState,
      action: PayloadAction<AllocateLotResponse>
    ) => {
      state.lotSelect = action.payload;
    },
    ClearGenerateMCPD: (state: IssueMTState) => {
      state = initialState;
    },
    ClearRequestMTLostList: (state: IssueMTState) => {
      state.allocateLotList = [];
      state.allocateLotListSearch = [];
      state.allocateLotLisrequest = defaultrequest;
    },
    UpdateRequestissueMTH: (
      state: IssueMTState,
      action: PayloadAction<ReqIssueMTResponse>
    ) => {
      return { ...state, RequestissueMTH: action.payload };

      //state.RequestissueMTH = action.payload;
    },
    SearchItemIssue: (state: IssueMTState, action: PayloadAction<String>) => {
      const filtered = state.ItemReqIssueH.filter((entry) =>
        Object.values(entry).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(action.payload.toLowerCase())
        )
      );
      if (filtered.length > 0) state.ItemReqIssueHSearch = filtered;
    },
    SearchItemIssuebyType: (
      state: IssueMTState,
      action: PayloadAction<string>
    ) => {
      if (action.payload !== "All") {
        const filtered1 = state.ItemReqIssueH.filter(
          (entry) => entry.department === action.payload
        );
        state.ItemReqIssueH = filtered1;
      } else state.ItemReqIssueH = state.ItemReqIssueHSearch;
    },
  },
  extraReducers(builder) {
    // get GetLotForRequest
    builder.addCase(GetLotForRequestasync.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.message = "OK";
      state.allocateLotLisrequest = action.payload.allocateLotLisrequest;
      state.allocateLotList = action.payload.allocateLotList;
      state.allocateLotListSearch = action.payload.allocateLotListSearch;
    });
    builder.addCase(GetLotForRequestasync.rejected, (state, action) => {
      state.allocateLotList = [];
      state.allocateLotListSearch = [];
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
    });
    builder.addCase(GetLotForRequestasync.pending, (state, action) => {
      state.isFetching = true;
      state.isError = false;
      state.message = "Loading...";
    });

    // get ItemreqissueH
    builder.addCase(GetItemRequestHasync.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.message = "OK";
      state.ItemReqIssueH = action.payload.ItemReqIssueH;
      state.ItemReqIssueHSearch = action.payload.ItemReqIssueHSearch;
    });
    builder.addCase(GetItemRequestHasync.rejected, (state, action) => {
      state.ItemReqIssueH = [];
      state.ItemReqIssueHSearch = [];
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
    });
    builder.addCase(GetItemRequestHasync.pending, (state, action) => {
      state.isFetching = true;
      state.isError = false;
      state.message = "Loading...";
    });

    // get GetLocationIssueasync
    builder.addCase(GetLocationIssueasync.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.message = "OK";
      state.LocationIssue = action.payload.LocationIssue;
    });
    builder.addCase(GetLocationIssueasync.rejected, (state, action) => {
      state.LocationIssue = [];
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
    });
    builder.addCase(GetLocationIssueasync.pending, (state, action) => {
      state.isFetching = true;
      state.isError = false;
      state.message = "Loading...";
    });
  },
});

export const {
  SearchLotRequestMT,
  ClearGenerateMCPD,
  AddLotSelectReqIssue,
  ClearRequestMTLostList,
  UpdateRequestissueMTH,
  SearchItemIssue,
  SearchItemIssuebyType,
} = issueMTSlice.actions;
export const issueMTSelector = (store: RootState) => store.issueMTReducer;
export default issueMTSlice.reducer;
