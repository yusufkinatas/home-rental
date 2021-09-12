import { Icon } from '@components/Icon';
import { FontAwesome } from '@expo/vector-icons';
import React, { ComponentProps, FC } from 'react';
import { StyleSheet } from 'react-native';

interface Props {
  color: string;
  size: number;
  name: ComponentProps<typeof FontAwesome>['name'];
}

export const DrawerIcon: FC<Props> = (props) => {
  return <Icon {...props} style={styles.icon} />;
};

const styles = StyleSheet.create({
  icon: {
    width: 24
  }
});
