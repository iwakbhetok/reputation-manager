import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string; name: string } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, password: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy credentials for testing
const DUMMY_CREDENTIALS = {
  email: 'admin@reputationmanager.com',
  password: 'admin123',
  name: 'Admin User'
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  const login = (email: string, password: string): boolean => {
    // Check if credentials match dummy account
    if (email === DUMMY_CREDENTIALS.email && password === DUMMY_CREDENTIALS.password) {
      setIsAuthenticated(true);
      setUser({
        email: DUMMY_CREDENTIALS.email,
        name: DUMMY_CREDENTIALS.name
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const register = (name: string, email: string, password: string): boolean => {
    // In a real app, you would register the user
    // For now, just set the user as authenticated
    setIsAuthenticated(true);
    setUser({
      email,
      name
    });
    return true;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};