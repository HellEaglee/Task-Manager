import { AuthResponse } from "../types/authTypes";

export const saveToLocalStorage = (data: AuthResponse) => {
  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
};

export const removeFromLocalStorage = (keys: string[]) => {
  keys.forEach((key) => localStorage.removeItem(key));
};
