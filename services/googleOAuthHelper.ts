/**
 * Helper functions for Google OAuth with Business Management API scope
 * 
 * Important: This is a frontend-only implementation for demonstration purposes.
 * In production, the token exchange should happen on your backend server
 * for security reasons (to protect your client secret).
 */

export interface OAuthConfig {
  clientId: string;
  clientSecret?: string; // Only for demo - should be on backend in production
  redirectUri: string;
  scope: string;
}

export interface OAuthTokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
}

/**
 * Initiates the Google OAuth flow for Business Management API access
 * @param config OAuth configuration including clientId, redirectUri, and scopes
 * @returns Promise that resolves with the authorization code
 */
export const initiateGoogleOAuth = (config: OAuthConfig): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Create a unique state parameter for security
    const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    // Store the state in sessionStorage for verification later
    sessionStorage.setItem('oauth_state', state);
    
    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${encodeURIComponent(config.clientId)}` +
      `&redirect_uri=${encodeURIComponent(config.redirectUri)}` +
      `&response_type=code` +
      `&scope=${encodeURIComponent(config.scope)}` +
      `&state=${state}` +
      `&access_type=offline` +
      `&prompt=consent`;
    
    // Open the OAuth URL in a new window/popup
    const popup = window.open(oauthUrl, 'google_oauth', 'width=600,height=600');
    
    // Listen for messages from the popup or for URL changes
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'GOOGLE_OAUTH_CODE') {
        resolve(event.data.code);
        window.removeEventListener('message', handleMessage);
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    // Check if popup was blocked or closed
    const checkPopup = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(checkPopup);
        reject(new Error('OAuth popup was closed or blocked'));
        window.removeEventListener('message', handleMessage);
      }
    }, 1000);

    // Also monitor for URL changes (for cases where popup redirects instead of messaging)
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    const handleUrlChange = () => {
      // Check if the URL contains an authorization code
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const stateParam = urlParams.get('state');

      if (code && stateParam === state) {
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
        resolve(code);
        
        // Remove listeners
        window.removeEventListener('message', handleMessage);
        history.pushState = originalPushState;
        history.replaceState = originalReplaceState;
      }
    };

    history.pushState = function (...args) {
      originalPushState.apply(history, args);
      handleUrlChange();
    };

    history.replaceState = function (...args) {
      originalReplaceState.apply(history, args);
      handleUrlChange();
    };
  });
};

/**
 * Exchanges an authorization code for an access token
 * IMPORTANT: In production, this should be done on your backend server
 * @param code Authorization code received from Google OAuth
 * @param config OAuth configuration
 * @returns Promise that resolves with token response
 */
export const exchangeCodeForToken = async (
  code: string,
  config: OAuthConfig
): Promise<OAuthTokenResponse> => {
  // NOTE: For production applications, this exchange should happen on your backend
  // to protect your client secret. The following implementation is for development only.
  if (!config.clientId) {
    throw new Error('Missing Google Client ID');
  }
  
  // If client secret is not available (production case), guide developer to backend solution
  if (!config.clientSecret) {
    console.warn('GOOGLE_CLIENT_SECRET is not configured. In production, you must exchange the authorization code for an access token on your backend server.');
    throw new Error('For security reasons, token exchange must happen on your backend server. Please implement a backend endpoint to handle this.');
  }
  
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `code=${encodeURIComponent(code)}` +
          `&client_id=${encodeURIComponent(config.clientId)}` +
          `&client_secret=${encodeURIComponent(config.clientSecret)}` +
          `&redirect_uri=${encodeURIComponent(config.redirectUri)}` +
          `&grant_type=authorization_code`
  });
  
  if (!response.ok) {
    throw new Error(`Failed to exchange code for token: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * Gets a new access token using a refresh token
 * @param refreshToken The refresh token
 * @param config OAuth configuration
 * @returns Promise that resolves with token response
 */
export const refreshAccessToken = async (
  refreshToken: string,
  config: OAuthConfig
): Promise<OAuthTokenResponse> => {
  if (!config.clientId || !config.clientSecret) {
    throw new Error('Missing Google client credentials');
  }
  
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `refresh_token=${encodeURIComponent(refreshToken)}` +
          `&client_id=${encodeURIComponent(config.clientId)}` +
          `&client_secret=${encodeURIComponent(config.clientSecret)}` +
          `&grant_type=refresh_token`
  });
  
  if (!response.ok) {
    throw new Error(`Failed to refresh token: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * Configuration for Google Business Management API
 */
export const BUSINESS_API_CONFIG: OAuthConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
  redirectUri: window.location.origin, // Should match your OAuth redirect URI in Google Cloud Console
  scope: 'https://www.googleapis.com/auth/business.manage' // Scope for Business Profile Management API
};