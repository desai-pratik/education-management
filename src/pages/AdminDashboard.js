import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import Header from "../components/Header";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const fetchData = async () => {
    //   try {
    //     const [courseResponse, studentResponse] = await Promise.all([
    //       axios.get("http://localhost:5000/courses"),
    //       axios.get("http://localhost:5000/users")
    //     ]);

    //     setCourses(courseResponse.data);
    //     setStudents(studentResponse.data.filter(user => user.role === "student"));
    //     setTeachers(studentResponse.data.filter(user => user.role === "teacher"));
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }

    const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    setCourses(storedCourses);
    setStudents(storedUsers.filter((user) => user.role === "student"));
    setTeachers(storedUsers.filter((user) => user.role === "teacher"));
  };
  useEffect(() => {
    fetchData();
  }, []);



  // const handleDeleteCourse = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/courses/${id}`);
  //     setCourses(courses.filter((course) => course.id !== id));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleDeleteCourse = (id) => {
    const updatedCourses = courses.filter((course) => course.id !== id);
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
    setCourses(updatedCourses);
  };

  return (
    <div>
      <Header />
      <div className="p-6">
        <h1 className="text-2xl mb-4">Admin Dashboard</h1>
        <Outlet context={{ fetchData }} />

        <div className="mb-10">
          <h2 className="text-xl">Courses</h2>
          <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left px-6 py-4">Title</th>
                <th className="text-left px-6 py-4">Description</th>
                <th className="text-left px-6 py-4">Start Date</th>
                <th className="text-left px-6 py-4">End Date</th>
                <th className="text-left px-6 py-4">Assigned Teacher</th>
                <th className="text-left px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.length > 0 ? (
                courses.map((course) => (
                  <tr key={course.id} className="border-b hover:bg-gray-100">
                    <td className="px-6 py-3">{course.title}</td>
                    <td className="px-6 py-3">{course.description}</td>
                    <td className="px-6 py-3">{course.startDate}</td>
                    <td className="px-6 py-3">{course.endDate}</td>
                    <td className="px-6 py-3">{course.assignedTeacher}</td>
                    <td className="px-6 py-3">
                      <Link to={`/admin/edit-course/${course.id}`} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                        Edit
                      </Link>
                      <button onClick={() => handleDeleteCourse(course.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="text-center">
                  <td colSpan="6" className="px-6 py-4">
                    No courses found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mb-10">
          <h2 className="text-xl">Students</h2>
          <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left px-6 py-4">Student Id</th>
                <th className="text-left px-6 py-4">Student Name</th>
                <th className="text-left px-6 py-4">Student Email</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-100">
                    <td className="px-6 py-4">{student.id}</td>
                    <td className="px-6 py-4">{student.username}</td>
                    <td className="px-6 py-4">{student.email}</td>
                  </tr>
                ))
              ) : (
                <tr className="text-center">
                  <td colSpan="3" className="px-6 py-4">
                    No students found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mb-10">
          <h2 className="text-xl">Teachers</h2>
          <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left px-6 py-4">Teacher Id</th>
                <th className="text-left px-6 py-4">Teacher Name</th>
                <th className="text-left px-6 py-4">Teacher Email</th>
              </tr>
            </thead>
            <tbody>
              {teachers.length > 0 ? (
                teachers.map((teacher) => (
                  <tr key={teacher.id} className="border-b hover:bg-gray-100">
                    <td className="px-6 py-4">{teacher.id}</td>
                    <td className="px-6 py-4">{teacher.username}</td>
                    <td className="px-6 py-4">{teacher.email}</td>
                  </tr>
                ))
              ) : (
                <tr className="text-center">
                  <td colSpan="3" className="px-6 py-4">
                    No teachers found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
