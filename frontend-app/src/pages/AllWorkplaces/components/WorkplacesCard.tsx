import React from "react";
import { WorkplaceResponse } from "../../../types/workplaceTypes";
import { tripledot_icon } from "../../../assets";
import { useNavigate } from "react-router";

interface WorkplaceCardProps {
  workplace: WorkplaceResponse;
}

const WorkplacesCard: React.FC<WorkplaceCardProps> = ({ workplace }) => {
  const navigate = useNavigate();

  return (
    <div className="w-64 h-44 mb-8">
      <div className="relative flex justify-between items-center px-3 py-2 w-full bg-graysecondary rounded-t-lg">
        <p className="text-graywhite text-sm font-semibold cursor-pointer">
          {workplace.name}
        </p>

        <img
          className="dropdown-trigger cursor-pointer"
          src={tripledot_icon}
          alt=""
        />
      </div>
      <div
        onClick={() => navigate(`/workplace/${workplace.id}`)}
        className="flex w-full h-full bg-graysilver rounded-b-lg cursor-pointer"
      ></div>
    </div>
  );
};

export default WorkplacesCard;
