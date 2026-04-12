import { Text, View, ScrollView, Pressable } from "react-native";
import { useState, useEffect } from "react";
import * as api from "../../util/api.js";
import { palette } from "../../style.js";

export default function MatchesScreen() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        let result = await api.data.getMatchData();
        setMatches(result ?? []);
      } catch (error) {
        console.log(`Request failed: ${error.message}`);
      }
    };
    loadMatches();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 60 }}>
      <Text style={{ fontSize: 22, fontFamily: "Inter", color: "#1a1a1a", fontWeight: "bold", textAlign: "center" }}>
        Ranked Matches
      </Text>
      <View style={{ width: 40, height: 3, backgroundColor: palette.primary, borderRadius: 99, alignSelf: "center", marginTop: 6, marginBottom: 24 }} />

      {matches.map((match, index) => {
        const profile = match.profile_data;
        const score = match.match_score ?? 0;

        return (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
              gap: 12,
            }}
          >
            {/* Avatar */}
            <View style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: "#ccc",
              flexShrink: 0,
            }} />

            {/* Name + bar */}
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontFamily: "Inter", fontWeight: "bold", color: "#1a1a1a", marginBottom: 6 }}>
                {profile.FirstName} {profile.LastName}
              </Text>
              <View style={{ height: 8, backgroundColor: "#eee", borderRadius: 99 }}>
                <View style={{
                  height: 8,
                  width: `${score}%`,
                  backgroundColor: palette.primary,
                  borderRadius: 99,
                }} />
              </View>
            </View>

            {/* Contact button */}
            <Pressable
              style={({ pressed }) => ({
                backgroundColor: "#1a1a1a",
                borderRadius: 24,
                paddingVertical: 10,
                paddingHorizontal: 16,
                opacity: pressed ? 0.8 : 1,
                flexShrink: 0,
              })}
              onPress={() => console.log("Contact", profile.FirstName)}
            >
              <Text style={{ color: "#fff", fontSize: 14, fontFamily: "Inter" }}>Contact</Text>
            </Pressable>
          </View>
        );
      })}
    </ScrollView>
  );
}