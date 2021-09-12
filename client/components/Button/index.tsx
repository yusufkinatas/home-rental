import React, { FC } from 'react';
import {
  ActivityIndicator,
  View,
  PressableProps,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp
} from 'react-native';
import { Icon } from '@components/Icon';
import { PressableOpacity } from '@components/PressableOpacity';
import { FontAwesome } from '@expo/vector-icons';
import { Text } from '@components/Text';
import { colors } from '@constants/colors';

type Size = 's' | 'm' | 'l';

interface ButtonProps extends PressableProps {
  loading?: boolean;
  title?: string;
  block?: boolean;
  icon?: keyof typeof FontAwesome.glyphMap;
  size?: Size;
  style?: StyleProp<ViewStyle>;
  color?: string;
}

interface ButtonStyleVariants {
  textStyle: TextStyle;
  textWithIconStyle: TextStyle;
  containerStyle: ViewStyle;
  containerOnlyIconStyle: ViewStyle;
  iconSize: number;
}

export const Button: FC<ButtonProps> = ({
  title,
  loading,
  icon,
  block,
  style,
  size = 'm',
  color = colors.primary[500],
  ...rest
}) => {
  const {
    containerStyle,
    containerOnlyIconStyle,
    iconSize,
    textStyle,
    textWithIconStyle
  } = buttonStyles[size];

  return (
    <PressableOpacity
      style={[
        styles.container,
        { backgroundColor: color },
        containerStyle,
        !title && containerOnlyIconStyle,
        block && styles.containerBlock,
        style
      ]}
      disabled={loading}
      {...rest}
    >
      {!!icon && (
        <Icon
          name={icon}
          size={iconSize}
          color={colors.neutral[0]}
          style={[loading && styles.textLoading]}
        />
      )}
      {!!title && (
        <Text
          weight="bold"
          color={colors.neutral[0]}
          style={[
            textStyle,
            !!icon && textWithIconStyle,
            loading && styles.textLoading
          ]}
        >
          {title}
        </Text>
      )}
      {loading && (
        <View style={{ position: 'absolute' }}>
          <ActivityIndicator size="small" color={colors.neutral[0]} />
        </View>
      )}
    </PressableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 4,
    paddingHorizontal: 16
  },
  containerSmall: { height: 30 },
  containerMedium: { height: 40 },
  containerLarge: { height: 48 },
  containerOnlyIconSmall: { paddingHorizontal: 0, width: 30 },
  containerOnlyIconMedium: {
    paddingHorizontal: 0,
    width: 40
  },
  containerOnlyIconLarge: { paddingHorizontal: 0, width: 48 },
  containerBlock: {
    width: '100%'
  },
  textSmall: {
    fontSize: 12
  },
  textMedium: { fontSize: 16 },
  textLarge: { fontSize: 20 },
  textWithIconSmall: { marginLeft: 8 },
  textWithIconMedium: { marginLeft: 12 },
  textWithIconLarge: { marginLeft: 16 },
  textLoading: { opacity: 0 }
});

const buttonStyles: Record<Size, ButtonStyleVariants> = {
  s: {
    containerStyle: styles.containerSmall,
    containerOnlyIconStyle: styles.containerOnlyIconSmall,
    textStyle: styles.textSmall,
    textWithIconStyle: styles.textWithIconSmall,
    iconSize: 18
  },
  m: {
    containerStyle: styles.containerMedium,
    containerOnlyIconStyle: styles.containerOnlyIconMedium,
    textStyle: styles.textMedium,
    textWithIconStyle: styles.textWithIconMedium,
    iconSize: 24
  },
  l: {
    containerStyle: styles.containerLarge,
    containerOnlyIconStyle: styles.containerOnlyIconLarge,
    textStyle: styles.textLarge,
    textWithIconStyle: styles.textWithIconLarge,
    iconSize: 30
  }
};
