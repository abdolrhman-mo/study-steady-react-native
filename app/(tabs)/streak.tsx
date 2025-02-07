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
import { GRADIENT_COLORS, PRIMARY_COLOR, STREAK_COLOR_L1, STREAK_COLOR_L2, STREAK_COLOR_L3, TEXT_COLOR, TROPHY_COLOR, WHITE } from '@/constants/colors';
import AppText from '@/components/app-text';
import { shadowStyle } from '@/styles/styles';

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
        };

        fetchData();
    }, []);

    if (loading)
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#ff4500" />
            </View>
        );

    if (error) return <AppText>Error: {error}</AppText>;
    if (!data) return <AppText>No data available.</AppText>;

    return (
        <LinearGradient colors={GRADIENT_COLORS} style={styles.container}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                <Ionicons name="flame" size={140} color={STREAK_COLOR_L1} />
            </View>
            {/* <View style={{ paddingHorizontal: 20, alignItems: 'center' }}> */}
            <View style={[styles.card, shadowStyle.default]}>
            <AppText style={styles.streakText}>
                Current Streak: {currentStreak} days
            </AppText>
            <View style={styles.topStreakContainer}>
                <Icon name="trophy" size={28} color={TROPHY_COLOR} style={styles.trophyIcon} />
                <AppText style={styles.topStreakText}>
                Top Streak: {topStreak} days
                </AppText>
            </View>
            </View>


        {/* Quick Streak Guide */}
        <View style={styles.infoContainer}>
        <AppText style={styles.infoTitle}>Streak Guide</AppText>
        <View style={styles.badgeRow}>
            <View style={[styles.badge, 
                // { backgroundColor: STREAK_COLOR_L1 }
                { backgroundColor: '#FCD8BF' }
            ]}>
            <Ionicons name="flame" size={16} color={STREAK_COLOR_L1} />
            <AppText style={styles.badgeText}>25 – 60 m</AppText>
            </View>
            <View style={[styles.badge, 
                // { backgroundColor: STREAK_COLOR_L2 }
                { backgroundColor: '#FCD8BF' }
            ]}>
            <Ionicons name="flame" size={16} color={STREAK_COLOR_L2} />
            <AppText style={styles.badgeText}>2 h+</AppText>
            </View>
            <View style={[styles.badge, 
                // { backgroundColor: STREAK_COLOR_L3 }
                { backgroundColor: '#FCD8BF' }
                ]}>
            <Ionicons name="flame" size={16} color={STREAK_COLOR_L3} />
            <AppText style={styles.badgeText}>4 h+</AppText>
            </View>
        </View>
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
        marginRight: 0,
    },
    bold: {
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: WHITE, // Semi-transparent white
        borderRadius: 15,
        padding: 20,
        marginVertical: 10,
        alignItems: 'center',
      },
      streakText: {
        fontSize: 16, // Larger text to make the streak stand out
        fontWeight: '600',
        color: TEXT_COLOR,
        textShadowRadius: 3,
        marginBottom: 10, // Space below the text
      },
      topStreakContainer: {
        flexDirection: 'row', // Position icon and text side by side
        alignItems: 'center', // Vertically align icon and text
        marginVertical: 5, // Provide breathing room above and below
      },
      topStreakText: {
        fontSize: 14, // Slightly smaller than the main streak text
        color: TEXT_COLOR, // A lighter tone for a balanced contrast
        fontWeight: '400',
        marginLeft: 8, // Space between the trophy icon and the text
      },

      infoContainer: {
        marginVertical: 20,
        padding: 15,
        backgroundColor: WHITE,
        borderRadius: 15,
        width: '80%',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
      },
    
      infoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: TEXT_COLOR,
        marginBottom: 15,
        textAlign: 'center',
      },
    
      badgeRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
    
      badge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 20,
        marginHorizontal: 5,
      },
    
      badgeText: {
        fontSize: 14,
        // color: WHITE,
        color: TEXT_COLOR,
        marginLeft: 5,
        fontWeight: '600',
      },

    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

});