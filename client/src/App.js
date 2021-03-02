import React from "react";

import { Router } from "@reach/router";
import Home from "./home/Home";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ResetPassword from "./auth/ResetPassword";
import ForgotPassword from "./auth/ForgotPassword";
import "./App.css";

const App = () => {
  return (
    <Router className="App">
      <Home path="/" />
      <Login path="/login" />
      <Signup path="/signup" />
      <ResetPassword path="/reset/:token" />
      <ForgotPassword path="/forgot" />
    </Router>
  );
};

export default App;
