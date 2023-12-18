import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function ({ children, userRoles = [] }) {
  const auth = useSelector((state) => state.auth);
  const location = useLocation();

  const isAuth =
    !auth?.authenticated ||
    (userRoles.length > 0 &&
      !userRoles?.some((role) => auth?.user?.roles?.includes(role)));

  return isAuth ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    children
  );
}
