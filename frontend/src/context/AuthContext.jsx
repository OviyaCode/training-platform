import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseurl, postRequest } from "../utils/service";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [message, setMesaage] = useState(null);

  const navigate = useNavigate();
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [formInfo, setFormInfo] = useState({
    name: "",
    email: "",
    password: "",
    option: "", //training option
    courseId: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(JSON.parse(user));
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(JSON.parse(user));
  }, [formInfo]);

  //updating forminfo
  const updateFormInfo = useCallback((info) => {
    setFormInfo(info);
  }, []);

  //updating loginInfo
  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  //register user
  const register = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMesaage(null);

    const response = await postRequest(
      `${baseurl}/students/register`,
      JSON.stringify(formInfo)
    );
    console.log("register response", response);
    setLoading(false);
    if (response.error) {
      toast.error(response);
      return setError(response);
    }

    toast.success("Registered successfully!");
    setError(null);
    navigate("/");
  });

  //login user
  const login = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      console.log("Login info:", loginInfo);

      try {
        const response = await postRequest(
          `${baseurl}/students/login`,
          JSON.stringify(loginInfo)
        );
        console.log("Login response:", response);

        setLoading(false);

        if (response.error) {
          setError(response);
          return;
        }

        // Check if the response has the expected data
        if (response && typeof response === "object") {
          toast.success("Successfully logged in!");
          localStorage.setItem("user", JSON.stringify(response));
          console.log("User data stored in localStorage:", response);
          setUser(response);
          setError(null);
        } else {
          setError({ error: "Unexpected response format" });
          console.log("Unexpected response format:", response);
        }
      } catch (err) {
        console.error("Login failed:", err);
        setLoading(false);
        setError({ error: "Login failed. Please try again." });
      }
    },
    [loginInfo]
  );

  //logout user
  const logoutUser = useCallback(() => {
    localStorage.removeItem("user");
    navigate("/");
    setUser(null);
  }, []);

  //create new user
  const createNewUser = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      setMesaage(null);
      console.log("create user info", formInfo);

      try {
        const response = await postRequest(
          `${baseurl}/users/`,
          JSON.stringify(formInfo)
        );
        setLoading(false);

        if (response.error) {
          toast.error(response);
          return setError(response);
        }
      } catch (error) {}
    },
    [formInfo]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        formInfo,
        registerInfo,
        loginInfo,
        error,
        message,
        loading,
        createNewUser,
        register,
        login,
        updateFormInfo,
        updateLoginInfo,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
