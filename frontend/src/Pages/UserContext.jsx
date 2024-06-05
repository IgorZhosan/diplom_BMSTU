import React, { createContext, useState, useContext, useEffect } from "react";

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const registerUser = (userData) => {
    const newUsers = [...users, userData];
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
  };

  return (
    <UserContext.Provider value={{ users, registerUser }}>
      {children}
    </UserContext.Provider>
  );
};
