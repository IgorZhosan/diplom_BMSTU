import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext(null); // Создание и экспорт контекста

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isAuthenticatedCookie = Cookies.get("auth_cookie");
    setIsAuthenticated(!!isAuthenticatedCookie);
  }, []);

  const login = async () => {
    setIsAuthenticated(true);
    Cookies.set("auth_cookie", "true", { expires: 1 });
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove("auth_cookie");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
