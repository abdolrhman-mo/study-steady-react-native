import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const User = () => {
    const { username } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{username} Profile</Text>
            <Text style={styles.content}>This is a simple user profile.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    content: {
        fontSize: 16,
    },
});

export default User;