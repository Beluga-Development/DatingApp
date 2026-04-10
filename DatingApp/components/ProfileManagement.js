//React & Native Imports
import { useState, useEffect, useContext } from "react";
import {
    Image,
    Text,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Pressable,
    Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

//Component Imports
import CalenderInput from "./CalenderInput";
import TitledTextInput from "./TitledTextInput";
import Button from "./Button";
import DropdownSelect from "./DropdownSelect";

//API Imports
import * as api from "../util/api.js";

//Style Imports
import branding, { palette} from "../style.js";
import ListChipper from "./ListChipper";

const genderOptions = [
    "Male",
    "Female",
    "Non-binary",
    "Other"
];

const sexualityOptions = [
    "Heterosexual",
    "Bisexual",
    "Homosexual",
    "Pansexual",
];

function ProfileManagement(props) {

    const [showPfpModal, setShowPfpModal] = useState(false);

    //State Variables for the profile creation form
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        sexuality: "",
        occupation: "",
        skills: [],
        desiredSkills: [],
        profilePicture: null,
        dateOfBirth: new Date()
    });

    const [isGenderOpen, setIsGenderOpen] = useState(false);
    const [isSexualityOpen, setIsSexualityOpen] = useState(false);

    const [skills, setSkills] = useState([]);
    const [desiredSkills, setdesiredSkills] = useState([]);

    useEffect(() => { api.data.getAllInterests().then((data) => { setSkills(data); setdesiredSkills(data); }).catch((err) => console.error("Failed to load desiredSkills:", err)); }, []);

    const setFirstName = (firstName) => {
        setProfile((prev) => ({...prev, firstName}));
    };

    const setLastName = (lastName) => {
        setProfile((prev) => ({...prev, lastName}));
    };

    const setGender = (gender) => {
        setProfile((prev) => ({...prev, gender}));
    };

    const setSexuality = (sexuality) => {
        setProfile((prev) => ({...prev, sexuality}));
    };

    const setOccupation = (occupation) => {
        setProfile((prev) => ({...prev, occupation}));
    };

    const setDateOfBirth = (dateOfBirth) => {
        setProfile((prev) => ({...prev, dateOfBirth}));
    };

    const launchCamera = async () => {
        setShowPfpModal(false);
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            alert("Camera permission is required");
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });
        if (!result.canceled) {
            setProfile((prev) => ({...prev, profilePicture: result.assets[0].uri}));
        }
    };

    const launchLibrary = async () => {
        setShowPfpModal(false);
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });
        if (!result.canceled) {
            setProfile((prev) => ({...prev, profilePicture: result.assets[0].uri}));
        }
    };


    //EndOf State Variables for the profile creation form
    //Function to handle profile creation
    const createProfile = async () => {
        try{
            let result = await api.data.saveProfileData({
                FirstName: profile.firstName,
                LastName: profile.lastName,
                Gender: profile.gender,
                Sexuality: profile.sexuality,
                Occupation: profile.occupation,
                DateOfBirth: profile.dateOfBirth,
                ProfilePictureURI: profile.profilePicture
            });
            //Saving desiredSkills
            if (profile.desiredSkills.length > 0) {
                await api.data.saveUserInterests(profile.desiredSkills.map((i) => i.id));
            }

            props.setIsProfileComplete(true);
            console.log("RESULT OF SAVE PROFILE DATA", result);
            alert("Profile Created!");
        } catch(error){
            console.error("Error creating profile:", error);
            alert("Profile creation failed");
        }
    }


    //Gets the profile data from the context and sets it to the profile stat variable on component load.
    useEffect(() => {
        if (!props.creationMode) {
            const loadProfileData = async () => {
                try {
                    let data = await api.data.getProfileContext();
                    if (data && data.length > 0) {
                        const profileData = data[0].profile_data;
                        setProfile({
                            firstName: profileData.FirstName || "",
                            lastName: profileData.LastName || "",
                            gender: profileData.Gender || "",
                            sexuality: profileData.Sexuality || "",
                            occupation: profileData.Occupation || "",
                            skills: [],
                            desiredSkills: [], // still yours
                            profilePictureURI: profileData.ProfilePicture || null,
                            dateOfBirth: profileData.DateOfBirth
                                ? new Date(profileData.DateOfBirth)
                                : null
                        });
                    }
                } catch (error) {
                    console.error("Failed to load profile data:", error);
                }
            };
            loadProfileData();
        }
    }, []);

    //UseEffect purely for debugging asynchronous state updates.
    useEffect(() => {
        console.log("Profile state updated:", profile);
    }, [profile]);

    return (
        <>
            <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={10}
            >
                <View id={'Header'}>
                    <Text style={[{marginBottom: 5}, branding.header]}>
                        {props.creationMode ? "Create Profile" : "Edit Profile"}
                    </Text>
                </View>
                <Modal
                    visible={showPfpModal}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setShowPfpModal(false)}
                >
                    <Pressable
                        style={{
                            flex: 1,
                            backgroundColor: "rgba(0,0,0,0.5)",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onPress={() => setShowPfpModal(false)}
                    >
                        <View style={{
                            backgroundColor: palette.white,
                            borderRadius: 16,
                            padding: 24,
                            width: "75%",
                            alignItems: "center",
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: "bold",
                                marginBottom: 20,
                                color: palette.text,
                            }}>
                                Profile Picture
                            </Text>

                            <TouchableOpacity
                                onPress={launchCamera}
                                style={{
                                    backgroundColor: palette.black,
                                    borderRadius: 12,
                                    paddingVertical: 12,
                                    paddingHorizontal: 24,
                                    width: "100%",
                                    alignItems: "center",
                                    marginBottom: 12,
                                }}
                            >
                                <Text style={{ color: palette.white, fontSize: 16 }}>Take Photo</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={launchLibrary}
                                style={{
                                    backgroundColor: palette.black,
                                    borderRadius: 12,
                                    paddingVertical: 12,
                                    paddingHorizontal: 24,
                                    width: "100%",
                                    alignItems: "center",
                                    marginBottom: 12,
                                }}
                            >
                                <Text style={{ color: palette.white, fontSize: 16 }}>Choose from Library</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setShowPfpModal(false)}>
                                <Text style={{ color: palette.contrast, fontSize: 14 }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </Modal>
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
                    scrollEnabled={!isGenderOpen && !isSexualityOpen}
                >
                    <View style={{flexDirection: 'column', marginHorizontal: 10,}}>

                        <View id={'ProfilePicture'} style={{marginBottom: 50, marginTop: 15, alignItems: 'center'}}>
                            <TouchableOpacity
                                style={{width: 160, height: 160}}
                                onPress={() => setShowPfpModal(true)}
                            >
                                {profile.profilePicture ? (
                                    <Image
                                        source={{ uri: profile.profilePicture }}
                                        style={branding.profilePicture}
                                    />
                                ) : (
                                    <View style={[branding.profilePicture, {
                                        backgroundColor: palette.black,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }]}>
                                        <Text style={{ color: '#fff', fontSize: 150, fontWeight: 'bold', lineHeight: 155, textAlign: 'center' }}>+</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>

                        {!props.creationMode && (
                            <>
                                <View id={'FullNameView'} style={{flexDirection: 'row'}}>
                                    <TitledTextInput title={"First Name"}
                                                     value={profile.firstName}
                                                     onChangeText={setFirstName}
                                                     editable={!isGenderOpen && !isSexualityOpen}
                                                     style={{width: "50%"}}
                                    />
                                    <TitledTextInput title={"Last Name"}
                                                     value={profile.lastName}
                                                     onChangeText={setLastName}
                                                     editable={!isGenderOpen && !isSexualityOpen}
                                                     style={{width: "50%"}}
                                    />
                                </View>

                                <View id={'DateOfBirthView'}>
                                    <Text style={[branding.inputTextTitle]}>Date of Birth</Text>
                                    <CalenderInput date={profile.dateOfBirth} onChangeDate={setDateOfBirth}/>
                                </View>
                            </>
                        )}

                        <View id={'PersonalDatingInfoView'} style={{flexDirection: 'row', zIndex: 1}}>
                            <DropdownSelect
                                title="Gender"
                                value={profile.gender}
                                options={genderOptions}
                                placeholder="▼"
                                onSelect={setGender}
                                valueTextStyle={{ fontSize: 18 }}
                                containerStyle={{ width: "47%" }}
                                maxVisibleOptions={5}
                                onOpenChange={setIsGenderOpen}
                            />

                            <DropdownSelect
                                title="Sexuality"
                                value={profile.sexuality}
                                options={sexualityOptions}
                                placeholder="▼"
                                onSelect={setSexuality}
                                valueTextStyle={{ fontSize: 18 }}
                                containerStyle={{ width: "53%" }}
                                maxVisibleOptions={5}
                                onOpenChange={setIsSexualityOpen}
                            />
                        </View>

                        <TitledTextInput title={"Occupation"}
                                         value={profile.occupation}
                                         onChangeText={setOccupation}
                                         editable={!isGenderOpen && !isSexualityOpen}
                                         style={{width: "100%"}}
                        />

                        <View id={"SkillsView"} >
                            <ListChipper
                                title="Skills"
                                items={profile.skills}
                                options={skills}
                                onAdd={(item) => setProfile((prev) => ({ ...prev, skills: [...prev.skills, item] }))}
                                onRemove={(item) => setProfile((prev) => ({ ...prev, skills: prev.skills.filter((i) => i.id !== item.id) }))}
                            />
                        </View>
                        <View id={"InterestView"} >
                            <ListChipper
                                title="Desired Skills"
                                items={profile.desiredSkills}
                                options={desiredSkills}
                                onAdd={(item) => setProfile((prev) => ({ ...prev, desiredSkills: [...prev.desiredSkills, item] }))}
                                onRemove={(item) => setProfile((prev) => ({ ...prev, desiredSkills: prev.desiredSkills.filter((i) => i.id !== item.id) }))}
                            />
                        </View>
                        {/* PlaceHolder Create Profile Button*/}
                        <Button text={props.creationMode ? "Create Profile" : "Save Changes"} onPress={createProfile} style={{justifyContent: "flex-end"}} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
}

export default ProfileManagement;