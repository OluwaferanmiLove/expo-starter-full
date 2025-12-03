import React, { ReactNode } from 'react';
import { Platform, View, ViewProps } from 'react-native';
import Button, { ButtonProps } from '@/components/ui/buttons/button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import cx from 'classnames';

export interface FixedBtnFooterProps extends Partial<ViewProps> {
  buttons: ButtonProps[];
  topAddOn?: ReactNode;
}

const FixedBtnFooter = ({ buttons = [], topAddOn, ...props }: FixedBtnFooterProps) => {
  const { bottom } = useSafeAreaInsets();

  const computeIosBottom = bottom > 0 ? bottom : 12;

  const insertBottom = Platform.select({ ios: computeIosBottom, android: bottom + 12 });

  return (
    <View style={{ paddingBottom: insertBottom }} className={cx('bg-white border-t border-t-[#E2E8F0]')}>
      {topAddOn && topAddOn}
      <View {...props} className={cx('flex-row pt-10 px-20', { 'gap-x-10': buttons.length > 1 })}>
        {buttons.map(props => (
          <View key={props.text} className="flex-1">
            <Button {...props} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default FixedBtnFooter;
