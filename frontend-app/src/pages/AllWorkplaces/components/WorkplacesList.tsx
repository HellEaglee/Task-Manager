import React from "react";
import { WorkplaceResponse } from "../../../types/workplaceTypes";
import WorkplacesCard from "./WorkplacesCard";
interface WorkplacesListProps {
  workplaces: WorkplaceResponse[];
}

const WorkplacesList: React.FC<WorkplacesListProps> = ({ workplaces }) => {
  return (
    <div className="flex flex-wrap max-w-full mt-10 gap-3">
      {workplaces.map((workplace) => (
        <WorkplacesCard workplace={workplace} />
      ))}
    </div>
  );
};

export default WorkplacesList;
