import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ROUTES, BASE_URL } from "../utils/routesNames";
import { TaskResponse, TaskValues } from "../types/taskTypes";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    fetchTasks: builder.query<TaskResponse[], void>({
      query: () => ({
        url: API_ROUTES.TASK.FETCH,
        method: "GET",
      }),
      providesTags: [{ type: "Tasks", id: "LIST" }],
    }),
    fetchTaskById: builder.query<TaskResponse, string>({
      query: (id) => API_ROUTES.TASK.FETCH_ONE(id),
      providesTags: (result, error, id) => [{ type: "Tasks", id }],
    }),
    createTasks: builder.mutation<TaskResponse, TaskValues>({
      query: (Task) => ({
        url: API_ROUTES.TASK.CREATE,
        method: "POST",
        body: Task,
      }),
      invalidatesTags: [{ type: "Tasks" }],
    }),
    updateTask: builder.mutation<
      TaskResponse,
      { id: string; data: TaskValues }
    >({
      query: ({ id, data }) => ({
        url: API_ROUTES.TASK.UPDATE(id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Tasks", id }],
    }),
    updateDesc: builder.mutation<
      TaskResponse,
      { id: string; description: string }
    >({
      query: ({ id, description }) => ({
        url: API_ROUTES.TASK.UPDATE_DESC(id),
        method: "PUT",
        body: { description },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Tasks", id }],
    }),
    updateDueDate: builder.mutation<
      TaskResponse,
      { id: string; dueDate: string }
    >({
      query: ({ id, dueDate }) => ({
        url: API_ROUTES.TASK.UPDATE_DUE(id),
        method: "PUT",
        body: { due: dueDate },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Tasks", id }],
    }),
    moveTask: builder.mutation<void, { taskId: string; newCardId: string }>({
      query: ({ taskId, newCardId }) => ({
        url: API_ROUTES.TASK.MOVE(taskId, newCardId),
        method: "PUT",
      }),
      invalidatesTags: [{ type: "Tasks" }],
    }),
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: API_ROUTES.TASK.DELETE(id),
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Tasks" }],
    }),
  }),
});

export const {
  useFetchTasksQuery,
  useFetchTaskByIdQuery,
  useCreateTasksMutation,
  useUpdateTaskMutation,
  useUpdateDescMutation,
  useUpdateDueDateMutation,
  useMoveTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
