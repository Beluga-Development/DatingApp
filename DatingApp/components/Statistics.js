import { Text, View, ScrollView, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import branding, { palette } from "../style.js";
import SectionDivider from "./SectionDivider.js";
import TitledNumDisplay from "./TitledNumDisplay.js";
import TitledText from "./TitledText.js";
import * as api from "../util/api.js";

export default function Statistics() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const result = await api.data.getStats();
                setStats(result);
            } catch (err) {
                console.error("Failed to load stats:", err);
            } finally {
                setLoading(false);
            }
        };
        loadStats();
    }, []);

    if (loading) {
        return (
            <View style={[branding.app, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator size="large" color={palette.primary} />
            </View>
        );
    }

    return (
        <View style={branding.app}>
            <Text style={branding.header}>Statistics</Text>

            <ScrollView
                contentContainerStyle={branding.dashScrollContent}
                showsVerticalScrollIndicator={false}
            >
                <SectionDivider title="General Stats" />
                <TitledNumDisplay value={stats.totalUsers} title="Total Registered Users" />
                <TitledNumDisplay value={stats.freeMembers} title="Free members" />
                <TitledNumDisplay value={stats.paidMembers} title="Paid members" />

                <SectionDivider title="Match Stats" />
                <TitledNumDisplay value={stats.contactExposedMatches} title="Contact exposed matches" />
                <TitledNumDisplay value={stats.totalMatches} title="Total matches" />
                <TitledNumDisplay value={stats.avgMatchScore} title="Average match score" />

                <SectionDivider title="Contact Stats" />
                <TitledNumDisplay value={stats.noContactInfo} title="Users with no contact info added" />
                <TitledNumDisplay value={stats.completeProfiles}  title="Users with a complete profile" />

                <SectionDivider title="Skill Stats" />
                <TitledNumDisplay value={stats.totalSkills} title="Total Skills" />
                <TitledText title="Most common skill" value={stats.mostCommonSkill} />
                <TitledText title="Most unique skill" value={stats.mostUniqueSkill} />
            </ScrollView>
        </View>
    );
}
