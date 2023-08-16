import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface snackbarState {
  isOpen: boolean;
  message: string;
  types: string;
}

const initialState = {
  isOpen: false,
  message: "",
  types: "",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    opensnackbar: (
      state: snackbarState,
      action: PayloadAction<snackbarState>
    ) => {
      state.isOpen = true;
      state.message = action.payload.message;
      state.types = action.payload.types;
    },
    closesnackbar: (state: snackbarState) => {
      state.isOpen = false;
      state.message = "";
      state.types = "";
    },
  },
});

export const { opensnackbar, closesnackbar } = snackbarSlice.actions;

export const snackbarSelector = (store: RootState) => store.snackbarReducer;
export default snackbarSlice.reducer;
