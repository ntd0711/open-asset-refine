import { HttpError } from "@refinedev/core";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

export interface Response<T = any> {
  data: T;
  message?: string;
  status: number;
}

const axiosInstance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  baseURL: "https://api.fake-rest.refine.dev",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60 * 1000,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  <T>(response: AxiosResponse<Response<T>>): AxiosResponse<Response<T>> => {
    return { ...response, data: response.data };
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  }
);

export { axiosInstance };
