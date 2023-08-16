import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AllocateLotRequest } from "../../types/allocatelot.type";
import { RootState } from "../store";
import {
  GenPDMCResponselist,
  MaincardResponse,
} from "../../types/generateMCPD.type";
import { header, httpClient } from "../../utils/httpclient";
import { json } from "stream/consumers";

export interface GenerateMCandPDState {
  isFetching: boolean;
  isError: boolean;
  message: any;
  allocateLotLisrequest: AllocateLotRequest[];
  responselist: GenPDMCResponselist[];
  mclist: MaincardResponse[];
  mclistSearch: MaincardResponse[];
}

const initialState: GenerateMCandPDState = {
  isFetching: false,
  isError: false,
  message: null,
  allocateLotLisrequest: [],
  responselist: [],
  mclist: [],
  mclistSearch: [],
};

const dataresult: GenerateMCandPDState = {
  isFetching: false,
  isError: false,
  message: null,
  allocateLotLisrequest: [],
  responselist: [],
  mclist: [],
  mclistSearch: [],
};

export const GenMCSync = createAsyncThunk(
  "generateMCandPD/GenerateMainCard",
  async (params: AllocateLotRequest[]) => {
    console.log(params);
    const job = new Promise<GenerateMCandPDState>(
      (resolve, rejectWithValue) => {
        httpClient
          .post<GenPDMCResponselist[]>(
            "/GenerateMCandPD/GenerateMainCard",
            params,
            header()
          )
          .then((result) => {
            dataresult.allocateLotLisrequest = params;
            dataresult.responselist = result.data;
            resolve(dataresult);
          })
          .catch((error) => {
            let aaa1 = JSON.stringify(error.response.data);

            //console.log(aaa1);

            rejectWithValue(JSON.stringify(error.response.data));
          });
      }
    );

    return await job;
  }
);

export const DelMCSync = createAsyncThunk(
  "generateMCandPD/DeleteMainCard",
  async (params: AllocateLotRequest[]) => {
    const job = new Promise<GenerateMCandPDState>(
      (resolve, rejectWithValue) => {
        httpClient
          .post<GenPDMCResponselist[]>(
            "/GenerateMCandPD/DeleteMainCard",
            params,
            header()
          )
          .then((result) => {
            dataresult.allocateLotLisrequest = params;
            dataresult.responselist = result.data;
            resolve(dataresult);
          })
          .catch((error) => {
            rejectWithValue(JSON.stringify(error.response.data));
          });
      }
    );

    return await job;
  }
);

export const GenPDSync = createAsyncThunk(
  "generateMCandPD/GenerateProductionOrder",
  async (params: AllocateLotRequest[]) => {
    const job = new Promise<GenerateMCandPDState>(
      (resolve, rejectWithValue) => {
        httpClient
          .post<GenPDMCResponselist[]>(
            "/GenerateMCandPD/GenerateProductionOrder",
            params,
            header()
          )
          .then((result) => {
            dataresult.allocateLotLisrequest = params;
            dataresult.responselist = result.data;
            resolve(dataresult);
          })
          .catch((error) => {
            rejectWithValue(JSON.stringify(error.response.data));
          });
      }
    );

    return await job;
  }
);

export const DelPDSync = createAsyncThunk(
  "generateMCandPD/DeleteProductionOrder",
  async (params: AllocateLotRequest[]) => {
    const job = new Promise<GenerateMCandPDState>(
      (resolve, rejectWithValue) => {
        httpClient
          .post<GenPDMCResponselist[]>(
            "/GenerateMCandPD/DeleteProductionOrder",
            params,
            header()
          )
          .then((result) => {
            dataresult.allocateLotLisrequest = params;
            dataresult.responselist = result.data;
            resolve(dataresult);
          })
          .catch((error) => {
            rejectWithValue(JSON.stringify(error.response.data));
          });
      }
    );

    return await job;
  }
);

export const FindMCSync = createAsyncThunk(
  "generateMCandPD/SearchMC",
  async (params: AllocateLotRequest) => {
    const job = new Promise<GenerateMCandPDState>(
      (resolve, rejectWithValue) => {
        httpClient
          .post<MaincardResponse[]>(
            "/GenerateMCandPD/SearchMC",
            params,
            header()
          )
          .then((result) => {
            dataresult.mclist = result.data;
            resolve(dataresult);
          })
          .catch((error) => {
            rejectWithValue(error.response.data);
          });
      }
    );

    return await job;
  }
);

