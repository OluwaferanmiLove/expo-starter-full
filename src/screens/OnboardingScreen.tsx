import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ViewToken,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { AuthStackParamList } from '@/navigation/auth-navigation';
import DashboardLayout from '@/components/ui/layouts/dashboard-layout';

const { width } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  emoji: string;
}

const slides: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Try On Hairstyles Instantly',
    description: 'Use AI to see how different hairstyles look on you before making a change.',
    emoji: '✨',
  },
  {
    id: '2',
    title: 'Snap & Preview',
    description: 'Take a quick photo and explore hundreds of trending hairstyles in seconds.',
    emoji: '�',
  },
  {
    id: '3',
    title: 'Find Nearby Stylists',
    description: 'Discover top-rated hairstylists near you and book your perfect look.',
    emoji: '�',
  },
];

type Props = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>;

export default function OnboardingScreen({ navigation }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate('Welcome');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Welcome');
  };

  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <View style={{ width }} className="flex-1 items-center justify-center px-8">
      <View className="mb-8 h-32 w-32 items-center justify-center rounded-full bg-blue-100">
        <Text className="text-6xl">{item.emoji}</Text>
      </View>
      <Text className="mb-4 text-center text-3xl font-bold text-gray-800">
        {item.title}
      </Text>
      <Text className="text-center text-base leading-6 text-gray-600">
        {item.description}
      </Text>
    </View>
  );

  const renderDots = () => (
    <View className="mb-8 flex-row justify-center">
      {slides.map((_, index) => (
        <View
          key={index}
          className={`mx-1 h-2 rounded-full ${
            index === currentIndex ? 'w-6 bg-blue-600' : 'w-2 bg-gray-300'
          }`}
        />
      ))}
    </View>
  );

  return (
    <DashboardLayout>
      <View className="flex-row justify-end p-4">
        <TouchableOpacity onPress={handleSkip}>
          <Text className="text-base font-medium text-gray-500">Skip</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        className="flex-1"
      />

      {renderDots()}

      <View className="px-6 pb-12">
        <TouchableOpacity
          className="rounded-xl bg-blue-600 py-4"
          onPress={handleNext}
        >
          <Text className="text-center text-base font-semibold text-white">
            {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </DashboardLayout>
  );
}

