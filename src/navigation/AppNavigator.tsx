import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Easing, View, Text } from 'react-native';
import Start from '../onboardingFlow/Start';
import Login from '../authflow/Login';
import homeNavigation from '../homeScreenFlow/homeNavigator'
import analytics from '../homeScreenFlow/analytics'
import attendence from '../homeScreenFlow/attendence'
import dashBoard from '../homeScreenFlow/dashBoard'
import team from '../homeScreenFlow/team'
import task from '../homeScreenFlow/task'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export type TabParamList = {
    dashBoard: undefined;
    analytics: undefined;
    attendence: undefined;
    team: undefined;
    task: undefined;
};

export type RootStackParamList = {
    Start: undefined;
    Login: undefined;
    homeNavigation: undefined;
    MainTabs: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

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
                id="rootStack"
                initialRouteName="MainTabs"
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
                <Stack.Screen name="MainTabs" component={TabNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
const TabIcon = ({ name, focused, color, size }: any) => {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 4 }}>
            {focused && (
                <View
                    style={{
                        position: 'absolute',
                        top: -5,
                        width: 40,
                        height: 6,
                        backgroundColor: '#8E24AA',
                        borderBottomLeftRadius: 6,
                        borderBottomRightRadius: 6,
                    }}
                />
            )}
            <Icon name={name} size={size} color={color} />
        </View>
    );
};

const TabNavigator = () => {
    return (
        <Tab.Navigator
            id="mainTabs"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#8E24AA',
                tabBarInactiveTintColor: '#18053799',
                tabBarStyle: {
                    backgroundColor: '#FCD5FF',
                    borderTopWidth: 0,
                    elevation: 5,
                    height: 75,
                    paddingBottom: 15,
                },
                tabBarLabelStyle: {
                    fontFamily: 'serif',
                    fontSize: 12,
                    fontWeight: '600',
                    marginTop: 4,
                },
                tabBarIconStyle: {
                    marginTop: 0,
                }
            }}
        >
            <Tab.Screen
                name="dashBoard"
                component={dashBoard}
                options={{
                    tabBarIcon: (props) => <TabIcon name="view-dashboard" {...props} />,
                    tabBarLabel: ({ focused, color }) => focused ? <Text style={{ color, fontSize: 12, fontFamily: 'serif', fontWeight: '600' }}>Dashboard</Text> : null
                }}
            />
            <Tab.Screen
                name="attendence"
                component={attendence}
                options={{
                    tabBarIcon: (props) => <TabIcon name="calendar-check" {...props} />,
                    tabBarLabel: ({ focused, color }) => focused ? <Text style={{ color, fontSize: 12, fontFamily: 'serif', fontWeight: '600' }}>Attendance</Text> : null
                }}
            />
            <Tab.Screen
                name="team"
                component={team}
                options={{
                    tabBarIcon: (props) => <TabIcon name="account-group" {...props} />,
                    tabBarLabel: ({ focused, color }) => focused ? <Text style={{ color, fontSize: 12, fontFamily: 'serif', fontWeight: '600' }}>Team</Text> : null
                }}
            />
            <Tab.Screen
                name="task"
                component={task}
                options={{
                    tabBarIcon: (props) => <TabIcon name="clipboard-list" {...props} />,
                    tabBarLabel: ({ focused, color }) => focused ? <Text style={{ color, fontSize: 12, fontFamily: 'serif', fontWeight: '600' }}>Task</Text> : null
                }}
            />
            <Tab.Screen
                name="analytics"
                component={analytics}
                options={{
                    tabBarIcon: (props) => <TabIcon name="chart-bar" {...props} />,
                    tabBarLabel: ({ focused, color }) => focused ? <Text style={{ color, fontSize: 12, fontFamily: 'serif', fontWeight: '600' }}>Analytics</Text> : null
                }}
            />
        </Tab.Navigator>
    );
};

export default AppNavigator;
