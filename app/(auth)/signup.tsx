import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import InputField from '../../components/input-field';
import Button from '../../components/button';
import { validatePassword, validateUsername } from '../../utils/validation';
import { Link } from 'expo-router';
import { useSignup } from '@/api/hooks/useAuth';

export default function SignupScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ username: '', password: '' });
    const { performSignup, loading, error } = useSignup();

    const handleSignup = async () => {
        const usernameError = validateUsername(username);
        const passwordError = validatePassword(password);
    
        if (usernameError || passwordError) {
          setErrors({ username: usernameError || '', password: passwordError || '' });
          return;
        }
    
        const result = await performSignup(username, password);
        if (result) {
          console.log('Signup successful:', result);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <InputField placeholder="Username" value={username} onChangeText={setUsername} />
            {errors.username && <Text style={styles.error}>{errors.username}</Text>}

            <InputField
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {errors.password && <Text style={styles.error}>{errors.password}</Text>}
            <Button title={loading ? 'Signing up...' : 'Signup'} onPress={handleSignup} disabled={loading} />
            {error && <Text style={styles.error}>{error}</Text>}
            <Link href="/login" style={styles.link}>
                Already have an account? Log in
            </Link>
        </View>
    );
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
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    link: {
        color: '#1f6feb',
        marginTop: 20,
        textAlign: 'center',
    },
});
