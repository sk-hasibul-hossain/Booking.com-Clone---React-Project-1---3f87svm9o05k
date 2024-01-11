import React, { useRef, useState } from "react";
import "./Signup.css";
import CommonNav from "../signinSignupNavbar/CommonNav";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const reEnterPasswordRef = useRef();

  const [isPassError, setIsPassError] = useState(false);
  const [isUserExist, setIsUserExist] = useState(false);
  const navigate = useNavigate();

  const createUser = async (userDetails) => {
    // const user = JSON.stringify(userDetails);
    try {
      const config = {
        headers: { projectID: "3f87svm9o05k" },
      };
      const appType = {
        appType: "bookingportals",
      };
      console.log({ ...userDetails, ...appType }, config);
      const response = await axios.post(
        "https://academics.newtonschool.co/api/v1/bookingportals/signup",
        { ...userDetails, ...appType },
        config
      );
      const data = response.data;
      const token = data.token;
      if (token) {
        sessionStorage.setItem("userToken", token);
        sessionStorage.setItem("userName", JSON.stringify(data.data.user.name));
        navigate("/");
      } else {
        setIsUserExist(true);
      }
      // if(token)
      // sessionStorage.setItem("userToken", "abcx$ntr");
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userNameRef.current.value) {
      userNameRef.current.focus();
      userNameRef.current.border = "1px solid red";
    } else if (!emailRef.current.value) {
      emailRef.current.focus();
      emailRef.current.style.border = "1px solid red";
    } else if (!passwordRef.current.value) {
      passwordRef.current.focus();
      passwordRef.current.style.border = "1px solid red";
    } else if (!reEnterPasswordRef.current.value) {
      reEnterPasswordRef.current.focus();
      reEnterPasswordRef.current.style.border = "1px solid red";
    } else if (passwordRef.current.value !== reEnterPasswordRef.current.value) {
      passwordRef.current.focus();
      passwordRef.current.style.border = "1px solid red";
      reEnterPasswordRef.current.focus();
      reEnterPasswordRef.current.style.border = "1px solid red";
      setIsPassError(true);
    } else {
      const userDetails = {
        name: userNameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      createUser(userDetails);
    }
  };
  return (
    <div>
      <CommonNav />
      <div className="signup-container">
        <div className="inner-signup-container">
          <h1>Register your new account</h1>
          <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your Email Address"
              ref={userNameRef}
            />
            <label>Email address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email Address"
              ref={emailRef}
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              ref={passwordRef}
            />
            <label>Re-enter your password</label>
            <input
              type="password"
              name="re-enter-password"
              placeholder="Enter your password"
              ref={reEnterPasswordRef}
            />
            {isPassError && (
              <p className="error">Please make sure your password match</p>
            )}
            {isUserExist && <p className="error">User Already Exist</p>}
            <button className="btn">Create your account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
