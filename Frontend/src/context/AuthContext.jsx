import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  const login = () => setLoggedIn(true);
  const logout = () => {
    setLoggedIn(false);
    setToken('');
  };

  const setAuthToken = (newToken) => {
    setToken(newToken);
  };

  const getToken = () => token;

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, setAuthToken, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
