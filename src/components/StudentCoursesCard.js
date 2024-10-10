import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import CoursesCard from "./CoursesCard";

const StudentCoursesCard = () => {
  const [courses, setCourses] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // const fetchCourses = async () => {
    //   try {
    //     const response = await axios.get("http://localhost:5000/courses");
    //     const enrolledCourses = response.data.filter((course) => course.enrolledStudents.includes(user.id));
    //     setCourses(enrolledCourses);
    //   } catch (error) {
    //     console.error("Error fetching courses:", error);
    //   }
    // };

    const fetchCourses = () => {
      const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
      const enrolledCourses = storedCourses.filter((course) => course.enrolledStudents.includes(user.id));
      setCourses(enrolledCourses);
    };

    fetchCourses();
  }, [user.id]);
  return (
    <div className="mb-6">
      <h2 className="text-xl mb-1">Enrolled Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {courses.length > 0 ? courses.map((course) => <CoursesCard course={course} key={course.id} />) : <p>No courses found.</p>}
      </div>
    </div>
  );
};

export default StudentCoursesCard;
