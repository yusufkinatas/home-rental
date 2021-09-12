import { colors } from '@constants/colors';
import React from 'react';
import { Text as RNText, TextStyle } from 'react-native';
import { CustomTextProps } from './types';

const getFontWeight = (weight: string) => {
  switch (weight) {
    case 'bold':
      return { fontFamily: 'Lato-Bold' };
    default:
      return {
        fontFamily: 'Lato'
      };
  }
};

export const Text: React.FC<CustomTextProps> = ({
  children,
  style,
  size = 16,
  weight = 'normal',
  color,
  align = 'left',
  ...rest
}) => {
  const textStyle: TextStyle = {
    fontSize: size,
    textAlign: align,
    color: color || colors.neutral[600],
    ...getFontWeight(weight)
  };

  return (
    <RNText style={[textStyle, style]} {...rest}>
      {children}
    </RNText>
  );
};
