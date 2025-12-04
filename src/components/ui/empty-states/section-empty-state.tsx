import React, { ReactNode } from 'react';
import { View, ViewProps } from 'react-native';
import { BaseText } from '@/components/ui';

export interface SectionEmptyStateProps extends Partial<ViewProps> {
  text?: string;
  icon?: ReactNode;
  btnText?: string;
  onPressBtn?: () => void;
}

const SectionEmptyState = ({ text, icon, btnText, onPressBtn, ...rest }: SectionEmptyStateProps) => {
  return (
    <View className="flex-1 items-center justify-center py-[50px]" {...rest}>
      {icon}
      <BaseText fontSize={12} weight={'medium'} classes={'text-grey-muted mt-10'}>
        {text}
      </BaseText>
      {/* <Button className='mt-20' text={btnText!} onPress={onPressBtn}/> */}
    </View>
  );
};

export default SectionEmptyState;
