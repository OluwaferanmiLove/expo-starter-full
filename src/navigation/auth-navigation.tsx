import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingScreen from '@/screens/OnboardingScreen';
import WelcomeScreen from '@/screens/WelcomeScreen';

export type AuthStackParamList = {
  Onboarding: undefined;
  Welcome: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
}
