import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import CoursesCard from "./CoursesCard";

const TeachersCoursesCard = () => {
  const { courses } = useOutletContext();
  return (
    <div className="mb-6">
      <h2 className="text-xl mb-1">Assigned Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {courses.length > 0 ? courses.map((course) => <CoursesCard course={course} key={course.id}/>) : <p>No courses assigned yet.</p>}
      </div>
    </div>
  );
};

export default TeachersCoursesCard;
