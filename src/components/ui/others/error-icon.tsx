import React from 'react';
import CircledIcon from '../circled-icon';
import { CloseCircle, TickCircle } from 'iconsax-react-native/src';
import { wp } from 'src/assets/utils/js';
import colors from 'src/theme/colors';

const ErrorIcon = () => {
  return (
    <CircledIcon className="self-center bg-accentRed-pastel p-8">
      <CircledIcon className="bg-accentRed-main p-20">
        <CloseCircle variant={'Bold'} size={wp(40)} color={colors.white} />
      </CircledIcon>
    </CircledIcon>
  );
};

export default ErrorIcon;
