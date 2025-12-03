import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { AppStackParamList } from '@/navigation/app-navigation';

type Props = NativeStackScreenProps<AppStackParamList, 'Settings'>;

export default function SettingsScreen({ navigation }: Props) {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  return (
    <View className="flex-1 bg-white px-6 pt-12">
      <Text className="mb-8 text-2xl font-bold text-gray-800">Settings</Text>

      <View className="mb-6">
        <Text className="mb-4 text-lg font-semibold text-gray-700">Preferences</Text>

        <View className="rounded-lg bg-gray-100">
          <View className="flex-row items-center justify-between border-b border-gray-200 p-4">
            <View>
              <Text className="font-medium text-gray-800">Notifications</Text>
              <Text className="text-sm text-gray-500">Receive push notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
            />
          </View>

          <View className="flex-row items-center justify-between p-4">
            <View>
              <Text className="font-medium text-gray-800">Dark Mode</Text>
              <Text className="text-sm text-gray-500">Use dark theme appearance</Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
            />
          </View>
        </View>
      </View>

      <View className="mb-6">
        <Text className="mb-4 text-lg font-semibold text-gray-700">About</Text>

        <View className="rounded-lg bg-gray-100">
          <TouchableOpacity className="border-b border-gray-200 p-4">
            <Text className="font-medium text-gray-800">Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity className="border-b border-gray-200 p-4">
            <Text className="font-medium text-gray-800">Terms of Service</Text>
          </TouchableOpacity>

          <View className="p-4">
            <Text className="font-medium text-gray-800">Version</Text>
            <Text className="text-sm text-gray-500">1.0.0</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
