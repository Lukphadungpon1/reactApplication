import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { store } from "../store/store";

const ProtectedRoutes = (props: any) => {
  const auth = store.getState().authReducer.token;
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
