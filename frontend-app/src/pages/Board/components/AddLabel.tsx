import React, { useEffect, useState } from "react";
import { useCreateLabelMutation } from "../../../api/labelApi";
import { hexRegex } from "../../../utils/regexPatterns";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { toggleRefresh } from "../../../store/slices/cardSlice";

interface AddLabelProps {
  taskId: string;
  showLabel: boolean;
  onClick: () => void;
}

const colors = [
  "#B6080B",
  "#FFA500",
  "#10BDD0",
  "#F1C40F",
  "#8E44AD",
  "#E74C3C",
  "#3498DB",
  "#2ECC71",
  "#E67E22",
];

const AddLabel: React.FC<AddLabelProps> = ({ taskId, showLabel, onClick }) => {
  const [labelColor, setLabelColor] = useState<string>("");
  const [labelName, setLabelName] = useState<string>("");
  const [createLabel, { isLoading }] = useCreateLabelMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    setLabelColor(colors[0]);
  }, [showLabel]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!hexRegex.test(labelColor)) {
      toast.error("Введите HEX");
      return;
    }

    try {
      await createLabel({
        title: labelName,
        color: labelColor,
        task_id: taskId,
      });
      onClick();
      dispatch(toggleRefresh());
    } catch (err) {
      console.error("Failed to create label", err);
    }
  };

  return (
    <div className="dropdown-menu flex flex-col absolute z-[10000] -left-52 w-36 bg-gray p-3 border-[0.0625rem] border-graysecondary rounded-md gap-2">
      <div className="grid grid-cols-3 w-full">
        {colors.map((color, i) => (
          <div
            key={i}
            className="size-10 border-4 border-gray cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => setLabelColor(color)}
          ></div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex items-center gap-2 w-full">
          <input
            type="text"
            value={labelColor}
            maxLength={7}
            onChange={(e) => setLabelColor(e.target.value)}
            className="w-full h-8 text-sm text-graysilver font-normal bg-transparent border-[0.0625rem] border-graysilver rounded-md placeholder:text-graysecondary"
          />
          <div
            className="size-6 "
            style={{ backgroundColor: labelColor }}
          ></div>
        </div>
        <input
          type="text"
          maxLength={7}
          value={labelName}
          onChange={(e) => setLabelName(e.target.value)}
          placeholder="Название"
          className="w-full h-8 text-sm text-graysilver font-normal bg-transparent border-[0.0625rem] border-graysilver rounded-md placeholder:text-graysecondary"
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`text-sm text-graywhite font-normal flex justify-center items-center ${
            isLoading ? "bg-graysecondary cursor-not-allowed" : "bg-secondary"
          } h-8 px-3 text-sm text-graysilver font-normal rounded-md duration-200 hover:brightness-125`}
        >
          Создать
        </button>
      </form>
    </div>
  );
};

export default AddLabel;
