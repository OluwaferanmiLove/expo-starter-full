import 'react-native-svg';

declare module 'react-native-svg' {
  // NOTE: extending existing interface
  interface SvgProps {
    currentColor?: string;
    primaryColor?: string;
    secondaryColor?: string;
    size?: number;
    width?: number;
    height?: number;
  }
}
