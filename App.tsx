import './global.css';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootNavigation from '@/navigation/root-navigation';
import useNotificationSetup from '@/hooks/use-notification-setup';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@/components/ui/others/toast-notification';

SplashScreen.preventAutoHideAsync().catch(() => {});


export default function App() {
  // Initialize notification setup
  // useNotificationSetup();

  const [fontsLoaded] = useFonts({
    'Inter-Black': require('@/assets/fonts/inter/Inter-Black.ttf'),
    'Inter-Bold': require('@/assets/fonts/inter/Inter-Bold.ttf'),
    'Inter-Light': require('@/assets/fonts/inter/Inter-Light.ttf'),
    'Inter-Medium': require('@/assets/fonts/inter/Inter-Medium.ttf'),
    'Inter-Regular': require('@/assets/fonts/inter/Inter-Regular.ttf'),
    'Inter-SemiBold': require('@/assets/fonts/inter/Inter-SemiBold.ttf'),
  });

  // Hide splash screen once fonts are loaded
  const onLayoutRootView = useCallback(async () => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 3000);
    if (fontsLoaded) {
      try {
        await SplashScreen.hideAsync();
      } catch (e) {
        console.error('Error hiding splash screen:', e);
      }
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />

      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <RootNavigation />
        <Toast config={toastConfig} topOffset={60} visibilityTime={10000} />
      </View>
    </SafeAreaProvider>
  );
}
