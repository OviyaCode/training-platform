import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./layout/Home";
import CreateCourse from "./views/courses/CreateCourse";
import CourseList from "./views/courses/CourseList";
import UpdateCourse from "./views/courses/UpdateCourse";
import StudentList from "./views/students/StudentList";
import CreateStudent from "./views/students/CreateStudent";
import UpdateStudent from "./views/students/UpdateStudent";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);
  console.log("user from app", user);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to={"/home"} /> : <Login />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />}>
          <Route path="courses" element={<CourseList />} />
          <Route path="courses/create" element={<CreateCourse />} />
          <Route path="courses/:id" element={<UpdateCourse />} />
          <Route path="students" element={<StudentList />} />
          <Route path="students/create" element={<CreateStudent />} />
          <Route path="students/edit" element={<UpdateStudent />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
