import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScreenContainer } from '@components/ScreenContainer';
import { SubmitHandler, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { message } from '@utils/message';
import { ScreenProp } from 'types';
import { Input } from '@components/Input';
import Spacer from '@components/Spacer';
import { Button } from '@components/Button';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { updateUser } from '@slices/usersSlice';

interface FormValues {
  email: string;
  fullName: string;
}

export const EditUserScreen = ({
  navigation,
  route: {
    params: { user }
  }
}: ScreenProp<'EditUser'>) => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { email: user.email, fullName: user.fullName }
  });

  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    const { meta } = await dispatch(updateUser({ id: user._id, params: data }));

    if (meta.requestStatus === 'rejected') {
      setLoading(false);
      return message.error('Something unexpected happened');
    }

    message.success('User updated!');
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
          name="fullName"
          label="Full Name"
          rules={{
            required: 'Full name is required'
          }}
        />

        <Spacer height={16} />

        <Button
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          title="Save"
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
