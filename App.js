import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import OnboardingScreen from './Screens/OnboardingScreen';
import OnboardingScreen2 from './Screens/OnboardingScreen2';
import Login from './Screens/Login';
import Profile from './Screens/Profile';
import Signup from './Screens/Signup';
import CreateActivity from './Screens/CreateActivity';
import Chat from './Screens/Chat';
import ApplicationSettings from './Screens/ApplicationSettings';
import MainMap from './Screens/MainMap';
import Activities from './Screens/Activities';
import PrivacyPolicy from './Screens/PrivacyPolicy';
import ActivityDetails from './Screens/ActivityDetails';
import HelpAndSupport from './Screens/HelpAndSupport';
import AccountSettings from './Screens/AccountSettings';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnboardingScreen" screenOptions={{
        headerStyle: {
          backgroundColor: '#1f1f39',
          borderBottomRightRadius: '40',
          height: 120,
        },
        headerTitleStyle: {
          color: 'white',
          overflow: 'hidden',
        }
      }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen name="Login" component={Login}
          options={{
            headerShown: false,
            title: "Sign in to SportCall",
            borderBackgroundColor: 'black',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen name="OnboardingScreen2" component={OnboardingScreen2}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen name="Signup" component={Signup}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen name="MainMap" component={MainMap}
        options={{
          headerLeft: false,
        }} />
        <Stack.Screen name="Profile" component={Profile}
        options={{
          headerBackTitleVisible: false,
        }} />
        <Stack.Screen name="ApplicationSettings" component={ApplicationSettings}
        options={{
          headerBackTitleVisible: false,
        }} />
        <Stack.Screen name="ActivityDetails" component={ActivityDetails}
        options={{
          headerBackTitleVisible: false,
        }} />
        <Stack.Screen name="HelpAndSupport" component={HelpAndSupport}
        options={{
          headerBackTitleVisible: false,
        }} />
        <Stack.Screen name="Activities" component={Activities}
        options={{
          headerBackTitleVisible: false,
        }} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy}
        options={{
          headerBackTitleVisible: false,
        }} />
        <Stack.Screen name="AccountSettings" component={AccountSettings}
        options={{
          headerBackTitleVisible: false,
        }} />
        <Stack.Screen name="Chat" component={Chat}/>
        <Stack.Screen name="CreateActivity" component={CreateActivity}
        options={{
          headerBackTitleVisible: false,
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};