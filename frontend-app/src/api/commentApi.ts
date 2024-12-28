import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ROUTES, BASE_URL } from "../utils/routesNames";
import { CommentResponse, CommentValues } from "../types/commentTypes";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Comment"],
  endpoints: (builder) => ({
    createComment: builder.mutation<CommentResponse, CommentValues>({
      query: (comment) => ({
        url: API_ROUTES.COMMENT.CREATE,
        method: "POST",
        body: comment,
      }),
      invalidatesTags: [{ type: "Comment" }],
    }),
  }),
});

export const { useCreateCommentMutation } = commentApi;
