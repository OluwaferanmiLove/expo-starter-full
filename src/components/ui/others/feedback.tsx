import colors from '@/theme/colors';
import DashboardLayout from '@/components/ui/layouts/dashboard-layout';
import { HeaderVariants } from '@/components/ui/layouts/header';
import Container from '@/components/ui/container';
import { hp, wp } from '@/assets/utils/js';
import { useMemo, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { BaseText, CircledIcon } from '@/components/ui';
import { TickCircle } from 'iconsax-react-native/src';
import { RootStackParamList } from '@/@types/navigation';
import FixedBtnFooter, { FixedBtnFooterProps } from '@/components/ui/buttons/fixed-btn-footer';
import { View } from 'react-native';
import { ProductItemInterface } from 'catlog-shared';


interface FeedBackProps {
  feedbackText: string;
  btnText?: string;
  onPressBtn?: any;
  buttons: FixedBtnFooterProps['buttons'];
}

const FeedBack = (props: FeedBackProps) => {
  return (
    <View>
      <Container className={'flex-1 items-center justify-center'}>
        <CircledIcon className="bg-accentGreen-pastel p-15">
          <CircledIcon className="bg-accentGreen-main p-25">
            <TickCircle variant={'Bold'} size={wp(50)} color={colors.white} />
          </CircledIcon>
        </CircledIcon>
        <BaseText fontSize={22} type={'heading'} classes="text-center mt-10">
          {props?.feedbackText}
        </BaseText>
      </Container>
      <FixedBtnFooter buttons={props?.buttons} />
    </View>
  );
};

export default FeedBack;
