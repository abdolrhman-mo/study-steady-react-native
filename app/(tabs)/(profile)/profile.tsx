import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { getId } from '@/utils/tokenStorage'
import { router } from 'expo-router'
import apiClient from '@/api/client'
import Icon from 'react-native-vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient';
import { GRADIENT_COLORS, PRIMARY_COLOR } from '@/constants/colors'
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins'
import AppText from '@/components/app-text'

SplashScreen.preventAutoHideAsync();

const Profile = () => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [fontLoaded] = useFonts({
    Poppins_400Regular,
  });

  useEffect(() => {
    if (fontLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = await getId()
        if (id) {
          const response = await apiClient.get(`/api-auth/${id}/`)
          setData(response.data)
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

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
      </View>
    )
  }

  if (error) return <AppText style={styles.errorText}>Error: {error}</AppText> // Translated
  if (!data) return <AppText style={styles.errorText}>No data available.</AppText> // Translated

  return (
    <LinearGradient 
        colors={GRADIENT_COLORS}
        style={styles.container}
    >
      {/* Profile Header */}
      <View style={styles.header}>
        <Icon name="person-circle-outline" size={60} color={PRIMARY_COLOR} />
        <AppText style={styles.title}>{data.username}</AppText>
      </View>

      {/* Streak Info with Icons */}
      <View style={styles.streakInfo}>
        <View style={styles.streakRow}>
          <Icon name="flame" size={20} color={"#ff5722"} style={styles.icon} />
          <AppText style={styles.streak}>Streak: {data.current_streak}</AppText> {/* Translated */}
        </View>
        <View style={styles.streakRow}>
          <Icon name="trophy" size={20} color="#F7AC00" style={styles.icon} />
          <AppText style={styles.streak}>Top Streak: {data.top_streak}</AppText> {/* Translated */}
        </View>
      </View>

      {/* Buttons with Icons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/settings')}>
          <Icon name="settings" size={24} color="white" style={styles.icon} />
          <AppText style={styles.buttonText}>Settings</AppText> {/* Translated */}
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    marginLeft: 10,
    fontFamily: 'Poppins_400Regular'
  },
  streakInfo: {
    marginBottom: 30,
    alignItems: 'center',
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  streak: {
    fontSize: 18,
    color: '#444',
    marginLeft: 5,
  },
  icon: {
    marginRight: 10,
  },
  buttonContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 30,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: '#f44336',
    fontSize: 18,
  },
})

export default Profile
