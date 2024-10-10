import React from "react";
import { Link } from "react-router-dom";

const CoursesCard = ({course}) => {
  return (
    <Link to={`details/${course.id}`} className="border rounded-lg p-4 shadow">
      <h3 className="text-lg font-semibold">{course.title}</h3>
      <p className="mb-2">{course.description}</p>
      <p className="text-sm text-gray-500">
        Start Date: {course.startDate} <br />
        End Date: {course.endDate}
      </p>
      <ul className="mb-2 flex">
        <h4 className="text-md font-medium">Enrolled Students: </h4>
        {course.enrolledStudents.length > 0 ? course.enrolledStudents.length : "00"}
      </ul>
    </Link>
  );
};

export default CoursesCard;
