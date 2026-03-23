import { Text, Button, View, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as api from "../util/api.js";
import { useState, useEffect } from "react";

function DevTesting() {
  const [text, setText] = useState("Before Call");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(
    "Before calling to select all user data",
  );
  const [confirmation, setConfirmation] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getData = async () => {
    try {
      let result = await api.data.getHelloWorld();
      setText(result.message);
    } catch (error) {
      setText(`Request failed: ${error.message}`);
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
  const loginUser = async () => {
    try {
      let result = await api.auth.loginUser(email, password);
      setConfirmation(result.message);
      setIsLoggedIn(Boolean(result?.session?.access_token));
    } catch (error) {
      setConfirmation(`Request failed: ${error.message}`);
    }
  };
  const logout = async () => {
    try {
      let result = await api.auth.logout();
      setConfirmation(result.message);
      setIsLoggedIn(Boolean(result?.session?.access_token));
    } catch (error) {
      setConfirmation(`Request failed: ${error.message}`);
    }
  };

  useEffect(() => {
    const checkIfAlreadyLoggedIn = async () => {
      let result = await api.getAccessToken();
      setIsLoggedIn(Boolean(result));
    };
    checkIfAlreadyLoggedIn();
  }, []);

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <Text>Testing Server Connection</Text>
          <View
            style={{
              padding: 20,
              backgroundColor: "#bbbbbb",
              borderRadius: 12,
            }}
          >
            <Text>{text}</Text>
            <Button title="route/helloworld" onPress={getData} />
          </View>
          {!isLoggedIn && (
            <>
              <Text>
                Login and sign up. After sign up you have to click authorization
                link in email sent to the sign up email. If you spam multiple
                sign ups it will block you and you will have to wait
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
                <Button title="Login" onPress={loginUser} />
                <Button title="Sign Up" onPress={signUpUser} />
                <Text>{confirmation}</Text>
              </View>
            </>
          )}
          <Text>
            Testing getting all user data. Will only work if logged in or else
            you will get 401 not authorizatied
          </Text>
          <View
            style={{
              padding: 20,
              backgroundColor: "#bbbbbb",
              borderRadius: 12,
            }}
          >
            <Text>{userData}</Text>
            <Button title="route/user_data" onPress={getUsersData} />
          </View>
          <Text
            style={{
              margin: "auto",
              fontSize: 40,
              color: isLoggedIn ? "#3ad029" : "#c00d0d",
            }}
          >
            {isLoggedIn ? "You are logged in" : "Not logged in"}
            {isLoggedIn && <Button title="route/logout" onPress={logout} />}
          </Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default DevTesting;
