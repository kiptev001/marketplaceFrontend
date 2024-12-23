'use client';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import api from '@/src/http';

interface User {
  email: string;
  activationLink: string;
  firstName?:string;
  secondName?:string;
}

interface AuthContextType {
  user: User | null;
  logout: () => void;
  login: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const checkAuth = async () => {
    try {
      const response = await api.post('/users/check');
      setUser(response.data);
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = () => setUser(null);
  const login = () => checkAuth();

  return (
    <AuthContext.Provider value={{ user, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
