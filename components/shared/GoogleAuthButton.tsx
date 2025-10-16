import React, { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { BUSINESS_API_CONFIG, initiateGoogleOAuth } from '../../services/googleOAuthHelper';

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

  // Handle the OAuth callback when redirected back from Google
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    
    if (code && state) {
      // This is the callback after OAuth, we'll process it
      // Remove the parameters from the URL to clean it up
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // In a real implementation, you'd exchange the code for a token on your backend
      console.log("OAuth code received. In a real app, you would send this to your backend to exchange for an access token.");
      
      // For demo purposes, we'll need to use a backend endpoint to exchange the code
      // Since we can't do that here, we'll show an alert with instructions
      alert("Authorization code received. In a real application, this code would be sent to your backend to exchange for an access token with the Google Business Management scope.");
    }
  }, []);

  const onClick = async () => {
    try {
      // For Google Business API access, we need to initiate the OAuth flow with the correct scope
      // This will redirect the user to Google's consent screen
      
      // Check if the required configuration is available
      if (!BUSINESS_API_CONFIG.clientId) {
        throw new Error('GOOGLE_CLIENT_ID is not configured in environment variables');
      }
      
      // Initiate the OAuth flow
      const code = await initiateGoogleOAuth(BUSINESS_API_CONFIG);
      
      // In a real application, you would send this code to your backend
      // to exchange for an access token with the business management scope
      console.log('Authorization code received:', code);
      
      // For now, we'll simulate a successful login with a placeholder token
      // In reality, you'd want to exchange the code for a token on your backend
      const placeholderUser = {
        email: 'demo@example.com', // This would come from the ID token
        name: 'Demo User',
        picture: undefined,
        accessToken: `placeholder_token_${Date.now()}` // Placeholder - real token would come from backend
      };
      
      connectGoogle(placeholderUser, placeholderUser.accessToken);
      
      if (onSuccess) {
        onSuccess(placeholderUser);
      }
      
      console.log('Google OAuth flow completed. User should be redirected to Google consent screen.');
    } catch (error: any) {
      console.error('Error in Google OAuth flow:', error);
      
      // Handle specific redirect_uri_mismatch error
      if (error.message && error.message.includes('redirect_uri_mismatch')) {
        console.error(
          'Redirect URI mismatch error. Please ensure the following:\n' +
          '1. The redirect URI in your Google Cloud Console matches your application URL\n' +
          '2. For development, common URIs are: http://localhost:3000 or http://localhost:5173\n' +
          '3. Make sure to include the exact protocol (http/https) and port number\n' +
          '4. Your GOOGLE_REDIRECT_URI env variable should match the configured URI if different\n\n' +
          'Check the documentation at: docs/google-business-api-setup.md'
        );
      }
      
      if (onFailure) {
        onFailure(error);
      }
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
          <span>Connect Google Business</span>
        </>
      )}
    </button>
  );
};

export default GoogleAuthButton;