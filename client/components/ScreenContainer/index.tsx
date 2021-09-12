import Spacer from '@components/Spacer';
import { Text } from '@components/Text';
import { colors } from '@constants/colors';
import React, { FC } from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from 'react-native';

interface ScreenContainerProps {
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  disableDefaultPadding?: boolean;
}

export const ScreenContainer: FC<ScreenContainerProps> = ({
  children,
  loading,
  style,
  disableDefaultPadding
}) => {
  return (
    <View
      style={[
        styles.container,
        !disableDefaultPadding && styles.containerPadding,
        loading && styles.centered,
        style
      ]}
    >
      {loading ? (
        <>
          <Text weight="bold" size={20}>
            Loading
          </Text>
          <Spacer height={24} />
          <ActivityIndicator color={colors.neutral[600]} size="large" />
        </>
      ) : (
        children
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerPadding: { padding: 16 },
  centered: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
