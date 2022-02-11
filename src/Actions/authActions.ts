import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAuthParams } from "../interface/authType";
import { authService, authRefreshService } from "../service/authService";

export const authLogin = createAsyncThunk(
    "auth/login",
    async (data: IAuthParams ) => {
      const response = await authService(data);
      sessionStorage.setItem("token", response.accessToken)
      return response;
    }
  );
  
  export const refreshingLogin = createAsyncThunk(
    "auth/refresh",
    async () => {
      try {
        const response = await authRefreshService();
        if(response?.accessToken){
          sessionStorage.setItem("token", response.accessToken)
          return response;
        }
      } catch (err) {
        return null;
      }
    }
  );