import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import workplaceReducer from "./slices/workplacesSlice";
import cardReducer from "./slices/cardSlice";
import { signinApi } from "../api/authApi";
import { workplaceApi } from "../api/workplaceApi";
import { boardsApi } from "../api/boardApi";
import { cardsApi } from "../api/cardApi";
import { taskApi } from "../api/taskApi";
import { commentApi } from "../api/commentApi";
import { labelApi } from "../api/labelApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [signinApi.reducerPath]: signinApi.reducer,
    workplace: workplaceReducer,
    [workplaceApi.reducerPath]: workplaceApi.reducer,
    [boardsApi.reducerPath]: boardsApi.reducer,
    [cardsApi.reducerPath]: cardsApi.reducer,
    card: cardReducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [labelApi.reducerPath]: labelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(signinApi.middleware)
      .concat(workplaceApi.middleware)
      .concat(boardsApi.middleware)
      .concat(cardsApi.middleware)
      .concat(taskApi.middleware)
      .concat(commentApi.middleware)
      .concat(labelApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
