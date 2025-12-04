import * as Animatable from 'react-native-animatable';
import Pressable from '../base/pressable';
import { wp } from '@/utils';
import { TickCircle } from 'iconsax-react-native';
import { colors } from '@/theme/colors';

interface RadioProps {
  active: boolean;
  onClick?: VoidFunction;
  className?: string;
}

const Radio = ({ active = false, onClick, className }: RadioProps) => {
  return (
    <Pressable onPress={onClick} disabled={!onClick}>
      {active ? (
        <Animatable.View className={className}>
          <TickCircle variant="Bold" size={wp(18)} color={colors.accentGreen.main} />
        </Animatable.View>
      ) : (
        <Animatable.View
          animation={'bounceIn'}
          duration={200}
          className={`border-grey-border bg-grey-bgOne h-20 w-20 rounded-full border-[3px] ${className}`}
        />
      )}
    </Pressable>
  );
};

export default Radio;
