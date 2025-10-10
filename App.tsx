
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardPage from './pages/DashboardPage';
import ReviewsPage from './pages/ReviewsPage';
import SettingsPage from './pages/SettingsPage';
import TeamPage from './pages/TeamPage';
import LoginPage from './pages/LoginPage';
import { mockLocations } from './constants';
import type { Location } from './types';
import { AppProvider } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Public route that redirects if already logged in
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" replace />;
};

const AppContent: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location>(mockLocations[0]);

  return (
    <Routes>
      <Route path="/login" element={
        <PublicRoute>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <LoginPage />
          </div>
        </PublicRoute>
      } />
      <Route 
        path="*"
        element={
          <MainLayout selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
        }
      />
    </Routes>
  );
};

interface MainLayoutProps {
  selectedLocation: Location;
  setSelectedLocation: (location: Location) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ selectedLocation, setSelectedLocation }) => {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          locations={mockLocations} 
          selectedLocation={selectedLocation} 
          setSelectedLocation={setSelectedLocation} 
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage location={selectedLocation} />
              </ProtectedRoute>
            } />
            <Route path="/reviews" element={
              <ProtectedRoute>
                <ReviewsPage location={selectedLocation} />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } />
            <Route path="/team" element={
              <ProtectedRoute>
                <TeamPage />
              </ProtectedRoute>
            } />
            {/* This route should not be needed since login is handled separately, but keeping for safety */}
            <Route path="/login" element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AuthProvider>
        <HashRouter>
          <AppContent />
        </HashRouter>
      </AuthProvider>
    </AppProvider>
  );
};

export default App;
