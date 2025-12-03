import React, { ReactNode } from 'react';
import colors from '@/theme/colors';
import Pressable, { PressableProps } from '../base/pressable';
import CircledIcon from '../circled-icon';
import { Add } from 'iconsax-react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { wp } from '@/utils';

interface FABProps extends PressableProps {
  disabled?: boolean;
  children?: ReactNode;
}

const DURATION = 300;

const FAB = ({ disabled, children, ...rest }: FABProps) => {
  const transition = useSharedValue(0);
  const isActive = useSharedValue(true);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(transition.value, [0, 1], [1, 0.9]) }],
  }));

  return (
    <Pressable
      className="absolute right-20 bottom-[45px]"
      disabled={disabled}
      hitSlop={16}
      {...rest}
      onPressIn={() => {
        isActive.value = true;
        transition.value = withTiming(1, { duration: DURATION }, () => {
          if (!isActive.value) {
            transition.value = withTiming(0, { duration: DURATION });
          }
        });
      }}
      onPressOut={() => {
        if (transition.value === 1) {
          transition.value = withTiming(0, { duration: DURATION });
        }
        isActive.value = false;
      }}>
      <Animated.View style={style}>
        <CircledIcon className="bg-primary-main p-16">
          {children ? children : <Add size={wp(24)} color={colors.white} />}
        </CircledIcon>
      </Animated.View>
    </Pressable>
  );
};

export default FAB;
