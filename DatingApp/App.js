import { StatusBar } from "expo-status-bar";
import { View, TextInput, Text, Alert, Pressable } from "react-native";
import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

function App() {
  const [loaded, error] = useFonts({
    Bitcount: require("./assets/fonts/Bitcount.ttf"),
  });

  const APP_NAME = `DatingApp`;

  return (
    <>
      <h1>Hello World</h1>
    </>
  );
}

export default App;
