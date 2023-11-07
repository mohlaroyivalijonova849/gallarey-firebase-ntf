import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ childern }) {
  const user = useSelector((state) => state.like);
  if (user) {
    return childern;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoutes;
