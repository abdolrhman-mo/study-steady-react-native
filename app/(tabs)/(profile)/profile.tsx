import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { getId } from '@/utils/tokenStorage'
import { router } from 'expo-router'
import apiClient from '@/api/client'
import Icon from 'react-native-vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient';


const Profile = () => {
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
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    )
  }

  if (error) return <Text style={styles.errorText}>Error: {error}</Text> // Translated
  if (!data) return <Text style={styles.errorText}>No data available.</Text> // Translated

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        {/* <Icon name="person-circle-outline" size={60} color="#2196F3" /> */}
        <Icon name="person-circle-outline" size={60} color="#E87C39" />
        <Text style={styles.title}>{data.username}</Text>
      </View>

      {/* Streak Info with Icons */}
      <View style={styles.streakInfo}>
        <View style={styles.streakRow}>
          <Icon name="flame" size={20} color="#ff5722" style={styles.icon} />
          <Text style={styles.streak}>Streak: {data.current_streak}</Text> {/* Translated */}
        </View>
        <View style={styles.streakRow}>
          <Icon name="trophy" size={20} color="#F7AC00" style={styles.icon} />
          <Text style={styles.streak}>Top Streak: {data.top_streak}</Text> {/* Translated */}
        </View>
      </View>

      {/* Buttons with Icons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/settings')}>
          <Icon name="settings" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Account Settings</Text> {/* Translated */}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e0f7fa',
    justifyContent: 'center',
    marginBottom: 80,
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
    // color: '#2196F3',
    color: '#E87C39',
    marginLeft: 10,
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
    marginBottom: 15,
    backgroundColor: '#E87C39',
    borderRadius: 30,
    width: '70%',
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
    backgroundColor: '#e0f7fa',
  },
  errorText: {
    textAlign: 'center',
    color: '#f44336',
    fontSize: 18,
  },
})

export default Profile
