import { apiSlice } from "../../app/api";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Get List of products
    getProducts: builder.query({
      query: () => ({
        url: "/products",
      }),
    }),

    //Get product by Id
    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
