import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import { useAuth } from "../AuthContext";
import Navbar from "./Navbar";
import Header from "./Header";
import Registration from "../pages/Registration/Registration";
import MyAccount from "../pages/MyAccount/MyAccount";
import { useAppState } from "../StateContext";
export const RouterWrapper = () => {
  const { isLogged } = useAuth();
  const { appState } = useAppState();

  return (
    <Router>
      <div
        className="df"
        style={{
          height: "100%",
        }}
      >
        {isLogged ? <Navbar /> : null}
        <div
          className="df col"
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <Header />

          {isLogged ? (
            <div
              style={{
                marginLeft: appState.sidebar.isOpen ? "200px" : "100px",
              }}
            >
              <Routes>
                <Route path="*" Component={Dashboard} />
                <Route path="/my-account" Component={MyAccount} />
              </Routes>
            </div>
          ) : (
            <Routes>
              <Route path="*" Component={Registration} />
            </Routes>
          )}
        </div>
      </div>
    </Router>
  );
};
