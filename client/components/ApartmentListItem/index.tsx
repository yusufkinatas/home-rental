import { PressableOpacity } from '@components/PressableOpacity';
import { Text } from '@components/Text';
import { colors } from '@constants/colors';
import { useAppSelector } from '@hooks/useAppSelector';
import { useNavigation } from '@react-navigation/core';
import { selectApartmentById } from '@slices/apartmentsSlice';
import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  id: string;
}

const _ApartmentListItem: FC<Props> = ({ id }) => {
  const navigation = useNavigation();
  const apartment = useAppSelector((state) => selectApartmentById(state, id));

  if (!apartment) return null;

  return (
    <PressableOpacity
      style={styles.wrapper}
      onPress={() =>
        navigation.navigate('ApartmentDetail', { apartmentId: apartment._id })
      }
    >
      <View style={styles.leftWrapper}>
        <Text>{apartment.name}</Text>
        <Text
          size={12}
        >{`${apartment.numberOfRooms} rooms - ${apartment.floorAreaSize} sqft`}</Text>
      </View>
      <Text
        weight="bold"
        size={14}
        color={apartment.isRented ? colors.success : colors.primary}
      >{`$${apartment.monthlyPrice}`}</Text>
    </PressableOpacity>
  );
};

export const ApartmentListItem = memo(_ApartmentListItem);

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: colors.neutral[300],
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row'
  },
  leftWrapper: {
    flex: 1
  }
});
