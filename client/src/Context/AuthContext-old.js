import React, { createContext } from 'react';
import useAuth from '../hooks/useAuth';

const Context = createContext();

function AuthProvider({ children }) {
  const {
    authenticated, role, loading, handleLogin, handleLogout, api, userId
  } = useAuth();

  return (
    <Context.Provider value={{ loading, authenticated, role, handleLogin, handleLogout, api, userId }}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };