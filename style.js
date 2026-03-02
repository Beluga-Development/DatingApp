import { StyleSheet } from "react-native";

export const MARGIN = 10;

export const palette = {
    primary: '#ed3c89',
    border: '#f1abc6',
    text: '#828282'
};

export default StyleSheet.create({
    header: {
        fontSize: 24,
        fontFamily: 'Bitcount',
        color: palette.text,
        textAlign: 'center'
    },
    list: {
        marginTop: 4,
        borderTopWidth: 4,
        fontFamily: 'Bitcount',
        borderBottomWidth: 4,
        marginBottom: 4,
        borderColor: palette.border,
        backgroundColor: palette.primary,
        flex: 1
    },
    app: {
        marginTop: 50,
        backgroundColor: palette.primary,
        fontFamily: 'Bitcount',
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
        fontFamily: 'Bitcount',
        color: palette.text,
        textAlign: 'center'
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button: {
        margin: MARGIN,
        borderWidth: 1,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderRadius: 12,
        color: palette.text,
        borderColor: palette.border,
        backgroundColor: palette.primary,
        padding: 10,
        alignItems: 'center',
        fontFamily: 'Bitcount',
    },
    buttonText: {
        fontSize: 20,
        fontFamily: 'Bitcount',
        color: palette.text,
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
        fontFamily: 'Bitcount',
    },
    listItem: {
        margin: MARGIN,
        borderWidth: 2,
        borderRadius: 12,
        fontFamily: 'Bitcount',
        borderColor: palette.border,
        padding: 10
    },
    listItemText: {
        fontSize: 24,
        fontFamily: 'Bitcount',
        color: palette.text
    },
    inputText: {
        margin: MARGIN,
        borderWidth: 2,
        fontFamily: 'Bitcount',
        borderRadius: 12,
        borderColor: palette.border,
        padding: 10,
        fontSize: 24,
        color: palette.text
    },
    icon: {
        color: palette.text
    }
});