import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      login(user);
      navigate(user.role === "admin" ? "/admin" : user.role === "teacher" ? "/teacher" : "/student");
    } else {
      alert("Invalid credentials");
    }

    // const response = await axios.get("http://localhost:5000/users");
    // const user = response.data.find((u) => u.email === email && u.password === password);
    // if (user) {
    //   login(user);
    //   if (user.role === "admin") {
    //     navigate("/admin");
    //   } else if (user.role === "teacher") {
    //     navigate("/teacher");
    //   } else if (user.role === "student") {
    //     navigate("/student");
    //   }
    // } else {
    //   alert("Invalid credentials");
    // }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
        <h2 className="mb-4 text-xl">Login</h2>
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
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Login
        </button>

        <p className="flex mt-3">
          don't have account!{" "}
          <Link to="/signup" className="text-red-700">
            {" "}
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
