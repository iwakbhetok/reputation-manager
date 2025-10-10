
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  ChartPieIcon,
  StarIcon,
  Cog6ToothIcon,
  UsersIcon,
  RssIcon,
  UserCircleIcon,
  GoogleIcon,
} from '../shared/Icons';
import { useAuth } from '../../context/AuthContext';
import { useAppContext } from '../../context/AppContext';

const Sidebar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { isGoogleConnected, googleUser } = useAppContext();
  const navigate = useNavigate();
  
  const navItems = [
    { to: '/dashboard', icon: ChartPieIcon, label: 'Dashboard' },
    { to: '/reviews', icon: StarIcon, label: 'Reviews' },
    { to: '/team', icon: UsersIcon, label: 'Team' },
    { to: '/settings', icon: Cog6ToothIcon, label: 'Settings' },
  ];

  const baseLinkClasses = "flex items-center px-4 py-3 text-gray-200 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors duration-200";
  const activeLinkClasses = "bg-indigo-700 text-white font-semibold";

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <aside className="hidden md:flex flex-col w-64 bg-indigo-800 text-white">
      <div className="flex items-center justify-center h-20 border-b border-indigo-700">
        <RssIcon className="h-8 w-8 mr-2 text-indigo-300" />
        <span className="text-2xl font-bold">Reputation</span>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeLinkClasses : ''}`}
          >
            <item.icon className="h-6 w-6 mr-3" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-indigo-700">
        {isAuthenticated ? (
          <>
            <div className="flex items-center">
              <UserCircleIcon className="h-10 w-10 rounded-full text-white" />
              <div className="ml-3">
                <p className="text-sm font-medium">{user?.name || 'Admin User'}</p>
                <p className="text-xs text-indigo-200 truncate max-w-[120px]">{user?.email}</p>
              </div>
            </div>
            
            {isGoogleConnected && googleUser && (
              <div className="mt-3 flex items-center bg-indigo-700 p-2 rounded">
                <GoogleIcon className="h-6 w-6 mr-2" />
                <div className="text-xs">
                  <p className="truncate">{googleUser.name || googleUser.email}</p>
                  <p className="text-indigo-200">Google connected</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <button
            onClick={handleLogin}
            className="w-full flex items-center px-4 py-2 text-gray-200 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors duration-200"
          >
            <UserCircleIcon className="h-6 w-6 mr-3" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
