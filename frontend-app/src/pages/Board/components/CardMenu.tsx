import React from "react";
import { useDeleteCardMutation } from "../../../api/cardApi";

interface CardMenuProps {
  cardId: string;
  onClick: () => void;
  onToggle: () => void;
}

const CardMenu: React.FC<CardMenuProps> = ({ cardId, onClick, onToggle }) => {
  const [deleteCard] = useDeleteCardMutation();

  const handleDelete = async () => {
    try {
      await deleteCard(cardId);
      onClick();
      onToggle();
    } catch (err) {
      console.error("Failed to delete board:", err);
    }
  };
  return (
    <div className="absolute right-1 top-1 dropdown-menu flex flex-col text-sm text-graysilver font-normal bg-gray border-[0.0625rem] border-graysecondary rounded shadow-lg z-50">
      <div>
        <button
          onClick={handleDelete}
          className="py-1 px-2 rounded bg-red text-graywhite"
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default CardMenu;
