import React, { ReactNode, useMemo } from 'react';
import { PixelRatio, Text, TextProps } from 'react-native';
import cx from 'classnames';
import { wp } from '@/utils';

export type BaseTextProps<
  TType = 'heading' | 'body',
  T = TType extends 'body'
    ? 'bold' | 'light' | 'regular' | 'medium' | 'semiBold' | 'bold' | 'black'
    : 'bold' | 'light',
> = {
  fontSize?: number;
  lineHeight?: number;
  type?: TType;
  classes?: string;
  children?: ReactNode;
  weight?: T;
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize';
  style?: { [key: string]: any };
} & Omit<TextProps, 'style'>;

const fontScale = PixelRatio.getFontScale();

const BaseText = ({
  type = 'body',
  classes,
  weight = 'regular',
  children,
  fontSize = 13,
  lineHeight,
  textTransform,
  style,
  ...props
}: BaseTextProps) => {
  // const responsiveFs = useMemo(() => wp(fontSize), []);

  const fontSizing = useMemo(() => {
    const responsiveFs = wp(fontSize);
    if (fontScale < 1) {
      return Math.max(responsiveFs * 0.9, responsiveFs * fontScale);
    }

    if (fontScale > 1) {
      return Math.min(responsiveFs * 1.08, responsiveFs * fontScale);
    }

    return responsiveFs;
  }, [fontSize]);

  const lineHeightSizing = useMemo(() => {
    if (!lineHeight) {
      return undefined;
    }
    const responsiveFs = wp(lineHeight);
    if (fontScale < 1) {
      return Math.max(responsiveFs * 0.9, responsiveFs * fontScale);
    }

    if (fontScale > 1) {
      return Math.min(responsiveFs * 1.08, responsiveFs * fontScale);
    }

    return responsiveFs;
  }, [lineHeight]);

  return (
    <Text
      className={cx(textSettings[type].classes, classes, textSettings[type].weight[weight] as any)}
      allowFontScaling={false}
      style={{
        fontSize: fontSizing,
        letterSpacing: textSettings[type].letterSpacing(fontSizing),
        lineHeight: lineHeight ? lineHeightSizing : undefined,
        textTransform: textTransform,
        ...style,
      }}
      {...props}>
      {children}
    </Text>
  );
};

const textSettings = {
  body: {
    classes: 'font-interRegular leading-normal',
    letterSpacing: (size: number) => 0,
    weight: {
      light: 'font-interLight',
      regular: 'font-interRegular',
      medium: 'font-interMedium',
      semiBold: 'font-interSemiBold',
      bold: 'font-interBold',
      black: 'font-interBlack',
    },
  },
  heading: {
    classes: 'font-fhOscarBold leading-extra-tight',
    letterSpacing: (size: number) => size * (2 / 100),
    weight: {
      bold: 'font-fhOscarBold',
      light: 'font-fhOscarLight',
      medium: '',
      regular: '',
      semiBold: '',
      black: 'font-fhOscarBlack',
    },
  },
};

export default React.memo(BaseText);
