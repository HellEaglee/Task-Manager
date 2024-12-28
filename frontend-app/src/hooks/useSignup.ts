import { useDispatch } from "react-redux";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { saveToLocalStorage } from "../utils/localStorageUtils";
import { loginSuccess, logout } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { useSignupMutation } from "../api/authApi";
import { SignInValues } from "../types/authTypes";

export const useSignup = () => {
  const [signup, { isLoading }] = useSignupMutation();
  const dispatch = useDispatch();

  const isFetchBaseQueryError = (
    error: unknown
  ): error is FetchBaseQueryError =>
    typeof error === "object" && error !== null && "status" in error;

  const isErrorWithMessage = (error: unknown): error is { message: string } =>
    typeof error === "object" && error !== null && "message" in error;

  const signUpAuth = async (values: SignInValues) => {
    try {
      const data = await signup(values).unwrap();
      saveToLocalStorage({
        user: data.user,
        token: data.token,
      });
      dispatch(
        loginSuccess({ user: data.user, token: data.token, isAuth: true })
      );
      toast.success("Регистрация прошла успешно!");
    } catch (error: unknown) {
      dispatch(logout());
      if (isFetchBaseQueryError(error)) {
        toast.error("Ошибка регистрации.");
      } else if (isErrorWithMessage(error)) {
        toast.error(error.message || "Неизвестная ошибка");
      } else {
        toast.error("Произошла неизвестная ошибка");
      }
    }
  };

  return { signUpAuth, loading: isLoading };
};
