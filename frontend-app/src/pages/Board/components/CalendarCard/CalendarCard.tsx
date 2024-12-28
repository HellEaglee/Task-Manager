import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import { calendar_icon } from "../../../../assets";
import { TaskResponse } from "../../../../types/taskTypes";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import { useUpdateDueDateMutation } from "../../../../api/taskApi";
import { fromZonedTime } from "date-fns-tz";
import { toggleRefresh } from "../../../../store/slices/cardSlice";

interface CalendarCardProps {
  task: TaskResponse;
}

const CalendarCard: React.FC<CalendarCardProps> = ({ task }) => {
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const dispatch = useDispatch();

  const [updateDueDate] = useUpdateDueDateMutation();

  const handleUpdateDueDate = async () => {
    if (dueDate) {
      try {
        const utcDueDate = fromZonedTime(dueDate, "Europe/Moscow");
        await updateDueDate({
          id: task.id,
          dueDate: utcDueDate.toISOString(),
        }).unwrap();
        dispatch(toggleRefresh());
        console.log("Due date updated successfully");
      } catch (error) {
        console.error("Failed to update due date:", error);
      }
    }
  };
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
      {task.due ? (
        <div className="flex justify-center items-center w-20 h-7 gap-1 border-[0.0625rem] border-graysilver rounded">
          <img src={calendar_icon} alt="" />
          <p className="text-graywhite text-base font-normal">
            {formatDate(task.due)}
          </p>
        </div>
      ) : (
        <>
          <div className="flex gap-2">
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              showTimeSelect
              dateFormat="Pp"
              className="w-full h-8 text-sm text-graysilver font-normal bg-transparent border-[0.0625rem] border-graysilver rounded-md placeholder:text-graysecondary"
            />
            <button
              onClick={handleUpdateDueDate}
              className="flex justify-center items-center bg-graysecondary h-8 px-3 text-sm text-graysilver font-normal rounded-md duration-200 hover:brightness-125"
            >
              Update Due Date
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default CalendarCard;
