import { getToken } from '@/utils/tokenStorage';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const token = await getToken();
            console.log('layout token:', token);
            setIsAuthenticated(!!token);
            setLoading(false); 
        };

        checkAuth();
    }, []);
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.replace('/signup');
        }
    }, [loading, isAuthenticated]);
    

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
                <Stack.Screen name='(auth)'  options={{ headerShown: false }}  />
                {/*// I want all the (auth)/evreything to be headershown false*/}
                <Stack.Screen name='+not-found' />
            </Stack>
        </Provider>
    );
};
