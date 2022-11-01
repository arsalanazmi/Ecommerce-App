import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  return (
    <Fragment>
      {!loading &&
        (isAuthenticated === false ? <Navigate to="/login" /> : <Outlet />)}
    </Fragment>
  );
};

export default ProtectedRoute;
