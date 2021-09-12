import { colors } from '@constants/colors';
import { Theme } from '@react-navigation/native';

export const navigationTheme: Theme = {
  colors: {
    background: colors.neutral[0],
    border: colors.neutral[200],
    card: colors.neutral[100],
    notification: colors.danger,
    primary: colors.primary[500],
    text: colors.neutral[600]
  },
  dark: false
};
