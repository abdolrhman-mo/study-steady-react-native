import { getToken } from '@/utils/tokenStorage';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';


export default function RootLayout() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const router = useRouter();

    useEffect(() => {
        //   const loggedIn = true; // Replace with your auth check logic
        //   if (!loggedIn) {
        //     router.push('/signup');
        //   } else {
        //     router.push('/');
        //   }
        // }, [router]);

        const checkAuth = async () => {
            const token = await getToken();
            setIsAuthenticated(!!token);
            if (!token) {
                router.replace('/login'); // Redirect to login if not authenticated
            }
        };
  
        checkAuth();

    }, []);

    // if (!isAuthenticated) {
    //     return null; // Render nothing until authentication check is complete
    // }

    return (
        <Stack>
            <Stack.Screen name="/" />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            {/* <Stack.Screen name="/search" /> */}
            <Stack.Screen name='+not-found' />
        </Stack>
    );
};