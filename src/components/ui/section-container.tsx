import cx from 'classnames';
import { styled } from 'nativewind';
import React, { ReactNode } from 'react';
import { ScrollView, ScrollViewProps, View } from 'react-native';

import SectionEmptyState, { SectionEmptyStateProps } from './empty-states/section-empty-state';

export interface SectionContainerProps extends ScrollViewProps {
  children?: ReactNode;
  containerType?: ContainerType;
  isEmpty?: boolean;
  emptyStateProps?: SectionEmptyStateProps;
  classes?: string;
  scrollRef?: React.LegacyRef<ScrollView>;
  stickyAddon?: ReactNode;
}

export enum ContainerType {
  'OUTLINED' = 'Outlined',
  'FILLED' = 'filled',
}

const SectionContainer = ({
  scrollRef,
  isEmpty,
  children,
  emptyStateProps,
  containerType = ContainerType.FILLED,
  classes = '',
  ...props
}: SectionContainerProps) => {
  return (
    <ScrollView
      ref={scrollRef}
      showsVerticalScrollIndicator={false}
      className={cx(
        'rounded-[20px] px-15 mt-15',
        {
          'border border-grey-bgOne': containerType === ContainerType.OUTLINED,
          'bg-grey-bgOne': containerType === ContainerType.FILLED,
        },
        classes,
      )}
      bounces={false}
      {...props}>
      {isEmpty ? <SectionEmptyState {...emptyStateProps} /> : children}
    </ScrollView>
  );
};

export default SectionContainer;
