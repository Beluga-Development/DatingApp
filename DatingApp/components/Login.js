import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as api from "../util/api.js";
import styles, { palette } from "../style.js";

function Login({ setIsLoggedIn, setIsProfileComplete }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const signUpUser = async () => {
    if (!email || !password) {
      setIsError(true);
      setConfirmation("Please enter an email and password.");
      return;
    }
    setLoading(true);
    setConfirmation("");
    setIsError(false);
    try {
      let result = await api.auth.signUp(email, password);
      setIsError(false);
      setConfirmation(result.message);
    } catch (error) {
      setIsError(true);
      setConfirmation(`Sign up failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async () => {
    if (!email || !password) {
      setIsError(true);
      setConfirmation("Please enter an email and password.");
      return;
    }
    setLoading(true);
    setConfirmation("");
    setIsError(false);
    try {
      let result = await api.auth.loginUser(email, password);
      setIsError(false);
      setConfirmation(result.message);
      //console.log("Login result:", result);
      if(result?.session?.access_token){
      let userData = await api.data.getCurrentProfileData();
      //console.log("Users profile data on login:", userData?.profile_data);
      let profileData = userData?.profile_data;
      setIsProfileComplete(Boolean(profileData));
      }
      //This has to be at the bottom because we want to make sure the profile data is fetched and the profile completeness is set before we update the logged in state which will trigger the redirect in the useEffect in the login screen.
      setIsLoggedIn(Boolean(result?.session?.access_token));
    } catch (error) {
      setIsError(true);
      setConfirmation(`Login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.loginSafeArea} edges={["top", "bottom"]}>
      <StatusBar />
      <View style={styles.loginContainer}>
        <Text style={styles.loginAppName}>LookingForLove</Text>
        <Text style={styles.loginSubheading}>
          Enter your email to login or sign up for this app
        </Text>
        <TextInput
          style={styles.loginInput}
          placeholder="email@email.com"
          placeholderTextColor={palette.contrast}
          keyboardType="email-address"
          autoCapitalize="none"
          textContentType="emailAddress"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
        />
        <TextInput
          style={styles.loginInput}
          placeholder="password"
          placeholderTextColor={palette.contrast}
          secureTextEntry={true}
          autoCapitalize="none"
          textContentType="password"
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />
        <Pressable
          style={({ pressed }) => [
            styles.loginContinueBtn,
            pressed && styles.loginBtnPressed,
            loading && { opacity: 0.6 },
          ]}
          onPress={loginUser}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginContinueBtnText}>Login</Text>
          )}
        </Pressable>
        <Pressable onPress={signUpUser} disabled={loading}>
          <Text style={[styles.signUpButton, loading && { opacity: 0.6 }]}>
            Sign Up
          </Text>
        </Pressable>
        {confirmation ? (
          <Text
            style={[
              styles.loginConfirmation,
              { color: isError ? "#e05555" : palette.text },
            ]}
          >
            {confirmation}
          </Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

export default Login;
