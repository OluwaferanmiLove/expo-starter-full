import React from 'react';
import Modal, { ModalProps } from 'react-native-modal';

const BaseModal = (props: Partial<ModalProps>) => {
  return (
    <Modal useNativeDriver={false} backdropOpacity={0.5} {...props}>
      {props.children}
    </Modal>
  );
};

export default BaseModal;
