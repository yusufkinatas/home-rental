import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList
} from '@react-navigation/drawer';
import { DrawerIcon } from './DrawerIcon';
import { Text } from '@components/Text';
import { User } from 'types';
import { colors } from '@constants/colors';
import { StyleSheet, View } from 'react-native';
import { Icon } from '@components/Icon';
import Spacer from '@components/Spacer';
import { roleNames } from '@constants/roleNames';

interface Props extends DrawerContentComponentProps {
  onLogout: () => void;
  user?: User;
}

export const CustomDrawerContent = ({ user, onLogout, ...rest }: Props) => {
  const roleName = user && roleNames[user.role];

  return (
    <DrawerContentScrollView {...rest}>
      <View style={styles.profile}>
        <Icon size={40} name="user-circle-o" />
        <Spacer width={16} />
        <View>
          <Text size={18} color={colors.neutral[500]}>
            {user?.fullName}
          </Text>
          {!!roleName && (
            <Text color={colors.primary} weight="bold" size={14}>
              {roleName}
            </Text>
          )}
        </View>
      </View>
      <DrawerItemList {...rest} />
      <DrawerItem
        label="Log Out"
        icon={(props) => <DrawerIcon name="sign-out" {...props} />}
        onPress={onLogout}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: colors.neutral[300]
  }
});
