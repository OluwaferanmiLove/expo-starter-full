import colors from '@/theme/colors';
import { Switch, SwitchProps } from 'react-native-switch';
import { useEffect, useState } from 'react';
import { wp } from '@/utils';

interface CustomSwitchProps extends Partial<SwitchProps> {}

const CustomSwitch = ({ ...rest }: CustomSwitchProps) => {
  // const [localValue, setLocalValue] = useState(false);

  // useEffect(() => {
  //   setLocalValue(rest?.value ?? false);
  // }, [rest?.value]);

  return (
    <Switch
      switchWidthMultiplier={2}
      circleSize={wp(16)}
      backgroundActive={colors.accentGreen.main}
      backgroundInactive={colors.grey.mutedLight}
      circleBorderActiveColor={colors.accentGreen.main}
      circleBorderInactiveColor={colors.grey.mutedLight}
      renderActiveText={false}
      renderInActiveText={false}
      {...rest}
      // value={localValue}
      // onValueChange={value => {
      //   setLocalValue(value);
      //   rest?.onValueChange?.(value);
      // }}
    />
  );
};

export default CustomSwitch;
