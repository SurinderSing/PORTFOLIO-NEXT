import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (formData) => ({
        url: '/user/sign-up',
        method: 'POST',
        body: formData,
      }),
    }),
    // You can add more queries/mutations here
  }),
});

export const { useSignUpMutation } = userApi;
