import { Button } from '@components/Button';
import Spacer from '@components/Spacer';
import { Text } from '@components/Text';
import { appConstants } from '@constants/appConstants';
import { colors } from '@constants/colors';
import { defaultMapRegion } from '@constants/defaultMapRegion';
import { layout } from '@constants/layout';
import { reverseGeocode } from '@utils/reverseGeocode';
import React, { FC, useMemo, useRef, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete
} from 'react-native-google-places-autocomplete';
import MapView, { Region } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Location } from 'types';

interface Props {
  onLocationSelect: (location: Location) => void;
  defaultLocation?: Location;
}

export const PickLocationModal: FC<Props> = ({
  onLocationSelect,
  defaultLocation
}) => {
  const { bottom: bottomInset, top: topInset } = useSafeAreaInsets();

  const [currentLocation, setCurrentLocation] = useState<Location | undefined>(
    defaultLocation
  );

  const isJustAnimated = useRef(true);
  const mapRef = useRef<MapView>(null);

  const onRegionChangeComplete = async ({ latitude, longitude }: Region) => {
    if (isJustAnimated.current) {
      return (isJustAnimated.current = false);
    }

    const location = await reverseGeocode(latitude, longitude);

    location && setCurrentLocation(location);
  };

  const onSearchResultPress = (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null
  ) => {
    if (!details?.geometry.location) return;

    const { lat, lng } = details.geometry.location;

    mapRef.current?.animateCamera({
      center: { latitude: lat, longitude: lng },
      heading: 0,
      pitch: 0,
      altitude: 1000,
      zoom: 15
    });

    setCurrentLocation({
      lat,
      lng,
      address: data.description
    });

    isJustAnimated.current = true;
  };

  const initialRegion = useMemo(() => {
    if (defaultLocation) {
      return {
        ...defaultMapRegion,
        latitude: defaultLocation.lat,
        longitude: defaultLocation.lng
      };
    }

    return defaultMapRegion;
  }, [defaultLocation]);

  return (
    <Modal
      visible
      animationType="slide"
      presentationStyle="fullScreen"
      hardwareAccelerated
    >
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          initialRegion={initialRegion}
          style={styles.map}
          onRegionChangeComplete={onRegionChangeComplete}
        />

        <GooglePlacesAutocomplete
          onPress={onSearchResultPress}
          query={{
            key: appConstants.GOOGLE_PLACES_API_KEY,
            language: 'en'
          }}
          fetchDetails
          isRowScrollable={false}
          placeholder="Search Address"
          styles={{
            container: [styles.inputContainer, { top: 16 + topInset }],
            textInput: styles.input
          }}
          textInputProps={{ placeholderTextColor: colors.neutral[400] }}
        />

        <Button
          title="Select"
          size="l"
          style={[styles.selectButton, { bottom: 16 + bottomInset }]}
          onPress={() => {
            if (!currentLocation) return alert('Select location');

            onLocationSelect(currentLocation);
          }}
        />

        <View style={styles.fakeMarker} pointerEvents="none">
          <View style={styles.fakeMarkerTitle}>
            <Text
              weight="normal"
              color={colors.neutral[0]}
              size={12}
              numberOfLines={1}
              align="center"
            >
              {currentLocation?.address || 'Select Location'}
            </Text>
          </View>
          <View style={styles.fakeMarkerTriangle} />
          <Spacer height={2} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  map: { width: layout.width, height: '100%' },
  inputContainer: {
    position: 'absolute',
    zIndex: 10,
    left: 16,
    right: 16
  },
  input: { borderWidth: 1, borderColor: colors.neutral[300] },
  selectButton: {
    position: 'absolute',
    left: 16,
    right: 16
  },
  fakeMarker: { position: 'absolute' },
  fakeMarkerTitle: {
    backgroundColor: colors.primary,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 4,
    maxWidth: layout.width * 0.5
  },
  fakeMarkerTriangle: {
    backgroundColor: colors.primary,
    marginTop: -4,
    width: 8,
    height: 8,
    alignSelf: 'center',
    zIndex: -1,
    transform: [{ rotate: '45deg' }]
  }
});
