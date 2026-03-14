import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Login from "../components/Login";
import { SessionContext } from "../util/session";
import * as api from "../util/api.js";
import { Text } from "react-native";

export default function LoginScreen() {
  const { setIsLoggedIn } = useContext(SessionContext);
  const { setIsProfileComplete } = useContext(SessionContext);

  const handleSetIsLoggedIn = (isLoggedIn, isProfileComplete) => {
    setIsLoggedIn(isLoggedIn);
    if (isLoggedIn) {
      setIsProfileComplete(isProfileComplete);
      if(isProfileComplete){
        router.replace("/(tabs)");
      } else {
        router.replace("/profile_creation");
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    const checkIfAlreadyLoggedIn = async () => {
      setLoading(true);
      handleSetIsLoggedIn(await api.getAccessToken());
    };
    checkIfAlreadyLoggedIn();
  });

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      {loading ? (
        <Text style={{ margin: "auto", color: "#e89bd8", fontSize: 34 }}>
          Loading
        </Text>
      ) : (
        <Login setIsLoggedIn={handleSetIsLoggedIn} />
      )}
    </SafeAreaView>
  );
}
