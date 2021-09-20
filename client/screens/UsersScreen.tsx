import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, TextInput } from 'react-native';
import { ScreenContainer } from '@components/ScreenContainer';
import Spacer from '@components/Spacer';
import { colors } from '@constants/colors';
import { UserListItem } from '@components/UserListItem';
import { useNavigation } from '@react-navigation/core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@components/Button';
import { useAppSelector } from '@hooks/useAppSelector';
import { loadMoreUsers, searchUsers, selectUserIds } from '@slices/usersSlice';
import { useAppDispatch } from '@hooks/useAppDispatch';

export const UsersScreen = () => {
  const { bottom: bottomInset } = useSafeAreaInsets();

  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const userIds = useAppSelector(selectUserIds);
  const isLoading = useAppSelector((state) => state.users.isLoading);

  useEffect(() => {
    dispatch(searchUsers({ query: searchQuery }));
  }, [searchQuery]);

  return (
    <ScreenContainer disableDefaultPadding>
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search Users"
        style={styles.searchInput}
        placeholderTextColor={colors.neutral[400]}
        clearButtonMode="always"
      />
      <FlatList
        data={userIds}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
        keyExtractor={(id) => id.toString()}
        renderItem={({ item: id }) => <UserListItem id={id.toString()} />}
        onEndReached={() => !isLoading && dispatch(loadMoreUsers())}
        ItemSeparatorComponent={() => <Spacer height={16} />}
        contentContainerStyle={styles.contentContainer}
        onEndReachedThreshold={0.2}
      />
      <Button
        icon="plus"
        size="l"
        style={[styles.createButton, { bottom: 16 + bottomInset }]}
        onPress={() => navigation.navigate('CreateUser')}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16
  },
  searchInput: {
    backgroundColor: colors.neutral[100],
    borderRadius: 4,
    marginTop: 16,
    padding: 8,
    marginHorizontal: 16,
    fontSize: 16,
    color: colors.neutral[600]
  },
  createButton: {
    position: 'absolute',
    right: 16
  }
});
