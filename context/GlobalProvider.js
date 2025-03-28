import React from 'react';
import { createContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../lib/appwrite';

// Create context
const GlobalContext = createContext();

// Export the GlobalContext directly
export { GlobalContext };

const GlobalProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        // Check auth status when component mounts
        const checkAuth = async () => {
            try {
                const userData = await getCurrentUser();
                if (userData) {
                    setIsLoggedIn(true);
                    setUser(userData);
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            } catch (error) {
                console.log("Auth error:", error);
                setIsLoggedIn(false);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };
        
        checkAuth();
    }, []);
    
    return (
        <GlobalContext.Provider 
            value={{
                isLoggedIn,
                user,
                isLoading,
                setIsLoggedIn,
                setUser
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;