export const CVPdToSAP = createAsyncThunk(
  "generateMCandPD/ConvertProductionToSAP",
  async (params: AllocateLotRequest[]) => {
    const job = new Promise<GenerateMCandPDState>(
      (resolve, rejectWithValue) => {
        httpClient
          .post<GenPDMCResponselist[]>(
            "/GenerateMCandPD/ConvertProductionToSAP",
            params,
            header()
          )
          .then((result) => {
            //console.log(result.data);
            dataresult.responselist = result.data;
            // console.log(dataresult);
            resolve(dataresult);
          })
          .catch((error) => {
            // console.log(error.response.data);
            //console.log(JSON.stringify(error.response.data));
            rejectWithValue(JSON.stringify(error.response.data));
          });
      }
    );
    return await job;
  }
);

export const ReleasedPdToSAP = createAsyncThunk(
  "generateMCandPD/ReleaseProductionToSAP",
  async (params: AllocateLotRequest[]) => {
    console.log(params);
    const job = new Promise<GenerateMCandPDState>(
      (resolve, rejectWithValue) => {
        httpClient
          .post<GenPDMCResponselist[]>(
            "/GenerateMCandPD/ReleaseProductionToSAP",
            params,
            header()
          )
          .then((result) => {
            //console.log(result.data);
            dataresult.responselist = result.data;
            resolve(dataresult);
          })
          .catch((error) => {
            // console.log(error.response.data);
            rejectWithValue(JSON.stringify(error.response.data));
          });
      }
    );
    return await job;
  }
);

export const CancelPdToSAP = createAsyncThunk(
  "generateMCandPD/CancelProductionToSAP",
  async (params: AllocateLotRequest[]) => {
    const job = new Promise<GenerateMCandPDState>(
      (resolve, rejectWithValue) => {
        httpClient
          .post<GenPDMCResponselist[]>(
            "/GenerateMCandPD/CancelProductionToSAP",
            params,
            header()
          )
          .then((result) => {
            // console.log(result.data);
            dataresult.responselist = result.data;
            resolve(dataresult);
          })
          .catch((error) => {
            // console.log(error.response.data);
            rejectWithValue(JSON.stringify(error.response.data));
          });
      }
    );
    return await job;
  }
);

export const ReleasedPDSync = createAsyncThunk(
  "generateMCandPD/LotReleasetoPD",
  async (params: AllocateLotRequest[]) => {
    console.log(params);
    const job = new Promise<GenerateMCandPDState>(
      (resolve, rejectWithValue) => {
        httpClient
          .post<GenPDMCResponselist[]>(
            "/Allocate/LotReleasetoPD",
            params,
            header()
          )
          .then((result) => {
            // console.log(result.data);
            dataresult.responselist = result.data;
            resolve(dataresult);
          })
          .catch((error) => {
            // console.log(error.response.data);
            rejectWithValue(JSON.stringify(error.response.data));
          });
      }
    );
    return await job;
  }
);

export const DelReleasedPDSync = createAsyncThunk(
  "generateMCandPD/DelLotReleasetoPD",
  async (params: AllocateLotRequest[]) => {
    const job = new Promise<GenerateMCandPDState>(
      (resolve, rejectWithValue) => {
        httpClient
          .post<GenPDMCResponselist[]>(
            "/Allocate/DelLotReleasetoPD",
            params,
            header()
          )
          .then((result) => {
            // console.log(result.data);
            dataresult.responselist = result.data;
            resolve(dataresult);
          })
          .catch((error) => {
            // console.log(error.response.data);
            rejectWithValue(JSON.stringify(error.response.data));
          });
      }
    );
    return await job;
  }
);

