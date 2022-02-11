import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { authRefreshService } from "../service/authService";
import { getToken } from "../utils/getToken";
import { validateResponse } from "../utils/validateResponse";

const axiosInstance = () => {
  const defaultConfig: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  };

  let instance = axios.create(defaultConfig);
  instance.interceptors.response.use(handleSuccess, handleError);
  instance.interceptors.request.use(handleRequest);
  return instance;
};

const handleRequest = (config: AxiosRequestConfig) => {
  const token = getToken();
  if (!config.headers) config.headers = {};
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
};

const handleSuccess = (response: AxiosResponse<any>) => response;

export const subscribeTokenRefresh = (
  subscribers: Array<(value: string) => void>,
  cb: (value: string) => void
) => {
  subscribers.push(cb);
};

export const onRrefreshed = (
  subscribers: Array<(value: string) => void>,
  token: string
) => {
  subscribers.map((cb) => cb(token));
};

const handleError = (config: any) => {
  let isRefreshing = false;
  const originalRequest = config;
  let subscribers: Array<(value: string) => void> = [];
  if (config.response?.status === 409) {
    if (!isRefreshing) {
      isRefreshing = true;
      authRefreshService().then((res: any) => {
        isRefreshing = false;
        onRrefreshed(subscribers, res.accessToken);
      });
    }
    const requestSubscribers = new Promise((resolve) => {
      subscribeTokenRefresh(subscribers, (token: string) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        resolve(axios(originalRequest));
      });
    });
    return requestSubscribers;
  }
  validateResponse(config.response?.status);
  return Promise.reject(config);
};

export default axiosInstance();
