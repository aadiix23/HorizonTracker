import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Dimensions,
    ImageBackground,
    SafeAreaView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');
const scale = width / 375;
const verticalScale = height / 812;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleLogin = () => {
        let valid = true;
        if (!email) {
            setEmailError('*Enter email address');
            valid = false;
        } else {
            setEmailError('');
        }

        if (!password) {
            setPasswordError('*Enter password');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (valid) {
            console.log("Login Successful");
        }
    };

    return (
        <LinearGradient
            colors={['#FCFBFE', '#eccaffff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <Image
                source={require('../assets/Images/loginback.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            />
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.keyboardView}
                >
                    <View style={styles.contentContainer}>

                        <View style={styles.headerContainer}>
                            <Text style={styles.titleText}>Welcome ,{'\n'}Horizon Track</Text>
                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={['#E55CC1', '#3D058B']}
                                style={styles.underline}
                            />
                        </View>

                        <View style={styles.illustrationContainer}>
                            <Image
                                source={require('../assets/Images/frontlogin.png')}
                                style={styles.illustrationImage}
                                resizeMode="contain"
                            />
                        </View>

                        <View style={styles.formContainer}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>Email Address</Text>
                                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                            </View>
                            <View style={[styles.inputWrapper, emailError ? styles.inputError : null]}>
                                <Icon name="email-outline" size={20} color="#A0A0A0" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Your Email"
                                    placeholderTextColor="#A0A0A0"
                                    value={email}
                                    onChangeText={(text) => { setEmail(text); setEmailError(''); }}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>

                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>Password</Text>
                                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                            </View>
                            <View style={[styles.inputWrapper, passwordError ? styles.inputError : null]}>
                                <Icon name="lock-outline" size={20} color="#A0A0A0" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Your Password"
                                    placeholderTextColor="#A0A0A0"
                                    value={password}
                                    onChangeText={(text) => { setPassword(text); setPasswordError(''); }}
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                                    <Icon name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#A0A0A0" />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleLogin}>
                                <LinearGradient
                                    colors={['#E55CC1', '#3D058B']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.loginButtonGradient}
                                >
                                    <View style={styles.arrowIcon} />
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.footerContainer}>
                            <TouchableOpacity>
                                <Text style={styles.footerLink}>Terms of use</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.footerLink}>Privacy Policy</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFBFE',
    },
    backgroundImage: {
        position: 'absolute',
        top: '16%',
        left: 0,
        width: '100%',
        height: '40%',
    },
    safeArea: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: scale * 24,
        paddingTop: Platform.OS === 'android' ? verticalScale * 40 : verticalScale * 20,
        paddingBottom: verticalScale * 20,
        justifyContent: 'space-between',
    },
    headerContainer: {
        marginTop: verticalScale * 45,
        marginLeft: scale * -5,
        marginBottom: verticalScale * 20,
    },
    titleText: {
        width: scale * 300,
        // height: verticalScale * 60, // Allowing height to flex if needed to avoid text cut-off
        fontFamily: 'Aleo-Bold',
        fontSize: scale * 24,
        lineHeight: scale * 30,
        color: 'rgba(24, 5, 55, 1)',
        marginBottom: verticalScale * 8,
    },
    underline: {
        height: verticalScale * 5,
        width: scale * 175,
        borderRadius: scale * 3,
    },
    illustrationContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: verticalScale * 20,
    },
    illustrationImage: {
        width: width * 0.6,
        height: width * 0.5,
    },
    formContainer: {
        marginTop: verticalScale * 10,
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: verticalScale * 16,
        marginBottom: verticalScale * 8,
    },
    label: {
        fontSize: scale * 14,
        color: 'rgba(24, 5, 55, 0.6)',
        fontFamily: 'Aleo-Regular',
    },
    errorText: {
        color: 'rgba(24, 5, 55, 1)',
        fontSize: scale * 10,
        fontFamily: 'Aleo-Medium',
        lineHeight: scale * 31,
        letterSpacing: 0,
        top: verticalScale * 15,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: scale * 4,
        paddingHorizontal: scale * 16,
        height: verticalScale * 45,
        borderWidth: 1,
        borderColor: 'rgba(225, 165, 240, 1)',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: verticalScale * 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: scale * 3.84,
        elevation: 2,
    },
    inputError: {
        borderColor: '#FF0000',
    },
    inputIcon: {
        marginRight: scale * 10,
    },
    input: {
        flex: 1,
        height: '100%',
        color: '#333',
        fontSize: scale * 14,
        fontFamily: 'Aleo-Regular',
    },
    eyeButton: {
        padding: scale * 5,
    },
    loginButtonWrapper: {
        alignItems: 'center',
        marginTop: verticalScale * 40,
        marginBottom: verticalScale * 20,
    },
    loginButtonGradient: {
        width: scale * 60,
        height: scale * 60, // Keeping square aspect ratio based on width scale
        borderRadius: scale * 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#C33764',
        shadowOffset: {
            width: 0,
            height: verticalScale * 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: scale * 4.65,
        elevation: 8,
    },
    arrowIcon: {
        width: scale * 12,
        height: scale * 12,
        borderTopWidth: 2,
        borderRightWidth: 2,
        borderColor: '#FFFFFF',
        transform: [{ rotate: '45deg' }],
        marginLeft: scale * -4,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: verticalScale * 20,
        paddingBottom: verticalScale * 20,
    },
    footerLink: {
        color: 'rgba(24, 5, 55, 0.6)',
        fontSize: scale * 14,
        fontFamily: 'Aleo-Bold',
        lineHeight: scale * 23,
        letterSpacing: 0,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
});

export default Login;
