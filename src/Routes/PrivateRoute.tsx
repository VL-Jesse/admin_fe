import { Navigate } from "react-router-dom";
import { store } from "../app/store";
import { useAuthHook } from "../Hook/useAuthHook";
import { getToken } from "../utils/getToken";
import { path } from "./path";

export const PrivateRoute = ({ children }: any) => {
    const authHook = useAuthHook()
    const token = getToken();
    const tokenExpiration =  store.getState().auth.data?.tokenExpiration
    const isRefreshing =  store.getState().auth.isRefreshing
    const now =  new Date()
    const expiration =  new Date(tokenExpiration ?? "" )

    if(( now >= expiration) ){
      authHook.updateStore()
      return children
    }
    if(!token && isRefreshing){
      authHook.removeUser()
      return <Navigate to={path.LOGIN} />
    }


    return token ? children : <Navigate to={path.LOGIN} />;
  };