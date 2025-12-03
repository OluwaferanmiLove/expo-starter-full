import { ReactNode } from 'react';
import { BaseText } from '../base';
import CircledIcon from '../circled-icon';
import Row, { RowProps } from '../row';

interface InfoRowProps extends Partial<RowProps> {
  icon?: ReactNode;
  title: ReactNode;
  titleClasses?: string;
  value?: ReactNode;
  iconElement?: ReactNode;
  valueElement?: ReactNode;
  iconBg?: 'white' | 'grey';
  titleWeight?: 'bold' | 'light' | 'regular' | 'medium' | 'semiBold' | 'bold' | 'black';
}

const InfoRow = ({
  icon,
  title,
  titleClasses,
  value,
  iconElement,
  valueElement,
  iconBg = 'grey',
  titleWeight = 'regular',
  ...props
}: InfoRowProps) => {
  return (
    <Row className="pb-15" {...props}>
      {iconElement ? (
        iconElement
      ) : (
        <CircledIcon iconBg={iconBg === 'grey' ? 'bg-grey-bgOne' : 'bg-white'} className="p-6">
          {icon}
        </CircledIcon>
      )}
      {/* <View className={`flex-1 mx-8 flex justify-center ${titleClasses}`}> */}
      <BaseText
        numberOfLines={1}
        fontSize={12}
        classes={`flex-1 text-black-main mx-8 ${titleClasses}`}
        weight={titleWeight}>
        {title}
      </BaseText>
      {valueElement ? (
        valueElement
      ) : (
        <BaseText fontSize={12.5} classes="text-black-secondary" weight="medium">
          {value}
        </BaseText>
      )}
    </Row>
  );
};


export default InfoRow;
