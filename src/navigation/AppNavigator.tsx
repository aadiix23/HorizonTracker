import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from '../onboardinngFlow/start';

export type RootStackParamList = {
    Start: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Start" screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
                <Stack.Screen name="Start" component={Start} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
