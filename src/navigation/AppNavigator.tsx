import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Easing } from 'react-native';
import Start from '../onboardinngFlow/start';
import Login from '../authflow/login';

export type RootStackParamList = {
    Start: undefined;
    Login: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const config = {
    animation: 'timing' as const,
    config: {
        duration: 1200,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    },
};

const verticalSlide = ({ current, next, layouts }: any) => {
    const translateY = current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [layouts.screen.height, 0],
    });

    const translateYOut = next
        ? next.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -layouts.screen.height],
        })
        : 0;

    return {
        cardStyle: {
            transform: [
                { translateY },
                { translateY: translateYOut },
            ],
        },
    };
};

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Start"
                screenOptions={{
                    headerShown: false,
                    cardStyleInterpolator: verticalSlide,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                }}
            >
                <Stack.Screen name="Start" component={Start} />
                <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
