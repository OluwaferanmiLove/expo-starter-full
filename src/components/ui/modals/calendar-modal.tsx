import { Dimensions, FlatListProps, Keyboard, View } from 'react-native';
import { ReactNode, useState } from 'react';
import BottomModal, { BottomModalProps } from './bottom-modal';
import { BaseText } from '../base';
import Calendar from 'react-native-calendar-range-picker';
import { formatDate, wp } from '@/assets/utils/js';
import colors from '@/theme/colors';
import moment from 'moment';
import Row from '../row';
import CircledIcon from '../circled-icon';
import { Calendar2 } from 'iconsax-react-native/src';
import CalendarPicker, { DateChangedCallback } from 'react-native-calendar-picker';
import { ChevronUp } from '../icons';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../others/toast-notification';

export interface CalendarModalProps extends Partial<BottomModalProps> {
  closeModal: () => void;
  singleSelectMode?: boolean;
  onDateChange: DateChangedCallback;
  startDate?: Date;
  endDate?: Date;
  onPressProceed?: VoidFunction;
  maxDate?: Date;
  minDate?: Date;
  initialDate?: Date;
  customDateFormat?: string;
  //use instead of title and description if its different
}

const CalendarModal = ({
  closeModal,
  onDateChange,
  onPressProceed,
  startDate,
  endDate,
  singleSelectMode = false,
  maxDate,
  minDate,
  initialDate,
  customDateFormat = 'D MMM YYYY',
  ...props
}: CalendarModalProps) => {
  const isRange = Boolean(startDate) && Boolean(endDate);

  return (
    <BottomModal
      // size="lg"
      enableDynamicSizing
      enableSnapPoints={false}
      buttons={[{ text: 'Select date', onPress: onPressProceed ?? closeModal }]}
      closeModal={closeModal}
      onModalShow={() => {
        Keyboard.dismiss();
      }}
      {...props}>
      <View className="px-0 pb-20">
        <CalendarPicker
          showDayStragglers
          onDateChange={onDateChange}
          selectedDayColor={colors.primary.main}
          selectedDayTextColor={colors.white}
          allowRangeSelection={singleSelectMode ? false : true}
          selectedStartDate={startDate}
          selectedEndDate={endDate}
          allowBackwardRangeSelect={false}
          todayBackgroundColor={colors.black.main}
          todayTextStyle={{ fontFamily: 'Inter-SemiBold', color: colors.primary.main }}
          selectedRangeStyle={{ backgroundColor: colors.primary.pastel }}
          selectedDayTextStyle={{ fontFamily: 'Inter-SemiBold', color: isRange ? colors.primary.main : colors.white }}
          selectedRangeStartTextStyle={{ color: colors.white }}
          selectedRangeEndTextStyle={{ color: colors.white }}
          selectedRangeStartStyle={{ backgroundColor: colors.primary.main }}
          selectedRangeEndStyle={{ backgroundColor: colors.primary.main }}
          previousComponent={
            <CircledIcon className="bg-grey-bgOne">
              <View className="-rotate-90">
                <ChevronUp size={wp(16)} strokeWidth={2} currentColor={colors.primary.main} />
              </View>
            </CircledIcon>
          }
          nextComponent={
            <CircledIcon className="bg-grey-bgOne">
              <View className="rotate-90">
                <ChevronUp size={wp(16)} strokeWidth={2} currentColor={colors.primary.main} />
              </View>
            </CircledIcon>
          }
          monthTitleStyle={{ fontSize: wp(16), fontFamily: 'FHOscar-Bold' }}
          yearTitleStyle={{ fontSize: wp(16), fontFamily: 'FHOscar-Bold' }}
          dayLabelsWrapper={{
            backgroundColor: colors.grey.bgOne,
            borderRadius: 10,
            borderTopWidth: 0,
            borderBottomWidth: 0,
            marginTop: 5,
            marginBottom: 10,
          }}
          maxDate={maxDate ?? undefined}
          minDate={minDate ?? undefined}
          initialDate={initialDate}
        />
      </View>
      {startDate && (
        <Row className="px-20 justify-start pt-2 pb-8">
          <CircledIcon iconBg="bg-grey-bgOne" className="p-6 mr-8">
            <Calendar2 size={wp(15)} color={colors.black.muted} />
          </CircledIcon>
          <BaseText fontSize={12} classes="text-black-placeholder">
            {!singleSelectMode ? (
              <>
                {startDate && formatDate(startDate, customDateFormat)} -{' '}
                {endDate ? `${formatDate(endDate, customDateFormat)}` : 'Till Deleted'}
              </>
            ) : (
              <> {startDate && formatDate(startDate, customDateFormat)}</>
            )}
          </BaseText>
        </Row>
      )}
      <Toast config={toastConfig} topOffset={60} />
    </BottomModal>
  );
};

