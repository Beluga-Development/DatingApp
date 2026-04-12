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
        phone: "",
        email: "",
        linkedin: "",
        skills: [],
        desiredSkills: [],
        profilePictureURI: null,
        dateOfBirth: new Date()
    });

    const [isGenderOpen, setIsGenderOpen] = useState(false);
    const [isSexualityOpen, setIsSexualityOpen] = useState(false);

    const [skills, setSkills] = useState([]);
    const [desiredSkills, setDesiredSkills] = useState([]);

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

    const setPhone = (phone) => {
        setProfile((prev) => ({...prev, phone}));
    };

    const setEmail = (email) => {
        setProfile((prev) => ({...prev, email}));
    };

    const setLinkedin = (linkedin) => {
        setProfile((prev) => ({...prev, linkedin}));
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
            setProfile((prev) => ({...prev, profilePictureURI: result.assets[0].uri}));
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
            setProfile((prev) => ({...prev, profilePictureURI: result.assets[0].uri}));
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
                ProfilePictureURI: profile.profilePictureURI
            });
            //Saving desiredSkills
            if (profile.desiredSkills.length > 0) {
                console.log("Saving user desired skills:", profile.desiredSkills);
                await api.data.saveUserDesired(profile.desiredSkills.map((i) => i.id));
            }
            //Saving skills
            if (profile.skills.length > 0) {
                console.log("Saving user skills:", profile.skills);
                await api.data.saveUserInterests(profile.skills.map((i) => i.id));
            }
            if (result.length > 0) {
                // Get profile id then save contacts
                const userData = await api.data.getProfileContext();
                const profileId = userData?.[0]?.profile_data?.id;
                if (profileId) {
                    if (profile.phone)    await api.data.addContact(profileId, "phone",    profile.phone);
                    if (profile.email)    await api.data.addContact(profileId, "email",    profile.email);
                    if (profile.linkedin) await api.data.addContact(profileId, "linkedin", profile.linkedin);
                }
                props.setIsProfileComplete(true);
                console.log("Result of API call to save profile data:", result);
                alert("Profile Created!");
            } else {
                props.setIsProfileComplete(false);
                console.error("Unexpected API response:", result);
                alert("Profile creation failed");
            }
        } catch(error){
            console.error("Error creating profile:", error);
            alert("Profile creation failed");
        }
    }


    //Gets the profile data from the context and sets it to the profile stat variable on component load.
    useEffect(() => {
        if (props.editMode) {
            const loadProfileData = async () => {
                try {
                    const allInterests = await api.data.getAllInterests();
                    setSkills(allInterests);
                    setDesiredSkills(allInterests);
                    let data = await api.data.getProfileContext();
                    if (data !== null && data !== undefined) {
                        const profileData = data.profile_data;
                        const interestsData = data.interestsData || [];
                        const desiredData = data.desiredData || [];
                        console.log("Interests data:", interestsData);
                        console.log("Desired data:", desiredData);
                        console.log("Profile data fetched for editing:", profileData);
                        setProfile({
                            firstName: profileData.FirstName || "",
                            lastName: profileData.LastName || "",
                            gender: profileData.Gender || "",
                            sexuality: profileData.Sexuality || "",
                            occupation: profileData.Occupation || "",
                            skills: interestsData.map((i) => ({
                                id: i.interest_id,
                                name: allInterests.find((s) => s.id === i.interest_id)?.name || "Unknown"
                            })),
                            desiredSkills: desiredData.map((i) => ({
                                id: i.interest_id,
                                name: allInterests.find((d) => d.id === i.interest_id)?.name || "Unknown"
                            })),
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
        else{
            api.data.getAllInterests().then((data) => { setSkills(data); setDesiredSkills(data); }).catch((err) => console.error("Failed to load desiredSkills:", err));
        }
    }, []);

    //UseEffect purely for debugging asynchronous state updates.
    useEffect(() => {
        //console.log("Profile state updated:", profile);
        //console.log("Edit mode:", props.editMode);
    }, [profile], [props.editMode]);

    return (
        <>
            <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={10}
            >
                <View id={'Header'}>
                    <Text style={[{marginBottom: 5}, branding.header]}>
                        {props.editMode ? "Edit Profile" : "Create Profile"}
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
                                {profile.profilePictureURI ? (
                                    <Image
                                        source={{ uri: profile.profilePictureURI }}
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

                        <View id={'FullNameView'} style={{flexDirection: 'row'}}>
                            <TitledTextInput title={"First Name"}
                                             value={profile.firstName}
                                             onChangeText={setFirstName}
                                             editable={!props.editMode && !isGenderOpen && !isSexualityOpen}
                                             style={{width: "50%"}}
                            />
                            <TitledTextInput title={"Last Name"}
                                             value={profile.lastName}
                                             onChangeText={setLastName}
                                             editable={!props.editMode && !isGenderOpen && !isSexualityOpen}
                                             style={{width: "50%"}}
                            />
                        </View>

                        <View id={'DateOfBirthView'}>
                            <Text style={[branding.inputTextTitle]}>Date of Birth</Text>
                            <CalenderInput date={profile.dateOfBirth} onChangeDate={setDateOfBirth} disabled={props.editMode} />
                        </View>

                        <View id={'FullNameView'} style={{flexDirection: 'column'}}>
                            <TitledTextInput title={"Phone Number"}
                                             value={profile.phone}
                                             onChangeText={setPhone}
                                             editable={!props.editMode && !isGenderOpen && !isSexualityOpen}
                            />
                            <TitledTextInput title={"Email"}
                                             value={profile.email}
                                             onChangeText={setEmail}
                                             editable={!props.editMode && !isGenderOpen && !isSexualityOpen}
                            />
                            <TitledTextInput title={"Linkedin"}
                                             value={profile.linkedin}
                                             onChangeText={setLinkedin}
                                             editable={!props.editMode && !isGenderOpen && !isSexualityOpen}
                            />
                        </View>

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
                        <Button text={props.editMode ? "Save Changes" : "Create Profile"} onPress={createProfile} style={{justifyContent: "flex-end"}} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
}

export default ProfileManagement;