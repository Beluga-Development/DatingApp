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
        fontFamily: 'Inter',
        color: palette.text,
        textAlign: 'center'
    },
    list: {
        marginTop: 4,
        borderTopWidth: 4,
        fontFamily: 'Inter',
        borderBottomWidth: 4,
        marginBottom: 4,
        borderColor: palette.border,
        backgroundColor: palette.primary,
        flex: 1
    },
    app: {
        marginTop: 50,
        backgroundColor: palette.primary,
        fontFamily: 'Inter',
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
        fontFamily: 'Inter',
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
        fontFamily: 'Inter',
    },
    buttonText: {
        fontSize: 20,
        fontFamily: 'Inter',
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
        fontFamily: 'Inter',
    },
    listItem: {
        margin: MARGIN,
        borderWidth: 2,
        borderRadius: 12,
        fontFamily: 'Inter',
        borderColor: palette.border,
        padding: 10
    },
    listItemText: {
        fontSize: 24,
        fontFamily: 'Inter',
        color: palette.text
    },
    inputText: {
        margin: MARGIN,
        borderWidth: 2,
        fontFamily: 'Inter',
        borderRadius: 12,
        borderColor: palette.border,
        padding: 10,
        fontSize: 24,
        color: palette.text
    },
    icon: {
        color: palette.text
    },
 // ----------------- Login -----------------------
    loginSafeArea: {
        flex: 1,
    },
    loginContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    loginAppName: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Inter',
        color:  '#000000',
        marginBottom: 82,
        letterSpacing: 0.5,
    },
    loginSubheading: {
        fontSize: 14,
        fontFamily: 'Inter',
        color: palette.text,
        textAlign: 'center',
        marginBottom: 20,
        opacity: 0.85,
        lineHeight: 20,
    },
    loginInput: {
        width: '100%',
        height: 52,
        backgroundColor: palette.primary,
        borderWidth: 2,
        borderRadius: 12,
        borderColor: palette.border,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        paddingHorizontal: 16,
        fontSize: 16,
        fontFamily: 'Inter',
        color: palette.border,
        marginBottom: 14,
    },
    loginContinueBtn: {
        width: '100%',
        height: 52,
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#000',
        borderBottomWidth: 4,
        borderRightWidth: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    loginContinueBtnText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Inter',
    },
    signUpButton: {
        color: '#000',
        fontWeight: 'bold',
    },
    loginBtnPressed: {
        borderBottomWidth: 2,
        borderRightWidth: 2,
        opacity: 0.9,
    },
    loginConfirmation: {
        marginTop: 14,
        fontSize: 13,
        fontFamily: 'Inter',
        color: palette.text,
        textAlign: 'center',
        opacity: 0.9,
    }
});