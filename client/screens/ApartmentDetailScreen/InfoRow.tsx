import { Text } from '@components/Text';
import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
  label: string;
  value: string;
}

export const InfoRow: FC<Props> = ({ label, value }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.labelText}>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  labelText: { width: 144 }
});
