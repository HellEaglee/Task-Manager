import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ROUTES, BASE_URL } from "../utils/routesNames";
import { LabelResponse, LabelValues } from "../types/labelTypes";

export const labelApi = createApi({
  reducerPath: "labelApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Label"],
  endpoints: (builder) => ({
    createLabel: builder.mutation<LabelResponse, LabelValues>({
      query: (label) => ({
        url: API_ROUTES.LABEL.CREATE,
        method: "POST",
        body: label,
      }),
      invalidatesTags: [{ type: "Label" }],
    }),
  }),
});

export const { useCreateLabelMutation } = labelApi;
