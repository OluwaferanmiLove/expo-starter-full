import React from 'react';
import { View, Text } from 'react-native';


export default function LoginScreen() {
  return (
    <View className="flex-1 px-6">
      <Text className="text-gray-800 mb-8 text-center text-3xl font-bold">Welcome Back</Text>
      <View className="mb-4">
        <Text className="text-black-muted mb-2 text-sm font-medium">Email</Text>
      </View>
    </View>
  );
}
