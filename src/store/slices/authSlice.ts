import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState, useAppDispatch } from "../store";
import { User } from "../../types/user.type";
import axios from "axios";
import { stat } from "fs";
import { rejects } from "assert";
import { resolve } from "path";
import { httpClient } from "../../utils/httpclient";
import { TOKEN } from "../../constants/Constants";
import { Account, LoginResult } from "../../types/authen.type";
import jwt from "jwt-decode";
import jwtDecode from "jwt-decode";

export interface LoginState {
  isFetching: boolean;
  isError: boolean;
  message: any;
  token: any;
  account: Account;
}

const defaultaccount: Account = {
  EmpName: "",
  EmpLname: "",
  EmpPosition: "",
  EmpSection: "",
  EmpDepartment: "",
  iss: "",
  EmpEmail: "",
  Site: "",
  Role: "",
};

const initialState: LoginState = {
  isFetching: false,
  isError: false,
  message: null,
  token: null,
  account: defaultaccount,
};

export const LoginAsync = createAsyncThunk(
  "auth/loginAsync",
  async (user: User) => {
    const job = new Promise<LoginState>((resolve, rejectWithValue) => {
      const dataresult: LoginState = {
        isFetching: false,
        isError: false,
        message: null,
        token: null,
        account: defaultaccount,
      };

      httpClient
        .post<LoginResult>("/Account/Login", user)
        .then((result) => {
          localStorage.setItem(TOKEN, result.data.token!);
          dataresult.token = result.data.token;

          const users = jwtDecode<Account>(result.data.token!); // decode your token here

          //console.log(users.EmpDepartment);

          dataresult.account = users;

          resolve(dataresult);
        })
        .catch((error) => {
          rejectWithValue(error.response.data);
        });
    });
    return await job;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    LoginFetchine: (state: LoginState, action: PayloadAction<void>) => {
      state.isFetching = true;
    },
    // LoginSuccess:(state: LoginState,action: PayloadAction<LoginResult>) =>{

    //     state.isError=false;
    //     state.isFetching =false;
    //     state.token = action.payload.token;
    // },
    // LoginFailed:(state: LoginState,action: PayloadAction<LoginResult>)=> {
    //     state.isError=true;
    //     state.isFetching =false;
    //     state.token = null;
    // },
    restoreLogin: (state: LoginState) => {
      const token = localStorage.getItem(TOKEN);
      if (token) {
        state.isError = false;
        state.isFetching = false;
        state.token = token;
        state.message = "OK";
        const users = jwtDecode<Account>(token); // decode your token here
        state.account = users;
      }
    },
    Logout: (state: LoginState) => {
      localStorage.removeItem(TOKEN);
      state.isError = false;
      state.isFetching = false;
      state.token = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoginAsync.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.account = action.payload.account;
      state.isFetching = false;
      state.isError = false;
      state.message = "OK";
    });
    builder.addCase(LoginAsync.rejected, (state, action) => {
      state.token = null;
      state.account = defaultaccount;
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
    });
    builder.addCase(LoginAsync.pending, (state, action) => {
      state.isFetching = true;
    });
  },
});

export const { LoginFetchine, restoreLogin, Logout } = authSlice.actions;
export const authSelector = (store: RootState) => store.authReducer;
export default authSlice.reducer;
