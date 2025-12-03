import { View } from 'react-native';
import colors from '@/theme/colors';
import { wp } from '@/assets/utils/js';
import Input, { InputProps } from './input';
import Row from '../row';
import { BaseText } from '..';
import { ArrowRight } from '../icons';

interface RateInputProps extends Partial<InputProps> {
  from: string;
  to: string;
}

const RateInput = ({ from, to, ...rest }: RateInputProps) => {
  const LeftAccessory = () => (
    <Row className="justify-start bg-grey-bgOne py-15 pl-15 pr-8 mr-8 rounded-l-12">
      <BaseText fontSize={13} weight={'semiBold'} classes="text-black-muted">
        {from}
      </BaseText>
      <View className="mx-5">
        <ArrowRight size={wp(16)} currentColor={colors.black.muted} strokeWidth={1.5} />
      </View>
      <BaseText fontSize={13} weight={'semiBold'} classes="text-black-muted">
        {to}
      </BaseText>
    </Row>
  );

  return (
    <Input
      leftAccessory={<LeftAccessory />}
      placeholder={'Enter Rate'}
      keyboardType='decimal-pad'
      {...rest}
      containerClasses={`py-0 px-0 ${rest?.containerClasses}`}
    />
  );
};

export default RateInput;
