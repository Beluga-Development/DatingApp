import { router } from "expo-router";
import { useContext, useState } from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SessionContext } from "../util/session";
import * as api from "../util/api.js";
import ProfileCreation from "../components/ProfileCreation";

export default function ProfileCreationScreen () {
  const { setIsLoggedIn } = useContext(SessionContext);
  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  const logout = async () => {
    try {
      let result = await api.auth.logout();
      setIsLoggedIn(Boolean(result?.session?.access_token));
    } catch (error) {
      console.log(`Request failed: ${error.message}`);
    }
  };

    return (
        <SafeAreaView style={{ flex: 1}}>
            <ProfileCreation/>
            <Button title="Log Out" onPress={handleLogout} />
        </SafeAreaView>
    );
}
