import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ROUTES, BASE_URL } from "../utils/routesNames";
import { CardResponse, CardValues } from "../types/cardTypes";
import { TaskResponse } from "../types/taskTypes";

export const cardsApi = createApi({
  reducerPath: "cardsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Cards"],
  endpoints: (builder) => ({
    fetchCards: builder.query<CardResponse[], void>({
      query: () => ({
        url: API_ROUTES.CARD.FETCH,
        method: "GET",
      }),
      providesTags: [{ type: "Cards", id: "LIST" }],
    }),
    fetchCardById: builder.query<CardResponse, string>({
      query: (id) => API_ROUTES.CARD.FETCH_ONE(id),
      providesTags: (result, error, id) => [{ type: "Cards", id }],
    }),
    fetchTasksByCardId: builder.query<TaskResponse[], string>({
      query: (id) => ({
        url: API_ROUTES.CARD.FETCH_TASKS(id),
        method: "GET",
      }),
      // providesTags: [{ type: "Cards", id }],
    }),
    createCards: builder.mutation<CardResponse, CardValues>({
      query: (card) => ({
        url: API_ROUTES.CARD.CREATE,
        method: "POST",
        body: card,
      }),
      invalidatesTags: [{ type: "Cards" }],
    }),
    updateCard: builder.mutation<
      CardResponse,
      { id: string; data: CardValues }
    >({
      query: ({ id, data }) => ({
        url: API_ROUTES.CARD.UPDATE(id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Cards", id }],
    }),
    deleteCard: builder.mutation<void, string>({
      query: (id) => ({
        url: API_ROUTES.CARD.DELETE(id),
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Cards" }],
    }),
  }),
});

export const {
  useCreateCardsMutation,
  useFetchCardsQuery,
  useFetchCardByIdQuery,
  useFetchTasksByCardIdQuery,
  useUpdateCardMutation,
  useDeleteCardMutation,
} = cardsApi;
