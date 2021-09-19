import { Button } from '@components/Button';
import { Checkbox } from '@components/Checkbox';
import { Input } from '@components/Input';
import Spacer from '@components/Spacer';
import { Text } from '@components/Text';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useNavigation } from '@react-navigation/core';
import { LocalStorageService } from '@services/LocalStorageService';
import { UserService } from '@services/UserService';
import { setUser } from '@slices/authSlice';
import { message } from '@utils/message';
import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserRole } from 'types';

interface FormValues {
  email: string;
  password: string;
  passwordConfirm: string;
  fullName: string;
  isRealtor: boolean;
}

interface Props {
  toggleForm: () => void;
}

export const SignUpForm: FC<Props> = ({ toggleForm }) => {
  const { control, handleSubmit, getValues } = useForm<FormValues>({
    defaultValues: { isRealtor: false }
  });
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormValues> = async ({
    email,
    fullName,
    isRealtor,
    password
  }) => {
    try {
      setLoading(true);
      const { token, user } = await UserService.createUser({
        email,
        fullName,
        password,
        role: isRealtor ? UserRole.REALTOR : UserRole.CLIENT
      });

      dispatch(setUser(user));
      LocalStorageService.SaveObj('TOKEN', token);
      navigation.reset({ routes: [{ name: 'Drawer' }] });
    } catch (error: any) {
      setLoading(false);
      if (error.response.status === 401) {
        return message.error('Email is already in use');
      }

      message.error('Something unexpected happened');
    }
  };

  return (
    <>
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
        title="Sign Up"
        icon="sign-in"
        block
      />
      <Spacer height={16} />
      <Text align="center" onPress={toggleForm}>
        Have an account? Log in.
      </Text>
    </>
  );
};
