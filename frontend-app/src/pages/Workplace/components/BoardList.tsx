import React from "react";
import { useFetchBoardsByWorkplaceIdQuery } from "../../../api/workplaceApi";
import BoardCard from "./BoardCard";

interface BoardListProps {
  status: number;
  workplaceId: string;
}

const BoardList: React.FC<BoardListProps> = ({ status, workplaceId }) => {
  const { data, error, isLoading, refetch } =
    useFetchBoardsByWorkplaceIdQuery(workplaceId);

  if (isLoading) {
    return <div className="text-graywhite">Loading workplace details...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500">Error fetching workplace details.</div>
    );
  }

  if (!data) {
    return <div className="text-graywhite">No workplace found.</div>;
  }

  const filteredBoards = data.filter(
    (board) => board.status === Number(status)
  );

  return (
    <div className="flex flex-wrap max-w-full mt-10 gap-3">
      {filteredBoards.length > 0 ? (
        filteredBoards.map((board) => (
          <BoardCard key={board.id} board={board} onClick={refetch} />
        ))
      ) : (
        <div className="text-graywhite">
          {status === 1
            ? "No favorites"
            : status === 2
            ? "Nothing in archives"
            : "Nothing is here"}
        </div>
      )}
    </div>
  );
};

export default BoardList;
