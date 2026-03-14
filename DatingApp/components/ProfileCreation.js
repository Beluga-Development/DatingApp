import {useState} from "react";
import {Image, Text, View} from "react-native";

import CalenderInput from "./CalenderInput";
import TitledTextInput from "./TitledTextInput";
import branding from "../style.js";

function ProfileCreation() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [gender, setGender] = useState("");
    const [sexuality, setSexuality] = useState("");

    const [dateOfBirth, setDateOfBirth] = useState(new Date());

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
                                     value={firstName}
                                     onChangeText={setFirstName}
                                     placeholder={"First Name"}
                                     style={{width: "48%"}}
                    />

                    <TitledTextInput title={"Last Name"}
                                     value={lastName}
                                     onChangeText={setLastName}
                                     placeholder={"Last Name"}
                                     style={{width: "48%"}}
                    />
                </View>

                <View id={'DateOfBirthView'}>
                    <Text style={[branding.inputTextTitle]}>Date of Birth</Text>
                    <CalenderInput date={dateOfBirth} onChangeDate={setDateOfBirth}/>
                </View>

                <View id={'PersonalDatingInfoView'} style={{flexDirection: 'row'}}>
                    <TitledTextInput title={"Gender"}
                                     value={gender}
                                     onChangeText={setGender}
                                     placeholder={"Gender"}
                                     style={{width: "48%"}}
                    />

                    <TitledTextInput title={"Sexuality"}
                                     value={sexuality}
                                     onChangeText={setSexuality}
                                     placeholder={"Sexuality"}
                                     style={{width: "48%"}}
                    />
                </View>
            </View>
        </>
    );
}

export default ProfileCreation;