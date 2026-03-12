import {useState} from "react";
import {Image, Text, TextInput, View} from "react-native";

import branding from "../style.js";

function ProfileCreation() {
    const [firstName, onChangeText] = useState();

    return (
        <>
            <View style={{flexDirection: 'column'}}>
                <View id={'Header'}>
                    <Text style={[{marginBottom: 20}, branding.header]}>
                        Create Profile
                    </Text>
                </View>

                <View id={'ProfilePicture'} style={{marginBottom: 50, alignItems: 'center'}}>
                    <Image source={require('../assets/PlaceholderHolderUser.png')}
                           style={branding.profilePicture}
                    />
                </View>

                <View id={'FullNameView'} style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View id={'FirstNameView'} style={{width: '50%'}}>
                        <Text style={branding.inputTextTitle}>First Name</Text>
                        <TextInput id={'FirstNameInput'}
                                   style={[{marginTop: 0}, branding.inputText]}
                                   onChangeText={onChangeText}
                                   value={firstName}
                                   placeholder="First Name"
                        />
                    </View>

                    <View id={'LastNameView'} style={{width: '50%'}}>
                        <Text style={branding.inputTextTitle}>Last Name</Text>
                        <TextInput id={'LastNameInput'}
                                   style={[{marginTop: 0}, branding.inputText]}
                                   onChangeText={onChangeText}
                                   value={firstName}
                                   placeholder="Last Name"
                        />
                    </View>
                </View>

                <View id={'PersonalInfoView'} style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View id={'DateOfBirthView'} style={{flex: 2}}>
                        <Text style={branding.inputTextTitle}>Date of Birth</Text>
                        <TextInput id={'FirstNameInput'}
                                   style={[{marginTop: 0}, branding.inputText]}
                                   onChangeText={onChangeText}
                                   value={firstName}
                                   placeholder="Date"
                        />
                    </View>
                    <View id={'GenderView'} style={{flex: 1}}>
                        <Text style={branding.inputTextTitle}>Gender</Text>
                        <TextInput id={'GenderInput'}
                                   style={[{marginTop: 0}, branding.inputText]}
                                   onChangeText={onChangeText}
                                   value={firstName}
                                   placeholder="Gender"
                        />
                    </View>
                </View>
            </View>
        </>
    );
}

export default ProfileCreation;