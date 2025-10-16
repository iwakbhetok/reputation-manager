import type { Location } from '../types';

// Fetch Google Business Places from the actual Google Business API
export const fetchGoogleBusinessPlaces = async (accessToken: string): Promise<Location[]> => {
  try {
    // First, get the account information to determine the correct account ID
    const accountsResponse = await fetch(
      'https://mybusinessbusinessinformation.googleapis.com/v1/accounts',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    let locationsUrl;
    if (!accountsResponse.ok) {
      // If fetching accounts fails, try the default approach with '-' placeholder
      if (accountsResponse.status === 401) {
        console.warn('Google Business API: Unauthorized when fetching accounts - check access token and required scopes (https://www.googleapis.com/auth/business.manage)');
        throw new Error('Unauthorized: Please ensure the access token has the required Google Business scope');
      } else if (accountsResponse.status === 403) {
        console.warn('Google Business API: Forbidden - account may not have access to business data');
        throw new Error('Forbidden: Account does not have permission to access business data');
      } else {
        console.warn(`Failed to fetch accounts list, will try default account: ${accountsResponse.status} ${accountsResponse.statusText}`);
        // Continue with the default approach below
        locationsUrl = 'https://mybusinessbusinessinformation.googleapis.com/v1/accounts/-/locations';
      }
    } else {
      const accountsData = await accountsResponse.json();
      
      // Use the first account if available, otherwise use the default placeholder
      if (accountsData && accountsData.accounts && accountsData.accounts.length > 0) {
        const accountName = accountsData.accounts[0].name; // This is the full resource name like "accounts/1234567890"
        locationsUrl = `https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations`;
      } else {
        console.warn('No accounts found, using default account placeholder');
        locationsUrl = 'https://mybusinessbusinessinformation.googleapis.com/v1/accounts/-/locations';
      }
    }

    // Make the locations request
    const response = await fetch(
      locationsUrl,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        console.warn('Google Business API: Unauthorized - check access token and required scopes (https://www.googleapis.com/auth/business.manage)');
        throw new Error('Unauthorized: Please ensure the access token has the required Google Business scope');
      } else if (response.status === 403) {
        console.warn('Google Business API: Forbidden - account may not have access to business data');
        throw new Error('Forbidden: Account does not have permission to access business data');
      } else {
        throw new Error(`Google Business API request failed: ${response.status} ${response.statusText}`);
      }
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
  } catch (error) {
    console.error('Error fetching Google Business Places:', error);
    throw error;
  }
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

// This function will be called after successful Google login
export const initializeGoogleBusinessPlaces = async (googleUser: any, accessToken?: string): Promise<Location[]> => {
  if (!accessToken) {
    // In a real application, you would implement a proper OAuth flow to get an access token
    // with the 'https://www.googleapis.com/auth/business.manage' scope
    // This typically involves:
    // 1. Redirecting the user to Google's OAuth consent screen
    // 2. Google redirects back with an authorization code
    // 3. Exchanging the authorization code for an access token on your backend
    // 4. Using that access token to call the Google Business API
    console.warn('No access token provided for Google Business API');
    return [];
  }

  try {
    return await fetchGoogleBusinessPlaces(accessToken);
  } catch (error) {
    console.error('Error initializing Google Business Places:', error);
    return [];
  }
};