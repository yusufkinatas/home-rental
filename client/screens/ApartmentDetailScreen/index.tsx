import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { ScreenContainer } from '@components/ScreenContainer';
import { ScreenProp, UserRole } from 'types';
import MapView from 'react-native-maps';
import { MapMarker } from '@components/MapMarker';
import { Text } from '@components/Text';
import { Button } from '@components/Button';
import Spacer from '@components/Spacer';
import { InfoRow } from './InfoRow';
import { colors } from '@constants/colors';
import { formatDate } from '@utils/formatDate';
import { useApartments } from '@contexts/apartments';
import { message } from '@utils/message';
import { useProfile } from '@contexts/profile';

export const ApartmentDetailScreen = ({
  navigation,
  route: {
    params: { apartmentId }
  }
}: ScreenProp<'ApartmentDetail'>) => {
  const { user } = useProfile();
  const { findApartmentById, deleteApartment } = useApartments();
  const apartment = findApartmentById(apartmentId);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const onDelete = () => {
    const _deleteApartment = async () => {
      try {
        setDeleteLoading(true);
        await deleteApartment(apartmentId);

        message.success('Apartment deleted!');
        navigation.goBack();
      } catch (error) {
        setDeleteLoading(false);
        message.error('Something unexpected happened');
      }
    };

    Alert.alert(
      'Are you sure to delete this apartment?',
      'You cannot take this action back',
      [
        { style: 'cancel', text: 'Cancel' },
        { style: 'destructive', text: 'Delete', onPress: _deleteApartment }
      ]
    );
  };

  if (!apartment) return null;

  const {
    location,
    description,
    dateAdded,
    floorAreaSize,
    isRented,
    monthlyPrice,
    name,
    numberOfRooms
  } = apartment;

  const canEditApartment =
    user?.role === UserRole.ADMIN ||
    (user?.role === UserRole.REALTOR && user._id === apartment.realtorId);

  return (
    <ScreenContainer disableDefaultPadding>
      <ScrollView>
        <MapView
          style={styles.map}
          zoomEnabled={false}
          pitchEnabled={false}
          rotateEnabled={false}
          zoomTapEnabled={false}
          scrollEnabled={false}
          camera={{
            center: { latitude: location.lat, longitude: location.lng },
            heading: 0,
            pitch: 0,
            altitude: 1000,
            zoom: 15
          }}
        >
          <MapMarker
            color={apartment.isRented ? colors.success : colors.primary[500]}
            coordinate={{ latitude: location.lat, longitude: location.lng }}
            title={apartment.location.address}
          />
        </MapView>
        <View style={styles.content}>
          <Text weight="bold" size={20}>
            {name}
          </Text>

          {isRented && (
            <>
              <Spacer height={4} />
              <Text weight="bold" color={colors.success}>
                Rented
              </Text>
            </>
          )}

          <Spacer height={16} />

          <InfoRow label="Floor Area Size" value={`${floorAreaSize} sqft`} />
          <Spacer height={8} />
          <InfoRow label="Number of Rooms" value={`${numberOfRooms} Rooms`} />
          <Spacer height={8} />
          <InfoRow label="Monthly Price" value={`$${monthlyPrice}`} />
          <Spacer height={8} />
          <InfoRow
            label="Listing Date"
            value={formatDate(new Date(dateAdded))}
          />

          <Spacer height={16} />

          <Text>{description}</Text>

          <Spacer height={16} />

          {canEditApartment && (
            <View style={styles.buttonsContanier}>
              <Button
                title="Delete"
                style={styles.button}
                color={colors.danger}
                onPress={onDelete}
                loading={deleteLoading}
              />
              <Spacer width={16} />
              <Button
                title="Edit"
                style={styles.button}
                onPress={() =>
                  navigation.navigate('EditApartment', { apartmentId })
                }
              />
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  map: { width: '100%', height: 160 },
  content: {
    padding: 16
  },
  buttonsContanier: {
    flexDirection: 'row'
  },
  button: { flex: 1 }
});
