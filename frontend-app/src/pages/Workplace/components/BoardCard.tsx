import React, { useEffect, useRef, useState } from "react";
import { tripledot_icon } from "../../../assets";
import { BoardResponse } from "../../../types/boardTypes";
import { useNavigate } from "react-router";
import { useUpdateBoardMutation } from "../../../api/boardApi";
import BoardMenu from "./BoardMenu";

interface BoardCardProp {
  board: BoardResponse;
  onClick: () => void;
}

const BoardCard: React.FC<BoardCardProp> = ({ board, onClick }) => {
  const [nameShow, setNameShow] = useState<boolean>(false);
  const [boardName, setBoardName] = useState<string>(board.name);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const [updateBoard] = useUpdateBoardMutation();

  const toggleMenuDetails = () => {
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".dropdown-trigger") &&
        !target.closest(".dropdown-menu")
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setBoardName(board.name);
  }, [board]);

  useEffect(() => {
    const handleClickOutside = async (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        if (nameShow) {
          const payload = {
            id: board.id,
            data: {
              name: boardName,
              status: board.status,
              workplace_id: board.workplace_id?.id,
            },
          };
          console.log("Sending payload:", JSON.stringify(payload));

          try {
            await updateBoard(payload);
            onClick();
          } catch (err) {
            console.error("Failed to update board:", err);
          }
        }
        setNameShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    nameShow,
    board.id,
    board.status,
    board.workplace_id?.id,
    updateBoard,
    boardName,
  ]);

  return (
    <div className="w-64 h-44 mb-8">
      <div className="relative flex justify-between items-center px-3 py-2 w-full bg-graysecondary rounded-t-lg">
        {nameShow ? (
          <input
            ref={inputRef}
            id="name"
            type="text"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            placeholder="Название"
            className="flex items-start p-1 pl-2 bg-transparent border-[0.0625rem] border-graysilver rounded-lg text-graywhite text-sm font-semibold placeholder:text-graysilver placeholder:text-2xl placeholder:font-normal"
          />
        ) : (
          <p
            onClick={() => setNameShow(true)}
            className="text-graywhite text-sm font-semibold cursor-pointer"
          >
            {board.name}
          </p>
        )}

        <img
          onClick={toggleMenuDetails}
          className="dropdown-trigger cursor-pointer"
          src={tripledot_icon}
          alt=""
        />
        {showMenu && (
          <BoardMenu
            boardId={board.id}
            onClick={onClick}
            onToggle={toggleMenuDetails}
          />
        )}
      </div>
      <div
        onClick={() => navigate(`/board/${board.id}`)}
        className="flex w-full h-full bg-graysilver rounded-b-lg cursor-pointer"
      ></div>
    </div>
  );
};

export default BoardCard;
