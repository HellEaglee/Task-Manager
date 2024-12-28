import { useEffect } from "react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import WorkplaceCard from "./components/WorkplaceCard";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { RootState } from "../../store/store";
import { useFetchWorkplacesByUserIdQuery } from "../../api/workplaceApi";

const WorkplacePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const { workplaceId } = useParams<{ workplaceId: string }>();

  if (workplaceId === undefined) {
    return <div>WorkplacID is undefined</div>;
  }

  const {
    data: workplaces,
    error,
    isLoading,
  } = user
    ? useFetchWorkplacesByUserIdQuery(user.id)
    : { data: [], error: null, isLoading: false };

  useEffect(() => {
    if (!workplaceId && workplaces && workplaces.length > 0) {
      navigate(`/workplace/${workplaces[0].id}`);
    }
  }, [workplaceId, workplaces, navigate]);

  if (isLoading) {
    return <div className="text-graywhite">Loading workplaces...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error fetching workplaces.</div>;
  }

  return (
    <div className="h-screen relative">
      <Header />
      <div className="flex">
        <Sidebar />
        <WorkplaceCard workplaceId={workplaceId} />
      </div>
    </div>
  );
};

export default WorkplacePage;
