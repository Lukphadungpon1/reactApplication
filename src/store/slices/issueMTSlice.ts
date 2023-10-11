import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IssueMaterialD,
  IssueMaterialHResponse,
} from "../../types/picking.type.tx";
import { RootState } from "../store";
import { header, httpClient } from "../../utils/httpclient";
import { GenPDMCResponselist } from "../../types/generateMCPD.type";
import { IssueMTGroupD, IssueMTSearch } from "../../types/issueMT.type";

export interface issueMTState {
  isFetching: boolean;
  isError: boolean;
  message: any;
  issueMT: IssueMaterialHResponse;
  issueMTListD: IssueMTGroupD[];
  issueMTListDSearch: IssueMTGroupD[];
  responselist: GenPDMCResponselist[];
}

const defaultIssueMTH: IssueMaterialHResponse = {
  id: 0,
  issueNumber: "",
  location: "",
  lotlist: "",
  pickingBy: "",
  pickingDate: "",
  printDate: null,
  issueBy: "",
  issueDate: null,
  createBy: "",
  createDate: "",
  updateBy: "",
  updateDate: null,
  status: "",
  uploadFile: "",
  convertSap: 0,
  docEntry: 0,
  docNum: "",
  remark: "",
  issueMaterialDs: [],
  issueMaterialManuals: [],
  issueMaterialLogs: [],
};

const dataresult: issueMTState = {
  isFetching: false,
  isError: false,
  message: null,
  issueMT: defaultIssueMTH,
  issueMTListD: [],
  issueMTListDSearch: [],
  responselist: [],
};

const initialState: issueMTState = {
  isFetching: false,
  isError: false,
  message: null,
  issueMT: defaultIssueMTH,
  issueMTListD: [],
  issueMTListDSearch: [],
  responselist: [],
};

export const GetIssueByIdasync = createAsyncThunk(
  "IssueMT/GetIssueByIdasync",
  async (params: Number) => {
    const job = new Promise<issueMTState>((resolve, rejectWithValue) => {
      httpClient
        .get<any>("/IssueMT/" + params, header())
        .then((result) => {
          //console.log(result);
          dataresult.issueMT = result.data;

          resolve(dataresult);
        })
        .catch((error) => {
          rejectWithValue(error.response.data);
        });
    });
    return await job;
  }
);

export const GetissueMTListDasync = createAsyncThunk(
  "IssueMT/GetissueMTListDasync",
  async (params: Number) => {
    const job = new Promise<issueMTState>((resolve, rejectWithValue) => {
      httpClient
        .post<any>("/IssueMT/GetissueMTListD", params, header())
        .then((result) => {
          //console.log(result);
          dataresult.issueMTListD = result.data;
          dataresult.issueMTListDSearch = result.data;

          resolve(dataresult);
        })
        .catch((error) => {
          rejectWithValue(error.response.data);
        });
    });
    return await job;
  }
);

export const CreateIssueMTasync = createAsyncThunk(
  "IssueMT/CreateIssueMTasync",
  async (params: IssueMTSearch) => {
    const job = new Promise<issueMTState>((resolve, rejectWithValue) => {
      httpClient
        .post<any>("/IssueMT/Create", params, header())
        .then((result) => {
          //console.log(result);
          dataresult.responselist = result.data;

          resolve(dataresult);
        })
        .catch((error) => {
          console.log(JSON.stringify(error.response.data));
          rejectWithValue(JSON.stringify(error.response.data));
        });
    });
    return await job;
  }
);

export const DeleteIssueMTasync = createAsyncThunk(
  "IssueMT/DeleteissueMT",
  async (params: number) => {
    const job = new Promise<issueMTState>((resolve, rejectWithValue) => {
      httpClient
        .delete<any>("/IssueMT/" + params, header())
        .then((result) => {
          //console.log(result);
          dataresult.responselist = result.data;

          resolve(dataresult);
        })
        .catch((error) => {
          console.log(JSON.stringify(error.response.data));
          rejectWithValue(JSON.stringify(error.response.data));
        });
    });
    return await job;
  }
);

const issueMTSlice = createSlice({
  name: "issueMT",
  initialState,
  reducers: {
    CleanIssueMTState: (state: issueMTState) => {
      return initialState;
    },
    SearchIssueListD: (state: issueMTState, action: PayloadAction<string>) => {
      const filtered = state.issueMTListD.filter((entry) =>
        Object.values(entry).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(action.payload.toLowerCase())
        )
      );

      state.issueMTListDSearch = filtered;
    },
  },
  extraReducers(builder) {
    //GetIssueByIdasync
    builder.addCase(GetIssueByIdasync.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.message = "OK";
      state.issueMT = action.payload.issueMT;
    });
    builder.addCase(GetIssueByIdasync.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
      state.issueMT = defaultIssueMTH;
    });
    builder.addCase(GetIssueByIdasync.pending, (state, action) => {
      state.isFetching = true;
      state.isError = false;
      state.message = "Loading...";
    });

    //GetissueMTListDasync
    builder.addCase(GetissueMTListDasync.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.message = "OK";
      state.issueMTListD = action.payload.issueMTListD;
      state.issueMTListDSearch = action.payload.issueMTListDSearch;
    });
    builder.addCase(GetissueMTListDasync.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
      state.issueMTListD = [];
      state.issueMTListDSearch = [];
    });
    builder.addCase(GetissueMTListDasync.pending, (state, action) => {
      state.isFetching = true;
      state.isError = false;
      state.message = "Loading...";
    });

    //CreateIssueMTasync
    builder.addCase(CreateIssueMTasync.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.message = "OK";
      state.responselist = action.payload.responselist;
    });
    builder.addCase(CreateIssueMTasync.rejected, (state, action) => {
      let datobj = JSON.parse(action.error.message?.toString()!);
      if (datobj != null) {
        state.responselist = datobj;
        state.message = datobj.errorMessage;
      } else {
        state.message = action.error.message;
        state.responselist = [];
      }
      state.isFetching = false;
      state.isError = true;
    });
    builder.addCase(CreateIssueMTasync.pending, (state, action) => {
      state.isFetching = true;
      state.isError = false;
      state.message = "Loading...";
    });

    //DeleteIssueMTasync
    builder.addCase(DeleteIssueMTasync.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.message = "OK";
      state.responselist = action.payload.responselist;
    });
    builder.addCase(DeleteIssueMTasync.rejected, (state, action) => {
      let datobj = JSON.parse(action.error.message?.toString()!);
      if (datobj != null) {
        state.responselist = datobj;
        state.message = datobj.errorMessage;
      } else {
        state.message = action.error.message;
        state.responselist = [];
      }
      state.isFetching = false;
      state.isError = true;
    });
    builder.addCase(DeleteIssueMTasync.pending, (state, action) => {
      state.isFetching = true;
      state.isError = false;
      state.message = "Loading...";
    });
  },
});

export const { CleanIssueMTState, SearchIssueListD } = issueMTSlice.actions;
export const issueMTSelector = (store: RootState) => store.issueMTReducer;
export default issueMTSlice.reducer;
