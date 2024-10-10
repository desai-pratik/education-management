import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [assignedTeacher, setAssignedTeacher] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { fetchData } = useOutletContext();

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!description) newErrors.description = "Description is required";
    if (!startDate) newErrors.startDate = "Start date is required";
    if (!endDate) newErrors.endDate = "End date is required";
    if (!assignedTeacher) newErrors.assignedTeacher = "Assigned teacher is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // const newCourse = { title, description, startDate, endDate, assignedTeacher };
    // await axios.post("http://localhost:5000/courses", newCourse);
    // navigate("/admin");
    
    const courses = JSON.parse(localStorage.getItem("courses")) || [];
    const newCourse = {
      id: Date.now(),
      title,
      description,
      startDate,
      endDate,
      assignedTeacher,
      enrolledStudents: [],
    };
    
    courses.push(newCourse);
    localStorage.setItem("courses", JSON.stringify(courses));
    fetchData();
    navigate("/admin");

  };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-3">Add Course</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <div className="mb-4">
          <input type="text" placeholder="Course Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 w-full" />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Course Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full"
          />
          {errors.description && <p className="text-red-500">{errors.description}</p>}
        </div>
        <div className="mb-4">
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border p-2 w-full" />
          {errors.startDate && <p className="text-red-500">{errors.startDate}</p>}
        </div>
        <div className="mb-4">
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border p-2 w-full" />
          {errors.endDate && <p className="text-red-500">{errors.endDate}</p>}
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Assigned Teacher"
            value={assignedTeacher}
            onChange={(e) => setAssignedTeacher(e.target.value)}
            className="border p-2 w-full"
          />
          {errors.assignedTeacher && <p className="text-red-500">{errors.assignedTeacher}</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
          Add Course
        </button>
        <Link to={`/admin`} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default AddCourse;
