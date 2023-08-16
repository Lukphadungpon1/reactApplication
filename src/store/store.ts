import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { useDispatch } from "react-redux";

import authReducer from "./slices/authSlice";
import saleOrderReducer from "./slices/saleOrderSlice";
import saleOrderEditReducer from "./slices/saleOrderEditSlice";
import snackbarReducer from "./slices/snackbarSlice";
import allocateLotReducer from "./slices/allocateLotSlice";
import allocateLotEditReducer from "./slices/allocateLotEditSlice";
import generateMCandPDReducer from "./slices/generateMCandPDSlice";
import productionOrderReducer from "./slices/productionOrderSlice";
import dashboardReducer from "./slices/dashboardSlice";
import issueMTReducer from "./slices/issueMTSlice";

const reducer = {
  authReducer,
  saleOrderReducer,
  saleOrderEditReducer,
  snackbarReducer,
  allocateLotReducer,
  allocateLotEditReducer,
  generateMCandPDReducer,
  productionOrderReducer,
  dashboardReducer,
  issueMTReducer,
};

export const store = configureStore({
  reducer,
  //middleware,
  devTools: process.env.NODE_ENV === "development",
});

// export type of root state from reducers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
