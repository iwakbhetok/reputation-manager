
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { Location } from '../types';
import { initializeGoogleBusinessPlaces } from '../services/googleBusinessApi';

interface GoogleUser {
  email: string;
  name: string;
  picture?: string;
  accessToken?: string; // Add access token field
}

interface AppContextType {
  isGoogleConnected: boolean;
  googleUser: GoogleUser | null;
  googleBusinessPlaces: Location[];
  setGoogleBusinessPlaces: (places: Location[]) => void;
  connectGoogle: (user?: GoogleUser) => void;
  disconnectGoogle: () => void;
  loadingGoogleStatus: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const [googleUser, setGoogleUser] = useState<GoogleUser | null>(null);
  const [googleBusinessPlaces, setGoogleBusinessPlaces] = useState<Location[]>([]);
  const [loadingGoogleStatus, setLoadingGoogleStatus] = useState(true);

  // Check for existing Google connection on app load
  useEffect(() => {
    const storedGoogleUser = localStorage.getItem('googleUser');
    const storedIsConnected = localStorage.getItem('isGoogleConnected');
    const storedGoogleBusinessPlaces = localStorage.getItem('googleBusinessPlaces');

    if (storedGoogleUser && storedIsConnected === 'true') {
      try {
        const parsedUser = JSON.parse(storedGoogleUser);
        setGoogleUser(parsedUser);
        setIsGoogleConnected(true);
        
        if (storedGoogleBusinessPlaces) {
          try {
            const parsedPlaces = JSON.parse(storedGoogleBusinessPlaces);
            setGoogleBusinessPlaces(parsedPlaces);
          } catch (e) {
            console.error('Error parsing stored Google Business Places', e);
          }
        }
      } catch (e) {
        console.error('Error parsing stored Google user data', e);
      }
    }
    setLoadingGoogleStatus(false);
  }, []);

  const connectGoogle = async (user?: GoogleUser, accessToken?: string) => {
    // In a real implementation, this would be called after successful OAuth
    // with the 'https://www.googleapis.com/auth/business.manage' scope
    // For now, if no user is provided, we'll simulate by asking for email
    if (!user) {
      const email = prompt('Enter your Google email for demonstration:');
      if (email) {
        user = {
          email,
          name: email.split('@')[0], // Simple mock name
          picture: undefined,
          accessToken: accessToken || undefined
        };
      } else {
        return; // User cancelled the prompt
      }
    } else if (accessToken) {
      // If user is provided but we also have an access token, add it to the user object
      user.accessToken = accessToken;
    }
    
    setIsGoogleConnected(true);
    setGoogleUser(user);
    
    // Fetch Google Business Places associated with this Google account
    try {
      const places = await initializeGoogleBusinessPlaces(user, user?.accessToken);
      setGoogleBusinessPlaces(places);
    } catch (error) {
      console.error('Error fetching Google Business Places:', error);
      // Set empty array if there's an error
      setGoogleBusinessPlaces([]);
    }
    
    // Store in localStorage
    localStorage.setItem('googleUser', JSON.stringify(user));
    localStorage.setItem('isGoogleConnected', 'true');
    localStorage.setItem('googleBusinessPlaces', JSON.stringify(places));
  };

  const disconnectGoogle = () => {
    setIsGoogleConnected(false);
    setGoogleUser(null);
    setGoogleBusinessPlaces([]);
    
    // Remove from localStorage
    localStorage.removeItem('googleUser');
    localStorage.removeItem('isGoogleConnected');
    localStorage.removeItem('googleBusinessPlaces');
  };

  return (
    <AppContext.Provider value={{ 
      isGoogleConnected, 
      googleUser, 
      googleBusinessPlaces,
      setGoogleBusinessPlaces,
      connectGoogle, 
      disconnectGoogle, 
      loadingGoogleStatus 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
