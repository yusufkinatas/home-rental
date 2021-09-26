import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ScreenContainer } from '@components/ScreenContainer';
import { ConversationListItem } from './ConversationListItem';
import Spacer from '@components/Spacer';

export const ConversationsScreen = () => {
  return (
    <ScreenContainer>
      <FlatList
        data={Array(10)}
        keyExtractor={(_, i) => i.toString()}
        renderItem={() => <ConversationListItem />}
        ItemSeparatorComponent={() => <Spacer height={16} />}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({});
