import React, { useEffect, useRef, useState } from "react";
import { CardResponse } from "../../../types/cardTypes";
import { tripledot_icon } from "../../../assets";
import AddTask from "./AddTask";
import {
  useFetchTasksByCardIdQuery,
  useUpdateCardMutation,
} from "../../../api/cardApi";
import TaskCard from "./TaskCard";
import { Draggable } from "react-beautiful-dnd";
import TaskModalPage from "./TaskModalPage";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import CardMenu from "./CardMenu";

interface CardsCardProps {
  card: CardResponse;
  onClick: () => void;
}

const CardsCard: React.FC<CardsCardProps> = ({ card, onClick }) => {
  const [nameShow, setNameShow] = useState<boolean>(false);
  const [cardName, setCardName] = useState<string>(card.name);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const refresh = useSelector((state: RootState) => state.card.refresh);

  const [updateCard] = useUpdateCardMutation();

  const toggleMenuDetails = () => {
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    setCardName(card.name);
  }, [card]);

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
    const handleClickOutside = async (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        if (nameShow) {
          const payload = {
            id: card.id,
            data: {
              shortId: card.shortId,
              name: cardName,
              board_id: card.board_id.id,
            },
          };
          console.log("Sending payload:", JSON.stringify(payload));

          try {
            await updateCard(payload).unwrap();
            onClick();
          } catch (err) {
            console.error("Failed to update card:", err);
            setCardName(card.name);
          }
        }
        setNameShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [nameShow, card.id, card.shortId, card.board_id.id, updateCard, cardName]);

  const {
    data: tasks,
    isLoading,
    error,
    refetch,
  } = useFetchTasksByCardIdQuery(card.id);

  useEffect(() => {
    refetch();
  }, [refresh, card.id]);

  const handleModalToggle = (taskId: string) => {
    setSelectedTaskId((prev) => (prev === taskId ? null : taskId));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tasks.</div>;

  return (
    <div className="flex flex-col gap-2 w-64">
      <div className="relative flex justify-between items-center pl-1 pr-3">
        {nameShow ? (
          <input
            ref={inputRef}
            id="name"
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="Название"
            className="flex items-start p-1 pl-2 bg-transparent border-[0.0625rem] border-graysilver rounded-lg text-graywhite text-sm font-semibold placeholder:text-graysilver placeholder:text-2xl placeholder:font-normal"
          />
        ) : (
          <p
            onClick={() => setNameShow(true)}
            className="text-graywhite text-2xl font-semibold"
          >
            {card.name}
          </p>
        )}
        <img
          onClick={toggleMenuDetails}
          className="dropdown-trigger cursor-pointer"
          src={tripledot_icon}
          alt=""
        />
        {showMenu && (
          <CardMenu
            cardId={card.id}
            onClick={onClick}
            onToggle={toggleMenuDetails}
          />
        )}
      </div>
      <div className="flex flex-col w-full gap-5 p-4 bg-gray border-[0.0625rem] border-graysecondary rounded-2xl">
        {tasks?.map((task, index) => (
          <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <TaskCard
                  task={task}
                  onClick={() => handleModalToggle(task.id)}
                />
                {selectedTaskId === task.id && (
                  <TaskModalPage
                    isOpen={true}
                    onClose={() => handleModalToggle(task.id)}
                    task={task}
                  />
                )}
              </div>
            )}
          </Draggable>
        ))}
        <AddTask cardId={card.id} />
      </div>
    </div>
  );
};

export default CardsCard;
