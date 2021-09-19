import React from 'react';
import { StyleSheet } from 'react-native';
import { ScreenContainer } from '@components/ScreenContainer';
import { CompositeDrawerScreenProp, UserRole } from 'types';
import { ApartmentsMap } from './ApartmentsMap';
import { ApartmentsList } from './ApartmentsList';
import { Button } from '@components/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppSelector } from '@hooks/useAppSelector';
import { selectUser } from '@slices/authSlice';

export const ApartmentsScreen = ({
  route: { params },
  navigation
}: CompositeDrawerScreenProp<'Apartments'>) => {
  const { bottom: bottomInset } = useSafeAreaInsets();
  const user = useAppSelector(selectUser);

  return (
    <ScreenContainer disableDefaultPadding>
      {params.view === 'map' ? <ApartmentsMap /> : <ApartmentsList />}
      {user?.role !== UserRole.CLIENT && (
        <Button
          icon="plus"
          size="l"
          style={[styles.createButton, { bottom: 16 + bottomInset }]}
          onPress={() => navigation.navigate('CreateApartment')}
          testID="createApartment"
        />
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  createButton: {
    position: 'absolute',
    right: 16
  }
});
