// src/contexts/UserContext.jsx

import { createContext, useState } from 'react';

const UserContext = createContext();

// Add the new getUserFromToken function
const getUserFromToken = () => {
  const token = localStorage.getItem('token');

  if (!token) return null;

  return JSON.parse(atob(token.split('.')[1])).payload;
};

function UserProvider({ children }) {
  // Create state just like you normally would in any other component
  const [user, setUser] = useState(getUserFromToken());

  // This is the user state and the setUser function that will update it!
  // This variable name isn't special; it's just convention to use `value`.
  const value = { user, setUser };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };