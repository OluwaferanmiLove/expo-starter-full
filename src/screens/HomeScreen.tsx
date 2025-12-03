import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAuthStore } from '@/store/authStore';
import type { AppStackParamList } from '@/navigation/app-navigation';

type Props = NativeStackScreenProps<AppStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { user } = useAuthStore();

  return (
    <View className="flex-1 bg-white px-6 pt-12">
      <View className="mb-8">
        <Text className="text-2xl font-bold text-gray-800">Welcome, {user?.name || 'User'}!</Text>
        <Text className="mt-2 text-gray-600">You&apos;re now logged in to the app.</Text>
      </View>

      <View className="flex-1">
        <Text className="mb-4 text-lg font-semibold text-gray-700">Quick Actions</Text>

        <TouchableOpacity
          className="mb-3 flex-row items-center rounded-lg bg-gray-100 p-4"
          onPress={() => navigation.navigate('Profile')}>
          <View className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-blue-500">
            <Text className="text-lg font-bold text-white">👤</Text>
          </View>
          <View>
            <Text className="font-semibold text-gray-800">View Profile</Text>
            <Text className="text-sm text-gray-600">Manage your account settings</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="mb-3 flex-row items-center rounded-lg bg-gray-100 p-4"
          onPress={() => navigation.navigate('Settings')}>
          <View className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-green-500">
            <Text className="text-lg font-bold text-white">⚙️</Text>
          </View>
          <View>
            <Text className="font-semibold text-gray-800">Settings</Text>
            <Text className="text-sm text-gray-600">Configure app preferences</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
