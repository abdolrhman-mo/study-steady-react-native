import { useLogout } from '@/api/hooks/useAuth'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity, ActivityIndicator } from 'react-native'
import { getId, getToken } from '@/utils/tokenStorage'
import { router } from 'expo-router'
import apiClient from '@/api/client'
import { LinearGradient } from 'expo-linear-gradient'
import { GRADIENT_COLORS } from '@/constants/colors'
import AppText from '@/components/app-text'

const Profile = () => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [endpoint, setEndpoint] = useState<string>('')

  const [modalVisible, setModalVisible] = useState(false)
  const { logoutUser } = useLogout()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = await getId()
        if (id) {
          const dynamicEndpoint = `/api-auth/${id}/`
          setEndpoint(dynamicEndpoint)  // Set the endpoint state to trigger useEffect

          const response = await apiClient.get(dynamicEndpoint)
          setData(response.data)
          console.log('data:', response.data)
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
  if (error) return <AppText style={styles.errorText}>Error: {error}</AppText>
  if (!data) return <AppText style={styles.errorText}>No data available.</AppText>

  const handleLogout = async () => {
    logoutUser()
    console.log('Profile: Logged out')

    const token = await getToken()
    console.log('Profile token:', token)

    router.replace('/login')
  }

  const confirmLogout = () => {
    setModalVisible(true)
  }

  return (
    <LinearGradient
        colors={GRADIENT_COLORS}
        style={styles.container}
    >
      <AppText style={styles.streak}>Here you can log out.</AppText>

      {/* Button wrapped in TouchableOpacity */}
      <TouchableOpacity style={styles.buttonLogout} onPress={confirmLogout}>
        <AppText style={styles.textStyle}>Log Out</AppText>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <AppText style={styles.modalText}>Are you sure you want to log out?</AppText>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <AppText style={styles.textStyle}>Cancel</AppText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonLogout]}
                onPress={() => {
                  setModalVisible(!modalVisible)
                  handleLogout()
                }}
              >
                <AppText style={styles.textStyle}>Log Out</AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  streak: {
    fontSize: 18,
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  buttonCancel: {
    backgroundColor: '#2196F3',
  },
  buttonLogout: {
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#f44336',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
