import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { MapMarker } from '@components/MapMarker';
import { useNavigation } from '@react-navigation/core';
import { defaultMapRegion } from '@constants/defaultMapRegion';
import { useApartments } from '@contexts/apartments';
import { colors } from '@constants/colors';

export const ApartmentsMap = () => {
  const navigation = useNavigation();
  const { apartments, setSearchParams } = useApartments();
  const mapRef = useRef<MapView>(null);

  const onRegionChangeComplete = useCallback(async () => {
    {
      const boundaries = await mapRef.current?.getMapBoundaries();

      setSearchParams((params) => ({
        ...params,
        minLat: boundaries?.southWest.latitude,
        maxLat: boundaries?.northEast.latitude,
        minLng: boundaries?.southWest.longitude,
        maxLng: boundaries?.northEast.longitude
      }));
    }
  }, []);

  const markers = useMemo(() => {
    return apartments?.map((apartment) => (
      <MapMarker
        key={apartment._id}
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
        color={apartment.isRented ? colors.success : colors.primary[500]}
      />
    ));
  }, [apartments]);

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      moveOnMarkerPress={false}
      onRegionChangeComplete={onRegionChangeComplete}
      initialRegion={defaultMapRegion}
    >
      {markers}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%'
  }
});
