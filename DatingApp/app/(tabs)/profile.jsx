import { router } from "expo-router";
import { useContext, useState } from "react";
import { Button, Text, View } from "react-native";
import { SessionContext } from "../../util/session";

export default function ProfileScreen() {
  const { setIsLoggedIn } = useContext(SessionContext);
  const [profileData, setProfileData] = useState();
  const handleLogout = () => {
    setIsLoggedIn(false);
    router.replace("/login");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile</Text>
      <Text
        style={{
          width: "80%",

          backgroundColor: "#777777",
          borderRadius: 12,
          margin: 10,
        }}
      >
        {profileData}
      </Text>
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
}
