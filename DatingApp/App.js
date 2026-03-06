import { Text, Button, View, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as api from "./util/api.js";
import { useState } from "react";

function App() {
  const [text, setText] = useState("Before Call");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(
    "Before calling to select all user data",
  );
  const [confirmation, setConfirmation] = useState("");

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
  const signUpUser = async () => {
    try {
      let result = await api.auth.signUp(email, password);
      setConfirmation(result.message);
    } catch (error) {
      setConfirmation(`Request failed: ${error.message}`);
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
          <Text style={{ margin: "auto" }}>Login or Sign up</Text>
          <TextInput
            style={{ borderWidth: 1 }}
            value={email}
            placeholder="Enter your email"
            onChangeText={setEmail}
          />
          <TextInput
            style={{ borderWidth: 1 }}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Login" onPress={getData} />
          <Button title="Sign Up" onPress={signUpUser} />
          <Text>{confirmation}</Text>
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
