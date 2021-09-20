import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScreenContainer } from '@components/ScreenContainer';
import { SubmitHandler, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { message } from '@utils/message';
import { Input } from '@components/Input';
import Spacer from '@components/Spacer';
import { Button } from '@components/Button';
import { Checkbox } from '@components/Checkbox';
import { useNavigation } from '@react-navigation/core';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { createUser } from '@slices/usersSlice';
import { UserRole } from 'types';

interface FormValues {
  email: string;
  password: string;
  passwordConfirm: string;
  fullName: string;
  isRealtor: boolean;
}

export const CreateUserScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const { control, handleSubmit, getValues } = useForm<FormValues>();

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async ({
    email,
    fullName,
    password,
    isRealtor
  }) => {
    setLoading(true);
    const { meta } = await dispatch(
      createUser({
        email,
        fullName,
        password,
        role: isRealtor ? UserRole.REALTOR : UserRole.CLIENT
      })
    );

    if (meta.requestStatus === 'rejected') {
      setLoading(false);
      return message.error('Something unexpected happened');
    }

    message.success('User created!');
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
        <Input
          control={control}
          name="email"
          label="E-mail"
          rules={{ required: 'Email is required' }}
          autoCapitalize="none"
          autoCompleteType="email"
        />
        <Input
          control={control}
          name="password"
          label="Password"
          rules={{
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long'
            },
            required: 'Password is required'
          }}
          secureTextEntry
          textContentType="oneTimeCode"
        />
        <Input
          control={control}
          name="passwordConfirm"
          label="Confirm Password"
          rules={{
            validate: (value) => {
              if (value === getValues('password')) return true;
              return 'Passwords should match';
            },
            required: 'Confirm password is required'
          }}
          secureTextEntry
          textContentType="oneTimeCode"
        />
        <Input
          control={control}
          name="fullName"
          label="Full Name"
          rules={{
            required: 'Full name is required'
          }}
        />
        <Checkbox
          control={control}
          name="isRealtor"
          label="I want to create realtor account"
        />

        <Spacer height={16} />

        <Button
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          title="Create"
          block
        />
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16
  }
});
