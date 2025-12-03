import { View, ViewProps } from 'react-native';
import BaseText from '@/components/ui/base/base-text';
import cx from 'classnames';

interface StatusPillProps extends Partial<ViewProps> {
  title: string;
  statusType?: StatusType;
  whiteBg?: boolean;
  greyBg?: boolean;
  fontSize?: number;
}

export enum StatusType {
  'SUCCESS' = 'Success',
  'SUCCESS_INVERTED' = 'Success_inverted',
  'DANGER' = 'Danger',
  'WARN' = 'Warn',
  'PROCESSING' = 'Processing',
  'DEFAULT' = 'Default',
  'PRIMARY' = 'Primary',
}

const StatusPill = ({
  title,
  fontSize = 10,
  statusType = StatusType.SUCCESS,
  whiteBg = false,
  greyBg = false,
  className,
  ...props
}: StatusPillProps) => {
  const textColor = {
    [StatusType.DANGER]: 'text-accentRed-main',
    [StatusType.WARN]: 'text-accentYellow-main',
    [StatusType.PROCESSING]: 'text-accentOrange-main',
    [StatusType.SUCCESS]: 'text-accentGreen-main',
    [StatusType.SUCCESS_INVERTED]: 'text-white',
    [StatusType.DEFAULT]: 'text-black-muted',
    [StatusType.PRIMARY]: 'text-primary-main',
  };

  const bgColor = {
    [StatusType.DANGER]: 'bg-accentRed-whiteTransparent',
    [StatusType.WARN]: 'bg-accentYellow-whiteTransparent',
    [StatusType.PROCESSING]: 'bg-accentOrange-whiteTransparent',
    [StatusType.SUCCESS]: 'bg-accentGreen-whiteTransparent',
    [StatusType.SUCCESS_INVERTED]: 'bg-accentGreen-main',
    [StatusType.DEFAULT]: 'bg-white',
    [StatusType.PRIMARY]: 'bg-white',
  };

  return (
    <View
      className={cx(
        'flex flex-row py-5 px-10 items-center justify-center rounded-40',
        whiteBg ? 'bg-white' : greyBg ? 'bg-grey-bgOne' : bgColor[statusType],
        {
          hidden: !title || title === '',
        },
        className,
      )}
      {...props}>
      <BaseText fontSize={fontSize} weight={'medium'} classes={`${textColor[statusType]}`}>
        {title}
      </BaseText>
    </View>
  );
};

export default StatusPill;
