import { getToken } from '@/utils/tokenStorage';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { View, ActivityIndicator } from 'react-native'; // Added import for ActivityIndicator

export default function RootLayout() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Added state to handle loading

    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const token = await getToken();
            console.log('layout token:', token);
            setIsAuthenticated(!!token);
            setLoading(false); // Set loading to false after authentication check
            if (!token) {
                router.replace('/signup');
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#E87C39" />
            </View>
        );
    }

    return (
        <Provider store={store}>
            <Stack>
                <Stack.Screen name="/" />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                {/* <Stack.Screen name="streak" options={{ headerShown: true, headerTitle: 'Streak' }} /> */}
                <Stack.Screen name='(auth)/onboarding'  options={{ headerShown: false }}  />
                <Stack.Screen name='+not-found' />
            </Stack>
        </Provider>
    );
};
