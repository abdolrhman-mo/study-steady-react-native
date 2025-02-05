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
                    title: "الملف الشخصي",
                }} 
            />
            <Stack.Screen 
                name="settings" 
                options={{
                    title: "الإعدادات",
                }}
            />
        </Stack>
    )
}
