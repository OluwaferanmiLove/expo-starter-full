import { View } from 'react-native';
import { ReactNode } from 'react';
import BottomModal, { BottomModalProps } from './bottom-modal';
import { BaseText } from '../base';
import CircledIcon from '../circled-icon';
import { CloseCircle, TickCircle } from 'iconsax-react-native/src';
import { cx, wp } from '@/assets/utils/js';
import colors from '@/theme/colors';

interface InfoModalProps extends Partial<BottomModalProps> {
  closeModal: () => void;
  modalImage?: ReactNode;
  children?: ReactNode;
  title?: string;
  description?: string;
  infoModalVariant?: InfoModalVariantType;
  containerClassName?: string;
}

export enum InfoModalVariantType {
  'SUCCESS',
  'DANGER',
  // 'CUSTOM',
}

const InfoModal = ({
  modalImage,
  infoModalVariant = InfoModalVariantType.SUCCESS,
  title,
  description,
  children,
  closeModal,
  containerClassName,
  ...props
}: InfoModalProps) => {
  const icon = {
    [InfoModalVariantType.SUCCESS]: (
      <CircledIcon className="self-center bg-accentGreen-pastel p-8">
        <CircledIcon className="bg-accentGreen-main p-14">
          <TickCircle variant={'Bold'} size={wp(38)} color={colors.white} />
        </CircledIcon>
      </CircledIcon>
    ),
    [InfoModalVariantType.DANGER]: (
      <CircledIcon className="self-center bg-accentRed-pastel p-15">
        <CircledIcon className="bg-accentRed-main p-25">
          <CloseCircle variant={'Bold'} size={wp(38)} color={colors.white} />
        </CircledIcon>
      </CircledIcon>
    ),
  };
  return (
    <BottomModal closeModal={closeModal} buttons={[{ text: 'Done', onPress: closeModal }]} {...props}>
      <View className={cx('items-center px-20 mt-20', containerClassName)}>
        {modalImage ? modalImage : icon[infoModalVariant]}
        {children ? (
          children
        ) : (
          <>
            {title && (
              <BaseText fontSize={22} type={'heading'} classes="text-center mt-10 mb-48">
                {title}
              </BaseText>
            )}
            {description && (
              <BaseText type={'body'} classes="text-center mt-10 mb-48">
                {description}
              </BaseText>
            )}
          </>
        )}
      </View>
    </BottomModal>
  );
};

export default InfoModal;
