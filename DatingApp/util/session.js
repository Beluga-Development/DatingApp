import { createContext, useState } from "react";

export const SessionContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  isProfileComplete: false,
  setIsProfileComplete: () => {},
  profileData: {},
  setProfileData: () => {},
});

export function SessionProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [profileData, setProfileData] = useState({});
  return (
    <SessionContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isProfileComplete,
        setIsProfileComplete,
        profileData,
        setProfileData,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
