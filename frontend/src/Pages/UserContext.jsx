import React, { createContext, useState, useContext } from "react";

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const registerUser = (userData) => {
    setUsers((prevUsers) => [...prevUsers, userData]);
    console.log("Сохранённые данные пользователей:", users);
  };

  return (
    <UserContext.Provider value={{ users, registerUser }}>
      {children}
    </UserContext.Provider>
  );
};
