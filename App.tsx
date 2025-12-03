import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import './global.css';
import RootNavigation from '@/navigation/root-navigation';
import useNotificationSetup from '@/hooks/use-notification-setup';

export default function App() {
  // Initialize notification setup
  useNotificationSetup();

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <RootNavigation />
    </SafeAreaProvider>
  );
}