const generateMCandPDSlice = createSlice({
  name: "generateMCandPD",
  initialState,
  reducers: {
    AddLottoListGenMC: (
      state: GenerateMCandPDState,
      action: PayloadAction<AllocateLotRequest[]>
    ) => {
      //console.log(action.payload);

      state.allocateLotLisrequest = action.payload;

      //return { ...state, allocateLotLisrequest: action.payload };
    },

    ClearGenerateMCPD: (state: GenerateMCandPDState) => {
      state = initialState;
    },
    CleanGenMCPDResultList: (state: GenerateMCandPDState) => {
      return { ...state, responselist: [] };
    },
    SearchMC: (state: GenerateMCandPDState, action: PayloadAction<string>) => {
      const filtered = state.mclist.filter((entry) =>
        Object.values(entry).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(action.payload.toLowerCase())
        )
      );
      if (filtered.length > 0) state.mclistSearch = filtered;
    },
    SearchMCbyType: (
      state: GenerateMCandPDState,
      action: PayloadAction<string>
    ) => {
      if (action.payload !== "All") {
        const filtered1 = state.mclist.filter(
          (entry) => entry.typeCode === action.payload
        );
        state.mclistSearch = filtered1;
      } else state.mclist = state.mclistSearch;
    },
    ClearMClist: (state: GenerateMCandPDState) => {
      return { ...state, mclist: [], mclistSearch: [] };
    },
    ClearPDList: (state: GenerateMCandPDState) => {
      return { ...state, pdlist: [], pdlistSearch: [] };
    },
  },
  extraReducers(builder) {
    // Gen MC
    builder.addCase(GenMCSync.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.message = "Generate MainCard completed.";
      state.allocateLotLisrequest = action.payload.allocateLotLisrequest;
      state.responselist = action.payload.responselist;
    });
    builder.addCase(GenMCSync.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      let datobj = JSON.parse(action.error.message?.toString()!);
      if (datobj != null) {
        state.responselist = datobj;
        state.message = "Error. Can't Generate Main Card ";
      } else {
        state.message = action.error.message;
        state.responselist = [];
      }
    });
    builder.addCase(GenMCSync.pending, (state, action) => {
      state.isFetching = true;
      state.isError = false;
      state.responselist = [];
      state.message = "Loading...";
    });

    // Del MC
    builder.addCase(DelMCSync.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.message = "Delete MainCard completed.";
      state.allocateLotLisrequest = action.payload.allocateLotLisrequest;
      state.responselist = action.payload.responselist;
    });
    builder.addCase(DelMCSync.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      let datobj = JSON.parse(action.error.message?.toString()!);
      if (datobj != null) {
        state.responselist = datobj;
        state.message = "Error. Can't convert PD to SAP";
      } else {
        state.message = action.error.message;
        state.responselist = [];
      }
    });
    builder.addCase(DelMCSync.pending, (state, action) => {
      state.responselist = [];
      state.isFetching = true;
      state.isError = false;
      state.message = "Loading...";
    });

    // Gen PD
    builder.addCase(GenPDSync.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.message = "Generate Production Order completed.";
      state.allocateLotLisrequest = action.payload.allocateLotLisrequest;
      state.responselist = action.payload.responselist;
    });
    builder.addCase(GenPDSync.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      let datobj = JSON.parse(action.error.message?.toString()!);
      if (datobj != null) {
        state.responselist = datobj;
        state.message = "Error. Can't convert PD to SAP";
      } else {
        state.message = action.error.message;
        state.responselist = [];
      }
    });
    builder.addCase(GenPDSync.pending, (state, action) => {
      state.responselist = [];
      state.isFetching = true;
      state.isError = false;
      state.message = "Loading...";
    });

    // Del PD
    builder.addCase(DelPDSync.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.message = "Delete Production Order completed.";
      state.allocateLotLisrequest = action.payload.allocateLotLisrequest;
      state.responselist = action.payload.responselist;
    });
    builder.addCase(DelPDSync.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      let datobj = JSON.parse(action.error.message?.toString()!);
      if (datobj != null) {
        state.responselist = datobj;
        state.message = "Error. Can't convert PD to SAP";
      } else {
        state.message = action.error.message;
        state.responselist = [];
      }
    });
    builder.addCase(DelPDSync.pending, (state, action) => {
      state.responselist = [];
      state.isFetching = true;
      state.isError = false;
      state.message = "Loading...";
    });

    // Search MC
    builder.addCase(FindMCSync.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.message = "Find MainCard completed.";
      state.mclist = action.payload.mclist;
      state.mclistSearch = action.payload.mclist;
    });
    builder.addCase(FindMCSync.rejected, (state, action) => {
      state.mclist = [];
      state.mclistSearch = [];
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
    });
    builder.addCase(FindMCSync.pending, (state, action) => {
      state.isFetching = true;
      state.isError = false;
      state.message = "Loading...";
    });

    // CVPdToSAP
    builder.addCase(CVPdToSAP.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.message = "Convert Production Order to SAP completed.";
      state.allocateLotLisrequest = action.payload.allocateLotLisrequest;
      state.responselist = action.payload.responselist;
    });
    builder.addCase(CVPdToSAP.rejected, (state, action) => {
      //console.log(action.error.message);

      let datobj = JSON.parse(action.error.message?.toString()!);
      if (datobj != null) {
        state.responselist = datobj;
        state.message = "Error. Can't convert PD to SAP";
      } else {
        state.message = action.error.message;
        state.responselist = [];
      }
      state.isFetching = false;
      state.isError = true;
    });
    builder.addCase(CVPdToSAP.pending, (state, action) => {
      state.responselist = [];
      state.isFetching = true;
      state.isError = false;
      state.message = "Loading...";
    });

    // ReleasedPdToSAP
    builder.addCase(ReleasedPdToSAP.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.message = "Released Production Order to SAP completed.";
      state.allocateLotLisrequest = action.payload.allocateLotLisrequest;
      state.responselist = action.payload.responselist;
    });
    builder.addCase(ReleasedPdToSAP.rejected, (state, action) => {
      let datobj = JSON.parse(action.error.message?.toString()!);
      if (datobj != null) {
        state.responselist = datobj;
        state.message = "Error. Can't convert PD to SAP";
      } else {
        state.message = action.error.message;
        state.responselist = [];
      }

      state.isFetching = false;
      state.isError = true;
    });
    builder.addCase(ReleasedPdToSAP.pending, (state, action) => {
      state.responselist = [];
      state.isFetching = true;
      state.isError = false;
      state.message = "Loading...";
    });

    // CancelPdToSAP
    builder.addCase(CancelPdToSAP.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.message = "Cancel Production Order to SAP completed.";
      state.allocateLotLisrequest = action.payload.allocateLotLisrequest;
      state.responselist = action.payload.responselist;
    });
    builder.addCase(CancelPdToSAP.rejected, (state, action) => {
      let datobj = JSON.parse(action.error.message?.toString()!);
      if (datobj != null) {
        state.responselist = datobj;
        state.message = "Error. Can't convert PD to SAP";
      } else {
        state.message = action.error.message;
        state.responselist = [];
      }

      state.isFetching = false;
      state.isError = true;
    });
    builder.addCase(CancelPdToSAP.pending, (state, action) => {
      state.responselist = [];
      state.isFetching = true;
      state.isError = false;
      state.message = "Loading...";
    });

    // ReleasedPD
    builder.addCase(ReleasedPDSync.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.message = "Released to Production completed.";
      state.allocateLotLisrequest = action.payload.allocateLotLisrequest;
      state.responselist = action.payload.responselist;
    });
    builder.addCase(ReleasedPDSync.rejected, (state, action) => {
      let datobj = JSON.parse(action.error.message?.toString()!);
      if (datobj != null) {
        state.responselist = datobj;
        state.message = "Error. Can't released to Production";
      } else {
        state.message = action.error.message;
        state.responselist = [];
      }

      state.isFetching = false;
      state.isError = true;
    });
    builder.addCase(ReleasedPDSync.pending, (state, action) => {
      state.responselist = [];
      state.isFetching = true;
      state.isError = false;
      state.message = "Loading...";
    });

    // Del ReleasedPD
    builder.addCase(DelReleasedPDSync.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.message = "Delete release to Production completed.";
      state.allocateLotLisrequest = action.payload.allocateLotLisrequest;
      state.responselist = action.payload.responselist;
    });
    builder.addCase(DelReleasedPDSync.rejected, (state, action) => {
      let datobj = JSON.parse(action.error.message?.toString()!);
      if (datobj != null) {
        state.responselist = datobj;
        state.message = "Error. Can't delete release to Production";
      } else {
        state.message = action.error.message;
        state.responselist = [];
      }

      state.isFetching = false;
      state.isError = true;
    });
    builder.addCase(DelReleasedPDSync.pending, (state, action) => {
      state.responselist = [];
      state.isFetching = true;
      state.isError = false;
      state.message = "Loading...";
    });
  },
});

export const {
  AddLottoListGenMC,
  SearchMC,
  SearchMCbyType,
  CleanGenMCPDResultList,
  ClearMClist,
  ClearPDList,
  ClearGenerateMCPD,
} = generateMCandPDSlice.actions;
export const generateMCandPDSelector = (store: RootState) =>
  store.generateMCandPDReducer;
export default generateMCandPDSlice.reducer;
