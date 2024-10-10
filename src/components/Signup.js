import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    // const user = { username, password, role };
    // await axios.post("http://localhost:5000/users", user);
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const newUser = {
      id: Date.now(), // Unique ID generated from current timestamp
      username,
      password,
      role,
      email,
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow-md">
        <h2 className="mb-4 text-xl">Signup</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} className="border p-2 mb-4 w-full">
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Signup
        </button>
        <p className="flex mt-3">
          already have account!{" "}
          <Link to="/login" className="text-red-700">
            {" "}
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
