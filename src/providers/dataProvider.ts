import { HttpClient } from "@api/httpClient";
import type { BaseKey, DataProvider } from "@refinedev/core";

export const appDataProvider = (): DataProvider =>
  ({
    getOne: async ({ resource, id }) => {
      const url = `${resource}/${id}`;
      const response = await HttpClient.get(url);
      return { data: response.data };
    },

    getList: async ({ resource, pagination, filters, sorters, meta }) => {
      const url = `/${resource}`;
      const response = await HttpClient.get(url);
      return { data: response.data.data };
    },

    create: async (params: { resource: string; variables: {}; meta?: any }) => {
      const { resource, variables } = params;
      const url = `/${resource}`;
      const response = await HttpClient.post(url, variables);
      return { data: response.data.data };
    },

    update: async (params: {
      resource: string;
      id: BaseKey;
      variables: {};
      meta?: any;
    }) => {
      const { resource, id, variables } = params;
      const response = await HttpClient.patch(`/${resource}/${id}`, variables);
      return { data: response.data.data };
    },
  } as DataProvider);
