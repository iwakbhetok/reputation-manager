
import React, { useState, useRef, useEffect } from 'react';
import { useLocation as RouterLocation } from 'react-router-dom';
import type { Location } from '../../types';
import { BellIcon, BuildingOfficeIcon, ChevronDownIcon, GoogleIcon, UserCircleIcon } from '../shared/Icons';
import { useAppContext } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  locations: Location[];
  selectedLocation: Location;
  setSelectedLocation: (location: Location) => void;
}

const Header: React.FC<HeaderProps> = ({ locations, selectedLocation, setSelectedLocation }) => {
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const locationDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const routerLocation = RouterLocation();
  const { isGoogleConnected, googleUser, googleBusinessPlaces } = useAppContext();
  const { user, logout } = useAuth();

  const getPageTitle = () => {
    const path = routerLocation.pathname;
    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/reviews')) return 'Review Inbox';
    if (path.includes('/settings')) return 'Settings';
    if (path.includes('/team')) return 'Team Management';
    return 'Dashboard';
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target as Node)) {
        setLocationDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setLocationDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
  };

  return (
    <header className="flex items-center justify-between h-20 px-6 bg-white border-b border-gray-200">
      <h1 className="text-2xl font-semibold text-gray-800">{getPageTitle()}</h1>
      <div className="flex items-center space-x-6">
        <div className="relative" ref={locationDropdownRef}>
          <button
            onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
            className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 px-4 py-2 rounded-lg"
          >
            {isGoogleConnected && <GoogleIcon className="h-4 w-4 mr-2" />}
            <BuildingOfficeIcon className="h-5 w-5 mr-2 text-gray-500" />
            {selectedLocation.name}
            <ChevronDownIcon className={`h-5 w-5 ml-2 text-gray-500 transition-transform ${locationDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {locationDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <ul className="py-1">
                {(isGoogleConnected && googleBusinessPlaces.length > 0 ? googleBusinessPlaces : locations).map((loc) => (
                  <li key={loc.id}>
                    <button
                      onClick={() => handleLocationSelect(loc)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex flex-col"
                    >
                      <span className="font-semibold">{loc.name}</span>
                      <span className="text-xs text-gray-500">{loc.address}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button className="relative p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full">
          <BellIcon className="h-6 w-6" />
          <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-1 bg-red-500 rounded-full"></span>
        </button>
        
        {/* User Profile Dropdown */}
        <div className="relative" ref={userDropdownRef}>
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 px-4 py-2 rounded-lg"
          >
            <UserCircleIcon className="h-5 w-5 mr-2 text-gray-500" />
            {user?.name || 'Account'}
            <ChevronDownIcon className={`h-5 w-5 ml-2 text-gray-500 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <ul className="py-1">
                <li>
                  <span className="block px-4 py-2 text-sm text-gray-700 font-medium border-b border-gray-100 truncate">
                    {user?.email}
                  </span>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
