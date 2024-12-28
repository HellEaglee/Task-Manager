import React from "react";
import { WorkplaceResponse } from "../types/workplaceTypes";

interface SiderbarCardProps {
  workplace: WorkplaceResponse;
  onClick: () => void;
}

const SidebarCard: React.FC<SiderbarCardProps> = ({ workplace, onClick }) => {
  return (
    <div
      className="flex items-center w-56 p-2 gap-3 bg-graysecondary rounded-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="size-6 bg-graysilver rounded-full"></div>
      <h2 className="font-normal text-graywhite text-xl">{workplace.name}</h2>
    </div>
  );
};

export default SidebarCard;
