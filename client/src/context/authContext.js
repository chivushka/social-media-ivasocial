import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  
  let count=0;
  const [change, setChange] = useState(0)
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    localStorage.clear();

    const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
      withCredentials: true,
    });

    setCurrentUser(res.data)
  };

  const logout = async () => {
    localStorage.clear();

    const res = await axios.get("http://localhost:8800/api/auth/logout", {
      withCredentials: true,
    });
    setCurrentUser(null);
  };

  const setNewChange = () => {
    count+=1;
    setChange(count)

  }

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:8800/api/users/find/" + currentUser.id);
      setCurrentUser(res.data)
    }
    fetchUser()
  }, [change]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);


  return (
    <AuthContext.Provider value={{ currentUser, login, logout, setNewChange }}>
      {children}
    </AuthContext.Provider>
  );
};