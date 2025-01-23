import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#000',
                // headerStyle: {
                //     backgroundColor: '#25292e',
                // },
                headerShadowVisible: false,
                // headerTintColor: '#fff',
                // tabBarStyle: {
                //     backgroundColor: '#25292e',
                // },
            }}
        >
            <Tabs.Screen 
                name="index" 
                options={{ 
                    title: 'Timer',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'timer-sharp' : 'timer-outline'} size={24} color={color} />
                    ),
                }} 
            />
            <Tabs.Screen 
                name="(leaderboard)" 
                options={{ 
                    title: 'Leaderboard',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'stats-chart' : 'stats-chart-outline'} size={24} color={color} />
                    ),
                }} 
            />
            <Tabs.Screen 
                name="profile" 
                options={{ 
                    title: 'Profile',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} />
                    ),
                }} 
            />
        </Tabs>
    );
}
