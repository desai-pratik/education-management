import axios from "axios";
import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

const TeachersCoursesCardDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [addStudent, setAddStudent] = useState("");
  const { allStudents } = useOutletContext();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      //   try {
      //     const response = await axios.get(`http://localhost:5000/courses/${id}`);
      //     setCourse(response.data);
      //     const enrolledStudentIds = response.data.enrolledStudents;
      //     const studentsResponse = await axios.get("http://localhost:5000/users");
      //     const enrolledStudents = studentsResponse.data.filter((student) => enrolledStudentIds.includes(student.id));

      //     setStudents(enrolledStudents);
      //   } catch (error) {
      //     console.error("Error fetching course details:", error);
      //   }

      const courses = JSON.parse(localStorage.getItem("courses")) || [];
      const foundCourse = courses.find((course) => course.id === Number(id));
      if (foundCourse) {
        setCourse(foundCourse);
        const enrolledStudentIds = foundCourse.enrolledStudents || [];
        const enrolledStudents = allStudents.filter((student) => enrolledStudentIds.includes(student.id));
        setStudents(enrolledStudents);
      }
    };

    fetchCourseDetails();
  }, [id, allStudents]);

  const handleAddStudent = async () => {
    // if (course.enrolledStudents.includes(addStudent)) {
    //   return;
    // }

    //   const updatedCourse = {
    //   ...course,
    //   enrolledStudents: [...course.enrolledStudents, addStudent],
    // };
    // try {
    //   const updatedCourse = {
    //     ...course,
    //     enrolledStudents: [...course.enrolledStudents, addStudent],
    //   };
    //   await axios.put(`http://localhost:5000/courses/${id}`, updatedCourse);
    //   alert(`Student added to ${course.title} course!`);
    // } catch (error) {
    //   console.error("Error adding student to course:", error);
    // }

    const studentToAdd = allStudents.find((student) => student.id === Number(addStudent));

    if (!studentToAdd) {
      alert("Student not found. Please select a valid student.");
      return;
    }

    if (course.enrolledStudents.includes(studentToAdd.id)) {
      alert("Student is already enrolled in the course.");
      return;
    }

    const updatedCourse = {
      ...course,
      enrolledStudents: [...course.enrolledStudents, studentToAdd.id],
    };

    const courses = JSON.parse(localStorage.getItem("courses")) || [];
    const updatedCourses = courses.map((c) => (c.id === course.id ? updatedCourse : c));
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
    alert(`Student ${studentToAdd.username} added to ${course.title} course!`);

    setStudents([...students, studentToAdd]);
  };

  return (
    <div className="p-4">
      {course ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl">{course.title} - Enrolled Students</h2>
            <div className="flex items-center">
              <select
                id={`student-select-${course.id}`}
                value={addStudent}
                onChange={(e) => {
                  setAddStudent(e.target.value);
                }}
                className="border p-2  w-full md:w-64 mr-2"
              >
                <option value="">Select Student to Add</option>
                {allStudents?.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.username}
                  </option>
                ))}
              </select>
              <button onClick={() => handleAddStudent()} className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Student
              </button>
            </div>
          </div>

          {students.length > 0 ? (
            <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="text-left px-6 py-4">ID</th>
                  <th className="text-left px-6 py-4">Username</th>
                  <th className="text-left px-6 py-4">Email</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-100">
                    <td className="px-6 py-3">{student.id}</td>
                    <td className="px-6 py-3">{student.username}</td>
                    <td className="px-6 py-3">{student.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No students enrolled in this course.</p>
          )}
        </>
      ) : (
        <p>Loading course details...</p>
      )}
    </div>
  );
};

export default TeachersCoursesCardDetails;
