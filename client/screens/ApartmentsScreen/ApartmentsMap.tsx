import React, { useCallback, useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { defaultMapRegion } from '@constants/defaultMapRegion';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { searchApartments, selectApartmentIds } from '@slices/apartmentsSlice';
import { useAppSelector } from '@hooks/useAppSelector';
import { ApartmentMapMarker } from '@components/ApartmentMapMarker';

export const ApartmentsMap = () => {
  const dispatch = useAppDispatch();
  const mapRef = useRef<MapView>(null);

  const apartmentIds = useAppSelector(selectApartmentIds);

  const onRegionChangeComplete = useCallback(async () => {
    {
      const boundaries = await mapRef.current?.getMapBoundaries();

      dispatch(
        searchApartments({
          minLat: boundaries?.southWest.latitude,
          maxLat: boundaries?.northEast.latitude,
          minLng: boundaries?.southWest.longitude,
          maxLng: boundaries?.northEast.longitude
        })
      );
    }
  }, []);

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      moveOnMarkerPress={false}
      onRegionChangeComplete={onRegionChangeComplete}
      initialRegion={defaultMapRegion}
    >
      {apartmentIds.map((id) => (
        <ApartmentMapMarker key={id.toString()} id={id.toString()} />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%'
  }
});
