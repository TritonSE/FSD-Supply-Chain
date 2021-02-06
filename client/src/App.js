import React from "react";

import { Router } from "@reach/router";
import Home from "./home/Home";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import "./App.css";

const App = () => {
  return (
    <Router className="App">
      <Home path="/" />
      <Login path="/login" />
      <Signup path="/signup" />
    </Router>
  );
};

export default App;
