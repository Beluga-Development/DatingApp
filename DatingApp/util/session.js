import { createContext, useState } from "react";

export const SessionContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  isProfileComplete: false,
  setIsProfileComplete: () => {},
});

export function SessionProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  return (
    <SessionContext.Provider value={{ isLoggedIn, setIsLoggedIn, isProfileComplete, setIsProfileComplete }}>
      {children}
    </SessionContext.Provider>
  );
}