export default CalendarModal;

// import { Dimensions, FlatListProps, Platform, View } from 'react-native';
// import { ReactNode, useState, useMemo } from 'react';
// import BottomModal, { BottomModalProps } from './bottom-modal';
// import { BaseText } from '../base';
// import { Calendar, CalendarTheme, toDateId } from '@marceloterreiro/flash-calendar';
// import { formatDate, hp, wp } from '@/assets/utils/js';
// import colors from '@/theme/colors';
// import moment from 'moment';
// import Row from '../row';
// import CircledIcon from '../circled-icon';
// import { Calendar2 } from 'iconsax-react-native/src';
// import { DateChangedCallback } from 'react-native-calendar-picker';
// import { ChevronUp } from '../icons';
// import Toast from 'react-native-toast-message';
// import { toastConfig } from '../others/toast-notification';
// import dayjs from 'dayjs';
// import { BottomSheetFlashList } from '@gorhom/bottom-sheet';
// import { FlashList } from '@shopify/flash-list';

// export interface CalendarModalProps extends Partial<BottomModalProps> {
//   closeModal: () => void;
//   singleSelectMode?: boolean;
//   onDateChange: DateChangedCallback;
//   startDate?: Date;
//   endDate?: Date;
//   onPressProceed?: VoidFunction;
//   maxDate?: Date;
//   minDate?: Date;
//   initialDate?: Date;
// }

// const CalendarModal = ({
//   closeModal,
//   onDateChange,
//   onPressProceed,
//   startDate,
//   endDate,
//   singleSelectMode = false,
//   maxDate,
//   minDate,
//   initialDate,
//   ...props
// }: CalendarModalProps) => {
//   const isToday = moment().format('YYYY-MM-DD') === moment(startDate).format('YYYY-MM-DD');
//   const isRange = Boolean(startDate) && Boolean(endDate);

//   // Convert dates to flash-calendar format
//   const selectedDates = useMemo(() => {
//     const dates: Record<string, any> = {};

//     if (startDate) {
//       const startDateId = toDateId(startDate);
//       dates[startDateId] = true;

//       // If range mode and we have both dates, fill the range
//       if (!singleSelectMode && endDate) {
//         const endDateId = toDateId(endDate);
//         const current = new Date(startDate);
//         const end = new Date(endDate);

//         while (current <= end) {
//           const dateId = toDateId(current);
//           dates[dateId] = true;
//           current.setDate(current.getDate() + 1);
//         }
//       }
//     }

//     return dates;
//   }, [startDate, endDate, singleSelectMode]);

//   // Handle date selection with flash-calendar format
//   const handleDateSelect = (dateId: string) => {
//     const selectedDate = new Date(dateId);

//     if (singleSelectMode) {
//       // Single date selection
//       onDateChange(selectedDate, 'START_DATE');
//     } else {
//       // Range selection logic
//       if (!startDate || (startDate && endDate)) {
//         // Start new selection
//         onDateChange(selectedDate, 'START_DATE');
//       } else if (startDate && !endDate) {
//         // Complete the range
//         if (selectedDate >= startDate) {
//           onDateChange(selectedDate, 'END_DATE');
//         } else {
//           // If selected date is before start date, make it the new start
//           onDateChange(selectedDate, 'START_DATE');
//         }
//       }
//     }
//   };

