import { ReactNode, useMemo } from 'react';
import Row, { RowProps } from '../row';
import { styled } from 'nativewind';
import classNames from 'classnames';
import Button, { ButtonSize } from '../buttons/button';
import { View } from 'react-native';
import CircledIcon from '../circled-icon';
import { Danger } from 'node_modules/iconsax-react-native/src';
import { BaseText } from '../base';
import colors from 'src/theme/colors';
import { wp } from 'src/assets/utils/js';
import { useNavigation } from '@react-navigation/native';

export interface SubscriptionPermissionFallbackProps extends Partial<RowProps> {
  iconBg?: string;
  children?: ReactNode;
  classes?: string;
  actionName?: string;
}

const SubscriptionPermissionFallback = ({
  iconBg,
  children,
  classes,
  actionName,
}: SubscriptionPermissionFallbackProps) => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 px-20">
      <View className="items-center justify-center py-30">
        <CircledIcon className="bg-accentRed-whiteTransparent p-12 self-center mb-10">
          <Danger variant={'Bold'} color={colors.accentRed.main} size={wp(36)} />
        </CircledIcon>
        <BaseText type={'heading'} fontSize={16} classes="text-center mb-5">
          Upgrade required
        </BaseText>
        <View style={{ width: '80%' }}>
          <BaseText fontSize={13} classes="text-black-placeholder text-center">
            Upgrade to the business plus plan to {actionName}
          </BaseText>
        </View>
        <Row className="space-x-10 w-full">
          <View className="flex-1">
            <Button
              text={'Upgrade'}
              onPress={() => navigation.navigate('ManageSubscription')}
              size={ButtonSize.MEDIUM}
              btnStyle="mt-15 px-20 w-1/2"
            />
          </View>
        </Row>
      </View>
    </View>
  );
};

export default SubscriptionPermissionFallback;
