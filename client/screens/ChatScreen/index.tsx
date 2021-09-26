import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { ScreenContainer } from '@components/ScreenContainer';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { useAppSelector } from '@hooks/useAppSelector';
import { selectUser } from '@slices/authSlice';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { ScreenProp } from 'types';
import Spacer from '@components/Spacer';
import { MessageListItem } from './MessageListItem';

export const ChatScreen = ({
  navigation,
  route: {
    params: { conversationId }
  }
}: ScreenProp<'Chat'>) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    navigation.setOptions({ title: 'Yusuf Kınataş' });
  }, []);

  return (
    <ScreenContainer disableDefaultPadding>
      <KeyboardAwareFlatList
        data={Array(10)}
        keyExtractor={(_, i) => i.toString()}
        ItemSeparatorComponent={() => <Spacer height={16} />}
        renderItem={() => <MessageListItem />}
        //
        enableAutomaticScroll
        contentContainerStyle={styles.contentContainer}
        keyboardDismissMode="none"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16
  }
});
