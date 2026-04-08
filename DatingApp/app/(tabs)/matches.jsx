import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  Modal,
  Image,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import * as api from "../../util/api.js";
import Button from "../../components/Button";
import style from "../../style.js";

export default function MatchesScreen() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [viewProfile, setViewProfile] = useState();

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

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

              match.fillWidth = fillWidth;
              const fillPercent = parseFloat(fillWidth);
              match.fillPercent = fillPercent;
              const r = Math.round(202 + (fillPercent / 100) * 53);
              const g = Math.round(202 - (fillPercent / 100) * 43);
              const b = Math.round(202 - (fillPercent / 100) * 1);
              const stripColor = `rgb(${r}, ${g}, ${b})`;
              match.stripColor = stripColor;

              return (
                <View key={index} style={style.matchCard}>
                  <Button
                    text=""
                    style={style.profileButton}
                    onPress={() => {
                      setModalVisible(true);
                      setViewProfile(match);
                    }}
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
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <ScrollView>
          <View style={style.modalContainer}>
            <Button
              icon={{ name: "close", size: 24 }}
              style={style.closeButton}
              onPress={() => setModalVisible(false)}
            />
            <Text style={style.modalTitle}>Viewing Profile</Text>
            <View style={style.modalHeaderUnderline} />
            <Image
              source={{
                uri: "https://reactnative.dev/img/tiny_logo.png",
              }}
              style={style.modalPicture}
            />
            <View style={style.modalContent}>
              <Text style={style.matchScoreText}>
                {viewProfile?.match_score}% Match Score
              </Text>

              <View style={style.matchScoreBar}>
                <View
                  style={[
                    style.matchStrip,
                    {
                      width: viewProfile?.fillWidth,
                      shadowColor: viewProfile?.stripColor,
                      backgroundColor: viewProfile?.stripColor,
                    },
                  ]}
                />
              </View>
              <View style={style.profileInfo}>
                <Text style={style.profileName}>
                  {viewProfile?.profile_data.FirstName +
                    " " +
                    viewProfile?.profile_data.LastName}
                </Text>
                <Text style={style.profileInfoText}>
                  {viewProfile?.profile_data.Occupation}
                </Text>
                <Text style={style.profileMeta}>
                  {viewProfile?.profile_data.Gender +
                    " | " +
                    calculateAge(viewProfile?.profile_data.DateOfBirth) +
                    " | " +
                    viewProfile?.profile_data.Sexuality}
                </Text>
              </View>
              <View style={style.interests}>
                <Text style={style.interestsHeader}>Interests</Text>
                {viewProfile?.profile_data.user_interest.map(
                  (interest, index) => {
                    return (
                      <View key={index} style={style.interestItem}>
                        <Text style={style.interestText}>
                          {interest.interests.name}
                        </Text>
                      </View>
                    );
                  },
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}
