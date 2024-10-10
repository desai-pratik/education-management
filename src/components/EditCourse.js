import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";

const EditCourse = () => {
  const [course, setCourse] = useState({ title: "", description: "", startDate: "", endDate: "", assignedTeacher: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchData } = useOutletContext();

  useEffect(() => {
    // const fetchCourse = async () => {
    //   const response = await axios.get(`http://localhost:5000/courses/${id}`);
    //   setCourse(response.data);
    // };

    const fetchCourse = () => {
      const courses = JSON.parse(localStorage.getItem("courses")) || [];
      const foundCourse = courses.find(course => course.id === parseInt(id));
      if (foundCourse) {
        setCourse(foundCourse);
      }
    };

    fetchCourse();
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    if (!course.title) newErrors.title = "Title is required";
    if (!course.description) newErrors.description = "Description is required";
    if (!course.startDate) newErrors.startDate = "Start date is required";
    if (!course.endDate) newErrors.endDate = "End date is required";
    if (!course.assignedTeacher) newErrors.assignedTeacher = "Assigned teacher is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // await axios.put(`http://localhost:5000/courses/${id}`, course);
    const courses = JSON.parse(localStorage.getItem("courses")) || [];
    const updatedCourses = courses.map(c => c.id === parseInt(id) ? { ...c, ...course } : c);
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
    
    navigate("/admin");
    fetchData()
  };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Edit Course</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Course Title"
            value={course.title}
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
            className="border p-2 w-full"
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Course Description"
            value={course.description}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
            className="border p-2 w-full"
          />
          {errors.description && <p className="text-red-500">{errors.description}</p>}
        </div>
        <div className="mb-4">
          <input
            type="date"
            value={course.startDate}
            onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
            className="border p-2 w-full"
          />
          {errors.startDate && <p className="text-red-500">{errors.startDate}</p>}
        </div>
        <div className="mb-4">
          <input
            type="date"
            value={course.endDate}
            onChange={(e) => setCourse({ ...course, endDate: e.target.value })}
            className="border p-2 w-full"
          />
          {errors.endDate && <p className="text-red-500">{errors.endDate}</p>}
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Assigned Teacher"
            value={course.assignedTeacher}
            onChange={(e) => setCourse({ ...course, assignedTeacher: e.target.value })}
            className="border p-2 w-full"
          />
          {errors.assignedTeacher && <p className="text-red-500">{errors.assignedTeacher}</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
          Update Course
        </button>
        <Link to={`/admin`} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default EditCourse;
