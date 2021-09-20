import React from 'react';
import { StyleSheet, TextInputProps, View } from 'react-native';
import { ScreenContainer } from '@components/ScreenContainer';
import { SubmitHandler, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Checkbox } from '@components/Checkbox';
import Spacer from '@components/Spacer';
import { Button } from '@components/Button';
import { SearchApartmentQueryParams } from '@services/ApartmentService';
import { useNavigation } from '@react-navigation/core';
import { UserRole } from 'types';
import { Input } from '@components/Input';
import { Label } from './Label';
import { ruleMin1, ruleOnlyDigit } from '@constants/formRules';
import { useAppSelector } from '@hooks/useAppSelector';
import { selectUser } from '@slices/authSlice';
import { useAppDispatch } from '@hooks/useAppDispatch';
import {
  searchApartments,
  selectApartmentSearchParams
} from '@slices/apartmentsSlice';

interface FormValues {
  showOnlyMine: boolean;
  minMonthlyPrice: string;
  maxMonthlyPrice: string;
  minFloorAreaSize: string;
  maxFloorAreaSize: string;
  minNumberOfRooms: string;
  maxNumberOfRooms: string;
}

export const ApartmentFiltersScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const searchParams = useAppSelector(selectApartmentSearchParams);
  const navigation = useNavigation();

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      showOnlyMine: !!searchParams.realtorId,
      minMonthlyPrice: searchParams.minMonthlyPrice?.toString(),
      maxMonthlyPrice: searchParams.maxMonthlyPrice?.toString(),
      minFloorAreaSize: searchParams.minFloorAreaSize?.toString(),
      maxFloorAreaSize: searchParams.maxFloorAreaSize?.toString(),
      minNumberOfRooms: searchParams.minNumberOfRooms?.toString(),
      maxNumberOfRooms: searchParams.maxNumberOfRooms?.toString()
    }
  });

  const onSubmit: SubmitHandler<FormValues> = async ({
    showOnlyMine,
    ...rest
  }) => {
    const newParams: Omit<SearchApartmentQueryParams, 'index'> = {
      realtorId: showOnlyMine ? user?._id : ''
    };

    Object.keys(rest).forEach((key) => {
      const val = parseInt(rest[key as keyof typeof rest]);

      newParams[key as keyof typeof rest] = val || undefined;
    });

    dispatch(searchApartments(newParams));
    navigation.goBack();
  };

  return (
    <ScreenContainer disableDefaultPadding>
      <KeyboardAwareScrollView
        enableAutomaticScroll
        contentContainerStyle={styles.contentContainer}
        keyboardDismissMode="none"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Label>Monthly Price ($)</Label>
        <View style={styles.row}>
          <Input
            {...inputProps}
            control={control}
            name="minMonthlyPrice"
            label="Min"
            rules={{ ...ruleMin1, ...ruleOnlyDigit }}
          />
          <Spacer width={16} />
          <Input
            {...inputProps}
            control={control}
            name="maxMonthlyPrice"
            label="Max"
            rules={ruleOnlyDigit}
          />
        </View>

        <Label>Floor Area Size (sqft)</Label>
        <View style={styles.row}>
          <Input
            {...inputProps}
            control={control}
            name="minFloorAreaSize"
            label="Min"
            rules={{ ...ruleMin1, ...ruleOnlyDigit }}
          />
          <Spacer width={16} />
          <Input
            {...inputProps}
            control={control}
            name="maxFloorAreaSize"
            label="Max"
            rules={ruleOnlyDigit}
            style={styles.input}
          />
        </View>

        <Label>Number of rooms</Label>
        <View style={styles.row}>
          <Input
            {...inputProps}
            control={control}
            name="minNumberOfRooms"
            label="Min"
            rules={{ ...ruleMin1, ...ruleOnlyDigit }}
          />
          <Spacer width={16} />
          <Input
            {...inputProps}
            control={control}
            name="maxNumberOfRooms"
            label="Max"
            rules={ruleOnlyDigit}
          />
        </View>

        {user?.role !== UserRole.CLIENT && (
          <Checkbox
            control={control}
            name="showOnlyMine"
            label="Only show my apartments"
          />
        )}
        <Spacer height={16} />

        <Button onPress={handleSubmit(onSubmit)} title="Apply Filters" block />
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16
  },
  row: { flexDirection: 'row', marginTop: 16, marginBottom: 8 },
  input: {
    flex: 1
  }
});

const inputProps: TextInputProps = {
  keyboardType: 'numeric',
  clearButtonMode: 'always',
  style: styles.input
};
