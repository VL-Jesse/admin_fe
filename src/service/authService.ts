import axiosInstance from "../Axios/axiosInstance";
import { Notification } from "../Components/Notification";
import { IAuthParams, IResponseValue } from "../interface/authType";

export const authService = async (authData: IAuthParams) => {
  const data = await axiosInstance.post("api/auth/admin-login", authData);
  return data.data.value as IResponseValue;
};

export const authRefreshService = async () => {
  try{
    const data = await axiosInstance.post("/api/auth/refresh-access-token")
    sessionStorage.setItem("token", data.data.value.accessToken)
    return data.data.value as IResponseValue;
  } catch(e){
    Notification({title: "Danger", message:"You need login again to continue", type: "danger"});
    sessionStorage.clear();
    return
  }
};
