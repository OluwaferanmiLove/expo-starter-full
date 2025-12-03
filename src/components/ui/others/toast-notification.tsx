import { ReactNode } from 'react';
import { BaseText } from '../base';
import CircledIcon from '../circled-icon';
import Row, { RowProps } from '../row';
import { CloseCircle, InfoCircle, TickCircle } from 'iconsax-react-native/src';
import { wp } from '@/assets/utils/js';
import colors from '@/theme/colors';
import { ActivityIndicator, View } from 'react-native';
import Toast, { BaseToast, ToastConfig, ToastConfigParams } from 'react-native-toast-message';
import Pressable from '../base/pressable';

interface ToastNotificationProps {
  icon?: ReactNode;
  type?: 'success' | 'error';
  message: string;
  subMessage?: string;
  backgroundColor?: string;
}

const ToastNotification = ({
  backgroundColor = colors.accentGreen.pastel2,
  type = 'success',
  message,
  icon,
  ...props
}: ToastNotificationProps) => {
  return (
    <Row
      className="p-10 rounded-8 mx-15 z-[9999]"
      style={{
        backgroundColor,
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: -4,
      }}>
      {icon && icon}
      {type === 'success' && !icon && <TickCircle size={wp(22)} color={colors.accentGreen.main} variant={'Bold'} />}
      {type === 'error' && !icon && <InfoCircle size={wp(22)} color={colors.accentRed.main} variant={'Bold'} />}
      <View className="flex-1">
        <BaseText fontSize={12} classes="text-black-main mx-8" weight={'medium'}>
          {message}
        </BaseText>
      </View>
      <Pressable onPress={() => Toast.hide()}>
        <CloseCircle size={wp(22)} color={colors.black.main} variant={'Bold'} />
      </Pressable>
    </Row>
  );
};

const LoadingToastNotification = ({
  backgroundColor = colors.accentGreen.pastel2,
  type = 'success',
  message,
  subMessage,
  icon,
  ...props
}: ToastNotificationProps) => {
  return (
    <Row
      className="px-10 bg-black-main rounded-8 mx-15 z-[9999]"
      style={{
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: -4,
      }}>
      <ActivityIndicator size={'small'} color={colors.grey.mutedLight} />
      <View className="flex-1 py-10 pl-10 border-l border-l-grey-border ml-10">
        <BaseText fontSize={12} classes="text-grey-mutedLight" weight={'medium'}>
          {message}
        </BaseText>
        <BaseText fontSize={10} classes="text-grey-mutedLight mt-2" weight={'medium'}>
          {subMessage ?? 'Please wait...'}
        </BaseText>
      </View>
      <Pressable onPress={() => Toast.hide()}>
        <CloseCircle size={wp(22)} color={colors.black.main} variant={'Bold'} />
      </Pressable>
    </Row>
  );
};

export const toastConfig: ToastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  activity: props => <LoadingToastNotification message={props.text1!} subMessage={props.text2!} />,
  success: props => <ToastNotification message={props.text1!} backgroundColor={colors.notifications.success} />,
  error: props => (
    <ToastNotification message={props.text1!} type={'error'} backgroundColor={colors.notifications.error} />
  ),
};

export default ToastNotification;
