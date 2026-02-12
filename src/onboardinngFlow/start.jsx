import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import FullBg from '../assets/Images/fullbg.svg';
import Svg, { Circle } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const steps = [
    {
        key: 'start',
        title: '',
        description: '',
        image: null,
        waveOffset: '0%',
        progress: 0,
        imageStyle: {},
    },
    {
        key: 'onboarding1',
        title: 'One Place to Manage Your Entire Team',
        description: 'Add team members, define roles, and keep all employee details organized under one admin-controlled system.',
        image: require('../assets/Images/illustration1.webp'),
        waveOffset: '-50%',
        progress: 0.33,
        imageStyle: {
            width: width * 0.9,
            height: height * 0.40,
            bottom: 17
        },
    },
    {
        key: 'onboarding2',
        title: 'Track Attendance and Work, Every Day',
        description: 'Mark office, WFH, and meeting attendance, assign daily tasks, and clearly see what\'s completed, pending, or overdue.',
        image: require('../assets/Images/illustration2.webp'),
        waveOffset: '-60%',
        progress: 0.66,
        imageStyle: {
            width: width * 0.9,
            height: height * 0.45,
        },
    },
    {
        key: 'onboarding3',
        title: 'See Performance, Not Guesswork',
        description: 'Get a clear overview of attendance and task performance with member-wise reports and a smart dashboard built for daily oversight.',
        image: require('../assets/Images/illustartion3.webp'),
        waveOffset: '-70%',
        progress: 1.0,
        imageStyle: {
            width: width * 0.9,
            height: height * 0.45,
            top: 50
        },
    }
];

const Start = () => {
    const navigation = useNavigation();
    const [currentStep, setCurrentStep] = useState(0);


    const slideAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const waveAnim = useRef(new Animated.Value(0)).current;
    const progressAnim = useRef(new Animated.Value(0)).current;


    const waveInterpolation = waveAnim.interpolate({
        inputRange: [0, 1, 2, 3],
        outputRange: ['0%', '-50%', '-100%', '-150%'],
    })

    const waveX = waveAnim.interpolate({
        inputRange: [0, 1, 2, 3],
        outputRange: [0, -width * 0.55, -width * 1.0, -width * 1.45]
    });

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            const nextStep = currentStep + 1;

            Animated.timing(waveAnim, {
                toValue: nextStep,
                duration: 2000,
                easing: Easing.inOut(Easing.exp),
                useNativeDriver: true
            }).start();

            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: -width,
                    duration: 1000,
                    easing: Easing.in(Easing.exp),
                    useNativeDriver: true
                }),
            ]).start(() => {

                setCurrentStep(nextStep);
                slideAnim.setValue(width);


                Animated.parallel([
                    Animated.timing(slideAnim, { toValue: 0, duration: 1000, easing: Easing.out(Easing.exp), useNativeDriver: true }),
                    Animated.timing(progressAnim, { toValue: steps[nextStep].progress, duration: 1000, easing: Easing.out(Easing.exp), useNativeDriver: true })
                ]).start();
            });
        } else {
            console.log("Finish Onboarding");
            navigation.navigate('Login');
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            handleNext();
        }, 10);
        return () => clearTimeout(timer);
    }, []);

    const currentContent = steps[currentStep];
    const radius = 33;
    const circumference = 2 * Math.PI * radius;

    const animatedStrokeDashoffset = progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [circumference, 0],
    });

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FCFBFE', '#eccaffff']}
                style={styles.gradientBackground}
            />

            <Animated.View style={[styles.backgroundImage, {
                transform: [{ translateX: waveX }]
            }]}>
                <FullBg width="270%" height="100%" preserveAspectRatio="none" />
            </Animated.View>

            <SafeAreaView style={styles.safeArea}>
                <View style={styles.contentContainer}>
                    {currentStep > 0 ? (
                        <>
                            <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
                                <Text style={styles.title}>{currentContent.title}</Text>
                            </Animated.View>

                            <Animated.View style={[styles.imageContainer, { transform: [{ translateX: slideAnim }] }]}>
                                <Image
                                    source={currentContent.image}
                                    style={currentContent.imageStyle}
                                    resizeMode="contain"
                                />
                            </Animated.View>

                            <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
                                <Text style={styles.description}>{currentContent.description}</Text>
                            </Animated.View>
                        </>
                    ) : (
                        <View style={{ flex: 1 }} />
                    )}

                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={handleNext}
                        >
                            <Svg width="70" height="70" viewBox="0 0 70 70" style={{ position: 'absolute' }}>
                                <Circle
                                    cx="35"
                                    cy="35"
                                    r={radius}
                                    stroke="#E0C8F2"
                                    strokeWidth="4"
                                    fill="transparent"
                                />
                                <AnimatedCircle
                                    cx="35"
                                    cy="35"
                                    r={radius}
                                    stroke="#8A2BE2"
                                    strokeWidth="4"
                                    fill="transparent"
                                    strokeDasharray={`${circumference}`}
                                    strokeDashoffset={animatedStrokeDashoffset}
                                    strokeLinecap="round"
                                    rotation="-90"
                                    origin="35, 35"
                                />
                            </Svg>

                            <LinearGradient
                                colors={['#E55CC1', '#3D058B']}
                                style={styles.buttonCircle}
                            >
                                <View style={styles.arrow} />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF7FF',
    },
    safeArea: {
        flex: 1,
    },
    gradientBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    backgroundImage: {
        position: 'absolute',
        top: '38%',
        left: 0,
        width: width,
        height: '38%',

    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    title: {
        marginHorizontal: 11,
        fontSize: 22,
        fontFamily: 'Aleo-Bold',
        color: 'rgba(24, 5, 55, 1)',
        textAlign: 'center',
        marginTop: 52,
        lineHeight: 22.89,
        alignSelf: 'center',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginVertical: 20,
        zIndex: 1
    },
    image: {
        width: width * 0.9,
        height: height * 0.40,
        bottom: 15
    },
    description: {
        width: 377,
        height: 57,
        opacity: 0.8,
        fontFamily: 'Aleo-Regular',
        fontSize: 14,
        paddingHorizontal: 16,
        lineHeight: 16,
        top: 10,
        letterSpacing: 0,
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 40,
        color: 'rgba(24, 5, 55, 1)',
    },
    footer: {
        marginBottom: 40,
        alignItems: 'center',
    },
    buttonContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        top: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrow: {
        width: 12,
        height: 12,
        borderTopWidth: 2,
        borderRightWidth: 2,
        borderColor: '#FFFFFF',
        transform: [{ rotate: '45deg' }],
        marginLeft: -4,
    },
});

export default Start;

