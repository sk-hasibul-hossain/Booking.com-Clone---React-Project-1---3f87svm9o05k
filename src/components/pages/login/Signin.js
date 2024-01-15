import React, { useState, useRef } from "react";
import "./Signin.css";
import CommonNav from "../signinSignupNavbar/CommonNav";
import axios from "axios";
import { getHeaderWithProjectID } from "../../../utills/services";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";

const Signin = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isEmailPasswordCorrect, setIsEmailPasswordCorrect] = useState(true);
  const [ispasswordHide, setIspasswordHide] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { setIsLogin } = useAuth();

  const loginUser = async (userDetails) => {
    try {
      const config = getHeaderWithProjectID();
      const appType = {
        appType: "bookingportals",
      };
      // console.log({ ...userDetails, ...appType }, config);
      const response = await axios.post(
        "https://academics.newtonschool.co/api/v1/bookingportals/login",
        { ...userDetails, ...appType },
        config
      );
      const data = response.data;
      const token = data.token;
      if (token) {
        sessionStorage.setItem("userToken", token);
        sessionStorage.setItem("userName", JSON.stringify(data.data.name));
        setIsLogin(true);
        // ispasswordHide(false);
        if (state) {
          navigate(state.prevPath);
        } else {
          navigate("/");
        }
        // navigate("/");
      }
    } catch (err) {
      console.log("err", err);
      setIsEmailPasswordCorrect(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailRef.current.value) {
      emailRef.current.focus();
      emailRef.current.style.border = "1px solid red";
    } else if (!passwordRef.current.value) {
      passwordRef.current.focus();
      passwordRef.current.style.border = "1px solid red";
    } else {
      const userDetails = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      loginUser(userDetails);
    }
  };

  const handlePassowrdShowHide = () => {
    setIspasswordHide((prev) => !prev);
  };
  return (
    <div>
      <CommonNav />
      <div className="signin-container">
        <div className="inner-signin-container">
          <h1>Sign in your account</h1>
          <form onSubmit={handleSubmit}>
            <label>Email address</label>
            <input
              type="email"
              placeholder="Enter your Email Address"
              ref={emailRef}
            />
            <label>Password</label>
            <div className="user-password-input">
              <input
                type={ispasswordHide ? "text" : "password"}
                placeholder="Enter your password"
                ref={passwordRef}
              />
              <span onClick={handlePassowrdShowHide}>
                {!ispasswordHide ? "Show" : "Hide"}
              </span>
            </div>
            {!isEmailPasswordCorrect && (
              <p className="error">Email or password is incorrect</p>
            )}
            <button className="btn">Sign In</button>
          </form>
          <button
            className="btn"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Create your account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
