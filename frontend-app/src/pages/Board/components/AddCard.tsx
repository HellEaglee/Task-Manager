import { FormEvent, useState } from "react";
import { plus_icon } from "../../../assets";
import { useCreateCardsMutation } from "../../../api/cardApi";
import { toast } from "react-toastify";

interface AddCardProps {
  boardId: string;
  onClick: () => void;
}

const AddCard: React.FC<AddCardProps> = ({ boardId, onClick }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>("");
  const [createCard, { isLoading, error }] = useCreateCardsMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.length < 3) {
      toast.error("Название должно содержать минимум 3 символа");
      return;
    }
    try {
      await createCard({ name: name, board_id: boardId });
      setName("");
      setOpen(false);
      onClick();
      toast.success("Колонка была создана!");
    } catch (err) {
      console.error("Failed to create", err);
    }
  };

  return (
    <div className="flex w-64 items-start">
      {!open ? (
        <div
          className="flex items-center gap-2 cursor-pointer"
          onMouseUp={() => setOpen(true)}
        >
          <img className="size-4 fill-graywhite" src={plus_icon} alt="" />
          <p className="text-graywhite text-2xl font-normal">Создать колонку</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col w-64 gap-1">
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a title"
            className="flex items-start p-1 pl-2 bg-transparent border-[0.0625rem] border-graysilver rounded-lg text-graywhite text-2xl font-normal placeholder:text-graysilver placeholder:text-2xl placeholder:font-normal"
          />
          <div className="flex gap-1">
            <button
              type="submit"
              className={`flex justify-center items-center py-1 px-4 text-graywhite text-lg font-normal ${
                isLoading ? "bg-graysecondary" : "bg-secondary"
              } duration-200 rounded hover:brightness-125`}
              disabled={isLoading}
            >
              {isLoading ? "Обработка..." : "Создать"}
            </button>
            <div
              className="flex justify-center items-center text-base text-graysilver font-bold w-9 h-9 duration-200 rounded hover:bg-graysecondary"
              onMouseUp={() => setOpen(false)}
            >
              ✕
            </div>
          </div>
          {error && <div className="text-red-500">Error</div>}
        </form>
      )}
    </div>
  );
};

export default AddCard;
