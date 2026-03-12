import { useState } from "react";
import { View, Text, TextInput, Pressable, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as api from "../util/api.js";
import styles, { palette } from "../style.js";

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
    <SafeAreaView style={styles.loginSafeArea} edges={["top", "bottom"]}>
      <StatusBar backgroundColor={palette.primary} barStyle="dark-content" />
      <View style={styles.loginContainer}>

        <Text style={styles.loginAppName}>LookingForLove</Text>

        <Text style={styles.loginHeading}>Create an account</Text>
        <Text style={styles.loginSubheading}>
          Enter your email to sign up for this app
        </Text>

        <TextInput
          style={styles.loginInput}
          placeholder="email@domain.com"
          placeholderTextColor={palette.border}
          keyboardType="email-address"
          autoCapitalize="none"
          textContentType="emailAddress"
          value={email}
          onChangeText={setEmail}
        />

        <Pressable
          style={({ pressed }) => [styles.loginContinueBtn, pressed && styles.loginBtnPressed]}
          onPress={loginUser}
        >
          <Text style={styles.loginContinueBtnText}>Continue</Text>
        </Pressable>

        <View style={styles.loginDividerRow}>
          <View style={styles.loginDividerLine} />
          <Text style={styles.loginDividerText}>or</Text>
          <View style={styles.loginDividerLine} />
        </View>

        <Pressable style={({ pressed }) => [styles.loginSocialBtn, pressed && styles.loginBtnPressed]}>
          <AntDesign name="google" size={18} color={palette.text} style={styles.loginSocialIcon} />
          <Text style={styles.loginSocialBtnText}>Continue with Google</Text>
        </Pressable>

        <Pressable style={({ pressed }) => [styles.loginSocialBtn, styles.loginSocialBtnLast, pressed && styles.loginBtnPressed]}>
          <FontAwesome6 name="apple" size={18} color={palette.text} style={styles.loginSocialIcon} />
          <Text style={styles.loginSocialBtnText}>Continue with Apple</Text>
        </Pressable>

        <Text style={styles.loginTerms}>
          By clicking continue, you agree to our{" "}
          <Text style={styles.loginTermsLink}>Terms of Service</Text>
          {"\n"}and <Text style={styles.loginTermsLink}>Privacy Policy</Text>
        </Text>

        {confirmation ? (
          <Text style={styles.loginConfirmation}>{confirmation}</Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

export default Login;