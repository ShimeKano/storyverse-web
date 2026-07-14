import { createContext, useContext, useMemo, useState } from 'react';
import { api } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('storyverse_token'));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('storyverse_user');
    return raw ? JSON.parse(raw) : null;
  });

  const login = async ({ usernameOrEmail, password }) => {
    const response = await api.post('/auth/login', { usernameOrEmail, password });
    localStorage.setItem('storyverse_token', response.data.token);
    localStorage.setItem('storyverse_user', JSON.stringify(response.data.user));
    setToken(response.data.token);
    setUser(response.data.user);
    return response.data;
  };

  const register = async (payload) => {
    await api.post('/auth/register', payload);
  };

  const logout = () => {
    localStorage.removeItem('storyverse_token');
    localStorage.removeItem('storyverse_user');
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout,
      setUser
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
