import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoginView, setIsLoginView] = useState<boolean>(true); // true for login, false for register
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let success: boolean;
    if (isLoginView) {
      success = login(email, password);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('Invalid email or password. Try admin@reputationmanager.com / admin123');
      }
    } else {
      // For register view
      success = register('', email, password); // name is empty for now
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('Registration failed');
      }
    }
  };

  const handleDemoLogin = () => {
    setEmail('admin@reputationmanager.com');
    setPassword('admin123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Reputation Manager</h1>
          <p className="text-gray-600 mt-2">
            {isLoginView ? 'Sign in to your account' : 'Create a new account'}
          </p>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            className={`flex-1 py-2 px-4 rounded-lg font-medium ${
              isLoginView 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setIsLoginView(true)}
          >
            Sign In
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-lg font-medium ${
              !isLoginView 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setIsLoginView(false)}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLoginView && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your name"
              />
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 font-medium"
          >
            {isLoginView ? 'Sign In' : 'Register'}
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={handleDemoLogin}
            className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-200 font-medium text-sm"
          >
            Use Demo Account (admin@reputationmanager.com / admin123)
          </button>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Dummy credentials: admin@reputationmanager.com / admin123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;