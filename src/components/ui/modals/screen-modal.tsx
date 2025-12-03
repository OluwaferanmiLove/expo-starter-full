import React, { ReactNode } from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import Modal, { ModalProps } from 'react-native-modal';
import { ButtonProps } from '../buttons/button';

export interface SceenModalProps extends Partial<ModalProps> {
  modalStyle?: ViewStyle;
  show: boolean;
  toggleModal: () => void;
  children?: ReactNode;
}

const ScreenModal = ({ modalStyle, show, toggleModal, children, ...rest }: SceenModalProps) => {
  return (
    <Modal
      avoidKeyboard={true}
      isVisible={show}
      backdropOpacity={0.8}
      backdropColor={'#000'}
      useNativeDriverForBackdrop={true}
      style={[{ flex: 1, justifyContent: 'center', margin: 0 ,padding:10 }, modalStyle]}
      {...rest}>
      <View>{children}</View>
    </Modal>
  );
};

export default ScreenModal;
