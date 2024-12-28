import { useDispatch } from "react-redux";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SignInValues } from "../types/authTypes";
import { saveToLocalStorage } from "../utils/localStorageUtils";
import { loginSuccess, logout } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { useSigninMutation } from "../api/authApi";

export const useAuth = () => {
  const [signIn, { isLoading }] = useSigninMutation();
  const dispatch = useDispatch();

  const isFetchBaseQueryError = (
    error: unknown
  ): error is FetchBaseQueryError =>
    typeof error === "object" && error !== null && "status" in error;

  const isErrorWithMessage = (error: unknown): error is { message: string } =>
    typeof error === "object" && error !== null && "message" in error;

  const signInAuth = async (values: SignInValues) => {
    try {
      const data = await signIn(values).unwrap();
      saveToLocalStorage({
        user: data.user,
        token: data.token,
      });
      dispatch(
        loginSuccess({ user: data.user, token: data.token, isAuth: true })
      );
      toast.success("Авторизация прошла успешно!");
    } catch (error: unknown) {
      dispatch(logout());
      if (isFetchBaseQueryError(error)) {
        toast.error("Неверные данные.");
      } else if (isErrorWithMessage(error)) {
        toast.error(error.message || "Неизвестная ошибка");
      } else {
        toast.error("Произошла неизвестная ошибка");
      }
    }
  };

  return { signInAuth, loading: isLoading };
};
