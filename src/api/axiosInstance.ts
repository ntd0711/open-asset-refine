import { HttpError } from "@refinedev/core";
import axios, { AxiosResponse } from "axios";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

export interface Response<T = any> {
  data: T;
  message?: string;
  status: number;
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // baseURL: "https://api.fake-rest.refine.dev",
  timeout: 60 * 1000,
});

let lastSession: Session | null = null;

axiosInstance.interceptors.request.use(
  async (config) => {
    const isLastSessionExpired =
      lastSession == null || Date.now() > Date.parse(lastSession.expires);
    if (isLastSessionExpired) {
      const session = await getSession();
      lastSession = session;
    }

    if (lastSession) {
      config.headers["Authorization"] = `Bearer ${lastSession.access_token}`;
    } else {
      config.headers["Authorization"] = undefined;
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
