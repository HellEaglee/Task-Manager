import React, { useState } from "react";
import { useCreateCommentMutation } from "../../../api/commentApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { toggleRefresh } from "../../../store/slices/cardSlice";

interface AddCommentProps {
  taskId: string;
}

const AddComment: React.FC<AddCommentProps> = ({ taskId }) => {
  const [comment, setComment] = useState<string>("");
  const userid = useSelector((state: RootState) => state.auth.user?.id);
  const [createComment, { isLoading }] = useCreateCommentMutation();

  const dispatch = useDispatch();

  if (!userid) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.length < 1) {
      toast.error("Введите комментарий");
      return;
    }
    try {
      await createComment({
        description: comment,
        user_id: userid,
        task_id: taskId,
      });
      setComment("");
      dispatch(toggleRefresh());
      toast.success("Комментарий оставлен!");
    } catch (err) {
      console.error("Failed to comment", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Напиши комментарий"
        className="w-full h-8 text-sm text-graysilver font-normal bg-transparent border-[0.0625rem] border-graysilver rounded-md placeholder:text-graysecondary"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="flex justify-center items-center bg-graysecondary h-8 px-3 text-sm text-graysilver font-normal rounded-md duration-200 hover:brightness-125"
      >
        Отправить
      </button>
    </form>
  );
};

export default AddComment;
