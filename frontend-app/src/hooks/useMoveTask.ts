import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";
import { useMoveTaskMutation } from "../api/taskApi";

export const useMoveTask = () => {
  const [moveTask, { isLoading }] = useMoveTaskMutation();

  const isFetchBaseQueryError = (
    error: unknown
  ): error is FetchBaseQueryError =>
    typeof error === "object" && error !== null && "status" in error;

  const isErrorWithMessage = (error: unknown): error is { message: string } =>
    typeof error === "object" && error !== null && "message" in error;

  const moveTaskHandler = async (taskId: string, newCardId: string) => {
    try {
      await moveTask({ taskId, newCardId }).unwrap();
      toast.success("Task moved successfully!");
    } catch (error: unknown) {
      if (isFetchBaseQueryError(error)) {
        toast.error("Failed to move the task.");
      } else if (isErrorWithMessage(error)) {
        toast.error(error.message || "An unknown error occurred.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return { moveTaskHandler, loading: isLoading };
};
