import React, { createContext, useEffect, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '', 
    inventory: [], 
    chats: [] 
  });
  const [isUrlWorking, setIsUrlWorking] = useState(true);
  const [urlrequest, seturlrequest] = useState(process.env.REACT_APP_API_URL);
  useEffect(() => {
    const checkUrl = async () => {
      try {
        const response = await fetch(urlrequest);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error checking URL:', error);
        setIsUrlWorking(false);

       seturlrequest('https://projectrp.onrender.com')
      }
    };

    checkUrl();
  }, [urlrequest]);
  return (
    <AppContext.Provider value={{ user, setUser, urlrequest, seturlrequest }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
