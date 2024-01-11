import React, { useState, createContext, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const token = sessionStorage.getItem("userToken");
  const isUserLoggedIn = token ? true : false;
  const [isLogin, setIsLogin] = useState(isUserLoggedIn);
  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
