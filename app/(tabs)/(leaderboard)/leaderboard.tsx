import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { useFetchData } from '../../../api/hooks/useFetchData';

const Leaderboard = () => {
    const { data, loading, error } = useFetchData('/users');

    if (loading) return <ActivityIndicator size="large" />;
    if (error) return <Text>Error: {error}</Text>;

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            {/* <Text style={styles.score}>{item.score}</Text> */}
            <Text style={styles.score}>{item.email}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Link href="/search">Search</Link>
            <Text style={styles.title}>Leaderboard</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    name: {
        fontSize: 18,
    },
    score: {
        fontSize: 18,
    },
});

export default Leaderboard;