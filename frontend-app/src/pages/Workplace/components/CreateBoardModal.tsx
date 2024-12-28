// src/components/CreateBoardModal.tsx

import React, { useEffect, useRef, useState } from "react";
import { useCreateBoardMutation } from "../../../api/boardApi";
import { toast } from "react-toastify";

interface CreateBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  workplaceId: string;
}

const CreateBoardModal: React.FC<CreateBoardModalProps> = ({
  isOpen,
  onClose,
  workplaceId,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState<string>("");
  const [createBoard, { isLoading, error }] = useCreateBoardMutation();

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const handleOutsideClick = (event: MouseEvent) => {
    if (dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect();
      const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.bottom &&
        rect.left <= event.clientX &&
        event.clientX <= rect.right;

      if (!isInDialog) {
        onClose();
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.length < 3) {
      toast.error("Название доски должно содержать как минимум 3 символа.");
      return;
    }
    try {
      await createBoard({
        name: name,
        status: 0,
        workplace_id: workplaceId,
      }).unwrap();
      setName("");
      onClose();
      toast.success("Board created successfully!");
    } catch (err) {
      console.error("Failed to create workplace: ", err);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-modal="true"
      className="w-[31.25rem] py-7 px-10 bg-gray border-[0.0625rem] border-graysecondary rounded-2xl"
    >
      <h1 className="text-2xl text-graywhite font-semibold">
        Создать новую доску
      </h1>
      <p className="text-sm text-graysilver font-normal mt-1">
        Узнайте, что возможно, когда вы сотрудничаете с вашей командой.
        Редактируйте детали проекта в любое время в настройках проекта.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mt-5 gap-2">
          <p className="text-base text-graywhite font-normal">Название</p>
          <input
            type="text"
            placeholder="Попробуйте написать название доски здесь"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-sm text-graywhite font-normal h-6 bg-transparent border-[0.0625rem] border-graysilver placeholder:text-graysilver rounded"
          />
        </div>
        <div className="flex gap-2 mt-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="text-sm text-graysilver font-normal flex justify-center items-center bg-graysecondary p-2 rounded-md hover:brightness-125"
          >
            Отмена
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`text-sm text-graywhite font-normal flex justify-center items-center ${
              isLoading ? "bg-graysecondary" : "bg-secondary"
            } p-2 rounded-md hover:brightness-125`}
          >
            {isLoading ? "Обработка..." : "Создать"}
          </button>
          {error && <div className="text-red-500">Error</div>}
        </div>
      </form>
    </dialog>
  );
};

export default CreateBoardModal;
