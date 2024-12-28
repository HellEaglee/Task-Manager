import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ROUTES, BASE_URL } from "../utils/routesNames";
import { BoardResponse, BoardValues } from "../types/boardTypes";
import { CardResponse } from "../types/cardTypes";

export const boardsApi = createApi({
  reducerPath: "boardsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Board"],
  endpoints: (builder) => ({
    createBoard: builder.mutation<BoardResponse, BoardValues>({
      query: (board) => ({
        url: API_ROUTES.BOARD.CREATE,
        method: "POST",
        body: board,
      }),
      invalidatesTags: [{ type: "Board" }],
    }),
    fetchBoards: builder.query<BoardResponse[], void>({
      query: () => ({
        url: API_ROUTES.BOARD.FETCH,
        method: "GET",
      }),
      providesTags: [{ type: "Board", id: "LIST" }],
    }),
    fetchBoardById: builder.query<BoardResponse, string>({
      query: (id) => API_ROUTES.BOARD.FETCH_ONE(id),
      providesTags: (result, error, id) => [{ type: "Board", id }],
    }),
    fetchCardsByBoardId: builder.query<CardResponse[], string>({
      query: (id) => API_ROUTES.BOARD.FETCH_CARDS(id),
      providesTags: (result, error, id) => [{ type: "Board", id }],
    }),
    updateBoard: builder.mutation<
      BoardResponse,
      { id: string; data: BoardValues }
    >({
      query: ({ id, data }) => ({
        url: API_ROUTES.BOARD.UPDATE(id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Board", id }],
    }),
    deleteBoard: builder.mutation<void, string>({
      query: (id) => ({
        url: API_ROUTES.BOARD.DELETE(id),
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Board" }],
    }),
  }),
});

export const {
  useCreateBoardMutation,
  useFetchBoardsQuery,
  useFetchBoardByIdQuery,
  useFetchCardsByBoardIdQuery,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} = boardsApi;
