import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ScreenContainer } from '@components/ScreenContainer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAppSelector } from '@hooks/useAppSelector';
import { selectUser } from '@slices/authSlice';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { ScreenProp } from 'types';
import { Message } from './Message';
import Spacer from '@components/Spacer';

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
      <KeyboardAwareScrollView
        enableAutomaticScroll
        contentContainerStyle={styles.contentContainer}
        keyboardDismissMode="none"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          data={Array(10)}
          keyExtractor={(_, i) => i.toString()}
          ItemSeparatorComponent={() => <Spacer height={16} />}
          renderItem={() => <Message />}
        />
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16
  }
});
