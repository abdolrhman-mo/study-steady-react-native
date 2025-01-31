import { getToken } from '@/utils/tokenStorage';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

export default function RootLayout() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const router = useRouter();

    useEffect(() => {

        const checkAuth = async () => {
            const token = await getToken();
            console.log('layout token:', token);
            setIsAuthenticated(!!token);
            if (!token) {
                router.replace('/signup');
            }
        };
  
        checkAuth();

    }, []);

    // if (!isAuthenticated) {
    //     return null; // Render nothing until authentication check is complete
    // }

    return (
        <Provider store={store}>
            <Stack>
                <Stack.Screen name="/" />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name='+not-found' />
            </Stack>
        </Provider>
    );
};