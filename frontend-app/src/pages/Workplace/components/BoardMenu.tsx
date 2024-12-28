import React from "react";
import { useDeleteBoardMutation } from "../../../api/boardApi";

interface BoardMenuProps {
  boardId: string;
  onClick: () => void;
  onToggle: () => void;
}

const BoardMenu: React.FC<BoardMenuProps> = ({
  boardId,
  onClick,
  onToggle,
}) => {
  const [deleteBoard] = useDeleteBoardMutation();

  const handleDelete = async () => {
    try {
      await deleteBoard(boardId);
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

export default BoardMenu;
