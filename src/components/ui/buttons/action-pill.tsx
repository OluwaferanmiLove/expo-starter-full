import { ReactNode } from 'react';
import { TouchableOpacity, View } from 'react-native';
import BaseText from '@/components/ui/base/base-text';
import Pressable from '../base/pressable';

interface ActionPillProps extends Partial<typeof TouchableOpacity> {
  leftIcon?: ReactNode;
  title: string;
  showArrow?: boolean;
  rightIcon?: ReactNode;
  // onPress: Vo
  onPress?: VoidFunction;
  addon?: ReactNode;
}

const ActionPill = (props: ActionPillProps) => {
  const { leftIcon, title, showArrow, rightIcon, addon, ...rest } = props;

  return (
    <Pressable className={'flex flex-row p-6 pr-10 items-center justify-center rounded-40 bg-grey-bgOne'} {...rest}>
      {leftIcon && <View className="rounded-full bg-white p-6 flex items-center justify-center">{leftIcon}</View>}
      <BaseText fontSize={12} classes="text-black-secondary mx-4" weight="medium">
        {title}
      </BaseText>
      {addon ? addon : null}
    </Pressable>
  );
};

export default ActionPill;
