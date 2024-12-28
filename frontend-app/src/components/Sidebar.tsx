import { useSelector } from "react-redux";
import { doubleRight_icon } from "../assets";
import { RootState } from "../store/store";
import { useFetchWorkplacesByUserIdQuery } from "../api/workplaceApi";
import SidebarCard from "./SidebarCard";
import { useNavigate } from "react-router";
import CreateWorkplace from "../pages/Workplace/components/CreateWorkplace";

export const Sidebar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const { data, error, isLoading } = user
    ? useFetchWorkplacesByUserIdQuery(user.id)
    : { data: [], error: null, isLoading: false };

  if (isLoading) {
    return <div>Loading workplaces...</div>;
  }

  if (error) {
    return <div>Error fetching workplaces:</div>;
  }

  if (!data || data.length === 0) {
    return <div>No workplaces found.</div>;
  }

  return (
    <aside className="w-64 h-screen pt-12 px-4 border-r-graysecondary border-[1px] bg-gray">
      <div className="flex justify-end w-full pt-5 mb-1">
        <img src={doubleRight_icon} alt="" />
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="font-semibold text-graywhite text-xl">
          Personal spaces
        </h1>
        {data.map((workplace) => (
          <SidebarCard
            key={workplace.id}
            workplace={workplace}
            onClick={() => navigate(`/workplace/${workplace.id}`)}
          />
        ))}
      </div>
      <CreateWorkplace />
    </aside>
  );
};
