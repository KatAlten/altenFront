import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const base_url = "http://localhost:8080/api/";
export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
  }),

  endpoints: () => ({}),
});

export const { reducer, middleware } = apiSlice;
