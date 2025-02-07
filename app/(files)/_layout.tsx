import { Stack, Slot, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { View, ActivityIndicator } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { getToken } from '@/utils/tokenStorage';

export default function Layout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Poppins_Regular: Poppins_400Regular,
    Poppins_Bold: Poppins_700Bold,
  });
  
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded]);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      console.log('layout token:', token);
      setIsAuthenticated(!!token);
      setLoading(false);
    };
    checkAuth();
  }, []);

  // Be cautious with calling router.replace() here.
  // The navigation container must be mounted (i.e. <Slot /> rendered) before doing this.
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // This call might happen too early if the navigation context isn’t ready.
      router.replace('/signup');
    }
  }, [loading, isAuthenticated]);

  if (loading || !fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#E87C39" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      {/* Wrap your navigation in a Stack navigator AND ensure nested content is rendered */}
      <Stack>
        <Stack.Screen name="/" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        {/* Render nested routes */}
        <Slot />
      </Stack>
    </Provider>
  );
}
