import { apiSlice } from "../service/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.query({
      query: (credentials) => {
        return {
          url: "/ping",
          headers: {
            Authorization: `Basic ${btoa(
              credentials.email + ":" + credentials.password
            )}`,
          },
        };
      },
    }),
  }),
});

export const { useLoginQuery } = authApiSlice;
