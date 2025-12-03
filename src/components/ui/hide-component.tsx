import React from 'react';
import { ViewProps, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface HideComponentProps {
  show: boolean;
  children: React.ReactNode;
  classNames?: string;
  style?: ViewProps['style'];
}

const HideComponent = ({ show, children, classNames, style = {} }: HideComponentProps) => {
  return (
    <Animatable.View
      animation={'fadeIn'}
      duration={500}
      // style={show ? style : { height: 0, width: 0, opacity: 0 }}
      style={show ? style : { display: 'none' }}
      className={show ? classNames : ''}>
      {children}
    </Animatable.View>
  );
};

export default HideComponent;
