import { ColorValue, TextProps } from 'react-native';

export interface CustomTextProps extends TextProps {
  size?: number;
  weight?: TextFontWeights;
  color?: ColorValue;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export type TextFontWeights = 'normal' | 'bold';
