import { StyleSheet } from "react-native";
export const MARGIN = 10;
export const palette = {
    primary: '#f1abc6',
    border: '#ed3c89',
    text: '#000000'
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
    },

    // ----------------- Login -----------------------
    loginBtnWrapper: {
        width: '100%',
        height: 66,
        justifyContent: 'flex-start',
        marginBottom: 12,
    },
    loginContinueBtnWrapper: {
        width: '100%',
        height: 66,
        justifyContent: 'flex-start',
        marginBottom: 24,
    },
    loginSafeArea: {
        flex: 1,
        backgroundColor: palette.primary,
    },
    loginContainer: {
        flex: 1,
        backgroundColor: palette.primary,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    loginAppName: {
        fontSize: 32,
        fontFamily: 'Bitcount',
        color: palette.text,
        marginBottom: 36,
        letterSpacing: 0.5,
    },
    loginHeading: {
        fontSize: 20,
        fontFamily: 'Bitcount',
        color: palette.text,
        marginBottom: 6,
        textAlign: 'center',
    },
    loginSubheading: {
        fontSize: 14,
        fontFamily: 'Bitcount',
        color: palette.text,
        textAlign: 'center',
        marginBottom: 24,
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
        fontFamily: 'Bitcount',
        color: palette.text,
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
        fontFamily: 'Bitcount',
    },
    loginDividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
    },
    loginDividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: palette.border,
    },
    loginDividerText: {
        marginHorizontal: 12,
        color: palette.text,
        fontFamily: 'Bitcount',
        fontSize: 14,
        opacity: 0.8,
    },
    loginSocialBtn: {
        width: '100%',
        height: 52,
        backgroundColor: palette.primary,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: palette.border,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    loginSocialIcon: {
        marginRight: 10,
    },
    loginSocialBtnText: {
        fontSize: 16,
        fontFamily: 'Bitcount',
        color: palette.text,
    },
    loginGoogleG: {
        fontSize: 18,
        fontWeight: '700',
        color: palette.text,
        marginRight: 10,
    },
    loginAppleLogo: {
        fontSize: 20,
        color: palette.text,
        marginRight: 10,
        lineHeight: 24,
    },
    loginTerms: {
        fontSize: 12,
        fontFamily: 'Bitcount',
        color: palette.text,
        textAlign: 'center',
        lineHeight: 18,
        marginTop: 16,
        opacity: 0.75,
    },
    loginBtnPressed: {
        borderBottomWidth: 2,
        borderRightWidth: 2,
        opacity: 0.9,
    },
    loginSocialBtnLast: {
        marginBottom: 0,
    },
    loginConfirmation: {
        marginTop: 14,
        fontSize: 13,
        fontFamily: 'Bitcount',
        color: palette.text,
        textAlign: 'center',
        opacity: 0.9,
    },
});