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

interface FormValues {
  email: string;
  fullName: string;
}

export const EditUserScreen = ({
  navigation,
  route: {
    params: { updateUser, user }
  }
}: ScreenProp<'EditUser'>) => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { email: user.email, fullName: user.fullName }
  });

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async ({ email, fullName }) => {
    try {
      setLoading(true);
      await updateUser(user._id, { email, fullName });

      message.success('User updated!');
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      message.error('Something unexpected happened');
    }
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
