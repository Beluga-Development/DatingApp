import { View, Text } from "react-native";
import branding from "../style.js";

export default function TitledText({title, value }) {
    return (
        <View style={branding.titledTextContainer}>
            <Text style={branding.titledTextTitle}>{title}</Text>
            <View style={branding.titledText}>
                <Text style={branding.titledTextText}>{value}</Text>
            </View>
        </View>
    );
}
