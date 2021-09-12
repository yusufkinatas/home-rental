import { ApartmentListItem } from '@components/ApartmentListItem';
import Spacer from '@components/Spacer';
import { useApartments } from '@contexts/apartments';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';

export const ApartmentsList = () => {
  const {
    apartments,
    loadMoreApartments,
    isLoading,
    setSearchParams,
    isLoadingInitialData
  } = useApartments();

  useEffect(() => {
    setSearchParams((params) => ({
      ...params,
      maxLat: undefined,
      minLat: undefined,
      maxLng: undefined,
      minLng: undefined
    }));
  }, []);

  if (isLoadingInitialData) {
    return <ActivityIndicator size="large" style={styles.activityIndicator} />;
  }

  return (
    <FlatList
      data={apartments}
      ItemSeparatorComponent={() => <Spacer height={16} />}
      keyExtractor={(apartment) => apartment._id}
      renderItem={({ item }) => <ApartmentListItem apartment={item} />}
      onEndReached={() => !isLoading && loadMoreApartments()}
      contentContainerStyle={styles.contentContainer}
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
