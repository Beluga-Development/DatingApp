import { router } from "expo-router";
import { useContext, useState, useCallback } from "react";
import { View, ActivityIndicator } from "react-native";
import { useFocusEffect } from "expo-router";
import { SessionContext } from "../../util/session";
import * as api from "../../util/api.js";
import ProfileManagement from "../../components/ProfileManagement";
import ViewProfile from "../../components/ViewProfile";

export default function ProfileScreen() {
    const { setIsLoggedIn, isProfileComplete, setIsProfileComplete } =
        useContext(SessionContext);
    const [isEditing, setIsEditing] = useState(false);
    const [ownProfile, setOwnProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        try {
            let result = await api.auth.logout();
            setIsLoggedIn(Boolean(result?.session?.access_token));
            router.replace("/login");
        } catch (error) {
            console.log(`Request failed: ${error.message}`);
        }
    };

    useFocusEffect(
        useCallback(() => {
            setIsEditing(false);
            const load = async () => {
                try {
                    setLoading(true);
                    const [allInterests, data] = await Promise.all([
                        api.data.getAllInterests(),
                        api.data.getCurrentProfileData(),
                    ]);
                    if (data) {
                        const profileData = data.profile_data || {};
                        const interestsData = data.interestsData || [];
                        setOwnProfile({
                            profile_data: {
                                ...profileData,
                                user_interest: interestsData.map((i) => ({
                                    interests: {
                                        name:
                                            allInterests.find((s) => s.id === i.interest_id)?.name ||
                                            "Unknown",
                                    },
                                })),
                            },
                        });
                    }
                } catch (error) {
                    console.log(`Failed to load profile: ${error.message}`);
                } finally {
                    setLoading(false);
                }
            };
            load();
        }, [])
    );

    if (loading) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (isEditing) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "flex-start",
                    marginTop: "10%",
                }}
            >
                <ProfileManagement
                    editMode={isProfileComplete}
                    setIsProfileComplete={setIsProfileComplete}
                    onLogout={handleLogout}
                    onSave={() => setIsEditing(false)}
                />

            </View>
        );
    }

    return (
        <ViewProfile
            profile={ownProfile}
            onEdit={() => setIsEditing(true)}
            onLogout={handleLogout}
        />
    );
}
