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

    const [isGenderOpen, setIsGenderOpen] = useState(false);
    const [isSexualityOpen, setIsSexualityOpen] = useState(false);

    const [interests, setInterests] = useState([]);

    useEffect(() => {api.data.getAllInterests().then((data) => setInterests(data)).catch((err) => console.error("Failed to load interests:", err));}, []);

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
                DateOfBirth: profile.dateOfBirth
            });

            if (profile.interests.length > 0) {
                await api.data.saveUserInterests(profile.interests.map((i) => i.id));
            }

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

                        <View id={'ProfilePicture'} style={{marginBottom: 50, marginTop: 15, alignItems: 'center'}}>
                            <View style={{width: 160, height: 160}}>
                                <Image style={branding.profilePicture} />
                                <TouchableOpacity
                                    style={{
                                        position: 'absolute',
                                        bottom: -15,
                                        alignSelf: 'center',
                                        backgroundColor: palette.black,
                                        width: 30,
                                        height: 30,
                                        borderRadius: 15,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    onPress={() => {

                                    }}
                                >
                                    <Text style={{color: '#fff', fontSize: 20, lineHeight: 22, fontWeight: 'bold'}}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

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