import { LayoutAnimation, View } from 'react-native';
import colors from '@/theme/colors';
import { ChevronDown, ChevronUp } from '@/components/ui/icons';
import { cx, hp, wp } from '@/assets/utils/js';
import { forwardRef, ReactNode, Ref, useEffect, useImperativeHandle, useState } from 'react';
import Pressable from '@/components/ui/base/pressable';
import { BaseText } from '@/components/ui';
import { BaseTextProps } from '../../base/base-text';
import classNames from 'classnames';

export interface AccordionMethod {
  toggleAccordion: (status?: boolean) => void;
  booleanStatusChange: () => boolean;
}

export interface AccordionProps {
  children?: ReactNode;
  anchorElement?: (status: boolean) => ReactNode;
  title?: string;
  anchorContainerClasses?: string;
  anchorTitleProps?: BaseTextProps;
  anchorIconContainerClasses?: string;
  event?: (e: { isOpened: boolean }) => void;
  initiallyOpened?: boolean;
  useOutsideTrigger?: boolean;
  isOpened?: boolean;
  onPressAnchor?: VoidFunction;
  classes?: string;
}

const Accordion = forwardRef(
  (
    {
      title,
      event,
      anchorContainerClasses,
      anchorTitleProps,
      anchorIconContainerClasses,
      anchorElement,
      isOpened,
      useOutsideTrigger,
      onPressAnchor,
      children,
      initiallyOpened,
      classes,
    }: AccordionProps,
    ref?: Ref<AccordionMethod>,
  ) => {
    const [expanded, setExpanded] = useState(initiallyOpened ?? false);

    useEffect(() => {
      if (useOutsideTrigger) {
        setExpanded(isOpened ?? false);
      }
    }, [isOpened]);

    useEffect(() => {
      if (event) {
        event({ isOpened: expanded });
      }
    }, [expanded]);

    const handleToggleAccordion = (status?: boolean) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      if (status) {
        setExpanded(status);
        return;
      }
      setExpanded(prev => !prev);
    };

    useImperativeHandle(ref, () => ({
      toggleAccordion: status => handleToggleAccordion(status),
      booleanStatusChange: () => {
        return expanded;
      },
    }));

    return (
      <View className={cx('mt-15', classes)}>
        {anchorElement ? (
          <Pressable onPress={useOutsideTrigger ? onPressAnchor : () => handleToggleAccordion()}>
            {anchorElement(expanded)}
          </Pressable>
        ) : (
          <Pressable
            className={`flex flex-row pb-7 items-center justify-start ${anchorContainerClasses}`}
            onPress={useOutsideTrigger ? onPressAnchor : () => handleToggleAccordion()}>
            <BaseText fontSize={12} weight="medium" classes={`text-primary-main mr-4`} {...anchorTitleProps}>
              {title}
            </BaseText>
            <View className={classNames(anchorIconContainerClasses, { 'rotate-180': expanded })}>
              <ChevronDown size={wp(18)} strokeWidth={2} currentColor={colors.primary.main} />
            </View>
          </Pressable>
        )}
        {expanded && children}
      </View>
    );
  },
);

export default Accordion;

//Todo: Natively written accordion Animation

// import { LayoutAnimation, View } from 'react-native';
// import colors from '@/theme/colors';
// import { ChevronDown, ChevronUp } from '@/components/ui/icons';
// import { hp, wp } from '@/assets/utils/js';
// import { ReactNode, useEffect, useState } from 'react';
// import Pressable from '@/components/ui/base/pressable';
// import { BaseText } from '@/components/ui';
// import { BaseTextProps } from '../base/base-text';
// import classNames from 'classnames';
// import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

// interface AccordionProps {
//   children?: ReactNode;
//   anchorElement?: (status: boolean) => ReactNode;
//   title?: string;
//   anchorContainerClasses?: string;
//   anchorTitleProps?: BaseTextProps;
//   anchorIconContainerClasses?: string;
//   event?: (e: { isOpened: boolean }) => void;
// }

// const Accordion = ({
//   title,
//   event,
//   anchorContainerClasses,
//   anchorTitleProps,
//   anchorIconContainerClasses,
//   anchorElement,
//   children,
// }: AccordionProps) => {
//   // const [expanded, setExpanded] = useState(false);
//   const height = useSharedValue(0);
//   const isExpanded = useSharedValue(false);

//   // useEffect(() => {
//   //   if (event) {
//   //     event({ isOpened: expanded });
//   //   }
//   // }, [expanded]);

//   const handleToggleAccordion = () => {
//     // setExpanded(prev => !prev)
//     isExpanded.value = !isExpanded.value;
//   };

//   const derivedHeight = useDerivedValue(() =>
//     withTiming(height.value * Number(isExpanded.value), {
//       duration: 300,
//     }),
//   );

//   const bodyStyle = useAnimatedStyle(() => ({
//     height: derivedHeight.value,
//   }));

//   const derivedRotation = useDerivedValue(() =>
//     withTiming(isExpanded.value === true ? 180 : 0, {
//       duration: 300,
//     }),
//   );

//   const rotateStyle = useAnimatedStyle(() => {
//     return {
//     transform: [{rotate: `45deg`}]
//   }});

//   return (
//     <View className="mt-15" key={Math.random()}>
//       {anchorElement ? (
//         <Pressable onPress={handleToggleAccordion}>{anchorElement(isExpanded.value)}</Pressable>
//       ) : (
//         <Pressable
//           className={`flex flex-row py-7 items-center justify-start ${anchorContainerClasses}`}
//           onPress={handleToggleAccordion}>
//           <BaseText fontSize={12} weight="medium" classes={`text-primary-main mr-4`} {...anchorTitleProps}>
//             {title} {`${isExpanded.value}`}
//           </BaseText>
//           <Animated.View className={classNames(anchorIconContainerClasses)} style={[rotateStyle]}>
//             <ChevronDown size={wp(18)} strokeWidth={2} currentColor={colors.primary.main} />
//           </Animated.View>
//         </Pressable>
//       )}
//       {/* {expanded && (
//         <Animated.View
//           onLayout={e => {
//             height.value = e.nativeEvent.layout.height;
//           }}
//           style={[bodyStyle]}>
//           {' '}
//           {children}
//         </Animated.View>
//       )} */}

//       <Animated.View style={[bodyStyle, { width: '100%', overflow: 'hidden' }]}>
//         <View
//           onLayout={e => {
//             height.value = e.nativeEvent.layout.height;
//           }}
//           style={{ width: '100%', position: 'absolute' }}>

//           <BaseText fontSize={12} weight="medium" classes={`text-primary-main mr-4`} {...anchorTitleProps}>
//             {`${isExpanded.value}`}
//           </BaseText>
//           {children}
//         </View>
//       </Animated.View>
//     </View>
//   );
// };

// export default Accordion;
