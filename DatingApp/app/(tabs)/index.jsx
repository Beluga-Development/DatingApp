import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  Modal,
  Image,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import * as api from "../../util/api.js";
import Button from "../../components/Button.js";
import style from "../../style.js";

export default function MatchesScreen() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [viewProfile, setViewProfile] = useState();
  const [generating, setGenerating] = useState(false);
  const [paid, setPaid] = useState(false);

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

  const handleGenerateMatches = async () => {
    setGenerating(true);
    setLoading(true);
    await api.data.generateMatches();
    const result = await getMatchData();
    setMatches(result);
    setLoading(false);
    setGenerating(false);
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

  useFocusEffect(
    useCallback(() => {
      const loadMatches = async () => {
        setLoading(true);
        let result = await getMatchData();
        setMatches(result);
        setLoading(false);
      };
      const checkPaidStatus = async () => {
        const currrentUser = await api.data.getProfileContext();
        console.log(currrentUser);
        setPaid(currrentUser.isPaid);
      };
      checkPaidStatus();
      loadMatches();
    }, []),
  );

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
              match.index = index;

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
                    picture={
                      match.profile_data.ProfilePicture
                        ? match.profile_data.ProfilePicture
                        : "https://media.discordapp.net/attachments/1149389094653276191/1493100788279414784/images.png?ex=69ddbdf8&is=69dc6c78&hm=c54ace950e628bd4e4868036aa6e3936701c90e99ee064a015bffd8572688df2&=&format=webp&quality=lossless&width=249&height=187"
                    }
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
                    onPress={() => {
                      setShowContact(true);
                      setModalVisible(true);
                      setViewProfile(match);
                    }}
                  />
                </View>
              );
            })}
      </ScrollView>

      <Button
        text={generating ? "Finding..." : "Find New Matches"}
        onPress={handleGenerateMatches}
        style={{ margin: 20, marginBottom: 120 }}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        {showContact ? 
        (

          paid ?
          (

          <View style={style.modalContainer}>
            <Button
              icon={{ name: "close", size: 24 }}
              style={style.closeButton}
              onPress={() => {
                setModalVisible(false);
                setShowContact(false);
              }}
            />
            <Text style={style.modalTitle}>Contact Information</Text>
            <View style={style.modalHeaderUnderline} />
            <View style={style.modalContent}>
              {viewProfile?.profile_data.contact.map((contact) => (
                <View key={contact.id} style={style.contactItem}>
                  <Text style={style.contactText}>
                    {contact.type.charAt(0).toUpperCase() +
                      contact.type.slice(1)}
                    : {contact.info}
                  </Text>
                  <Button
                    icon={{ name: "copy-outline", size: 20 }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: "#ffff",
                    }}
                    onPress={async () =>
                      await Clipboard.setStringAsync(contact.info)
                    }
                  />
                </View>
              ))}
            </View>
          </View>
            ) :
            (
              <View style={style.modalContainer}>
            <Button
              icon={{ name: "close", size: 24 }}
              style={style.closeButton}
              onPress={() => {
                setModalVisible(false);
                setShowContact(false);
              }}
            />
            <Text style={style.modalTitle}>Become a Paid member?</Text>
            <Text style={{
                      fontSize: 20,
                      textAlign: "center"
                    }}>
                      only paid members can view other member's contact details</Text>
            <Button
            text="Yes"
                    style={{
                      width: 100,
                      height: 50,
                      borderRadius: 20,
                      backgroundColor: "#170101",
                    }}
                    onPress={async () =>
                      await api.data.setPaid(true)
                    }
                  Yes />

                  <Button
                  text="No"
                    style={{
                      width: 100,
                      height: 50,
                      borderRadius: 20,
                      backgroundColor: "#100101",
                    }}
                    onPress={async () =>
                      setModalVisible(false)
                    }
                  />
          </View>
            )
        ) : (
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
                  uri: viewProfile?.profile_data.ProfilePicture
                    ? viewProfile?.profile_data.ProfilePicture
                    : "https://media.discordapp.net/attachments/1149389094653276191/1493100788279414784/images.png?ex=69ddbdf8&is=69dc6c78&hm=c54ace950e628bd4e4868036aa6e3936701c90e99ee064a015bffd8572688df2&=&format=webp&quality=lossless&width=249&height=187",
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
                    (interest, index) => (
                      <View key={index} style={style.interestItem}>
                        <Text style={style.interestText}>
                          {interest.interests.name}
                        </Text>
                      </View>
                    ),
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </Modal>
    </View>
  );
}
