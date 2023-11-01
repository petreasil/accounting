import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  // to be done in .env
  baseUrl: "https://ak.contentcubed.com/api",
  //credentials: "include",
  prepareHeaders: (headers) => {
    headers.set("Accept", "*/*");
    headers.set("Content-Type", "application/json");

    const token = localStorage.getItem("TOKEN");

    if (token) {
      headers.set("Authorization", `Basic  ${JSON.parse(token)}`);
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
  tagTypes: [],
});
