import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFooter,
  BottomSheetFooterProps,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
  SNAP_POINT_TYPE,
} from '@gorhom/bottom-sheet';
import cx from 'classnames';
import React, {
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  forwardRef,
  ForwardRefRenderFunction,
  ForwardedRef,
  useEffect,
} from 'react';
import { BackHandler, Platform, StyleSheet, ViewProps, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { BaseText } from '../base';
import { ButtonProps } from '../buttons/button';
import FixedBtnFooter from '../buttons/fixed-btn-footer';
import { toastConfig } from '../others/toast-notification';
import Row from '../row';

import { heightPercentageToDP, wp } from '@/assets/utils/js';
import colors from '@/theme/colors';
import { FullWindowOverlay } from 'react-native-screens';
import useKeyboard from 'src/hooks/use-keyboard';
import { useBottomSheetBackHandler } from 'src/hooks/use-bottom-back';
import { BackdropPressBehavior } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

export interface BottomModalProps {
  headerAddon?: ReactNode;
  children?: ReactNode;
  footerElement?: ReactNode;
  closeModal: () => void;
  showButton?: boolean;
  isList?: boolean;
  buttons?: ButtonProps[];
  title?: string;
  modalStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  innerStyle?: ViewStyle;
  contentContainerClass?: ViewProps['className'];
  childrenWrapperStyle?: ViewStyle;
  wrapChildren?: boolean;
  isVisible?: boolean;
  // Keeping original Modal props that might be needed
  avoidKeyboard?: boolean;
  onBackButtonPress?: () => void;
  onModalShow?: () => void;
  onModalHide?: () => void;
  size?: keyof typeof modalSizes;
  enableDynamicSizing?: boolean;
  useScrollView?: boolean;
  useChildrenAsDirectChild?: boolean;
  enableSnapPoints?: boolean;
  showFooterOnKeyboard?: boolean;
  footerAddon?: ReactNode;
  className?: string;
  customSnapPoints?: number[];
  snapPointIndex?: number;
  enablePanDownToClose?: boolean;
  enableBlurKeyboardOnGesture?: boolean;
  backDropPressBehavior?: BackdropPressBehavior;
  enablePanningGesture?: boolean;
  enableBackdropToast?: boolean;
}

export interface BottomModalMethods {
  present: () => void;
  expand: () => void;
  close: () => void;
  snapToIndex: (index: number) => void;
}

const BottomModalComponent: ForwardRefRenderFunction<BottomModalMethods, BottomModalProps> = (props, ref) => {
  const {
    headerAddon,
    children,
    footerElement,
    title,
    showButton = true,
    isList,
    buttons,
    modalStyle,
    containerStyle,
    innerStyle,
    closeModal = () => {},
    contentContainerClass,
    childrenWrapperStyle,
    wrapChildren,
    isVisible = false,
    // Original Modal props
    avoidKeyboard = true,
    onModalHide,
    onModalShow,
    size = 'md',
    enableDynamicSizing = false,
    enableSnapPoints = true,
    useScrollView = true,
    useChildrenAsDirectChild = false,
    footerAddon,
    showFooterOnKeyboard = false,
    customSnapPoints,
    className,
    snapPointIndex,
    enablePanDownToClose = true,
    enableBlurKeyboardOnGesture = true,
    backDropPressBehavior = 'close',
    enablePanningGesture = true,
    enableBackdropToast = false,
  } = props;
  const isKeyboardActive = useKeyboard();
  const insets = useSafeAreaInsets();

  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const { handleSheetPositionChange } = useBottomSheetBackHandler(bottomSheetRef);

  // Expose methods via ref
  React.useImperativeHandle(ref, () => ({
    present: () => {
      bottomSheetRef.current?.present();
    },
    expand: () => {
      bottomSheetRef.current?.expand();
    },
    close: () => {
      bottomSheetRef.current?.close();
    },
    snapToIndex: (index: number) => {
      bottomSheetRef.current?.snapToIndex(index);
    },
  }));

  // callbacks
  const handleSheetChange = useCallback(
    (index: number, position: number, type: SNAP_POINT_TYPE) => {
      handleSheetPositionChange(index, position, type);
      if (index === -1) {
        onModalHide?.();
      } else if (index === 0) {
        onModalShow?.();
      }
    },
    [onModalHide, onModalShow],
  );

  const handleDismiss = useCallback(() => {
    closeModal();
    onModalHide?.();
  }, [closeModal, onModalHide]);

  // Effects for controlling visibility
  React.useEffect(() => {
    if (isVisible && bottomSheetRef.current) {
      bottomSheetRef.current.present();
    } else if (!isVisible && bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  }, [isVisible]);

  // Render backdrop
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <>
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
          pressBehavior={backDropPressBehavior}
        />
        {enableBackdropToast && <Toast config={toastConfig} topOffset={60} />}
      </>
    ),
    [enableBackdropToast],
  );

  // Footer component
  const renderFooter = useCallback(
    (props: BottomSheetFooterProps) => {
      if (!showButton && !footerElement) return null;

      return (
        <BottomSheetFooter {...props}>
          {footerAddon}
          {footerElement || (buttons && <FixedBtnFooter buttons={buttons} />)}
        </BottomSheetFooter>
      );
    },
    [showButton, footerElement, buttons, insets.bottom, footerAddon],
  );

  // Header component
  const renderHeader = useMemo(
    () => (
      <>
        {(title || headerAddon) && (
          <Row
            className={cx('justify-between px-20', {
              'pb-20': Boolean(title),
              'pb-10': Boolean(title || headerAddon),
            })}>
            {title && (
              <BaseText fontSize={15} type="heading">
                {title}
              </BaseText>
            )}
            {headerAddon && headerAddon}
          </Row>
        )}
      </>
    ),
    [title, headerAddon],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      onChange={handleSheetChange}
      enableContentPanningGesture={enablePanningGesture}
      enablePanDownToClose={enablePanDownToClose}
      stackBehavior="push"
      maxDynamicContentSize={heightPercentageToDP(90)}
      backdropComponent={renderBackdrop}
      footerComponent={(!isKeyboardActive || showFooterOnKeyboard) && renderFooter}
      handleIndicatorStyle={styles.indicator}
      style={[modalStyle]}
      backgroundStyle={{ borderTopLeftRadius: wp(20), borderTopRightRadius: wp(20) }}
      topInset={Platform.select({ ios: insets.top, android: insets.top + 15 })}
      keyboardBehavior={Platform.OS === 'android' ? 'fillParent' : 'interactive'}
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      enableBlurKeyboardOnGesture={enableBlurKeyboardOnGesture}
      snapPoints={
        enableSnapPoints &&
        !enableDynamicSizing &&
        (customSnapPoints ?? modalSizes[size]).map(s => heightPercentageToDP(s))
      }
      enableDynamicSizing={enableDynamicSizing}
      // onChange={handleSheetChange}
      index={snapPointIndex}
      onDismiss={handleDismiss}>
      {renderHeader}
      {useScrollView && !useChildrenAsDirectChild && (
        <BottomSheetScrollView
          className={cx(className)}
          style={[innerStyle, childrenWrapperStyle, { paddingBottom: insets.bottom + 12 }]}
          keyboardShouldPersistTaps={'handled'}
          enableFooterMarginAdjustment={isKeyboardActive ? false : true}>
          {children}
        </BottomSheetScrollView>
      )}
      {!useScrollView && !useChildrenAsDirectChild && (
        <BottomSheetView
          style={[innerStyle, childrenWrapperStyle, { paddingBottom: insets.bottom + 12 }]}
          enableFooterMarginAdjustment={isKeyboardActive ? false : true}>
          {children}
        </BottomSheetView>
      )}
      {useChildrenAsDirectChild && children}
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: colors.grey.muted,
    width: 50,
    height: 5,
  },
});

const BottomModal = forwardRef(BottomModalComponent);

export default BottomModal;

export const modalSizes = {
  sm: [30, 50],
  midi: [40, 60],
  md: [50, 70],
  lg: [80, 90],
};
