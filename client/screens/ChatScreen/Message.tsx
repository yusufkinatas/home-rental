import { Text } from '@components/Text';
import { colors } from '@constants/colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export const Message = () => {
  const sentByUser = true;

  return (
    <View style={[styles.wrapper, sentByUser && styles.wrapperSentByUser]}>
      <Text color={sentByUser ? colors.neutral[0] : colors.neutral[1000]}>
        Hey bro, how are you?
      </Text>
      <Text
        align="right"
        size={12}
        color={sentByUser ? colors.neutral[0] : colors.neutral[1000]}
        style={styles.timestamp}
      >
        19:45
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.neutral[200],
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 4,
    borderRadius: 4,
    maxWidth: '75%',
    alignSelf: 'flex-start'
  },
  wrapperSentByUser: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary
  },
  timestamp: { marginTop: 2, opacity: 0.5 }
});
