import React from 'react';
import CircledIcon from '../circled-icon';
import { TickCircle } from 'iconsax-react-native/src';
import { wp } from 'src/assets/utils/js';
import colors from 'src/theme/colors';
import * as Animatable from 'react-native-animatable';

const SuccessCheckmark = ({variant = 'sm'}: {variant?: 'sm' | 'lg'}) => {

  const variantStyle = {
    ['sm']: {container: 'p-8', icon: 'p-20'},
    ['lg']: {container: 'p-15', icon: 'p-25'},
  }

  return (
    // <CircledIcon className="self-center bg-accentGreen-pastel p-8">
    //   <CircledIcon className="bg-accentGreen-main p-20">
    //     <TickCircle variant={'Bold'} size={wp(40)} color={colors.white} />
    //   </CircledIcon>
    // </CircledIcon>

    <Animatable.View className={`bg-accentGreen-pastel2 self-center ${variantStyle[variant].container} rounded-full`} animation={'zoomIn'} duration={300}>
      <Animatable.View animation={'zoomIn'} delay={75} duration={200}>
        <CircledIcon className={`bg-accentGreen-main ${variantStyle[variant].icon}`}>
          <Animatable.View animation={'zoomIn'} duration={300} delay={150}>
            <TickCircle variant="Bold" color={colors.white} size={wp(40)} />
          </Animatable.View>
        </CircledIcon>
      </Animatable.View>
    </Animatable.View>
  );
};

export default SuccessCheckmark;
