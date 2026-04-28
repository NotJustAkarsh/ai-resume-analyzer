import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Loader from "../../../components/common/Loader";

import React from "react";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return <Loader text="Authenticating..." />;
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default Protected;
