import { Icon } from '@components/Icon';
import { PressableOpacity } from '@components/PressableOpacity';
import { Text } from '@components/Text';
import { colors } from '@constants/colors';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export const ConversationListItem = () => {
  const navigation = useNavigation();
  return (
    <PressableOpacity
      style={styles.wrapper}
      onPress={() => navigation.navigate('Chat', { conversationId: '123' })}
    >
      <Icon size={40} name="user-circle-o" />
      <View style={styles.textContent}>
        <Text weight="bold">Yusuf Kınataş</Text>
        <View style={styles.bottomRow}>
          <Text
            size={14}
            color={colors.neutral[500]}
            style={styles.lastMessage}
            numberOfLines={1}
          >
            Hey bro, how are you?
          </Text>
          <Text weight="bold" color={colors.neutral[500]} size={14}>
            19:03
          </Text>
        </View>
      </View>
    </PressableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: colors.neutral[300],
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textContent: { flex: 1, marginLeft: 8 },
  lastMessage: { flex: 1, marginRight: 8 },
  bottomRow: {
    flexDirection: 'row'
  }
});
