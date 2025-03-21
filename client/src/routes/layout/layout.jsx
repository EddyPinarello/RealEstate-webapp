import "./layout.scss";
import Navbar from "../../components/navbar/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useContext, useDebugValue, useEffect } from "react";
import { AuthContext } from "../../context/authContext";

function Layout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

function RequireAuth() {
  const { currentUser } = useContext(AuthContext);

  return !currentUser ? (
    <Navigate to="/" />
  ) : (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export { Layout, RequireAuth };
