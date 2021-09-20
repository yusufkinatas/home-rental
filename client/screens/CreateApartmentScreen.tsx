import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScreenContainer } from '@components/ScreenContainer';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spacer from '@components/Spacer';
import { message } from '@utils/message';
import MapView from 'react-native-maps';
import { Location } from 'types';
import { MapMarker } from '@components/MapMarker';
import { PickLocationModal } from '@components/PickLocationModal';
import { useNavigation } from '@react-navigation/core';
import { ruleMin1, ruleOnlyDigit } from '@constants/formRules';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { createApartment } from '@slices/apartmentsSlice';

interface FormValues {
  name: string;
  description: string;
  floorAreaSize: string;
  numberOfRooms: string;
  monthlyPrice: string;
  location: Location;
}

export const CreateApartmentScreen = () => {
  const dispatch = useAppDispatch();

  const { control, handleSubmit, watch, setValue } = useForm<FormValues>({});
  const location = watch('location');
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const onSubmit: SubmitHandler<FormValues> = async ({
    location,
    name,
    description,
    floorAreaSize,
    numberOfRooms,
    monthlyPrice
  }) => {
    setLoading(true);
    const { meta } = await dispatch(
      createApartment({
        location: location,
        name: name,
        description: description,
        floorAreaSize: parseInt(floorAreaSize),
        numberOfRooms: parseInt(numberOfRooms),
        monthlyPrice: parseInt(monthlyPrice)
      })
    );

    if (meta.requestStatus === 'rejected') {
      setLoading(false);
      return message.error('Something unexpected happened');
    }

    message.success('Apartment created!');
    navigation.goBack();
  };

  const onLocationSelect = (location: Location) => {
    setValue('location', location);
    hideModal();
  };

  return (
    <>
      <ScreenContainer disableDefaultPadding>
        <KeyboardAwareScrollView
          enableAutomaticScroll
          contentContainerStyle={styles.contentContainer}
          keyboardDismissMode="none"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {location && (
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
                coordinate={{ latitude: location.lat, longitude: location.lng }}
                title={location.address}
              />
            </MapView>
          )}
          <Button
            size="s"
            title="Change Location"
            style={{ marginHorizontal: 16, marginTop: 8, alignSelf: 'center' }}
            onPress={showModal}
          />
          <View style={styles.formFields}>
            <Input
              control={control}
              name="name"
              label="Name"
              rules={{ required: 'Name is required' }}
            />
            <Input
              control={control}
              name="description"
              label="Description"
              rules={{ required: 'Description is required' }}
              multiline
            />
            <Input
              control={control}
              name="floorAreaSize"
              label="Floor Area Size (sqft)"
              rules={{
                required: 'Floor area size is required',
                ...ruleOnlyDigit,
                ...ruleMin1
              }}
              keyboardType="numeric"
            />
            <Input
              control={control}
              name="numberOfRooms"
              label="Number of Rooms"
              rules={{
                required: 'Number of rooms is required',
                ...ruleOnlyDigit,
                ...ruleMin1
              }}
              keyboardType="numeric"
            />
            <Input
              control={control}
              name="monthlyPrice"
              label="Monthly Price ($)"
              rules={{
                required: 'Monthly Price is required',
                ...ruleOnlyDigit,
                ...ruleMin1
              }}
              keyboardType="numeric"
            />

            <Spacer height={24} />

            <Button
              title="Create"
              block
              onPress={handleSubmit(onSubmit)}
              loading={loading}
            />
          </View>
        </KeyboardAwareScrollView>
      </ScreenContainer>

      {modalVisible && (
        <PickLocationModal
          defaultLocation={location}
          onLocationSelect={onLocationSelect}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 16
  },
  map: { width: '100%', height: 160 },
  formFields: { paddingHorizontal: 16, paddingTop: 16 }
});
