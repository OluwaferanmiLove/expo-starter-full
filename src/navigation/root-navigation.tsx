import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuthStore } from '@/store/authStore';
import AuthNavigation from './auth-navigation';
import AppNavigation from './app-navigation';

export default function RootNavigation() {
  const { isAuthenticated } = useAuthStore();

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
}
