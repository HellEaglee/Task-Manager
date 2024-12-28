import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { removeFromLocalStorage } from "../../utils/localStorageUtils";
import { User } from "../../types/commonTypes";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuth: boolean;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token"),
  isAuth: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{ user: any; token: string; isAuth: boolean }>
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = action.payload.isAuth;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuth = false;
      removeFromLocalStorage(["user", "token"]);
    },
    loadUserFromStorage(state) {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (user && token) {
        state.user = JSON.parse(user);
        state.token = token;
        state.isAuth = true;
      }
    },
  },
});

export const { loginSuccess, logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
