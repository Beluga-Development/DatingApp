import {Stack} from "expo-router";
import {useFonts} from "expo-font";
import {ActivityIndicator, View} from "react-native";
import {SessionProvider} from "../util/session";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        Inter: require("../assets/fonts/Inter.ttf"),
        "Inter-Italic": require("../assets/fonts/Inter-Italic.ttf"),
    });

    if (!fontsLoaded) {
        return (
            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <ActivityIndicator/>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
        <SessionProvider>
            <Stack>
                <Stack.Screen name="login" options={{headerShown: false}}/>
                <Stack.Screen name="profile_creation" options={{headerShown: false}}/>
                <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            </Stack>
        </SessionProvider>
        </SafeAreaView>
    );
}