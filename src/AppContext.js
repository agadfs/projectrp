import React, { createContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '', 
    inventory: [], 
    chats: [] 
  });
  /* https://projectrp.onrender.com */  /* http://localhost:4000 */
  const [urlrequest, seturlrequest] = useState('http://localhost:4000');

  return (
    <AppContext.Provider value={{ user, setUser, urlrequest, seturlrequest }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
