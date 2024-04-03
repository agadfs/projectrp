import React, { createContext, useEffect, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '',
    inventory: [],
    chats: []
  });
  const initialUrlRequest = localStorage.getItem('newapiserver') || process.env.REACT_APP_API_URL;
  const [isUrlWorking, setIsUrlWorking] = useState(false);
  const [urlrequest, seturlrequest] = useState(initialUrlRequest);
  useEffect(() => {

    const checkUrl = async () => {

      try {
        const response = await fetch(process.env.REACT_APP_API_URL);
        if (response) {
          localStorage.removeItem('newapiserver');
         if(initialUrlRequest === 'https://projectrp.onrender.com'){
          window.location.reload()
         }
        }
      } catch (error) {
       
        localStorage.setItem('newapiserver', 'https://projectrp.onrender.com');
        

      }

    };

    checkUrl();
  }, []);
  return (
    <AppContext.Provider value={{ user, setUser, urlrequest, seturlrequest }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
