import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useFetchCardsByBoardIdQuery } from "../../../api/boardApi";
import CardsCard from "./CardsCard";
import AddCard from "./AddCard";
import { useMoveTask } from "../../../hooks/useMoveTask";
import { useDispatch } from "react-redux";
import { toggleRefresh } from "../../../store/slices/cardSlice";

interface CardsListProps {
  boardId: string;
}

const CardsList: React.FC<CardsListProps> = ({ boardId }) => {
  const { moveTaskHandler } = useMoveTask();
  const [refresh, setRefresh] = useState<boolean>(false);
  const dispatch = useDispatch();
  const {
    data: cards,
    isLoading,
    error,
    refetch,
  } = useFetchCardsByBoardIdQuery(boardId);

  const handleToggleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    refetch();
  }, [refresh, boardId]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    const taskId = result.draggableId;
    const destCardId = destination.droppableId;

    moveTaskHandler(taskId, destCardId).then(() => {
      dispatch(toggleRefresh());
    });
  };

  if (!cards) {
    return <div className="text-graywhite pt-12">No cards found...</div>;
  }

  if (isLoading) {
    return <div className="text-graywhite pt-12">Loading boards...</div>;
  }

  if (error) {
    return <div className="text-red-500 pt-12">Error fetching workplaces.</div>;
  }

  // Sort cards by shortId
  const sortedCards = [...cards].sort((a, b) => a.shortId - b.shortId);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex overflow-x-auto mb-5 h-full relative">
        <div className="flex gap-5 absolute">
          {sortedCards.map((card) => (
            <Droppable key={card.id} droppableId={card.id} type="TASK">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-col gap-2 w-64"
                >
                  <CardsCard card={card} onClick={refetch} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
          <AddCard boardId={boardId} onClick={handleToggleRefresh} />
        </div>
      </div>
    </DragDropContext>
  );
};

export default CardsList;
