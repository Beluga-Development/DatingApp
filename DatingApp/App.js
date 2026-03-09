import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import DevTesting from "./components/DevTesting.js";
import Login from "./components/Login.js";

function App() {
  const [stage, setStage] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <SafeAreaView>
        {
          {
            devTesting: <DevTesting />,
            home: <Text>Hello</Text>,
            login: <Login setIsLoggedIn={setIsLoggedIn} />,
          }[stage]
        }
      </SafeAreaView>
    </>
  );
}

export default App;
