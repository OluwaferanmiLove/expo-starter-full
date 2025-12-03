import { ScrollView, View } from 'react-native';
import { BaseText } from '../base';
import * as Animatable from 'react-native-animatable';
import { CloseCircle, Danger, TickCircle } from 'iconsax-react-native/src';
import colors from '@/theme/colors';
import { wp } from '@/assets/utils/js';
import CircledIcon from '@/components/ui/circled-icon';
import FixedBtnFooter from '../buttons/fixed-btn-footer';
import * as Updates from 'expo-updates';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ButtonVariant } from '../buttons/button';
import Intercom from '@intercom/intercom-react-native';

const ErrorBoundary = () => {
  const reloadApp = async () => {
    await Updates.reloadAsync();
  };

  return (
    <SafeAreaProvider className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="flex-1 mx-20 items-center justify-center bg-white">
          <Animatable.View animation={'zoomIn'} delay={75} duration={200}>
            <CircledIcon className="p-20 bg-accentRed-whiteTransparent">
              <Animatable.View animation={'zoomIn'} duration={300} delay={150}>
                <Danger variant="Bold" color={colors.accentRed.main} size={wp(40)} />
              </Animatable.View>
            </CircledIcon>
          </Animatable.View>
          <BaseText fontSize={20} classes={`mt-16 text-center`} type="heading">
            Something went wrong
          </BaseText>
          <BaseText fontSize={15} lineHeight={23} classes={`text-black-placeholder mt-10 text-center`}>
            We are sorry an error occurred, please try{'\n'}reloading your app or contact support
          </BaseText>
        </View>
        <FixedBtnFooter
          buttons={[
            { text: 'Contact Support', variant: ButtonVariant.LIGHT, onPress: () => Intercom.present() },
            { text: 'Reload App', onPress: () => reloadApp() },
          ]}
        />
      </View>
    </SafeAreaProvider>
  );
};

export default ErrorBoundary;
