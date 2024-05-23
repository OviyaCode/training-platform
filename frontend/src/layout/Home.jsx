import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const {user} = useContext(AuthContext)
  // console.log("user from home", user.token);
  return (
    <section>
      <Navbar />
      <div className="w-full flex justify-center">
        <h1 className="my-3 font-semibold text-black/80">{user?.name} Welcome to Home 👋</h1>
      </div>
      <Outlet/>
    </section>
  );
};

export default Home;
