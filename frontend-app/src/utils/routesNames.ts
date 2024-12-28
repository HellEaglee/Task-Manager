export const BASE_URL = "http://localhost:3001";

export const API_ROUTES = {
  AUTH: {
    SIGNIN: "/auth/signin",
    SIGNUP: "/auth/signup",
  },
  WORKPLACE: {
    CREATE: "/workplaces",
    FETCH: "/workplaces",
    FETCH_ONE: (id: string) => `/workplaces/${id}`,
    FETCH_BY_USER: (userId: string) => `/users/${userId}/workplaces`,
    UPDATE: (id: string) => `/workplaces/${id}`,
    DELETE: (id: string) => `/workplaces/${id}`,
    FETCH_BOARDS: (id: string) => `/workplaces/${id}/boards`,
  },
  BOARD: {
    CREATE: "/boards",
    FETCH: "/boards",
    FETCH_ONE: (id: string) => `/boards/${id}`,
    UPDATE: (id: string) => `/boards/${id}`,
    DELETE: (id: string) => `/boards/${id}`,
    FETCH_CARDS: (id: string) => `/boards/${id}/cards`,
  },
  CARD: {
    CREATE: "/cards",
    FETCH: "/cards",
    FETCH_ONE: (id: string) => `/cards/${id}`,
    UPDATE: (id: string) => `/cards/${id}`,
    DELETE: (id: string) => `/cards/${id}`,
    FETCH_TASKS: (id: string) => `/cards/${id}/tasks`,
  },
  TASK: {
    CREATE: "/tasks",
    FETCH: "/tasks",
    FETCH_ONE: (id: string) => `/tasks/${id}`,
    UPDATE: (id: string) => `/tasks/${id}`,
    UPDATE_DESC: (id: string) => `tasks/${id}/newDesc`,
    UPDATE_DUE: (id: string) => `tasks/${id}/due`,
    DELETE: (id: string) => `/tasks/${id}`,
    MOVE: (taskId: string, newCardId: string) =>
      `/tasks/${taskId}/moveCard/${newCardId}`,
  },
  COMMENT: {
    CREATE: "/comments",
  },
  LABEL: {
    CREATE: "/labels",
  },
};
