import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logoutUser } = useContext(AuthContext);
  const navLinks = [
    { id: 1, name: "Courses", path: "/home/courses" },
    { id: 2, name: "Students", path: "/home/students" },
  ];
  return (
    <nav className="flex justify-between items-center bg-blue-100 text-blue-500 px-3 py-2 h-[70px]">
      <h2 className="font-bold cursor-pointer hover:bg-blue-500 hover:text-white hover:px-2 hover:py-1 transition-all duration-300 rounded-md ">
        Training Program
      </h2>

      <ul className="flex gap-2 mr-10">
        {navLinks.map((link) => (
          <li key={link.id}>
            <Link
              to={`${link.path}`}
              className="hover:bg-blue-500 hover:text-white hover:px-2 hover:py-1 transition-all duration-300 rounded-md"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <ul>
        <button className="hover:bg-blue-500 hover:text-white hover:px-2 hover:py-1 transition-all duration-300 rounded-md" onClick={logoutUser}>
          Logout
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
