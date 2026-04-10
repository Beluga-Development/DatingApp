import { router } from "expo-router";
import { use, useContext, useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SessionContext } from "../util/session";
import * as api from "../util/api.js";
import ProfileManagement from "../components/ProfileManagement";

export default function ProfileCreationScreen () {
  const { setIsLoggedIn } = useContext(SessionContext);
  const { isProfileComplete, setIsProfileComplete } = useContext(SessionContext);

  //console.log("Profile Creation Screen - isProfileComplete:", isProfileComplete);

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

  useEffect(() => {
    //setIsProfileComplete(Boolean(api.data.getProfileDataContext()));
  }, []);


    return (
        <SafeAreaView style={{ flex: 1}}>
          <ProfileManagement editMode={isProfileComplete} setIsProfileComplete={setIsProfileComplete} />
            <Button title="Log Out" onPress={handleLogout} />
        </SafeAreaView>
    );
}
