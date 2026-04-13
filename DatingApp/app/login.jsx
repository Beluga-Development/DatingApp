import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Login from "../components/Login";
import { SessionContext } from "../util/session";
import * as api from "../util/api.js";
import { Text } from "react-native";

export default function LoginScreen() {
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, setIsLoggedIn } = useContext(SessionContext);
  const { isProfileComplete, setIsProfileComplete } = useContext(SessionContext);

const handleSetIsLoggedIn = (loggedIn) => {
  setIsLoggedIn(loggedIn);
};
const handleSetIsProfileComplete = (profileComplete) => {
  //console.log("Setting profile complete status to:", profileComplete);
  setIsProfileComplete(profileComplete);
}

useEffect(() => {
  const checkIfAlreadyLoggedIn = async () => {
    const token = await api.getAccessToken();
    setIsLoggedIn(!!token);
    
    if (!token) {
      setLoading(false); // stop loading if not logged in
    } else {
        const profileData = await api.data.getCurrentProfileData();
        console.log("Profile data on login check:", profileData.profile_data);
        setIsProfileComplete(Boolean(profileData.profile_data.FirstName)); // Assuming profile is complete if FirstName exists
        setLoading(false);
    }
  };

  checkIfAlreadyLoggedIn();
}, []);

// useEffect(() => {
//   if (!isLoggedIn) return;

//   const fetchProfile = async () => {
//     const profileComplete = Boolean(await api.data.getCurrentProfileData());
//     setIsProfileComplete(profileComplete);
//     //console.log("Profile complete status:", profileComplete);
//     setLoading(false);
//   };

//   fetchProfile();
// }, [isLoggedIn]);

useEffect(() => {
  if (!loading && isLoggedIn) {
    console.log("Redirecting based on profile completeness:", isProfileComplete);
    router.replace(
      isProfileComplete ? "/(tabs)" : "/profile_creation"
    );
  }
}, [loading, isLoggedIn]);

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      {loading ? (
        <Text style={{ margin: "auto", color: "#e89bd8", fontSize: 34 }}>
          Loading
        </Text>
      ) : (
        <Login
          setIsLoggedIn={handleSetIsLoggedIn}
          setIsProfileComplete={handleSetIsProfileComplete}
        />
      )}
    </SafeAreaView>
  );
}
