import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ROUTES, BASE_URL } from "../utils/routesNames";
import { WorkplaceResponse, WorkplaceValues } from "../types/workplaceTypes";
import { BoardResponse } from "../types/boardTypes";

export const workplaceApi = createApi({
  reducerPath: "workplaceApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Workplace"],
  endpoints: (builder) => ({
    createWorkplace: builder.mutation<WorkplaceResponse, WorkplaceValues>({
      query: (workplace) => ({
        url: API_ROUTES.WORKPLACE.CREATE,
        method: "POST",
        body: workplace,
      }),
      invalidatesTags: [{ type: "Workplace" }],
    }),
    fetchWorkplaces: builder.query<WorkplaceResponse[], void>({
      query: () => ({
        url: API_ROUTES.WORKPLACE.FETCH,
        method: "GET",
      }),
      providesTags: [{ type: "Workplace", id: "LIST" }],
    }),
    fetchWorkplaceById: builder.query<WorkplaceResponse, string>({
      query: (id) => API_ROUTES.WORKPLACE.FETCH_ONE(id),
      providesTags: (result, error, id) => [{ type: "Workplace", id }],
    }),
    fetchWorkplacesByUserId: builder.query<WorkplaceResponse[], string>({
      query: (userId) => API_ROUTES.WORKPLACE.FETCH_BY_USER(userId),
      providesTags: (result, error, id) => [{ type: "Workplace", id }],
    }),
    updateWorkplace: builder.mutation<
      WorkplaceResponse,
      { id: string; data: WorkplaceValues }
    >({
      query: ({ id, data }) => ({
        url: API_ROUTES.WORKPLACE.UPDATE(id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Workplace", id }],
    }),
    deleteWorkplace: builder.mutation<void, string>({
      query: (id) => ({
        url: API_ROUTES.WORKPLACE.DELETE(id),
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Workplace" }],
    }),
    fetchBoardsByWorkplaceId: builder.query<BoardResponse[], string>({
      query: (id) => API_ROUTES.WORKPLACE.FETCH_BOARDS(id),
      providesTags: (result, error, id) => [{ type: "Workplace", id }], // Change this to use Workplace
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useCreateWorkplaceMutation,
  useFetchWorkplacesQuery,
  useFetchWorkplaceByIdQuery,
  useFetchWorkplacesByUserIdQuery,
  useUpdateWorkplaceMutation,
  useDeleteWorkplaceMutation,
  useFetchBoardsByWorkplaceIdQuery,
} = workplaceApi;
