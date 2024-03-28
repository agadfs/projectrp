import React, { createContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '', 
    inventory: [], 
    chats: [] 
  });
  const [urlrequest, seturlrequest] = useState('https://projectrp.onrender.com');

  return (
    <AppContext.Provider value={{ user, setUser, urlrequest, seturlrequest }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
