import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { getId } from '@/utils/tokenStorage'
import { router } from 'expo-router'
import apiClient from '@/api/client'
import Icon from 'react-native-vector-icons/Ionicons'  // Importing Ionicons icon library

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

  if (loading) return <Text>جاري التحميل...</Text>
  if (error) return <Text>حدث خطأ: {error}</Text>
  if (!data) return <Text>لا توجد بيانات.</Text>

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Icon name="person-circle-outline" size={60} color="#2196F3" />
        <Text style={styles.title}>{data.username}</Text>
      </View>

      {/* Streak Info with Icons */}
      <View style={styles.streakInfo}>
        <View style={styles.streakRow}>
          <Icon name="flame" size={20} color="#ff5722" style={styles.icon} />
          <Text style={styles.streak}>streak: {data.current_streak}</Text>
        </View>
        <View style={styles.streakRow}>
          <Icon name="trophy" size={20} color="#F7AC00" style={styles.icon} />
          <Text style={styles.streak}>top streak: {data.top_streak}</Text>
        </View>
      </View>

      {/* Buttons with Icons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/settings')}>
          <Icon name="settings" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>إعدادات الحساب</Text>
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
    color: '#2196F3',
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
    backgroundColor: '#2196F3',
    borderRadius: 30,
    width: '70%',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default Profile
