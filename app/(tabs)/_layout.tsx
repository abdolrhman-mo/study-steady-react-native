import { Link, Tabs, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Image, ActivityIndicator } from 'react-native'; // Added ActivityIndicator import
import { getId } from '@/utils/tokenStorage';
import { useEffect, useState } from 'react';
import apiClient from '@/api/client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setCurrentStreak } from '@/redux/streakSlice';

const hasOneDayPassed = (apiDateString: string) => {
  const apiDate = new Date(apiDateString); // Convert API string to Date object
  const currentDate = new Date();

  // Get time difference in milliseconds
  const timeDifference = currentDate.getTime() - apiDate.getTime();

  // Convert milliseconds to days
  const daysPassed = timeDifference / (1000 * 60 * 60 * 24);

  return daysPassed > 1; // Returns true if at least one day has passed
};

export default function TabLayout() {
  const dispatch = useDispatch();
  const currentStreak = useSelector((state: RootState) => state.streak.currentStreak);

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [endpoint, setEndpoint] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myId = await getId();
        if (myId) {
          // Construct the dynamic endpoint
          const dynamicEndpoint = `/api-auth/${myId}/`;
          setEndpoint(dynamicEndpoint); // Set the endpoint state to trigger useEffect

          const response = await apiClient.get(dynamicEndpoint);
          setData(response.data);

          // Global State Current streak
          dispatch(setCurrentStreak(response.data.current_streak));
        } else {
          throw new Error('ID not found');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run on mount only

  if (loading) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#E87C39" />
    </View>
  );
  if (error) return <Text>Error: {error}</Text>;
  if (!data) return <Text>No data available.</Text>;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#E87C39',
        headerShadowVisible: false,
        headerTitle: '',
        headerLeft: () => (
          <Image
            source={require('@/assets/images/study steady icon.png')}
            style={{ width: 120, height: 80, marginLeft: 10 }}
          />
        ),
        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
            <Link href={'/(tabs)/streak'}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
                <Ionicons name="flame" size={24} color="#ff4500" />
                <Text style={{ marginLeft: 5, fontSize: 16, color: '#ff4500', fontWeight: 'bold' }}>
                  {currentStreak}
                </Text>
              </View>
            </Link>
            <Link href={'/profile'}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="person-circle-outline" size={24} color="#000" />
              </View>
            </Link>
          </View>
        ),
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
          title: 'Community',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'people' : 'people-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          tabBarItemStyle: { display: 'none' },
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="streak"
        options={{
          title: 'Streak',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'flame' : 'flame-outline'} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
