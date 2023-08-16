import axios from "axios";
import join from "url-join";
import {
  apiUrl,
  NOT_CONNECT_NETWORK,
  NETWORK_CONNECTION_MESSAGE,
  TOKEN,
} from "../constants/Constants";
import { useSelector } from "react-redux";
import { Logout, authSelector } from "../store/slices/authSlice";
import { useAppDispatch } from "../store/store";

const isAbsoluteURLRegex = /^(?:\w+:)\/\//;

axios.interceptors.request.use(async (config: any) => {
  if (!isAbsoluteURLRegex.test(config.url)) {
    config.url = join(apiUrl, config.url);
  }

  config.timeout = 4000000; // 10 Second
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error.response.status);

    // if (error.response.status === "401") {
    //   const dispatch = useAppDispatch();
    //   dispatch(Logout());
    // }
    //console.log(error.response.data);

    console.log(JSON.stringify(error, undefined, 2));

    if (axios.isCancel(error)) {
      return Promise.reject(error);
    } else if (!error.response) {
      return Promise.reject({
        code: NOT_CONNECT_NETWORK,
        message: NETWORK_CONNECTION_MESSAGE,
      });
    }
    return Promise.reject(error);
  }
);

export const httpClient = axios;

export const header = () => {
  const token = localStorage.getItem(TOKEN);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return config;
};
