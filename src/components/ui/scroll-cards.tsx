import React, { useState, useEffect, useRef } from 'react';
import { Animated,View, FlatList } from 'react-native';
import { hp, wp } from '@/utils';
import { colors } from '@/theme/colors';

const width = wp(305);

export interface BalanceCardItem {
  icon: React.ReactNode;
  iconBg: string;
  // header: React.ReactNode;
  title: string;
  getValue: () => string;
  valueAddon?: React.ReactNode;
  bottomAddon?: React.ReactNode;
  cardBg: any;
  fullWidth?: boolean;
}

interface BalanceCardDotsProps {
  scrollX: Animated.Value;
  colors: { active: string; inactive: string };
  length: number;
}

export const Dots = (props: BalanceCardDotsProps) => {
  const { scrollX, colors, length } = props;
  const stepPosition = Animated.divide(scrollX, width);

  return (
    <View className="flex-row items-center">
      {Array(length)
        .fill(null)
        .map((item, index) => {
          const backgroundColor = stepPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [colors.inactive, colors.active, colors.inactive],
            extrapolate: 'clamp',
          });

          const height = stepPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [hp(3), hp(4), hp(3)],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={`step-${index}`}
              className="w-15 mx-3 rounded-full"
              style={{ backgroundColor, height }}
            />
          );
        })}
    </View>
  );
};

interface ScrollCardsProps {
  cards: any[];
  dotsColor: string;
  autoSwipe?: boolean;
  autoSwipeInterval?: number; //(default: 3000ms)
  renderCard: (props: { item: any; index: number }) => React.ReactElement;
  separatorWidth?: number;
}

const ScrollCards = ({
  cards,
  dotsColor,
  autoSwipe = false,
  autoSwipeInterval = 3000,
  renderCard,
  separatorWidth = wp(15),
}: ScrollCardsProps) => {
  const [scrollX] = useState(new Animated.Value(0));
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const autoSwipeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto swipe effect
  useEffect(() => {
    if (!autoSwipe || cards.length <= 1 || isUserScrolling) {
      return;
    }

    const startAutoSwipe = () => {
      let currentIndex = 0;
      autoSwipeTimerRef.current = setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        flatListRef.current?.scrollToIndex({
          index: currentIndex,
          animated: true,
        });
      }, autoSwipeInterval);
    };

    startAutoSwipe();

    return () => {
      if (autoSwipeTimerRef.current) {
        clearInterval(autoSwipeTimerRef.current);
      }
    };
  }, [autoSwipe, cards.length, autoSwipeInterval, isUserScrolling]);

  // Handle scroll events
  const handleScroll = Animated.event(
    [
      {
        nativeEvent: { contentOffset: { x: scrollX } },
      },
    ],
    { useNativeDriver: false },
  );

  // Handle scroll begin (user starts scrolling)
  const handleScrollBeginDrag = () => {
    setIsUserScrolling(true);
    if (autoSwipeTimerRef.current) {
      clearInterval(autoSwipeTimerRef.current);
    }
  };

  // Handle scroll end (user stops scrolling)
  const handleScrollEndDrag = () => {
    setTimeout(() => {
      setIsUserScrolling(false);
    }, 1000); // Resume auto swipe after 1 second of no user interaction
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        horizontal
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment={'center'}
        pagingEnabled
        contentContainerStyle={{ paddingHorizontal: wp(20) }}
        ItemSeparatorComponent={() => <View className="w-15" />}
        scrollEventThrottle={20}
        data={cards}
        renderItem={props => renderCard({ ...props, item: { ...props.item, fullWidth: cards.length === 1 } })}
        keyExtractor={(item, index) => index.toString()}
        onScroll={handleScroll}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
        onMomentumScrollEnd={handleScrollEndDrag}
        getItemLayout={(data, index) => ({
          length: width + separatorWidth, // item width + separator width
          offset: (width + separatorWidth) * index,
          index,
        })}
      />
      <View className="items-center pt-10">
        <Dots scrollX={scrollX} colors={{ active: dotsColor, inactive: colors.grey.border }} length={cards.length} />
      </View>
    </View>
  );
};

export default ScrollCards;
