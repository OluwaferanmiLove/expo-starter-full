import React, { forwardRef, useRef } from 'react';
import {
  StyleSheet,
  TextProps,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  View,
  Platform,
  TextInput,
} from 'react-native';
import colors from '@/theme/colors';
import { hp, wp } from '@/assets/utils/js';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useVector } from 'react-native-redash';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import cx from 'classnames';
import classNames from 'classnames';
import { BaseText } from '../base';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
// import { TextInput } from 'react-native-gesture-handler';
import useUncontrolledValue from 'src/hooks/use-uncontrolled-value';

export interface InputProps extends TextInputProps {
  containerClasses?: TextProps['className'];
  value?: any;
  leftPadding?: number;
  label?: string;
  leftAccessory?: ReactNode;
  rightAccessory?: ReactNode;
  hasBorder?: boolean;
  name?: string;
  isDropdown?: boolean;
  dropDownCustomElement?: ReactNode;
  hasError?: boolean;
  error?: any;
  useBottomSheetInput?: boolean;
  selectDisabled?: boolean;
  type?: 'number' | 'text' | 'select';
  greyOutOnDisabled?: boolean;
  disableUncontrolled?: boolean;
  textInputClasses?: string;
}

const activeLabelSize = wp(10);
const inActiveLabelSize = wp(13);

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      leftAccessory,
      rightAccessory,
      leftPadding,
      value,
      containerClasses,
      hasBorder = true,
      isDropdown,
      name,
      dropDownCustomElement,
      onChangeText,
      onBlur,
      hasError,
      error,
      useBottomSheetInput = false,
      editable = true,
      selectDisabled = false,
      type = 'text',
      greyOutOnDisabled = true,
      disableUncontrolled = false,
      textInputClasses,
      ...rest
    }: InputProps,
    ref,
  ) => {
    const isAndroidDevice = Platform.OS === 'android';
    const [isFocused, setIsFocused] = useState(false);
    const isSmallLabelActive = useSharedValue(false);

    const inactiveLeft = leftPadding ? leftPadding : 12;
    const textValue = value === undefined || value === null ? '' : String(value);

    const { handleChange, syncedValue } = useUncontrolledValue(textValue, onChangeText, disableUncontrolled);

    useEffect(() => {
      if (textValue?.length! > 0) {
        isSmallLabelActive.value = true;
      }
    }, [textValue]);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        left: withTiming(isSmallLabelActive.value === true ? 9 : inactiveLeft, {
          duration: 250,
        }),
        top: withTiming(isSmallLabelActive.value === true ? -10 : 12, {
          duration: 250,
        }),
      };
    });

    const containerAnimatedStyle = useAnimatedStyle(() => {
      return {
        borderColor: withTiming(
          hasError ? colors.accentRed.main : isFocused ? colors.primary.main : colors.grey.mutedLight + '4d',
        ),
      };
    });

    const textAnimatedStyle = useAnimatedStyle(() => {
      return {
        fontSize: withTiming(isSmallLabelActive.value === true ? activeLabelSize : inActiveLabelSize),
      };
    });

    const handleOnfocus = e => {
      setIsFocused(true);
      rest.onFocus?.(e);
      isSmallLabelActive.value = true;
    };

    const handleOnBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);

      if (!textValue && textValue !== '0') {
        isSmallLabelActive.value = false;
      }

      if (onBlur) onBlur(e);
    };

    return (
      <View>
        <Animated.View
          className={cx('flex-row items-center p-15 rounded-[12px]', containerClasses, {
            border: hasBorder,
            'bg-[#F8F8F8B3]': greyOutOnDisabled ? (type === 'select' ? selectDisabled : !editable) : false,
          })}
          style={containerAnimatedStyle}>
          {label && (
            <Animated.View
              style={[styles.labelContainer, animatedStyle]}
              className={classNames({ '-ml-5': rest?.multiline })}>
              <Animated.Text style={[styles.baseText, textAnimatedStyle]} numberOfLines={1} ellipsizeMode={'tail'}>
                {label}
              </Animated.Text>
            </Animated.View>
          )}
          {leftAccessory}
          {isDropdown ? (
            <View className="flex-1">
              {dropDownCustomElement ? (
                dropDownCustomElement
              ) : (
                <BaseText className={leftAccessory ? 'ml-8' : ''}>{textValue}</BaseText>
              )}
            </View>
          ) : (
            <>
              {useBottomSheetInput ? (
                <BottomSheetTextInput
                  // className={classNames('flex-1 font-interRegular text-black-main', {
                  //   'pt-0': rest?.multiline,
                  //   'ml-14': leftAccessory,
                  // })}
                  ref={ref}
                  style={{
                    marginVertical: 0,
                    paddingVertical: 0,
                    paddingLeft: 0,

                    fontSize: wp(13),
                    flex: 1,
                    ...(leftAccessory && { marginLeft: wp(14) }),
                    ...(rest?.multiline && { paddingTop: 0 }),
                  }}
                  // style={{ marginVertical: 0, paddingVertical: 0, paddingLeft: 0 }}
                  onBlur={handleOnBlur}
                  placeholderTextColor={colors.black.placeholder}
                  onChangeText={handleChange}
                  editable={editable}
                  defaultValue={syncedValue}
                  onFocus={handleOnfocus}
                  {...rest}
                />
              ) : (
                <TextInput
                  className={classNames('flex-1 font-interRegular text-black-main', textInputClasses, {
                    'pt-0 h-full': rest?.multiline,
                    'ml-14': leftAccessory,
                  })}
                  ref={ref}
                  style={{ marginVertical: 0, paddingVertical: 0, paddingLeft: 0, fontSize: wp(13) }}
                  // style={{ marginVertical: 0, paddingVertical: 0, paddingLeft: 0 }}
                  onBlur={handleOnBlur}
                  placeholderTextColor={colors.black.placeholder}
                  onChangeText={handleChange}
                  defaultValue={syncedValue}
                  editable={editable}
                  {...rest}
                  textAlignVertical={rest.multiline ? 'top' : 'center'}
                  onFocus={handleOnfocus}
                />
              )}
            </>
          )}
          {rightAccessory}
        </Animated.View>
        {rest.maxLength && isFocused && !hasError && (
          <View className="mt-5 self-end">
            <BaseText
              fontSize={10}
              weight={'medium'}
              classes={cx('text-grey-muted', { 'text-accentRed-main': rest.maxLength === textValue?.length })}>
              {textValue?.length}/{rest.maxLength} characters
            </BaseText>
          </View>
        )}
        {hasError && error && (
          <View className="mt-5">
            <BaseText fontSize={10} weight={'medium'} classes="text-accentRed-main">
              {error}
            </BaseText>
          </View>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  labelContainer: {
    position: 'absolute',
    paddingHorizontal: hp(8),
    paddingVertical: wp(3),
    backgroundColor: colors.white,
    maxWidth: '85%',
  },
  baseText: {
    fontFamily: 'Inter-Regular',
    color: colors.black.placeholder,
  },
});

export default React.memo(Input);
