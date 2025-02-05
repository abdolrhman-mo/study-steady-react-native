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
                    headerShown: false, // This hides the header bar
                }} 
            />
            <Stack.Screen 
                name="search" 
                options={{
                    title: "البحث",
                }}
            />
            <Stack.Screen 
                name="FollowersFollowing" 
                options={{
                    title: "علاقاتك العامة",
                    // headerShown: false, // This hides the header bar
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
