import {StyleSheet} from "react-native";

export const MARGIN = 10;
const FONT_FAMILY = "Inter";

export const palette = {
    primary: '#FF9FC9',
    secondary: '#FFCAE1',
    contrast: '#848484',
    accent: '#CACACA',
    border: '#f1abc6',
    white: '#ffffff',
    black: '#000000',
    text: '#000000'
};

export default StyleSheet.create({
    header: {
        fontSize: 24,
        fontFamily: FONT_FAMILY,
        color: palette.text,
        textAlign: 'center'
    },
    list: {
        marginTop: 4,
        borderTopWidth: 4,
        fontFamily: FONT_FAMILY,
        borderBottomWidth: 4,
        marginBottom: 4,
        borderColor: palette.border,
        backgroundColor: palette.primary,
        flex: 1
    },
    app: {
        marginTop: 50,
        backgroundColor: palette.primary,
        fontFamily: FONT_FAMILY,
        flex: 1
    },
    prompt: {
        margin: MARGIN * 4,
        alignSelf: 'stretch',
        borderWidth: 2,
        borderRadius: 12,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderColor: palette.border,
        backgroundColor: palette.primary,
    },
    promptText: {
        margin: MARGIN,
        fontSize: 20,
        fontFamily: FONT_FAMILY,
        color: palette.text,
        textAlign: 'center'
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button: {
        margin: MARGIN,
        borderRadius: 36,
        color: palette.text,
        borderColor: palette.border,
        backgroundColor: palette.black,
        padding: 10,
        alignItems: 'center',
        fontFamily: FONT_FAMILY,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: FONT_FAMILY,
        color: palette.white,
        textAlign: 'center'
    },
    buttonPressed: {
        margin: MARGIN,
        marginTop: MARGIN + 2,
        borderWidth: 1,
        backgroundColor: palette.primary,
        borderBottomWidth: 2,
        borderRightWidth: 2,
        borderRadius: 12,
        borderColor: palette.border,
        padding: 10,
        alignItems: 'center',
        fontFamily: FONT_FAMILY,
    },
    listItem: {
        margin: MARGIN,
        borderWidth: 2,
        borderRadius: 12,
        fontFamily: FONT_FAMILY,
        borderColor: palette.border,
        padding: 10
    },
    listItemText: {
        fontSize: 24,
        fontFamily: FONT_FAMILY,
        color: palette.text
    },
    inputText: {
        margin: MARGIN,
        fontFamily: FONT_FAMILY,
        borderRadius: 36,
        backgroundColor: palette.primary,
        padding: 4,
        paddingHorizontal: 25,
        fontSize: 18,
        color: palette.text
    },
    inputDate: {
        margin: MARGIN,
        fontFamily: FONT_FAMILY,
        borderRadius: 36,
        backgroundColor: palette.primary,
        padding: 4,
        paddingHorizontal: 20,
        fontSize: 18,
        color: palette.text
    },
    inputTextTitle: {
        marginLeft: 35,
        fontSize: 18,
        fontWeight: 'bold'
    },
    dropDownInput: {
        margin: MARGIN,
        marginTop: 0,
        fontFamily: FONT_FAMILY,
        borderRadius: 36,
        backgroundColor: palette.primary,
        padding: 4,
        paddingHorizontal: 25,
        color: palette.text
    },
    profilePicture: {
        width: 160,
        height: 160,
        backgroundColor: palette.accent,
        borderRadius: 160 / 2,
        overflow: "hidden"

    },
    icon: {
        color: palette.text
    }
});