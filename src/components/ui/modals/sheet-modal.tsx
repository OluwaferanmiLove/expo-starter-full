import { Dimensions, Modal, ModalProps, Platform, View } from 'react-native';
import { FormikProps, useFormik } from 'formik';
import { BottomModalProps } from '@/components/ui/modals/bottom-modal';
import Toast from 'react-native-toast-message';
import React, { ReactNode, useEffect } from 'react';
import { VariantForm } from 'catlog-shared';
import useStatusbar from 'src/hooks/use-statusbar';
import { toastConfig } from 'src/components/ui/others/toast-notification';
import { CloseCircle } from 'node_modules/iconsax-react-native/src';
import { cx } from 'src/assets/utils/js';
import { BaseText, Row } from 'src/components/ui';
import Pressable from 'src/components/ui/base/pressable';
import colors from 'src/theme/colors';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export interface SheetModalProps extends Partial<ModalProps> {
  closeModal: VoidFunction;
  title?: string;
  children?: ReactNode;
}

const screenHeight = Dimensions.get('screen').height;

const { width } = Dimensions.get('window');
const cardWidth = (width - 40 - 20) / 2;

const SheetModal = ({ closeModal, title, children, ...props }: SheetModalProps) => {
  const { setStatusBar } = useStatusbar();

  setStatusBar(props.visible ? 'light' : 'dark', 'white', true);

  return (
    <Modal
      animationType="slide"
      presentationStyle={Platform.OS === 'android' ? 'overFullScreen' : 'pageSheet'}
      onRequestClose={closeModal}
      // style={{ margin: 0, flex: 1 }}
      {...props}>
      <Row className={cx('justify-between px-20 pt-15 pb-8 border-b border-b-grey-border')}>
        <View className="flex-1">
          <BaseText fontSize={15} type="heading" numberOfLines={2}>
            {title}
          </BaseText>
        </View>
        <Pressable className="self-end" onPress={closeModal}>
          <Row className="rounded-full p-6 pr-12 bg-white border border-grey-border">
            <CloseCircle variant="Bold" size={18} color={colors.black.main} />
            <BaseText className="ml-4">Close</BaseText>
          </Row>
        </Pressable>
      </Row>
      {/* <View className="self-center w-50 h-5 rounded-full bg-grey-mutedLight mt-10" /> */}
      {children}
      <Toast config={toastConfig} topOffset={20} />
    </Modal>
  );
};

export default SheetModal;
