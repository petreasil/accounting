import { apiSlice } from "../service/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => {
        return {
          method: "GET",
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

export const { useLoginMutation } = authApiSlice;
