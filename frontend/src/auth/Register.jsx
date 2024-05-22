import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[90vh] bg-gray-100 ">
      <div className="lg:w-[30%] md:w-[50%] w-[55%] flex flex-col gap-3 bg-white py-5 px-4 rounded-md shadow-sm">
        <label className="text-center font-semibold text-xl mb-4 text-black/80">
          Register to unlock your skills
        </label>
        <div className="flex gap-3 items-center">
          <label className="text-black/60 font-semibold w-28">Username</label>
          <input
            type="text"
            className="w-full rounded-md border-2 focus:border-0 px-3 py-1 focus:bg-blue-100 outline-none"
          />
        </div>
        <div className="flex gap-3 items-center">
          <label className="text-black/60 font-semibold w-28">Email</label>
          <input
            type="text"
            className="w-full rounded-md border-2 focus:border-0 px-3 py-1 focus:bg-blue-100 outline-none"
          />
        </div>
        <div className="flex gap-3 items-center">
          <label className="text-black/60 font-semibold w-28">Password</label>
          <input
            type="text"
            className="w-full rounded-md border-2 focus:border-0 px-3 py-1 focus:bg-blue-100 outline-none"
          />
        </div>
        <div className="flex items-center justify-center">
          <button className="bg-blue-500 w-[50%] py-1 text-white rounded-xl hover:bg-blue-800 transition-all duration-700">
            Register
          </button>
        </div>
      </div>
      <p className="my-3">
        Already have an account{" "}
        <Link className="text-blue-500 underline" to={"/"}>
          login
        </Link>
      </p>
    </div>
  );
};

export default Register;
