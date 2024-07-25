import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance, Response } from "./axiosInstance";

export const HttpClient = {
  get<T>(url: string, option?: AxiosRequestConfig) {
    return axiosInstance.get<T, AxiosResponse<Response<T>>>(url, option);
  },
  post<T>(url: string, params: {}, option?: AxiosRequestConfig) {
    return axiosInstance.post<T, AxiosResponse<Response<T>>>(
      url,
      params,
      option
    );
  },
  patch<T>(url: string, params: {}) {
    return axiosInstance.patch<T, AxiosResponse<Response<T>>>(url, params);
  },
  delete<T>(url: string, params?: {}) {
    return axiosInstance.delete<T, AxiosResponse<Response<T>>>(url, params);
  },
};
