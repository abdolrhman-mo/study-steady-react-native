import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
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
  const [isProcessing, setIsProcessing] = useState<boolean>(false) // New state for tracking the follow/unfollow process

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
        setIsProcessing(true) // Set processing state to true while follow/unfollow is in progress
        
        const endpoint = following
          ? `${API_ENDPOINTS.UNFOLLOW}${myId}/${userId}/`
          : `${API_ENDPOINTS.FOLLOW}${myId}/${userId}/`

        const method = following ? 'DELETE' : 'POST'

        const response = await apiClient({
          url: endpoint,
          method,
        })

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
    } finally {
      setIsProcessing(false) // Set processing state to false once the action is done
    }
  }

  if (loading) return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" />
    </View>
  )

  if (error) return <Text>Error: {error}</Text>
  if (!userData) return <Text>No data available.</Text>

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{userData.username}</Text>
      <Text style={styles.streak}>Top Streak: {userData.top_streak}</Text>
      <TouchableOpacity
        style={following ? styles.unfollowButton : styles.followButton}
        onPress={handleFollowToggle}
        disabled={isProcessing} // Disable button while processing
      >
        <Text style={styles.buttonText}>
          {isProcessing
            ? 'Processing...' // Show "Processing..." text when the action is in progress
            : following
            ? 'Unfollow'
            : 'Follow'}
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default User
