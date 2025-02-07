import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import InputField from '../../components/input-field'
import Button from '../../components/button'
import { validatePassword, validateUsername } from '../../utils/validation'
import { Link, router } from 'expo-router'
import { useLogin } from '@/api/hooks/useAuth'
import { Ionicons } from '@expo/vector-icons' // Import icons
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient'
import { GRADIENT_COLORS } from '@/constants/colors'
import AppText from '@/components/app-text'

export default function LoginScreen() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false) // State for toggling visibility
    const [errors, setErrors] = useState({ username: '', password: '' })
    const { performLogin, loading, error } = useLogin()

    const handleLogin = async () => {
        const usernameError = validateUsername(username)
        const passwordError = false
    
        if (usernameError || passwordError) {
            setErrors({ username: usernameError || '', password: passwordError || '' })
            return
        }
    
        const result = await performLogin(username, password)
        if (result) {
            const onboardingCompleted = await AsyncStorage.getItem('onboardingCompleted')
            router.replace(onboardingCompleted ? '/' : '/onboarding')
        }
    }

    return (
        <LinearGradient
            colors={GRADIENT_COLORS}
            style={styles.container}
        >
            <AppText style={styles.title}>Login</AppText>
            <InputField
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.inputField}
            />
            {errors.username && <AppText style={styles.error}>{errors.username}</AppText>}
            
            <View style={styles.passwordContainer}>
                <InputField
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword} // Toggle visibility
                    style={styles.inputField}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.icon}>
                    <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color={showPassword ? '#1f6feb' : 'gray'} />
                </TouchableOpacity>
            </View>
            {errors.password && <AppText style={styles.error}>{errors.password}</AppText>}
            <Button title={loading ? 'Logging in...' : 'Login'} onPress={handleLogin} disabled={loading} />
            {error?.detail && <AppText style={styles.error}>{error.detail}</AppText>}
            <Link href="/signup" style={styles.link}>Don't have an account? Sign up now</Link>
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
        // height: 50,
        // flexDirection: 'row',
        // alignItems: 'center',
        // borderBottomWidth: 2,
        // borderColor: '#1f6feb', // Highlight border color for the password field
        // marginBottom: 20,
    },
    inputField: {
        // height: 50,
        // padding: 10,
        // fontSize: 16,
        // borderWidth: 1,
        // borderColor: '#ccc',
        // borderRadius: 5,
        // backgroundColor: '#f9f9f9',
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
