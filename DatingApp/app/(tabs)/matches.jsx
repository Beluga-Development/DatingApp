import { Text, View, ScrollView, RefreshControl } from "react-native";
import { useState, useEffect, useCallback } from "react";
import * as api from "../../util/api.js";
import Button from "../../components/Button";
import style from "../../style.js";

export default function MatchesScreen() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getMatchData = async () => {
    try {
      let result = await api.data.getMatchData();
      return result;
    } catch (error) {
      console.log(`Request failed: ${error.message}`);
      return [];
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setLoading(true);
    setTimeout(async () => {
      setRefreshing(false);
      setMatches(await getMatchData());
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const loadMatches = async () => {
      let result = await getMatchData();
      setMatches(result);
      setLoading(false);
      //console.log(result[0].profile_data.contact);
      //console.log(result[0].profile_data.user_interest);
    };
    loadMatches();
  }, []);

  return (
    <View style={style.app}>
      <Text style={style.header}>Ranked Matches</Text>
      <View style={style.headerUnderline} />
      <ScrollView
        style={style.matchList}
        contentContainerStyle={style.matchListContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <View key={index} style={style.matchCard}>
                <View style={style.skeletonProfile} />
                <View style={style.matchInfo}>
                  <View style={style.skeletonName} />
                  <View style={style.skeletonStrip} />
                </View>
                <View style={style.skeletonButton} />
              </View>
            ))
          : matches.map((match, index) => {
              const fillWidth = match.match_score
                ? `${Math.min(100, Math.max(12, match.match_score))}%`
                : "70%";

              const fillPercent = parseFloat(fillWidth);
              const r = Math.round(202 + (fillPercent / 100) * 53);
              const g = Math.round(202 - (fillPercent / 100) * 43);
              const b = Math.round(202 - (fillPercent / 100) * 1);
              const stripColor = `rgb(${r}, ${g}, ${b})`;

              return (
                <View key={index} style={style.matchCard}>
                  <Button
                    text=""
                    style={style.profileButton}
                    onPress={() => {}}
                  />
                  <View style={style.matchInfo}>
                    <Text style={style.matchName}>
                      {match.profile_data.FirstName}
                    </Text>
                    <View style={style.matchStripBox}>
                      <View
                        style={[
                          style.matchStrip,
                          {
                            width: fillWidth,
                            shadowColor: stripColor,
                            backgroundColor: stripColor,
                          },
                        ]}
                      />
                    </View>
                  </View>
                  <Button
                    text="Contact"
                    style={style.contactButton}
                    textStyle={style.contactButtonText}
                    onPress={() => {}}
                  />
                </View>
              );
            })}
      </ScrollView>
    </View>
  );
}
