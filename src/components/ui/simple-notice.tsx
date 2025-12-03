import React from 'react';
import { BaseText } from './base';
import { View } from 'react-native';

interface SimpleNoticeProps {
  text: string;
}

const SimpleNotice = ({ text }: SimpleNoticeProps) => {
  return (
    <View className="px-12 py-8 bg-accentYellow-pastel rounded-8 mt-8 mb-10">
      <BaseText fontSize={11} classes="text-black-muted" lineHeight={16}>
        {text}
      </BaseText>
    </View>
  );
};

export default SimpleNotice;
