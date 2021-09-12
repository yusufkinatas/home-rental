import {
  Lato_400Regular,
  Lato_700Bold,
  useFonts
} from '@expo-google-fonts/lato';
import { FontAwesome } from '@expo/vector-icons';

import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

export default function useCachedResources() {
  const [isLoadingComplete] = useFonts({
    ...FontAwesome.font,
    Lato: Lato_400Regular,
    'Lato-Bold': Lato_700Bold
  });

  useEffect(() => {
    if (isLoadingComplete) {
      SplashScreen.hideAsync();
    } else {
      SplashScreen.preventAutoHideAsync();
    }
  }, [isLoadingComplete]);

  return isLoadingComplete;
}
