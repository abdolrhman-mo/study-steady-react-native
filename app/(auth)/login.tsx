import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import InputField from '../../components/input-field'
import Button from '../../components/button'
import { validatePassword, validateUsername } from '../../utils/validation'
import { Link, router } from 'expo-router'
import { useLogin } from '@/api/hooks/useAuth'
import { Ionicons } from '@expo/vector-icons' // Import icons

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
            router.replace('/')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>تسجيل الدخول</Text>
            <InputField
                placeholder="اسم المستخدم"
                value={username}
                onChangeText={setUsername}
                style={styles.inputField}
            />
            {errors.username && <Text style={styles.error}>{errors.username}</Text>}
            
            <View style={styles.passwordContainer}>
                <InputField
                    placeholder="كلمة المرور"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword} // Toggle visibility
                    style={styles.inputField}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.icon}>
                    <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color={showPassword ? '#1f6feb' : 'gray'} />
                </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.error}>{errors.password}</Text>}
            <Button title={loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'} onPress={handleLogin} disabled={loading} />
            {error?.detail && <Text style={styles.error}>{error.detail}</Text>}
            <Link href="/signup" style={styles.link}>لا تملك حساب؟ سجل الآن</Link>
        </View>
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
        color: '#1f6feb',
        marginTop: 20,
        textAlign: 'center',
    },
})
