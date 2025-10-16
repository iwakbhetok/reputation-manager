# Google Business API Integration Guide

This document explains how to properly set up Google Business API integration to avoid 401 Unauthorized errors.

## Overview

The Google Business Profile API allows you to manage your business information on Google. This requires a specific OAuth scope (`https://www.googleapis.com/auth/business.manage`) that must be obtained during the OAuth flow.

## Prerequisites

1. A Google Cloud Project with the Google Business Profile API enabled
2. OAuth 2.0 credentials (Client ID and Client Secret)
3. Properly configured OAuth consent screen

## Step-by-Step Setup

### 1. Enable the Google Business Profile API

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to "APIs & Services" > "Library"
4. Search for "Google My Business API" or "Business Profile Performance API"
5. Click on "Google Business Profile API" and click "Enable"

### 2. Configure OAuth Consent Screen

1. In Google Cloud Console, go to "APIs & Services" > "OAuth consent screen"
2. Configure the consent screen with your application details
3. Add the following sensitive scopes:
   - `https://www.googleapis.com/auth/business.manage` - Manage your business profiles

### 3. Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application" as the application type
4. Add your authorized redirect URIs:
   - For development: `http://localhost:3000` (or your dev server port)
   - For production: your production URL
5. Note down your Client ID and Client Secret

### 4. Environment Variables Setup

Create or update your `.env.local` file:

```env
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_CLIENT_ID=your_google_client_id
# Note: GOOGLE_CLIENT_SECRET should only be used for development
# In production, token exchange must happen on your backend
```

### 5. Backend Implementation (Required for Production)

For production use, you must implement backend endpoints to handle:

#### A. OAuth Code Exchange
```javascript
// Example backend endpoint for exchanging authorization code
app.post('/api/google/exchange-token', async (req, res) => {
  const { code, redirectUri } = req.body;
  
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `code=${encodeURIComponent(code)}` +
          `&client_id=${process.env.GOOGLE_CLIENT_ID}` +
          `&client_secret=${process.env.GOOGLE_CLIENT_SECRET}` +
          `&redirect_uri=${encodeURIComponent(redirectUri)}` +
          `&grant_type=authorization_code`
  });
  
  const tokenData = await tokenResponse.json();
  res.json(tokenData);
});
```

#### B. API Proxy Endpoints
```javascript
// Example backend proxy for accounts
app.get('/api/google/accounts', async (req, res) => {
  const accessToken = req.headers.authorization?.replace('Bearer ', '');
  
  const response = await fetch('https://mybusinessbusinessinformation.googleapis.com/v1/accounts', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
  });
  
  res.json(await response.json());
});

// Example backend proxy for locations
app.get('/api/google/accounts/:accountId/locations', async (req, res) => {
  const { accountId } = req.params;
  const accessToken = req.headers.authorization?.replace('Bearer ', '');
  
  const response = await fetch(
    `https://mybusinessbusinessinformation.googleapis.com/v1/${accountId}/locations`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    }
  );
  
  res.json(await response.json());
});
```

### 6. Frontend Implementation

The frontend implementation in this project includes:

- `GoogleAuthButton`: Initiates the OAuth flow with the correct scopes
- `googleOAuthHelper`: Provides utility functions for OAuth flow
- `googleBusinessApi`: Handles API calls to Google Business API
- `googleBusinessApiProxy`: Demonstrates backend proxy approach

### 7. Testing the Integration

1. Ensure your Google account has access to at least one business profile
2. Log in via the Google Auth button
3. Check browser console for any errors
4. If you receive 401 errors, verify:
   - The access token has the correct scope
   - The Google Cloud project has the API enabled
   - Your Google account is linked to business profiles

## Common Issues and Solutions

### 401 Unauthorized Errors

- Ensure the OAuth flow includes the `https://www.googleapis.com/auth/business.manage` scope
- Verify the access token has the correct scope by decoding it
- Confirm your Google account has permissions to manage business profiles

### No Accounts Found

- Verify that your Google account is associated with at least one business profile
- Check that the business profile is verified and active

### CORS Issues

- For development, you can use a backend proxy to avoid CORS issues
- For production, ensure your domain is added to authorized origins in Google Cloud Console

## Security Considerations

1. Never expose your `GOOGLE_CLIENT_SECRET` in frontend code
2. Always exchange authorization codes for access tokens on your backend
3. Implement proper token refresh logic
4. Validate tokens on your backend before making API calls

## Additional Resources

- [Google Business Profile API Documentation](https://developers.google.com/my-business/)
- [OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com/)