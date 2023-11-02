/* eslint-disable no-unsafe-optional-chaining */
import { apiSlice } from "../service/apiSlice";

interface GroupData {
  url?: string;
  group_id?: number;
}

type GroupResponse = GroupData[];

export const invoicesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllInvoices: builder.query<GroupResponse, void>({
      query: ({ page, limit }: { page?: string; limit?: number }) => {
        let url = "/documents?search=type:invoice";
        if (page && limit) {
          url += `&page=${page}&limit=${limit}`;
        }
        return url;
      },
      providesTags: (result, error, arg) => {
        return result
          ? [
              ...result?.data?.map(({ id }) => ({ type: "Invoices", id })),
              "Invoices",
            ]
          : ["Invoices"];
      },
    }),
    getSingleInvoice: builder.query<GroupData, number>({
      query: (id) => ({
        url: `/documents/${id}?search=type:invoice`,
      }),
      providesTags: (result, error, id) => [{ type: "Invoices", id }],
    }),
  }),
});

export const { useGetAllInvoicesQuery, useGetSingleInvoiceQuery } =
  invoicesApiSlice;
