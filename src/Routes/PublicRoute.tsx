import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../app/store";
import { path } from "./path";

export const PublicRoute = ({ children }: any) => {
    const authToken = useSelector((state: RootState ) => state.auth.data?.accessToken)
    return !authToken ? children : <Navigate to={path.HOME} />;
  };