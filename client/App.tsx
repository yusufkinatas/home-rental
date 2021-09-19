import { ApartmentsContextProvider } from '@contexts/apartments';
import { apiClient } from '@services/apiClient';
import { initializeAuth } from '@slices/authSlice';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { store } from 'store';
import { SWRConfig } from 'swr';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';

store.dispatch(initializeAuth());

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SWRConfig
        value={{
          fetcher: (url: string) => apiClient.get(url).then((res) => res.data)
        }}
      >
        <Provider store={store}>
          <SafeAreaProvider>
            <ApartmentsContextProvider>
              <Navigation />
              <StatusBar style="dark" />
              <Toast ref={(ref) => Toast.setRef(ref)} />
            </ApartmentsContextProvider>
          </SafeAreaProvider>
        </Provider>
      </SWRConfig>
    );
  }
}
