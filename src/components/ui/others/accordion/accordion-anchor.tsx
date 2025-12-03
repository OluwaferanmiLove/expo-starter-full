import { cx, wp } from '@/assets/utils/js';
import { BaseText, CircledIcon, Row } from '@/components/ui';
import Radio from '@/components/ui/buttons/radio';
import { ChevronDown, ChevronUp } from '@/components/ui/icons';
import StatusPill, { StatusType } from '@/components/ui/others/status-pill';
import colors from '@/theme/colors';
import { InfoCircle } from 'iconsax-react-native/src';
import { ReactNode } from 'react';
import { BaseTextProps } from '../../base/base-text';

const AccordionAnchor = ({
  title,
  iconElement,
  isSaved,
  isError,
  isOptional,
  isOpened,
  showChevronIcon = true,
  useWhiteBgForAnchor = false,
  titleProps,
}: {
  title: string;
  iconElement?: ReactNode;
  isSaved?: boolean;
  isError?: boolean;
  isOpened?: boolean;
  isOptional?: boolean;
  showChevronIcon?: boolean;
  useWhiteBgForAnchor?: boolean;
  titleProps?: BaseTextProps;
}) => {
  return (
    <Row className="flex flex-row py-0">
      <Row className="items-center" style={{ gap: 5 }}>
        {iconElement}
        <BaseText type="heading" fontSize={15} {...titleProps}>
          {title}
        </BaseText>
        {isSaved && <Radio active />}
        {isError && <InfoCircle size={wp(18)} color={colors.accentRed.main} variant={'Bold'} />}
        {isOptional && <StatusPill statusType={StatusType.DEFAULT} className="bg-grey-bgOne" title="Optional" />}
      </Row>
      {showChevronIcon && (
        <CircledIcon className={cx('p-6', { 'bg-white': useWhiteBgForAnchor, 'bg-grey-bgOne': !useWhiteBgForAnchor })}>
          {isOpened ? (
            <ChevronUp size={wp(15)} strokeWidth={2} currentColor={colors.black.muted} />
          ) : (
            <ChevronDown size={wp(15)} strokeWidth={2} currentColor={colors.black.muted} />
          )}
        </CircledIcon>
      )}
    </Row>
  );
};

export default AccordionAnchor;
