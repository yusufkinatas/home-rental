import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScreenContainer } from '@components/ScreenContainer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@components/Text';
import Spacer from '@components/Spacer';
import { Icon } from '@components/Icon';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const LandingScreen = () => {
  const { top: topInset } = useSafeAreaInsets();

  const [currentForm, setCurrentForm] = useState<'signIn' | 'signUp'>('signIn');

  const toggleForm = () =>
    setCurrentForm((c) => (c === 'signIn' ? 'signUp' : 'signIn'));

  return (
    <ScreenContainer disableDefaultPadding style={styles.screen}>
      <KeyboardAwareScrollView
        enableAutomaticScroll
        contentContainerStyle={styles.contentContainer}
        keyboardDismissMode="none"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Spacer height={topInset} />
        <Icon size={48} name="home" style={{ alignSelf: 'center' }} />
        <Text size={36} weight="bold" align="center">
          Home Rental
        </Text>
        <Spacer height={24} />
        {currentForm === 'signIn' ? (
          <SignInForm toggleForm={toggleForm} />
        ) : (
          <SignUpForm toggleForm={toggleForm} />
        )}
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  screen: { paddingHorizontal: 16, paddingTop: 16 },
  contentContainer: {
    paddingBottom: 16
  }
});
