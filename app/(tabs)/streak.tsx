import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getId } from '@/utils/tokenStorage';
import apiClient from '@/api/client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setCurrentStreak, setTopStreak } from '@/redux/streakSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { GRADIENT_COLORS } from '@/constants/colors';
import AppText from '@/components/app-text';

export default function StreakScreen(): JSX.Element {
    const dispatch = useDispatch();
    const currentStreak = useSelector((state: RootState) => state.streak.currentStreak);
    const topStreak = useSelector((state: RootState) => state.streak.topStreak);

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const id = await getId();
          if (id) {
            const response = await apiClient.get(`/api-auth/${id}/`);
            setData(response.data);
            
            dispatch(setCurrentStreak(response.data.current_streak));
            dispatch(setTopStreak(response.data.top_streak));
          } else {
            throw new Error('ID not found');
          }
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }

      fetchData();
    }, []);

    if (loading) return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#ff4500" />
      </View>
    );
    
    if (error) return <AppText>Error: {error}</AppText>;
    if (!data) return <AppText>No data available.</AppText>;

    return (
        <LinearGradient
            colors={GRADIENT_COLORS}
            style={styles.container}
        >
            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                <Ionicons name="flame" size={100} color="#ff4500" />
            </View>
            <View style={{ paddingHorizontal: 20, alignItems: 'center' }}>
                <AppText style={{ fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 10 }}>
                    Current Streak: {currentStreak} days
                </AppText>
                <AppText style={{ fontSize: 18, color: '#555', marginBottom: 10 }}>
                    <Icon name="trophy" size={20} color="#FFD700" style={styles.trophyIcon} />
                    Top Streak: {topStreak} days
                </AppText>
                {/* <AppText style={{ fontSize: 18, color: '#555' }}>
                    Total Study Hours: 54 hours
                </AppText> */}
            </View>
        </LinearGradient>
    );
}

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    trophyIcon: {
        marginHorizontal: 5, // Adds space between the trophy and the score
    },
});