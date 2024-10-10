import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StudentCoursesCardDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const courses = JSON.parse(localStorage.getItem("courses")) || [];
      const foundCourse = courses.find((course) => course.id === Number(id));
      if (foundCourse) {
        setCourse(foundCourse);
        const enrolledStudentIds = foundCourse.enrolledStudents || [];
        const allStudents = JSON.parse(localStorage.getItem("users")) || [];
        const enrolledStudents = allStudents.filter((student) => enrolledStudentIds.includes(student.id));
        setStudents(enrolledStudents);
      }
    };

    fetchCourseDetails();
  }, [id]);
  return (
    <div className="p-4">
      {course ? (
        <>
          <h2 className="text-xl mb-2">{course.title} - Course Details</h2>

          {students.length > 0 ? (
            <div>
              <h3 className="text-lg mb-2">Enrolled Students</h3>
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
            </div>
          ) : (
            <p>No students are enrolled in this course yet.</p>
          )}
        </>
      ) : (
        <p>Loading course details...</p>
      )}
    </div>
  );
};

export default StudentCoursesCardDetails;
