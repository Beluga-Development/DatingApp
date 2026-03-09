import { createContext, useState } from "react";

export const SessionContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export function SessionProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <SessionContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </SessionContext.Provider>
  );
}
