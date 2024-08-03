import { HttpError } from "@refinedev/core";
import axios, { AxiosResponse } from "axios";
// import { getCookie } from "cookies-next";

export interface Response<T = any> {
  data: T;
  message?: string;
  status: number;
}

const axiosInstance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  baseURL: "https://api.fake-rest.refine.dev",
  timeout: 60 * 1000,
  // withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

let refreshTokenPromise: null | Promise<any> = null;
axiosInstance.interceptors.response.use(
  <T>(response: AxiosResponse<Response<T>>): AxiosResponse<Response<T>> => {
    return { ...response, data: response.data };
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status !== 401 || originalRequest._retry) {
      const customError: HttpError = {
        ...error,
        message: error.response?.data?.message,
        statusCode: error.response?.status,
      };

      return Promise.reject(customError);
    }
    originalRequest._retry = true;
    if (!refreshTokenPromise) {
      refreshTokenPromise = refreshToken().finally(() => {
        refreshTokenPromise = null;
      });
    }

    try {
      await refreshTokenPromise;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }
);

const refreshToken = async () => {
  try {
    const response = await axios.post(
      "/auth/refresh",
      {},
      { withCredentials: true }
    );
    return response.data.access_token;
  } catch (error) {
    throw error;
  }
};

export { axiosInstance };
