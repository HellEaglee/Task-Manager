import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { TaskResponse } from "../../../types/taskTypes";
import LabelCard from "./LabelCard";
import CommentCard from "./CommentCard";
import AddComment from "./AddComment";
import AddDescription from "./AddDescription";
import AddLabel from "./AddLabel";
import CalendarCard from "./CalendarCard/CalendarCard";
import { useDeleteTaskMutation } from "../../../api/taskApi";
import { useDispatch } from "react-redux";
import { toggleRefresh } from "../../../store/slices/cardSlice";
import { toast } from "react-toastify";

interface TaskModalPageProps {
  isOpen: boolean;
  onClose: () => void;
  task: TaskResponse | null;
}

Modal.setAppElement("#root");

const TaskModalPage: React.FC<TaskModalPageProps> = ({
  isOpen,
  onClose,
  task,
}) => {
  const [showLabel, setShowLabel] = useState<boolean>(false);
  const dispatch = useDispatch();

  const [deleteTask] = useDeleteTaskMutation();

  const handleDelete = async () => {
    if (!task || task.id === null) {
      return;
    }
    try {
      await deleteTask(task.id);
      dispatch(toggleRefresh());
      onClose();
      toast.success("Задание удалено.");
    } catch (err) {
      console.error("Failed to delete card:", err);
    }
  };

  if (!task) {
    return null;
  }

  const handleShow = () => {
    setShowLabel((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".dropdown-trigger") &&
        !target.closest(".dropdown-menu")
      ) {
        setShowLabel(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-[1000] flex justify-center items-center"
      className="w-[31.25rem] py-7 px-10 bg-gray border-[0.0625rem] border-graysecondary rounded-2xl relative"
      contentLabel="Task Modal"
    >
      <div className="flex flex-col gap-1 mb-5">
        <h1 className="text-xl text-graywhite font-semibold">{task.name}</h1>
        <p className="text-xs text-graysilver font-normal">в колонке</p>
      </div>
      <div className="flex flex-col gap-1 mb-2">
        <p className="text-xs text-graysilver font-normal">Этикетки</p>
        <div className="flex gap-1 relative">
          {task.labels?.map((label) => (
            <LabelCard key={label.id} label={label} />
          ))}
          {!showLabel ? (
            ""
          ) : (
            <AddLabel
              showLabel={showLabel}
              taskId={task.id}
              onClick={handleShow}
            />
          )}
          <button
            onClick={handleShow}
            className="dropdown-trigger flex justify-center items-center text-xl text-graysilver size-7 bg-graysecondary rounded-sm hover:brightness-125"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1 mb-2">
        <p className="text-xs text-graysilver font-normal">Сроки</p>
        <div className="flex items-center">
          <CalendarCard task={task} />
        </div>
      </div>
      <div className="flex justify-between w-full mb-5">
        <div className="flex flex-col w-full gap-2">
          <h1 className="text-base text-graywhite font-normal">Описание</h1>
          <AddDescription task={task} />
        </div>
      </div>
      <div className="flex flex-col w-full gap-1">
        <h1 className="text-base text-graywhite font-normal">Комментарии</h1>
        <AddComment taskId={task.id} />
      </div>
      <div className="flex flex-col gap-3 mt-3">
        {task.comments?.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
      <button
        onClick={onClose}
        className="absolute top-7 right-10 text-graysilver text-sm"
      >
        ✕
      </button>
      <button
        onClick={handleDelete}
        className="absolute bottom-7 right-10 py-1 px-2 rounded bg-red text-sm text-graywhite font-normal"
      >
        Удалить
      </button>
    </Modal>
  );
};

export default TaskModalPage;
