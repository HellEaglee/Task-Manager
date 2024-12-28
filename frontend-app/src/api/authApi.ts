import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ROUTES, BASE_URL } from "../utils/routesNames";
import { AuthResponse, SignInValues } from "../types/authTypes";

export const signinApi = createApi({
  reducerPath: "signinApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    signin: builder.mutation<AuthResponse, SignInValues>({
      query: (credentials) => ({
        url: API_ROUTES.AUTH.SIGNIN,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: [{ type: "Auth" }],
    }),
    signup: builder.mutation<AuthResponse, SignInValues>({
      query: (credentials) => ({
        url: API_ROUTES.AUTH.SIGNUP,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: [{ type: "Auth" }],
    }),
  }),
});

export const { useSigninMutation, useSignupMutation } = signinApi;
