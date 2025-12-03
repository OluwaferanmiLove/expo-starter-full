import { Calendar } from 'iconsax-react-native/src';
import { ReactNode, useState } from 'react';
import { TextInputProps, View } from 'react-native';
import { wp } from 'src/assets/utils/js';
import useModals from 'src/hooks/use-modals';
import colors from 'src/theme/colors';
import CalendarModal from '../modals/calendar-modal';
import Input from './input';
import * as Haptics from 'expo-haptics';
import Pressable from '../base/pressable';

interface Props extends TextInputProps {
  onDateChange: (date: Date) => void;
  containerClasses?: string;
  value?: any;
  leftPadding?: number;
  label?: string;
  leftAccessory?: ReactNode;
  rightAccessory?: ReactNode;
  hasBorder?: boolean;
  name?: string;
  hasError?: boolean;
  error?: any;
}
const DateInput: React.FC<Props> = ({ ...props }) => {
  const { modals, toggleModal } = useModals(['calender']);
  const [date, setDate] = useState<Date>(props.value);

  const onPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleModal('calender');
  };

  return (
    <View>
      <Pressable onPress={onPress}>
        <Input
          label={props.label}
          editable={false}
          value={props.value}
          onPressIn={onPress}
          rightAccessory={<RightAccessory />}
          {...props}
        />
      </Pressable>
      <CalendarModal
        isVisible={modals.calender}
        closeModal={() => toggleModal('calender', false)}
        startDate={date}
        singleSelectMode
        onDateChange={date => {
          setDate(date);
          props.onDateChange(date);
        }}
      />
    </View>
  );
};
export default DateInput;

const RightAccessory = () => (
  <View className="border-grey-bgOne rounded-full">
    <Calendar size={wp(16)} color={colors.grey.muted} />
  </View>
);
