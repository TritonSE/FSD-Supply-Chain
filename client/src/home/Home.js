import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { navigate } from "@reach/router";

import AddButton from "./add_button/AddButton";
import Sidebar from "./sidebar/Sidebar";

const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const logout = () => {
    removeCookie("token");
    navigate("/login");
  };

  useEffect(() => {
    if (!cookies.token) {
      navigate("/login");
    }
  }, [cookies.token]);

  return (
    <div>
      <AddButton />
      <Sidebar />
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
