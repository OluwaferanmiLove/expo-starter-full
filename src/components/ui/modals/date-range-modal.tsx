import { View } from 'react-native';
import BottomModal, { BottomModalProps } from './bottom-modal';
import CalendarModal from './calendar-modal';
import useModals from 'src/hooks/use-modals';
import ListItemCard from '../cards/list-item-card';
import { getFilter } from '../graph/area-graph';
import Radio from '../buttons/radio';
import { useCallback, useState } from 'react';
import { ChangedDate } from 'react-native-calendar-picker';
import Toast from 'react-native-toast-message';
import dayjs from 'dayjs';
import { TimeRange } from 'src/@types/utils';

export interface DateRangeString {
  from: string | null;
  to: string | null;
}

interface DateRangeModalProps extends Partial<BottomModalProps> {
  closeModal: () => void;
  onPressProceed?: (dateRange: DateRangeString) => void;
}

const DateRangeModal = ({ children, closeModal, onPressProceed, ...props }: DateRangeModalProps) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange | null>(null);
  const [dateRange, setDateRange] = useState<DateRangeString>({ from: null, to: null });
  const [selectedDate, setSelectedDate] = useState<{ startDate: Date; endDate: Date }>({
    startDate: new Date(),
    endDate: new Date(),
  });

  const { modals, toggleModal } = useModals(['calender']);

  const options = [
    { range: TimeRange.ALL_TIME, text: 'All Time' },
    { range: TimeRange.THIS_YEAR, text: 'This year' },
    { range: TimeRange.LAST_30_DAYS, text: 'Last 30 days' },
    { range: TimeRange.LAST_WEEK, text: 'Last week' },
    { range: TimeRange.THIS_WEEK, text: 'This week' },
    { range: TimeRange.TODAY, text: 'Today' },
    { range: TimeRange.CUSTOM, text: 'Custom Time' },
  ];

  const selectTimeRange = (value: TimeRange) => {
    if (value === TimeRange.CUSTOM) {
      toggleModal('calender');
      return;
    }
    const filter = getFilter(value);
    setDateRange({ from: filter.from, to: filter.to });

    setSelectedTimeRange(value);
  };

  const onDateChange = (date: Date, type: ChangedDate) => {
    if (type === 'START_DATE') {
      setSelectedDate(prev => ({ ...prev, startDate: date }));
    }
    if (type === 'END_DATE') {
      setSelectedDate(prev => ({ ...prev, endDate: date }));
    }
  };

  const onPressCalenderProceed = useCallback(() => {
    if (
      selectedDate.startDate !== null &&
      selectedDate.endDate !== null &&
      dayjs(selectedDate.startDate).format('DD/MM/YYYY') !== dayjs(selectedDate.endDate).format('DD/MM/YYYY')
    ) {
      toggleModal('calender', false);
      setSelectedTimeRange(TimeRange.CUSTOM);
      setDateRange({
        from: dayjs(selectedDate.startDate).format(),
        to: dayjs(selectedDate.endDate).format(),
      });
      return;
    }

    Toast.show({ text1: 'Select a date range greater than one day', type: 'error' });
  }, [selectedDate]);

  const selectedDateText = () => {
    if (selectedTimeRange === TimeRange.CUSTOM) {
      return `[${dayjs(selectedDate.startDate).format('ddd, MMM DD YYYY')} - ${dayjs(selectedDate.endDate).format('ddd, MMM DD YYYY')}]`;
    }

    return undefined;
  };

  return (
    <BottomModal
      title={'Select Date Range'}
      closeModal={closeModal}
      buttons={[
        {
          text: 'Proceed',
          onPress: () => {
            onPressProceed?.(dateRange);
            closeModal();
          },
        },
      ]}
      {...props}>
      <View className="items-center px-20 pb-20">
        {options.map((item, index) => (
          <ListItemCard
            key={item.text}
            title={item.text}
            titleProps={{ weight: 'medium' }}
            description={item.range === TimeRange.CUSTOM ? selectedDateText() : undefined}
            descriptionClasses="mt-5"
            titleClasses="mx-0 text-black-muted"
            showBorder={index !== options.length - 1}
            onPress={() => selectTimeRange(item.range)}
            rightElement={<Radio active={selectedTimeRange === item.range} />}
          />
        ))}
      </View>
      <CalendarModal
        isVisible={modals.calender}
        closeModal={() => toggleModal('calender', false)}
        startDate={selectedDate.startDate}
        endDate={selectedDate.endDate}
        singleSelectMode={false}
        onDateChange={onDateChange}
        onPressProceed={onPressCalenderProceed}
      />
    </BottomModal>
  );
};

export default DateRangeModal;
