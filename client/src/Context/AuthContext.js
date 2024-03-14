import React, { createContext, useState, useEffect } from 'react';

import useAuth from './hooks/useAuth';

const Context = createContext();

function AuthProvider({ children }) {
  const {
    authenticated, loggedUser, loading, handleLogin, handleLogout,
  } = useAuth();

  return (
    <Context.Provider value={{ loading, authenticated, loggedUser, handleLogin, handleLogout }}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };