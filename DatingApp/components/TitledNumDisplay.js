import { View, Text } from "react-native";
import branding from "../style.js";

export default function TitledNumDisplay({ value, title }) {
    return (
        <View style={branding.numDisplayRow}>
            <View style={branding.numDisplayBadge}>
                <Text style={branding.numDisplayBadgeText}>{value}</Text>
            </View>
            <View style={branding.numDisplay}>
                <Text style={branding.numDisplayText}>{title}</Text>
            </View>
        </View>
    );
}
