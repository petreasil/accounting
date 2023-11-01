import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  // to be done in .env
  baseUrl: "https://ak.contentcubed.com/api",
  credentials: "same-origin",
  mode: "cors",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("TOKEN");

    if (token) {
      headers.set("Authorization", `Basic  ${JSON.parse(token)}`);
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "*/*");
    }
    return headers;
  },
});

const baseQueryWithAuth = async (
  args: string,
  api: any,
  extraOptions: object
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403 || result?.error?.status === 401) {
    // To Do Logout if necessary
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({}),
  tagTypes: ["Login", "Bills"],
});
