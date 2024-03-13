import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ children }) {
    const auth = true;
    return auth ? <>{children}</> : <Navigate to="/login" />;
  }