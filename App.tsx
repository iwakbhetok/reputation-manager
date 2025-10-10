
import React, { useState, useEffect } from 'react';
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
import { AppProvider, useAppContext } from './context/AppContext';
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

const HeaderWithLocations: React.FC<{ selectedLocation: Location; setSelectedLocation: (location: Location) => void }> = ({ selectedLocation, setSelectedLocation }) => {
  const { isGoogleConnected, googleBusinessPlaces } = useAppContext();
  const [firstLoad, setFirstLoad] = useState(true);
  
  // Use Google Business Places if connected and available, otherwise use mock locations
  const displayedLocations = isGoogleConnected && googleBusinessPlaces.length > 0 
    ? googleBusinessPlaces 
    : mockLocations;

  // Update selected location if Google connection status changes and the current selected location is not in the new list
  useEffect(() => {
    // Skip on first load to preserve the initial selected location
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }

    // If the current selected location is not in the displayed locations, select the first one from the new list
    if (!displayedLocations.some(loc => loc.id === selectedLocation.id)) {
      if (displayedLocations.length > 0) {
        setSelectedLocation(displayedLocations[0]);
      }
    }
  }, [displayedLocations, selectedLocation, setSelectedLocation, firstLoad]);

  return (
    <Header 
      locations={displayedLocations} 
      selectedLocation={selectedLocation} 
      setSelectedLocation={setSelectedLocation} 
    />
  );
};

const MainLayout: React.FC<MainLayoutProps> = ({ selectedLocation, setSelectedLocation }) => {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderWithLocations 
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
