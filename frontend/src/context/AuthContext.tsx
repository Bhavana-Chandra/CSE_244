import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authService, type AuthUser } from '../services/auth';
import { progressService } from '../services/progress';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  saveProgress: (scenarioId: string, choiceMade: string, isCorrect: boolean) => Promise<void>;
  getUserProgress: () => Promise<any>;
  getUserStats: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check current user on mount
    const checkUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Listen for auth state changes
    const { data: { subscription } } = authService.onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await authService.signIn({ email, password });
      // User state will be updated via auth state change listener
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.signOut();
      setUser(null);
    } catch (error: any) {
      throw new Error(error.message || 'Logout failed');
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    setLoading(true);
    try {
      await authService.signUp({ email, password, full_name: name || '' });
      // User state will be updated via auth state change listener
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const saveProgress = async (scenarioId: string, choiceMade: string, isCorrect: boolean) => {
    if (!user) throw new Error('User must be logged in to save progress');
    try {
      await progressService.saveProgress(user.id, scenarioId, choiceMade, isCorrect);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to save progress');
    }
  };

  const getUserProgress = async () => {
    if (!user) throw new Error('User must be logged in to get progress');
    return await progressService.getUserProgress(user.id);
  };

  const getUserStats = async () => {
    if (!user) throw new Error('User must be logged in to get stats');
    return await progressService.getUserStats(user.id);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout, 
      register, 
      saveProgress,
      getUserProgress,
      getUserStats
    }}>
      {children}
    </AuthContext.Provider>
  );
};