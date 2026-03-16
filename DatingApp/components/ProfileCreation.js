//React & Native Imports
import {useState} from "react";
import {Image, Text, View} from "react-native";
//Component Imports
import CalenderInput from "./CalenderInput";
import TitledTextInput from "./TitledTextInput";
import Button from "./Button";
//API Imports
import * as api from "../util/api.js";
//Style Imports
import branding from "../style.js";

function ProfileCreation() {

    //State Variables for the profile creation form
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        sexuality: "",
        dateOfBirth: new Date()
    });

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
            <View style={{flexDirection: 'column', marginLeft: 10, marginRight: 10}}>
                <View id={'Header'}>
                    <Text style={[{marginBottom: 20}, branding.header]}>
                        Create Profile
                    </Text>
                </View>

                <View id={'ProfilePicture'} style={{marginBottom: 50, alignItems: 'center'}}>
                    <Image
                           style={branding.profilePicture}
                    />
                </View>

                <View id={'FullNameView'} style={{flexDirection: 'row'}}>
                    <TitledTextInput title={"First Name"}
                                     value={profile.firstName}
                                     onChangeText={setFirstName}
                                     placeholder={"First Name"}
                                     style={{width: "48%"}}
                    />

                    <TitledTextInput title={"Last Name"}
                                     value={profile.lastName}
                                     onChangeText={setLastName}
                                     placeholder={"Last Name"}
                                     style={{width: "48%"}}
                    />
                </View>

                <View id={'DateOfBirthView'}>
                    <Text style={[branding.inputTextTitle]}>Date of Birth</Text>
                    <CalenderInput date={profile.dateOfBirth} onChangeDate={setDateOfBirth}/>
                </View>

                <View id={'PersonalDatingInfoView'} style={{flexDirection: 'row'}}>
                    <TitledTextInput title={"Gender"}
                                     value={profile.gender}
                                     onChangeText={setGender}
                                     placeholder={"Gender"}
                                     style={{width: "48%"}}
                    />

                    <TitledTextInput title={"Sexuality"}
                                     value={profile.sexuality}
                                     onChangeText={setSexuality}
                                     placeholder={"Sexuality"}
                                     style={{width: "48%"}}
                    />
                </View>
                {/* PlaceHolder Create Profile Button*/}
                <Button text={"Create Profile"} onPress={createProfile}></Button>
            </View>
        </>
    );
}

export default ProfileCreation;