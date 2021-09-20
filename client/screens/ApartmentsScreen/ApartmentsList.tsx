import { ApartmentListItem } from '@components/ApartmentListItem';
import Spacer from '@components/Spacer';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import {
  loadMoreApartments,
  searchApartments,
  selectApartmentIds
} from '@slices/apartmentsSlice';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';

export const ApartmentsList = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.apartments.isLoading);
  const apartmentIds = useAppSelector(selectApartmentIds);

  useEffect(() => {
    dispatch(
      searchApartments({
        maxLat: undefined,
        minLat: undefined,
        maxLng: undefined,
        minLng: undefined
      })
    );
  }, []);

  if (apartmentIds.length === 0 && isLoading) {
    return <ActivityIndicator size="large" style={styles.activityIndicator} />;
  }

  return (
    <FlatList
      data={apartmentIds}
      ItemSeparatorComponent={() => <Spacer height={16} />}
      keyExtractor={(id) => id.toString()}
      renderItem={({ item: id }) => <ApartmentListItem id={id.toString()} />}
      onEndReached={() => !isLoading && dispatch(loadMoreApartments())}
      contentContainerStyle={styles.contentContainer}
      onEndReachedThreshold={0.2}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16
  },
  activityIndicator: {
    marginTop: 100
  }
});
