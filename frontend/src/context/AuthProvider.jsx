import { useCallback, useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';
import { AuthContext } from './AuthContext';

function readStoredUser() {
  try {
    const raw = localStorage.getItem('storyverse_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    localStorage.removeItem('storyverse_user');
    return null;
  }
}

function decodePayload(token) {
  const encoded = token.split('.')[1].replaceAll('-', '+').replaceAll('_', '/');
  const padded = encoded.padEnd(Math.ceil(encoded.length / 4) * 4, '=');
  return JSON.parse(atob(padded));
}

function isExpired(token) {
  if (!token) return true;
  try {
    const payload = decodePayload(token);
    return typeof payload.exp !== 'number' || payload.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
}

export default function AuthProvider({ children }) {
  const storedToken = localStorage.getItem('storyverse_token');
  const [token, setToken] = useState(() => (isExpired(storedToken) ? null : storedToken));
  const [user, setUser] = useState(() => (isExpired(storedToken) ? null : readStoredUser()));
  const logout = useCallback(() => {
    localStorage.removeItem('storyverse_token'); localStorage.removeItem('storyverse_user'); setToken(null); setUser(null);
  }, []);
  useEffect(() => { if (!token) logout(); }, [logout, token]);
  useEffect(() => { window.addEventListener('storyverse:unauthorized', logout); return () => window.removeEventListener('storyverse:unauthorized', logout); }, [logout]);
  const login = useCallback(async ({ usernameOrEmail, password }) => {
    const response = await api.post('/auth/login', { usernameOrEmail, password });
    localStorage.setItem('storyverse_token', response.data.token); localStorage.setItem('storyverse_user', JSON.stringify(response.data.user)); setToken(response.data.token); setUser(response.data.user); return response.data;
  }, []);
  const register = useCallback((payload) => api.post('/auth/register', payload), []);
  const value = useMemo(() => ({ token, user, isAuthenticated: Boolean(token && user), login, register, logout, setUser }), [login, logout, register, token, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
