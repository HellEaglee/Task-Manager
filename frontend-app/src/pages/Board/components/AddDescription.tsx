import React, { useEffect, useState } from "react";
import { TaskResponse } from "../../../types/taskTypes";
import { useUpdateDescMutation } from "../../../api/taskApi";
import { useDispatch } from "react-redux";
import { toggleRefresh } from "../../../store/slices/cardSlice";
import { toast } from "react-toastify";

interface AddDescriptionProps {
  task: TaskResponse;
}

const AddDescription: React.FC<AddDescriptionProps> = ({ task }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [desc, setDesc] = useState<string>("");
  const [updateDescription, { isLoading }] = useUpdateDescMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    setDesc(task.description);
  }, [open]);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateDescription({
        id: task.id,
        description: desc,
      });
      setDesc("");
      handleOpen();
      dispatch(toggleRefresh());
      toast.success("Описание обновлено!");
    } catch (err) {
      console.error("Failed to update description", err);
    }
  };

  return (
    <>
      {open ? (
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Напиши описание"
            className="w-full h-8 text-sm text-graysilver font-normal bg-transparent border-[0.0625rem] border-graysilver rounded-md placeholder:text-graysecondary"
          />
          <button
            disabled={isLoading}
            className="flex justify-center items-center bg-graysecondary h-8 px-3 text-sm text-graysilver font-normal rounded-md duration-200 hover:brightness-125"
          >
            Изменить
          </button>
        </form>
      ) : (
        <div className="flex gap-2" onClick={handleOpen}>
          {task.description ? (
            <p className="text-sm text-graysilver font-normal">
              {task.description}
            </p>
          ) : (
            <p className="text-sm text-graysilver font-normal">
              Добавить описание
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default AddDescription;
