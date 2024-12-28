import React from "react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import AllWorkplacesCard from "./components/AllWorkplacesCard";

const AllWorkplacesPage = () => {
  return (
    <div className="h-screen relative">
      <Header />
      <div className="flex">
        <Sidebar />
        <AllWorkplacesCard />
      </div>
    </div>
  );
};

export default AllWorkplacesPage;
