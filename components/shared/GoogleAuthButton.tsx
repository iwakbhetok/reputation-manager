import React, { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

interface GoogleAuthButtonProps {
  onSuccess?: (user: any) => void;
  onFailure?: (error: any) => void;
  children?: React.ReactNode;
}

declare global {
  interface Window {
    google: any;
  }
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ 
  onSuccess, 
  onFailure, 
  children = null 
}) => {
  const { connectGoogle } = useAppContext();

  useEffect(() => {
    // Load Google Platform Library
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initGoogleSignIn;
    document.body.appendChild(script);

    return () => {
      // Cleanup script if needed
      document.body.removeChild(script);
    };
  }, []);

  const initGoogleSignIn = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.GOOGLE_CLIENT_ID || '', // Replace with your actual client ID in production
        callback: handleCredentialResponse,
        auto_select: false,
      });
    }
  };

  const handleCredentialResponse = (response: any) => {
    try {
      // Decode the JWT response to get user info
      const userCred = decodeJwtResponse(response.credential);
      
      // In a real implementation, you would implement a complete OAuth flow to get an access token
      // with the 'https://www.googleapis.com/auth/business.manage' scope.
      // The Google Sign-In button only provides authentication, not the specific API access needed.
      // For Google Business API access, you would need to implement the OAuth 2.0 flow separately
      // to request the 'https://www.googleapis.com/auth/business.manage' scope.
      
      // For demonstration purposes, we're passing the credential as is.
      // NOTE: This will likely result in a 401 error if the access token doesn't have the proper scope
      connectGoogleWithInfo(userCred, response.credential);
      
      if (onSuccess) {
        onSuccess(userCred);
      }
    } catch (error) {
      console.error('Error handling Google login:', error);
      if (onFailure) {
        onFailure(error);
      }
    }
  };

  const decodeJwtResponse = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Error decoding JWT:', e);
      throw e;
    }
  };

  const connectGoogleWithInfo = (userInfo: any, accessToken?: string) => {
    // Create a proper GoogleUser object from the JWT response
    const googleUser = {
      email: userInfo.email,
      name: userInfo.name,
      picture: userInfo.picture,
      accessToken: accessToken
    };
    
    // In a real app, we would update the state with actual user info
    // For now, we'll trigger the existing connectGoogle function
    connectGoogle(googleUser, accessToken);
  };

  const onClick = () => {
    if (window.google) {
      window.google.accounts.id.prompt();
    } else {
      // Fallback: Use the mock implementation
      connectGoogle();
    }
  };

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      {children || (
        <>
          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          <span>Continue with Google</span>
        </>
      )}
    </button>
  );
};

export default GoogleAuthButton;