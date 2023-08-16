import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DashbaordCard } from "../../types/dashboard.type";
import { Dashboard } from "@mui/icons-material";
import { RootState } from "../store";
import { header, httpClient } from "../../utils/httpclient";

export interface DashboardState {
  isFetching: boolean;
  isError: boolean;
  message: any;
  dashboardCard: DashbaordCard;
}

const dfDashboardCard: DashbaordCard = {
  id: 0,
  draftSO: 0,
  wtConvertSO: 0,
  wtAllocate: 0,
  allocate: 0,
  wtGenMC: 0,
  wtGenPD: 0,
  wtConvertPD: 0,
  wtReleasedPD: 0,
};

const initialState: DashboardState = {
  isFetching: false,
  isError: false,
  message: null,
  dashboardCard: dfDashboardCard,
};

export const DashboardCardAsync = createAsyncThunk(
  "dashbord/dashbordCard",
  async () => {
    const job = new Promise<DashbaordCard>((resolve, rejectWithValue) => {
      httpClient
        .get<DashbaordCard>("/Dashbord", header())
        .then((result) => {
          // console.log(result.data);

          resolve(result.data);
          // state.saleOrderCustomer = JSON.parse(result.data);
        })
        .catch((error) => {
          rejectWithValue(error.response.data);
        });
    });

    return await job;
  }
);

const dashboardSlice = createSlice({
  name: "dashbord",
  initialState,
  reducers: {
    Cleardatadashboard: (state: DashboardState) => {},
  },
  extraReducers(builder) {
    /// get dashboardCard
    builder.addCase(DashboardCardAsync.fulfilled, (state, action) => {
      state.dashboardCard = action.payload;
      state.isFetching = false;
      state.isError = false;
      state.message = "OK";
    });
    builder.addCase(DashboardCardAsync.rejected, (state, action) => {
      state.dashboardCard = dfDashboardCard;
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
    });
    builder.addCase(DashboardCardAsync.pending, (state, action) => {
      state.isFetching = true;
      state.message = "Loading";
    });
  },
});

export const { Cleardatadashboard } = dashboardSlice.actions;
export const dashboardSelector = (store: RootState) => store.dashboardReducer;
export default dashboardSlice.reducer;
