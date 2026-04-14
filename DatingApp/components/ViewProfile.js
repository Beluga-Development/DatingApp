import { Text, View, ScrollView, Image } from "react-native";
import Button from "./Button";
import style from "../style.js";

const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
};

const FALLBACK_PICTURE =
    "https://media.discordapp.net/attachments/1149389094653276191/1493100788279414784/images.png?ex=69ddbdf8&is=69dc6c78&hm=c54ace950e628bd4e4868036aa6e3936701c90e99ee064a015bffd8572688df2&=&format=webp&quality=lossless&width=249&height=187";

export default function ViewProfile({ profile, onClose, onEdit, onLogout }) {
    if (!profile || !profile.profile_data) return null;

    return (
        <ScrollView>
            <View style={style.modalContainer}>
                {onClose && (
                    <Button
                        icon={{ name: "close", size: 24 }}
                        style={style.closeButton}
                        onPress={onClose}
                    />
                )}
                <Text style={style.modalTitle}>Viewing Profile</Text>
                <View style={style.modalHeaderUnderline} />
                <Image
                    source={{
                        uri: profile.profile_data.ProfilePicture
                            ? profile.profile_data.ProfilePicture
                            : FALLBACK_PICTURE,
                    }}
                    style={style.modalPicture}
                />
                <View style={style.modalContent}>
                    {profile.match_score != null && (
                        <>
                            <Text style={style.matchScoreText}>
                                {profile.match_score}% Match Score
                            </Text>
                            <View style={style.matchScoreBar}>
                                <View
                                    style={[
                                        style.matchStrip,
                                        {
                                            width: profile.fillWidth,
                                            shadowColor: profile.stripColor,
                                            backgroundColor: profile.stripColor,
                                        },
                                    ]}
                                />
                            </View>
                        </>
                    )}
                    <View style={style.profileInfo}>
                        <Text style={style.profileName}>
                            {profile.profile_data.FirstName + " " + profile.profile_data.LastName}
                        </Text>
                        <Text style={style.profileInfoText}>
                            {profile.profile_data.Occupation}
                        </Text>
                        <Text style={style.profileMeta}>
                            {profile.profile_data.Gender +
                                " | " +
                                calculateAge(profile.profile_data.DateOfBirth) +
                                " | " +
                                profile.profile_data.Sexuality}
                        </Text>
                    </View>
                    <View style={style.interests}>
                        <Text style={style.interestsHeader}>Interests</Text>
                        {(profile.profile_data.user_interest ?? []).map((interest, index) => (
                            <View key={index} style={style.interestItem}>
                                <Text style={style.interestText}>
                                    {interest.interests.name}
                                </Text>
                            </View>
                        ))}
                    </View>
                    {onEdit && (
                        <Button
                            text="Edit Profile"
                            onPress={onEdit}
                            style={{ justifyContent: "flex-end", paddingHorizontal: "15%"}}
                        />
                    )}
                    {onLogout && (
                        <Button
                            text="Log Out"
                            onPress={onLogout}
                            style={{ justifyContent: "flex-end", marginBottom: "30%" }}
                        />
                    )}
                </View>
            </View>
        </ScrollView>
    );
}
