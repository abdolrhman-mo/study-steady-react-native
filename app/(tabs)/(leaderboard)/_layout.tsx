import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#e0f7fa',
                },
                // headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
        }}>
            <Stack.Screen 
                name="leaderboard"
                options={{
                    title: "المتابعة",
                }} 
            />
            <Stack.Screen 
                name="search" 
                options={{
                    title: "البحث",
                }}
            />
            <Stack.Screen 
                name="user/[id]"
                options={{
                    title: "الملف الشخصي للمستخدم",
                }}
            />
        </Stack>
    );
}
