import {router} from "expo-router";
import {useContext, useState} from "react";
import {Button, View} from "react-native";
import {SessionContext} from "../../util/session";
import * as api from "../../util/api.js";

import ProfileCreation from "../../components/ProfileCreation"

export default function ProfileScreen() {
  const { setIsLoggedIn } = useContext(SessionContext);
  const [profileData, setProfileData] = useState();
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

  const getUserData = async () => {
    try {
      let result = await api.data.getUserData();
      console.log(result);
    } catch (error) {
      console.log(`Request failed: ${error.message}`);
    }
  };

  return (
      <View style={{flex: 1, alignItems: "center", justifyContent: "flex-start", marginTop: "10%"}}>
     <ProfileCreation/>
      <Button title="Log Out" onPress={handleLogout} />
      <Button title="GET USER DATA TESTING" onPress={getUserData} />
    </View>
  );
}
