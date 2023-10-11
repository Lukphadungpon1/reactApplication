import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  AllocateLotRequest,
  AllocateLotResponse,
} from "../../types/allocatelot.type";
import {
  IssueMaterialD,
  IssueMaterialHResponse,
  IssueMaterialLog,
  IssueMaterialManual,
  PickingItemH,
  UpdatePickQtyM,
} from "../../types/picking.type.tx";
import { GenPDMCResponselist } from "../../types/generateMCPD.type";
import { header, httpClient } from "../../utils/httpclient";
import { LocationIssue, changLocationItemH } from "../../types/issueMT.type";
import { act } from "react-dom/test-utils";

export interface pickingState {
  isFetching: boolean;
  isError: boolean;
  message: any;
  LotList: AllocateLotResponse[];
  LotListSearch: AllocateLotResponse[];
  LotLisrequestSelected: AllocateLotRequest[];
  PickingItemH: PickingItemH[];
  PickingItemHSearch: PickingItemH[];
  IssueMTH: IssueMaterialHResponse;
  LocationPick: LocationIssue[];
  PickingItemHSelected: PickingItemH[];
  responselist: GenPDMCResponselist[];
}

const defaultIssueMTH: IssueMaterialHResponse = {
  id: 0,
  issueNumber: "",
  location: "",
  lotlist: "",
  pickingBy: "",
  pickingDate: new Date().toLocaleDateString("sv"),
  printDate: null,
  issueBy: "",
  issueDate: null,
  createBy: "",
  createDate: new Date().toLocaleDateString("sv"),
  updateBy: "",
  updateDate: null,
  status: "Draft",
  uploadFile: "",
  convertSap: 0,
  docEntry: 0,
  docNum: "",
  remark: "",
  issueMaterialDs: [],
  issueMaterialManuals: [],
  issueMaterialLogs: [],
};

const initialState: pickingState = {
  isFetching: false,
  isError: false,
  message: null,
  LotList: [],
  LotListSearch: [],
  LotLisrequestSelected: [],
  PickingItemH: [],
  PickingItemHSearch: [],
  IssueMTH: defaultIssueMTH,
  PickingItemHSelected: [],
  LocationPick: [],
  responselist: [],
};

const dataresult: pickingState = {
  isFetching: false,
  isError: false,
  message: null,
  LotList: [],
  LotListSearch: [],
  LotLisrequestSelected: [],
  PickingItemH: [],
  PickingItemHSearch: [],
  IssueMTH: defaultIssueMTH,
  PickingItemHSelected: [],
  LocationPick: [],
  responselist: [],
};

export const GetLotForPickingasync = createAsyncThunk(
  "picking/GetLotForPicking",
  async (params: AllocateLotRequest) => {
    const job = new Promise<pickingState>((resolve, rejectWithValue) => {
      httpClient
        .post<any>("/Picking/GetLotForPicking", params, header())
        .then((result) => {
          //console.log(result);
          dataresult.LotLisrequestSelected = [params];
          dataresult.LotList = result.data;
          dataresult.LotListSearch = result.data;
          resolve(dataresult);
        })
        .catch((error) => {
          rejectWithValue(error.response.data);
        });
    });

    return await job;
  }
);

export const GetLocationPickasync = createAsyncThunk(
  "picking/GetLocationPick",
  async () => {
    const job = new Promise<pickingState>((resolve, rejectWithValue) => {
      httpClient
        .get<any>("/RequestIssueMT/GetLocationIssue", header())
        .then((result) => {
          //console.log(result);

          dataresult.LocationPick = result.data;
          resolve(dataresult);
        })
        .catch((error) => {
          rejectWithValue(error.response.data);
        });
    });

    return await job;
  }
);

