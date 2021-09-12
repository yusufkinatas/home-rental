import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PressableOpacity } from '@components/PressableOpacity';
import { colors } from '@constants/colors';
import { Icon } from '@components/Icon';
import { Control, Path, useController } from 'react-hook-form';
import { Text } from '@components/Text';

interface CheckboxProps<T> {
  control: Control<T>;
  name: Path<T>;
  label: string;
}

export const Checkbox = <T extends {}>({
  control,
  label,
  name
}: CheckboxProps<T>) => {
  const { field } = useController({ name, control });

  return (
    <PressableOpacity
      onPress={() => field.onChange(!field.value)}
      style={styles.wrapper}
    >
      <View style={[styles.box, !!field.value && styles.checked]}>
        {!!field.value && (
          <Icon color={colors.neutral[0]} size={18} name="check" />
        )}
      </View>
      <Text color={colors.neutral[500]}>{label}</Text>
    </PressableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.neutral[300],
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    marginRight: 16
  },
  checked: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500]
  }
});
