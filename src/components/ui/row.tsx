import { ReactNode } from 'react';
import { View, ViewProps } from 'react-native';
import cx from 'classnames';

export interface RowProps extends Partial<ViewProps> {
  children?: ReactNode;
  classes?: string;
  spread?: boolean;
  disableSpread?: boolean;
  alignCenter?: boolean;
}

const Row = ({ children, classes, disableSpread = false, spread = true, alignCenter = true, ...props }: RowProps) => {
  return (
    <View
      className={cx(
        'flex flex-row',
        {
          'justify-between': spread && !disableSpread,
          'items-center': alignCenter,
        },
        classes,
      )}
      {...props}>
      {children}
    </View>
  );
};

export default Row;
