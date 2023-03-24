import React, { useContext, useState, useEffect } from "react";
import useAuthRequests from "../hooks/useAuthRequests";

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContext = React.createContext({
  loginHandler: () => {},
  logoutHandler: () => {},
  loggedIn: false,
  loggedInUser: {},
});

const AuthContextProvider = React.memo(({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const initialUser = { username: "", _id: "", email: "" };
  const [loggedInUser, setLoggedInUser] = useState(initialUser);
  const { authenticate } = useAuthRequests();
  const { isSuccess, data, isError, error } = authenticate;

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return setLoggedIn(false);
    authenticate.mutate(token);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setLoggedIn(true);
      setLoggedInUser(data.data.user);
    }
    if (isError) {
      console.log(error);
      setLoggedIn(false);
      setLoggedInUser(initialUser);
    }
  }, [isSuccess, data, error, isError]);

  const loginHandler = (data) => {
    const { token, user } = data;
    if (token) {
      localStorage.setItem("token", token);
      setLoggedInUser(user);
      setLoggedIn(true);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setLoggedInUser(initialUser);
  };

  const value = { loggedIn, loginHandler, logoutHandler, loggedInUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
});

export default AuthContextProvider;
