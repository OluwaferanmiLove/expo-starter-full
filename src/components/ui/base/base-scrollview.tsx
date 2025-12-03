import { ScrollView, ScrollViewProps } from 'react-native';
import { ScrollView as GestureHandlerScrollView } from 'react-native-gesture-handler';
import { ReactNode } from 'react';
import { cx } from '@/utils';

interface BaseScrollViewProps extends ScrollViewProps {
  children: ReactNode;
  useGestureHandler?: boolean;
  className?: string;
  scrollRef?: React.MutableRefObject<ScrollView>;
}

const BaseScrollView = ({ children, useGestureHandler, className, scrollRef, ...props }: BaseScrollViewProps) => {
  const baseProps = {
    keyboardShouldPersistTaps: 'handled' as ScrollViewProps['keyboardShouldPersistTaps'],
    keyboardDismissMode: 'interactive' as ScrollViewProps['keyboardDismissMode'],
  };

  if (useGestureHandler) {
    return (
      <GestureHandlerScrollView className={cx('flex-1 bg-white', className)} {...baseProps} {...props} ref={scrollRef}>
        {children}
      </GestureHandlerScrollView>
    );
  }
  return (
    <ScrollView className={cx('flex-1 bg-', className)} {...baseProps} {...props} ref={scrollRef}>
      {children}
    </ScrollView>
  );
};

export default BaseScrollView;
