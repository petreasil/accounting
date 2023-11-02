/* eslint-disable no-unsafe-optional-chaining */
import { apiSlice } from "../service/apiSlice";

interface GroupData {
  url?: string;
  group_id?: number;
}

type GroupResponse = GroupData[];

export const billsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBills: builder.query<GroupResponse, void>({
      query: ({ page, limit }: { page?: string; limit?: number }) => {
        let url = "/documents?search=type:bill";
        if (page && limit) {
          url += `&page=${page}&limit=${limit}`;
        }
        return url;
      },
      providesTags: (result, error, arg) => {
        return result
          ? [...result?.data?.map(({ id }) => ({ type: "Bills", id })), "Bills"]
          : ["Bills"];
      },
    }),
    getSingleBill: builder.query<GroupData, number>({
      query: (id) => ({
        url: `/documents/${id}?search=type:bill`,
      }),
      providesTags: (result, error, id) => [{ type: "Bills", id }],
    }),
  }),
});

export const { useGetAllBillsQuery, useGetSingleBillQuery } = billsApiSlice;
