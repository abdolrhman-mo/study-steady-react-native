import { Stack } from 'expo-router'

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#e0f7fa',
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            <Stack.Screen 
                name="profile"
                options={{
                    title: "Profile", // Translated to English
                }} 
            />
            <Stack.Screen 
                name="settings" 
                options={{
                    title: "Settings", // Translated to English
                }}
            />
        </Stack>
    )
}
