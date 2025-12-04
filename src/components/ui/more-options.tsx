import React, { ReactNode, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  LayoutChangeEvent,
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Pressable from './base/pressable';
import Row from './row';
import CircledIcon from './circled-icon';
import { BaseModal, BaseText } from './base';
import cx from 'classnames';
import Separator from './others/separator';
import * as Haptics from 'expo-haptics';
import { Menu } from 'iconsax-react-native';
import { wp } from '@/utils';
import { colors } from '@/theme/colors';

export interface MoreOptionsProps {
  options: MoreOptionElementProps[];
  customMenuElement?: ReactNode;
  classes?: string;
}

export interface MoreOptionElementProps {
  title?: string;
  optionElement?: ReactNode;
  icon?: ReactNode;
  onPress: VoidFunction;
}

const MoreOptions = ({ options, customMenuElement, classes }: MoreOptionsProps) => {
  const [visible, setVisible] = useState(false);

  const toggleMenu = () => setVisible(!visible);

  const Anchor = () => (
    <>
      {customMenuElement ? (
        customMenuElement
      ) : (
        <View
          // onPress={toggleMenu}
          className={cx('px-8', classes)}>
          <Menu size={18} color={colors.grey.muted} />
        </View>
      )}
    </>
  );

  const handleOnPressMenuItem = (onPress: VoidFunction) => {
    toggleMenu();
    if (onPress) {
      onPress();
    }
  };

  return (
    // <Menu
    //   animationDuration={400}
    //   visible={visible}
    //   anchor={<Anchor />}
    //   onRequestClose={toggleMenu}
    //   style={{ borderRadius: 8 }}>
    //   {options.map(({ optionElement, title, onPress }, index) => (
    //     <View key={index}>
    //       <MenuItem key={title ?? index}
    //       // className="px-10"
    //       onPress={() => handleOnPressMenuItem(onPress)}>
    //         {optionElement ? optionElement : title}
    //       </MenuItem>
    //       {options.length - 1 !== index && <MenuDivider />}
    //     </View>
    //   ))}
    // </Menu>
    <DropdownMenu
      visible={visible}
      handleOpen={() => setVisible(true)}
      handleClose={() => setVisible(false)}
      trigger={<Anchor />}>
      {options.map(({ optionElement, icon, title, onPress }, index) => (
        <View key={index}>
          <MenuOption
            key={title ?? index}
            // className="px-10"
            onSelect={() => handleOnPressMenuItem(onPress)}>
            {optionElement ? (
              optionElement
            ) : (
              <BaseText fontSize={12} classes={cx('text-black-main py-5')}>
                {title}
              </BaseText>
            )}
          </MenuOption>
          {options.length - 1 !== index && <Separator className="mx-0 my-0" />}
        </View>
      ))}
    </DropdownMenu>
  );
};

export const OptionWithIcon: React.FC<{ icon: React.ReactNode; label: string; labelClasses?: string }> = ({
  icon,
  label,
  labelClasses,
}) => {
  return (
    <Row spread={false} style={{ columnGap: wp(10) }}>
      <CircledIcon iconBg="bg-grey-bgOne" className="p-7">
        {icon}
      </CircledIcon>
      <BaseText fontSize={12} classes={cx('text-black-main', labelClasses)}>
        {label}
      </BaseText>
    </Row>
  );
};

export default MoreOptions;

export const MenuTrigger = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export const MenuOption = ({ onSelect, children }: { onSelect: () => void; children: ReactNode }) => {
  return (
    <Pressable className="py-8 px-10" onPress={onSelect}>
      {children}
    </Pressable>
  );
};

interface DropdownMenuProps {
  visible: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
  // dropdownWidth?: number;
}

interface Position {
  x: number;
  y: number;
  // triggerWidth: number;
  placement: 'top' | 'bottom';
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  visible,
  handleOpen,
  handleClose,
  trigger,
  children,
  // dropdownWidth = 150,
}) => {
  const [dropdownWidth, setDropdownWidth] = useState(0);
  const [dropdownHeight, setDropdownHeight] = useState(0);
  const triggerRef = useRef<View>(null);
  // const triggerRef = useRef<View>(null);
  // const [position, setPosition] = useState({ x: 0, y: 0, width: 0 });
  const [touchPoint, setTouchPoint] = useState({ x: 0, y: 0 });

  const [position, setPosition] = useState<Position>({ x: 0, y: 0, placement: 'bottom' });

  const calculatePosition = (touchX: number, touchY: number) => {
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;
    const SCREEN_PADDING = wp(20);

    // Calculate available space from touch point
    const spaceBelow = windowHeight - touchY;
    const spaceAbove = touchY;

    // Determine vertical placement
    let yPos: number;
    let placement: 'top' | 'bottom';

    if (spaceBelow >= dropdownHeight || spaceBelow >= spaceAbove) {
      // Position below touch point
      yPos = touchY + 3;
      placement = 'bottom';
    } else {
      // Position above touch point
      yPos = touchY - dropdownHeight - 30; //30 is extra padding so the dropdown doesn't cover the touch point
      placement = 'top';
    }

    // Calculate horizontal position
    let xPos = touchX - dropdownWidth;

    // Prevent dropdown from going off screen horizontally
    if (xPos < SCREEN_PADDING) {
      xPos = SCREEN_PADDING;
    } else if (xPos + dropdownWidth > windowWidth - SCREEN_PADDING) {
      xPos = windowWidth - dropdownWidth - SCREEN_PADDING;
    }

    return {
      x: xPos,
      y: yPos,
      placement,
    };
  };

  const handlePress = (event: GestureResponderEvent) => {
    // console.log(event);
    // const { pageX, pageY } = event.nativeEvent;
    // setTouchPoint({ x: pageX, y: pageY });
    // handleOpen();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (triggerRef.current) {
      triggerRef.current.measure((x, y, width, height, pageX, pageY) => {
        setTouchPoint({ x: pageX + width - 2, y: pageY + height });
        handleOpen();
      });
    }
  };

  useEffect(() => {
    if (visible && dropdownWidth > 0 && dropdownHeight > 0) {
      const newPosition = calculatePosition(touchPoint.x, touchPoint.y);
      setPosition(newPosition);
    }
  }, [visible, dropdownWidth, dropdownHeight, touchPoint]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setDropdownWidth(width);
    setDropdownHeight(height);
  };

  return (
    <View>
      <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
        <View ref={triggerRef}>{trigger}</View>
      </TouchableOpacity>
      {visible && (
        <BaseModal
          style={{ margin: 0 }}
          backdropOpacity={0}
          isVisible={visible}
          animationIn={'fadeInUp'}
          animationInTiming={100}
          animationOut={'fadeOut'}
          onBackdropPress={handleClose}>
          <TouchableWithoutFeedback onPress={handleClose}>
            <View style={styles.modalOverlay}>
              <View
                className="absolute border border-grey-border rounded-8 bg-white"
                onLayout={e => setDropdownWidth(e.nativeEvent.layout.width)}
                style={[
                  {
                    // top: position.y,
                    // // left: position.x + position.width / 2 - dropdownWidth / 2,
                    // left: position.x + position.width / 2 - dropdownWidth,
                    // minWidth: wp(160),
                    // // width: dropdownWidth,

                    position: 'absolute',
                    top: position.y,
                    left: position.x,
                    minWidth: 160,

                    // minWidth: 160,
                    // backgroundColor: 'white',
                    borderRadius: 8,
                    borderWidth: 1,
                    // borderColor: '#E5E5E5',
                  },
                ]}>
                <View
                  onLayout={handleLayout}
                  style={{
                    backgroundColor: 'transparent',
                  }}>
                  {children}
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </BaseModal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',

    // flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    // backgroundColor: 'transparent',
  },
});
