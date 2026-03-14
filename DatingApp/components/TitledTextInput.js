import {Text, TextInput, View} from "react-native";
import branding from "../style";

function TitledTextInput({title, value, onChangeText, placeholder, style}) {
    return (
        <View style={style}>
            <Text style={branding.inputTextTitle}>{title}</Text>
            <TextInput value={value}
                       onChangeText={onChangeText}
                       placeholder={placeholder}
                       style={[{marginTop: 0}, branding.inputText]}
            />
        </View>
    );
}

export default TitledTextInput;