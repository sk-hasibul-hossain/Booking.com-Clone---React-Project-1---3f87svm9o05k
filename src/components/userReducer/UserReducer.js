import React, { useReducer } from "react";

const initialState = false;

const reducer = (state, action) => {
  if (action.type === "signin") {
    return true;
  } else if (action.type === "signout") {
    return false;
  } else {
    return state;
  }
};

const userReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
};

export const signIn = () => {
  const { dispatch } = userReducer();
  dispatch({ type: "signin" });
};

export const signOut = () => {
  const { dispatch } = userReducer();
  dispatch({ type: "signout" });
};

export const isLogin = () => {
  const { state } = userReducer();
  return state;
};
