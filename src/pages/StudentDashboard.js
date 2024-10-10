import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const StudentDashboard = () => {
  return (
    <>
      <Header />
      <div className="p-6">
        <h1 className="text-2xl mb-2">Student Dashboard</h1>
        <Outlet />
      </div>
    </>
  );
};

export default StudentDashboard;
