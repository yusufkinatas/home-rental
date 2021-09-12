import { Icon } from '@components/Icon';
import { PressableOpacity } from '@components/PressableOpacity';
import { Text } from '@components/Text';
import { colors } from '@constants/colors';
import { roleNames } from '@constants/roleNames';
import _ from 'lodash';
import React, { FC, memo } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { User } from 'types';

interface Props {
  user: User;
  onEdit: () => void;
  onDelete: () => Promise<void>;
}

const _UserListItem: FC<Props> = ({ user, onEdit, onDelete }) => {
  const { email, fullName, role } = user;
  const roleName = roleNames[role];

  const onMorePress = () => {
    Alert.alert(fullName, 'Choose an action', [
      { style: 'cancel', text: 'Cancel' },
      {
        style: 'destructive',
        text: 'Delete',
        onPress: onDelete
      },
      { style: 'default', text: 'Edit', onPress: onEdit }
    ]);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.leftWrapper}>
        <Text>
          {fullName}
          {!!roleName && (
            <Text
              color={colors.primary[500]}
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

export const UserListItem = memo(_UserListItem, _.isEqual);

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
