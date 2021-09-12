import React, { FC, useState } from 'react';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import Spacer from '@components/Spacer';
import { Text } from '@components/Text';
import { useNavigation } from '@react-navigation/core';
import { AuthService } from '@services/AuthService';
import { message } from '@utils/message';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LocalStorageService } from '@services/LocalStorageService';
import { useProfile } from '@contexts/profile';

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  toggleForm: () => void;
}

export const SignInForm: FC<Props> = ({ toggleForm }) => {
  const { control, handleSubmit } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { setUser } = useProfile();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setLoading(true);
      const { token, user } = await AuthService.signIn(data);

      setUser(user);
      LocalStorageService.SaveObj('TOKEN', token);
      navigation.reset({ routes: [{ name: 'Drawer' }] });
    } catch (error: any) {
      setLoading(false);
      if (error.response.data === 'Invalid credentials') {
        return message.error('Invalid credentials');
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
        testID="inputEmail"
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
        testID="inputPassword"
      />

      <Spacer height={16} />
      <Button
        onPress={handleSubmit(onSubmit)}
        loading={loading}
        title="Log In"
        icon="sign-in"
        block
        testID="login"
      />
      <Spacer height={16} />
      <Text align="center" onPress={toggleForm}>
        Don’t have an account? Sign up.
      </Text>
    </>
  );
};
