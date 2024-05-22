import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CreateCourse from "./CreateCourse"
const CourseList = () => {
  const navigate = useNavigate();
  const [formOpen, setFormOpen] = useState(false);
  const buttonGroups = [
    {
      id: 1,
      name: "Edit",
      icon: (
        <FaRegEdit
          className="text-yellow-600 hover:bg-yellow-600 hover:text-white rounded-sm p-1"
          fontSize={25}
        />
      ),
      path: "/home/students/edit",
    },
    {
      id: 2,
      name: "View",
      icon: (
        <FaEye
          className="text-blue-600 hover:bg-blue-600 hover:text-white rounded-sm p-1"
          fontSize={25}
        />
      ),
      path: "/home/students/view",
    },
    {
      id: 3,
      name: "Delete",
      icon: (
        <MdDelete
          className="text-red-600 hover:bg-red-600 hover:text-white rounded-sm p-1"
          fontSize={25}
        />
      ),
      path: "/home/students/delete",
    },
  ];
  return (
    <div className="flex gap-5">
      <div className="w-[40%]">
        <table className="bg-gray-200 text-left w-full border-collapse mx-2 rounded-md">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-2 py-2">#</th>
              <th className="px-2 py-2">Name</th>
              <th className="px-2 py-2">Email</th>
              <th className="px-2 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2">1</td>
              <td className="px-1">Patchi raja</td>
              <td className="px-1">patchi@gmail.com</td>
              <td className="px-2 flex gap-2">
                {buttonGroups.map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => navigate(`${btn.path}`)}
                    className="transition-all duration-300"
                  >
                    {btn.icon}
                  </button>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <CreateCourse/>
    </div>
  );
};

export default CourseList;
