import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? { ...storedUser, token: storedToken } : null);
  const [token, setToken] = useState(storedToken || null);

  const login = (data) => {
    const userWithToken = { ...data.user, token: data.token };
    localStorage.setItem("user", JSON.stringify(userWithToken));
    localStorage.setItem("token", data.token);

    setUser(userWithToken); 
    setToken(data.token);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
