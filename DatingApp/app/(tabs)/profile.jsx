import { router } from "expo-router";
import { useContext } from "react";
import { Button, Text, View } from "react-native";
import { SessionContext } from "../../util/session";

export default function ProfileScreen() {
  const { setIsLoggedIn } = useContext(SessionContext);

  const handleLogout = () => {
    setIsLoggedIn(false);
    router.replace("/login");
  };

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text>Profile</Text>
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
}
