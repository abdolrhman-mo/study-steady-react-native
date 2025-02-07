import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import InputField from '@/components/input-field'
import Button from '@/components/button'
import { validatePassword, validateUsername } from '@/utils/validation'
import { Link, router } from 'expo-router'
import { useSignup } from '@/api/hooks/useAuth'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient'
import { GRADIENT_COLORS } from '@/constants/colors'
import AppText from '@/components/app-text'

export default function SignupScreen() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({ firstName: '', lastName: '', username: '', password: '' })
  const { performSignup, loading, error } = useSignup()

  const handleSignup = async () => {
    const usernameError = validateUsername(username)
    const passwordError = false

    if (usernameError || passwordError) {
      setErrors({ firstName:'', lastName: '', username: usernameError || '', password: passwordError || '' })
      return
    }

    const result = await performSignup(firstName, lastName, username, password)
    if (result) {
      router.replace('/onboarding')
    }
  }

  return (
    <LinearGradient
        colors={GRADIENT_COLORS}
        style={styles.container}
    >
      <AppText style={styles.title}>Create an Account</AppText>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: '7px' }}>
        <View style={{ flex: 1 }}>
          <InputField placeholder="First Name" value={firstName} onChangeText={setFirstName} />
          {errors.firstName && <AppText style={styles.error}>{errors.firstName}</AppText>}
        </View>
        <View style={{ flex: 1}}>
          <InputField placeholder="Last Name" value={lastName} onChangeText={setLastName} />
          {errors.lastName && <AppText style={styles.error}>{errors.lastName}</AppText>}
        </View>
      </View>

      <InputField placeholder="Username" value={username} onChangeText={setUsername} />
      {errors.username && <AppText style={styles.error}>{errors.username}</AppText>}

      <View style={styles.passwordContainer}>
        <InputField
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword} // Toggle visibility
          style={styles.inputField && styles.passwordContainer } // Apply custom styling for better input field
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.icon}>
          <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color={showPassword ? '#1f6feb' : 'gray'} />
        </TouchableOpacity>
      </View>

      {errors.password && <AppText style={styles.error}>{errors.password}</AppText>}

      <Button title={loading ? 'Creating Account...' : 'Create Account'} onPress={handleSignup} disabled={loading} />
      {errors?.username && <AppText style={styles.error}>{errors.username[0]}</AppText>}

      <Link href="/login" style={styles.link}>
        Already have an account? Login
      </Link>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  passwordContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // borderBottomWidth: 1,
    // borderColor: '#E87C39',
    // marginBottom: 20,
  },
  inputField: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  icon: {
    padding: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  link: {
    color: '#E87C39',
    marginTop: 20,
    textAlign: 'center',
  },
})
