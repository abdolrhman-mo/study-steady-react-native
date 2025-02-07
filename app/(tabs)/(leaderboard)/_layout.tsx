import { Stack } from 'expo-router';
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#e0f7fa',
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="leaderboard"
                options={{
                    title: "Leaderboard",
                    headerShown: false, // This hides the header bar
                }}
            />
            <Stack.Screen
                name="search"
                options={{
                    title: "Search",
                }}
            />
            <Stack.Screen
                name="FollowersFollowing"
                options={{
                    title: "Your Connections",
                }}
            />
            <Stack.Screen
                name="user/[id]"
                options={{
                    title: "User Profile",
                }}
            />
        </Stack>
    );
}

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
