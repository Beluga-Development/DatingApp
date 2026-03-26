//React & Native Imports
import { useState, useEffect } from "react";
import {
    Image,
    Text,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity} from "react-native";

//Component Imports
import { Chip, TouchableRipple } from "react-native-paper";
import CalenderInput from "./CalenderInput";
import TitledTextInput from "./TitledTextInput";
import Button from "./Button";
import DropdownSelect from "./DropdownSelect";

//API Imports
import * as api from "../util/api.js";

//Style Imports
import branding, { palette} from "../style.js";
import ListChipper from "./ListChipper";

const interests = [
    { id: 1, name: "Hiking" },
    { id: 2, name: "Travel" },
    { id: 3, name: "Gaming" },
    { id: 4, name: "Music" },
    { id: 5, name: "Cooking" },
    { id: 6, name: "Fitness" },
    { id: 7, name: "Reading" },
];

function ProfileCreation() {

    //State Variables for the profile creation form
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        sexuality: "",
        occupation: "",
        interests: [],
        dateOfBirth: new Date()
    });

    const [showInterestSearch, setShowInterestSearch] = useState(false);
    const [interestQuery, setInterestQuery] = useState("");

    const [isGenderOpen, setIsGenderOpen] = useState(false);
    const [isSexualityOpen, setIsSexualityOpen] = useState(false);


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

    const filteredInterests = interests.filter((option) => {
        const notSelected = !profile.interests.some((i) => i.id === option.id);
        const matchesQuery = option.name.toLowerCase().includes(interestQuery.trim().toLowerCase());
        return notSelected && matchesQuery;
    });

    const addInterest = (item) => {
        setProfile((prev) => ({ ...prev, interests: [...prev.interests, item] }));
        setInterestQuery("");
        setShowInterestSearch(false);
    };

    const removeInterest = (item) => {
        setProfile((prev) => ({...prev, interests: prev.interests.filter((i) => i.id !== item.id),}));
    };

    const setFirstName = (firstName) => {
        setProfile({...profile, firstName});
    };

    const setLastName = (lastName) => {
        setProfile({...profile, lastName});
    };

    const setGender = (gender) => {
        setProfile({...profile, gender});
    };

    const setSexuality = (sexuality) => {
        setProfile({...profile, sexuality});
    };

    const setOccupation = (occupation) => {
        setProfile({...profile, occupation});
    };

    const setDateOfBirth = (dateOfBirth) => {
        setProfile({...profile, dateOfBirth});
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
            DateOfBirth: profile.dateOfBirth
            });
            console.log("RESULT OF SAVE PROFILE DATA", result);
            alert("Profile Created!");
        } catch(error){
            console.error("Error creating profile:", error);
            alert("Profile creation failed");
        }
    }

    return (
        <>
            <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={10}
            >
                <View id={'Header'}>
                    <Text style={[{marginBottom: 5}, branding.header]}>
                        Create Profile
                    </Text>
                </View>
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
                    scrollEnabled={!isGenderOpen && !isSexualityOpen}
                >
                    <View style={{flexDirection: 'column', marginHorizontal: 10,}}>

                        <View id={'ProfilePicture'} style={{marginBottom: 50,marginTop: 15, alignItems: 'center'}}>
                            <Image
                                   style={branding.profilePicture}
                            />
                        </View>

                        <View id={'FullNameView'} style={{flexDirection: 'row'}}>
                            <TitledTextInput title={"First Name"}
                                             value={profile.firstName}
                                             onChangeText={setFirstName}
                                             style={{width: "50%"}}
                            />

                            <TitledTextInput title={"Last Name"}
                                             value={profile.lastName}
                                             onChangeText={setLastName}
                                             style={{width: "50%"}}
                            />
                        </View>

                        <View id={'DateOfBirthView'}>
                            <Text style={[branding.inputTextTitle]}>Date of Birth</Text>
                            <CalenderInput date={profile.dateOfBirth} onChangeDate={setDateOfBirth}/>
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
                                         style={{width: "100%"}}
                        />

                        <View id={"InterestView"} >
                            <ListChipper
                                title="Interests"
                                items={profile.interests}
                                options={interests}
                                onAdd={(item) => setProfile((prev) => ({ ...prev, interests: [...prev.interests, item] }))}
                                onRemove={(item) => setProfile((prev) => ({ ...prev, interests: prev.interests.filter((i) => i.id !== item.id) }))}
                            />
                        </View>
                        {/* PlaceHolder Create Profile Button*/}
                        <Button text={"Create Profile"} onPress={createProfile} style={{justifyContent: "flex-end"}}></Button>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
}

export default ProfileCreation;