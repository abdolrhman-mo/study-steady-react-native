import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';

const friends = [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
    { id: '3', name: 'Charlie' },
    { id: '4', name: 'David' },
    { id: '5', name: 'Eve' },
];

const SearchFriends = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredFriends, setFilteredFriends] = useState(friends);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query) {
            const filtered = friends.filter(friend =>
                friend.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredFriends(filtered);
        } else {
            setFilteredFriends(friends);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search friends..."
                value={searchQuery}
                onChangeText={handleSearch}
            />
            <FlatList
                data={filteredFriends}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <Link
                    href={{
                        pathname: '/user/[username]',
                        params: { username: item.name },
                    }} 
                    style={styles.friendItem}
                >
                    {item.name}
                </Link>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    friendItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
});

export default SearchFriends;