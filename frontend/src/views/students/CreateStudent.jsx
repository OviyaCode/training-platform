import React from "react";

const CreateStudent = () => {
  return (
    <div className="mx-3 bg-blue-50 w-[30%] p-3">
      <h3 className="text-center font-semibold my-4">Create Student</h3>
      <div className="flex flex-col">
        <div className="flex gap-4 items-center my-2">
          <label className="w-20">Name</label>
          <input
            type="text"
            placeholder="enter student name..."
            className="px-2 py-1 w-full"
          />
        </div>
        <div className="flex gap-4 items-center my-2">
          <label className="w-20">Email</label>
          <input
            type="email"
            placeholder="enter student email..."
            className="px-2 py-1 w-full"
          />
        </div>
        <div className="flex gap-5">
          <button className="mt-5 text-white bg-green-500 px-3 py-1 rounded-md w-52 ">
            Create Student
          </button>
          <button className="mt-5 bg-gray-300 px-3 py-1 rounded-md w-52 ">
           Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateStudent;
