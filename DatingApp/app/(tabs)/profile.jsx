import {router} from "expo-router";
import {useContext, useState} from "react";
import {Button, View} from "react-native";
import {SessionContext} from "../../util/session";
import * as api from "../../util/api.js";

import ProfileManagement from "../../components/ProfileManagement"

export default function ProfileScreen() {
  const { setIsLoggedIn } = useContext(SessionContext);
  const { isProfileComplete, setIsProfileComplete } = useContext(SessionContext);
  console.log("Profile Screen - isProfileComplete:", isProfileComplete);
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

  // const getUserData = async () => {
  //   try {
  //     let result = await api.data.getUserData();
  //     console.log(result);
  //   } catch (error) {
  //     console.log(`Request failed: ${error.message}`);
  //   }
  // };

 

  return (
      <View style={{flex: 1, alignItems: "center", justifyContent: "flex-start", marginTop: "10%"}}>
        <ProfileManagement editMode={!isProfileComplete} setIsProfileComplete={setIsProfileComplete} />
      <Button title="Log Out" onPress={handleLogout} />
      {/* <Button title="GET USER DATA TESTING" onPress={getUserData} /> */}
    </View>
  );
}
