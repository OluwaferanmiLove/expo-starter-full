import { ReactNode } from 'react';
import { View } from 'react-native';
import { actionIsAllowed, Permission } from 'src/assets/utils/js/permissions';
import useAuthContext from 'src/contexts/auth/auth-context';
import BaseText from '../base/base-text';
import CircledIcon from '../circled-icon';
import { Danger, Warning2 } from 'iconsax-react-native/src';
import colors from 'src/theme/colors';
import { wp } from 'src/assets/utils/js';
import EmptyState from '../empty-states/empty-state';
import { useNavigation } from '@react-navigation/native';

type FunctionChild = (cond: boolean) => ReactNode;

interface Props {
  children?: ReactNode | FunctionChild;
  data: {
    permission?: Permission;
    planPermission?: Permission;
    countryPermission?: Permission;
  };
  controlRender?: boolean;
  fallback?: ReactNode;
}

const Can: React.FC<Props> = ({ children, data, controlRender = true, fallback }) => {
  const { userRole, store, user } = useAuthContext();
  const navigation = useNavigation();
  const permission = data?.permission;
  const planPermission = data?.planPermission;
  const countryPermission = data?.countryPermission;
  const storePlan = store?.subscription?.plan?.type;
  const isAllowed = actionIsAllowed({
    userRole,
    permission,
    planPermission,
    plan: storePlan,
    countryPermission,
    country: store?.country?.code,
  }); //returning

  const DefaultFallback = () => (
    <EmptyState
      classes="py-20 px-20"
      showBtn
      title="Unlock International Payments!"
      icon={<Warning2 variant={'Bold'} color={colors.accentRed.main} size={wp(40)} />}
      btnText="Upgrade to Business+ plan"
      text={`You'll need to be on the Business+ plan to use this feature.`}
      onPressBtn={() => navigation.navigate('ManageSubscription')}
    />
  );

  if (typeof children === 'function') return children(isAllowed);
  if (isAllowed) return children;

  return <>{!controlRender ? <>{children}</> : fallback ? fallback : null}</>;
};

export default Can;
