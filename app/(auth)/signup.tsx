import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';
import InputField from '../../components/input-field';
import Button from '../../components/button';
import { validatePassword, validateUsername } from '../../utils/validation';
import { Link, router } from 'expo-router';
import { useSignup } from '@/api/hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // ✅ Import navigation

export default function SignupScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ username: '', password: '' });
    const { performSignup, loading, error } = useSignup();

    const navigation = useNavigation(); // ✅ Hook for navigation

    // ✅ Change header title to "Study Steady"
    useEffect(() => {
        navigation.setOptions({
            title: 'Study Steady', // ✅ Change the title
            headerTitleAlign: 'left', // ✅ Align to left
            headerStyle: { backgroundColor: '#E6F4F1' }, // ✅ Optional background color
            headerTitleStyle: { color: '#D67B28', fontSize: 20, fontWeight: 'bold' }, // ✅ Custom style
        });
    }, [navigation]);

    // Button animation
    const buttonScale = new Animated.Value(1);
    const handlePressIn = () => {
        Animated.spring(buttonScale, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };
    const handlePressOut = () => {
        Animated.spring(buttonScale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const handleSignup = async () => {
        const usernameError = validateUsername(username);
        const passwordError = false;

        if (usernameError || passwordError) {
            setErrors({ username: usernameError || '', password: passwordError || '' });
            return;
        }

        const result = await performSignup(username, password);
        if (result) {
            console.log('Signup successful:', result);
            router.replace('/');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>إنشاء حساب</Text>
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
                    secureTextEntry={!showPassword}
                    style={styles.inputField}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.icon}>
                    <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color={showPassword ? '#D67B28' : 'gray'} />
                </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.error}>{errors.password}</Text>}
            
            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <TouchableOpacity 
                    onPress={handleSignup} 
                    onPressIn={handlePressIn} 
                    onPressOut={handlePressOut} 
                    disabled={loading} 
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>{loading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}</Text>
                </TouchableOpacity>
            </Animated.View>
            
            {error?.username && <Text style={styles.error}>{error.username[0]}</Text>}
            <Link href="/login" style={styles.link}>لديك حساب بالفعل؟ سجل الدخول</Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#E6F4F1',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#D67B28',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputField: {
        height: 50,
        padding: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#D67B28',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        marginBottom: 15,
        flex: 1, // Ensure the input field takes up available space
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#D67B28',
        marginBottom: 20,
    },
    icon: {
        padding: 10,
    },
    button: {
        backgroundColor: '#D67B28',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
    link: {
        color: '#D67B28',
        marginTop: 20,
        textAlign: 'center',
    },
});
