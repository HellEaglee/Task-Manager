import React from "react";
import { calendar_icon, comment_icon, user_icon } from "../../../assets";
import { TaskResponse } from "../../../types/taskTypes";
import LabelCard from "./LabelCard";

interface TaskCardProps {
  task: TaskResponse;
  onClick: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
    };
    return date
      .toLocaleDateString(undefined, options)
      .split(" ")
      .reverse()
      .join(",")
      .replace(",", " ");
  };

  return (
    <>
      <div
        className="flex flex-col p-[0.625rem] border-[0.0625rem] border-graysilver rounded-lg cursor-pointer"
        onClick={onClick}
      >
        <h1 className="text-xl text-graywhite font-normal">{task.name}</h1>
        <p className="w-2/5 mb-1 truncate text-base text-graysilver font-normal">
          {task.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {task.due === null ? null : (
            <div className="flex justify-center items-center w-20 h-7 gap-1 border-[0.0625rem] border-graysilver rounded">
              <img src={calendar_icon} alt="" />
              <p className="text-graywhite text-base font-normal">
                {formatDate(task.due)}
              </p>
            </div>
          )}
          {task.labels?.map((label) => (
            <LabelCard key={label.id} label={label} />
          ))}
        </div>
        <div className="flex w-full mt-5 justify-between">
          <img src={user_icon} alt="usericon" />
          <div className="flex justify-center items-center gap-1">
            <p className="text-graysilver text-base font-normal">
              {task.comments ? task.comments.length : ""}
            </p>
            <img src={comment_icon} alt="commentIcon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
