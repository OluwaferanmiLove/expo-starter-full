import React from 'react';
import { View, Linking, Platform } from 'react-native';
import { ArrowUp } from 'iconsax-react-native';
import * as Animatable from 'react-native-animatable';

import BottomModal, { BottomModalProps } from '../modals/bottom-modal';
import { BaseText, CircledIcon } from '../index';
import { ButtonVariant } from '../buttons/button';
import { colors } from '@/theme/colors';
import { wp } from '@/utils';

interface UpdateAppModalProps extends Partial<BottomModalProps> {
  closeModal: () => void;
  onUpdatePress?: () => void;
  updateUrl?: string;
  version?: string;
  isForced?: boolean;
}

const UpdateAppModal = ({
  closeModal,
  onUpdatePress,
  updateUrl,
  version,
  isForced = false,
  ...props
}: UpdateAppModalProps) => {
  const handleUpdatePress = async () => {
    if (onUpdatePress) {
      onUpdatePress();
    } else if (updateUrl) {
      try {
        await Linking.openURL(updateUrl);
      } catch (error) {
        console.error('Failed to open update URL:', error);
      }
    } else {
      // Default to app store/play store
      const storeUrl = Platform.select({
        ios: 'https://apps.apple.com/ng/app/catlog-create-online-store/id6741193741', // Replace with actual App Store URL
        android: 'https://play.google.com/store/apps/details?id=shop.catlog.app', // Replace with actual Play Store URL
      });

      if (storeUrl) {
        try {
          await Linking.openURL(storeUrl);
        } catch (error) {
          console.error('Failed to open store URL:', error);
        }
      }
    }
  };

  const buttons = [
    ...(!isForced
      ? [
          {
            text: 'Later',
            variant: ButtonVariant.LIGHT,
            onPress: closeModal,
          },
        ]
      : []),
    {
      text: 'Update Now',
      onPress: handleUpdatePress,
    },
  ];

  return (
    <BottomModal {...props} closeModal={isForced ? () => {} : closeModal} enableDynamicSizing buttons={buttons}>
      <View className="px-20 pt-10 pb-40">
        <Animatable.View
          className="bg-primary-pastel self-center rounded-full p-20 mb-20"
          animation="zoomIn"
          duration={300}>
          <Animatable.View animation="zoomIn" delay={75} duration={200}>
            <CircledIcon className="bg-primary-main">
              <Animatable.View animation="pulse" duration={1000} iterationCount="infinite" delay={150}>
                <ArrowUp variant="Bold" color={colors.white} size={wp(24)} />
              </Animatable.View>
            </CircledIcon>
          </Animatable.View>
        </Animatable.View>

        <View className="mb-15">
          <BaseText fontSize={20} type="heading" classes="text-center text-primary-main">
            Update Required
          </BaseText>
        </View>

        <View className="mb-20">
          <BaseText fontSize={14} classes="text-black-muted text-center leading-6">
            A new version of Catlog is available with improvements and bug fixes. Update now to get the latest features.
          </BaseText>
        </View>
      </View>
    </BottomModal>
  );
};

export default UpdateAppModal;
