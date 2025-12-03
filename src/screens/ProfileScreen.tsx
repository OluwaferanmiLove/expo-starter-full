import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAuthStore } from '@/store/authStore';
import type { AppStackParamList } from '@/navigation/app-navigation';

type Props = NativeStackScreenProps<AppStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => logout(),
      },
    ]);
  };

  return (
    <View className="flex-1 bg-white px-6 pt-12">
      <View className="mb-8 items-center">
        <View className="mb-4 h-24 w-24 items-center justify-center rounded-full bg-blue-500">
          <Text className="text-4xl font-bold text-white">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        <Text className="text-2xl font-bold text-gray-800">{user?.name}</Text>
        <Text className="mt-1 text-gray-600">{user?.email}</Text>
      </View>

      <View className="mb-8">
        <Text className="mb-4 text-lg font-semibold text-gray-700">Account Information</Text>

        <View className="rounded-lg bg-gray-100 p-4">
          <View className="mb-4 border-b border-gray-200 pb-4">
            <Text className="text-sm text-gray-500">Name</Text>
            <Text className="mt-1 text-base font-medium text-gray-800">{user?.name}</Text>
          </View>

          <View className="mb-4 border-b border-gray-200 pb-4">
            <Text className="text-sm text-gray-500">Email</Text>
            <Text className="mt-1 text-base font-medium text-gray-800">{user?.email}</Text>
          </View>

          <View>
            <Text className="text-sm text-gray-500">User ID</Text>
            <Text className="mt-1 text-base font-medium text-gray-800">{user?.id}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity className="rounded-lg bg-red-500 py-4" onPress={handleLogout}>
        <Text className="text-center text-base font-semibold text-white">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
