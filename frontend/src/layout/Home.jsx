import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <section>
      <Navbar />
      <div className="w-full flex justify-center">
        <h1 className="my-3 font-semibold text-black/80">Welcome to Home 👋</h1>
      </div>
      <Outlet/>
    </section>
  );
};

export default Home;
