import React, { useState } from "react";
import { plus_icon } from "../../../assets";
import { useCreateTasksMutation } from "../../../api/taskApi";
import { toast } from "react-toastify";
import { toggleRefresh } from "../../../store/slices/cardSlice";
import { useDispatch } from "react-redux";

const AddTask = ({ cardId }: { cardId: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [createTask, { isLoading, error }] = useCreateTasksMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.length < 3) {
      toast.error("Название должно содержать минимум 3 символа");
      return;
    }
    try {
      await createTask({ name: name, card_id: cardId });
      setOpen(false);
      dispatch(toggleRefresh());
      toast.success("Задание было создано!");
    } catch (err) {
      console.log("Failed to create", err);
    }
  };

  return (
    <>
      {!open ? (
        <div
          className="flex items-center gap-1 p-1 cursor-pointer rounded-md duration-200 hover:bg-graysecondary"
          onClick={() => setOpen(true)}
        >
          <img
            className="size-[0.625rem] fill-graysilver"
            src={plus_icon}
            alt=""
          />
          <p className="text-graysilver text-sm font-normal">Создать задание</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Название"
            className="flex items-start p-1 pl-2 bg-transparent border-[0.0625rem] border-graysilver text-graywhite rounded placeholder:text-graysilver"
          />
          <div className="flex gap-1">
            <button
              type="submit"
              className={`flex justify-center items-center py-1 px-2 text-graywhite text-sm font-normal ${
                isLoading ? "bg-graysecondary" : "bg-secondary"
              } duration-200 rounded hover:brightness-125`}
              disabled={isLoading}
            >
              {isLoading ? "Обработка..." : "Добавить"}
            </button>
            <div
              className="flex justify-center items-center text-base text-graysilver font-bold w-7 h-7 duration-200 rounded hover:bg-graysecondary"
              onClick={() => setOpen(false)}
            >
              ✕
            </div>
          </div>
          {error && <div className="text-red-500">Error</div>}
        </form>
      )}
    </>
  );
};

export default AddTask;
