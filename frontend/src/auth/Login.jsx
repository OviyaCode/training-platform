import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const Login = () => {
  const navigate = useNavigate();
  const { updateLoginInfo, loginInfo, login, error, message } =
    useContext(AuthContext);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let emailErr = "";
    let passwordErr = "";

    if (!loginInfo.email) {
      emailErr = "Email is required";
    }

    if (!loginInfo.password) {
      passwordErr = "Password is required";
    }

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (emailErr || passwordErr) {
      return;
    }

    await login(e);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    updateLoginInfo({
      ...loginInfo,
      [name]: value,
    });

    if (name === "email") {
      setEmailError(value ? null : "Email is required");
    } else if (name === "password") {
      setPasswordError(value ? null : "Password is required");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && e.target.name === "email") {
      setEmailError(loginInfo.email ? null : "Email is required");
    }
    if (e.key === "Backspace" && e.target.name === "password") {
      setPasswordError(loginInfo.password ? null : "Password is required");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-[100vh] bg-gray-100 ">
      <div className="lg:w-[30%] md:w-[50%] w-[55%] flex flex-col gap-3 bg-white py-5 px-4 rounded-md shadow-sm">
        <label className="text-center font-semibold text-xl mb-4 text-black/80">
          Login to unlock your skills
        </label>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div>
            <div className="flex gap-3 items-center">
              <label className="text-black/60 font-semibold w-28">Email</label>
              <input
                type="email"
                name="email"
                className="w-full rounded-md border-2 focus:border-0 px-3 py-1 focus:bg-blue-100 outline-none"
                value={loginInfo.email}
                autoFocus
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
            </div>
            {emailError && (
              <p className="text-red-500 bg-transparent text-center mt-2">
                {emailError}
              </p>
            )}
          </div>
          <div>
            <div className="flex gap-3 items-center">
              <label className="text-black/60 font-semibold w-28">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full rounded-md border-2 focus:border-0 px-3 py-1 focus:bg-blue-100 outline-none"
                value={loginInfo.password}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
            </div>
            {passwordError && (
              <p className="text-red-500 bg-transparent text-center mt-2">
                {passwordError}
              </p>
            )}
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 w-[50%] py-1 text-white rounded-xl hover:bg-blue-800 transition-all duration-700"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <p className="my-3">
        New to here ? Let&apos;s create{" "}
        <Link className="text-blue-500 underline" to={"/register"}>
          new
        </Link>
      </p>
    </div>
  );
};

export default Login;