//   // Custom theme for flash-calendar
//   const calendarTheme: CalendarTheme = {
//     rowMonth: {
//       content: {
//         textAlign: 'left' as const,
//         color: colors.black.main,
//         fontWeight: 'bold' as const,
//         fontSize: wp(20),
//         fontFamily: 'FHOscar-Bold',
//         // marginBottom: hp(20)
//       },
//     },
//     rowWeek: {
//       container: {
//         backgroundColor: colors.grey.bgOne,
//         borderRadius: 10,
//         marginTop: hp(20),
//         paddingVertical: hp(10),
//         paddingHorizontal: wp(5),
//       },
//     },
//     itemWeekName: {
//       content: {
//         color: colors.black.muted,
//         fontSize: wp(12),
//         fontFamily: 'Inter-Medium',
//       },
//     },
//     itemDay: {
//       idle: ({ isPressed, isWeekend }: any) => ({
//         container: {
//           backgroundColor: isPressed ? colors.primary.pastel : 'transparent',
//           borderRadius: 20,
//         },
//         content: {
//           color: colors.black.main,
//           fontFamily: 'Inter-Regular',
//         },
//       }),
//       today: ({ isPressed }: any) => ({
//         container: {
//           backgroundColor: isPressed ? colors.primary.main : colors.primary.pastel,
//           borderRadius: 20000,
//         },
//         content: {
//           color: isPressed ? colors.white : colors.primary.main,
//           fontFamily: 'Inter-SemiBold',
//         },
//       }),
//       active: ({ isPressed, isRangeStart, isRangeEnd }: any) => ({
//         container: {
//           backgroundColor: isRangeStart || isRangeEnd ? colors.primary.main : colors.primary.pastel,
//           borderRadius: 20,
//         },
//         content: {
//           color: isRangeStart || isRangeEnd ? colors.white : colors.primary.main,
//           fontFamily: 'Inter-SemiBold',
//         },
//       }),
//     },
//   };

//   // Convert min/max dates to flash-calendar format
//   const calendarMinDate = minDate ? toDateId(minDate) : undefined;
//   const calendarMaxDate = maxDate ? toDateId(maxDate) : undefined;
//   const calendarInitialDate = toDateId(initialDate ?? new Date());

//   return (
//     <BottomModal
//       enableDynamicSizing
//       enableSnapPoints={false}
//       buttons={[{ text: 'Select date', onPress: onPressProceed ?? closeModal }]}
//       closeModal={closeModal}
//       {...props}>
//       <View className="px-20 pb-20">
//         <Calendar
//           calendarActiveDateRanges={
//             singleSelectMode
//               ? undefined
//               : [
//                   {
//                     startId: startDate ? toDateId(startDate) : undefined,
//                     endId: endDate ? toDateId(endDate) : undefined,
//                   },
//                 ]
//           }
//           onCalendarDayPress={handleDateSelect}
//           calendarMinDateId={calendarMinDate}
//           calendarMaxDateId={calendarMaxDate}
//           theme={calendarTheme}
//           calendarMonthId={calendarInitialDate}
//           getCalendarWeekDayFormat={formatWeekDay}

//         />
//       </View>
//       {startDate && (
//         <Row className="px-20 justify-start pt-2 pb-8">
//           <CircledIcon iconBg="bg-grey-bgOne" className="p-6 mr-8">
//             <Calendar2 size={wp(15)} color={colors.black.muted} />
//           </CircledIcon>
//           <BaseText fontSize={12} classes="text-black-placeholder">
//             {!singleSelectMode ? (
//               <>
//                 {startDate && formatDate(startDate)} - {endDate ? `${formatDate(endDate)}` : 'Till Deleted'}
//               </>
//             ) : (
//               <> {startDate && formatDate(startDate)}</>
//             )}
//           </BaseText>
//         </Row>
//       )}
//       <Toast config={toastConfig} topOffset={60} />
//     </BottomModal>
//   );
// };

// export default CalendarModal;

// const formatWeekDay = (date: Date) =>
//   dayjs(date).format("ddd");

// const SafeFlashList = Platform.select({
//   android: BottomSheetFlashList,
//   ios: FlashList,
// });
