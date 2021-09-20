import React from 'react';
import { MapMarker } from '@components/MapMarker';
import { colors } from '@constants/colors';
import { useAppSelector } from '@hooks/useAppSelector';
import { useNavigation } from '@react-navigation/core';
import { selectApartmentById } from '@slices/apartmentsSlice';

interface Props {
  id: string;
}

const _ApartmentMapMarker = ({ id }: Props) => {
  const apartment = useAppSelector((state) => selectApartmentById(state, id));
  const navigation = useNavigation();

  if (!apartment) return null;

  return (
    <MapMarker
      title={`$${apartment.monthlyPrice}`}
      coordinate={{
        longitude: apartment.location.lng,
        latitude: apartment.location.lat
      }}
      onPress={() => {
        navigation.navigate('ApartmentDetail', {
          apartmentId: apartment._id
        });
      }}
      color={apartment.isRented ? colors.success : colors.primary}
    />
  );
};

export const ApartmentMapMarker = React.memo(_ApartmentMapMarker);
