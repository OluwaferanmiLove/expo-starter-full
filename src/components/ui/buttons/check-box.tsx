import classNames from 'classnames';
import { View } from 'react-native';
import colors from '@/theme/colors';
import { TickSquare } from 'iconsax-react-native';

interface CheckBoxProps {
  checked: boolean;
}

const CheckBox = ({ checked }: CheckBoxProps) => {
  return (
    <View
      className={classNames(
        'flex h-[17px] w-[17px] items-center justify-center rounded-[4px] border-[1.5px] p-2',
        {
          'border-grey-border': !checked,
          'border-accentGreen-main': checked,
        }
      )}>
      {checked && (
        <TickSquare
          variant={checked ? 'Bold' : 'Linear'}
          size={12}
          color={colors.accentGreen.main}
        />
      )}
    </View>
  );
};

export default CheckBox;
