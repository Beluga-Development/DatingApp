import { View, Text } from "react-native";
import branding from "../style.js";

export default function SectionDivider({ title }) {
    return (
        <View style={branding.sectionDividerRow}>
            <View style={branding.sectionDividerLine} />
            <Text style={branding.sectionDividerTitle}>{title}</Text>
            <View style={branding.sectionDividerLine} />
        </View>
    );
}
