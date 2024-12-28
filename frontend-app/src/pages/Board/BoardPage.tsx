import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import BoardPageCard from "./components/BoardPageCard";
import { useParams } from "react-router";
import { useFetchBoardByIdQuery } from "../../api/boardApi";

const BoardPage = () => {
  const { boardId } = useParams<{ boardId: string }>();

  if (boardId === undefined) {
    return <div>BoardID is undefined</div>;
  }

  const { data: board, error, isLoading } = useFetchBoardByIdQuery(boardId);

  if (!board) {
    return <div className="text-graywhite">No boards found...</div>;
  }

  if (isLoading) {
    return <div className="text-graywhite">Loading boards...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error fetching workplaces.</div>;
  }

  return (
    <div className="h-screen relative overflow-y-hidden">
      <Header />
      <div className="flex">
        <Sidebar />
        <BoardPageCard board={board} />
      </div>
    </div>
  );
};

export default BoardPage;
