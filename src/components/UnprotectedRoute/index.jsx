import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ({ children, unprotected = false }) {
  const auth = useSelector((state) => state.auth);

  const userRoles = auth.user?.roles || [];

  return unprotected || !auth?.authenticated ? (
    children
  ) : userRoles.includes("Admin") ? (
    <Navigate to="/admin" replace />
  ) : userRoles.includes("Beautician") ? (
    <Navigate to="/beautician" replace />
  ) : userRoles.includes("Online Customer") ? (
    <Navigate to="/onlineCustomer" replace />
  ) : userRoles.includes("Walk-in Customer") ? (
    <Navigate to="/walkInCustomer" replace />
  ) : (
    <Navigate to="/" replace />
  );
}
