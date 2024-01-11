import React from "react";
import { useAuth } from "../provider/AuthProvider";
import { Navigate } from "react-router-dom";
import { StayPage } from "../pages/stayPage/StayPage";

const AuthNavigator = ({ children }) => {
  const { isLogin } = useAuth();

  return isLogin ? children : <Navigate to="/signin" />;
};

export default AuthNavigator;
