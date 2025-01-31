import { API_ENDPOINTS } from '@/api/endpoints';
import { useFetchData } from '@/api/hooks/useFetchData';
import { Link, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, ActivityIndicator, Text, TouchableOpacity } from 'react-native';

const SearchFriends = () => {
    const { data, loading, error } = useFetchData(API_ENDPOINTS.USERS);
    const navigation = useNavigation();

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredFriends, setFilteredFriends] = useState<any>([]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);

        if (!data) return;

        if (query) {
            const filtered = data.filter((friend: any) =>
                friend.username.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredFriends(filtered);
        } else {
            setFilteredFriends(data);
        }
    };

    useEffect(() => {
        navigation.setOptions({
            headerShown: false, // Turn off default header
        });
    }, [navigation]);

    if (loading) return <ActivityIndicator size="large" />;
    if (error) return <Text>خطأ: {error}</Text>;

    return (
        <View style={styles.container}>
            <View style={styles.customHeader}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="ابحث عن الأصدقاء..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
            </View>
            <FlatList
                data={filteredFriends}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Link
                        href={{
                            pathname: '/user/[id]',
                            params: { id: item.id },
                        }}
                        style={styles.friendItem}
                    >
                        {item.username}
                    </Link>
                )}
            />
            {/* Add the Link to /leaderboard at the bottom */}
            <Link href="/leaderboard" asChild>
                <TouchableOpacity style={styles.leaderboardLink}>
                    <Text style={styles.leaderboardText}>الذهاب إلى لوحة المتصدرين</Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#e0f7fa',
    },
    customHeader: {
        padding: 16,
        backgroundColor: '#e0f7fa',
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    friendItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    leaderboardLink: {
        marginTop: 16,
        padding: 16,
        backgroundColor: '#007bff',
        borderRadius: 8,
        alignItems: 'center',
    },
    leaderboardText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SearchFriends;