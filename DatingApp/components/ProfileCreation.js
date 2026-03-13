import {useState} from "react";
import {Button, Image, Text, TextInput, View} from "react-native";

import CalenderInput from "./CalenderInput";
import branding from "../style.js";

function ProfileCreation() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [gender, setGender] = useState("");

    const [dateOfBirth, setDateOfBirth] = useState(new Date());

    return (
        <>
            <View style={{flexDirection: 'column'}}>
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

                <View id={'FullNameView'} style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View id={'FirstNameView'} style={{width: '50%'}}>
                        <Text style={branding.inputTextTitle}>First Name</Text>
                        <TextInput id={'FirstNameInput'}
                                   style={[{marginTop: 0}, branding.inputText]}
                                   onChangeText={setFirstName}
                                   value={firstName}
                                   placeholder="First Name"
                        />
                    </View>

                    <View id={'LastNameView'} style={{width: '50%'}}>
                        <Text style={branding.inputTextTitle}>Last Name</Text>
                        <TextInput id={'LastNameInput'}
                                   style={[{marginTop: 0}, branding.inputText]}
                                   onChangeText={setLastName}
                                   value={lastName}
                                   placeholder="Last Name"
                        />
                    </View>
                </View>

                <View id={'PersonalInfoView'} style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View id={'DateOfBirthView'}>
                        <Text style={branding.inputTextTitle}>Date of Birth</Text>
                        <CalenderInput date={dateOfBirth} onChangeDate={setDateOfBirth} />
                    </View>
                    <View id={'GenderView'} style={{width: "35%"}}>
                        <Text style={branding.inputTextTitle}>Gender</Text>
                        <TextInput id={'GenderInput'}
                                   style={[{marginTop: 0}, branding.inputText]}
                                   onChangeText={setGender}
                                   value={gender}
                                   placeholder="Gender"
                        />
                    </View>
                </View>
            </View>
        </>
    );
}

export default ProfileCreation;