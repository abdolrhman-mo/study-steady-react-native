import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getId } from '@/utils/tokenStorage'
import apiClient from '@/api/client'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setCurrentStreak, setTopStreak } from '@/redux/streakSlice';

export default function StreakScreen(): JSX.Element {
    const dispatch = useDispatch()
    const currentStreak = useSelector((state: RootState) => state.streak.currentStreak)
    const topStreak = useSelector((state: RootState) => state.streak.topStreak)

    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const id = await getId()
          if (id) {
            const response = await apiClient.get(`/api-auth/${id}/`)
            setData(response.data)
            
            dispatch(setCurrentStreak(response.data.current_streak))
            dispatch(setTopStreak(response.data.top_streak))
          } else {
            throw new Error('ID not found')
          }
        } catch (err: any) {
          setError(err.message)
        } finally {
          setLoading(false)
        }
      }
  
      fetchData()
    }, [])
  
    if (loading) return <Text>جاري التحميل...</Text>
    if (error) return <Text>حدث خطأ: {error}</Text>
    if (!data) return <Text>لا توجد بيانات.</Text>
  
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#e0f7fa' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                <Ionicons name="flame" size={100} color="#ff4500" />
            </View>
            <View style={{ paddingHorizontal: 20, alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 10 }}>
                    Current Streak: {currentStreak} days
                </Text>
                <Text style={{ fontSize: 18, color: '#555', marginBottom: 10 }}>
                    Top Streak: {topStreak} days
                </Text>
                <Text style={{ fontSize: 18, color: '#555' }}>
                    Total Study Hours: 54 hours
                </Text>
                {/* <Text style={{ fontSize: 18, color: '#555' }}>
                    Total Study Hours: {data.total_study_hours} hours
                </Text> */}
            </View>
        </View>
    );
}
