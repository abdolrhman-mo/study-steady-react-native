import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { getId } from '@/utils/tokenStorage'
import apiClient from '@/api/client'
import { API_ENDPOINTS } from '@/api/endpoints'
import { useDispatch } from 'react-redux'
import { followUser, unfollowUser } from '@/redux/followingSlice'

const User = () => {
  const dispatch = useDispatch()

  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [following, setFollowing] = useState<boolean>(false)

  const { id: userId } = useLocalSearchParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myId = await getId()

        if (userId && myId) {
          const userResponse = await apiClient.get(`/api-auth/${userId}/`)
          setUserData(userResponse.data)

          const followStatusResponse = await apiClient.post(
            `${API_ENDPOINTS.CHECK}${myId}/${userId}/`
          )

          setFollowing(followStatusResponse.data.message === 'Relationship exists')
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

  const handleFollowToggle = async () => {
    try {
      const myId = await getId()

      if (myId && userId) {
        const endpoint = following
          ? `${API_ENDPOINTS.UNFOLLOW}${myId}/${userId}/`
          : `${API_ENDPOINTS.FOLLOW}${myId}/${userId}/`

        const method = following ? 'DELETE' : 'POST' // Replace 'POST' for unfollow with DELETE if your backend supports it

        const response = await apiClient({
          url: endpoint,
          method,
        })

        // Update redux state
        if (following) {
            dispatch(unfollowUser({ id: Number(userId) }))
        } else {
            dispatch(followUser({ id: userId, username: userData.username, top_streak: userData.top_streak }))
        }

        setFollowing(!following)
      } else {
        throw new Error('ID not found')
      }
    } catch (err: any) {
      console.error(err.message)
    }
  }

  if (loading) return <Text>جاري التحميل...</Text>
  if (error) return <Text>خطأ: {error}</Text>
  if (!userData) return <Text>لا توجد بيانات.</Text>

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{userData.username}</Text>
      <Text style={styles.streak}>أفضل سلسلة: {userData.top_streak}</Text>
      <TouchableOpacity
        style={following ? styles.unfollowButton : styles.followButton}
        onPress={handleFollowToggle}
      >
        <Text style={styles.buttonText}>
          {following ? 'إلغاء المتابعة' : 'متابعة'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  streak: {
    fontSize: 18,
    marginVertical: 5,
  },
  followButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  unfollowButton: {
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default User
