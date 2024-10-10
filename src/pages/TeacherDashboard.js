import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCourses = async () => {
      // try {
      //   const response = await axios.get("http://localhost:5000/courses");
      //   const assignedCourses = response.data.filter(
      //     (course) => course.assignedTeacher === user.username
      //   );
      //   setCourses(assignedCourses);
      // } catch (error) {
      //   console.error("Error fetching courses:", error);
      // }

      const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
      const assignedCourses = storedCourses.filter(
        (course) => course.assignedTeacher === user.username
      );
      setCourses(assignedCourses);

    };

    const fetchStudents = async () => {
      // try {
      //   const response = await axios.get("http://localhost:5000/users");
      //   const enrolledStudents = response.data.filter(
      //     (user) => user.role === "student"
      //   );
      //   setStudents(enrolledStudents);
      // } catch (error) {
      //   console.error("Error fetching students:", error);
      // }

      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      const enrolledStudents = storedUsers.filter(
        (user) => user.role === "student"
      );
      setStudents(enrolledStudents);
    };

    fetchCourses();
    fetchStudents();
  }, [user.username]);


  return (
    <div>
      <Header />
      <div className="p-6">
        <h1 className="text-2xl mb-4">Teacher Dashboard</h1>
        <Outlet 
          context={{ 
            courses,
            allStudents: students
          }} 
        />
      </div>
    </div>
  );
};

export default TeacherDashboard;
