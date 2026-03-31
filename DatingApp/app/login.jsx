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

useEffect(() => {
  const checkIfAlreadyLoggedIn = async () => {
    const token = await api.getAccessToken();
    setIsLoggedIn(!!token);
    
    if (!token) {
      setLoading(false); // stop loading if not logged in
    }
  };

  checkIfAlreadyLoggedIn();
}, []);

useEffect(() => {
  if (!isLoggedIn) return;

  const fetchProfile = async () => {
    const profileComplete = Boolean(await api.data.getCurrentProfileData());
    setIsProfileComplete(profileComplete);
    setLoading(false);
  };

  fetchProfile();
}, [isLoggedIn]);

useEffect(() => {
  if (!loading && isLoggedIn) {
    router.replace(
      isProfileComplete ? "/(tabs)" : "/profile_creation"
    );
  }
}, [loading, isLoggedIn, isProfileComplete]);

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      {loading ? (
        <Text style={{ margin: "auto", color: "#e89bd8", fontSize: 34 }}>
          Loading
        </Text>
      ) : (
        <Login
          setIsLoggedIn={handleSetIsLoggedIn}
          setIsProfileComplete={setIsProfileComplete}
        />
      )}
    </SafeAreaView>
  );
}
