import { Stack } from 'expo-router';

export default function HomeLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#000',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
        }}>
            <Stack.Screen name="leaderboard" />
            <Stack.Screen name="search" />
            <Stack.Screen 
                name="user/[username]"
                // getId={
                //     ({ params }) => String(Date.now())
                // }
            />
        </Stack>
    );
}
