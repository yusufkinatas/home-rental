import { ApartmentsContextProvider } from '@contexts/apartments';
import { ProfileContextProvider } from '@contexts/profile';
import { apiClient } from '@services/apiClient';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { SWRConfig } from 'swr';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';

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
        <SafeAreaProvider>
          <ProfileContextProvider>
            <ApartmentsContextProvider>
              <Navigation />
              <StatusBar style="dark" />
              <Toast ref={(ref) => Toast.setRef(ref)} />
            </ApartmentsContextProvider>
          </ProfileContextProvider>
        </SafeAreaProvider>
      </SWRConfig>
    );
  }
}
