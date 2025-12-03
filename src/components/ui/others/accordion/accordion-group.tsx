import { LayoutAnimation, View } from 'react-native';
import { AccordionProps } from '.'; // Assuming Accordion is in the same directory
import React, { ReactElement, useCallback, useState } from 'react';
import Separator from '../separator';

interface AccordionGroupProps {
  children: ReactElement<AccordionProps>[];
  className?: string;
  addSeparator?: boolean;
  openedIndex?: number;
}

const AccordionGroup: React.FC<AccordionGroupProps> = ({ children, openedIndex, className, addSeparator = false, }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(openedIndex ?? null);

  const handleToggle = useCallback((index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  }, []);

  return (
    <View className={className}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement<AccordionProps>(child)) return null;

        // Extract the original props we need to preserve
        const {
          event: originalEvent,
          anchorElement: originalAnchorElement,
          useOutsideTrigger = true,
          ...restProps
        } = child.props;

        // Create new props for the accordion
        const newProps: Partial<AccordionProps> = {
          ...restProps,
          useOutsideTrigger: true,
          isOpened: index === openIndex,
          onPressAnchor: () => handleToggle(index),
          event: ({ isOpened }) => {
            // Call the original event handler if it exists
            originalEvent?.({ isOpened });
          },
          anchorElement: (status: boolean) => {
            // If the child has a custom anchorElement, use it
            if (originalAnchorElement) {
              // Pass the correct status based on whether this accordion is open
              return originalAnchorElement(index === openIndex);
            }
            return null;
          },
        };

        // Clone the element with new props// Create a fragment containing the accordion and possibly a separator
        const element = React.cloneElement(child, newProps);
        
        // Add separator if it's not the last child and addSeparator is true
        const isLastChild = index === React.Children.count(children) - 1;
        const needsSeparator = addSeparator && !isLastChild;

        return (
          <React.Fragment key={index}>
            {element}
            {needsSeparator && <Separator className='my-0 mx-0 mt-14' />}
          </React.Fragment>
        );
      })}
    </View>
  );
};

export default AccordionGroup;
