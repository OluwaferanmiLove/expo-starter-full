import { ReactNode } from 'react';
import { ActivityIndicator, View } from 'react-native';
import useInteractionWait from 'src/hooks/use-interaction-wait';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';
import useStatusbar from '@/hooks/use-statusbar';

interface DashboardLayoutProps {
  children?: ReactNode;
  isLoading?: boolean;
  waitOnReady?: boolean;
  noInset?: boolean;
}

const DashboardLayout = ({ children, isLoading, waitOnReady = true, noInset }: DashboardLayoutProps) => {
  const {bottom, top} = useSafeAreaInsets();
  const { ready } = useInteractionWait();
  useStatusbar('light', colors.primary.main, true);
  
  if ((!ready || isLoading) && waitOnReady) {
    return (
      <View className="flex-1 bg-primary-main" style={noInset ? undefined : {paddingBottom: bottom, paddingTop: top}}>
        <View className="flex-1 items-center justify-center">
          {/* <CustomImage imageProps={{ source: require('@/assets/gif/loader.gif') }} className="w-40 h-40 rounded-8" /> */}
          <ActivityIndicator size={'small'} color={colors.primary.main} />
        </View>
      </View>
    );
  }
  return (
    <View className="flex-1 bg-primary-main" style={noInset ? undefined : {paddingBottom: bottom, paddingTop: top}}>
      {children}
    </View>
  );
};

export default DashboardLayout;
