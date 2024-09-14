import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuth } from "../utils/Auth";

const PrivateRoute = () => {
  return isAuth() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
