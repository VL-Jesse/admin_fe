import { path } from "../Routes/path";
import { IResponseError, IResponseMessages } from "./responseType";

export interface IAuth {
  status: 'idle' | 'loading' | 'failed';
  data: IResponseValue | null | undefined
  isRefreshing: boolean
}

export interface ILoginResponse {
  success: boolean;
  errors: IResponseError[];
  messages: IResponseMessages[];
  value: IResponseValue;
}

export interface IAuthParams {
  email: string;
  password: string;
}

export interface IResponseValue {
  id: string,
  userName: string;
  email: string;
  roles: string[];
  accessToken: string;
  tokenExpiration:  string;
  refreshToken: string;
  complimentaryEndDate: string;
}

export interface IAuthRoles {
  email: string;
  password: string;
}

