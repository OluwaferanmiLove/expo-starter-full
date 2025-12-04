import { colors } from '@/theme/colors';
import React from 'react';
import {ActivityIndicator, Dimensions, View} from 'react-native';

interface PropsType {
  isVisible: boolean;
}

const {width, height} = Dimensions.get('screen');

const LoadingModal = ({isVisible, ...rest}: PropsType) => {
  return isVisible ? (
    <View
      className={`flex-1 items-center justify-center absolute z-50 bg-[#00000068]`}
      style={{width, height}}
      {...rest}>
      <View
        className={
          'h-100 w-100 rounded-8 bg-grey2 items-center justify-center'
        }>
        <ActivityIndicator color={colors?.primary.main} size="large" animating />
      </View>
    </View>
  ) : null;
};

export default LoadingModal;
