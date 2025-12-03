import { styled } from 'nativewind';
import { TouchableWithoutFeedback } from 'node_modules/@gorhom/bottom-sheet/lib/typescript';
import React, { ReactNode } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export interface PressableProps extends TouchableOpacityProps {
  children?: ReactNode;
  trackingText?: string;
  onPress?: VoidFunction;
}

const Pressable = ({ children, trackingText, ...rest }: PressableProps) => {
  const handleOnPress = () => {
    //handle tracking with tracking text (trackingText)
    rest.onPress?.();
  };
  return (
    <TouchableOpacity activeOpacity={0.8} {...rest} onPress={handleOnPress}>
      {children}
    </TouchableOpacity>
  );
};

export default styled(Pressable);
