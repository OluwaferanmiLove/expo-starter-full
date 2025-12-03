import React from 'react';
import { View } from 'react-native';
import { wp, hp } from '@/assets/utils/js';
import Shimmer from '@/components/ui/shimmer';

interface SelectDropdownSkeletonLoaderProps {
  itemCount?: number;
  showDescription?: boolean;
  showLeftElement?: boolean;
  showRightElement?: boolean;
  showBorder?: boolean;
}

const SelectDropdownSkeletonLoader: React.FC<SelectDropdownSkeletonLoaderProps> = ({
  itemCount = 5,
  showDescription = false,
  showLeftElement = false,
  showRightElement = true,
  showBorder = true,
}) => {
  const renderSkeletonItem = (index: number) => (
    <View
      key={index}
      className={`px-20 py-15 ${showBorder && index !== itemCount - 1 ? 'border-b border-grey-border' : ''}`}>
      <View className="flex-row items-center justify-between">
        {showLeftElement && (
          <View className="mr-12">
            <Shimmer width={wp(32)} height={wp(32)} borderRadius={32} />
          </View>
        )}

        <View className="flex-1">
          <Shimmer width={wp(120 + Math.random() * 80)} height={hp(16)} borderRadius={4} />
          {showDescription && (
            <Shimmer width={wp(80 + Math.random() * 60)} height={hp(12)} borderRadius={4} marginTop={5} />
          )}
        </View>
        {showRightElement && (
          <View className="ml-12">
            <Shimmer width={wp(20)} height={wp(20)} borderRadius={10} />
          </View>
        )}
      </View>
    </View>
  );

  return <View className="bg-white">{Array.from({ length: itemCount }, (_, index) => renderSkeletonItem(index))}</View>;
};

export default SelectDropdownSkeletonLoader;
