import { Text, Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as api from "./util/api.js";
import { useState } from "react";

function App() {
  const [text, setText] = useState("Before Call");
  const [loginText, setLoginText] = useState("Login or Sign up");
  const [userData, setUserData] = useState(
    "Before calling to select all user data",
  );

  const getData = async () => {
    try {
      let result = await api.data.getHelloWorld();
      setText(result.message);
    } catch (error) {
      setText(`Request failed: ${error.message}`);
    }
  };
  const getUsersData = async () => {
    try {
      let result = await api.data.getAllUserData();
      setUserData(JSON.stringify(result));
    } catch (error) {
      setUserData(`Request failed: ${error.message}`);
    }
  };

  return (
    <>
      <SafeAreaView>
        <Text>Testing Server Connection</Text>
        <View
          style={{ padding: 20, backgroundColor: "#bbbbbb", borderRadius: 12 }}
        >
          <Text>{text}</Text>
          <Button title="route/helloworld" onPress={getData} />
        </View>
        <Text>Login and sign up</Text>
        <View
          style={{ padding: 20, backgroundColor: "#bbbbbb", borderRadius: 12 }}
        >
          <Text>{loginText}</Text>
          <Button title="Login" onPress={getData} />
          <Button title="Sign Up" onPress={getData} />
        </View>
        <Text>Testing getting all user data</Text>
        <View
          style={{ padding: 20, backgroundColor: "#bbbbbb", borderRadius: 12 }}
        >
          <Text>{userData}</Text>
          <Button title="route/user_data" onPress={getUsersData} />
        </View>
      </SafeAreaView>
    </>
  );
}

export default App;
