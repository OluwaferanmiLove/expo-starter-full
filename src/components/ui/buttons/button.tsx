import React, { ReactNode } from 'react';
import { BaseText } from '../base';
import cx from 'classnames';
import Pressable, { PressableProps } from '../base/pressable';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { hp } from '@/utils';

export interface ButtonProps extends PressableProps {
  text: string;
  textColor?: TextColor;
  negative?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  btnStyle?: string;
  leftAddOn?: ReactNode;
  rightAddOn?: ReactNode;
  onPress?: VoidFunction;
  otherTrackingInfo?: Record<string, any>;
}

export enum ButtonSize {
  'MEDIUM' = 'MEDIUM',
  'LARGE' = 'LARGE',
  'SMALL' = 'SMALL',
}

export enum ButtonVariant {
  'PRIMARY' = 'Primary',
  'LIGHT' = 'Light',
  'SUCCESS' = 'Success',
  'WHITE' = 'White',
  'DANGER' = 'Danger',
}

export enum TextColor {
  'PRIMARY' = 'Primary',
  'NEGATIVE' = 'Negative',
  'WHITE' = 'White',
}

const DURATION = 60;

const Button = ({
  onPress,
  text,
  disabled,
  isLoading,
  variant = ButtonVariant.PRIMARY,
  size = ButtonSize.LARGE,
  textColor,
  loadingText,
  btnStyle,
  leftAddOn,
  rightAddOn,
  ...rest
}: ButtonProps) => {
  const transition = useSharedValue(0);
  const isActive = useSharedValue(true);


  const style = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(transition.value, [0, 1], [1, 0.95]) }],
  }));

  return (
    <Pressable
      className={cx({ 'opacity-30': disabled || isLoading }, btnBaseStyle)}
      disabled={disabled || isLoading}
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
      }}
      {...rest}>
      <Animated.View
        style={[{ height: hp(sizeProperties[size].height) }, style]}
        className={cx(
          variantStyle[variant].classes,
          'flex justify-center items-center',
          sizeProperties[size].style,
          { 'flex-row ': rest.children || leftAddOn || rightAddOn },
          btnStyle,
        )}>
        {rest.children}
        {leftAddOn}
        <BaseText
          fontSize={sizeProperties[size].fontSize}
          weight={'medium'}
          classes={cx({
            'text-accentRed-main': textColor === TextColor.NEGATIVE,
            'text-primary-main': textColor ? textColor === TextColor.PRIMARY : variant === ButtonVariant.LIGHT,
            'text-white': textColor ? textColor === TextColor.WHITE : variant !== ButtonVariant.LIGHT,
          })}>
          {isLoading ? (loadingText ?? 'Loading...') : text}
        </BaseText>
        {rightAddOn}
      </Animated.View>
    </Pressable>
  );
};

const btnBaseStyle = 'items-center justify-center';

const variantStyle = {
  [ButtonVariant.PRIMARY]: { classes: 'w-full bg-primary-light' },
  [ButtonVariant.SUCCESS]: { classes: 'w-full bg-accentGreen-main text-white' },
  [ButtonVariant.LIGHT]: { classes: 'w-full bg-grey-bgOne' },
  [ButtonVariant.WHITE]: { classes: 'w-full bg-white' },
  [ButtonVariant.DANGER]: { classes: 'w-full bg-accentRed-main' },
};

const sizeProperties = {
  [ButtonSize.SMALL]: { height: 32, style: 'rounded-[10px] px-16', fontSize: 11 },
  [ButtonSize.MEDIUM]: { height: 40, style: 'rounded-[10px] px-20', fontSize: 12 },
  [ButtonSize.LARGE]: { height: 50, style: 'rounded-[15px] px-25', fontSize: 14 },
};

export default Button;
