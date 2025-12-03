import { TextInput, TouchableOpacity } from 'react-native';
import colors from '@/theme/colors';
import { wp } from '@/assets/utils/js';
import Input, { InputProps } from './input';
import { Eye } from 'iconsax-react-native/src';
import { useState } from 'react';
import Pressable from '../base/pressable';

interface PasswordInputProps extends Partial<InputProps> {
  inputRef?: React.MutableRefObject<TextInput>;
}

const PasswordInput = ({ inputRef, ...rest }: PasswordInputProps) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const RightAccessory = () => (
    <Pressable hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} onPress={() => setSecureTextEntry(prev => !prev)}>
      <Eye size={wp(18)} color={colors.grey.muted} />
    </Pressable>
  );

  return (
    <Input
      ref={inputRef}
      secureTextEntry={secureTextEntry}
      label={'Password'}
      rightAccessory={<RightAccessory />}
      {...rest}
    />
  );
};

export default PasswordInput;
