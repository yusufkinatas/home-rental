import { initializeAuth } from '@slices/authSlice';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { store } from 'store';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';

store.dispatch(initializeAuth());

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar style="dark" />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaProvider>
      </Provider>
    );
  }
}