export const GetItemForLotPickingasync = createAsyncThunk(
  "picking/GetItemForLotPicking",
  async (params: AllocateLotRequest[]) => {
    const job = new Promise<pickingState>((resolve, rejectWithValue) => {
      httpClient
        .post<any>("/Picking/GetItemForLotPicking", params, header())
        .then((result) => {
          //console.log(result);
          dataresult.PickingItemH = result.data;
          dataresult.PickingItemHSearch = result.data;

          resolve(dataresult);
        })
        .catch((error) => {
          rejectWithValue(error.response.data);
        });
    });

    return await job;
  }
);

export const CreatePickingasync = createAsyncThunk(
  "picking/CreatePicking",
  async (params: IssueMaterialHResponse) => {
    const job = new Promise<pickingState>((resolve, rejectWithValue) => {
      httpClient
        .post<any>("/Picking/CreatePicking", params, header())
        .then((result) => {
          //console.log(result);
          dataresult.IssueMTH = result.data;

          resolve(dataresult);
        })
        .catch((error) => {
          rejectWithValue(error.response.data);
        });
    });

    return await job;
  }
);

const pickingSlice = createSlice({
  name: "picking",
  initialState,
  reducers: {
    CleanpickingState: (state: pickingState) => {
      //state = initialState;
      return initialState;
    },
    AddLotLisrequestSelected: (
      state: pickingState,
      action: PayloadAction<AllocateLotRequest[]>
    ) => {
      state.LotLisrequestSelected = action.payload;
    },
    AddItemHSelected: (
      state: pickingState,
      action: PayloadAction<PickingItemH[]>
    ) => {
      // if (action.payload.length > 0) {
      //   const _issManualList = action.payload
      //     .filter((f) => f.pickQty > f.plandQty)
      //     .map((obj) => {
      //       const _data: IssueMaterialManual = {
      //         id: 0,
      //         issueHid: 0,
      //         buy: obj.buy,
      //         lot: state.IssueMTH.lotlist,
      //         itemCode: obj.itemCode,
      //         itemName: obj.itemName,
      //         warehouse: obj.warehouse,
      //         issueMethod: "Manual",
      //         baseQty: obj.baseQty,
      //         plandQty: obj.plandQty,
      //         pickQty: obj.pickQty - obj.plandQty,
      //         issueQty: 0,
      //         confirmQty: 0,
      //         createBy: "",
      //         createDate: new Date(),
      //         updateBy: "",
      //         updateDate: new Date(),
      //         status: "A",
      //         convertSap: 0,
      //         docEntry: 0,
      //         docNum: "",
      //         location: state.IssueMTH.location,
      //       };

      //       return _data;
      //     });

      //   console.log(_issManualList);

      //   state.IssueMTH = {
      //     ...state.IssueMTH,
      //     IssueMaterialManuals: _issManualList,
      //   };
      //   state.PickingItemHSelected = action.payload;
      // }else{
      //   state.PickingItemHSearch = [];
      // }

      state.PickingItemHSelected = action.payload;
    },
    AddItemDSelected: (
      state: pickingState,
      action: PayloadAction<IssueMaterialD[]>
    ) => {
      state.IssueMTH = { ...state.IssueMTH, issueMaterialDs: action.payload };
    },
    AddItemManual: (
      state: pickingState,
      action: PayloadAction<IssueMaterialManual[]>
    ) => {
      state.IssueMTH = {
        ...state.IssueMTH,
        issueMaterialManuals: action.payload,
      };
    },
    AddLogIssue: (
      state: pickingState,
      action: PayloadAction<IssueMaterialLog[]>
    ) => {
      state.IssueMTH = {
        ...state.IssueMTH,
        issueMaterialLogs: action.payload,
      };
    },
    SearchLotPicking: (state: pickingState, action: PayloadAction<string>) => {
      const filtered = state.LotList.filter((entry) =>
        Object.values(entry).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(action.payload.toLowerCase())
        )
      );

      state.LotListSearch = filtered;
    },
    SearchPickItemH: (state: pickingState, action: PayloadAction<string>) => {
      const filtered = state.PickingItemH.filter((entry) =>
        Object.values(entry).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(action.payload.toLowerCase())
        )
      );

      state.PickingItemHSearch = filtered;
    },
    UpdatePickQty: (
      state: pickingState,
      action: PayloadAction<PickingItemH[]>
    ) => {
      const _newItemHSearch = action.payload.filter((entry) =>
        state.PickingItemHSearch.map((obf) => obf.id === entry.id)
      );

      state.PickingItemH = action.payload;
      state.PickingItemHSearch = _newItemHSearch;
    },
    UpdateLocationPick: (
      state: pickingState,
      action: PayloadAction<changLocationItemH>
    ) => {
      const newItemH = state.PickingItemH.map((obj) => {
        if (obj.id === action.payload.id) {
          const newItemD = obj.pickingItemD.map((ob) => {
            return { ...ob, location: action.payload.department };
          });

          return {
            ...obj,
            location: action.payload.department,
            itemD: newItemD,
          };
        }

        return obj;
      });

      const _newItemHSearch = newItemH.filter((entry) =>
        state.PickingItemHSearch.map((obf) => obf.id === entry.id)
      );

      state.PickingItemH = newItemH;
      state.PickingItemHSearch = _newItemHSearch;
    },
    SelectedLocationPick: (
      state: pickingState,
      action: PayloadAction<string>
    ) => {
      state.IssueMTH = { ...state.IssueMTH, location: action.payload };
    },
  },
  extraReducers(builder) {
    // get GetLotForRequest
    builder.addCase(GetLotForPickingasync.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.message = "OK";
      state.LotList = action.payload.LotList;
      state.LotListSearch = action.payload.LotListSearch;
      state.LotLisrequestSelected = action.payload.LotLisrequestSelected;
    });
    builder.addCase(GetLotForPickingasync.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
      state.LotList = [];
      state.LotListSearch = [];
      state.LotLisrequestSelected = [];
    });
    builder.addCase(GetLotForPickingasync.pending, (state, action) => {
      state.isFetching = true;
      state.isError = false;
      state.message = "Loading...";
    });

    // get GetItemForLotPickingasync
    builder.addCase(GetItemForLotPickingasync.fulfilled, (state, action) => {
      const lotstr = state.LotLisrequestSelected.map((e) => e.lot).join(",");

      state.IssueMTH = { ...state.IssueMTH, lotlist: lotstr };

      state.isError = false;
      state.isFetching = false;
      state.message = "OK";
      state.PickingItemH = action.payload.PickingItemH;
      state.PickingItemHSearch = action.payload.PickingItemHSearch;
    });
    builder.addCase(GetItemForLotPickingasync.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;

      state.PickingItemH = [];
      state.PickingItemHSearch = [];
    });
    builder.addCase(GetItemForLotPickingasync.pending, (state, action) => {
      state.isFetching = true;
      state.isError = false;
      state.message = "Loading...";
    });

    // get GetLocationPickasync
    builder.addCase(GetLocationPickasync.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.message = "OK";
      state.LocationPick = action.payload.LocationPick;
    });
    builder.addCase(GetLocationPickasync.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;

      state.LocationPick = [];
    });
    builder.addCase(GetLocationPickasync.pending, (state, action) => {
      state.isFetching = true;
      state.isError = false;
      state.message = "Loading...";
    });

    //CreatePickingasync
    builder.addCase(CreatePickingasync.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.message = "OK";
      state.IssueMTH = action.payload.IssueMTH;
    });
    builder.addCase(CreatePickingasync.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
    });
    builder.addCase(CreatePickingasync.pending, (state, action) => {
      state.isFetching = true;
      state.isError = false;
      state.message = "Loading...";
    });
  },
});

export const {
  CleanpickingState,
  AddLotLisrequestSelected,
  SearchLotPicking,
  AddItemDSelected,
  AddItemHSelected,
  UpdatePickQty,
  SearchPickItemH,
  UpdateLocationPick,
  SelectedLocationPick,
  AddItemManual,
  AddLogIssue,
} = pickingSlice.actions;

export const pickingSelector = (store: RootState) => store.pickingReducer;
export default pickingSlice.reducer;
