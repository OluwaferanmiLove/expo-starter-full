import { cx } from '@/utils/function';
import { ReactNode } from 'react';
import { Text, View, ViewProps } from 'react-native';

interface ContainerProps extends Partial<ViewProps> {
  children?: ReactNode;
  classes?: string;
}

const Container = ({ children, classes, ...props }: ContainerProps) => {
  return (
    <View className={cx('flex-1 px-20 pb-40', classes)} {...props}>
      {children}
    </View>
  );
};

export default Container;
