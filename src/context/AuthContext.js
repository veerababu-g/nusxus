import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem('nexus_admin_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/admin/login', { email, password });
      localStorage.setItem('nexus_admin_token', data.token);
      localStorage.setItem('nexus_admin_user', JSON.stringify(data.admin));
      setAdmin(data.admin);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post('/admin/logout');
    } catch (err) {
      // Non-fatal: proceed with local logout regardless.
    }
    localStorage.removeItem('nexus_admin_token');
    localStorage.removeItem('nexus_admin_user');
    setAdmin(null);
  }, []);

  const isAuthenticated = Boolean(admin && localStorage.getItem('nexus_admin_token'));

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading, error, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
