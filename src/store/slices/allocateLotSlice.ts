import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  AllocateLotRequest,
  AllocateLotResponse,
  ChangeLotnumber,
} from "../../types/allocatelot.type";

import { header, httpClient } from "../../utils/httpclient";
import ChangLotNumber from "../../component/pages/AllocateLot/ChangLotNumber";

export interface AllocateLotState {
  isFetching: boolean;
  isError: boolean;
  message: any;
  allocateLotLisrequest: AllocateLotRequest;
  allocateLotList: AllocateLotResponse[];
  allocateLotListSearch: AllocateLotResponse[];
  changeLotNumber: ChangeLotnumber;
}

const defaultrequest: AllocateLotRequest = {
  soNumber: "",
  buy: "",
  purOrder: "",
  lot: "",
};

const dfChLotNumber: ChangeLotnumber = {
  id: 0,
  LotFrom: "",
  LotTo: "",
};

const initialState: AllocateLotState = {
  isFetching: false,
  isError: false,
  message: null,
  allocateLotLisrequest: defaultrequest,
  allocateLotList: [],
  allocateLotListSearch: [],
  changeLotNumber: dfChLotNumber,
};

const dataresult: AllocateLotState = {
  isFetching: false,
  isError: false,
  message: null,
  allocateLotLisrequest: defaultrequest,
  allocateLotList: [],
  allocateLotListSearch: [],
  changeLotNumber: dfChLotNumber,
};

export const GenerateLotasync = createAsyncThunk(
  "allocateLot/GenerateLot",
  async (params: AllocateLotRequest) => {
    const job = new Promise<AllocateLotState>((resolve, rejectWithValue) => {
      httpClient
        .post<any>("/Allocate/GenerateLot", params, header())
        .then((result) => {
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

export const GetLotasync = createAsyncThunk(
  "allocateLot/GetLotList",
  async (params: AllocateLotRequest) => {
    const job = new Promise<AllocateLotState>((resolve, rejectWithValue) => {
      httpClient
        .post<any>("/Allocate/SearchLot", params, header())
        .then((result) => {
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

export const GetLotAsyncGenMC = createAsyncThunk(
  "allocateLot/GetLotListgenMC",
  async (params: AllocateLotRequest) => {
    const job = new Promise<AllocateLotState>((resolve, rejectWithValue) => {
      httpClient
        .post<AllocateLotResponse[]>("/Allocate/SearchLot", params, header())
        .then((result) => {
          // const _data = result.data.filter((f) => {
          //   return f.generateMc === 0 || f.generatePd === 0;
          // });

          // console.log(_data.length);

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

export const ChLotNumber = createAsyncThunk(
  "allocateLot/ChangeLotNumber",
  async (params: ChangeLotnumber) => {
    const job = new Promise<AllocateLotState>((resolve, rejectWithValue) => {
      httpClient
        .post<ChangeLotnumber>("/Allocate/ChangeLotNumber", params, header())
        .then((result) => {
          // const _data = result.data.filter((f) => {
          //   return f.generateMc === 0 || f.generatePd === 0;
          // });

          // console.log(_data.length);

          dataresult.changeLotNumber = result.data;
          resolve(dataresult);
        })
        .catch((error) => {
          rejectWithValue(error.response.data);
        });
    });

    return await job;
  }
);

const allocateLotSlice = createSlice({
  name: "allocateLot",
  initialState,
  reducers: {
    ClearallocateLot: (state: AllocateLotState) => {
      state.isError = false;
      state.isFetching = false;
      state.message = null;
      state.allocateLotLisrequest = defaultrequest;
      state.allocateLotList = [];
      state.allocateLotListSearch = [];
      state.changeLotNumber = dfChLotNumber;
    },
    AddlotlistRequestParam: (
      state: AllocateLotState,
      action: PayloadAction<AllocateLotRequest>
    ) => {
      console.log(action.payload);
      state = { ...state, allocateLotLisrequest: action.payload };
    },

    SearchLot: (state: AllocateLotState, action: PayloadAction<string>) => {
      const filtered = state.allocateLotList.filter((entry) =>
        Object.values(entry).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(action.payload.toLowerCase())
        )
      );

      state.allocateLotListSearch = filtered;
    },
    AddChLotNumber: (
      state: AllocateLotState,
      action: PayloadAction<ChangeLotnumber>
    ) => {
      state.changeLotNumber = action.payload;
    },
    ClearChLotNumber: (state: AllocateLotState) => {
      state.changeLotNumber = dfChLotNumber;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GenerateLotasync.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.message = "OK";

      state.allocateLotList = action.payload.allocateLotList;
      state.allocateLotListSearch = action.payload.allocateLotListSearch;
    });
    builder.addCase(GenerateLotasync.rejected, (state, action) => {
      state.allocateLotList = [];
      state.allocateLotListSearch = [];
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
    });
    builder.addCase(GenerateLotasync.pending, (state, action) => {
      state.isFetching = true;
      state.message = "Loading...";
    });

    // get lotlist
    builder.addCase(GetLotasync.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.message = "OK";
      state.allocateLotLisrequest = action.payload.allocateLotLisrequest;
      state.allocateLotList = action.payload.allocateLotList;
      state.allocateLotListSearch = action.payload.allocateLotListSearch;
    });
    builder.addCase(GetLotasync.rejected, (state, action) => {
      state.allocateLotList = [];
      state.allocateLotListSearch = [];
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
    });
    builder.addCase(GetLotasync.pending, (state, action) => {
      state.isFetching = true;
      state.isError = false;
      state.message = "Loading...";
    });

    // get lotlist MC
    builder.addCase(GetLotAsyncGenMC.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.message = "OK";
      state.allocateLotLisrequest = action.payload.allocateLotLisrequest;
      state.allocateLotList = action.payload.allocateLotList;
      state.allocateLotListSearch = action.payload.allocateLotListSearch;
    });
    builder.addCase(GetLotAsyncGenMC.rejected, (state, action) => {
      state.allocateLotList = [];
      state.allocateLotListSearch = [];
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
    });
    builder.addCase(GetLotAsyncGenMC.pending, (state, action) => {
      state.isFetching = true;
      state.isError = false;
      state.message = "Loading...";
    });

    // ch lot number
    builder.addCase(ChLotNumber.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.message = "OK";
      state.changeLotNumber = action.payload.changeLotNumber;
    });
    builder.addCase(ChLotNumber.rejected, (state, action) => {
      state.changeLotNumber = dfChLotNumber;
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
    });
    builder.addCase(ChLotNumber.pending, (state, action) => {
      state.isFetching = true;
      state.isError = false;
      state.message = "Loading...";
    });
  },
});

export const {
  ClearallocateLot,
  SearchLot,
  AddlotlistRequestParam,
  AddChLotNumber,
  ClearChLotNumber,
} = allocateLotSlice.actions;
export const allocateLotSelector = (store: RootState) =>
  store.allocateLotReducer;
export default allocateLotSlice.reducer;
