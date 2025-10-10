import type { Location } from '../types';

// Mock data for Google Business Places
// In a real application, this would fetch from the Google Business API
export const fetchGoogleBusinessPlaces = async (accessToken: string): Promise<Location[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, this would make an actual API call to Google Business API
  // For demo purposes, we'll return a subset of the mock locations
  // based on the user's Google account email
  const mockPlaces: Location[] = [
    { 
      id: 'google_loc1', 
      name: 'Google Coffee Shop', 
      address: '1001 Google Ave, Mountain View, CA' 
    },
    { 
      id: 'google_loc2', 
      name: 'Google Business Cafe', 
      address: '2002 Google Blvd, Mountain View, CA' 
    },
    { 
      id: 'google_loc3', 
      name: 'Mountain View Branch', 
      address: '3003 Silicon Valley Rd, Mountain View, CA' 
    }
  ];

  return mockPlaces;
};

// This function will be called after successful Google login
export const initializeGoogleBusinessPlaces = async (googleUser: any): Promise<Location[]> => {
  // In a real application, we would use the access token from the Google login
  // For now, we'll simulate with mock data
  try {
    // Here you would typically use the access token to call Google Business API
    // const places = await fetchGoogleBusinessPlaces(accessToken);
    
    // For demo purposes, return some mock places related to the Google account
    return await fetchGoogleBusinessPlaces('mock-token');
  } catch (error) {
    console.error('Error initializing Google Business Places:', error);
    // If there's an error, return empty array or fallback to default locations
    return [];
  }
};