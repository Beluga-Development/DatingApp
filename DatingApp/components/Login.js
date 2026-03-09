import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import * as api from "../util/api.js";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const signUpUser = async () => {
    try {
      let result = await api.auth.signUp(email, password);
      setConfirmation(result.message);
    } catch (error) {
      setConfirmation(`Request failed: ${error.message}`);
    }
  };

  const loginUser = async () => {
    try {
      let result = await api.auth.loginUser(email, password);
      setConfirmation(result.message);
      setIsLoggedIn(Boolean(result?.session?.access_token));
    } catch (error) {
      setConfirmation(`Request failed: ${error.message}`);
    }
  };

  return (
    <>
      <Text>
        Login and sign up. After sign up you have to click authorization link in
        email sent to the sign up email. If you spam multiple sign ups it will
        block you and you will have to wait
      </Text>
      <View
        style={{
          padding: 20,
          backgroundColor: "#bbbbbb",
          borderRadius: 12,
        }}
      >
        <Text style={{ margin: "auto" }}>Login or Sign up</Text>
        <TextInput
          textContentType="emailAddress"
          style={{ borderWidth: 1 }}
          value={email}
          placeholder="Enter your email"
          onChangeText={setEmail}
        />
        <TextInput
          textContentType="password"
          style={{ borderWidth: 1 }}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Login" onPress={loginUser} />
        <Button title="Sign Up" onPress={signUpUser} />
        <Text>{confirmation}</Text>
      </View>
    </>
  );
}
export default Login;
