import { ReactNode, useMemo } from 'react';
import Row, { RowProps } from '../ui/row';
import classNames from 'classnames';

export interface CircledIconProps extends Partial<RowProps> {
  iconBg?: string;
  children?: ReactNode;
  classes?: string;
}

const CircledIcon = ({ iconBg, children, classes, ...rest }: CircledIconProps) => {
  return (
    <Row className={classNames(`p-10 rounded-full items-center justify-center bg-white`, iconBg, classes)} {...rest}>
      {children}
    </Row>
  );
};

export default CircledIcon;
