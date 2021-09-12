import React, { useState } from 'react';
import { FlatList, StyleSheet, TextInput } from 'react-native';
import { ScreenContainer } from '@components/ScreenContainer';
import { useUsers } from '@hooks/useUsers';
import Spacer from '@components/Spacer';
import { colors } from '@constants/colors';
import { UserListItem } from '@components/UserListItem';
import { message } from '@utils/message';
import { useNavigation } from '@react-navigation/core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@components/Button';

export const UsersScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const {
    users,
    isLoading,
    loadMoreUsers,
    deleteUser,
    updateUser,
    createUser
  } = useUsers(searchQuery);

  const { bottom: bottomInset } = useSafeAreaInsets();

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
        data={users}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
        keyExtractor={(user) => user._id}
        renderItem={({ item: user }) => (
          <UserListItem
            user={user}
            onEdit={() => {
              navigation.navigate('EditUser', { user, updateUser });
            }}
            onDelete={async () => {
              try {
                await deleteUser(user._id);
                message.success('User deleted!');
              } catch (error) {
                message.error('Something unexpected happened');
              }
            }}
          />
        )}
        onEndReached={() => !isLoading && loadMoreUsers()}
        ItemSeparatorComponent={() => <Spacer height={16} />}
        contentContainerStyle={styles.contentContainer}
      />
      <Button
        icon="plus"
        size="l"
        style={[styles.createButton, { bottom: 16 + bottomInset }]}
        onPress={() => navigation.navigate('CreateUser', { createUser })}
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
