import { Icon } from '@components/Icon';
import { PressableOpacity } from '@components/PressableOpacity';
import { Text } from '@components/Text';
import { colors } from '@constants/colors';
import { roleNames } from '@constants/roleNames';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { useNavigation } from '@react-navigation/core';
import { deleteUser, selectUserById } from '@slices/usersSlice';
import { message } from '@utils/message';
import React, { FC, memo } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

interface Props {
  id: string;
}

const _UserListItem: FC<Props> = ({ id }) => {
  const user = useAppSelector((state) => selectUserById(state, id));
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  if (!user) return null;

  const onDelete = async () => {
    const { meta } = await dispatch(deleteUser({ id }));
    console.log(meta.requestStatus);

    if (meta.requestStatus === 'rejected') {
      return message.error('Something unexpected happened');
    }

    message.success('User deleted!');
  };

  const onEdit = () => {
    navigation.navigate('EditUser', { user });
  };

  const onMorePress = () => {
    Alert.alert(fullName, 'Choose an action', [
      { style: 'cancel', text: 'Cancel' },
      {
        style: 'destructive',
        text: 'Delete',
        onPress: onDelete
      },
      {
        style: 'default',
        text: 'Edit',
        onPress: onEdit
      }
    ]);
  };

  const { email, fullName, role } = user;
  const roleName = roleNames[role];

  return (
    <View style={styles.wrapper}>
      <View style={styles.leftWrapper}>
        <Text>
          {fullName}
          {!!roleName && (
            <Text
              color={colors.primary}
              size={14}
              weight="bold"
            >{` - ${roleName}`}</Text>
          )}
        </Text>
        <Text size={12}>{email}</Text>
      </View>
      <PressableOpacity style={styles.moreButton} onPress={onMorePress}>
        <Icon name="ellipsis-v" />
      </PressableOpacity>
    </View>
  );
};

export const UserListItem = memo(_UserListItem);

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: colors.neutral[300],
    borderRadius: 4,
    flexDirection: 'row'
  },
  leftWrapper: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  moreButton: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
