import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-blue-500 p-4 text-white flex justify-between items-center">
      <h1 className="text-2xl">School Management</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>{`${user.username}-(${user.role})`}</li>

          {user && user.role === "admin" && (
            <li>
              <Link to="/admin/add-course" className="mr-4">
                Add Course
              </Link>
            </li>
          )}
          <li>
            <Link to="/login" className="hover:underline" onClick={logout}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
