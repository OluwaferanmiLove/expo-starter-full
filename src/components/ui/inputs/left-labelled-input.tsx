import { View } from 'react-native';
import Input, { InputProps } from './input';
import { useState } from 'react';
import Row from '../row';
import { BaseText } from '..';

interface LeftLabelledInputProps extends Partial<InputProps> {
  leftText: string;
}

const LeftLabelledInput = ({ leftText, ...rest }: LeftLabelledInputProps) => {
  const [accessoryWidth, setAccessoryWidth] = useState(50);

  const LeftAccessory = () => (
    <Row className="justify-start" onLayout={e => setAccessoryWidth(e.nativeEvent.layout.width)}>
      <BaseText fontSize={13} weight={'semiBold'} classes="text-black-placeholder">
        {leftText}
      </BaseText>
      <View className="w-2 h-16 bg-grey-border ml-6" />
    </Row>
  );

  return <Input leftPadding={accessoryWidth+15} leftAccessory={<LeftAccessory />} {...rest} />;
};

export default LeftLabelledInput;
