import React from "react";
import { useFetchWorkplacesQuery } from "../../../api/workplaceApi";
import WorkplacesList from "./WorkplacesList";

const AllWorkplacesCard = () => {
  const { data: workplaces } = useFetchWorkplacesQuery();

  return (
    <div className="w-full px-12 pt-12 h-screen">
      <div className="flex gap-5 mt-5 mb-20">
        <div className="w-36 h-24 bg-graysilver rounded-lg"></div>
        <div className="flex flex-col pt-2">
          <h1 className="text-graywhite text-3xl font-semibold">Welcome</h1>
          <p className="text-graysilver text-sm font-semibold">
            All workplaces
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        {workplaces ? (
          <WorkplacesList workplaces={workplaces} />
        ) : (
          <div className="flex flex-col items-center w-full mt-20">
            <h1 className="text-graywhite text-3xl font-semibold mb-2">
              Strange... nothing is here?
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllWorkplacesCard;
