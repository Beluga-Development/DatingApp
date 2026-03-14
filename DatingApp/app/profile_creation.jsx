import { router } from "expo-router";
import { useContext, useState } from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SessionContext } from "../util/session";
import ProfileCreation from "../components/ProfileCreation";

export default function ProfileCreationScreen () {


    return (
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
            <ProfileCreation/>
        </SafeAreaView>
    );
}
