import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  if (!isAuth) {
    return <Navigate to="/auth/login" />;
  }
  return children;
};
