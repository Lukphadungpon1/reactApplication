import React from "react";
import { store } from "../store/store";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = (props: any) => {
  const auth = store.getState().authReducer.token;
  return auth ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoutes;
