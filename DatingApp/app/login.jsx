import { router } from "expo-router";
import { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Login from "../components/Login";
import { SessionContext } from "../util/session";

export default function LoginScreen() {
  const { setIsLoggedIn } = useContext(SessionContext);

  const handleSetIsLoggedIn = (value) => {
    setIsLoggedIn(value);
    if (value) {
      router.replace("/(tabs)");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Login setIsLoggedIn={handleSetIsLoggedIn} />
    </SafeAreaView>
  );
}
