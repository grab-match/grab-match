import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import queryString from "qs";
import { camelizeKeys, decamelizeKeys } from "humps";
import { ROUTE_PATHS } from "@/components/views/route";
import { setAccessToken } from "@/utils/api";
import cookies from "react-cookies";

const client = axios.create({
  baseURL: "https://ef49-103-111-210-26.ngrok-free.app",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": true,
  },
});

const handleUnAuthorized = async () => {
  setAccessToken(null);
  localStorage.clear();
  window.location.href = ROUTE_PATHS.AUTH.SIGNIN;
};

client.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const token = cookies.load("accessToken");

    config.paramsSerializer = (params) => {
      return queryString.stringify(params, { indices: false });
    };

    const newConfig = { ...config };

    if (config.params) {
      const newParams = { ...config.params };
      // eslint-disable-next-line array-callback-return
      Object.keys(newParams).map((key) => {
        // eslint-disable-next-line no-unused-expressions
        !newParams[key] && delete newParams[key];
      });
      newConfig.params = decamelizeKeys(newParams);
    }

    if (config.data) {
      newConfig.data = decamelizeKeys(config.data);
    }

    if (token) {
      newConfig.headers.Authorization = `Bearer ${token}`;
    }

    return newConfig;
  },
  (error: any) => {
    if (
      error?.response?.status === 401 &&
      window.location.pathname !== ROUTE_PATHS.AUTH.SIGNIN
    ) {
      handleUnAuthorized();
    }

    const errorMessage =
      error?.response?.data?.message ??
      error?.response?.data ??
      error?.response ??
      error?.message ??
      error?.response?.statusText ??
      error?.response?.status ??
      error?.message ??
      "Something went wrong";

    /** TOAST ERROR HERE */

    throw {
      ...(error?.response?.data ?? error?.response ?? error),
      status: error?.response?.status,
    };
  }
);

client.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    const newResponse = { ...response };

    if (newResponse?.data) {
      newResponse.data = camelizeKeys(newResponse.data);
    }

    return newResponse;
  },
  (error: any) => {
    if (
      error?.response?.status === 401 &&
      window.location.pathname !== ROUTE_PATHS.AUTH.SIGNIN
    ) {
      handleUnAuthorized();
    }

    const errorMessage =
      error?.response?.data?.message ??
      error?.response?.data ??
      error?.response ??
      error?.message ??
      error?.response?.statusText ??
      error?.response?.status ??
      error?.message ??
      "Something went wrong";

    /** TOAST ERROR HERE */

    throw {
      ...(error?.response?.data ?? error?.response ?? error),
      status: error?.response?.status,
    };
  }
);

export default client;
