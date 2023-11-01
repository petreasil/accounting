import React from "react";
import { useAppSelector } from "../../hooks/hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const isLogin = useAppSelector((state) => state?.auth?.isLogin);
  const location = useLocation();

  if (!isLogin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default RequireAuth;
