import React, { createContext, useContext } from "react";
import useAuth from "../hooks/useAuth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { user, carregando } = useAuth();

  return (
    <AuthContext.Provider value={{ user, carregando }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
