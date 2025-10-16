/**
 * API proxy helper for Google Business API
 * 
 * This file demonstrates how to implement a backend proxy for Google Business API calls
 * to avoid exposing credentials in the frontend and to handle OAuth token exchanges securely.
 * 
 * In a real application, you would implement these endpoints on your backend server.
 */

import type { Location } from '../types';

export interface GoogleBusinessApiResponse {
  locations: Array<{
    name: string;
    locationName: string;
    primaryPhone: string;
    address: any; // Google's address object format
    websiteUri: string;
    regularHours: any;
    locationState: any;
    storeCode: string;
    languageCode: string;
  }>;
  nextPageToken?: string;
}

export interface GoogleAccountResponse {
  accounts: Array<{
    name: string; // Format: "accounts/1234567890"
    accountName: string;
    type: string;
    permissionLevel: string;
  }>;
}

/**
 * Fetches accounts using a backend proxy
 * @param accessToken The access token with business management scope
 * @returns Promise with account information
 */
export const fetchAccountsViaProxy = async (accessToken: string): Promise<GoogleAccountResponse> => {
  // In a real implementation, this would call your backend endpoint
  // Example: return await fetch('/api/google/accounts', { 
  //   method: 'GET', 
  //   headers: { 'Authorization': `Bearer ${accessToken}` } 
  // });
  
  console.warn('This is a frontend-only demo. In production, implement a backend proxy endpoint at /api/google/accounts');
  
  // Fallback: Make the request from the frontend (not recommended for production)
  const response = await fetch(
    'https://mybusinessbusinessinformation.googleapis.com/v1/accounts',
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Google Business API request failed: ${response.status} ${response.statusText}`);
  }

  return await response.json();
};

/**
 * Fetches locations using a backend proxy
 * @param accountId The account ID to fetch locations for
 * @param accessToken The access token with business management scope
 * @returns Promise with location information
 */
export const fetchLocationsViaProxy = async (
  accountId: string,
  accessToken: string
): Promise<Location[]> => {
  // In a real implementation, this would call your backend endpoint
  // Example: return await fetch(`/api/google/accounts/${accountId}/locations`, { 
  //   method: 'GET', 
  //   headers: { 'Authorization': `Bearer ${accessToken}` } 
  // });
  
  console.warn('This is a frontend-only demo. In production, implement a backend proxy endpoint at /api/google/accounts/{accountId}/locations');
  
  // Fallback: Make the request from the frontend (not recommended for production)
  const response = await fetch(
    `https://mybusinessbusinessinformation.googleapis.com/v1/${accountId}/locations`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Google Business API request failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  
  // Transform the Google Business API response into our Location format
  if (data && data.locations) {
    return data.locations.map((location: any) => ({
      id: location.name, // Google's location name is in the format "accounts/{account}/locations/{locationId}"
      name: location.locationName || 'Unnamed Location',
      address: formatAddress(location.address),
    }));
  }
  
  return [];
};

// Format Google's address object into a single string
const formatAddress = (addressObj: any): string => {
  if (!addressObj) return 'Address not available';
  
  const parts = [
    addressObj.addressLines?.join(' '),
    addressObj.locality,
    addressObj.administrativeArea,
    addressObj.postalCode,
    addressObj.countryCode
  ].filter(Boolean);
  
  return parts.join(', ');
};

/**
 * Exchange authorization code for access token using a backend proxy
 * @param code The authorization code from Google OAuth
 * @param redirectUri The redirect URI used in the OAuth request
 * @returns Promise with token response
 */
export const exchangeCodeForTokenViaProxy = async (
  code: string,
  redirectUri: string
): Promise<{ access_token: string; refresh_token?: string; expires_in: number; scope: string }> => {
  // In a real implementation, this would call your backend endpoint
  // Example: return await fetch('/api/google/exchange-token', { 
  //   method: 'POST', 
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ code, redirectUri })
  // });
  
  console.warn('This is a frontend-only demo. In production, implement a backend proxy endpoint at /api/google/exchange-token');
  throw new Error('Token exchange must happen on your backend server to protect your client secret. Please implement a backend endpoint for this.');
};