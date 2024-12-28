import React from "react";
import { LabelResponse } from "../../../types/labelTypes";

interface LabelCardProps {
  label: LabelResponse;
}

const LabelCard: React.FC<LabelCardProps> = ({ label }) => {
  return (
    <div
      className="flex h-7 border-[0.0625rem] rounded-sm"
      style={{ borderColor: label.color }}
    >
      <div
        className="w-4 h-full"
        style={{ backgroundColor: label.color }}
      ></div>
      <div className="flex justify-center items-center px-2">
        <p className="text-graywhite text-base font-normal">{label.title}</p>
      </div>
    </div>
  );
};

export default LabelCard;
