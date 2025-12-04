import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAuthStore } from '@/store/authStore';
import type { AuthStackParamList } from '@/navigation/auth-navigation';
import DashboardLayout from '@/components/ui/layouts/dashboard-layout';
import { BaseText, Button } from '@/components/ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: Props) {
  const { login } = useAuthStore();

  const { bottom, top } = useSafeAreaInsets();

  const handleGetStarted = async () => {
    // For now, just log the user in to complete onboarding
    // Replace with actual authentication flow
    await login('user@example.com', 'password');
  };

  return (
    <DashboardLayout noInset>
      <ImageBackground
        source={require('@/assets/images/bg.png')}
        className="flex-1 px-20"
        style={{ paddingBottom: bottom, paddingTop: top }}>
        <View className="mb-40 flex-1 justify-end">
          <BaseText fontSize={32} classes="text-grey-mutedLight">
            Welcome to
          </BaseText>

          <BaseText fontSize={32} weight="semiBold" classes="mb-2 text-white">
            Gemma
          </BaseText>
          <Text className="mt-5 text-grey-extraLight">
            Snap, try, and book stylists around you.
          </Text>
        </View>

        <View className="pb-12">
          <Button text="Continue with Google" onPress={handleGetStarted} />
          <View className="mt-15">
            <Button text="Continue with Apple" onPress={handleGetStarted} />
          </View>

          <Text className="mt-15  mx-20 text-center text-grey-extraLight">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </ImageBackground>
    </DashboardLayout>
  );
}
