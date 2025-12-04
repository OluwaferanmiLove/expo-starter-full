import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { BaseText } from '@/components/ui';
import Button, { ButtonSize } from '../buttons/button';
import classNames from 'classnames';
import { cx } from '@/utils';

export interface EmptyStateProps {
  text: string;
  icon?: ReactNode;
  customIcon?: ReactNode;
  btnText?: string;
  subText?: string;
  title?: string;
  showBtn?: boolean;
  onPressBtn?: () => void;
  classes?: string;
}

const EmptyState = ({ text, title, classes, subText, icon, customIcon, showBtn = true, btnText, onPressBtn }: EmptyStateProps) => {
  return (
    <View className={cx('flex-1 w-10/12 self-center items-center justify-center', classes)}>
      {!customIcon && <View className={classNames(`mb-10 bg-grey-bgOne rounded-full p-15`)}>{icon}</View>}
      {customIcon && customIcon}
      {title && (
        <BaseText fontSize={20} type="heading" weight="bold" classes="text-black-main text-center">
          {title}
        </BaseText>
      )}
      <BaseText fontSize={14} lineHeight={20} classes={classNames('text-black-placeholder text-center', { 'mt-15': !title, 'mt-5': title })}>
        {text}
      </BaseText>
      {subText && (
        <BaseText fontSize={11} weight="regular" classes="text-black-muted text-center mt-5">
          {subText}
        </BaseText>
      )}
      {showBtn && (
        <Button
          className="mt-20"
          style={{ width: 'auto' }}
          text={btnText!}
          onPress={onPressBtn}
          size={ButtonSize.MEDIUM}
        />
      )}
    </View>
  );
};

export default EmptyState;
