import React from "react";
import { useAuth } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { StayPage } from "../pages/stayPage/StayPage";

const AuthNavigator = ({ children }) => {
  const { isLogin } = useAuth();
  const { pathname } = useLocation();

  return isLogin ? (
    children
  ) : (
    <Navigate to="/signin" state={{ prevPath: pathname }} />
  );
};

export default AuthNavigator;
