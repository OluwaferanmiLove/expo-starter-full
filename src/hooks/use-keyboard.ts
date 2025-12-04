import { useState, useEffect } from 'react';
import { Keyboard, LayoutAnimation } from 'react-native';

const useKeyboard = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);



  const handleKeyboardVisible = (value: boolean) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setKeyboardVisible(value);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      handleKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      handleKeyboardVisible(false);
    });

    // Cleanup the listeners on component unmount
    return () => {
      keyboardDidHideListener?.remove();
      keyboardDidShowListener?.remove();
    };
  }, []);

  return isKeyboardVisible;
};

export default useKeyboard;
