import { BaseText, Row } from '@/components/ui';
import { CloseCircle } from 'iconsax-react-native/src';
import React, { ReactNode, useCallback } from 'react';
import { ActivityIndicator, View, ViewProps } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Modal, { ModalProps } from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { cx } from 'src/assets/utils/js';
import Pressable from 'src/components/ui/base/pressable';
import { ButtonProps } from 'src/components/ui/buttons/button';
import FixedBtnFooter from 'src/components/ui/buttons/fixed-btn-footer';
import { toastConfig } from 'src/components/ui/others/toast-notification';
import useInteractionWait from 'src/hooks/use-interaction-wait';
import colors from 'src/theme/colors';

export interface FullScreenModalProps extends Partial<ModalProps> {
  isVisible?: boolean;
  closeModal: VoidFunction;
  title?: string;
  children?: ReactNode;
  showCloseButton?: boolean;
  showToast?: boolean;
  headerClassName?: string;
  waitForInteraction?: boolean;
  loadingColor?: string;
  buttons?: ButtonProps[];
}

const FullScreenModal = ({
  isVisible = false,
  closeModal,
  title,
  children,
  showCloseButton = true,
  showToast = true,
  headerClassName,
  waitForInteraction = true,
  loadingColor,
  buttons,
  ...props
}: FullScreenModalProps) => {
  const { ready } = useInteractionWait();
  const { bottom, top } = useSafeAreaInsets();

  const main = (
    <>
      <GestureHandlerRootView className="bg-white relative" style={{ flex: 1 }}>
        <Row className={cx('justify-between px-20 pt-20 pb-10 border-b border-b-grey-border', headerClassName)}>
          <BaseText fontSize={15} type="heading">
            {title}
          </BaseText>
          {showCloseButton && (
            <Pressable onPress={closeModal}>
              <Row className="rounded-full p-6 pr-12 border border-grey-border">
                <CloseCircle variant="Bold" size={18} color={colors.black.main} />
                <BaseText classes="ml-4">Close</BaseText>
              </Row>
            </Pressable>
          )}
        </Row>
        <View className="flex-1 bg-white relative">{children}</View>
        {buttons && (
          <View className="absolute bottom-0 left-0 w-full">
            <FixedBtnFooter buttons={buttons} />
          </View>
        )}
      </GestureHandlerRootView>
      {showToast && <Toast config={toastConfig} topOffset={20} />}
    </>
  );

  return (
    <Modal
      style={{
        margin: 0,
        paddingTop: top,
        // paddingBottom: bottom
      }}
      hardwareAccelerated={true}
      isVisible={isVisible}
      onDismiss={closeModal}
      {...props}>
        {/* {main} */}
      {waitForInteraction && !ready ? (
        <View className="flex items-center justify-center flex-1">
          <ActivityIndicator size={'small'} color={loadingColor || colors.white} />
        </View>
      ) : (
        main
      )}
    </Modal>
  );
};

export default FullScreenModal;
