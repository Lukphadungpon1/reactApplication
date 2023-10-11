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
  ReqIssueMaterialD,
  ReqIssueMaterialLog,
  RequestIssueMTItemListH,
  changLocationItemH,
} from "../../types/issueMT.type";
import { stat } from "fs";
import { act } from "react-dom/test-utils";
import { GenPDMCResponselist } from "../../types/generateMCPD.type";
import exp from "constants";

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
  responselist: GenPDMCResponselist[];
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
  site: "",
  requireDate: new Date().toLocaleDateString("sv"),
  remark: "",
  createBy: "",
  createDate: new Date().toLocaleDateString("sv"),
  updateBy: "",
  updateDate: new Date().toLocaleDateString("sv"),
  status: "",
  location: "",
  reqIssueMaterialDs: [],
  reqIssueMaterialLogs: [],
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
  responselist: [],
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
  responselist: [],
};

export const GetLotForRequestasync = createAsyncThunk(
  "issueMT/GetLotForRequest",
  async (params: AllocateLotRequest) => {
    //console.log(params);
    const job = new Promise<IssueMTState>((resolve, rejectWithValue) => {
      httpClient
        .post<any>("/RequestIssueMT/GetLotForRequest", params, header())
        .then((result) => {
          //console.log(result);

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
    console.log(params);
    const job = new Promise<IssueMTState>((resolve, rejectWithValue) => {
      httpClient
        .post<any>("/RequestIssueMT/GetItemPDByLot", params, header())
        .then((result) => {
          //console.log(result);

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
          //console.log(result);

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

export const RequestIssueasync = createAsyncThunk(
  "issueMT/Create",
  async (params: ReqIssueMTResponse) => {
    console.log(params);
    const job = new Promise<IssueMTState>((resolve, rejectWithValue) => {
      httpClient
        .post<any>("/RequestIssueMT/Create", params, header())
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

const RequestissueMTSlice = createSlice({
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
    ClearIssueMTState: (state: IssueMTState) => {
      return {
        ...state,
        isFetching: false,
        isError: false,
        message: null,
        allocateLotLisrequest: defaultrequest,
        allocateLotList: [],
        allocateLotListSearch: [],
        lotSelect: null,
        ItemReqIssueH: [],
        ItemReqIssueHSearch: [],
        responselist: [],
      };
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
      console.log(action.payload);

      if (action.payload !== "") {
        const filtered1 = state.ItemReqIssueH.filter(
          (entry) => entry.department === action.payload
        );
        //console.log(filtered1);
        state.ItemReqIssueHSearch = filtered1;
      } else state.ItemReqIssueHSearch = state.ItemReqIssueH;
    },
    UpdatelocatinItemDetail: (
      state: IssueMTState,
      action: PayloadAction<changLocationItemH>
    ) => {
      //console.log(action.payload);
      const newItemH = state.ItemReqIssueH.map((obj) => {
        if (obj.id === action.payload.id) {
          const newItemD = obj.itemD.map((ob) => {
            return { ...ob, department: action.payload.department };
          });

          return {
            ...obj,
            department: action.payload.department,
            itemD: newItemD,
          };
        }

        return obj;
      });

      const newItemHSearch = state.ItemReqIssueHSearch.map((obj) => {
        if (obj.id === action.payload.id) {
          const newItemD = obj.itemD.map((ob) => {
            return { ...ob, department: action.payload.department };
          });

          return {
            ...obj,
            department: action.payload.department,
            itemD: newItemD,
          };
        }

        return obj;
      });

      state.ItemReqIssueH = newItemH;
      state.ItemReqIssueHSearch = newItemHSearch;
    },

    AddItemSelected: (
      state: IssueMTState,
      action: PayloadAction<ReqIssueMaterialD[]>
    ) => {
      console.log(action.payload);

      return {
        ...state,
        RequestissueMTH: {
          ...state.RequestissueMTH,
          reqIssueMaterialDs: action.payload,
        },
      };

      //state.RequestissueMTH.reqIssueMaterialDs = action.payload;

      //return { ...state, allocateLotLisrequest: action.payload };
    },
    NewLogRequest: (
      state: IssueMTState,
      action: PayloadAction<ReqIssueMaterialLog>
    ) => {
      console.log(action.payload);
      state.RequestissueMTH.reqIssueMaterialLogs = [
        ...state.RequestissueMTH.reqIssueMaterialLogs!,
        action.payload,
      ];
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

    // request Issue
    builder.addCase(RequestIssueasync.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.message = "OK";
      state.responselist = action.payload.responselist;
    });
    builder.addCase(RequestIssueasync.rejected, (state, action) => {
      let datobj = JSON.parse(action.error.message?.toString()!);
      if (datobj != null) {
        state.responselist = datobj;
        state.message = "Error. Can't request material";
      } else {
        state.message = action.error.message;
        state.responselist = [];
      }
      state.isFetching = false;
      state.isError = true;
    });
    builder.addCase(RequestIssueasync.pending, (state, action) => {
      state.isFetching = true;
      state.isError = false;
      state.message = "Loading...";
      state.responselist = [];
    });
  },
});

export const {
  SearchLotRequestMT,
  ClearIssueMTState,
  AddLotSelectReqIssue,
  ClearRequestMTLostList,
  UpdateRequestissueMTH,
  SearchItemIssue,
  SearchItemIssuebyType,
  UpdatelocatinItemDetail,
  AddItemSelected,
  NewLogRequest,
} = RequestissueMTSlice.actions;
export const requestissueMTSelector = (store: RootState) =>
  store.requestissueMTReducer;
export default RequestissueMTSlice.reducer;
