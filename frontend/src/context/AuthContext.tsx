import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, StudentProfile } from '../types';
import { authApi, profileApi } from '../api/client';

interface AuthContextType {
  user: User | null;
  profile: StudentProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('interntrack_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshProfile = async () => {
    try {
      if (localStorage.getItem('interntrack_jwt_token')) {
        const p = await profileApi.getMyProfile();
        setProfile(p);
      }
    } catch (err) {
      console.warn('Could not fetch student profile:', err);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('interntrack_jwt_token');
      if (token) {
        try {
          const me = await authApi.getMe();
          setUser(me);
          localStorage.setItem('interntrack_user', JSON.stringify(me));
          await refreshProfile();
        } catch (err) {
          console.warn('Token verification failed:', err);
          logout();
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await authApi.login({ email, password });
      localStorage.setItem('interntrack_jwt_token', data.access_token);
      localStorage.setItem('interntrack_user', JSON.stringify(data.user));
      setUser(data.user);
      await refreshProfile();
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData: any) => {
    setLoading(true);
    try {
      const data = await authApi.register(formData);
      localStorage.setItem('interntrack_jwt_token', data.access_token);
      localStorage.setItem('interntrack_user', JSON.stringify(data.user));
      setUser(data.user);
      await refreshProfile();
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('interntrack_jwt_token');
    localStorage.removeItem('interntrack_user');
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, login, register, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
