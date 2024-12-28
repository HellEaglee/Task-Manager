import React from "react";
import { BoardResponse } from "../../../types/boardTypes";
import CardsList from "./CardsList";
import { Link } from "react-router";

interface BoardPageCardProps {
  board: BoardResponse;
}

const BoardPageCard: React.FC<BoardPageCardProps> = ({ board }) => {
  return (
    <div className="flex flex-col w-full px-12 mt-12 pb-12 h-screen relative">
      <p className="text-graywhite text-sm font-normal mt-12">
        <Link to={`/workplace/${board.workplace_id.id}`}>
          {board.workplace_id.name} / {board.name}
        </Link>
      </p>
      <div className="flex items-center justify-between gap-5 mt-5 mb-20">
        <div className="flex gap-12">
          <h1 className="text-graywhite text-3xl font-semibold">
            {board.name}
          </h1>
        </div>
      </div>
      <CardsList boardId={board.id} />
    </div>
  );
};

export default BoardPageCard;
