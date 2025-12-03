import { styled } from 'nativewind';
import { View, ViewProps } from 'react-native';

interface SeparatorProps extends ViewProps {}

const Separator = ({ className, ...props }: SeparatorProps) => (
  <View className={`h-[1px] my-15 bg-grey-border mx-20 w-full ${className}`} {...props} />
);

export default styled(Separator);
