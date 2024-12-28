// src/components/WorkplaceCard.tsx

import React, { useState } from "react";
import TabNav from "./TabNav";
import { plus_icon } from "../../../assets";
import { useFetchWorkplaceByIdQuery } from "../../../api/workplaceApi";
import BoardList from "./BoardList";
import CreateBoardModal from "./CreateBoardModal";

interface WorkplaceCardProps {
  workplaceId: string;
}

const WorkplaceCard: React.FC<WorkplaceCardProps> = ({ workplaceId }) => {
  const [tabs, setTabs] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, error, isLoading } = useFetchWorkplaceByIdQuery(
    workplaceId || "",
    {
      skip: !workplaceId,
    }
  );

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

  const handleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="w-full px-12 pt-12 h-screen">
      <p className="text-graywhite text-sm font-normal mt-12">{data.name} /</p>
      <div className="flex gap-5 mt-5 mb-20">
        <div className="w-36 h-24 bg-graysilver rounded-lg"></div>
        <div className="flex flex-col pt-2">
          <h1 className="text-graywhite text-3xl font-semibold">{data.name}</h1>
          <p className="text-graysilver text-sm font-semibold">
            "My workplace description"
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex w-full justify-between">
          <TabNav tabs={tabs} setTabs={setTabs} />
          <button
            onClick={handleModal}
            className="flex justify-center items-center w-36 h-10 gap-2 bg-secondary rounded-lg"
          >
            <img src={plus_icon} alt="" />
            <p className="text-graywhite text-sm font-semibold">New project</p>
          </button>
        </div>
        {data ? (
          <BoardList status={tabs} workplaceId={data.id} />
        ) : (
          <div className="flex flex-col items-center w-full mt-20">
            <h1 className="text-graywhite text-3xl font-semibold mb-2">
              Create your first project
            </h1>
            <p className="text-graysilver text-base font-normal">
              Create, edit and delete projects at any time
            </p>
            <button
              onClick={handleModal}
              className="flex justify-center items-center w-36 h-10 mt-8 gap-2 bg-secondary rounded-lg"
            >
              <p className="text-graywhite text-sm font-semibold">Create</p>
            </button>
          </div>
        )}
      </div>
      {/* Modal Component */}
      <CreateBoardModal
        workplaceId={workplaceId}
        isOpen={isModalOpen}
        onClose={handleModal}
      />
    </div>
  );
};

export default WorkplaceCard;
